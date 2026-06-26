"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "We bring physical samples", text: "Real WPC fence, decking, and cladding samples — see and touch the actual material, not a photo." },
  { num: "02", title: "We measure your property", text: "Precise on-site measurements of your space so the quote reflects exactly what you need." },
  { num: "03", title: "We design the right solution", text: "We walk your property with you and recommend the products that fit your space and style." },
  { num: "04", title: "You get a transparent quote", text: "A custom, itemized quote on the spot — no surprises, no obligation." },
];

export default function ConsultationProcess() {
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
            What To Expect
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
            Four simple steps to your custom quote.
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="consult-process-grid">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "28px 24px",
                position: "relative",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 40,
                  fontWeight: 400,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {s.num}
              </p>
              <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, fontWeight: 700, color: "var(--dark)", marginBottom: 8 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .consult-process-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
