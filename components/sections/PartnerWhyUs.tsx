"use client";

import { motion } from "framer-motion";

const points = [
  { title: "Reliable supply & lead times", text: "We work directly with the world's largest WPC manufacturer — supply confidence your timelines can depend on, project after project." },
  { title: "Trade & volume pricing", text: "Preferential pricing for partners based on volume. Talk to us about what your project pipeline looks like." },
  { title: "Quality that protects your reputation", text: "No warping, no fading, no callbacks. Fewer warranty headaches means a cleaner reputation on every job." },
  { title: "Consistency across every project", text: "Same materials, same finishes, job after job — no surprises when a client compares phase one to phase three." },
  { title: "Spec & sample support", text: "We provide samples, specs, and the full catalog so you can write us into bids with confidence." },
];

export default function PartnerWhyUs() {
  return (
    <section className="section-mobile" style={{ background: "var(--surface)", padding: "100px 32px" }}>
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
            Why Partner With Us
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
            What a standing partnership gets you.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="partner-why-grid">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "32px 28px",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 22, color: "var(--dark)", marginBottom: 10 }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .partner-why-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .partner-why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
