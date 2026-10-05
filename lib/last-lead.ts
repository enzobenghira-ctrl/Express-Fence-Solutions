// Hands the applicant's details from a form to its thank-you page (e.g. so the booking
// step is pre-filled, or so out-of-area leads see the right next step).
// Tab-scoped sessionStorage, contact fields only.

import type { LeadKind } from "@/lib/forms/registry";
import type { FormValues } from "@/lib/forms/schema";

const KEY = "efs_last_lead";
const CONTACT_FIELDS = ["contactName", "email", "phone", "company", "zip", "projectType"] as const;

export interface LastLead {
  kind: LeadKind;
  /** Routing tier returned by /api/lead, e.g. "priority" or "partner_referral". */
  route: string | null;
  contact: Partial<Record<(typeof CONTACT_FIELDS)[number], string>>;
}

export function saveLastLead(kind: LeadKind, values: FormValues, route: string | null = null): void {
  const contact: LastLead["contact"] = {};
  for (const key of CONTACT_FIELDS) {
    const v = values[key];
    if (typeof v === "string" && v) contact[key] = v;
  }
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify({ kind, route, contact } satisfies LastLead));
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
