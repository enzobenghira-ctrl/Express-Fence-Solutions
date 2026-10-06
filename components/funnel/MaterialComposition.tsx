import { TodoNote } from "@/components/funnel/FactText";
import { SHOW_TODOS } from "@/lib/facts";
import type { CompositionPart } from "@/lib/products-data";

const MAX_PARTS = 5;

interface Props {
  productName: string;
  /** null until the supplier's numbers are confirmed: previews show a {{TODO}}, production renders nothing. */
  composition: CompositionPart[] | null;
}

/** Segments past the bar's midpoint open their tooltip leftward, the rest rightward. */
function tipSide(parts: CompositionPart[], index: number): string {
  const start = parts.slice(0, index).reduce((sum, c) => sum + c.pct, 0);
  return start + parts[index].pct / 2 > 50 ? "efs-comp-tip--end" : "efs-comp-tip--start";
}

/** Part-to-whole bar of what a WPC product is made of, with every material and its % listed below it. */
export default function MaterialComposition({ productName, composition }: Props) {
  if (!composition && !SHOW_TODOS) return null;

  if (composition) {
    const total = composition.reduce((sum, c) => sum + c.pct, 0);
    // Fail the build rather than publish a breakdown that doesn't add up.
    if (Math.abs(total - 100) > 0.5) throw new Error(`${productName} composition adds up to ${total}%, not 100%`);
    if (composition.length > MAX_PARTS) throw new Error(`${productName} composition has more than ${MAX_PARTS} parts; fold the smallest into "Other"`);
  }

  return (
    <div className="efs-comp">
      <span className="efs-eyebrow">Material composition</span>
      <h2 className="efs-h2" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 12 }}>
        What&apos;s in {productName}
      </h2>
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: 28, maxWidth: 640 }}>
        Wood plastic composite (WPC) bonds wood fiber with a thermoplastic polymer under heat and pressure, so it looks like wood
        but holds up like a synthetic.
      </p>

      {composition ? (
        <>
          <div className="efs-comp-bar" aria-hidden>
            {composition.map((c, i) => (
              <span key={c.label} className="efs-comp-seg" style={{ flexGrow: c.pct, background: `var(--series-${i + 1})` }}>
                <span className={`efs-comp-tip ${tipSide(composition, i)}`}>
                  {c.label}: {c.pct}%
                </span>
              </span>
            ))}
          </div>
          <ul className="efs-comp-legend" aria-label={`${productName} material composition`}>
            {composition.map((c, i) => (
              <li key={c.label}>
                <span className="efs-comp-swatch" style={{ background: `var(--series-${i + 1})` }} aria-hidden />
                <span>{c.label}</span>
                <span className="efs-comp-pct">{c.pct}%</span>
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)", marginTop: 16 }}>
            From the manufacturer&apos;s specification sheet.
          </p>
        </>
      ) : (
        <>
          <div className="efs-comp-bar efs-comp-bar--empty" aria-hidden />
          <p style={{ marginTop: 16 }}>
            <TodoNote>{`${productName} material breakdown in % (e.g. wood fiber, HDPE, UV stabilizers, anti-fungal additives) from the supplier spec sheet`}</TodoNote>
          </p>
        </>
      )}
    </div>
  );
}
