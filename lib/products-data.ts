// Product lines: /products/[slug] detail pages, plus the homepage's WPC cards (/#products).
// Copy states only what's confirmed; every technical spec is a todo(...) until the
// supplier spec sheet arrives.

import { todo, type Fact } from "@/lib/facts";
import type { SpecRow } from "@/components/funnel/SpecTable";
import { getComposition } from "@/lib/composition-data";

export type ProductLine = "wpc" | "aluminum" | "pool";

export interface ProductData {
  slug: string;
  /** WPC products get the material composition chart and the standard WPC spec rows. */
  line: ProductLine;
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
  /** Spec table rows. Omitted for WPC products, which use the standard WPC rows. */
  specs?: SpecRow[];
  /** Install guide PDF in public/downloads/, or null until it's uploaded. */
  installGuide: string | null;
  /** A card in the homepage's WPC product grid. Benches stay reachable but off the grid and nav. */
  inHomeGrid: boolean;
}

const NO_UPKEEP = { title: "No painting or sealing", text: "Never needs painting, sealing or staining — an occasional rinse keeps it clean." };
const NO_ROT = { title: "Won't rot or splinter", text: "Stands up to Florida's humidity and rain without the rot and splinters of wood." };
const FLORIDA = { title: "Made for Florida", text: "A good fit for sun, humidity and coastal salt air." };
const ALU_NO_ROT = { title: "Won't rot or rust", text: "Aluminum doesn't rot like wood or rust like iron and steel." };
const ALU_LOW_UPKEEP = { title: "Low upkeep", text: "No sanding or staining — an occasional rinse keeps it clean." };

const WARRANTY: SpecRow = { label: "Warranty", value: todo("warranty length and terms") };

/** Spec table rows. WPC products all show the blueprint's rows, filled in from the supplier spec sheet. */
export function specRows({ slug, name, specs }: ProductData): SpecRow[] {
  if (specs) return specs;
  const t = (what: string): Fact => todo(`${name} ${what}`);
  const composition = getComposition(slug);
  return [
    { label: "Profile dimensions", value: t("profile dimensions") },
    { label: "Lengths", value: t("lengths") },
    { label: "Colors", value: t("colors") },
    {
      label: "Composition",
      value: composition
        ? `${composition.verified ? "" : "Approx. "}${composition.parts.map((c) => `${c.pct}% ${c.label}`).join(", ")}`
        : todo("composition from the supplier spec sheet"),
    },
    { label: "Post / support system", value: t("post or support system") },
    { label: "Pallet quantity", value: t("pallet quantity") },
    WARRANTY,
  ];
}

