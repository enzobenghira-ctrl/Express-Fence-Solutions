// WPC product lines: homepage cards (/#products) and /products/[slug] detail pages.
// Copy states only what's confirmed; every technical spec is a todo(...) until the
// supplier spec sheet arrives. Aluminum has its own page at /products/aluminum.

import { todo, type Fact } from "@/lib/facts";
import type { SpecRow } from "@/components/funnel/SpecTable";

export interface ProductData {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  /** Card image + alt for the homepage grid. */
  image: string;
  alt: string;
  bg: string;
  desc: string;
  heroImage: string;
  overview: string[];
  benefits: { title: string; text: string }[];
  gallery: { src: string; alt: string }[];
  /** Install guide PDF in public/downloads/, or null until it's uploaded. */
  installGuide: string | null;
  /** Shown in the main nav and homepage grid. Benches stay reachable but off the nav. */
  inMainNav: boolean;
}

const NO_UPKEEP = { title: "No painting or sealing", text: "Never needs painting, sealing or staining — an occasional rinse keeps it clean." };
const NO_ROT = { title: "Won't rot or splinter", text: "Stands up to Florida's humidity and rain without the rot and splinters of wood." };
const FLORIDA = { title: "Made for Florida", text: "A good fit for sun, humidity and coastal salt air." };

/** Rows every WPC spec table shows (blueprint). Filled in from the supplier spec sheet. */
export function specRows(product: string): SpecRow[] {
  const t = (what: string): Fact => todo(`${product} ${what}`);
  return [
    { label: "Profile dimensions", value: t("profile dimensions") },
    { label: "Lengths", value: t("lengths") },
    { label: "Colors", value: t("colors") },
    { label: "Composition", value: todo("composition from the supplier spec sheet") },
    { label: "Post / support system", value: t("post or support system") },
    { label: "Pallet quantity", value: t("pallet quantity") },
    { label: "Warranty", value: todo("warranty length and terms") },
  ];
}

