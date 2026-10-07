"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { getAttribution, type Attribution } from "@/lib/attribution";
import { formatPhone } from "@/lib/form-validation";
import PackageBuilderField, { PackageReview } from "@/components/funnel/PackageBuilderField";
import type { LeadKind } from "@/lib/forms/registry";
import { isChoiceField, validateField, type FormField, type FormStep, type FormValues } from "@/lib/forms/schema";
import { compressPhoto } from "@/lib/image-compress";
import { saveLastLead } from "@/lib/last-lead";
import { trackLeadSubmitted } from "@/lib/tracking";
import { SITE } from "@/lib/site-config";

/** Exactly what is POSTed to /api/lead. */
export interface LeadSubmission {
  kind: LeadKind;
  values: FormValues;
  hidden: Record<string, string>;
  attribution: Attribution;
  pageUrl: string;
  /** Shared by the browser pixel and the server-side CAPI event so Meta counts the lead once. */
  eventId: string;
  /** Honeypot — must be empty. */
  hp: string;
  elapsedMs: number;
}

interface Props {
  /** Which form this is — /api/lead validates it against LEAD_FORMS[kind] in lib/forms/registry.ts. */
  kind: LeadKind;
  /**
   * The form's steps — LEAD_FORMS[kind].steps, passed in by the (server) page. Keeping the
   * registry out of this client component keeps unconfirmed content out of the browser bundle.
   */
  steps: FormStep[];
  /** Open on this step, e.g. straight to the builder when a package is pre-loaded. */
  initialStep?: number;
  /** Focus the step heading on first render (when the form is opened programmatically). */
  autoFocus?: boolean;
  /** Custom parameters for the lead event, e.g. { package_name }. */
  eventParams?: (values: FormValues) => Record<string, unknown>;
  submitLabel: string;
  successHref: string;
  endpoint?: string;
  /** Pre-filled answers, e.g. from ?installer=1 or a pre-selected project type. */
  initialValues?: FormValues;
  /** Extra fields sent with the lead but never shown, e.g. { installer: "1" }. */
  hiddenValues?: Record<string, string>;
  /** Runs after the server accepts the lead, before redirecting. Tracking hooks in here. */
  onSubmitted?: (submission: LeadSubmission) => void;
}

