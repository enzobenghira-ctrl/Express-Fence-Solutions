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
  /** One line on which materials matter most for this product, shown above "What each material does". */
  focus?: string;
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
  "wpc-fencing": {
    verified: false,
    parts: parts(60, 30, 4, 3, 3),
    focus: "A fence stands in full sun and rain all year, so UV protection and moisture resistance do the most work.",
  },
  "wpc-decking": {
    verified: false,
    parts: parts(55, 35, 4, 3, 3),
    focus: "A deck takes foot traffic, pool water and direct sun, so moisture resistance and a well-bonded board matter most.",
  },
  "wpc-cladding": {
    verified: false,
    parts: parts(60, 35, 2, 2, 1),
    focus: "Cladding is all about looks that last, so color that holds and an even finish matter most.",
  },
  "wpc-pergolas": {
    verified: false,
    parts: parts(55, 35, 4, 3, 3),
    scope: "Covers the WPC boards and profiles only, not the aluminum frames or cores.",
    focus: "Pergola boards sit overhead in full sun, so stiffness and UV protection matter most.",
  },
  gates: {
    verified: false,
    parts: parts(60, 30, 4, 3, 3),
    scope: "Covers the WPC boards and profiles only, not the aluminum frame.",
    focus: "A gate is opened and closed every day, so stiffness and a strong bond between fiber and plastic matter most.",
  },
  benches: {
    verified: false,
    parts: parts(60, 30, 4, 3, 3),
    focus: "A bench is sat on in sun and rain, so a smooth, moisture-resistant surface matters most.",
  },
};

// "Why it matters" section on WPC product pages. General facts about WPC as a material —
// nothing here is a claim about a specific supplier's boards (those wait for the spec sheet).

/** What each material in the chart does. Keyed by the same labels as the chart. */
export const MATERIAL_ROLES: Record<string, string> = {
  [WOOD]: "Gives WPC the look, feel and stiffness of real wood. It's usually fine wood flour, mixed evenly through the board.",
  [HDPE]: "The plastic that holds everything together. HDPE doesn't absorb water or rot, and it seals the wood fiber so the board takes on far less moisture than bare wood.",
  [UV]: "Slow down fading and surface wear from strong sun — important in South Florida, where boards see UV all year.",
  [AGENTS]: "Coupling agents bond the wood fiber and plastic into one solid material, for strength and lower water uptake. Anti-fungal agents help the board resist mold and mildew in humid weather.",
  [PIGMENTS]: "Give the boards their color. They're mixed into the material during manufacturing, so there's no paint or stain to peel.",
};

/** What separates quality WPC from cheap WPC. */
export const WPC_QUALITY_POINTS: { title: string; text: string }[] = [
  {
    title: "The right wood-to-plastic balance",
    text: "Enough plastic to fully seal every wood fiber. Too much wood and boards soak up water and swell; too much plastic and they lose the wood look and move more with heat.",
  },
  {
    title: "Fiber and plastic properly bonded",
    text: "Coupling agents turn wood and plastic into one material instead of wood particles sitting loose in plastic. That's what keeps a board strong and stops water working its way in.",
  },
  {
    title: "Protection built in, not painted on",
    text: "UV stabilizers, anti-fungal agents and color go into the material itself during manufacturing — so there's nothing to sand, seal or repaint.",
  },
  {
    title: "Dense, consistent boards",
    text: "Quality boards are even in color and density all the way through, without voids or patchy spots that let moisture in.",
  },
];

export function getComposition(slug: string): Composition | null {
  return COMPOSITION[slug] ?? null;
}
