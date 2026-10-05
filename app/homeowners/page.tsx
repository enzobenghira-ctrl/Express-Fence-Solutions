import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import ProcessSteps from "@/components/funnel/ProcessSteps";
import FeatureGrid from "@/components/funnel/FeatureGrid";
import ProjectGallery from "@/components/funnel/ProjectGallery";
import TestimonialBlock from "@/components/funnel/TestimonialBlock";
import FAQ from "@/components/funnel/FAQ";
import FunnelButton from "@/components/funnel/FunnelButton";
import { HOME_FAQS, HOME_PROJECTS, HOME_STEPS, WHY_WPC_FLORIDA } from "@/lib/home-content";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "WPC Fences, Decks & Pergolas for Your Home | Express Fence Solutions",
  description: `Premium WPC fences, gates, decks, pergolas and outdoor living — designed and installed for homeowners across ${SITE.serviceAreaShort}. Free consultation.`,
  alternates: { canonical: `${SITE.url}/homeowners` },
};

const QUOTE = { label: "Get a Home Quote", href: FUNNEL_ENTRY.homeQuote, funnel: "home" as const };

export default function HomeownersPage() {
  return (
    <SiteShell>
      <main>
        <Hero
          eyebrow="For homeowners"
          title="Premium WPC, built for Florida"
          subtitle="Fences, gates, decks, pergolas and outdoor living — designed and installed for your home, with nothing to paint or seal afterward."
          image={{ src: "/images/fence-charcoal-white-frame.jpg", alt: "Charcoal WPC fence panels in a white aluminum frame" }}
          primary={QUOTE}
          trustItems={["Free in-home consultation", `Showroom in ${SITE.address.city}, FL`, `Serving ${SITE.serviceAreaShort}`]}
        />

        <section className="efs-section" style={{ background: "var(--background)" }}>
          <div className="efs-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="efs-eyebrow">What we build</span>
              <h2 className="efs-h2">Start with your project</h2>
            </div>
            <div className="efs-split-grid">
              {HOME_PROJECTS.map((p) => (
                <Link
                  key={p.type}
                  href={`${FUNNEL_ENTRY.homeQuote}?type=${p.type}`}
                  className="efs-link"
                  style={{ display: "block", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "26px 24px" }}
                >
                  <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: 12 }}>{p.text}</p>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "var(--accent-text)" }}>Get a quote →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ProcessSteps eyebrow="How it works" title="Consult, design, install" steps={HOME_STEPS} />
        <FeatureGrid eyebrow="Why WPC for Florida" title="Made for heat, humidity and salt air" items={WHY_WPC_FLORIDA} background="background" />
        <ProjectGallery />
        <TestimonialBlock audience="home" eyebrow="Google reviews" title="What homeowners say" />
        <FAQ eyebrow="Questions" items={HOME_FAQS} />
        <section className="efs-section" style={{ background: "var(--surface)", textAlign: "center" }}>
          <h2 className="efs-h2" style={{ marginBottom: 24 }}>
            Ready to see what your space could be?
          </h2>
          <FunnelButton href={QUOTE.href} funnel="home">
            {QUOTE.label}
          </FunnelButton>
        </section>
      </main>
    </SiteShell>
  );
}
