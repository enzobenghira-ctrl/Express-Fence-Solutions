import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import TrustBar from "@/components/funnel/TrustBar";
import FunnelSplit from "@/components/funnel/FunnelSplit";
import FeatureGrid from "@/components/funnel/FeatureGrid";
import SpecTable from "@/components/funnel/SpecTable";
import ProjectGallery from "@/components/funnel/ProjectGallery";
import ContainerScheduleCard from "@/components/funnel/ContainerScheduleCard";
import FunnelButton from "@/components/funnel/FunnelButton";
import HomeContact from "@/components/funnel/HomeContact";
import Products from "@/components/sections/Products";
import Testimonials from "@/components/sections/Testimonials";
import { todo } from "@/lib/facts";
import { WHY_WPC_FLORIDA } from "@/lib/home-content";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";
import { TRADE_REASONS } from "@/lib/trade-content";

export const metadata: Metadata = {
  title: "Premium WPC Fencing, Decking & Cladding Supplier | Miami & South Florida",
  description: "South Florida's premium WPC supplier: fencing, decking, cladding, pergolas and gates — trade supply for contractors, installed for homeowners.",
  alternates: { canonical: SITE.url },
};

const QUALITY_PROOF = [
  { label: "Composition", value: todo("composition from the supplier spec sheet") },
  { label: "Warranty", value: todo("warranty length and terms") },
  { label: "Certifications", value: todo("certifications / Florida Product Approval") },
  { label: "Manufacturer", value: todo("manufacturer name, if it can be published") },
];

// Shared page: its one job is routing each visitor into the right funnel.
export default function Home() {
  return (
    <SiteShell transparentHeader>
      <main>
        <Hero
          title="Premium WPC, built for Florida."
          subtitle="Fencing, decking, cladding and pergola systems, supplied to contractors and installed for homeowners across South Florida."
          image={{ src: "/images/fence-waterway-turf.jpg", alt: "Charcoal WPC privacy fence along a South Florida waterway" }}
          primary={{ label: "Open a Trade Account", href: FUNNEL_ENTRY.tradeHub, funnel: "trade" }}
          secondary={{ label: "Get a Home Quote", href: FUNNEL_ENTRY.homeQuote, funnel: "home" }}
        />
        <TrustBar
          items={["Trade pricing", "Container allocation program", todo("sample turnaround, e.g. samples in 48 hours"), todo("warranty, e.g. X-year warranty")]}
        />

        <FunnelSplit
          id="choose-your-path"
          eyebrow="Choose your path"
          title="How can we help?"
          paths={[
            {
              audience: "Contractors",
              title: "Supply for your crews",
              text: "Trade pricing, samples and a reserved share of every container.",
              cta: { label: "Open a Trade Account", href: FUNNEL_ENTRY.tradeHub, funnel: "trade" },
              featured: true,
            },
            {
              audience: "Homeowners",
              title: "Designed and installed for you",
              text: "Fences, decks, pergolas and outdoor living, from a free consultation to the finished install.",
              cta: { label: "Get a Home Quote", href: FUNNEL_ENTRY.homeQuote, funnel: "home" },
            },
            {
              audience: "Architects & designers",
              title: "Specify WPC",
              text: "Spec sheets and install guides for your drawings and specs.",
              cta: { label: "Get the spec kit", href: "/trade/spec-kit", funnel: "trade" },
            },
          ]}
        />

        <Products />

        <FeatureGrid eyebrow="Why our WPC" title="Made for Florida's heat, humidity and salt air" items={WHY_WPC_FLORIDA} />
        <section className="efs-section" style={{ background: "var(--surface)", paddingTop: 0 }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <SpecTable title="Quality you can check" caption="Express Fence Solutions WPC quality details" rows={QUALITY_PROOF} />
          </div>
        </section>

        <section className="efs-section" style={{ background: "var(--dark)" }}>
          <div className="efs-container" style={{ display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "center" }}>
            <div>
              <span className="efs-eyebrow efs-eyebrow--on-dark">Trade Program</span>
              <h2 className="efs-h2" style={{ color: "var(--white)", marginBottom: 20 }}>
                Supply that keeps your jobs moving
              </h2>
              <FunnelButton href={FUNNEL_ENTRY.tradeHub} funnel="trade" variant="light">
                Open a Trade Account
              </FunnelButton>
            </div>
            <ul style={{ listStyle: "none", display: "grid", gap: 18 }}>
              {TRADE_REASONS.map((r) => (
                <li key={r.title} style={{ display: "flex", gap: 12 }}>
                  <Check size={18} aria-hidden style={{ color: "var(--accent)", flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.6, color: "rgba(250,250,247,0.85)" }}>
                    <strong style={{ color: "var(--white)" }}>{r.title}.</strong> {r.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProjectGallery eyebrow="Real projects" title="Recent installs" />
        <div style={{ textAlign: "center", marginTop: -60, paddingBottom: 60 }}>
          <Link href="/projects" className="efs-link" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 600, color: "var(--accent-text)" }}>
            See all projects →
          </Link>
        </div>

        <Testimonials audience="all" />

        <section className="efs-section" style={{ background: "var(--background)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <ContainerScheduleCard secondary={{ label: "See the container schedule", href: "/trade/container-schedule" }} />
          </div>
        </section>

        <HomeContact />
      </main>
    </SiteShell>
  );
}
