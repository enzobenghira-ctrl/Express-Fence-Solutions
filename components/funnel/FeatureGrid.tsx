interface Props {
  eyebrow?: string;
  title: string;
  items: { title: string; text: string }[];
  background?: "background" | "surface";
}

/** Simple card grid — "Why WPC for Florida", "What a package can include", etc. */
export default function FeatureGrid({ eyebrow, title, items, background = "surface" }: Props) {
  return (
    <section className="efs-section" style={{ background: `var(--${background})` }}>
      <div className="efs-container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          {eyebrow && <span className="efs-eyebrow">{eyebrow}</span>}
          <h2 className="efs-h2">{title}</h2>
        </div>
        <div className="efs-split-grid">
          {items.map((i) => (
            <div
              key={i.title}
              style={{
                background: background === "surface" ? "var(--white)" : "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "28px 26px",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-dm-sans)", fontSize: 18, fontWeight: 700, color: "var(--dark)", marginBottom: 8 }}>{i.title}</h3>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)" }}>{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
