import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { Resend } from "resend";
import { UTM_KEYS } from "@/lib/attribution";
import { describePackageLead } from "@/lib/forms/package";
import { parseSlot, slotLabel } from "@/lib/forms/slots";
import { BOOKING_SLOTS, BOOKING_SOURCE, BOOKING_STEPS, bookingRoute } from "@/lib/get-a-quote/booking";
import { isBookableZip } from "@/lib/get-a-quote/service-area-zips";
import { LEAD_FORMS, isLeadKind, type LeadFormDefinition, type LeadKind } from "@/lib/forms/registry";
import { PHOTO_DATA_PREFIX, displayValue, validateValues, type FormValues } from "@/lib/forms/schema";
import { computeRoute } from "@/lib/lead-routing";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site-config";

// Single endpoint for every lead form. Never lose a lead: it goes to the CRM webhook when
// one is configured, otherwise (or if the webhook fails) it's emailed; if both fail the
// full lead is written to the server log before returning an error.

const MIN_FILL_MS = 2500; // faster than a human can fill the shortest form
const WEBHOOK_TIMEOUT_MS = 8000;

interface Lead {
  id: string;
  kind: LeadKind;
  funnel: LeadFormDefinition["funnel"];
  route: string | null;
  values: FormValues;
  hidden: Record<string, string>;
  attribution: Record<string, string>;
  pageUrl: string;
  submittedAt: string;
  photoNote?: string;
  /** Package leads: the full selection as structured data (values.package holds the raw JSON). */
  package?: ReturnType<typeof describePackageLead>;
  /** "get-a-quote-booking" for /get-a-quote's appointment requests; absent for every other form. */
  source?: string;
  /** Booking requests: the preferred times as structured data (values.slots holds the raw slots). */
  booking?: { slots: { date: string; window: string; label: string }[] };
}

/**
 * /get-a-quote's appointment requests post as kind "home_quote" (so CRM filters and the
 * Lead_Home event keep working) with source "get-a-quote-booking", and are checked against
 * the booking form's own fields. Every other submission is handled exactly as before.
 */
const BOOKING_FORM: LeadFormDefinition = { funnel: "home", label: "Home quote request", steps: BOOKING_STEPS, hiddenKeys: [] };
const BOOKING_ATTRIBUTION_KEYS = [...UTM_KEYS, "utm_term", "fbclid", "landing_page", "referrer"];

function cleanString(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function pickStrings(raw: unknown, keys: readonly string[], max: number): Record<string, string> {
  const src = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = cleanString(src[k], max);
    if (v) out[k] = v;
  }
  return out;
}

/**
 * Moves an attached photo out of the lead values: uploads it to Vercel Blob and puts the
 * URL in its place. Returns the raw JPEG when it couldn't be stored, so the email can
 * carry it as an attachment instead.
 */
