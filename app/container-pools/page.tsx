import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import ProcessSteps from "@/components/funnel/ProcessSteps";
import ProjectGallery from "@/components/funnel/ProjectGallery";
import FactText from "@/components/funnel/FactText";
import FunnelButton from "@/components/funnel/FunnelButton";
import { CONTAINER_POOL_FEATURES, HOME_STEPS, PACKAGE_PRICE_FROM } from "@/lib/home-content";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Container Pools — Design & Installation | Express Fence Solutions",
  description: `Container pools designed and installed with matching WPC decking and pergolas. Book a design consultation — serving ${SITE.serviceAreaShort}.`,
  alternates: { canonical: `${SITE.url}/container-pools` },
};

const CONSULT = { label: "Book a design consultation", href: `${FUNNEL_ENTRY.homeQuote}?type=container-pool`, funnel: "home" as const };

// Owner-approved: AI images may appear here, labelled "Concept", until real photos arrive.
const CONCEPTS = [
  { src: "/images/container-pool-pergola-daytime.webp", alt: "Container pool with WPC deck and pergola" },
  { src: "/images/container-pool-backyard-pergola-day.webp", alt: "Backyard container pool beside a pergola" },
  { src: "/images/container-pool-pergola-sunset-party.webp", alt: "Container pool with pergola at sunset" },
];

export default function ContainerPoolsPage() {
  return (
    <SiteShell>
      <main>
        <Hero
          eyebrow="Container pools"
          title="A complete pool, finished to match your outdoor space"
          subtitle="Paired with WPC decking, cladding and pergolas so the whole space feels designed as one."
          image={{ src: CONCEPTS[0].src, alt: CONCEPTS[0].alt }}
          primary={CONSULT}
        />

        {PACKAGE_PRICE_FROM && (
          <p style={{ textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 600, padding: "28px 20px 0" }}>
            Projects from {PACKAGE_PRICE_FROM}
          </p>
        )}

        <section className="efs-section" style={{ background: "var(--background)" }}>
          <div className="efs-container" style={{ maxWidth: 760, textAlign: "center" }}>
            <span className="efs-eyebrow">Options</span>
            <h2 className="efs-h2" style={{ marginBottom: 20 }}>
              Sizes, finishes and upgrades
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)" }}>
              <FactText value={CONTAINER_POOL_FEATURES} />
            </p>
          </div>
        </section>

        <ProjectGallery
          eyebrow="Design ideas"
          title="What a container pool could look like"
          caption="Concept images — photos of finished installs coming soon."
          photos={CONCEPTS}
        />
        <ProcessSteps eyebrow="How it works" title="Consult, design, install" steps={HOME_STEPS} />

        <section className="efs-section" style={{ background: "var(--background)", textAlign: "center" }}>
          <h2 className="efs-h2" style={{ marginBottom: 24 }}>
            Plan your container pool
          </h2>
          <FunnelButton href={CONSULT.href} funnel="home">
            {CONSULT.label}
          </FunnelButton>
        </section>
      </main>
    </SiteShell>
  );
}
