"use client";

import { useEffect, type ReactNode } from "react";
import { trackFunnelEvent, type FunnelEventName } from "@/lib/tracking";

interface Props {
  /** CALENDAR_TRADE_URL / CALENDAR_HOME_URL, read server-side by the page. */
  url?: string;
  title: string;
  /** Shown while no external calendar is configured — the in-house booking flow. */
  fallback: ReactNode;
  /** Fired when the embedded scheduler reports a booking. */
  scheduledEvent?: FunnelEventName;
  height?: number;
}

/** True for the "booking completed" messages the common schedulers post to the parent page. */
function isBookingMessage(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  // Calendly: { event: "calendly.event_scheduled" }
  if (d.event === "calendly.event_scheduled") return true;
  // GoHighLevel / LeadConnector widgets post an appointment confirmation message.
  return typeof d.type === "string" && /appointment[_-]?(booked|created|scheduled)/i.test(d.type);
}

/** External scheduling widget (e.g. GoHighLevel) when configured, otherwise the in-house fallback. */
export default function CalendarEmbed({ url, title, fallback, scheduledEvent, height = 720 }: Props) {
  useEffect(() => {
    if (!url || !scheduledEvent) return;
    const origin = new URL(url).origin;
    let fired = false;
    const onMessage = (e: MessageEvent) => {
      if (fired || (e.origin !== origin && !e.origin.endsWith(".calendly.com")) || !isBookingMessage(e.data)) return;
      fired = true;
      trackFunnelEvent(scheduledEvent, {});
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [url, scheduledEvent]);

  if (!url) return <>{fallback}</>;

  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
      <iframe src={url} title={title} style={{ display: "block", width: "100%", height, border: 0 }} />
    </div>
  );
}
