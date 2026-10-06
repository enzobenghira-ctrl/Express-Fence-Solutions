import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import ProcessSteps from "@/components/funnel/ProcessSteps";
import FAQ from "@/components/funnel/FAQ";
import FunnelButton from "@/components/funnel/FunnelButton";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";
import { INSTALLER_FAQS } from "@/lib/trade-content";
import { robotsFor } from "@/lib/content-readiness";

export const metadata: Metadata = {
  title: "Certified Installer Network — Get Homeowner WPC Jobs | Express Fence Solutions",
  description: `Join our Certified Installer Network: we refer homeowner WPC fence, deck and pergola jobs to installers across ${SITE.serviceAreaShort}.`,
  alternates: { canonical: `${SITE.url}/trade/certified-installer` },
  // Unlisted + noindex until the program terms are confirmed (lib/content-readiness.ts).
  robots: robotsFor("/trade/certified-installer"),
};

const APPLY_HREF = `${FUNNEL_ENTRY.tradeApply}?installer=1`;

export default function CertifiedInstallerPage() {
  return (
    <SiteShell mobileBar="trade">
      <main>
        <Hero
          eyebrow="Certified Installer Network"
          title="We send you homeowner jobs"
          subtitle="Homeowner projects we don't install ourselves go to certified installers in our network. You do the install; we supply the WPC material."
          image={{ src: "/images/gate-wood-black-miami.jpg", alt: "WPC gate installed on a South Florida home" }}
          primary={{ label: "Apply as an installer", href: APPLY_HREF }}
        />
        <ProcessSteps
          eyebrow="How it works"
          title="From application to your first referral"
          steps={[
            { title: "Apply", text: "Submit a trade application flagged as an installer." },
            { title: "Get certified", text: "We review your application against the network's requirements." },
            { title: "Receive referrals", text: "We send you homeowner projects in your area." },
            { title: "Install with our material", text: "You buy the WPC from us and complete the install." },
          ]}
        />
        <FAQ eyebrow="Installer FAQ" items={INSTALLER_FAQS} />
        <section className="efs-section" style={{ background: "var(--surface)", textAlign: "center" }}>
          <h2 className="efs-h2" style={{ marginBottom: 24 }}>
            Ready to take on homeowner jobs?
          </h2>
          <FunnelButton href={APPLY_HREF}>Apply as an installer</FunnelButton>
        </section>
      </main>
    </SiteShell>
  );
}
