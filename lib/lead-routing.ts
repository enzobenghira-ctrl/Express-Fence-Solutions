// Lead routing rules from the funnel blueprint. The `route` value travels with the lead
// to the CRM and the notification email so the right person follows up.

import { isInServiceArea } from "@/lib/booking-config";
import type { LeadKind } from "@/lib/forms/registry";
import type { FormValues } from "@/lib/forms/schema";

export type TradeRoute = "anchor" | "partner" | "standard" | "spec";
export type HomeRoute = "priority" | "standard" | "partner_referral";
export type LeadRoute = TradeRoute | HomeRoute;

export function computeRoute(kind: LeadKind, values: FormValues): LeadRoute | null {
  if (kind === "trade_application") {
    // Architects and designers go to the spec kit + sample box track whatever their volume.
    if (values.tradeType === "architect-designer") return "spec";
    switch (values.monthlyVolume) {
      case "30k-plus":
        return "anchor"; // owner handles personally — potential anchor account
      case "5k-15k":
      case "15k-30k":
        return "partner";
      default:
        return "standard";
    }
  }

  if (kind === "home_quote" || kind === "package") {
    // Small jobs and jobs outside the six-county area go to a Certified Installer partner;
    // EFS still sells the material.
    if (typeof values.zip !== "string" || !isInServiceArea(values.zip)) return "partner_referral";
    switch (values.budget) {
      case "25k-50k":
      case "50k-plus":
        return "priority"; // priority consultation with the owner
      case "8k-25k":
        return "standard";
      default:
        return "partner_referral";
    }
  }

  return null;
}
