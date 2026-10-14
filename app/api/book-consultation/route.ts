import { NextResponse } from "next/server";
import { CALENDAR_ID, describeGoogleError, getCalendarClient } from "@/lib/google-calendar";
import {
  isInServiceArea,
  OUT_OF_AREA_MESSAGE,
  PROJECT_TYPES,
  PROPERTY_TYPES,
  SLOT_DURATION_MINUTES,
  TIMEZONE,
  MIN_LEAD_HOURS,
} from "@/lib/booking-config";
import { consultationUtm, emailConsultation, type ConsultationLead } from "@/lib/lead-delivery";
import { deliveryAttempt, recordDelivery, saveLead, type DeliveryAttempt } from "@/lib/lead-store";
import { escapeHtml, sendMail } from "@/lib/mailer";
import { SITE } from "@/lib/site-config";

// In-home consultation bookings. Like /api/lead, never lose one: the request is saved to the
// private Blob store first, then put on the Google Calendar and emailed to the company inbox.
// If the email fails, the full request is in the server log, the retry job re-sends the
// email later, and the customer still sees their confirmation (with a "call us if you don't
// hear from us today" line). `onCalendar: false` makes the form say "Request received"
// instead of "booked", since the time isn't reserved yet.

export const maxDuration = 60; // Blob save + Calendar + two SMTP sends, each with its own timeout

function formatSlotDisplay(iso: string): string {
  const d = new Date(iso);
  const dateStr = d.toLocaleDateString("en-US", { timeZone: TIMEZONE, weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeStr = d.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour: "numeric", minute: "2-digit" });
  return `${dateStr} at ${timeStr}`;
}

async function sendCustomerConfirmation(lead: ConsultationLead): Promise<DeliveryAttempt> {
  const result = await sendMail({
    to: lead.email,
    replyTo: SITE.email,
    subject: "Your Free In-Home Consultation is Booked — Express Fence Solutions",
    html: `
      <h2 style="font-family:sans-serif;color:#1a1a1a;">Your consultation is booked!</h2>
      <p style="font-family:sans-serif;font-size:15px;color:#1a1a1a;">Hi ${escapeHtml(lead.name)}, we'll see you at the time below. We'll bring real WPC samples and measure your property for an accurate, no-obligation quote.</p>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:520px;margin-top:16px;">
        <tr><td style="padding:8px 0;color:#666;width:100px;">When</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${lead.when}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Where</td><td style="padding:8px 0;color:#1a1a1a;">${escapeHtml(`${lead.address}, ${lead.zip}`)}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:13px;color:#666;margin-top:24px;">Need to reschedule? Call us at ${SITE.phone.display}.</p>
    `,
    context: `consultation ${lead.id} (customer confirmation)`,
  });
  return deliveryAttempt("customer_confirmation", result.ok ? null : result.error);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d()+\-.\s]{7,20}$/;

interface BookingPayload {
  projectTypes: string[];
  propertyType: string;
  address: string;
  zip: string;
  slotIso: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  utm?: { source?: string; medium?: string; campaign?: string };
}

function validate(body: Partial<BookingPayload>): string | null {
  if (!Array.isArray(body.projectTypes) || body.projectTypes.length === 0) {
    return "Please select at least one project type.";
  }
  if (body.projectTypes.some((p) => !PROJECT_TYPES.includes(p as (typeof PROJECT_TYPES)[number]))) {
    return "Invalid project type.";
  }
  if (!body.propertyType || !PROPERTY_TYPES.some((p) => p.value === body.propertyType)) {
    return "Please select a valid property type.";
  }
  if (!body.address || body.address.trim().length < 5) {
    return "Please enter a valid address.";
  }
  if (!body.zip || !isInServiceArea(body.zip)) {
    return OUT_OF_AREA_MESSAGE;
  }
  if (!body.slotIso || Number.isNaN(new Date(body.slotIso).getTime())) {
    return "Please select a valid consultation time.";
  }
  const earliestBookable = Date.now() + MIN_LEAD_HOURS * 60 * 60 * 1000;
  if (new Date(body.slotIso).getTime() < earliestBookable) {
    return "That time is no longer available. Please choose another slot.";
  }
  if (!body.name || body.name.trim().length < 2) {
    return "Please enter your full name.";
  }
  if (!body.email || !EMAIL_RE.test(body.email)) {
    return "Please enter a valid email address.";
  }
  if (!body.phone || !PHONE_RE.test(body.phone)) {
    return "Please enter a valid phone number.";
  }
  return null;
}

