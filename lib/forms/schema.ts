// Form definitions shared by MultiStepForm (browser) and /api/lead (server), so both
// sides accept exactly the same fields, options and formats.

import { EMAIL_RE, ZIP_RE, isValidPhone } from "@/lib/form-validation";
import { parseSelection, selectionError, selectionToText, type BuilderComponent } from "@/lib/forms/package-selection";
import { slotError, slotLabel, type SlotConfig } from "@/lib/forms/slots";

export interface FormOption {
  value: string;
  label: string;
}

interface FieldBase {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
}

export type ChoiceField = FieldBase & {
  type: "choice" | "multichoice";
  options: FormOption[];
  /** Picking an option also fills these other fields, e.g. a starting package pre-loads the builder. */
  presets?: Record<string, Record<string, string>>;
};
export type InputField = FieldBase & { type: "text" | "email" | "tel" | "zip"; placeholder?: string; autoComplete?: string };
export type TextareaField = FieldBase & { type: "textarea"; placeholder?: string };
/** Optional photo. The browser compresses it to a JPEG data URL; /api/lead uploads it to Vercel Blob. */
export type PhotoField = FieldBase & { type: "photo" };
/** Package builder: parts to toggle, each with options. The value is a JSON PackageSelection. */
export type PackageField = FieldBase & { type: "package"; components: BuilderComponent[] };
/** Read-only summary of another field (the package), with a link back to edit each part. Never submitted. */
export type ReviewField = FieldBase & { type: "review"; of: string };

/** Preferred appointment times: a list of "YYYY-MM-DD|window" slots (lib/forms/slots.ts). */
export type SlotsField = FieldBase & { type: "slots"; config: SlotConfig };

export type FormField = ChoiceField | InputField | TextareaField | PhotoField | PackageField | ReviewField | SlotsField;

export const PHOTO_DATA_PREFIX = "data:image/jpeg;base64,";
/** ~2 MB of JPEG once base64-encoded — comfortably under Vercel's 4.5 MB request limit. */
export const MAX_PHOTO_CHARS = 2_800_000;

export interface FormStep {
  /** Short label under the progress bar, e.g. "Your business". */
  label: string;
  /** The step's question/heading. */
  title: string;
  fields: FormField[];
}

export type FormValues = Record<string, string | string[]>;

const MAX_TEXT = 200;
const MAX_TEXTAREA = 2000;

export function isChoiceField(field: FormField): field is ChoiceField {
  return field.type === "choice" || field.type === "multichoice";
}

export function validateField(field: FormField, value: string | string[] | undefined): string | null {
  if (field.type === "review") return null;
  if (field.type === "package") {
    if (!value) return field.required ? "Choose at least one part for your package." : null;
    const selection = parseSelection(value);
    if (!selection) return "Please choose from the options shown.";
    if (field.required && Object.keys(selection).length === 0) return "Choose at least one part for your package.";
    return selectionError(selection, field.components);
  }
  if (Array.isArray(value) ? value.length === 0 : !value?.trim()) {
    if (!field.required) return null;
    if (field.type === "choice") return "Please choose an option.";
    if (field.type === "multichoice") return "Please choose at least one.";
    if (field.type === "slots") return "Please pick at least one time.";
    return "This field is required.";
  }
  if (field.type === "slots") return Array.isArray(value) ? slotError(value, field.config) : "Please choose from the times shown.";
  if (isChoiceField(field)) {
    const picked = Array.isArray(value) ? value : [value as string];
    if (field.type === "choice" && picked.length !== 1) return "Please choose one option.";
    if (picked.some((v) => !field.options.some((o) => o.value === v))) return "Please choose from the options shown.";
    return null;
  }
  if (Array.isArray(value)) return "Invalid value.";
  if (field.type === "photo") {
    if (!value!.startsWith(PHOTO_DATA_PREFIX) || value!.length > MAX_PHOTO_CHARS) return "Please choose a smaller photo.";
    return null;
  }
  const str = value!.trim();
  if (str.length > (field.type === "textarea" ? MAX_TEXTAREA : MAX_TEXT)) return "That's too long.";
  if (field.type === "email" && !EMAIL_RE.test(str)) return "Please enter a valid email address.";
  if (field.type === "tel" && !isValidPhone(str)) return "Please enter a valid 10-digit phone number.";
  if (field.type === "zip" && !ZIP_RE.test(str)) return "Please enter a 5-digit ZIP code.";
  return null;
}

/**
 * Server-side check of a whole submission: keeps only fields the form defines,
 * trims text, and reports the first error per field.
 */
export function validateValues(
  steps: FormStep[],
  raw: unknown
): { values: FormValues; errors: Record<string, string> } {
  const input = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const values: FormValues = {};
  const errors: Record<string, string> = {};

  // Review fields only display other fields — they never carry a value of their own.
  for (const field of steps.flatMap((s) => s.fields).filter((f) => f.type !== "review")) {
    const v = input[field.name];
    const normalized =
      Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : typeof v === "string" ? v.trim() : undefined;
    const err = validateField(field, normalized);
    if (err) errors[field.name] = err;
    else if (normalized !== undefined && (Array.isArray(normalized) ? normalized.length : normalized)) values[field.name] = normalized;
  }
  return { values, errors };
}

/** Human-readable label for a stored value (option labels instead of slugs). */
export function displayValue(field: FormField, value: string | string[]): string {
  if (field.type === "photo") return typeof value === "string" && value.startsWith("http") ? value : "Photo provided";
  if (field.type === "package") {
    const selection = parseSelection(value);
    return selection ? selectionToText(selection, field.components) : "";
  }
  if (field.type === "slots") return (Array.isArray(value) ? value : [value]).map((s) => slotLabel(s, field.config)).join("\n");
  if (!isChoiceField(field)) return Array.isArray(value) ? value.join(", ") : value;
  const label = (v: string) => field.options.find((o) => o.value === v)?.label ?? v;
  return Array.isArray(value) ? value.map(label).join(", ") : label(value);
}
