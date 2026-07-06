"use client";

import { motion } from "framer-motion";
import { trackEvent } from "@/lib/metaEvents";

const comparison = [
  { feature: "Rot & Moisture Resistant", wood: false, wpc: true },
  { feature: "Requires Painting / Sealing", wood: true, wpc: false },
  { feature: "Splinter Free", wood: false, wpc: true },
  { feature: "UV & Fade Resistant", wood: false, wpc: true },
  { feature: "Eco-Friendly & Recyclable", wood: false, wpc: true },
  { feature: "25+ Year Lifespan", wood: false, wpc: true },
  { feature: "Handles Florida Humidity", wood: false, wpc: true },
];

export default function WhyWPC() {
  return (
    <section
      id="why-wpc"
      className="section-mobile"
      style={{ background: "var(--background)", padding: "100px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: 80,
            alignItems: "start",
          }}
          className="whywpc-grid"
        >
          {/* Left — header + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="whywpc-left"
            style={{ position: "sticky", top: 100 }}
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
              Why WPC
            </span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "var(--dark)",
                lineHeight: 1.0,
                marginBottom: 24,
              }}
            >
              Built for Florida.<br />Built to last.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Wood Plastic Composite (WPC) looks exactly like real wood — but it never warps, rots, fades, or needs a single coat of paint.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              Engineered for South Florida&apos;s heat, humidity, hurricane wind, and salt air — where traditional wood fails in years, WPC lasts for decades.
            </p>

            <div
              style={{
                padding: "28px",
                background: "var(--dark)",
                borderRadius: 10,
                border: "1px solid var(--border)",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--accent)",
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                &ldquo;The material that pays for itself over time.&rdquo;
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  color: "var(--accent)",
                }}
              >
                No painting. No sealing. No repairs.
              </p>
            </div>

            <a
              href="tel:+13059679202"
              onClick={() => trackEvent("Contact", { method: "phone" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--dark)",
                textDecoration: "none",
                background: "var(--accent)",
                border: "1px solid var(--accent)",
                borderRadius: 8,
                padding: "14px 24px",
                transition: "border-color 0.2s, background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--dark)";
                e.currentTarget.style.borderColor = "var(--dark)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--dark)";
              }}
            >
              📞 Discuss your project: (305) 967-9202
            </a>
          </motion.div>

          {/* Right — comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 0,
                marginBottom: 8,
              }}
            >
              <div style={{ padding: "12px 16px" }} />
              {["Traditional Wood", "WPC Composite"].map((h, i) => (
                <div
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "center",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: i === 1 ? "var(--accent)" : "var(--text-secondary)",
                    background: i === 1 ? "var(--accent-light)" : "transparent",
                    borderRadius: i === 1 ? "8px 8px 0 0" : 0,
                    border: i === 1 ? "1px solid var(--accent-border)" : "none",
                    borderBottom: "none",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Table rows */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {comparison.map((row, i) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    borderBottom: i < comparison.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 16px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      background: i % 2 === 0 ? "var(--background)" : "var(--surface)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {row.feature}
                  </div>
                  {/* Wood cell */}
                  <div
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontSize: 18,
                      background: i % 2 === 0 ? "var(--background)" : "var(--surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderLeft: "1px solid var(--border)",
                    }}
                  >
                    {/* For "requires painting", wood = bad (true means it DOES require it) */}
                    {row.feature === "Requires Painting / Sealing" ? (
                      <span style={{ color: "#C0392B", fontWeight: 700 }}>✓</span>
                    ) : row.wood ? (
                      <span style={{ color: "#4A7C59", fontWeight: 700 }}>✓</span>
                    ) : (
                      <span style={{ color: "#C0392B", opacity: 0.6 }}>✗</span>
                    )}
                  </div>
                  {/* WPC cell */}
                  <div
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontSize: 18,
                      background: "var(--accent-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderLeft: "2px solid var(--accent)",
                    }}
                  >
                    {row.feature === "Requires Painting / Sealing" ? (
                      <span style={{ color: "#C0392B", opacity: 0.6 }}>✗</span>
                    ) : row.wpc ? (
                      <span style={{ color: "var(--accent)", fontWeight: 700 }}>✓</span>
                    ) : (
                      <span style={{ color: "#C0392B", opacity: 0.6 }}>✗</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WPC wins summary */}
            <div
              style={{
                marginTop: 20,
                padding: "20px 24px",
                background: "var(--dark)",
                border: "1px solid var(--accent-border)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 14,
                  color: "var(--white)",
                  fontWeight: 500,
                }}
              >
                WPC outperforms wood on every metric that matters in Florida.
              </span>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--accent)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                See Products →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .whywpc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
