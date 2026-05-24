"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const stats = [
  { val: "25+", label: "Year lifespan" },
  { val: "0", label: "Maintenance" },
  { val: "100%", label: "Recyclable" },
  { val: "#1", label: "WPC worldwide" },
];

const checks = [
  "World's largest WPC manufacturer",
  "Eco-friendly, fully recyclable materials",
  "Built for Florida's climate",
  "Now expanding to Palm Beach County, FL",
];

export default function About() {
  return (
    <section
      id="about"
      className="section-mobile"
      style={{ background: "var(--surface)", padding: "100px 32px", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left — images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="about-img-wrap"
            style={{ position: "relative", height: 520 }}
          >
            {/* Main image */}
            <div
              style={{
                position: "absolute",
                top: 0, left: 0,
                right: 60,
                bottom: 60,
                borderRadius: 12,
                overflow: "hidden",
                background: "linear-gradient(135deg, #C8C2B0 0%, #B4AE9A 100%)",
              }}
            >
              <Image
                src="/images/decking-pergola-aerial.png"
                alt="WPC pergola and decking aerial view Miami"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
            {/* Inset image */}
            <div
              style={{
                position: "absolute",
                bottom: 0, right: 0,
                width: "52%",
                height: "40%",
                borderRadius: 12,
                overflow: "hidden",
                background: "linear-gradient(135deg, #BEB8A8 0%, #A8A290 100%)",
                border: "4px solid var(--surface)",
                boxShadow: "0 20px 60px rgba(26,25,24,0.15)",
              }}
            >
              <Image
                src="/images/fence-charcoal-white-frame.jpg"
                alt="Charcoal WPC fence white frame Miami"
                fill
                sizes="30vw"
                style={{ objectFit: "cover" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="about-stat-badge"
              style={{
                position: "absolute",
                top: "40%",
                right: 0,
                transform: "translateY(-50%) translateX(20px)",
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "14px 20px",
                boxShadow: "0 8px 32px rgba(26,25,24,0.1)",
                minWidth: 140,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                25+
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12,
                  color: "var(--text-secondary)",
                }}
              >
                Years average lifespan
              </p>
            </motion.div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
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
              About Us
            </span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "var(--dark)",
                lineHeight: 1.05,
                marginBottom: 24,
              }}
            >
              Miami craftsmanship.<br />World-class materials.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: 16,
              }}
            >
              Express Fence Solutions represents the world&apos;s largest WPC manufacturer, bringing the highest quality composite products directly to South Florida homeowners.
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              Every project is treated like it belongs on the cover of a magazine — because in Miami, it just might.
            </p>

            <ul style={{ listStyle: "none", padding: 0, marginBottom: 40 }}>
              {checks.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
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
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
                padding: "24px 0",
                borderTop: "1px solid var(--border)",
              }}
            >
              {stats.map((s) => (
                <div key={s.val}>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: 34,
                      fontWeight: 400,
                      color: "var(--accent)",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 11,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
