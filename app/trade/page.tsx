import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import ProcessSteps from "@/components/funnel/ProcessSteps";
import ContainerScheduleCard from "@/components/funnel/ContainerScheduleCard";
import TestimonialBlock from "@/components/funnel/TestimonialBlock";
import FAQ from "@/components/funnel/FAQ";
import FunnelButton from "@/components/funnel/FunnelButton";
import FactText from "@/components/funnel/FactText";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";
import { isPageReady } from "@/lib/content-readiness";
import { isVisible, visibleFacts } from "@/lib/facts";
import { TRADE_FAQS, TRADE_PRODUCT_LINES, TRADE_REASONS, TRADE_STEPS, TRADE_TIERS } from "@/lib/trade-content";

export const metadata: Metadata = {
  title: "WPC Supplier Miami & South Florida — Trade Program | Express Fence Solutions",
  description: "Composite fence wholesale for Florida contractors: trade pricing on WPC fencing, decking, cladding, pergolas and gates. Apply for a trade account.",
  keywords: "WPC supplier Miami, composite fence wholesale Florida, WPC trade pricing, composite decking supplier South Florida, contractor fence supplier",
  alternates: { canonical: `${SITE.url}/trade` },
};

const APPLY = { label: "Apply for a Trade Account", href: FUNNEL_ENTRY.tradeApply };

const cardStyle = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 14,
  padding: "32px 28px",
} as const;

const bodyText = { fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)" } as const;

