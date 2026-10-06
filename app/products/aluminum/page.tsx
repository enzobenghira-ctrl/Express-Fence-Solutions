import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import ProjectGallery from "@/components/funnel/ProjectGallery";
import SpecTable, { visibleRows } from "@/components/funnel/SpecTable";
import ProductFunnelCTA from "@/components/funnel/ProductFunnelCTA";
import ProductViewTracker from "@/components/funnel/ProductViewTracker";
import { robotsFor } from "@/lib/content-readiness";
import { ALUMINUM_SPECS } from "@/lib/products-data";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aluminum Fences & Louvered Aluminum Pergolas | Express Fence Solutions",
  description: `Aluminum fences and louvered aluminum pergolas, supplied to contractors and installed for homeowners across ${SITE.serviceAreaShort}.`,
  alternates: { canonical: `${SITE.url}/products/aluminum` },
  // Unlisted + noindex until at least one spec is confirmed (lib/content-readiness.ts).
  robots: robotsFor("/products/aluminum"),
};

// Owner-approved: AI images may appear on aluminum pergola pages, labelled "Concept", until real photos arrive.
const PERGOLA_CONCEPTS = [
  { src: "/images/aluminum-pergola-pool-sunset.webp", alt: "Louvered aluminum pergola beside a pool" },
  { src: "/images/aluminum-pergola-waterfront-sunset.webp", alt: "Louvered aluminum pergola on a waterfront patio" },
];

export default function AluminumPage() {
  return (
    <SiteShell>
      <ProductViewTracker name="Aluminum fences & pergolas" />
      <main>
        <Hero
          eyebrow="Aluminum"
          title="Aluminum fences & louvered pergolas"
          subtitle="A clean, modern alternative alongside our WPC lines — aluminum fencing for pools and property lines, and louvered pergolas for adjustable shade."
          image={{ src: PERGOLA_CONCEPTS[0].src, alt: PERGOLA_CONCEPTS[0].alt }}
        />
        <ProjectGallery
          eyebrow="Louvered pergolas"
          title="Design ideas"
          caption="Concept images — photos of finished installs coming soon."
          photos={PERGOLA_CONCEPTS}
        />
        {visibleRows(ALUMINUM_SPECS).length > 0 && (
          <section className="efs-section" style={{ background: "var(--surface)" }}>
            <div style={{ maxWidth: 820, margin: "0 auto" }}>
              <SpecTable title="Specifications" caption="Aluminum fence and pergola specifications" rows={ALUMINUM_SPECS} />
            </div>
          </section>
        )}
        <ProductFunnelCTA productName="Aluminum fences & pergolas" quoteType="pergola" />
      </main>
    </SiteShell>
  );
}
