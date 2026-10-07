"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import SlotPicker from "@/components/get-a-quote/SlotPicker";
import { CallButton, PhoneNumber, WhatsAppButton } from "@/components/get-a-quote/ContactButtons";
import { getAttribution } from "@/lib/attribution";
import { formatPhone } from "@/lib/form-validation";
import { HOME_PROJECT_TYPES } from "@/lib/forms/home";
import { validateField, type FormField, type FormValues } from "@/lib/forms/schema";
import { slotLabel } from "@/lib/forms/slots";
import { BOOKING_SLOTS, BOOKING_SOURCE, BOOKING_STEPS } from "@/lib/get-a-quote/booking";
import { isBookableZip } from "@/lib/get-a-quote/service-area-zips";
import { trackEvent } from "@/lib/metaEvents";
import { trackLeadSubmitted, userDataFrom } from "@/lib/tracking";
import { SITE } from "@/lib/site-config";

interface Props {
  /** From ?type= — pre-selects that project. */
  presetType?: string;
  /** "We'll call you {callbackWindow} to confirm your appointment." */
  callbackWindow: string;
}

interface Values {
  projectTypes: string[];
  address: string;
  zip: string;
  slots: string[];
  contactName: string;
  phone: string;
  email: string;
  notes: string;
}

const MIN_FILL_GUARD = "company_website"; // honeypot name, same as the site's other forms
const DETAILS_STEP = BOOKING_STEPS.length - 1;

function newEventId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** UTMs captured on landing, plus utm_term and fbclid from this page's URL. */
function attribution(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return { ...getAttribution(), utm_term: params.get("utm_term") ?? "", fbclid: params.get("fbclid") ?? "" };
}

const projectLabel = (v: string) => HOME_PROJECT_TYPES.find((t) => t.value === v)?.label ?? v;

