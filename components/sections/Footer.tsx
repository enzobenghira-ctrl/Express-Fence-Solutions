"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/metaEvents";
import { DIRECTIONS_URL, SITE, type NavLink } from "@/lib/site-config";

// Spec sheets live on the site (the old Google Drive catalog included pricing and is no longer linked).
const SPEC_KIT = "/trade/spec-kit";

// Absolute hrefs so every link works from any page, not just the homepage.
const company = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Trade Program", href: "/trade" },
  { label: "Fence Installation Miami", href: "/fence-installation-miami" },
  { label: "Contact", href: "/#contact" },
];

interface Props {
  /** Link lists are built by SiteShell (server): gated pages removed, and no homeowner CTA on trade pages. */
  products: NavLink[];
  homeownerLinks: NavLink[];
  showSpecKit: boolean;
}

export default function Footer({ products, homeownerLinks, showSpecKit }: Props) {
  return (
    <footer
      style={{
        background: "var(--dark)",
        borderTop: "1px solid rgba(250,250,247,0.08)",
        padding: "72px 32px 32px",
        color: "var(--white)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.2fr",
            gap: 40,
            marginBottom: 56,
            paddingBottom: 56,
            borderBottom: "1px solid rgba(250,250,247,0.08)",
          }}
          className="footer-grid"
        >
          {/* Col 1 */}
          <div>
            <div style={{ position: "relative", height: 90, width: 90, marginBottom: 16, borderRadius: 8, overflow: "hidden" }}>
              <Image
                src="/images/logo.png"
                alt="Express Fence Solutions"
                fill
                sizes="90px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 16,
                color: "var(--white)",
                lineHeight: 1.5,
                marginBottom: 24,
                maxWidth: 240,
              }}
            >
              Make your dream home a reality.
            </p>
            {showSpecKit && (
            <Link
              href={SPEC_KIT}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
                border: "1px solid rgba(184,150,90,0.25)",
                borderRadius: 6,
                padding: "8px 14px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(184,150,90,0.25)")}
            >
              📄 Spec sheets
            </Link>
            )}
          </div>

          {/* Col 2 — Products */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              Products
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {products.map(p => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--white)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white)")}
                  >{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — More Products */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              For Homeowners
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {homeownerLinks.map(p => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--white)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white)")}
                  >{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              Company
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {company.map(c => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--white)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white)")}
                  >{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="tel:+13059679202" onClick={() => trackEvent("Contact", { method: "phone" })} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "var(--white)", textDecoration: "none" }}>
                <Phone size={13} strokeWidth={2.5} style={{ color: "var(--accent)" }} /> (305) 967-9202
              </a>
              <a href="mailto:Info@expressfencesolutions.com" style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--white)", textDecoration: "none" }}>
                <Mail size={13} style={{ marginTop: 2, flexShrink: 0, color: "var(--accent)" }} />
                Info@expressfencesolutions.com
              </a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--white)", lineHeight: 1.5 }}>
                <MapPin size={13} style={{ marginTop: 3, flexShrink: 0, color: "var(--accent)" }} />
                <div>
                  <p style={{ fontWeight: 600 }}>Showroom</p>
                  <p>{SITE.address.street}</p>
                  <p>{SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}</p>
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}
                  >
                    Get directions →
                  </a>
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "rgba(250,250,247,0.75)", lineHeight: 1.5 }}>
                Serving {SITE.serviceArea}
              </p>
              <a
                href="https://www.instagram.com/express_fence_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--white)", textDecoration: "none", transition: "color 0.2s", marginTop: 4 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white)")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                @express_fence_solutions
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--white)" }}>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <a
            href="https://nordecollective.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--white)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white)")}
          >
            Site by Norde Collective
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 700px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 460px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
