"use client";

import { motion } from "framer-motion";

const audiences = [
  { title: "General Contractors", text: "Spec WPC into bids with confidence — consistent material, on-time delivery, fewer callbacks." },
  { title: "Developers & Builders", text: "A standing supplier across every phase and every project, not a one-off vendor relationship." },
  { title: "Architects & Designers", text: "Also for: samples, specs, and finish consistency to design with confidence." },
  { title: "Property Managers", text: "Also for: ongoing maintenance-free upgrades across managed properties and HOAs." },
];

export default function PartnerAudiences() {
  return (
    <section className="section-mobile" style={{ background: "var(--background)", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ maxWidth: 600, marginBottom: 60 }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              display: "block",
              marginBottom: 16,
            }}
          >
            Who We Partner With
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              color: "var(--dark)",
              lineHeight: 1.0,
            }}
          >
            Built for the people who build South Florida.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="partner-audience-grid">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "28px 24px",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 22, color: "var(--dark)", marginBottom: 10 }}>
                {a.title}
              </h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {a.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .partner-audience-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .partner-audience-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
