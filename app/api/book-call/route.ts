import { NextResponse } from "next/server";
import { CALENDAR_ID, describeGoogleError, getCalendarClient } from "@/lib/google-calendar";
import { SLOT_DURATION_MINUTES, TIMEZONE, generateSlotsForDate, isDateBookable } from "@/lib/booking-config";
import { EMAIL_RE, isValidPhone } from "@/lib/form-validation";
import { SITE } from "@/lib/site-config";

// Books a trade qualification call on the shared Google Calendar. This is the in-house
// fallback used on /thank-you-trade until CALENDAR_TRADE_URL points at an external
// scheduler. Separate from /api/book-consultation, which handles in-home visits.

interface CallPayload {
  slotIso: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
}

const UNAVAILABLE = `Booking is temporarily unavailable. Please call us at ${SITE.phone.display}.`;

/** YYYY-MM-DD of an instant in the business time zone. */
function localDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(iso)
  );
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

export async function POST(req: Request) {
  let body: Partial<CallPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const { slotIso, name, email, phone, company } = body as CallPayload;
  const startIso = new Date(slotIso).toISOString();
  const endIso = new Date(new Date(slotIso).getTime() + SLOT_DURATION_MINUTES * 60000).toISOString();

  let calendar;
  try {
    calendar = getCalendarClient();
  } catch (err) {
    console.error("[book-call] Calendar auth failed:", describeGoogleError(err));
    return NextResponse.json({ error: UNAVAILABLE }, { status: 500 });
  }

  try {
    const freebusy = await calendar.freebusy.query({
      requestBody: { timeMin: startIso, timeMax: endIso, timeZone: TIMEZONE, items: [{ id: CALENDAR_ID }] },
    });
    if ((freebusy.data.calendars?.[CALENDAR_ID]?.busy || []).length > 0) {
      return NextResponse.json({ error: "That time was just booked. Please choose another." }, { status: 409 });
    }

    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `Trade qualification call — ${company?.trim() || name.trim()}`,
        description: [
          `Contact: ${name.trim()}`,
          company ? `Company: ${company.trim()}` : null,
          `Phone: ${phone.trim()}`,
          `Email: ${email.trim()}`,
          "Booked from /thank-you-trade after a trade application.",
        ]
          .filter(Boolean)
          .join("\n"),
        start: { dateTime: startIso, timeZone: TIMEZONE },
        end: { dateTime: endIso, timeZone: TIMEZONE },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[book-call] Calendar API failed for calendarId="${CALENDAR_ID}":`, describeGoogleError(err));
    return NextResponse.json({ error: UNAVAILABLE }, { status: 500 });
  }
}
