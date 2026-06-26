// Shared config + helpers for the in-home consultation booking flow.

export const TIMEZONE = "America/New_York";
export const SLOT_DURATION_MINUTES = 60;

export const BUSINESS_HOURS = {
  startHour: 9,
  endHour: 17,
  // 0 = Sunday … 6 = Saturday. Closed Sundays.
  daysOpen: [1, 2, 3, 4, 5, 6],
};

// Minimum lead time before a slot can be booked.
export const MIN_LEAD_HOURS = 2;

// How many days ahead a customer can book.
export const MAX_BOOKING_DAYS_AHEAD = 60;

export const PROJECT_TYPES = [
  "WPC Fences",
  "Pergolas",
  "Gates",
  "Decking",
  "Cladding",
  "Container Pools",
  "Outdoor Living",
] as const;

export const PROPERTY_TYPES = [
  { value: "single-family", label: "Single-Family Home" },
  { value: "condo-hoa", label: "Condo / HOA" },
  { value: "commercial", label: "Commercial" },
] as const;

// Approximate ZIP ranges for Miami-Dade and Palm Beach County.
const SERVICE_ZIP_RANGES: [number, number][] = [
  [33001, 33299], // Miami-Dade County
  [33401, 33499], // Palm Beach County
];

export function isInServiceArea(zip: string): boolean {
  const z = Number.parseInt(zip, 10);
  if (!Number.isInteger(z) || !/^\d{5}$/.test(zip.trim())) return false;
  return SERVICE_ZIP_RANGES.some(([min, max]) => z >= min && z <= max);
}

/** Offset (in minutes) of `timeZone` from UTC at the given instant, accounting for DST. */
function getTimeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date);

  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;

  const asUTC = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second)
  );
  return (asUTC - date.getTime()) / 60000;
}

/** Converts a wall-clock time in `timeZone` (e.g. 9:00 AM in America/New_York) to a UTC Date. */
export function zonedTimeToUtc(dateStr: string, hour: number, minute: number, timeZone: string): Date {
  const naiveUtc = new Date(`${dateStr}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00Z`);
  const offset = getTimeZoneOffsetMinutes(naiveUtc, timeZone);
  return new Date(naiveUtc.getTime() - offset * 60000);
}

export function isValidDateString(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !Number.isNaN(new Date(`${dateStr}T00:00:00Z`).getTime());
}

function dayOfWeekFor(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function formatHourLabel(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:00 ${period}`;
}

export interface TimeSlot {
  /** ISO 8601 UTC start time */
  iso: string;
  /** Human readable label in business local time, e.g. "9:00 AM" */
  label: string;
}

/** Builds the full set of business-hour slots for a given date, dropping past/too-soon slots. */
export function generateSlotsForDate(dateStr: string): TimeSlot[] {
  if (!isValidDateString(dateStr)) return [];
  if (!BUSINESS_HOURS.daysOpen.includes(dayOfWeekFor(dateStr))) return [];

  const now = new Date();
  const earliestBookable = new Date(now.getTime() + MIN_LEAD_HOURS * 60 * 60 * 1000);

  const slots: TimeSlot[] = [];
  for (let hour = BUSINESS_HOURS.startHour; hour < BUSINESS_HOURS.endHour; hour++) {
    const start = zonedTimeToUtc(dateStr, hour, 0, TIMEZONE);
    if (start < earliestBookable) continue;
    slots.push({ iso: start.toISOString(), label: formatHourLabel(hour) });
  }
  return slots;
}

export function isDateBookable(dateStr: string): boolean {
  if (!isValidDateString(dateStr)) return false;
  const todayStr = new Date().toISOString().slice(0, 10);
  if (dateStr < todayStr) return false;
  const maxDate = new Date(Date.now() + MAX_BOOKING_DAYS_AHEAD * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (dateStr > maxDate) return false;
  return BUSINESS_HOURS.daysOpen.includes(dayOfWeekFor(dateStr));
}