function newEventId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function MultiStepForm({
  kind,
  steps,
  initialStep = 0,
  autoFocus = false,
  eventParams,
  submitLabel,
  successHref,
  endpoint = "/api/lead",
  initialValues = {},
  hiddenValues = {},
  onSubmitted,
}: Props) {
  const router = useRouter();
  const formId = useId();
  const [step, setStep] = useState(initialStep);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hp, setHp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [photoBusy, setPhotoBusy] = useState(false);
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);
  /** Element to focus after the next step change instead of the heading (e.g. the part being edited). */
  const pendingFocus = useRef<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the new step's heading so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!autoFocus) return;
    }
    const target = pendingFocus.current && document.getElementById(pendingFocus.current);
    pendingFocus.current = null;
    (target || headingRef.current)?.focus();
  }, [step, autoFocus]);

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const fieldId = (name: string) => `${formId}-${name}`;

  function setValue(name: string, value: string | string[]) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  }

  /** Choosing an option with presets also fills the fields it names (e.g. a starting package fills the builder). */
  function choose(field: FormField, option: string) {
    setValue(field.name, option);
    const preset = isChoiceField(field) ? field.presets?.[option] : undefined;
    if (preset) setValues((v) => ({ ...v, ...preset }));
  }

  /** Jump back to the step holding `name`, focusing `focusId` there (review → edit). */
  function editField(name: string, focusId?: string) {
    const target = steps.findIndex((s) => s.fields.some((f) => f.name === name));
    if (target < 0) return;
    pendingFocus.current = focusId ?? null;
    setStep(target);
  }

  function toggleMulti(name: string, option: string) {
    const selected = Array.isArray(values[name]) ? (values[name] as string[]) : [];
    setValue(name, selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option]);
  }

  function validateStep(): boolean {
    const stepErrors: Record<string, string> = {};
    for (const field of current.fields) {
      const err = validateField(field, values[field.name]);
      if (err) stepErrors[field.name] = err;
    }
    setErrors(stepErrors);
    const firstInvalid = current.fields.find((f) => stepErrors[f.name]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid.name))?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting || !validateStep()) return;
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    const submission: LeadSubmission = {
      kind,
      values,
      hidden: hiddenValues,
      attribution: getAttribution(),
      pageUrl: window.location.href,
      eventId: newEventId(),
      hp,
      elapsedMs: Date.now() - startedAt.current,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "");
      const route = typeof data.route === "string" ? data.route : null;
      saveLastLead(kind, values, route);
      trackLeadSubmitted(kind, submission.eventId, values, route, eventParams?.(values));
      onSubmitted?.(submission);
      // Leave `submitting` on so the button can't double-submit while the next page loads.
      router.push(successHref);
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : "Something went wrong sending your details.";
      setSubmitError(`${message} Please try again or call us at ${SITE.phone.display}.`);
      setSubmitting(false);
    }
  }

  function renderField(field: FormField) {
    const id = fieldId(field.name);
    const error = errors[field.name];
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const describedBy = [field.hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
    const hint = field.hint && (
      <p id={hintId} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)", marginBottom: 10 }}>
        {field.hint}
      </p>
    );
    const errorText = error && (
      <p id={errorId} className="efs-field-error" role="alert">
        {error}
      </p>
    );

    if (isChoiceField(field)) {
      const multi = field.type === "multichoice";
      const labelId = `${id}-label`;
      const selected = values[field.name];
      return (
        <div key={field.name}>
          <p id={labelId} className="efs-form-label">
            {field.label}
            {multi && <span style={{ fontWeight: 400 }}> (choose all that apply)</span>}
          </p>
          {hint}
          <div
            role={multi ? "group" : "radiogroup"}
            aria-labelledby={labelId}
            aria-describedby={describedBy}
            aria-required={field.required || undefined}
            style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
          >
            {field.options.map((o, i) => {
              const checked = multi ? Array.isArray(selected) && selected.includes(o.value) : selected === o.value;
              return (
                <label key={o.value} className="efs-choice">
                  <input
                    // The first option carries the field id so validation can focus the group.
                    id={i === 0 ? id : undefined}
                    type={multi ? "checkbox" : "radio"}
                    name={field.name}
                    value={o.value}
                    checked={checked}
                    onChange={() => (multi ? toggleMulti(field.name, o.value) : choose(field, o.value))}
                  />
                  <span>{o.label}</span>
                </label>
              );
            })}
          </div>
          {errorText}
        </div>
      );
    }

    if (field.type === "package") {
      return (
        <div key={field.name}>
          {hint}
          <PackageBuilderField
            id={id}
            components={field.components}
            value={typeof values[field.name] === "string" ? (values[field.name] as string) : ""}
            onChange={(v) => setValue(field.name, v)}
            describedBy={describedBy}
          />
          {errorText}
        </div>
      );
    }

    if (field.type === "slots") return null; // only the /get-a-quote booking form uses slots

    if (field.type === "review") {
      const source = steps.flatMap((s) => s.fields).find((f) => f.name === field.of);
      if (!source || source.type !== "package") return null;
      const sourceId = fieldId(source.name);
      return (
        <PackageReview
          key={field.name}
          components={source.components}
          value={typeof values[source.name] === "string" ? (values[source.name] as string) : ""}
          onEdit={(componentId) => editField(source.name, componentId ? `${sourceId}-${componentId}` : sourceId)}
        />
      );
    }

    if (field.type === "photo") {
      const photo = typeof values[field.name] === "string" ? (values[field.name] as string) : "";
      return (
        <div key={field.name}>
          <label htmlFor={id} className="efs-form-label">
            {field.label} <span style={{ fontWeight: 400 }}>(optional)</span>
          </label>
          {hint}
          {photo ? (
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- local data URL preview */}
              <img src={photo} alt="Your photo" style={{ width: 88, height: 66, objectFit: "cover", borderRadius: 6, border: "1px solid var(--border)" }} />
              <button type="button" className="efs-btn efs-btn--secondary efs-btn--sm" onClick={() => setValue(field.name, "")}>
                Remove
              </button>
            </div>
          ) : (
            <input
              id={id}
              type="file"
              accept="image/*"
              aria-describedby={describedBy}
              disabled={photoBusy}
              style={{ padding: 10, cursor: "pointer" }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                setPhotoBusy(true);
                try {
                  setValue(field.name, await compressPhoto(file));
                } catch {
                  setErrors((er) => ({ ...er, [field.name]: "We couldn't read that photo. Try a JPG or PNG, or skip it." }));
                } finally {
                  setPhotoBusy(false);
                }
              }}
            />
          )}
          {photoBusy && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>Preparing photo…</p>
          )}
          {errorText}
        </div>
      );
    }

    const common = {
      id,
      name: field.name,
      value: typeof values[field.name] === "string" ? (values[field.name] as string) : "",
      placeholder: field.placeholder,
      required: field.required,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy,
    };

    return (
      <div key={field.name}>
        <label htmlFor={id} className="efs-form-label">
          {field.label}
          {!field.required && <span style={{ fontWeight: 400 }}> (optional)</span>}
        </label>
        {hint}
        {field.type === "textarea" ? (
          <textarea {...common} rows={4} style={{ resize: "vertical" }} onChange={(e) => setValue(field.name, e.target.value)} />
        ) : (
          <input
            {...common}
            type={field.type === "zip" ? "text" : field.type}
            inputMode={field.type === "zip" ? "numeric" : undefined}
            maxLength={field.type === "zip" ? 5 : undefined}
            autoComplete={
              field.autoComplete ??
              (field.type === "email" ? "email" : field.type === "tel" ? "tel" : field.type === "zip" ? "postal-code" : undefined)
            }
            onChange={(e) => {
              const raw = e.target.value;
              setValue(
                field.name,
                field.type === "tel" ? formatPhone(raw) : field.type === "zip" ? raw.replace(/\D/g, "").slice(0, 5) : raw
              );
            }}
          />
        )}
        {errorText}
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "clamp(24px, 4vw, 32px) clamp(20px, 4vw, 28px)",
      }}
    >
      {/* Progress — only meaningful for multi-step forms */}
      {steps.length > 1 && (
        <p className="sr-only" aria-live="polite">
          Step {step + 1} of {steps.length}: {current.label}
        </p>
      )}
      <div aria-hidden style={{ display: steps.length > 1 ? "flex" : "none", gap: 8, marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ flex: 1 }}>
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
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: i === step ? "var(--accent-text)" : "var(--text-secondary)",
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 28,
          lineHeight: 1.15,
          color: "var(--dark)",
          marginBottom: 20,
          outline: "none",
        }}
      >
        {current.title}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>{current.fields.map(renderField)}</div>

      {/* Honeypot — invisible to people, irresistible to bots. */}
      <div aria-hidden style={{ position: "absolute", left: -10000, top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Leave this field empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
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
            onClick={() => setStep((s) => s - 1)}
            disabled={submitting}
          >
            <ChevronLeft size={16} aria-hidden /> Back
          </button>
        )}
        <button type="submit" className="efs-btn efs-btn--primary" style={{ flex: 1 }} disabled={submitting || photoBusy}>
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
            </>
          ) : isLast ? (
            submitLabel
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
