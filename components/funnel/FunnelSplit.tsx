import FunnelButton, { type FunnelCTA } from "@/components/funnel/FunnelButton";

export interface FunnelPath {
  audience: string;
  title: string;
  text: string;
  cta: FunnelCTA;
  /** The path the page most wants — rendered dark so it reads as the primary choice. */
  featured?: boolean;
}

interface Props {
  id?: string;
  eyebrow?: string;
  title?: string;
  paths: FunnelPath[];
}

/** "Choose your path" — routes a shared-page visitor into the right funnel. */
export default function FunnelSplit({ id, eyebrow, title, paths }: Props) {
  return (
    <section id={id} className="efs-section" style={{ background: "var(--background)" }}>
      <div className="efs-container">
        {(eyebrow || title) && (
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            {eyebrow && <span className="efs-eyebrow">{eyebrow}</span>}
            {title && <h2 className="efs-h2">{title}</h2>}
          </div>
        )}

        <div className="efs-split-grid">
          {paths.map((p) => (
            <div
              key={p.audience}
              style={{
                display: "flex",
                flexDirection: "column",
                background: p.featured ? "var(--dark)" : "var(--surface)",
                border: p.featured ? "1px solid var(--dark)" : "1px solid var(--border)",
                borderRadius: 14,
                padding: "36px 32px",
              }}
            >
              <span className={p.featured ? "efs-eyebrow efs-eyebrow--on-dark" : "efs-eyebrow"}>{p.audience}</span>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 30,
                  lineHeight: 1.1,
                  color: p.featured ? "var(--white)" : "var(--dark)",
                  marginBottom: 14,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: p.featured ? "rgba(250,250,247,0.8)" : "var(--text-secondary)",
                  marginBottom: 28,
                  flex: 1,
                }}
              >
                {p.text}
              </p>
              <FunnelButton href={p.cta.href} funnel={p.cta.funnel} variant={p.featured ? "light" : "primary"} block>
                {p.cta.label}
              </FunnelButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
