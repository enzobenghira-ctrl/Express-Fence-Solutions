"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const models = [
  {
    title: "Supply Only",
    text: "We provide the material — your crew installs. Trade pricing, samples, specs, and reliable lead times so your schedule holds.",
    checks: ["Trade & volume pricing", "Samples & specs for bids", "Consistent stock across projects"],
  },
  {
    title: "Full Install",
    text: "We install on your projects as your outdoor-products subcontractor — WPC fences, pergolas, decking, cladding, gates, and benches, plus aluminum pergolas, aluminum fences, and container pools.",
    checks: ["Our crews, your project", "One point of accountability", "Matches your build timeline"],
  },
];

export default function PartnerHowItWorks() {
  return (
    <section className="section-mobile" style={{ background: "var(--background)", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ maxWidth: 640, marginBottom: 60 }}
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
            How It Works
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              color: "var(--dark)",
              lineHeight: 1.0,
              marginBottom: 16,
            }}
          >
            A flexible model, built around one relationship.
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65 }}>
            Choose the model that fits each project. Either way, we become your standing WPC partner across every job — not a one-time vendor.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="partner-model-grid">
          {models.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "36px",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 26, color: "var(--dark)", marginBottom: 12 }}>
                {m.title}
              </h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 24 }}>
                {m.text}
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {m.checks.map((c) => (
                  <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "var(--accent-light)",
                        border: "1px solid var(--accent-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <Check size={11} style={{ color: "var(--accent)" }} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)" }}>{c}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .partner-model-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
