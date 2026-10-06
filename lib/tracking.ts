// Funnel conversion events (blueprint "Tracking and measurement").
// Each event goes to: Meta pixel + Conversions API (same event id → counted once),
// GA4, and — for the two lead events — a Google Ads conversion when its label is set.

import { trackEvent, type MetaUserData } from "@/lib/metaEvents";
import type { LeadKind } from "@/lib/forms/registry";
import type { FormValues } from "@/lib/forms/schema";

export type FunnelEventName =
  | "Lead_Trade"
  | "Lead_Home"
  | "Schedule_Trade"
  | "Schedule_Home"
  | "SpecKit"
  | "SampleRequest"
  | "PalletReservation";

const LEAD_EVENT: Record<LeadKind, FunnelEventName> = {
  trade_application: "Lead_Trade",
  home_quote: "Lead_Home",
  package: "Lead_Home",
  spec_kit: "SpecKit",
  sample_request: "SampleRequest",
  pallet_reservation: "PalletReservation",
};

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LABEL: Partial<Record<FunnelEventName, string | undefined>> = {
  Lead_Trade: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_LEAD_TRADE,
  Lead_Home: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_LEAD_HOME,
};

function gtagEvent(name: string, params: Record<string, unknown>): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event", name, params);
}

export function trackFunnelEvent(
  name: FunnelEventName,
  { eventId, userData = {}, params = {} }: { eventId?: string; userData?: MetaUserData; params?: Record<string, unknown> }
): void {
  const id = eventId || (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`);
  trackEvent(name, params, userData, id);
  gtagEvent(name, { ...params, event_id: id });
  const label = ADS_LABEL[name];
  if (ADS_ID && label) gtagEvent("conversion", { send_to: `${ADS_ID}/${label}`, transaction_id: id });
}

/** Contact details from a form, in the shape Meta's advanced matching expects (hashed server-side). */
export function userDataFrom(values: Partial<Record<string, string | string[]>>): MetaUserData {
  const str = (k: string) => (typeof values[k] === "string" ? (values[k] as string) : undefined);
  const [firstName, ...rest] = (str("contactName") ?? "").trim().split(/\s+/);
  return {
    email: str("email"),
    phone: str("phone"),
    firstName: firstName || undefined,
    lastName: rest.join(" ") || undefined,
    zip: str("zip"),
  };
}

const LEAD_NAME: Partial<Record<LeadKind, string>> = {
  trade_application: "Trade application",
  home_quote: "Home quote",
  package: "Package request",
};

/** Called once per accepted lead, with the same id the CRM receives. `params` adds custom parameters, e.g. package_name. */
export function trackLeadSubmitted(
  kind: LeadKind,
  eventId: string,
  values: FormValues,
  route: string | null,
  params: Record<string, unknown> = {}
): void {
  const userData = userDataFrom(values);
  const funnel = kind === "home_quote" || kind === "package" ? "home" : "trade";
  trackFunnelEvent(LEAD_EVENT[kind], { eventId, userData, params: { content_category: funnel, route: route ?? undefined, ...params } });
  // Standard "Lead" alongside during the switchover, so existing Meta campaigns keep their signal.
  const name = LEAD_NAME[kind];
  if (name) trackEvent("Lead", { content_name: name, content_category: funnel, ...params }, userData, eventId);
}
