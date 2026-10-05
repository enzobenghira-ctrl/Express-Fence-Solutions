// Hands the applicant's contact details from a form to its thank-you page (e.g. so the
// booking step is pre-filled). Tab-scoped sessionStorage, contact fields only.

import type { LeadKind } from "@/lib/forms/registry";
import type { FormValues } from "@/lib/forms/schema";

const KEY = "efs_last_lead";
const CONTACT_FIELDS = ["contactName", "email", "phone", "company"] as const;

export interface LastLead {
  kind: LeadKind;
  contact: Partial<Record<(typeof CONTACT_FIELDS)[number], string>>;
}

export function saveLastLead(kind: LeadKind, values: FormValues): void {
  const contact: LastLead["contact"] = {};
  for (const key of CONTACT_FIELDS) {
    const v = values[key];
    if (typeof v === "string" && v) contact[key] = v;
  }
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify({ kind, contact } satisfies LastLead));
  } catch {
    // Storage blocked — the next page simply asks for the details again.
  }
}

export function readLastLead(): LastLead | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LastLead) : null;
  } catch {
    return null;
  }
}
