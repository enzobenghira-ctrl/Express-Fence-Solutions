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
  // New showroom address pending from the owner — update these four fields when confirmed.
  address: {
    street: "15431 W. Dixie Hwy, Unit 12",
    city: "North Miami Beach",
    region: "FL",
    postalCode: "33162",
  },
  serviceArea: "Miami-Dade & Broward County, FL",
  instagram: "https://www.instagram.com/express_fence_solutions/",
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
// Slugs are renamed to /products/wpc-* in the product-page phase; update hrefs here then.
export const PRODUCT_NAV: NavLink[] = [
  { label: "WPC Fencing", href: "/products/fences" },
  { label: "WPC Decking", href: "/products/decking" },
  { label: "WPC Cladding", href: "/products/cladding" },
  { label: "WPC Pergolas", href: "/products/pergolas" },
  { label: "Gates", href: "/products/gates" },
  { label: "Aluminum", href: "/other-products" },
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