async function storePhoto(lead: Lead): Promise<Buffer | null> {
  const dataUrl = lead.values.photo;
  if (typeof dataUrl !== "string" || !dataUrl.startsWith(PHOTO_DATA_PREFIX)) return null;
  delete lead.values.photo;

  const jpeg = Buffer.from(dataUrl.slice(PHOTO_DATA_PREFIX.length), "base64");
  if (jpeg[0] !== 0xff || jpeg[1] !== 0xd8 || jpeg[2] !== 0xff) {
    console.warn(`[lead] Ignored photo that isn't a JPEG on lead ${lead.id}`);
    return null;
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`quote-photos/${lead.id}.jpg`, jpeg, {
        access: "public",
        contentType: "image/jpeg",
        addRandomSuffix: true, // unguessable URL — homeowners' property photos aren't listable
      });
      lead.values.photo = blob.url;
      return null;
    } catch (err) {
      console.error(`[lead] Photo upload to Blob failed for lead ${lead.id}:`, err);
    }
  }
  lead.photoNote = "Photo could not be stored online — it is attached to the notification email.";
  return jpeg;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function forwardToCrm(url: string, lead: Lead): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[lead] CRM webhook returned ${res.status} for lead ${lead.id}`);
    return res.ok;
  } catch (err) {
    console.error(`[lead] CRM webhook failed for lead ${lead.id}:`, err);
    return false;
  }
}

async function emailLead(lead: Lead, form: LeadFormDefinition, photo: Buffer | null): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("[lead] RESEND_API_KEY is not set — cannot email lead", lead.id);
    return false;
  }
  const fields = form.steps.flatMap((s) => s.fields);
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1a1a1a;">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`;
  const rows = [
    ...fields.filter((f) => lead.values[f.name] !== undefined).map((f) => row(f.label, displayValue(f, lead.values[f.name]))),
    ...Object.entries(lead.hidden).map(([k, v]) => row(k, v)),
    lead.source ? row("Source", lead.source) : "",
    lead.route ? row("Route", lead.route) : "",
    lead.photoNote ? row("Photo", lead.photoNote) : "",
    ...Object.entries(lead.attribution).map(([k, v]) => row(k, v)),
    row("Page", lead.pageUrl || "—"),
    row("Lead ID", lead.id),
  ].join("");

  const who = (lead.values.company || lead.values.contactName || lead.values.email || "New lead") as string;
  const subject = `[${form.label.toUpperCase()}${lead.route ? ` · ${lead.route.toUpperCase()}` : ""}] ${who}`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL || "Express Fence Solutions <onboarding@resend.dev>",
      to: process.env.LEAD_FALLBACK_EMAIL || SITE.email,
      replyTo: typeof lead.values.email === "string" ? lead.values.email : undefined,
      subject,
      html: `<h2 style="font-family:sans-serif;color:#1a1a1a;">${escapeHtml(form.label)}</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">${rows}</table>`,
      attachments: photo ? [{ filename: `project-photo-${lead.id}.jpg`, content: photo }] : undefined,
    });
    if (error) {
      console.error(`[lead] Email failed for lead ${lead.id}:`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[lead] Email threw for lead ${lead.id}:`, err);
    return false;
  }
}

export async function POST(req: Request) {
  if (!rateLimit(`lead:${clientIp(req)}`, 8, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many submissions — please wait a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!isLeadKind(body.kind)) {
    return NextResponse.json({ error: "Unknown form." }, { status: 400 });
  }
  const kind = body.kind;
  const isBooking = kind === "home_quote" && body.source === BOOKING_SOURCE;
  const form = isBooking ? BOOKING_FORM : LEAD_FORMS[kind];

  // Bots: answer "ok" so they don't retry, but drop the submission.
  const elapsedMs = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (cleanString(body.hp, 200) || elapsedMs < MIN_FILL_MS) {
    console.warn(`[lead] Dropped likely spam (${kind}): honeypot=${Boolean(body.hp)} elapsedMs=${elapsedMs}`);
    return NextResponse.json({ ok: true });
  }

  const { values, errors } = validateValues(form.steps, body.values);
  const firstError = Object.values(errors)[0];
  if (firstError) {
    return NextResponse.json({ error: firstError, fields: errors }, { status: 400 });
  }

  // Booking requests are only taken inside the install area (the form already blocks the rest).
  if (isBooking && !isBookableZip(String(values.zip))) {
    return NextResponse.json(
      {
        error: `You're outside our usual install area. Give us a call at ${SITE.phone.display} and we'll let you know if we can help.`,
        fields: { zip: "outside the install area" },
      },
      { status: 400 }
    );
  }
  // Backward compatibility: anything reading the old single projectType still gets one.
  if (isBooking && Array.isArray(values.projectTypes)) values.projectType = values.projectTypes[0];

  const lead: Lead = {
    // The browser's event id (shared with the Meta pixel for dedup); also used in the photo's file path, so keep it path-safe.
    id: cleanString(body.eventId, 100).replace(/[^A-Za-z0-9-]/g, "") || crypto.randomUUID(),
    kind,
    funnel: form.funnel,
    route: isBooking ? bookingRoute(values) : computeRoute(kind, values),
    values,
    hidden: pickStrings(body.hidden, form.hiddenKeys, 100),
    attribution: pickStrings(body.attribution, isBooking ? BOOKING_ATTRIBUTION_KEYS : [...UTM_KEYS, "landing_page", "referrer"], 500),
    pageUrl: cleanString(body.pageUrl, 500),
    submittedAt: new Date().toISOString(),
  };
  if (kind === "package") lead.package = describePackageLead(values);
  if (isBooking) {
    lead.source = BOOKING_SOURCE;
    const slots = Array.isArray(values.slots) ? values.slots : [];
    lead.booking = { slots: slots.map((s) => ({ ...parseSlot(s)!, label: slotLabel(s, BOOKING_SLOTS) })) };
  }

  const unstoredPhoto = await storePhoto(lead);

  const webhook = process.env.CRM_WEBHOOK_URL;
  let delivered = Boolean(webhook) && (await forwardToCrm(webhook!, lead));
  // Email when there's no CRM, when the CRM failed, or when a photo needs to travel as an attachment.
  if (!delivered || unstoredPhoto) {
    delivered = (await emailLead(lead, form, unstoredPhoto)) || delivered;
  }

  if (!delivered) {
    console.error("[lead] UNDELIVERED LEAD — recover from this log line:", JSON.stringify(lead));
    return NextResponse.json(
      { error: "We couldn't send your details just now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, route: lead.route });
}
