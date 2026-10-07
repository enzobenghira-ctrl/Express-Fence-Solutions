// Preferred appointment slots ("2026-10-14|morning"): a date plus a time window. Shared by
// the browser (picker + validation) and /api/lead, so both accept exactly the same slots.
// Dates are plain YYYY-MM-DD strings, and the math is done in UTC so time zones never shift a day.

export interface SlotWindow {
  value: string;
  label: string;
}

export interface SlotConfig {
  /** First bookable day, counted from today (1 = tomorrow). */
  minDaysAhead: number;
  /** Last bookable day, counted from today. */
  maxDaysAhead: number;
  /** Days we don't visit: 0 = Sunday … 6 = Saturday. */
  closedWeekdays: number[];
  windows: SlotWindow[];
  maxSlots: number;
  /** The business's time zone, for "today" on the server. */
  timeZone: string;
}

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Today's date (YYYY-MM-DD) in a time zone. */
export function todayIn(timeZone: string, now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Today's date (YYYY-MM-DD) in the visitor's own time zone. */
export function localToday(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function toUtc(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function addDays(iso: string, days: number): string {
  const d = toUtc(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function weekdayOf(iso: string): number {
  return toUtc(iso).getUTCDay();
}

export function isRealDate(iso: string): boolean {
  return ISO_RE.test(iso) && toUtc(iso).toISOString().slice(0, 10) === iso;
}

/** Every bookable date, in order. */
export function bookableDates(config: SlotConfig, today: string): string[] {
  const out: string[] = [];
  for (let i = config.minDaysAhead; i <= config.maxDaysAhead; i++) {
    const day = addDays(today, i);
    if (!config.closedWeekdays.includes(weekdayOf(day))) out.push(day);
  }
  return out;
}

export function makeSlot(date: string, window: string): string {
  return `${date}|${window}`;
}

export function parseSlot(slot: string): { date: string; window: string } | null {
  const [date, window, extra] = slot.split("|");
  return date && window && extra === undefined ? { date, window } : null;
}

/** e.g. "Tue, Oct 14" */
export function dateLabel(iso: string): string {
  return toUtc(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
}

/** e.g. "Tue, Oct 14 · Morning (8–12)" */
export function slotLabel(slot: string, config: SlotConfig): string {
  const s = parseSlot(slot);
  if (!s) return slot;
  return `${dateLabel(s.date)} · ${config.windows.find((w) => w.value === s.window)?.label ?? s.window}`;
}

/**
 * Null when every slot is a real, open date in range with a known window, with no repeats.
 * `today` defaults to today in the business's time zone; one day of slack on each end
 * covers a visitor whose clock is in a neighbouring time zone.
 */
export function slotError(slots: string[], config: SlotConfig, today = todayIn(config.timeZone)): string | null {
  if (slots.length > config.maxSlots) return `Choose up to ${config.maxSlots} times.`;
  if (new Set(slots).size !== slots.length) return "Each time can only be picked once.";
  const first = addDays(today, config.minDaysAhead - 1);
  const last = addDays(today, config.maxDaysAhead + 1);
  for (const slot of slots) {
    const s = parseSlot(slot);
    if (!s || !isRealDate(s.date) || !config.windows.some((w) => w.value === s.window)) return "Please choose from the times shown.";
    if (s.date < first || s.date > last || config.closedWeekdays.includes(weekdayOf(s.date))) return "Please choose from the dates shown.";
  }
  return null;
}
