// Material composition for each WPC product page (the "composition" chart and the spec
// table's Composition row). Keyed by product slug.
//
// verified: false = approximate values from typical WPC formulations, shown as
// "Typical composition..." / "Approx." with a note saying so. Set verified: true only once
// the numbers come from the supplier's spec sheet; the qualifiers then disappear.
//
// Each product lists the same materials in the same order, so each keeps its chart color.
// Up to 5 parts, adding up to 100 (the build fails otherwise).

export interface CompositionPart {
  label: string;
  pct: number;
}

export interface Composition {
  verified: boolean;
  parts: CompositionPart[];
  /** What the numbers cover, when the product isn't all WPC (e.g. aluminum frames). */
  scope?: string;
}

const WOOD = "Wood fiber";
const HDPE = "HDPE (high-density polyethylene)";
const UV = "UV stabilizers";
const AGENTS = "Coupling & anti-fungal agents";
const PIGMENTS = "Color pigments";

function parts(wood: number, hdpe: number, uv: number, agents: number, pigments: number): CompositionPart[] {
  return [
    { label: WOOD, pct: wood },
    { label: HDPE, pct: hdpe },
    { label: UV, pct: uv },
    { label: AGENTS, pct: agents },
    { label: PIGMENTS, pct: pigments },
  ];
}

export const COMPOSITION: Record<string, Composition> = {
  "wpc-fencing": { verified: false, parts: parts(60, 30, 4, 3, 3) },
  "wpc-decking": { verified: false, parts: parts(55, 35, 4, 3, 3) },
  "wpc-cladding": { verified: false, parts: parts(60, 35, 2, 2, 1) },
  "wpc-pergolas": {
    verified: false,
    parts: parts(55, 35, 4, 3, 3),
    scope: "Covers the WPC boards and profiles only, not the aluminum frames or cores.",
  },
  gates: {
    verified: false,
    parts: parts(60, 30, 4, 3, 3),
    scope: "Covers the WPC boards and profiles only, not the aluminum frame.",
  },
  benches: { verified: false, parts: parts(60, 30, 4, 3, 3) },
};

export function getComposition(slug: string): Composition | null {
  return COMPOSITION[slug] ?? null;
}
