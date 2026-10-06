import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import FeatureGrid from "@/components/funnel/FeatureGrid";
import ProcessSteps from "@/components/funnel/ProcessSteps";
import FactText, { TodoNote } from "@/components/funnel/FactText";
import FunnelButton from "@/components/funnel/FunnelButton";
import { robotsFor } from "@/lib/content-readiness";
import { SHOW_TODOS, isVisible } from "@/lib/facts";
import { HOME_STEPS, PACKAGE_DEFINITIONS, PACKAGE_INCLUDES, PACKAGE_PRICE_FROM } from "@/lib/home-content";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Outdoor Living Packages — WPC Decks, Pergolas & Cladding | Express Fence Solutions",
  description: `Deck, pergola, cladding and fencing designed together as one outdoor living project. Book a design consultation — serving ${SITE.serviceAreaShort}.`,
  alternates: { canonical: `${SITE.url}/outdoor-living-packages` },
  // Unlisted + noindex until the packages are defined (lib/content-readiness.ts).
  robots: robotsFor("/outdoor-living-packages"),
};

const CONSULT = { label: "Book a design consultation", href: `${FUNNEL_ENTRY.homeQuote}?type=outdoor-living-package`, funnel: "home" as const };

export default function OutdoorLivingPackagesPage() {
  return (
    <SiteShell>
      <main>
        <Hero
          eyebrow="Outdoor living packages"
          title="One project, one design, one install"
          subtitle="Decking, pergola, cladding and fencing designed together — so your whole outdoor space matches and is built in one go."
          primary={CONSULT}
        />

        {/* Price anchor renders only once the owner confirms it (PACKAGE_PRICE_FROM). */}
        {PACKAGE_PRICE_FROM && (
          <p style={{ textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 600, padding: "28px 20px 0" }}>
            Projects from {PACKAGE_PRICE_FROM}
          </p>
        )}

        <FeatureGrid eyebrow="What a package can include" title="Everything outside, designed as one" items={PACKAGE_INCLUDES} background="background" />

        {isVisible(PACKAGE_DEFINITIONS) && (
          <section className="efs-section" style={{ background: "var(--surface)" }}>
            <div className="efs-container" style={{ maxWidth: 760, textAlign: "center" }}>
              <span className="efs-eyebrow">Packages</span>
              <h2 className="efs-h2" style={{ marginBottom: 20 }}>
                Choose a starting point
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)" }}>
                <FactText value={PACKAGE_DEFINITIONS} />
              </p>
              {SHOW_TODOS && (
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)", marginTop: 16 }}>
                  Real builds: <TodoNote>2–3 real outdoor living builds with photos</TodoNote>
                </p>
              )}
            </div>
          </section>
        )}

        <ProcessSteps eyebrow="How it works" title="Consult, design, install" steps={HOME_STEPS} background="background" />

        <section className="efs-section" style={{ background: "var(--surface)", textAlign: "center" }}>
          <h2 className="efs-h2" style={{ marginBottom: 24 }}>
            Let&apos;s design your outdoor space
          </h2>
          <FunnelButton href={CONSULT.href} funnel="home">
            {CONSULT.label}
          </FunnelButton>
        </section>
      </main>
    </SiteShell>
  );
}
