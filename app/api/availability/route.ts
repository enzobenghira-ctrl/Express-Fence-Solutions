import { NextResponse } from "next/server";
import { CALENDAR_ID, describeGoogleError, getCalendarClient } from "@/lib/google-calendar";
import { generateSlotsForDate, isDateBookable, SLOT_DURATION_MINUTES, TIMEZONE } from "@/lib/booking-config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || "";

  if (!isDateBookable(date)) {
    return NextResponse.json({ error: "Please choose a valid date (Mon–Sat, within the next 60 days)." }, { status: 400 });
  }

  const slots = generateSlotsForDate(date);
  if (slots.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  try {
    const calendar = getCalendarClient();
    const timeMin = slots[0].iso;
    const timeMax = new Date(new Date(slots[slots.length - 1].iso).getTime() + SLOT_DURATION_MINUTES * 60000).toISOString();

    const freebusy = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: TIMEZONE,
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busy = freebusy.data.calendars?.[CALENDAR_ID]?.busy || [];
    const available = slots.filter((slot) => {
      const slotStart = new Date(slot.iso).getTime();
      const slotEnd = slotStart + SLOT_DURATION_MINUTES * 60000;
      return !busy.some((b) => {
        const busyStart = new Date(b.start || "").getTime();
        const busyEnd = new Date(b.end || "").getTime();
        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });

    return NextResponse.json({ slots: available });
  } catch (err) {
    console.error(
      `[availability] Calendar freebusy check failed for calendarId="${CALENDAR_ID}" — falling back to unfiltered business-hours slots:`,
      describeGoogleError(err),
      err
    );
    // Fall back to showing all generated slots if the calendar can't be reached,
    // so the booking flow stays usable; the booking submission still re-validates.
    return NextResponse.json({ slots, warning: "Live availability could not be confirmed." });
  }
}
