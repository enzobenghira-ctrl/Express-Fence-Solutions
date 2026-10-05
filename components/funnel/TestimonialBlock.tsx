import { CONTRACTOR_TESTIMONIALS, HOMEOWNER_TESTIMONIALS } from "@/lib/testimonials";
import type { Funnel } from "@/lib/site-config";

interface Props {
  audience: Funnel;
  eyebrow?: string;
  title?: string;
  /** Cap for landing pages that show a single testimonial. */
  limit?: number;
}

/** Real testimonials only. Renders nothing at all until lib/testimonials.ts has entries. */
export default function TestimonialBlock({ audience, eyebrow, title, limit }: Props) {
  const all = audience === "trade" ? CONTRACTOR_TESTIMONIALS : HOMEOWNER_TESTIMONIALS;
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
          {items.map((t) => (
            <figure
              key={`${t.name}-${t.quote.slice(0, 24)}`}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 21,
                  lineHeight: 1.45,
                  color: "var(--dark)",
                  flex: 1,
                }}
              >
                “{t.quote}”
              </blockquote>
              <figcaption style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--dark)", fontWeight: 700 }}>{t.name}</strong>
                {t.detail && <> · {t.detail}</>}
                <span style={{ display: "block", fontSize: 12, marginTop: 4 }}>{t.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
