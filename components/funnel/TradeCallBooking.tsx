"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { MAX_BOOKING_DAYS_AHEAD, TIMEZONE } from "@/lib/booking-config";
import { EMAIL_RE, formatPhone, isValidPhone } from "@/lib/form-validation";
import { readLastLead } from "@/lib/last-lead";
import { SITE } from "@/lib/site-config";

interface Slot {
  iso: string;
  label: string;
}

function formatSlot(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", { timeZone: TIMEZONE, weekday: "long", month: "long", day: "numeric" });
  const time = d.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour: "numeric", minute: "2-digit" });
  return `${date} at ${time}`;
}

/**
 * In-house booking for the trade qualification call — the fallback CalendarEmbed shows
 * until CALENDAR_TRADE_URL is set. Contact details come pre-filled from the application.
 */
export default function TradeCallBooking() {
  const id = useId();
  const [contact, setContact] = useState({ name: "", email: "", phone: "", company: "" });
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slot, setSlot] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState("");

  useEffect(() => {
    const last = readLastLead();
    if (last?.kind === "trade_application") {
      setContact({
        name: last.contact.contactName ?? "",
        email: last.contact.email ?? "",
        phone: last.contact.phone ?? "",
        company: last.contact.company ?? "",
      });
    }
  }, []);

  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    setSlotsLoading(true);
    setSlot("");
    fetch(`/api/availability?date=${date}`)
      .then((r) => r.json())
      .then((data) => !cancelled && setSlots(Array.isArray(data.slots) ? data.slots : []))
      .catch(() => !cancelled && setSlots([]))
      .finally(() => !cancelled && setSlotsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [date]);

  const today = new Date().toISOString().slice(0, 10);
  const maxDate = new Date(Date.now() + MAX_BOOKING_DAYS_AHEAD * 86400000).toISOString().slice(0, 10);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!slot) return setError("Please choose a time.");
    if (contact.name.trim().length < 2) return setError("Please enter your name.");
    if (!EMAIL_RE.test(contact.email.trim())) return setError("Please enter a valid email address.");
    if (!isValidPhone(contact.phone)) return setError("Please enter a valid 10-digit phone number.");

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotIso: slot, ...contact }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "");
      setBooked(slot);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : `Something went wrong. Please call us at ${SITE.phone.display}.`);
    } finally {
      setSubmitting(false);
    }
  }

  const card = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px, 4vw, 32px)" };

  if (booked) {
    return (
      <div style={{ ...card, textAlign: "center" }} role="status">
        <CheckCircle2 size={36} style={{ color: "var(--green)", margin: "0 auto 12px" }} aria-hidden />
        <h2 className="efs-h2" style={{ fontSize: 32, marginBottom: 10 }}>
          Your call is booked
        </h2>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--dark)", fontWeight: 600 }}>{formatSlot(booked)}</p>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)", marginTop: 8 }}>
          We&apos;ll call {contact.phone}. Need to change it? Call {SITE.phone.display}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={card}>
      <label htmlFor={`${id}-date`} className="efs-form-label">
        Choose a day (Mon–Sat)
      </label>
      <input id={`${id}-date`} type="date" min={today} max={maxDate} value={date} onChange={(e) => setDate(e.target.value)} />

      {date && (
        <div style={{ marginTop: 20 }}>
          <p id={`${id}-times`} className="efs-form-label">
            Available times
          </p>
          {slotsLoading ? (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)", display: "flex", gap: 8, alignItems: "center" }}>
              <Loader2 size={14} className="animate-spin" aria-hidden /> Checking availability…
            </p>
          ) : slots.length === 0 ? (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)" }}>
              No times left that day — please choose another.
            </p>
          ) : (
            <div role="radiogroup" aria-labelledby={`${id}-times`} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {slots.map((s) => (
                <label key={s.iso} className="efs-choice">
                  <input type="radio" name="slot" value={s.iso} checked={slot === s.iso} onChange={() => setSlot(s.iso)} />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
        <div>
          <label htmlFor={`${id}-name`} className="efs-form-label">Your name</label>
          <input id={`${id}-name`} autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="efs-form-label">Phone we should call</label>
          <input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: formatPhone(e.target.value) })}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="efs-form-label">Email</label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
      </div>

      {error && (
        <p className="efs-field-error" role="alert" style={{ marginTop: 16 }}>
          {error}
        </p>
      )}

      <button type="submit" className="efs-btn efs-btn--primary efs-btn--block" style={{ marginTop: 24 }} disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden /> Booking…
          </>
        ) : (
          "Book my call"
        )}
      </button>
    </form>
  );
}
