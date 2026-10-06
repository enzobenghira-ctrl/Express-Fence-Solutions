import type { Metadata } from "next";
import FunnelShell from "@/components/funnel/FunnelShell";
import HomeNextStep from "@/components/funnel/HomeNextStep";
import { TodoNote } from "@/components/funnel/FactText";
import { SHOW_TODOS } from "@/lib/facts";
import { OWNER_VIDEO_URL } from "@/lib/home-content";

export const metadata: Metadata = {
  title: "Request received — book your consultation | Express Fence Solutions",
  robots: { index: false, follow: false },
};

// One action: pick a consultation time (or, for partner-referral leads, wait for our call).
export default function ThankYouHomePage() {
  return (
    <FunnelShell>
      <main className="efs-section" style={{ background: "var(--background)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="efs-eyebrow">Request received</span>
            <h1 className="efs-h2" style={{ fontSize: "clamp(38px, 5vw, 56px)", marginBottom: 14 }}>
              Thanks — your request is in
            </h1>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 17, lineHeight: 1.65, color: "var(--text-secondary)" }}>
              Here&apos;s what happens next.
            </p>
          </div>

          {/* Owner video: "what happens next" in 30 seconds. The box only renders in production once the video exists. */}
          {(OWNER_VIDEO_URL || SHOW_TODOS) && (
          <div
            style={{
              aspectRatio: "16 / 9",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 32,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {OWNER_VIDEO_URL ? (
              <video src={OWNER_VIDEO_URL} controls playsInline preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <TodoNote>30-second owner video — what happens next</TodoNote>
            )}
          </div>
          )}

          <HomeNextStep calendarUrl={process.env.CALENDAR_HOME_URL} />
        </div>
      </main>
    </FunnelShell>
  );
}
