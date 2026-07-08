"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "No Rot. No Termites.",
    desc: "Unlike wood, WPC composite never rots, splinters, or feeds termites — the two things that kill wood fences in South Florida.",
  },
  {
    title: "Zero Maintenance, Ever",
    desc: "No painting, no sealing, no staining. Your fence looks the same in year ten as it did on installation day.",
  },
  {
    title: "Made for the Climate",
    desc: "Engineered for Miami's heat, humidity, salt air, and storm season — where wood warps and PVC turns brittle.",
  },
  {
    title: "Modern Architectural Look",
    desc: "Clean horizontal lines and rich wood-grain texture that elevates the property instead of just enclosing it.",
  },
];

export default function FenceMiamiWhyWPC() {
  return (
    <section
      className="section-mobile"
      style={{ background: "var(--background)", padding: "90px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 52 }}
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
            The Material Matters
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(30px, 4vw, 48px)",
              color: "var(--dark)",
              lineHeight: 1.05,
            }}
          >
            Why WPC Composite Beats Wood &amp; PVC in Miami&apos;s Climate
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
          className="fence-miami-why-grid"
        >
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "28px 24px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--accent-light)",
                  border: "1px solid var(--accent-border)",
                  color: "var(--accent)",
                  fontSize: 15,
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                ✓
              </span>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--dark)",
                  marginBottom: 8,
                }}
              >
                {p.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1000px) {
          .fence-miami-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .fence-miami-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
