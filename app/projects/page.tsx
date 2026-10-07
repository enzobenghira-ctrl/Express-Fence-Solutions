import type { Metadata } from "next";
import { Check } from "lucide-react";
import SiteShell from "@/components/funnel/SiteShell";
import SectionTabs from "@/components/funnel/SectionTabs";
import PackageDesigner, { CustomizePackageButton } from "@/components/funnel/PackageDesigner";
import Hero from "@/components/funnel/Hero";
import FunnelImage from "@/components/funnel/FunnelImage";
import FactText, { TodoNote } from "@/components/funnel/FactText";
import { SHOW_TODOS, isTodo, isVisible } from "@/lib/facts";
import FunnelLink from "@/components/funnel/FunnelLink";
import { PROJECTS } from "@/lib/projects-data";
import { PACKAGE_COMPONENTS, PACKAGES } from "@/content/packages";
import { PACKAGE_STEPS, VISIBLE_PACKAGES, packageIsAvailable } from "@/lib/forms/package";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects & Outdoor Living Packages | Express Fence Solutions",
  description: `Real WPC fence, gate, deck and pergola projects across ${SITE.serviceAreaShort}, plus outdoor living packages you can design your own way.`,
  alternates: { canonical: `${SITE.url}/projects` },
};

const linkStyle = { fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "var(--accent-text)" } as const;
const bodyText = { fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)" } as const;

const TABS = [
  { id: "projects", label: "Recent Projects" },
  { id: "packages", label: "Outdoor Living Packages" },
  { id: "design", label: "Design Your Package" },
];

// Visible packages only, so hidden ones never reach the page in production.
const PACKAGE_NAMES = Object.fromEntries(VISIBLE_PACKAGES.map((p) => [p.slug, p.name]));
const unavailableParts = (slug: string) =>
  PACKAGES.find((p) => p.slug === slug)!
    .includes.filter((i) => i.component && !PACKAGE_COMPONENTS.find((c) => c.id === i.component)?.available)
    .map((i) => i.label);

// Shared page: proof, with each project ending in the matching funnel.
export default function ProjectsPage() {
  return (
    <SiteShell>
      <main>
        <Hero
          eyebrow="Projects"
          title="Real installs, real homes"
          subtitle="Recent WPC projects — every project photo is a real job — and outdoor living packages you can make your own."
        />
        <SectionTabs items={TABS} />
        <section id="projects" className="efs-section efs-tab-target" style={{ background: "var(--background)" }}>
          <div className="efs-container" style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="efs-eyebrow">Recent projects</span>
            <h2 className="efs-h2">Recent installs</h2>
          </div>
          <div className="efs-container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p) => (
              <article key={p.photo.src} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                  <FunnelImage src={p.photo.src} alt={p.photo.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "22px 22px 24px", display: "grid", gap: 8 }}>
                  {(p.tag || SHOW_TODOS) && (
                    <span className="efs-eyebrow" style={{ marginBottom: 0 }}>
                      {p.tag ?? <TodoNote>Residential or Trade</TodoNote>}
                    </span>
                  )}
                  {/* Until the owner names a project, its product is the heading. */}
                  <h2 style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 700, color: "var(--dark)" }}>
                    {isTodo(p.title) && !SHOW_TODOS ? p.product : <FactText value={p.title} />}
                  </h2>
                  {(SHOW_TODOS || !isTodo(p.title)) && (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)" }}>{p.product}</p>
                  )}
                  {isVisible(p.location) && (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)" }}>
                      <FactText value={p.location} />
                    </p>
                  )}
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

        <section id="packages" className="efs-section efs-tab-target" style={{ background: "var(--surface)" }}>
          <div className="efs-container">
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
              <span className="efs-eyebrow">Outdoor living packages</span>
              <h2 className="efs-h2" style={{ marginBottom: 14 }}>
                Start from a package
              </h2>
              <p style={bodyText}>Parts that work well together, designed and installed as one project. Pick one to customize, or start from scratch below.</p>
            </div>
            <div className="efs-pkg-grid">
              {VISIBLE_PACKAGES.map((p) => (
                <article key={p.slug} className="efs-pkg-card">
                  <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                    <FunnelImage src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "22px 22px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 400, fontSize: 30, lineHeight: 1.1, color: "var(--dark)" }}>
                      {p.name}
                    </h3>
                    <p style={bodyText}>{p.description}</p>
                    <p style={{ ...bodyText, fontSize: 14, color: "var(--dark)" }}>
                      <strong>Ideal for:</strong> {p.idealFor}
                    </p>
                    <ul aria-label={`Included in ${p.name}`}>
                      {p.includes.map((i) => (
                        <li key={i.label}>
                          <Check size={16} aria-hidden style={{ color: "var(--accent)", flexShrink: 0, marginTop: 3 }} />
                          {i.label}
                        </li>
                      ))}
                    </ul>
                    {!packageIsAvailable(p) && <TodoNote>{`hidden in production until confirmed: ${unavailableParts(p.slug).join(", ")}`}</TodoNote>}
                    <div style={{ marginTop: "auto", paddingTop: 8 }}>
                      <CustomizePackageButton slug={p.slug} name={p.name} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="design" className="efs-section efs-tab-target" style={{ background: "var(--background)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="efs-eyebrow">Design your package</span>
              <h2 className="efs-h2" style={{ marginBottom: 14 }}>
                Build it your way
              </h2>
              <p style={bodyText}>Choose a starting point, adjust each part, and we&apos;ll follow up to plan your design consultation.</p>
            </div>
            <PackageDesigner steps={PACKAGE_STEPS} packageNames={PACKAGE_NAMES} />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
