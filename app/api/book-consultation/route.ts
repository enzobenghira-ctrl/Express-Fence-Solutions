import { Resend } from "resend";
import { NextResponse } from "next/server";
import { CALENDAR_ID, describeGoogleError, getCalendarClient } from "@/lib/google-calendar";
import {
  isInServiceArea,
  PROJECT_TYPES,
  PROPERTY_TYPES,
  SLOT_DURATION_MINUTES,
  TIMEZONE,
  MIN_LEAD_HOURS,
} from "@/lib/booking-config";

function formatSlotDisplay(iso: string): string {
  const d = new Date(iso);
  const dateStr = d.toLocaleDateString("en-US", { timeZone: TIMEZONE, weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeStr = d.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour: "numeric", minute: "2-digit" });
  return `${dateStr} at ${timeStr}`;
}

async function sendCustomerConfirmation(opts: { email: string; name: string; address: string; zip: string; startIso: string }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Express Fence Solutions <onboarding@resend.dev>",
    to: opts.email,
    replyTo: "Info@expressfencesolutions.com",
    subject: "Your Free In-Home Consultation is Booked — Express Fence Solutions",
    html: `
      <h2 style="font-family:sans-serif;color:#1a1a1a;">Your consultation is booked!</h2>
      <p style="font-family:sans-serif;font-size:15px;color:#1a1a1a;">Hi ${opts.name}, we'll see you at the time below. We'll bring real WPC samples and measure your property for an accurate, no-obligation quote.</p>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;max-width:520px;margin-top:16px;">
        <tr><td style="padding:8px 0;color:#666;width:100px;">When</td><td style="padding:8px 0;font-weight:600;color:#1a1a1a;">${formatSlotDisplay(opts.startIso)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Where</td><td style="padding:8px 0;color:#1a1a1a;">${opts.address}, ${opts.zip}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:13px;color:#666;margin-top:24px;">Need to reschedule? Call us at (305) 967-9202.</p>
    `,
  });
  if (error) throw new Error(error.message);
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
    return "We currently serve Miami-Dade & Broward County. Please call us to check availability in your area.";
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
  const startIso = new Date(slotIso).toISOString();
  const endIso = new Date(new Date(slotIso).getTime() + SLOT_DURATION_MINUTES * 60000).toISOString();
  const propertyLabel = PROPERTY_TYPES.find((p) => p.value === propertyType)?.label || propertyType;

  let calendar;
  try {
    calendar = getCalendarClient();
  } catch (err) {
    console.error("[book-consultation] Calendar auth failed before any API call:", describeGoogleError(err));
    return NextResponse.json(
      { error: "Booking is temporarily unavailable. Please call us at (305) 967-9202." },
      { status: 500 }
    );
  }

  try {
    const freebusy = await calendar.freebusy.query({
      requestBody: {
        timeMin: startIso,
        timeMax: endIso,
        timeZone: TIMEZONE,
        items: [{ id: CALENDAR_ID }],
      },
    });
    const busy = freebusy.data.calendars?.[CALENDAR_ID]?.busy || [];
    if (busy.length > 0) {
      return NextResponse.json(
        { error: "That time slot was just booked. Please choose another." },
        { status: 409 }
      );
    }

    const description = [
      `Project types: ${projectTypes.join(", ")}`,
      `Property type: ${propertyLabel}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Notes: ${notes || "—"}`,
      utm && (utm.source || utm.medium || utm.campaign)
        ? `UTM: source=${utm.source || "—"} medium=${utm.medium || "—"} campaign=${utm.campaign || "—"}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    // Note: attendees are intentionally omitted — a plain service account (no Google
    // Workspace Domain-Wide Delegation) cannot invite attendees on events it creates.
    // The customer's contact info is captured in the description instead.
    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `In-Home Consultation — ${name}`,
        description,
        location: `${address}, ${zip}`,
        start: { dateTime: startIso, timeZone: TIMEZONE },
        end: { dateTime: endIso, timeZone: TIMEZONE },
      },
    });

    try {
      await sendCustomerConfirmation({ email, name, address, zip, startIso });
    } catch (emailErr) {
      // Don't fail the booking over a non-critical confirmation email — the
      // calendar event (the source of truth) was already created successfully.
      console.error("[book-consultation] Confirmation email failed:", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(
      `[book-consultation] Calendar API call failed for calendarId="${CALENDAR_ID}":`,
      describeGoogleError(err),
      err
    );
    return NextResponse.json(
      { error: "Something went wrong booking your consultation. Please call us at (305) 967-9202." },
      { status: 500 }
    );
  }
}