export default function TradePage() {
  return (
    <SiteShell mobileBar="trade">
      <main>
        {/* 1. Hero */}
        <Hero
          eyebrow="Trade Program"
          title="Premium WPC supply for South Florida contractors"
          subtitle={`Fencing, decking, cladding, pergolas and gates — supplied to the trade from our ${SITE.address.city} showroom, with trade pricing once your account is approved.`}
          image={{ src: "/images/fence-waterway-turf.jpg", alt: "Charcoal WPC privacy fence installed along a South Florida waterway" }}
          primary={APPLY}
          trustItems={["Trade pricing after approval", "Container allocation program", `Serving ${SITE.serviceAreaShort}`]}
        />

        {/* 2. Three reasons */}
        <section className="efs-section" style={{ background: "var(--background)" }}>
          <div className="efs-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="efs-eyebrow">Why partner with us</span>
              <h2 className="efs-h2">Built around your margin and your schedule</h2>
            </div>
            <div className="efs-split-grid">
              {TRADE_REASONS.map((r) => (
                <div key={r.title} style={cardStyle}>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 400, fontSize: 30, color: "var(--dark)", marginBottom: 12 }}>
                    {r.title}
                  </h3>
                  <p style={bodyText}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How it works */}
        <ProcessSteps eyebrow="How it works" title="From application to monthly allocation" steps={TRADE_STEPS} />

        {/* 4. Pricing tiers */}
        <section id="tiers" className="efs-section" style={{ background: "var(--background)" }}>
          <div className="efs-container">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="efs-eyebrow">Trade pricing</span>
              <h2 className="efs-h2">Three tiers, priced by volume</h2>
              <p style={{ ...bodyText, maxWidth: 560, margin: "16px auto 0" }}>
                Your tier is set by your monthly volume. Exact prices are shared once your account is approved.
              </p>
            </div>
            <div className="efs-split-grid">
              {TRADE_TIERS.map((t) => (
                <div
                  key={t.name}
                  style={{
                    ...cardStyle,
                    background: t.featured ? "var(--dark)" : "var(--surface)",
                    borderColor: t.featured ? "var(--dark)" : "var(--border)",
                    color: t.featured ? "var(--white)" : "var(--dark)",
                  }}
                >
                  <span className={t.featured ? "efs-eyebrow efs-eyebrow--on-dark" : "efs-eyebrow"}>{t.volume}</span>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 400, fontSize: 34, marginBottom: 8 }}>{t.name}</h3>
                  {isVisible(t.discount) && (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
                      Discount: <FactText value={t.discount} />
                    </p>
                  )}
                  <ul style={{ listStyle: "none", display: "grid", gap: 10, marginTop: 12 }}>
                    {visibleFacts(t.benefits).map((b, i) => (
                      <li key={i} style={{ display: "flex", gap: 10, fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.5 }}>
                        <Check size={16} aria-hidden style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ color: t.featured ? "rgba(250,250,247,0.85)" : "var(--text-secondary)" }}>
                          <FactText value={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Container schedule preview + 6. product lines */}
        <section className="efs-section" style={{ background: "var(--surface)" }}>
          <div className="efs-container" style={{ display: "grid", gap: 48 }}>
            <ContainerScheduleCard secondary={{ label: "See the container schedule", href: "/trade/container-schedule" }} />

            <div>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <span className="efs-eyebrow">Product lines</span>
                <h2 className="efs-h2">What you can order</h2>
              </div>
              <div className="efs-split-grid">
                {TRADE_PRODUCT_LINES.map((p) => (
                  <div key={p.name} style={{ ...cardStyle, background: "var(--white)", display: "flex", flexDirection: "column", gap: 10 }}>
                    <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 700, color: "var(--dark)" }}>{p.name}</h3>
                    <p style={{ ...bodyText, flex: 1 }}>{p.text}</p>
                    {isVisible(p.highlights) && (
                      <p style={{ ...bodyText, fontSize: 14 }}>
                        <strong style={{ color: "var(--dark)" }}>Spec highlights:</strong> <FactText value={p.highlights} />
                      </p>
                    )}
                    {isPageReady(p.href) && (
                      <Link href={p.href} className="efs-link" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "var(--accent-text)" }}>
                        View product →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Contractor testimonials — renders nothing until real ones exist */}
        <TestimonialBlock audience="trade" eyebrow="From our partners" title="What contractors say" />

        {/* 8. Certified Installer Network */}
        <section className="efs-section" style={{ background: "var(--dark)" }}>
          <div className="efs-container" style={{ maxWidth: 760, textAlign: "center" }}>
            <span className="efs-eyebrow efs-eyebrow--on-dark">Certified Installer Network</span>
            <h2 className="efs-h2" style={{ color: "var(--white)", marginBottom: 16 }}>
              We send you homeowner jobs
            </h2>
            <p style={{ ...bodyText, color: "rgba(250,250,247,0.8)", marginBottom: 24 }}>
              Homeowner projects we don&apos;t install ourselves go to certified installers in our network. You do the install; we supply the WPC.
            </p>
            <Link href="/trade/certified-installer" className="topbar-link" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, fontWeight: 600 }}>
              How the network works →
            </Link>
          </div>
        </section>

        {/* 9. FAQ */}
        <FAQ eyebrow="Trade FAQ" items={TRADE_FAQS} />

        {/* 10. Apply again */}
        <section className="efs-section" style={{ background: "var(--surface)", textAlign: "center" }}>
          <div className="efs-container" style={{ maxWidth: 680 }}>
            <h2 className="efs-h2" style={{ marginBottom: 16 }}>
              Ready to open a trade account?
            </h2>
            <p style={{ ...bodyText, marginBottom: 28 }}>Three short steps. We&apos;ll follow up to set up your qualification call.</p>
            <FunnelButton href={APPLY.href}>{APPLY.label}</FunnelButton>
            <p style={{ ...bodyText, fontSize: 14, marginTop: 24 }}>
              Not ready yet?{" "}
              {isPageReady("/trade/spec-kit") && (
                <>
                  <Link href="/trade/spec-kit" className="efs-link" style={{ color: "var(--accent-text)", fontWeight: 600 }}>
                    Download the spec kit
                  </Link>{" "}
                  or{" "}
                </>
              )}
              <Link href="/trade/samples" className="efs-link" style={{ color: "var(--accent-text)", fontWeight: 600 }}>
                {isPageReady("/trade/spec-kit") ? "request samples" : "Request samples"}
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
