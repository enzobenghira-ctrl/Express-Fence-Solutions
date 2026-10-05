"use client";

import { motion } from "framer-motion";
import { CONTRACTOR_REVIEWS, HOMEOWNER_REVIEWS } from "@/lib/testimonials";
import { GOOGLE_BUSINESS_PROFILE } from "@/lib/business-info";

/** Real Google reviews only (lib/testimonials.ts). The whole section is hidden until there are some. */
export default function Testimonials() {
  const reviews = [...HOMEOWNER_REVIEWS, ...CONTRACTOR_REVIEWS];
  if (reviews.length === 0) return null;

  return (
    <section
      className="section-mobile"
      style={{ background: "var(--background)", padding: "100px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center"
          style={{ marginBottom: 60, textAlign: "center" }}
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
            Google Reviews
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "var(--dark)",
            }}
          >
            What our clients say.
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {reviews.map((r, i) => (
            <motion.figure
              key={`${r.name}-${r.text.slice(0, 24)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Stars */}
              <div role="img" aria-label={`${r.rating} out of 5 stars`} style={{ display: "flex", gap: 3 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} aria-hidden style={{ color: n <= r.rating ? "var(--accent)" : "var(--border-strong)", fontSize: 14 }}>
                    ★
                  </span>
                ))}
              </div>

              {/* Review text — verbatim */}
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: "var(--dark)",
                  lineHeight: 1.65,
                  whiteSpace: "pre-line",
                  flex: 1,
                }}
              >
                {r.text}
              </blockquote>

              {/* Reviewer + source */}
              <figcaption
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--dark)" }}>{r.name}</span>
                <a
                  href={GOOGLE_BUSINESS_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", textDecoration: "none" }}
                >
                  Google review ↗
                </a>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Google review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            padding: "28px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            maxWidth: 560,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--dark)", fontWeight: 500, marginBottom: 4 }}>
              Happy with your installation?
            </p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)" }}>
              Leave us a Google review — it takes 30 seconds and helps homeowners find us.
            </p>
          </div>
          <a
            href={`${GOOGLE_BUSINESS_PROFILE}/review`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "var(--dark)",
              color: "var(--white)",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 6,
              padding: "10px 20px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--dark)")}
          >
            ⭐ Leave a Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}
