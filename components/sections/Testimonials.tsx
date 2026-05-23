"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "We replaced our old wood fence and the difference is incredible. Three years in and it still looks brand new — no painting, no repairs, nothing. Worth every penny.",
    name: "Carlos M.",
    detail: "WPC Fencing, Miami",
    initial: "C",
  },
  {
    quote: "The pergola over our dock completely transformed how we use our backyard. Held up through two hurricane seasons without a scratch. Professional start to finish.",
    name: "Jennifer R.",
    detail: "WPC Pergola, South Florida",
    initial: "J",
  },
  {
    quote: "I was blown away by the quality. Our neighbors keep asking who did it. The charcoal fence matches our home perfectly and requires absolutely nothing from us.",
    name: "Roberto A.",
    detail: "WPC Fencing & Gate, Miami Beach",
    initial: "R",
  },
];

export default function Testimonials() {
  return (
    <section
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
            Client Reviews
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginBottom: 48,
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
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
                gap: 0,
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: "var(--accent)", fontSize: 14 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: "var(--dark)",
                  lineHeight: 1.65,
                  flex: 1,
                  marginBottom: 28,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 600, color: "var(--dark)" }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--text-secondary)" }}>
                    {t.detail}
                  </p>
                </div>
              </div>
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
              Leave us a Google review — it takes 30 seconds and helps Miami homeowners find us.
            </p>
          </div>
          <a
            href="https://g.page/r/YOUR-GOOGLE-REVIEW-LINK/review"
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

      <style jsx>{`
        .testimonials-grid { grid-template-columns: 1fr !important; }
        @media (min-width: 768px) { .testimonials-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}
