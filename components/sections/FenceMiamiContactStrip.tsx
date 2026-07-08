"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/metaEvents";

export default function FenceMiamiContactStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: "var(--dark)",
        padding: "20px 32px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
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
            fontSize: 13,
            color: "rgba(250,250,247,0.55)",
          }}
        >
          Questions about your project? Talk to us directly.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <a
            href="tel:+13059679202"
            onClick={() => trackEvent("Contact", { method: "phone" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-dm-sans)",
              fontSize: 14,
              fontWeight: 700,
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            <Phone size={14} strokeWidth={2.5} />
            (305) 967-9202
          </a>
          <a
            href="https://wa.me/13059679202"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-dm-sans)",
              fontSize: 14,
              fontWeight: 700,
              color: "#25D366",
              textDecoration: "none",
            }}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </motion.div>
  );
}
