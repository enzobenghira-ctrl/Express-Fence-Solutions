"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/metaEvents";

export default function PhoneStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      style={{
        background: "var(--dark)",
        padding: "16px 32px",
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
          Representing the world&apos;s largest WPC manufacturer · Serving Miami &amp; Palm Beach County, FL
        </p>
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
          (305) 967-9202 — Call Us
        </a>
      </div>
    </motion.div>
  );
}
