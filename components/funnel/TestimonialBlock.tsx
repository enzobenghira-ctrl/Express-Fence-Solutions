import ReviewCard from "@/components/funnel/ReviewCard";
import { CONTRACTOR_REVIEWS, HOMEOWNER_REVIEWS } from "@/lib/testimonials";
import type { Funnel } from "@/lib/site-config";

interface Props {
  audience: Funnel;
  eyebrow?: string;
  title?: string;
  /** Cap for landing pages that show a single review. */
  limit?: number;
}

/** Real Google reviews only. Renders nothing at all until lib/testimonials.ts has entries. */
export default function TestimonialBlock({ audience, eyebrow, title, limit }: Props) {
  const all = audience === "trade" ? CONTRACTOR_REVIEWS : HOMEOWNER_REVIEWS;
  const items = limit ? all.slice(0, limit) : all;
  if (items.length === 0) return null;

  return (
    <section className="efs-section" style={{ background: "var(--background)" }}>
      <div className="efs-container">
        {(eyebrow || title) && (
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            {eyebrow && <span className="efs-eyebrow">{eyebrow}</span>}
            {title && <h2 className="efs-h2">{title}</h2>}
          </div>
        )}

        <div className="efs-testimonial-grid">
          {items.map((r) => (
            <ReviewCard key={`${r.name}-${r.text.slice(0, 24)}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
