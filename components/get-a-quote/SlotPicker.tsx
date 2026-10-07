"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { addDays, dateLabel, localToday, makeSlot, parseSlot, slotLabel, weekdayOf, type SlotConfig } from "@/lib/forms/slots";

interface Props {
  /** The group's id — validation focuses it. */
  id: string;
  value: string[];
  onChange: (slots: string[]) => void;
  config: SlotConfig;
  describedBy?: string;
}

/** By date, then by window in the order the config lists them (morning before afternoon). */
function inTimeOrder(slots: string[], config: SlotConfig): string[] {
  const rank = (s: string) => {
    const p = parseSlot(s);
    return `${p?.date}|${String(config.windows.findIndex((w) => w.value === p?.window)).padStart(2, "0")}`;
  };
  return [...slots].sort((a, b) => rank(a).localeCompare(rank(b)));
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

/** Pick a day, then a window; up to config.maxSlots requests, listed below with a remove button each. */
export default function SlotPicker({ id, value, onChange, config, describedBy }: Props) {
  const today = useMemo(() => localToday(), []);
  const [day, setDay] = useState<string | null>(null);

  // Every day in range (closed days shown but disabled), padded to start on a Sunday column.
  const days = useMemo(() => {
    const list: string[] = [];
    for (let i = config.minDaysAhead; i <= config.maxDaysAhead; i++) list.push(addDays(today, i));
    return list;
  }, [today, config.minDaysAhead, config.maxDaysAhead]);
  const lead = weekdayOf(days[0]);
  const full = value.length >= config.maxSlots;

  function toggle(window: string) {
    if (!day) return;
    const slot = makeSlot(day, window);
    if (value.includes(slot)) onChange(value.filter((s) => s !== slot));
    else if (!full) onChange(inTimeOrder([...value, slot], config));
  }

  return (
    <div id={id} tabIndex={-1} role="group" aria-label="Preferred times" aria-describedby={describedBy} className="efs-slots">
      <div className="efs-slots-grid" role="group" aria-label="Choose a day">
        {WEEKDAYS.map((w) => (
          <span key={w} className="efs-slots-weekday" aria-hidden>
            {w}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`pad-${i}`} aria-hidden />
        ))}
        {days.map((d, i) => {
          const closed = config.closedWeekdays.includes(weekdayOf(d));
          const picked = value.some((s) => parseSlot(s)?.date === d);
          const dd = d.slice(8);
          const showMonth = i === 0 || dd === "01";
          return (
            <button
              key={d}
              type="button"
              className="efs-slots-day"
              disabled={closed}
              aria-pressed={day === d}
              aria-label={`${longDate(d)}${closed ? ", closed" : ""}${picked ? ", time chosen" : ""}`}
              data-picked={picked || undefined}
              onClick={() => setDay(d)}
            >
              {showMonth && <span className="efs-slots-month">{new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })}</span>}
              {Number(dd)}
            </button>
          );
        })}
      </div>

      {day && (
        <div className="efs-slots-windows" role="group" aria-label={`Time on ${longDate(day)}`}>
          <p className="efs-form-label" style={{ marginBottom: 8 }}>
            {dateLabel(day)}: pick a time
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {config.windows.map((w) => {
              const on = value.includes(makeSlot(day, w.value));
              return (
                <button key={w.value} type="button" className="efs-slots-window" aria-pressed={on} disabled={!on && full} onClick={() => toggle(w.value)}>
                  {w.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div aria-live="polite">
        <p className="efs-slots-count">
          {value.length === 0 ? "No times picked yet." : `${value.length} of ${config.maxSlots} picked${full ? " — that's the maximum" : ""}.`}
        </p>
        {value.length > 0 && (
          <ul className="efs-slots-list">
            {value.map((s) => (
              <li key={s}>
                <span>{slotLabel(s, config)}</span>
                <button type="button" aria-label={`Remove ${slotLabel(s, config)}`} onClick={() => onChange(value.filter((v) => v !== s))}>
                  <X size={16} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
