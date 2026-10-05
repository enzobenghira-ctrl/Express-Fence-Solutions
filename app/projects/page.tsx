import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import FunnelImage from "@/components/funnel/FunnelImage";
import FactText from "@/components/funnel/FactText";
import FunnelLink from "@/components/funnel/FunnelLink";
import { PROJECTS } from "@/lib/projects-data";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects — WPC Fences, Gates & Decks | Express Fence Solutions",
  description: `Real WPC fence, gate, deck and pergola projects across ${SITE.serviceAreaShort}.`,
  alternates: { canonical: `${SITE.url}/projects` },
};

const linkStyle = { fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "var(--accent-text)" } as const;

// Shared page: proof, with each project ending in the matching funnel.
export default function ProjectsPage() {
  return (
    <SiteShell>
      <main>
        <Hero eyebrow="Projects" title="Real installs, real homes" subtitle="A look at recent WPC projects — every photo here is a real job." />
        <section className="efs-section" style={{ background: "var(--background)" }}>
          <div className="efs-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p) => (
              <article key={p.photo.src} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                  <FunnelImage src={p.photo.src} alt={p.photo.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "22px 22px 24px", display: "grid", gap: 8 }}>
                  <span className="efs-eyebrow" style={{ marginBottom: 0 }}>
                    {p.tag ?? <span className="efs-todo">{"{{TODO: Residential or Trade}}"}</span>} · {p.product}
                  </span>
                  <h2 style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 700, color: "var(--dark)" }}>
                    <FactText value={p.title} />
                  </h2>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)" }}>
                    <FactText value={p.location} />
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", marginTop: 6 }}>
                    {p.tag !== "Trade" && (
                      <FunnelLink href={FUNNEL_ENTRY.homeQuote} funnel="home" style={linkStyle}>
                        Want this? Get a Quote →
                      </FunnelLink>
                    )}
                    {p.tag !== "Residential" && (
                      <FunnelLink href={FUNNEL_ENTRY.tradeApply} funnel="trade" style={linkStyle}>
                        Install this for your clients? Apply →
                      </FunnelLink>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