/** /get-a-quote's appointment request: project → property (ZIP gate) → times → details, confirmed in place. */
export default function VisitRequestForm({ presetType, callbackWindow }: Props) {
  const formId = useId();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    projectTypes: presetType ? [presetType] : [],
    address: "",
    zip: "",
    slots: [],
    contactName: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [outOfArea, setOutOfArea] = useState(false);
  const [hp, setHp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState<Values | null>(null);
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const reportedZips = useRef(new Set<string>());

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const current = BOOKING_STEPS[step];
  const fieldId = (name: string) => `${formId}-${name}`;

  function set<K extends keyof Values>(name: K, value: Values[K]) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
    if (name === "zip") setOutOfArea(false);
  }

  function validateStep(): boolean {
    const stepErrors: Record<string, string> = {};
    for (const field of current.fields) {
      const err = validateField(field, values[field.name as keyof Values]);
      if (err) stepErrors[field.name] = err;
    }
    setErrors(stepErrors);
    const first = current.fields.find((f) => stepErrors[f.name]);
    if (first) {
      document.getElementById(fieldId(first.name))?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting || !validateStep()) return;

    // Step 2: outside the install area → no booking, call/WhatsApp instead.
    if (step === 1 && !isBookableZip(values.zip)) {
      setOutOfArea(true);
      if (!reportedZips.current.has(values.zip)) {
        reportedZips.current.add(values.zip);
        // Browser only (no CAPI): a count of visitors we turn away.
        window.fbq?.("trackCustom", "OutOfArea", { source: BOOKING_SOURCE });
      }
      return;
    }
    if (step < DETAILS_STEP) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    const eventId = newEventId();
    const payload: FormValues = Object.fromEntries(
      Object.entries(values).filter(([, v]) => (Array.isArray(v) ? v.length : String(v).trim()))
    ) as FormValues;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "home_quote",
          source: BOOKING_SOURCE,
          values: payload,
          hidden: {},
          attribution: attribution(),
          pageUrl: window.location.href,
          eventId,
          hp,
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "");
      const route = typeof data.route === "string" ? data.route : null;

      // Same events as the old quote form (Lead_Home + Lead, one shared id), then Schedule.
      trackLeadSubmitted("home_quote", eventId, payload, route, { source: BOOKING_SOURCE });
      trackEvent(
        "Schedule",
        { source: BOOKING_SOURCE, project_types: values.projectTypes, slot_count: values.slots.length },
        userDataFrom(payload),
        eventId
      );
      setDone(values);
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : "Something went wrong sending your request.";
      setSubmitError(`${message} Please try again or call us at ${SITE.phone.display}.`);
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div ref={doneRef} tabIndex={-1} className="efs-visit-form efs-visit-done" role="status">
        <h3>Request received.</h3>
        <p>We&apos;ll call you {callbackWindow} to confirm your appointment.</p>
        <dl>
          <dt>Project{done.projectTypes.length > 1 ? "s" : ""}</dt>
          <dd>{done.projectTypes.map(projectLabel).join(", ")}</dd>
          <dt>Preferred times</dt>
          <dd>
            <ul>
              {done.slots.map((s) => (
                <li key={s}>{slotLabel(s, BOOKING_SLOTS)}</li>
              ))}
            </ul>
          </dd>
        </dl>
        <CallButton placement="confirmation" className="efs-btn efs-btn--primary efs-btn--block">
          Want it locked in faster? Call <PhoneNumber />
        </CallButton>
      </div>
    );
  }

  function renderField(field: FormField) {
    const id = fieldId(field.name);
    const error = errors[field.name];
    const hintId = `${id}-hint`;
    const errorId = `${id}-error`;
    const describedBy = [field.hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
    const hint = field.hint && (
      <p id={hintId} className="efs-visit-hint">
        {field.hint}
      </p>
    );
    const errorText = error && (
      <p id={errorId} className="efs-field-error" role="alert">
        {error}
      </p>
    );

    if (field.type === "multichoice") {
      const labelId = `${id}-label`;
      return (
        <div key={field.name}>
          <p id={labelId} className="efs-form-label">
            {field.label} <span style={{ fontWeight: 400 }}>(choose all that apply)</span>
          </p>
          {hint}
          <div role="group" aria-labelledby={labelId} aria-describedby={describedBy} style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {field.options.map((o, i) => (
              <label key={o.value} className="efs-choice">
                <input
                  id={i === 0 ? id : undefined}
                  type="checkbox"
                  name={field.name}
                  value={o.value}
                  checked={values.projectTypes.includes(o.value)}
                  onChange={() =>
                    set(
                      "projectTypes",
                      values.projectTypes.includes(o.value) ? values.projectTypes.filter((v) => v !== o.value) : [...values.projectTypes, o.value]
                    )
                  }
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
          {errorText}
        </div>
      );
    }

    if (field.type === "slots") {
      return (
        <div key={field.name}>
          <p className="efs-form-label">{field.label}</p>
          {hint}
          <SlotPicker id={id} value={values.slots} onChange={(s) => set("slots", s)} config={field.config} describedBy={describedBy} />
          {errorText}
        </div>
      );
    }

    if (field.type !== "text" && field.type !== "zip" && field.type !== "tel" && field.type !== "email" && field.type !== "textarea") return null;
    const name = field.name as keyof Values;
    const value = String(values[name] ?? "");
    const common = {
      id,
      name: field.name,
      value,
      placeholder: field.placeholder,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy,
      "aria-required": field.required || undefined,
    };
    return (
      <div key={field.name}>
        <label htmlFor={id} className="efs-form-label">
          {field.label}
          {!field.required && <span style={{ fontWeight: 400 }}> (optional)</span>}
        </label>
        {hint}
        {field.type === "textarea" ? (
          <textarea {...common} rows={3} maxLength={2000} style={{ resize: "vertical" }} onChange={(e) => set(name, e.target.value as never)} />
        ) : (
          <input
            {...common}
            type={field.type === "zip" ? "text" : field.type}
            inputMode={field.type === "zip" ? "numeric" : undefined}
            maxLength={field.type === "zip" ? 5 : 200}
            autoComplete={
              field.autoComplete ?? (field.type === "email" ? "email" : field.type === "tel" ? "tel" : field.type === "zip" ? "postal-code" : undefined)
            }
            onChange={(e) => {
              const raw = e.target.value;
              set(name, (field.type === "tel" ? formatPhone(raw) : field.type === "zip" ? raw.replace(/\D/g, "").slice(0, 5) : raw) as never);
            }}
          />
        )}
        {errorText}
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="efs-visit-form">
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {BOOKING_STEPS.length}: {current.label}
      </p>
      <div aria-hidden className="efs-visit-progress">
        {BOOKING_STEPS.map((s, i) => (
          <div key={s.label} data-done={i <= step || undefined} data-current={i === step || undefined}>
            <span />
            {s.label}
          </div>
        ))}
      </div>

      <h3 ref={headingRef} tabIndex={-1} className="efs-visit-title">
        {current.title}
      </h3>

      {/* Step 4 is wrapped so the mobile sticky bar can hide while these inputs are focused. */}
      <div className="efs-visit-fields" data-hide-sticky={step === DETAILS_STEP || undefined}>
        {current.fields.map(renderField)}
      </div>

      {outOfArea && step === 1 && (
        <div className="efs-visit-out" role="alert">
          <p>You&apos;re outside our usual install area. Give us a call and we&apos;ll let you know if we can help.</p>
          <div className="efs-visit-actions">
            <CallButton placement="out_of_area" className="efs-btn efs-btn--primary">
              Call <PhoneNumber />
            </CallButton>
            <WhatsAppButton placement="out_of_area" projectType={values.projectTypes[0]} />
          </div>
        </div>
      )}

      {/* Honeypot — invisible to people, irresistible to bots. */}
      <div aria-hidden style={{ position: "absolute", left: -10000, top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input type="text" name={MIN_FILL_GUARD} tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </label>
      </div>

      {submitError && (
        <p className="efs-field-error" role="alert" style={{ marginTop: 20, textAlign: "center" }}>
          {submitError}
        </p>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        {step > 0 && (
          <button
            type="button"
            className="efs-btn efs-btn--secondary"
            style={{ padding: "14px 20px", background: "var(--white)" }}
            onClick={() => {
              setOutOfArea(false);
              setStep((s) => s - 1);
            }}
            disabled={submitting}
          >
            <ChevronLeft size={16} aria-hidden /> Back
          </button>
        )}
        <button type="submit" className="efs-btn efs-btn--primary" style={{ flex: 1 }} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : step === DETAILS_STEP ? (
            "Request my visit"
          ) : (
            <>
              Next <ChevronRight size={16} aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
