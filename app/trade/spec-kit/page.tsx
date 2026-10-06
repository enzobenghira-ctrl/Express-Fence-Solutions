import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import { LEAD_FORMS } from "@/lib/forms/registry";
import DownloadList, { HAS_DOWNLOADS } from "@/components/funnel/DownloadList";
import { robotsFor } from "@/lib/content-readiness";
import { SHOW_TODOS } from "@/lib/facts";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "WPC Spec Kit — Spec Sheets & Install Guides | Express Fence Solutions",
  description: "Download spec sheets and installation guides for WPC fencing, decking, cladding, pergolas and gates.",
  alternates: { canonical: `${SITE.url}/trade/spec-kit` },
  // Unlisted + noindex until at least one PDF is uploaded (lib/content-readiness.ts).
  robots: robotsFor("/trade/spec-kit"),
};

interface Props {
  searchParams: { unlocked?: string };
}

export default function SpecKitPage({ searchParams }: Props) {
  const unlocked = searchParams.unlocked === "1";

  return (
    <SiteShell mobileBar="trade">
      <main>
        <Hero
          eyebrow="Spec kit"
          title="Spec sheets and install guides"
          subtitle="Everything you need to spec and bid WPC fencing, decking, cladding, pergolas and gates."
          aside={
            unlocked ? (
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(24px, 4vw, 32px)" }}>
                <h2 style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 700, color: "var(--dark)", marginBottom: 16 }}>
                  Your downloads
                </h2>
                {HAS_DOWNLOADS || SHOW_TODOS ? (
                  <DownloadList />
                ) : (
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)" }}>
                    Thanks — our spec sheets are being finalized, and we&apos;ll email them to you as soon as they&apos;re ready.
                  </p>
                )}
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)", marginTop: 20 }}>
                  Ready for trade pricing?{" "}
                  <Link href={FUNNEL_ENTRY.tradeApply} className="efs-link" style={{ color: "var(--accent-text)", fontWeight: 600 }}>
                    Apply for a trade account →
                  </Link>
                </p>
              </div>
            ) : (
              <MultiStepForm kind="spec_kit" steps={LEAD_FORMS.spec_kit.steps} submitLabel="Get the spec kit" successHref="/trade/spec-kit?unlocked=1" />
            )
          }
        />
      </main>
    </SiteShell>
  );
}
