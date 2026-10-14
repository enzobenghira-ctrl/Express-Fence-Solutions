import { NextResponse } from "next/server";
import { UTM_KEYS } from "@/lib/attribution";
import { describePackageLead } from "@/lib/forms/package";
import { parseSlot, slotLabel } from "@/lib/forms/slots";
import { BOOKING_SLOTS, BOOKING_SOURCE, bookingRoute } from "@/lib/get-a-quote/booking";
import { isBookableZip } from "@/lib/get-a-quote/service-area-zips";
import { isLeadKind } from "@/lib/forms/registry";
import { PHOTO_DATA_PREFIX, validateValues } from "@/lib/forms/schema";
import { deliverLead, formFor, type Lead } from "@/lib/lead-delivery";
import { recordDelivery, saveLead, storePrivate } from "@/lib/lead-store";
import { computeRoute } from "@/lib/lead-routing";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site-config";

// Single endpoint for every lead form. Never lose a lead: it's saved to the private Blob
// store first (lib/lead-store.ts), then emailed to the company inbox and, if one is set,
// forwarded to the CRM webhook (lib/lead-delivery.ts). If the email fails the full lead is also written to the server log,
// the retry job re-sends it later, and the customer still gets their confirmation (with a
// "call us if you don't hear from us today" line) rather than an error.

export const maxDuration = 60; // Blob saves + CRM webhook + SMTP, each with its own timeout

const MIN_FILL_MS = 2500; // faster than a human can fill the shortest form
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
 * Moves an attached photo out of the lead values into the private Blob store (so the retry
 * job can re-attach it) and returns the JPEG for the notification email.
 */
async function takePhoto(lead: Lead): Promise<Buffer | null> {
  const dataUrl = lead.values.photo;
  if (typeof dataUrl !== "string" || !dataUrl.startsWith(PHOTO_DATA_PREFIX)) return null;
  delete lead.values.photo;

  const jpeg = Buffer.from(dataUrl.slice(PHOTO_DATA_PREFIX.length), "base64");
  if (jpeg[0] !== 0xff || jpeg[1] !== 0xd8 || jpeg[2] !== 0xff) {
    console.warn(`[lead] Ignored photo that isn't a JPEG on lead ${lead.id}`);
    return null;
  }

  const url = await storePrivate(`quote-photos/${lead.id}-${crypto.randomUUID()}.jpg`, jpeg, "image/jpeg");
  if (url) lead.photoUrl = url;
  else lead.photoNote = "A photo was sent, but it couldn't be saved to storage — it's only in the first notification email.";
  return jpeg;
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
  const form = formFor({ kind, source: isBooking ? BOOKING_SOURCE : undefined });

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

  const photo = await takePhoto(lead);
  const saved = await saveLead(`${kind}-${lead.id}`, lead);

  const attempts = await deliverLead(lead, photo);
  // Delivered = it reached the inbox. A lead only the CRM accepted is still retried by email.
  const delivered = attempts.some((a) => a.channel === "email" && a.ok);
  await recordDelivery(saved, delivered ? "delivered" : "failed", attempts);

  if (!delivered) {
    console.error(
      `[lead] UNDELIVERED LEAD ${lead.id} — ${saved.url ? `saved at ${saved.path}; the retry job will re-send it` : "NOT SAVED to Blob either; recover it from this log line"}:`,
      JSON.stringify(lead)
    );
  }

  // The lead is safe either way, so the customer always gets their confirmation;
  // `delivered: false` makes the form add "If you don't hear from us today, call…".
  return NextResponse.json({ ok: true, route: lead.route, delivered });
}
