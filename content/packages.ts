// Outdoor living packages (/projects#packages) and the parts the package builder offers
// (/projects#design). Edit this file to change what's offered.
//
// available: false = not confirmed yet. Previews show it with a {{TODO}}; production hides
// the part in the builder and hides every package that includes it.
// WPC_COLORS stays a todo(...) until the owner confirms the real color range; until then
// the builder's color choices only appear on previews.

import { todo, type TodoFact } from "@/lib/facts";

export interface ComponentChoice {
  value: string;
  label: string;
}

export interface ComponentOptionGroup {
  name: string;
  label: string;
  /** "colors" uses WPC_COLORS below. */
  options: ComponentChoice[] | "colors";
}

export interface PackageComponent {
  id: string;
  label: string;
  available: boolean;
  groups: ComponentOptionGroup[];
}

export interface OutdoorPackage {
  slug: string;
  name: string;
  description: string;
  idealFor: string;
  image: { src: string; alt: string };
  /**
   * What the card lists, each tied to a builder part (and optional pre-picked options).
   * Leave out `component` for card-only text: it isn't pre-loaded into the builder and
   * doesn't hide the package.
   */
  includes: { component?: string; label: string; preset?: Record<string, string> }[];
}

export const WPC_COLORS: ComponentChoice[] | TodoFact = todo("WPC color range for the package builder");

const SIZE: ComponentOptionGroup = {
  name: "size",
  label: "Size",
  options: [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ],
};

