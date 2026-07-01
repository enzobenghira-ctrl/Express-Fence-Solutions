/**
 * Unified Meta Pixel + Conversions API event tracking.
 *
 * DEDUPLICATION: Every call generates one eventId (crypto.randomUUID()) and fires
 * the SAME id on both the browser pixel (fbq with { eventID }) and the server-side
 * Conversions API POST to /api/meta-capi. Meta matches events by event_name +
 * event_id and only counts one, so ad blockers or lost browser events don't
 * undercount while the server event still lands.
 *
 * STANDARD EVENTS USED:
 *   - PageView    fired automatically by components/MetaPixel.tsx on every route change
 *   - ViewContent fired on product detail page mount
 *   - Lead        fired on quote form / contact form submission
 *   - Schedule    fired on consultation booking confirmation
 *   - Contact     fired on phone number click-to-call
 *
 * VERIFYING IN META EVENTS MANAGER:
 *   Go to Events Manager -> Data Sources -> your pixel -> Test Events tab, and
 *   enter/watch for META_TEST_EVENT_CODE (set in .env.local / Vercel). Trigger
 *   the actions above in a browser and confirm each event shows up twice —
 *   once under "Browser" and once under "Server" — with matching Event IDs.
 *
 * GOING LIVE:
 *   Delete or empty META_TEST_EVENT_CODE in Vercel's environment variables and
 *   redeploy. Leaving it set does not break tracking, but Meta will keep routing
 *   those events to Test Events instead of counting them toward ad optimization.
 */

export interface MetaEventParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  method?: string;
  [key: string]: unknown;
}

export interface MetaUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export function trackEvent(
  eventName: string,
  params: MetaEventParams = {},
  userData: MetaUserData = {}
): void {
  const eventId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", eventName, params, { eventID: eventId });
  }

  const { value, currency, ...customData } = params;

  const payload = {
    eventName,
    eventId,
    ...userData,
    value,
    currency,
    customData,
    sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
  };

  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("Meta CAPI request failed:", error);
  });
}
