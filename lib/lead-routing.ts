// Lead routing rules from the funnel blueprint. The `route` value travels with the lead
// to the CRM and the notification email so the right person follows up.

import type { LeadKind } from "@/lib/forms/registry";
import type { FormValues } from "@/lib/forms/schema";

export type TradeRoute = "anchor" | "partner" | "standard" | "spec";

export function computeRoute(kind: LeadKind, values: FormValues): TradeRoute | null {
  if (kind !== "trade_application") return null;
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