export const PACKAGE_COMPONENTS: PackageComponent[] = [
  {
    id: "wpc-fence",
    label: "WPC fence",
    available: true,
    groups: [
      {
        name: "height",
        label: "Height",
        options: [
          { value: "4ft", label: "4 ft" },
          { value: "6ft", label: "6 ft" },
          { value: "8ft", label: "8 ft" },
        ],
      },
      {
        name: "style",
        label: "Style",
        options: [
          { value: "horizontal", label: "Horizontal" },
          { value: "vertical", label: "Vertical" },
          { value: "decorative-top", label: "Decorative top" },
        ],
      },
      { name: "color", label: "Color", options: "colors" },
    ],
  },
  {
    id: "wpc-gate",
    label: "WPC gate",
    available: true,
    groups: [
      {
        name: "type",
        label: "Gate type",
        options: [
          { value: "single-swing", label: "Single swing" },
          { value: "double-swing", label: "Double swing" },
          { value: "sliding", label: "Sliding" },
        ],
      },
      {
        name: "automated",
        label: "Automated",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  {
    id: "wpc-decking",
    label: "WPC decking",
    available: true,
    groups: [
      {
        name: "size",
        label: "Approximate size",
        options: [
          { value: "small", label: "Small (under 200 sq ft)" },
          { value: "medium", label: "Medium (200–500 sq ft)" },
          { value: "large", label: "Large (500+ sq ft)" },
        ],
      },
      { name: "color", label: "Color", options: "colors" },
    ],
  },
  {
    id: "wpc-cladding",
    label: "WPC cladding",
    available: true,
    groups: [
      {
        name: "use",
        label: "Where",
        options: [
          { value: "feature-wall", label: "Feature wall" },
          { value: "facade", label: "Facade" },
        ],
      },
    ],
  },
  {
    id: "pergola",
    label: "Pergola",
    available: true,
    groups: [
      {
        name: "material",
        label: "Material",
        options: [
          { value: "wpc", label: "WPC" },
          { value: "louvered-aluminum", label: "Louvered aluminum" },
        ],
      },
      SIZE,
    ],
  },
  {
    id: "aluminum-fence",
    label: "Aluminum fence",
    available: true,
    groups: [
      {
        name: "height",
        label: "Height",
        options: [
          { value: "4ft", label: "4 ft" },
          { value: "5ft", label: "5 ft" },
          { value: "6ft", label: "6 ft" },
        ],
      },
    ],
  },
  { id: "lighting", label: "Lighting", available: true, groups: [] },
  { id: "outdoor-kitchen", label: "Outdoor kitchen", available: false, groups: [] },
  { id: "container-pool", label: "Container pool", available: false, groups: [] },
];

export const PACKAGES: OutdoorPackage[] = [
  {
    slug: "shade-retreat",
    name: "Shade Retreat",
    description: "A shaded spot to sit outside: a pergola over a deck platform, lit for the evenings.",
    idealFor: "A first backyard upgrade",
    image: { src: "/images/pergola-key-west.jpeg", alt: "WPC pergola over a patio beside a canal" },
    includes: [
      { component: "pergola", label: "WPC pergola", preset: { material: "wpc" } },
      { component: "wpc-decking", label: "WPC deck platform" },
      { component: "lighting", label: "Lighting" },
    ],
  },
  {
    slug: "outdoor-kitchen",
    name: "Outdoor Kitchen",
    description: "Cook and host outside, with a pergola overhead and WPC finishes throughout.",
    idealFor: "Entertaining",
    image: { src: "/images/decking-pergola-aerial.webp", alt: "Aerial view of a pergola over a WPC deck with an outdoor kitchen" },
    includes: [
      { component: "pergola", label: "WPC pergola", preset: { material: "wpc" } },
      { component: "outdoor-kitchen", label: "Outdoor kitchen island with WPC cladding" },
      { component: "wpc-cladding", label: "Cladding feature wall", preset: { use: "feature-wall" } },
      { component: "wpc-decking", label: "WPC decking" },
    ],
  },
  {
    slug: "private-oasis",
    name: "Private Oasis",
    description: "Privacy all the way around, with a matching gate, a feature wall and a pergola.",
    idealFor: "Privacy and a finished backyard",
    image: { src: "/images/fence-light-grey-decorative-patio.webp", alt: "Light grey WPC privacy fence around a patio lounge" },
    includes: [
      { component: "wpc-fence", label: "WPC privacy fence" },
      { component: "wpc-gate", label: "Matching WPC gate" },
      { component: "wpc-cladding", label: "Cladding feature wall", preset: { use: "feature-wall" } },
      { component: "pergola", label: "WPC pergola", preset: { material: "wpc" } },
    ],
  },
  {
    slug: "poolside-pavilion",
    name: "Poolside Pavilion",
    description: "Turn your pool deck into an outdoor living space: louvered shade over an outdoor kitchen bar, enclosed by full-privacy WPC fencing.",
    idealFor: "Homes with an existing pool",
    image: {
      src: "/images/package-poolside-louvered-pergola-kitchen.webp",
      alt: "White louvered aluminum pergola over an outdoor kitchen bar and dining table beside a pool, with a WPC privacy fence",
    },
    includes: [
      { component: "pergola", label: "Aluminum Louvered Pergola", preset: { material: "louvered-aluminum" } },
      { component: "wpc-fence", label: "WPC Full Privacy Fence" },
      // Card text only until outdoor kitchens are confirmed (the builder part is still off).
      { label: "Outdoor Kitchen Bar" },
    ],
  },
  {
    slug: "resort-backyard",
    name: "Resort Backyard",
    description: "Pool, deck, shade, kitchen and privacy, designed and built together.",
    idealFor: "Our complete backyard package",
    image: { src: "/images/container-pool-white-wpc-deck-sunset.webp", alt: "Container pool with a WPC deck surround in a fenced backyard" },
    includes: [
      { component: "container-pool", label: "Container pool" },
      { component: "wpc-decking", label: "WPC deck surround" },
      { component: "pergola", label: "WPC pergola", preset: { material: "wpc" } },
      { component: "outdoor-kitchen", label: "Outdoor kitchen" },
      { component: "wpc-fence", label: "Privacy fence" },
    ],
  },
  {
    slug: "curb-appeal",
    name: "Curb Appeal",
    description: "A new face for the street: an automated sliding gate, front fence and facade cladding.",
    idealFor: "Street-facing upgrades",
    image: { src: "/images/gate-wpc-sliding-white-frame.webp", alt: "WPC sliding driveway gate and front fence at a modern home" },
    includes: [
      { component: "wpc-gate", label: "Automated sliding gate", preset: { type: "sliding", automated: "yes" } },
      { component: "wpc-fence", label: "Front fence" },
      { component: "wpc-cladding", label: "WPC facade cladding", preset: { use: "facade" } },
    ],
  },
];
