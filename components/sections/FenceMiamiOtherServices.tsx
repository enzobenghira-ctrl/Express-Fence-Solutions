"use client";

import { motion } from "framer-motion";

export default function FenceMiamiOtherServices() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ background: "var(--dark)", padding: "28px 32px" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 14,
            color: "rgba(250,250,247,0.75)",
            lineHeight: 1.6,
          }}
        >
          Beyond fencing — we also design and install aluminum louvered pergolas and custom gates.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <a
            href="/products/pergolas"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--accent)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Pergolas →
          </a>
          <a
            href="/products/gates"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--accent)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Gates →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
