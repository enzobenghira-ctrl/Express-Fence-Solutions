// Single source of truth for NAP, navigation and funnel entry points.
// Change business facts here, not in components.

export type Funnel = "trade" | "home";

export const SITE = {
  name: "Express Fence Solutions",
  legalName: "Express Fence Solutions LLC",
  url: "https://expressfencesolutions.com",
  phone: {
    display: "(305) 967-9202",
    href: "tel:+13059679202",
    e164: "+13059679202",
  },
  whatsapp: "https://wa.me/13059679202",
  email: "Info@expressfencesolutions.com",
  // Showroom & warehouse.
  address: {
    street: "8031 US-441",
    city: "Okeechobee",
    region: "FL",
    postalCode: "34974",
  },
  // South to north. Drives schema areaServed, service-area copy and the contact form's
  // location options. Keep in sync with SERVICE_ZIP_RANGES in lib/booking-config.ts.
  serviceCounties: ["Miami-Dade", "Broward", "Palm Beach", "Martin", "St. Lucie", "Okeechobee"],
  serviceArea: "Miami-Dade, Broward, Palm Beach, Martin, St. Lucie & Okeechobee counties",
  /** For badges and tight spaces where the full county list won't fit. */
  serviceAreaShort: "Miami-Dade to Okeechobee, FL",
  instagram: "https://www.instagram.com/express_fence_solutions/",
  googleBusinessProfile: "https://g.page/r/CYJgn-z3BeA1EBM",
  googleReviewUrl: "https://g.page/r/CYJgn-z3BeA1EBM/review",
} as const;

export const FUNNEL_ENTRY = {
  tradeHub: "/trade",
  tradeApply: "/trade/apply",
  homeQuote: "/get-a-quote",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

// Benches stay reachable at /products/benches but are intentionally off the main nav.
export const PRODUCT_NAV: NavLink[] = [
  { label: "WPC Fencing", href: "/products/wpc-fencing" },
  { label: "WPC Decking", href: "/products/wpc-decking" },
  { label: "WPC Cladding", href: "/products/wpc-cladding" },
  { label: "WPC Pergolas", href: "/products/wpc-pergolas" },
  { label: "Gates", href: "/products/gates" },
  { label: "Aluminum", href: "/products/aluminum" },
];

export const MAIN_NAV: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Homeowners", href: "/homeowners" },
];

export const TRADE_NAV_CTA: NavLink = { label: "Trade Program", href: FUNNEL_ENTRY.tradeHub };

export function formatAddress(): string {
  const { street, city, region, postalCode } = SITE.address;
  return `${street}, ${city}, ${region} ${postalCode}`;
}

/** Google Maps turn-by-turn directions to the showroom. */
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatAddress())}`;
