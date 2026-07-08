"use client";

import { motion } from "framer-motion";
import BookingForm from "@/components/booking/BookingForm";

export default function FenceMiamiBookingSection() {
  return (
    <section id="book-form" className="section-mobile" style={{ background: "var(--background)", padding: "100px 32px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 32 }}
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
            Free &amp; No Obligation
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4.5vw, 52px)",
              color: "var(--dark)",
              lineHeight: 1.0,
              marginBottom: 16,
            }}
          >
            Book Your Free Fence Consultation
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)" }}>
            Takes 60 seconds · We bring real WPC samples &amp; measure on the spot
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <BookingForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign: "center",
            marginTop: 24,
            fontFamily: "var(--font-dm-sans)",
            fontSize: 13,
            color: "var(--text-secondary)",
          }}
        >
          Prefer WhatsApp?{" "}
          <a
            href="https://wa.me/13059679202"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#25D366", fontWeight: 700, textDecoration: "none" }}
          >
            Message us directly →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
