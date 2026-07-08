"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { trackEvent } from "@/lib/metaEvents";

export default function Expansion() {
  return (
    <section
      id="expanding-to-palm-beach"
      className="section-mobile-sm"
      style={{
        background: "var(--surface)",
        padding: "80px 32px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
          className="expansion-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--accent-light)",
                border: "1px solid var(--accent-border)",
                borderRadius: 100,
                padding: "5px 12px",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--accent)",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Coming Soon
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(28px, 3.5vw, 46px)",
                color: "var(--dark)",
                lineHeight: 1.05,
                marginBottom: 16,
              }}
            >
              Now expanding to<br />Palm Beach County, FL.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              We&apos;re building a brand new showroom in Palm Beach County — bringing Miami-quality WPC products to South Florida homeowners. Inquiries are open now.
            </p>
          </motion.div>

          {/* Right — two location cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {[
              {
                icon: "🟢",
                title: "Miami — Open Now",
                desc: "North Miami Beach showroom serving all of South Florida.",
                phone: "(305) 967-9202",
              },
              {
                icon: "🟡",
                title: "Palm Beach County — Opening Soon",
                desc: "Call and mention Palm Beach County for priority service.",
                phone: "(305) 967-9202",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <MapPin size={16} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700, color: "var(--dark)", marginBottom: 2 }}>
                      {card.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--text-secondary)" }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
                <a
                  href="tel:+13059679202"
                  onClick={() => trackEvent("Contact", { method: "phone" })}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--accent)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.phone}
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .expansion-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
