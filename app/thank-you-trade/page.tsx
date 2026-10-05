import type { Metadata } from "next";
import FunnelShell from "@/components/funnel/FunnelShell";
import CalendarEmbed from "@/components/funnel/CalendarEmbed";
import TradeCallBooking from "@/components/funnel/TradeCallBooking";
import DownloadList from "@/components/funnel/DownloadList";

export const metadata: Metadata = {
  title: "Application received — book your call | Express Fence Solutions",
  robots: { index: false, follow: false },
};

// One action: book the qualification call. External scheduler when CALENDAR_TRADE_URL
// is set, otherwise the in-house Google Calendar booking.
export default function ThankYouTradePage() {
  return (
    <FunnelShell>
      <main className="efs-section" style={{ background: "var(--background)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="efs-eyebrow">Application received</span>
            <h1 className="efs-h2" style={{ fontSize: "clamp(38px, 5vw, 56px)", marginBottom: 16 }}>
              Book your qualification call
            </h1>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 17, lineHeight: 1.65, color: "var(--text-secondary)" }}>
              Pick a time that works for you — we&apos;ll learn about your business and walk you through trade pricing.
              <br />
              <strong style={{ color: "var(--dark)" }}>Want samples? We&apos;ll bring them to the call.</strong>
            </p>
          </div>

          <CalendarEmbed url={process.env.CALENDAR_TRADE_URL} title="Book your qualification call" fallback={<TradeCallBooking />} />

          <section aria-labelledby="spec-kit-heading" style={{ marginTop: 56 }}>
            <h2 id="spec-kit-heading" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 700, color: "var(--dark)", marginBottom: 6 }}>
              Your spec kit
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
              Spec sheets and install guides to review before the call.
            </p>
            <DownloadList />
          </section>
        </div>
      </main>
    </FunnelShell>
  );
}
