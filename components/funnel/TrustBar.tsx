import FactText from "@/components/funnel/FactText";
import { visibleFacts, type Fact } from "@/lib/facts";

/** Thin strip of proof points under a hero. Unconfirmed items show as {{TODO}} on previews and are dropped in production. */
export default function TrustBar({ items }: { items: Fact[] }) {
  const shown = visibleFacts(items);
  if (shown.length === 0) return null;

  return (
    <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
      <ul
        className="efs-container"
        style={{
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px 32px",
          padding: "18px clamp(16px, 4vw, 32px)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--dark)",
        }}
      >
        {shown.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
            <FactText value={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
