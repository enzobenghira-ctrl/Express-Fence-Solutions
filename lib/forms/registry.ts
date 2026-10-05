// Every lead form the site accepts. /api/lead rejects any kind not listed here.

import type { FormStep } from "@/lib/forms/schema";
import type { Funnel } from "@/lib/site-config";
import {
  PALLET_RESERVATION_STEPS,
  SAMPLE_REQUEST_STEPS,
  SPEC_KIT_STEPS,
  TRADE_APPLICATION_STEPS,
} from "@/lib/forms/trade";
import { HOME_QUOTE_STEPS } from "@/lib/forms/home";

export type LeadKind = "trade_application" | "spec_kit" | "sample_request" | "pallet_reservation" | "home_quote";

export interface LeadFormDefinition {
  funnel: Funnel;
  /** Used in notification subjects, e.g. "Trade application". */
  label: string;
  steps: FormStep[];
  /** Hidden fields the page may attach (e.g. installer=1). Anything else is dropped. */
  hiddenKeys: string[];
}

export const LEAD_FORMS: Record<LeadKind, LeadFormDefinition> = {
  trade_application: { funnel: "trade", label: "Trade application", steps: TRADE_APPLICATION_STEPS, hiddenKeys: ["installer"] },
  spec_kit: { funnel: "trade", label: "Spec kit download", steps: SPEC_KIT_STEPS, hiddenKeys: [] },
  sample_request: { funnel: "trade", label: "Sample request", steps: SAMPLE_REQUEST_STEPS, hiddenKeys: [] },
  pallet_reservation: { funnel: "trade", label: "Pallet reservation", steps: PALLET_RESERVATION_STEPS, hiddenKeys: [] },
  home_quote: { funnel: "home", label: "Home quote request", steps: HOME_QUOTE_STEPS, hiddenKeys: [] },
};

export function isLeadKind(value: unknown): value is LeadKind {
  return typeof value === "string" && value in LEAD_FORMS;
}
