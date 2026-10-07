import { MATERIAL_ROLES, WPC_QUALITY_POINTS, type Composition } from "@/lib/composition-data";

interface Props {
  productName: string;
  composition: Composition;
}

/**
 * Sits under the composition chart on WPC product pages: what each material does (same
 * order and colors as the chart), then what separates quality WPC from cheap WPC.
 */
export default function WpcMaterialGuide({ productName, composition }: Props) {
  const roles = composition.parts.map((p, i) => ({ ...p, slot: i + 1, role: MATERIAL_ROLES[p.label] })).filter((p) => p.role);

  return (
    <div className="efs-comp efs-guide">
      <span className="efs-eyebrow">Why it matters</span>
      <h2 className="efs-h2" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", marginBottom: 12 }}>
        What each material does
      </h2>
      {composition.focus && <p className="efs-guide-lead">{composition.focus}</p>}

      <ul className="efs-guide-list" aria-label={`What each material in ${productName} does`}>
        {roles.map((p) => (
          <li key={p.label}>
            <span className="efs-comp-swatch" style={{ background: `var(--series-${p.slot})`, marginTop: 6 }} aria-hidden />
            <div>
              <p className="efs-guide-name">{p.label}</p>
              <p className="efs-guide-text">{p.role}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="efs-guide-subhead">What makes WPC a quality material</h3>
      <ul className="efs-guide-points">
        {WPC_QUALITY_POINTS.map((q) => (
          <li key={q.title}>
            <p className="efs-guide-name">{q.title}</p>
            <p className="efs-guide-text">{q.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
