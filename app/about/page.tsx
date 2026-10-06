import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import FunnelSplit from "@/components/funnel/FunnelSplit";
import PhoneLink from "@/components/funnel/PhoneLink";
import { TodoNote } from "@/components/funnel/FactText";
import { SHOW_TODOS } from "@/lib/facts";
import { DIRECTIONS_URL, FUNNEL_ENTRY, SITE, formatAddress } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us — Family-Owned WPC Supplier & Installer | Express Fence Solutions",
  description: `Express Fence Solutions is a family-owned WPC supplier and installer with a showroom in ${SITE.address.city}, FL, serving ${SITE.serviceAreaShort}.`,
  alternates: { canonical: `${SITE.url}/about` },
};

const body = { fontFamily: "var(--font-dm-sans)", fontSize: 16, lineHeight: 1.75, color: "var(--text-secondary)" } as const;
const h2 = { fontSize: "clamp(30px, 4vw, 42px)", marginBottom: 16 } as const;

// Shared page: the trust story (family, showroom, warehouse), then both funnels.
export default function AboutPage() {
  return (
    <SiteShell>
      <main>
        <Hero
          eyebrow="About us"
          title="A family business built around WPC"
          subtitle="We supply premium WPC to contractors and design and install it for homeowners — from our showroom in Okeechobee."
        />

        <section className="efs-section" style={{ background: "var(--background)" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: 56 }}>
            {/* Owner story: section appears on previews as a TODO; omitted in production until written. */}
            {SHOW_TODOS && (
              <div>
                <h2 className="efs-h2" style={h2}>
                  Our story
                </h2>
                <p style={body}>
                  <TodoNote>owner story — how the family started Express Fence Solutions and why WPC</TodoNote>
                </p>
              </div>
            )}

            <div>
              <h2 className="efs-h2" style={h2}>
                Visit the showroom
              </h2>
              <p style={body}>
                See and touch the products in person at {formatAddress()}.{" "}
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="efs-link" style={{ fontWeight: 600, color: "var(--accent-text)" }}>
                  Get directions →
                </a>
              </p>
              <p style={{ ...body, marginTop: 12 }}>
                {SHOW_TODOS && (
                  <>
                    Hours: <TodoNote>showroom hours</TodoNote> ·{" "}
                  </>
                )}
                Call <PhoneLink className="efs-link" style={{ fontWeight: 600 }} />
              </p>
              {SHOW_TODOS && (
                <p style={{ ...body, marginTop: 12 }}>
                  <TodoNote>real showroom photos</TodoNote>
                </p>
              )}
            </div>

            <div>
              <h2 className="efs-h2" style={h2}>
                Stock you can count on
              </h2>
              <p style={body}>
                In-stock items ship now, and our trade partners reserve their share of each incoming container.{" "}
                <TodoNote>warehouse details and photos</TodoNote>
              </p>
            </div>
          </div>
        </section>

        <FunnelSplit
          eyebrow="Work with us"
          title="Where would you like to start?"
          paths={[
            {
              audience: "Homeowners",
              title: "Plan your project",
              text: "A free consultation, a detailed proposal and a professional install.",
              cta: { label: "Get a Home Quote", href: FUNNEL_ENTRY.homeQuote, funnel: "home" },
              featured: true,
            },
            {
              audience: "Contractors",
              title: "Open a trade account",
              text: "Trade pricing, samples and container allocation.",
              cta: { label: "Open a Trade Account", href: FUNNEL_ENTRY.tradeHub, funnel: "trade" },
            },
          ]}
        />
      </main>
    </SiteShell>
  );
}
