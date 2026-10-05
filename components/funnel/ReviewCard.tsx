import { Star } from "lucide-react";
import { SITE } from "@/lib/site-config";
import type { GoogleReview } from "@/lib/testimonials";

/** One Google review: stars, verbatim text, reviewer name, and a link back to the Business Profile. */
export default function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure
      style={{
        height: "100%",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div role="img" aria-label={`${review.rating} out of 5 stars`} style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={16}
            aria-hidden
            strokeWidth={1.5}
            style={{ color: "var(--accent)", fill: n <= review.rating ? "var(--accent)" : "transparent" }}
          />
        ))}
      </div>

      <blockquote
        style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontSize: 19,
          lineHeight: 1.55,
          color: "var(--dark)",
          whiteSpace: "pre-line",
          flex: 1,
        }}
      >
        {review.text}
      </blockquote>

      <figcaption
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
        }}
      >
        <strong style={{ color: "var(--dark)", fontWeight: 700 }}>{review.name}</strong>
        <a
          href={SITE.googleBusinessProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="efs-link"
          style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}
        >
          Google review ↗
        </a>
      </figcaption>
    </figure>
  );
}
