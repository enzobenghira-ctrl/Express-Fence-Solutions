import type { Funnel } from "@/lib/site-config";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 FunnelClick — fired by every funnel button on shared pages.
 * A no-op until the GA4 tag is installed (Forms, CRM & tracking phase).
 */
export function trackFunnelClick(funnel: Funnel, label: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "FunnelClick", {
    funnel,
    label,
    page_path: window.location.pathname,
  });
}
