export interface ProcessStep {
  title: string;
  text?: string;
}

interface Props {
  id?: string;
  eyebrow?: string;
  title?: string;
  steps: ProcessStep[];
  background?: "background" | "surface";
}

/** Numbered "how it works" row, e.g. Apply → Samples → Trial order → Monthly allocation. */
export default function ProcessSteps({ id, eyebrow, title, steps, background = "surface" }: Props) {
  return (
    <section id={id} className="efs-section" style={{ background: `var(--${background})` }}>
      <div className="efs-container">
        {(eyebrow || title) && (
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            {eyebrow && <span className="efs-eyebrow">{eyebrow}</span>}
            {title && <h2 className="efs-h2">{title}</h2>}
          </div>
        )}

        <ol className="efs-steps-grid" style={{ listStyle: "none" }}>
          {steps.map((s, i) => (
            <li key={s.title} style={{ borderTop: "2px solid var(--accent)", paddingTop: 22 }}>
              <span
                aria-hidden
                style={{
                  display: "block",
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 40,
                  lineHeight: 1,
                  color: "var(--accent-text)",
                  marginBottom: 12,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--dark)",
                  marginBottom: s.text ? 8 : 0,
                }}
              >
                {s.title}
              </h3>
              {s.text && (
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)" }}>
                  {s.text}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
