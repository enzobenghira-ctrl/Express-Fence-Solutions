"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site-config";

export default function FenceMiamiHero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--dark)",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/fence-waterway-turf.jpg"
          alt="dark grey WPC composite privacy fence installation along a Miami waterfront backyard"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 60%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.15) 100%)",
          }}
        />
      </div>

      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "calc(var(--header-h) + 38px) 32px 64px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#ffffff",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: 100,
                padding: "6px 14px",
                marginBottom: 24,
              }}
            >
              {SITE.serviceAreaShort}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(34px, 5vw, 62px)",
              lineHeight: 1.05,
              color: "#ffffff",
              marginBottom: 20,
              letterSpacing: "-0.01em",
            }}
          >
            Fence Installation in Miami — WPC Composite Fences Built for South Florida
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 16,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.65,
              maxWidth: 480,
              marginBottom: 32,
            }}
          >
            Family-owned fence company serving Miami-Dade, Broward and north to Okeechobee — with a free in-person consultation and exact on-site measurement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <motion.a
              href="#book-form"
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
              }}
            >
              Book a Free Consultation
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
