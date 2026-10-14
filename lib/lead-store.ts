import { del, get, list, put } from "@vercel/blob";

// Every lead is written to the site's PRIVATE Vercel Blob store (leads/YYYY-MM-DD/*.json)
// BEFORE anyone tries to deliver it, then rewritten with the delivery outcome — so a CRM,
// calendar or mailbox outage can never lose a lead. Browse them in Vercel → Storage → Blob.
//
// A lead that couldn't be delivered also gets a small marker in leads-failed/, which is all
// the retry job (app/api/cron/retry-leads) has to list; the marker goes once a retry succeeds.
//
// The store is private: nothing in it has a public URL. On Vercel the SDK signs in through
// the connected store (BLOB_STORE_ID + OIDC); elsewhere it uses BLOB_READ_WRITE_TOKEN.

const ACCESS = "private" as const;
const STORE_TIMEOUT_MS = 8000;
const FAILED_PREFIX = "leads-failed/";
/** Keeps a record readable when the retry job has been failing for days. */
const MAX_ATTEMPTS_KEPT = 30;

export interface DeliveryAttempt {
  channel: string;
  ok: boolean;
  at: string;
  error?: string;
  retry?: true;
}

export type DeliveryStatus = "pending" | "delivered" | "failed" | "slot_taken";

export interface LeadRecord<T> {
  lead: T;
  delivery: { status: DeliveryStatus; attempts: DeliveryAttempt[]; retries: number; updatedAt: string };
}

export interface SavedLead<T> {
  path: string;
  /** Blob URL of the record, or null if it couldn't be written. */
  url: string | null;
  record: LeadRecord<T>;
}

export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

export function deliveryAttempt(channel: string, error?: string | null, retry = false): DeliveryAttempt {
  const attempt: DeliveryAttempt = error ? { channel, ok: false, at: new Date().toISOString(), error } : { channel, ok: true, at: new Date().toISOString() };
  if (retry) attempt.retry = true;
  return attempt;
}

/** Writes a private file and returns its URL, or null (logged) if it couldn't. */
export async function storePrivate(path: string, body: string | Buffer, contentType: string): Promise<string | null> {
  if (!blobConfigured()) {
    console.error(`[lead-store] No Blob store connected (BLOB_STORE_ID / BLOB_READ_WRITE_TOKEN not set) — couldn't save ${path}`);
    return null;
  }
  try {
    const blob = await put(path, body, {
      access: ACCESS,
      contentType,
      addRandomSuffix: false, // paths already carry a UUID, and records must keep theirs so the outcome can overwrite them
      allowOverwrite: true,
      cacheControlMaxAge: 60, // records are rewritten once delivery finishes; don't serve a stale "pending"
      abortSignal: AbortSignal.timeout(STORE_TIMEOUT_MS),
    });
    return blob.url;
  } catch (err) {
    console.error(`[lead-store] Couldn't save ${path}:`, err);
    return null;
  }
}

/** Reads a private file by its URL (always the latest version), or null (logged) if it couldn't. */
export async function readPrivate(url: string): Promise<Buffer | null> {
  try {
    const result = await get(url, { access: ACCESS, useCache: false, abortSignal: AbortSignal.timeout(STORE_TIMEOUT_MS) });
    if (result?.statusCode !== 200 || !result.stream) {
      console.error(`[lead-store] Couldn't read ${url}: status ${result?.statusCode ?? "not found"}`);
      return null;
    }
    return Buffer.from(await new Response(result.stream).arrayBuffer());
  } catch (err) {
    console.error(`[lead-store] Couldn't read ${url}:`, err);
    return null;
  }
}

const writeRecord = (path: string, record: LeadRecord<unknown>) => storePrivate(path, JSON.stringify(record, null, 2), "application/json");
const markerPath = (recordPath: string) => FAILED_PREFIX + recordPath.split("/").pop();

/** Saves the lead with delivery "pending". `name` is a short path-safe label, e.g. "home_quote-<id>". */
export async function saveLead<T>(name: string, lead: T): Promise<SavedLead<T>> {
  const now = new Date().toISOString();
  const path = `leads/${now.slice(0, 10)}/${name}-${crypto.randomUUID()}.json`;
  const record: LeadRecord<T> = { lead, delivery: { status: "pending", attempts: [], retries: 0, updatedAt: now } };
  return { path, record, url: await writeRecord(path, record) };
}

/**
 * Rewrites the record with how delivery went (retrying the save if the first write failed),
 * and adds or clears its leads-failed/ marker.
 */
export async function recordDelivery<T>(saved: SavedLead<T>, status: DeliveryStatus, attempts: DeliveryAttempt[]): Promise<void> {
  const wasFailed = saved.record.delivery.status === "failed";
  saved.record.delivery = {
    status,
    attempts: attempts.slice(-MAX_ATTEMPTS_KEPT),
    retries: saved.record.delivery.retries,
    updatedAt: new Date().toISOString(),
  };
  const url = await writeRecord(saved.path, saved.record);
  if (url) saved.url = url;

  if (status === "failed" && !wasFailed && saved.url) {
    await storePrivate(markerPath(saved.path), JSON.stringify({ path: saved.path, url: saved.url }), "application/json");
  }
}

export interface FailedLeadMarker {
  markerUrl: string;
  recordUrl: string;
}

/** Every lead currently waiting for a retry. */
export async function listFailedLeads(): Promise<FailedLeadMarker[]> {
  const markers: FailedLeadMarker[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: FAILED_PREFIX, cursor, abortSignal: AbortSignal.timeout(STORE_TIMEOUT_MS) });
    for (const blob of page.blobs) {
      const body = await readPrivate(blob.url);
      try {
        const { url } = JSON.parse(String(body)) as { url: string };
        markers.push({ markerUrl: blob.url, recordUrl: url });
      } catch {
        console.error(`[lead-store] Unreadable retry marker ${blob.pathname}`);
      }
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return markers;
}

export async function loadLead<T>(recordUrl: string): Promise<SavedLead<T> | null> {
  const body = await readPrivate(recordUrl);
  if (!body) return null;
  try {
    const record = JSON.parse(body.toString("utf8")) as LeadRecord<T>;
    record.delivery.retries ??= 0;
    return { path: decodeURIComponent(new URL(recordUrl).pathname.slice(1)), url: recordUrl, record };
  } catch (err) {
    console.error(`[lead-store] Unreadable lead record ${recordUrl}:`, err);
    return null;
  }
}

export async function clearFailedMarker(markerUrl: string): Promise<void> {
  try {
    await del(markerUrl, { abortSignal: AbortSignal.timeout(STORE_TIMEOUT_MS) });
  } catch (err) {
    console.error(`[lead-store] Couldn't remove retry marker ${markerUrl}:`, err);
  }
}
