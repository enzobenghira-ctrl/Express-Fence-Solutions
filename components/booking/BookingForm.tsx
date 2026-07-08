"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { PROJECT_TYPES, PROPERTY_TYPES, TIMEZONE, isInServiceArea } from "@/lib/booking-config";
import { trackEvent } from "@/lib/metaEvents";

const STEP_LABELS = ["Project", "Address", "Date & Time", "Your Info"];

interface Slot {
  iso: string;
  label: string;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function formatSlotDisplay(iso: string): string {
  const d = new Date(iso);
  const dateStr = d.toLocaleDateString("en-US", { timeZone: TIMEZONE, weekday: "long", month: "long", day: "numeric" });
  const timeStr = d.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour: "numeric", minute: "2-digit" });
  return `${dateStr} at ${timeStr}`;
}

const todayStr = new Date().toISOString().slice(0, 10);
const maxDateStr = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availabilityWarning, setAvailabilityWarning] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const [utm, setUtm] = useState<{ source?: string; medium?: string; campaign?: string }>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get("utm_source") || undefined,
      medium: params.get("utm_medium") || undefined,
      campaign: params.get("utm_campaign") || undefined,
    });
  }, []);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }
    setSlotsLoading(true);
    setSelectedSlot("");
    setAvailabilityWarning("");
    fetch(`/api/availability?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || []);
        setAvailabilityWarning(data.warning || "");
      })
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [date]);

  function toggleProjectType(p: string) {
    setProjectTypes((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  }

  function validateStep(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (projectTypes.length === 0) e.projectTypes = "Select at least one project type.";
      if (!propertyType) e.propertyType = "Select your property type.";
    }
    if (s === 1) {
      if (address.trim().length < 5) e.address = "Enter your full address.";
      if (!/^\d{5}$/.test(zip.trim())) e.zip = "Enter a valid 5-digit ZIP code.";
      else if (!isInServiceArea(zip)) e.zip = "We currently serve Miami-Dade & Broward County. Call us to check your area.";
    }
    if (s === 2) {
      if (!date) e.date = "Choose a date.";
      if (!selectedSlot) e.slot = "Choose a time.";
    }
    if (s === 3) {
      if (name.trim().length < 2) e.name = "Enter your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address.";
      if (phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/book-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectTypes,
          propertyType,
          address,
          zip,
          slotIso: selectedSlot,
          name,
          email,
          phone,
          notes,
          utm,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong booking your consultation.");
      setSuccess(true);

      const [firstName, ...rest] = name.trim().split(/\s+/);
      trackEvent(
        "Schedule",
        { content_name: "In-Home Consultation", content_category: "Fencing" },
        { email, phone, firstName, lastName: rest.join(" ") || undefined, zip }
      );
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please call us at (305) 967-9202.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--accent-border)",
          borderRadius: 12,
          padding: "48px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--accent-light)",
            border: "1px solid var(--accent-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <Check size={24} style={{ color: "var(--accent)" }} />
        </div>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 28, color: "var(--dark)", marginBottom: 8 }}>
          Your consultation is booked!
        </p>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)", marginBottom: 16 }}>
          We&apos;ll confirm within 24 hours.
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 15,
            fontWeight: 700,
            color: "var(--dark)",
            background: "var(--white)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "12px 20px",
            display: "inline-block",
          }}
        >
          {formatSlotDisplay(selectedSlot)}
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "32px 28px" }}>
      {/* Progress indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
        {STEP_LABELS.map((label, i) => (
          <div key={label} style={{ flex: 1 }}>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: i <= step ? "var(--accent)" : "var(--border)",
                marginBottom: 8,
                transition: "background 0.3s",
              }}
            />
            <span
              className="booking-step-label"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: i === step ? "var(--accent)" : "var(--text-secondary)",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Step 1 — Project type + property type */}
          {step === 0 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 24, color: "var(--dark)", marginBottom: 16 }}>
                What are you interested in?
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
                {PROJECT_TYPES.map((p) => {
                  const active = projectTypes.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleProjectType(p)}
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "10px 16px",
                        borderRadius: 100,
                        border: active ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                        background: active ? "var(--accent-light)" : "var(--white)",
                        color: active ? "var(--accent)" : "var(--dark)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              {errors.projectTypes && <p style={fieldErrorStyle}>{errors.projectTypes}</p>}

              <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 24, color: "var(--dark)", margin: "28px 0 16px" }}>
                Property type
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {PROPERTY_TYPES.map((p) => {
                  const active = propertyType === p.value;
                  return (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPropertyType(p.value)}
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 13,
                        fontWeight: 600,
                        padding: "10px 16px",
                        borderRadius: 100,
                        border: active ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                        background: active ? "var(--accent-light)" : "var(--white)",
                        color: active ? "var(--accent)" : "var(--dark)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
              {errors.propertyType && <p style={fieldErrorStyle}>{errors.propertyType}</p>}
            </div>
          )}

          {/* Step 2 — Address */}
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 24, color: "var(--dark)", marginBottom: 16 }}>
                Where should we visit?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label htmlFor="address" style={labelStyle}>Street address</label>
                  <input id="address" type="text" placeholder="123 Main St, Miami, FL" value={address} onChange={(e) => setAddress(e.target.value)} />
                  {errors.address && <p style={fieldErrorStyle}>{errors.address}</p>}
                </div>
                <div>
                  <label htmlFor="zip" style={labelStyle}>ZIP code</label>
                  <input id="zip" type="text" inputMode="numeric" placeholder="33162" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} />
                  {errors.zip && <p style={fieldErrorStyle}>{errors.zip}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Date & time */}
          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 24, color: "var(--dark)", marginBottom: 16 }}>
                Choose a date &amp; time
              </h3>
              <label htmlFor="date" style={labelStyle}>Preferred date (Mon–Sat)</label>
              <input id="date" type="date" min={todayStr} max={maxDateStr} value={date} onChange={(e) => setDate(e.target.value)} style={{ marginBottom: 8 }} />
              {errors.date && <p style={fieldErrorStyle}>{errors.date}</p>}

              {date && (
                <div style={{ marginTop: 16 }}>
                  <label style={labelStyle}>Available times</label>
                  {slotsLoading ? (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 8 }}>
                      <Loader2 size={14} className="spin-icon" style={{ color: "var(--accent)" }} /> Checking availability…
                    </p>
                  ) : slots.length === 0 ? (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)" }}>
                      No times available that day. Please choose another date.
                    </p>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }} className="booking-slot-grid">
                      {slots.map((s) => {
                        const active = selectedSlot === s.iso;
                        return (
                          <button
                            key={s.iso}
                            type="button"
                            onClick={() => setSelectedSlot(s.iso)}
                            style={{
                              fontFamily: "var(--font-dm-sans)",
                              fontSize: 13,
                              fontWeight: 600,
                              padding: "10px 8px",
                              borderRadius: 8,
                              border: active ? "1px solid var(--accent)" : "1px solid var(--border-strong)",
                              background: active ? "var(--accent-light)" : "var(--white)",
                              color: active ? "var(--accent)" : "var(--dark)",
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}
                          >
                            {s.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {errors.slot && <p style={fieldErrorStyle}>{errors.slot}</p>}
                  {availabilityWarning && (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--text-secondary)", marginTop: 10 }}>
                      ⚠ {availabilityWarning} We&apos;ll confirm your exact slot is still open when you submit.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 4 — Contact info */}
          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 24, color: "var(--dark)", marginBottom: 16 }}>
                Your contact info
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label htmlFor="name" style={labelStyle}>Full name</label>
                  <input id="name" type="text" placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <p style={fieldErrorStyle}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email address</label>
                  <input id="email" type="email" placeholder="jane@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {errors.email && <p style={fieldErrorStyle}>{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" style={labelStyle}>Phone number</label>
                  <input id="phone" type="tel" placeholder="(305) 555-0123" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} />
                  {errors.phone && <p style={fieldErrorStyle}>{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="notes" style={labelStyle}>Notes (optional)</label>
                  <textarea id="notes" rows={3} placeholder="Anything else we should know?" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ resize: "vertical" }} />
                </div>
              </div>
              {submitError && <p style={{ ...fieldErrorStyle, textAlign: "center", marginTop: 16 }}>{submitError}</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-dm-sans)",
              fontSize: 14,
              fontWeight: 600,
              background: "var(--white)",
              color: "var(--dark)",
              border: "1px solid var(--border-strong)",
              borderRadius: 8,
              padding: "14px 20px",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}
        {step < STEP_LABELS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontFamily: "var(--font-dm-sans)",
              fontSize: 15,
              fontWeight: 700,
              background: "var(--dark)",
              color: "var(--white)",
              border: "none",
              borderRadius: 8,
              padding: "14px 20px",
              cursor: "pointer",
            }}
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontFamily: "var(--font-dm-sans)",
              fontSize: 15,
              fontWeight: 700,
              background: "var(--dark)",
              color: "var(--white)",
              border: "none",
              borderRadius: 8,
              padding: "14px 20px",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="spin-icon" /> Booking…
              </>
            ) : (
              "Book My Free Consultation"
            )}
          </button>
        )}
      </div>

      <style jsx>{`
        .spin-icon {
          animation: booking-spin 0.8s linear infinite;
        }
        @keyframes booking-spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 480px) {
          .booking-step-label {
            display: none;
          }
          .booking-slot-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-dm-sans)",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--text-secondary)",
  marginBottom: 6,
};

const fieldErrorStyle: CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: 12,
  color: "#c0392b",
  marginTop: 6,
};
