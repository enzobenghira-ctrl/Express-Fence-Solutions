"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/metaEvents";

const CATALOG = "https://drive.google.com/file/d/1ppHVFNHBI4mRzAuBZgrRHWTiE0YpF2d6/view?usp=sharing";

const products = ["WPC Fences", "WPC Pergolas", "WPC Cladding", "WPC Decking", "WPC Gates", "WPC Benches"];
const moreProducts = [
  { label: "Container Pools", href: "/other-products#container-pools" },
  { label: "Aluminium Pergolas", href: "/other-products#aluminium-pergolas" },
  { label: "Aluminium Fences", href: "/other-products#aluminium-fences" },
];
const company = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Why WPC", href: "#why-wpc" },
  { label: "Gallery", href: "#gallery" },
  { label: "Expanding to Palm Beach County", href: "#expanding-to-okeechobee" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const go = (href: string) => {
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "var(--dark)",
        borderTop: "1px solid rgba(250,250,247,0.08)",
        padding: "72px 32px 32px",
        color: "rgba(250,250,247,0.55)",
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
                color: "rgba(250,250,247,0.45)",
                lineHeight: 1.5,
                marginBottom: 24,
                maxWidth: 240,
              }}
            >
              Make your dream home a reality.
            </p>
            <a
              href={CATALOG}
              target="_blank"
              rel="noopener noreferrer"
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
              📄 Download Catalog
            </a>
          </div>

          {/* Col 2 — Products */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,247,0.35)", marginBottom: 20 }}>
              Products
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {products.map(p => (
                <li key={p}>
                  <a
                    href="#products"
                    onClick={(e) => { e.preventDefault(); go("#products"); }}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(250,250,247,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.9)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.5)")}
                  >{p}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — More Products */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,247,0.35)", marginBottom: 20 }}>
              More Products
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {moreProducts.map(p => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(250,250,247,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.9)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.5)")}
                  >{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,247,0.35)", marginBottom: 20 }}>
              Company
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {company.map(c => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    onClick={(e) => { e.preventDefault(); go(c.href); }}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(250,250,247,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.9)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.5)")}
                  >{c.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(250,250,247,0.35)", marginBottom: 20 }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="tel:+13059679202" onClick={() => trackEvent("Contact", { method: "phone" })} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
                <Phone size={13} strokeWidth={2.5} /> (305) 967-9202
              </a>
              <a href="tel:+17864032322" onClick={() => trackEvent("Contact", { method: "phone" })} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(250,250,247,0.5)", textDecoration: "none" }}>
                <Phone size={13} /> (786) 403-2322
              </a>
              <a href="mailto:Info@expressfencesolutions.com" style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(250,250,247,0.5)", textDecoration: "none" }}>
                <Mail size={13} style={{ marginTop: 2, flexShrink: 0 }} />
                Info@expressfencesolutions.com
              </a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(250,250,247,0.5)" }}>
                <MapPin size={13} style={{ marginTop: 2, flexShrink: 0, color: "var(--accent)" }} />
                Miami & Palm Beach County, FL
              </div>
              <a
                href="https://www.instagram.com/express_fence_solutions/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(250,250,247,0.5)", textDecoration: "none", transition: "color 0.2s", marginTop: 4 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.5)")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "rgba(250,250,247,0.3)" }}>
            © 2025 Express Fence Solutions LLC. All rights reserved.
          </p>
          <a
            href="https://nordecollective.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "rgba(250,250,247,0.3)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.3)")}
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
