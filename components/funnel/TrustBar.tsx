import FactText from "@/components/funnel/FactText";
import type { Fact } from "@/lib/facts";

/** Thin strip of proof points under a hero. Unconfirmed items render as {{TODO}}. */
export default function TrustBar({ items }: { items: Fact[] }) {
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
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
            <FactText value={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