export const productsData: ProductData[] = [
  {
    slug: "wpc-fencing",
    num: "01",
    name: "WPC Fences",
    tagline: "Privacy & Decorative",
    image: "/images/fence-waterway-turf.jpg",
    alt: "Charcoal WPC privacy fence along a South Florida waterway",
    bg: "linear-gradient(135deg, #D4CFC0 0%, #BDB8A8 100%)",
    desc: "Looks like wood — without the warping, rot or repainting.",
    heroImage: "/images/fence-teak-long-hero.webp",
    overview: [
      "WPC (wood plastic composite) fencing gives you the warm look of a wood fence without the upkeep. There's nothing to sand, stain or repaint.",
      "It's a strong fit for Florida yards, pool areas and waterfront homes, where wood fences weather quickly.",
    ],
    benefits: [NO_UPKEEP, NO_ROT, FLORIDA, { title: "Matching gates", text: "Pair it with a WPC gate in the same finish." }],
    gallery: [
      { src: "/images/fence-black-modern-home.jpg", alt: "Black horizontal WPC fence at a modern home" },
      { src: "/images/fence-grey-decorative-top.webp", alt: "Grey WPC fence with a decorative top panel" },
      { src: "/images/fence-dark-grey-autumn.webp", alt: "Dark grey WPC fence in a garden" },
    ],
    installGuide: null,
    inMainNav: true,
  },
  {
    slug: "wpc-pergolas",
    num: "02",
    name: "WPC Pergolas",
    tagline: "Year-Round Outdoor Living",
    image: "/images/pergola-wpc-tropical.webp",
    alt: "WPC pergola in a tropical garden",
    bg: "linear-gradient(135deg, #C8C2A8 0%, #B8B298 100%)",
    desc: "Shade and structure for your outdoor space — with nothing to seal or paint.",
    heroImage: "/images/pergola-key-west.jpeg",
    overview: [
      "A WPC pergola turns a patio, deck or pool area into a shaded outdoor room.",
      "Like all our WPC products, it keeps its wood look without sealing, staining or repainting.",
    ],
    benefits: [NO_UPKEEP, NO_ROT, FLORIDA, { title: "Sized to your space", text: "Laid out to fit your patio, deck or yard." }],
    gallery: [
      { src: "/images/pergola-wpc-tropical.webp", alt: "WPC pergola in a tropical garden" },
      { src: "/images/decking-pergola-aerial.webp", alt: "Aerial view of a WPC pergola over a deck" },
    ],
    installGuide: null,
    inMainNav: true,
  },
  {
    slug: "wpc-cladding",
    num: "03",
    name: "WPC Cladding",
    tagline: "Premium Wall Finish",
    image: "/images/wall-slat-interior.webp",
    alt: "WPC slat wall cladding",
    bg: "linear-gradient(135deg, #D8D0BC 0%, #C4BAA4 100%)",
    desc: "A wood-slat look for exterior and interior walls — without the upkeep.",
    heroImage: "/images/wall-slat-interior.webp",
    overview: [
      "WPC cladding adds a warm wood-slat finish to facades, garden walls, outdoor kitchens and feature walls inside.",
      "It keeps its look without the regular re-staining real wood needs.",
    ],
    benefits: [NO_UPKEEP, NO_ROT, { title: "Inside and out", text: "Works on exterior walls and interior feature walls." }],
    gallery: [
      { src: "/images/cladding-teak-restaurant.webp", alt: "Teak-look WPC slat cladding in a restaurant" },
      { src: "/images/cladding-teak-living-room.webp", alt: "Teak-look WPC cladding in a living room" },
    ],
    installGuide: null,
    inMainNav: true,
  },
  {
    slug: "wpc-decking",
    num: "04",
    name: "WPC Decking",
    tagline: "Decks & Pool Surrounds",
    image: "/images/decking-grey-closeup.webp",
    alt: "Grey WPC decking with planters",
    bg: "linear-gradient(135deg, #C4C0B0 0%, #B0AC9C 100%)",
    desc: "A wood-look deck that stays good-looking — no sealing, no sanding.",
    heroImage: "/images/decking-dark-grey-hero.webp",
    overview: [
      "WPC decking gives you the look of wood underfoot for decks, pool surrounds and walkways.",
      "There's no annual sealing or sanding, and no splinters for bare feet.",
    ],
    benefits: [NO_UPKEEP, NO_ROT, FLORIDA, { title: "Barefoot friendly", text: "No splinters around the pool or on the deck." }],
    gallery: [
      { src: "/images/decking-grey-closeup.webp", alt: "Grey WPC decking with planters" },
      { src: "/images/decking-dark-grey-pond.webp", alt: "Dark grey WPC decking beside a pond" },
    ],
    installGuide: null,
    inMainNav: true,
  },
  {
    slug: "gates",
    num: "05",
    name: "WPC Gates",
    tagline: "Secure in Style",
    image: "/images/gate-charcoal-single.jpg",
    alt: "Charcoal WPC gate with white aluminum frame",
    bg: "linear-gradient(135deg, #CCB898 0%, #B8A080 100%)",
    desc: "Pedestrian and driveway gates to match your WPC fence.",
    heroImage: "/images/gate-dark-grey-sliding-hero.webp",
    overview: [
      "WPC gates pair a framed structure with WPC boards, so your entry matches your fence.",
      "Pedestrian and driveway gates are made to fit your opening.",
    ],
    benefits: [NO_UPKEEP, { title: "Matches your fence", text: "Same boards and finish as your WPC fence." }, { title: "Made to fit", text: "Built for your opening — pedestrian or driveway." }],
    gallery: [
      { src: "/images/gate-wood-black-miami.jpg", alt: "Wood-look WPC gate with black frame" },
      { src: "/images/gate-teak-tropical.jpeg", alt: "Teak-look WPC gate in a tropical garden" },
      { src: "/images/gate-double-swing-render.webp", alt: "Double swing WPC gate design" },
    ],
    installGuide: null,
    inMainNav: true,
  },
  {
    slug: "benches",
    num: "06",
    name: "WPC Benches",
    tagline: "Outdoor Seating",
    image: "/images/bench-wpc-outdoor.webp",
    alt: "WPC outdoor bench",
    bg: "linear-gradient(135deg, #C8C8B8 0%, #B4B4A4 100%)",
    desc: "Splinter-free outdoor seating with nothing to oil or seal.",
    heroImage: "/images/bench-teak-park-hero.webp",
    overview: ["WPC benches give you wood-look outdoor seating without annual oiling or sealing."],
    benefits: [NO_UPKEEP, { title: "Splinter-free", text: "Smooth to sit on, season after season." }],
    gallery: [
      { src: "/images/bench-wpc-outdoor.webp", alt: "WPC outdoor bench" },
      { src: "/images/bench-teak-closeup.webp", alt: "Teak-look WPC bench" },
    ],
    installGuide: null,
    inMainNav: false,
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return productsData.find((p) => p.slug === slug);
}

/** /products/aluminum spec table — the page stays unlisted until at least one is confirmed. */
export const ALUMINUM_SPECS: SpecRow[] = [
  { label: "Fence styles & heights", value: todo("aluminum fence styles and heights") },
  { label: "Pergola sizes", value: todo("louvered pergola sizes") },
  { label: "Louver operation", value: todo("manual or motorized louvers") },
  { label: "Finishes & colors", value: todo("powder-coat colors") },
  { label: "Warranty", value: todo("warranty length and terms") },
];