export const productsData: ProductData[] = [
  {
    slug: "wpc-fencing",
    line: "wpc",
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
    inHomeGrid: true,
  },
  {
    slug: "wpc-pergolas",
    line: "wpc",
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
      { src: "/images/pergola-wpc-dark-chocolate.jpg", alt: "Dark chocolate WPC pergola over a patio dining area" },
    ],
    installGuide: null,
    inHomeGrid: true,
  },
  {
    slug: "wpc-cladding",
    line: "wpc",
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
    inHomeGrid: true,
  },
  {
    slug: "wpc-decking",
    line: "wpc",
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
    inHomeGrid: true,
  },
  {
    slug: "gates",
    line: "wpc",
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
    inHomeGrid: true,
  },
  {
    slug: "benches",
    line: "wpc",
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
    inHomeGrid: false,
  },
  {
    slug: "aluminum-fences",
    line: "aluminum",
    num: "07",
    name: "Aluminum Fences",
    tagline: "Pools, Yards & Property Lines",
    image: "/images/aluminum-fence-black-pool.webp",
    alt: "Black horizontal aluminum fence around a backyard pool",
    bg: "linear-gradient(135deg, #C9CCCF 0%, #B3B7BB 100%)",
    desc: "Clean, modern aluminum fencing for pools, yards and property lines.",
    heroImage: "/images/aluminum-fence-black-pool.webp",
    overview: [
      "Aluminum fencing gives your property clean, modern lines in a strong, lightweight metal.",
      "It works well around pools, backyards and property lines, and pairs with matching aluminum gates.",
    ],
    benefits: [
      ALU_NO_ROT,
      ALU_LOW_UPKEEP,
      { title: "Clean, modern look", text: "Slim, straight lines that suit modern homes." },
      { title: "Matching gates", text: "Pair it with an aluminum gate in the same finish." },
    ],
    gallery: [
      { src: "/images/aluminum-fence-black-front-yard.webp", alt: "Black horizontal aluminum fence along a front yard" },
      { src: "/images/aluminum-fence-black-pool-2.webp", alt: "Black aluminum fence framing a pool deck" },
      { src: "/images/aluminium-fence-1.png", alt: "Close-up of a black horizontal aluminum fence" },
    ],
    specs: [
      { label: "Styles", value: todo("aluminum fence styles") },
      { label: "Heights", value: todo("aluminum fence heights") },
      { label: "Finishes & colors", value: todo("aluminum fence powder-coat colors") },
      { label: "Post system", value: todo("aluminum fence post system") },
      WARRANTY,
    ],
    installGuide: null,
    inHomeGrid: false,
  },
  {
    slug: "aluminum-gates",
    line: "aluminum",
    num: "08",
    name: "Aluminum Gates",
    tagline: "Entry Gates to Match",
    image: "/images/aluminum-gate-black-driveway.webp",
    alt: "Black horizontal aluminum gate and fence in front of a home",
    bg: "linear-gradient(135deg, #C9CCCF 0%, #B3B7BB 100%)",
    desc: "Aluminum gates to match your aluminum fence.",
    heroImage: "/images/aluminum-gate-black-driveway.webp",
    overview: [
      "Aluminum gates pair with our aluminum fencing, so your entry matches the rest of the fence line.",
      "Each gate is laid out for your opening.",
    ],
    benefits: [
      ALU_NO_ROT,
      ALU_LOW_UPKEEP,
      { title: "Matches your fence", text: "Same profiles and finish as your aluminum fence." },
    ],
    // One concept image so far (it's the hero); the gallery appears once there are photos.
    gallery: [],
    specs: [
      { label: "Gate types", value: todo("aluminum gate types, e.g. pedestrian, driveway, sliding") },
      { label: "Sizes", value: todo("aluminum gate sizes") },
      { label: "Finishes & colors", value: todo("aluminum gate powder-coat colors") },
      { label: "Hardware & automation", value: todo("aluminum gate hinges, latches and automation options") },
      WARRANTY,
    ],
    installGuide: null,
    inHomeGrid: false,
  },
  {
    slug: "aluminum-pergolas",
    line: "aluminum",
    num: "09",
    name: "Aluminum Pergolas",
    tagline: "Louvered Shade",
    image: "/images/aluminum-pergola-black-patio.webp",
    alt: "Black louvered aluminum pergola over a patio lounge",
    bg: "linear-gradient(135deg, #C9CCCF 0%, #B3B7BB 100%)",
    desc: "Louvered aluminum pergolas for adjustable shade over patios and pools.",
    heroImage: "/images/aluminum-pergola-black-patio.webp",
    overview: [
      "A louvered aluminum pergola has an adjustable roof: open the louvers for sun and air, or close them for shade.",
      "It turns a patio, pool deck or outdoor kitchen into a shaded outdoor room.",
    ],
    benefits: [
      { title: "Adjustable shade", text: "Open or close the louvers as the sun moves." },
      ALU_NO_ROT,
      ALU_LOW_UPKEEP,
      { title: "Pairs with WPC", text: "Sits well alongside WPC decking, fencing and cladding." },
    ],
    gallery: [
      { src: "/images/aluminum-pergola-white-poolside.webp", alt: "White louvered aluminum pergola over a poolside dining area" },
      { src: "/images/aluminum-pergola-white-outdoor-kitchen.webp", alt: "White louvered aluminum pergola over an outdoor kitchen and dining area" },
      { src: "/images/aluminum-pergola-black-patio.webp", alt: "Dark grey louvered aluminum pergola over a patio lounge" },
    ],
    specs: [
      { label: "Sizes", value: todo("louvered pergola sizes") },
      { label: "Louver operation", value: todo("manual or motorized louvers") },
      { label: "Finishes & colors", value: todo("pergola powder-coat colors") },
      { label: "Options", value: todo("pergola options, e.g. lighting, side screens") },
      WARRANTY,
    ],
    installGuide: null,
    inHomeGrid: false,
  },
  {
    slug: "container-pools",
    line: "pool",
    num: "10",
    name: "Container Pools",
    tagline: "Design & Installation",
    image: "/images/container-pool-white-wpc-deck-sunset.webp",
    alt: "White container pool with a wood-look WPC deck and steps in a landscaped backyard at sunset",
    bg: "linear-gradient(135deg, #BFD3D6 0%, #A9C0C4 100%)",
    desc: "A complete pool, finished to match your outdoor space.",
    heroImage: "/images/container-pool-white-wpc-deck-sunset.webp",
    overview: [
      "A container pool arrives as a complete pool, finished to match your outdoor space.",
      "We pair it with WPC decking, cladding and pergolas so the whole space feels designed as one.",
    ],
    benefits: [
      { title: "Finished to match", text: "Clad and surrounded in WPC to match your deck, fence and pergola." },
      { title: "Designed with you", text: "Start with a design consultation for your yard." },
      { title: "One team", text: "Pool, decking, fencing and pergola from one company." },
    ],
    gallery: [
      { src: "/images/container-pool-backyard-pergola-day.webp", alt: "Backyard container pool beside a pergola" },
      { src: "/images/container-pool-pergola-sunset-party.webp", alt: "Container pool with pergola at sunset" },
      { src: "/images/container-pool-glass-wall-night.webp", alt: "Container pool with a glass wall and waterfall at night" },
    ],
    specs: [
      { label: "Sizes", value: todo("container pool sizes") },
      { label: "Finishes", value: todo("container pool finishes and cladding options") },
      { label: "Upgrades", value: todo("container pool upgrades, e.g. lighting, heating, glass wall") },
      { label: "Site requirements", value: todo("container pool site and permit requirements") },
      WARRANTY,
    ],
    installGuide: null,
    inHomeGrid: false,
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return productsData.find((p) => p.slug === slug);
}
