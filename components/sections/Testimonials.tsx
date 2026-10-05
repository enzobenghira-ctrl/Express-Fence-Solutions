"use client";

import { motion } from "framer-motion";
import ReviewCard from "@/components/funnel/ReviewCard";
import { CONTRACTOR_REVIEWS, HOMEOWNER_REVIEWS } from "@/lib/testimonials";
import { SITE } from "@/lib/site-config";

interface Props {
  /** "all" on shared pages (homepage); "home" on homeowner-only pages. */
  audience?: "home" | "all";
}

/** Real Google reviews only (lib/testimonials.ts). The whole section is hidden until there are some. */
export default function Testimonials({ audience = "home" }: Props) {
  const reviews = audience === "all" ? [...HOMEOWNER_REVIEWS, ...CONTRACTOR_REVIEWS] : HOMEOWNER_REVIEWS;
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
              color: "var(--accent-text)",
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
        <div className="efs-testimonial-grid" style={{ marginBottom: 48 }}>
          {reviews.map((r, i) => (
            <motion.div
              key={`${r.name}-${r.text.slice(0, 24)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            >
              <ReviewCard review={r} />
            </motion.div>
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
            href={SITE.googleReviewUrl}
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