/** Puts the visit on the calendar. "slot_taken" means someone booked that time first. */
async function addToCalendar(lead: ConsultationLead): Promise<"slot_taken" | DeliveryAttempt> {
  let calendar;
  try {
    calendar = getCalendarClient();
  } catch (err) {
    console.error("[book-consultation] Calendar auth failed before any API call:", describeGoogleError(err));
    return deliveryAttempt("calendar", `auth: ${describeGoogleError(err)}`);
  }

  try {
    const freebusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: lead.start,
        timeMax: lead.end,
        timeZone: TIMEZONE,
        items: [{ id: CALENDAR_ID }],
      },
    });
    const busy = freebusy.data.calendars?.[CALENDAR_ID]?.busy || [];
    if (busy.length > 0) return "slot_taken";

    const utm = consultationUtm(lead.utm);
    const description = [
      `Project types: ${lead.projectTypes.join(", ")}`,
      `Property type: ${lead.propertyType}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Notes: ${lead.notes || "—"}`,
      utm ? `UTM: ${utm}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // Note: attendees are intentionally omitted — a plain service account (no Google
    // Workspace Domain-Wide Delegation) cannot invite attendees on events it creates.
    // The customer's contact info is captured in the description instead.
    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `In-Home Consultation — ${lead.name}`,
        description,
        location: `${lead.address}, ${lead.zip}`,
        start: { dateTime: lead.start, timeZone: TIMEZONE },
        end: { dateTime: lead.end, timeZone: TIMEZONE },
      },
    });
    return deliveryAttempt("calendar");
  } catch (err) {
    console.error(`[book-consultation] Calendar API call failed for calendarId="${CALENDAR_ID}":`, describeGoogleError(err), err);
    return deliveryAttempt("calendar", describeGoogleError(err));
  }
}

export async function POST(req: Request) {
  let body: Partial<BookingPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { projectTypes, propertyType, address, zip, slotIso, name, email, phone, notes, utm } = body as BookingPayload;
  const start = new Date(slotIso).toISOString();
  const lead: ConsultationLead = {
    id: crypto.randomUUID(),
    kind: "consultation",
    projectTypes,
    propertyType: PROPERTY_TYPES.find((p) => p.value === propertyType)?.label || propertyType,
    address: address.trim(),
    zip: zip.trim(),
    start,
    end: new Date(new Date(slotIso).getTime() + SLOT_DURATION_MINUTES * 60000).toISOString(),
    when: formatSlotDisplay(start),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    notes: typeof notes === "string" && notes.trim() ? notes.trim() : undefined,
    utm,
    submittedAt: new Date().toISOString(),
  };
  // Saved before the calendar or any email is touched, so neither outage can lose the request.
  const saved = await saveLead(`consultation-${lead.id}`, lead);

  const calendar = await addToCalendar(lead);
  if (calendar === "slot_taken") {
    await recordDelivery(saved, "slot_taken", []);
    return NextResponse.json({ error: "That time slot was just booked. Please choose another." }, { status: 409 });
  }

  const emailAttempt = await emailConsultation(lead, calendar.ok);
  const attempts: DeliveryAttempt[] = [calendar, emailAttempt];
  // Delivered = it reached the inbox; a calendar-only booking is still retried by email.
  const delivered = emailAttempt.ok;
  // Only confirm the time to the customer by email once it's actually on the calendar.
  if (calendar.ok) attempts.push(await sendCustomerConfirmation(lead));
  await recordDelivery(saved, delivered ? "delivered" : "failed", attempts);

  if (!delivered) {
    console.error(
      `[book-consultation] UNDELIVERED LEAD ${lead.id} — ${saved.url ? `saved at ${saved.path}; the retry job will re-send it` : "NOT SAVED to Blob either; recover it from this log line"}:`,
      JSON.stringify(lead)
    );
  }

  // The request is safe either way, so the customer always gets their confirmation;
  // `delivered: false` makes the form add "If you don't hear from us today, call…".
  return NextResponse.json({ ok: true, delivered, onCalendar: calendar.ok });
}
