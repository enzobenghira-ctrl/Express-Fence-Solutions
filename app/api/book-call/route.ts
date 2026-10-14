import { NextResponse } from "next/server";
import { CALENDAR_ID, describeGoogleError, getCalendarClient } from "@/lib/google-calendar";
import { SLOT_DURATION_MINUTES, TIMEZONE, generateSlotsForDate, isDateBookable } from "@/lib/booking-config";
import { EMAIL_RE, isValidPhone } from "@/lib/form-validation";
import { emailTradeCall, type TradeCallLead } from "@/lib/lead-delivery";
import { deliveryAttempt, recordDelivery, saveLead, type DeliveryAttempt } from "@/lib/lead-store";
import { clientIp, rateLimit } from "@/lib/rate-limit";

// Books a trade qualification call. This is the in-house fallback used on /thank-you-trade
// until CALENDAR_TRADE_URL points at an external scheduler. Separate from
// /api/book-consultation, which handles in-home visits — and, like it, never loses a request:
// it's saved to the private Blob store first, then put on the Google Calendar and emailed to
// the company inbox. If the email fails the full request is in the server log and the retry
// job re-sends it. `onCalendar: false` makes the form say "Request received" instead of "booked".

export const maxDuration = 60; // Blob save + Calendar + SMTP, each with its own timeout

interface CallPayload {
  slotIso: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
}

/** YYYY-MM-DD of an instant in the business time zone. */
function localDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(iso)
  );
}

function formatSlotDisplay(iso: string): string {
  const d = new Date(iso);
  const dateStr = d.toLocaleDateString("en-US", { timeZone: TIMEZONE, weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeStr = d.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour: "numeric", minute: "2-digit" });
  return `${dateStr} at ${timeStr}`;
}

function validate(body: Partial<CallPayload>): string | null {
  if (!body.name || body.name.trim().length < 2) return "Please enter your name.";
  if (!body.email || !EMAIL_RE.test(body.email.trim())) return "Please enter a valid email address.";
  if (!body.phone || !isValidPhone(body.phone)) return "Please enter a valid 10-digit phone number.";
  if (!body.slotIso || Number.isNaN(new Date(body.slotIso).getTime())) return "Please choose a time.";
  // Only accept a real, still-bookable business-hours slot.
  const date = localDate(body.slotIso);
  const iso = new Date(body.slotIso).toISOString();
  if (!isDateBookable(date) || !generateSlotsForDate(date).some((s) => s.iso === iso)) {
    return "That time is no longer available. Please choose another.";
  }
  return null;
}

/** Puts the call on the calendar. "slot_taken" means someone booked that time first. */
async function addToCalendar(lead: TradeCallLead): Promise<"slot_taken" | DeliveryAttempt> {
  let calendar;
  try {
    calendar = getCalendarClient();
  } catch (err) {
    console.error("[book-call] Calendar auth failed:", describeGoogleError(err));
    return deliveryAttempt("calendar", `auth: ${describeGoogleError(err)}`);
  }

  try {
    const freebusy = await calendar.freebusy.query({
      requestBody: { timeMin: lead.start, timeMax: lead.end, timeZone: TIMEZONE, items: [{ id: CALENDAR_ID }] },
    });
    if ((freebusy.data.calendars?.[CALENDAR_ID]?.busy || []).length > 0) return "slot_taken";

    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `Trade qualification call — ${lead.company || lead.name}`,
        description: [
          `Contact: ${lead.name}`,
          lead.company ? `Company: ${lead.company}` : null,
          `Phone: ${lead.phone}`,
          `Email: ${lead.email}`,
          "Booked from /thank-you-trade after a trade application.",
        ]
          .filter(Boolean)
          .join("\n"),
        start: { dateTime: lead.start, timeZone: TIMEZONE },
        end: { dateTime: lead.end, timeZone: TIMEZONE },
      },
    });
    return deliveryAttempt("calendar");
  } catch (err) {
    console.error(`[book-call] Calendar API failed for calendarId="${CALENDAR_ID}":`, describeGoogleError(err));
    return deliveryAttempt("calendar", describeGoogleError(err));
  }
}

export async function POST(req: Request) {
  if (!rateLimit(`book-call:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts — please wait a few minutes." }, { status: 429 });
  }

  let body: Partial<CallPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const { slotIso, name, email, phone, company } = body as CallPayload;
  const start = new Date(slotIso).toISOString();
  const lead: TradeCallLead = {
    id: crypto.randomUUID(),
    kind: "trade_call",
    start,
    end: new Date(new Date(slotIso).getTime() + SLOT_DURATION_MINUTES * 60000).toISOString(),
    when: formatSlotDisplay(start),
    name: name.trim(),
    company: typeof company === "string" && company.trim() ? company.trim().slice(0, 200) : undefined,
    email: email.trim(),
    phone: phone.trim(),
    submittedAt: new Date().toISOString(),
  };
  // Saved before the calendar or the email is touched, so neither outage can lose the request.
  const saved = await saveLead(`trade_call-${lead.id}`, lead);

  const calendar = await addToCalendar(lead);
  if (calendar === "slot_taken") {
    await recordDelivery(saved, "slot_taken", []);
    return NextResponse.json({ error: "That time was just booked. Please choose another." }, { status: 409 });
  }

  const emailAttempt = await emailTradeCall(lead, calendar.ok);
  const delivered = emailAttempt.ok;
  await recordDelivery(saved, delivered ? "delivered" : "failed", [calendar, emailAttempt]);

  if (!delivered) {
    console.error(
      `[book-call] UNDELIVERED LEAD ${lead.id} — ${saved.url ? `saved at ${saved.path}; the retry job will re-send it` : "NOT SAVED to Blob either; recover it from this log line"}:`,
      JSON.stringify(lead)
    );
  }

  return NextResponse.json({ ok: true, delivered, onCalendar: calendar.ok });
}
