"use client";

import { motion } from "framer-motion";
import BookingForm from "@/components/booking/BookingForm";

export default function ConsultationBookingSection() {
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
            Book Your Visit
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
            Book your free consultation.
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)" }}>
            Takes 60 seconds · No obligation · You&apos;ll receive text confirmation
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
      </div>
    </section>
  );
}
