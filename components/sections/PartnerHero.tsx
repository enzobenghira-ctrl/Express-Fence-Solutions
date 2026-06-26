"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const trustItems = ["World's #1 WPC Manufacturer", "25+ Year Lifespan", "Serving Miami & Palm Beach County"];

export default function PartnerHero() {
  return (
    <section
      style={{
        background: "var(--dark)",
        padding: "140px 32px 80px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ maxWidth: 760, margin: "0 auto" }}
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
            marginBottom: 20,
          }}
        >
          Trade &amp; Partnership Program
        </span>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(40px, 6vw, 68px)",
            color: "var(--white)",
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          Build with materials that protect your margins and your reputation.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 16,
            color: "rgba(250,250,247,0.65)",
            lineHeight: 1.7,
            maxWidth: 600,
            margin: "0 auto 36px",
          }}
        >
          A standing supply &amp; install partnership across WPC, aluminum, and pool products for general contractors, developers, and builders — reliable lead times, trade pricing, and zero callbacks. Also available for architects, designers, and property managers.
        </p>
        <motion.a
          href="#partner-contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#partner-contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(184,150,90,0.28)" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--accent)",
            color: "var(--white)",
            fontFamily: "var(--font-dm-sans)",
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 8,
            padding: "16px 32px",
            textDecoration: "none",
            marginBottom: 44,
          }}
        >
          Become a Partner
          <ArrowRight size={16} strokeWidth={2} />
        </motion.a>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
          {trustItems.map((item) => (
            <span
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                color: "rgba(250,250,247,0.6)",
                fontWeight: 500,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
