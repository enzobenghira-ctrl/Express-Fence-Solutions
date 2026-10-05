// Ad attribution captured on landing and sent with every lead as hidden fields.
// Stored for 30 days so a visitor who clicks an ad, leaves, and comes back directly
// is still credited to that ad. A new visit carrying UTMs replaces the old record.

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export type Attribution = Record<(typeof UTM_KEYS)[number] | "landing_page" | "referrer", string>;

const STORAGE_KEY = "efs_attribution";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

function fromCurrentVisit(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const utm = Object.fromEntries(UTM_KEYS.map((k) => [k, params.get(k) || ""])) as Record<(typeof UTM_KEYS)[number], string>;
  return {
    ...utm,
    landing_page: window.location.pathname,
    referrer: document.referrer || "",
  };
}

function readStored(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt: number; data: Attribution };
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

/** Call once per page load (AttributionCapture in the root layout does this). */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const current = fromCurrentVisit();
  const hasUtm = UTM_KEYS.some((k) => current[k]);
  if (!hasUtm && readStored()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), data: current }));
  } catch {
    // Storage blocked (private mode etc.) — getAttribution falls back to the current URL.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", landing_page: "", referrer: "" };
  }
  return readStored() ?? fromCurrentVisit();
}
