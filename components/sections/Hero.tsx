"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const CATALOG = "https://drive.google.com/file/d/1ppHVFNHBI4mRzAuBZgrRHWTiE0YpF2d6/view?usp=sharing";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/fence-grey-decorative-top.png"
          alt="WPC fence decorative outdoor living Miami Florida"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 50%" }}
          className="hero-img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Subtle dark gradient on the left so text stays legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.25) 55%, rgba(10,10,10,0.0) 100%)",
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
          padding: "120px 32px 80px",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 620 }}>
          {/* Label */}
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
                marginBottom: 28,
              }}
            >
              Miami &amp; Palm Beach County, FL
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 0.95,
              color: "#ffffff",
              marginBottom: 24,
              letterSpacing: "-0.01em",
            }}
          >
            Make your<br />dream home<br />a reality.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 17,
              color: "rgba(255,255,255,0.80)",
              lineHeight: 1.65,
              maxWidth: 440,
              marginBottom: 40,
            }}
          >
            Premium WPC fencing, pergolas, decking and cladding — built for Florida&apos;s climate, zero maintenance required.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: "easeOut" }}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}
          >
            {/* Primary — call */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(184,150,90,0.28)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--dark)",
                color: "var(--white)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 8,
                padding: "16px 32px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--dark)")}
            >
              Get a Free Quote
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.12)",
                color: "#ffffff",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                fontWeight: 600,
                borderRadius: 8,
                padding: "16px 32px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.40)",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              View Products
              <ArrowRight size={16} strokeWidth={2} />
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 24 }}
          >
            {[
              "World&apos;s #1 WPC Manufacturer",
              "Zero Maintenance",
              "Miami &amp; Palm Beach County",
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.70)",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                  }}
                />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .hero-content { padding: 120px 32px 80px; }
        @media (max-width: 768px) {
          .hero-content { padding: 100px 20px 60px; }
        }
      `}</style>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
        }}
        onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
