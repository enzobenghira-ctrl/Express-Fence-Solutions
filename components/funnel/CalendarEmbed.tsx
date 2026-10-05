import type { ReactNode } from "react";

interface Props {
  /** CALENDAR_TRADE_URL / CALENDAR_HOME_URL, read server-side by the page. */
  url?: string;
  title: string;
  /** Shown while no external calendar is configured — the in-house booking flow. */
  fallback: ReactNode;
  height?: number;
}

/** External scheduling widget (e.g. GoHighLevel) when configured, otherwise the in-house fallback. */
export default function CalendarEmbed({ url, title, fallback, height = 720 }: Props) {
  if (!url) return <>{fallback}</>;

  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
      <iframe src={url} title={title} style={{ display: "block", width: "100%", height, border: 0 }} />
    </div>
  );
}
