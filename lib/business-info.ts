// Business facts used across the site. Change them here, not in components.

export const ADDRESS = {
  street: "8031 US-441",
  city: "Okeechobee",
  region: "FL",
  postalCode: "34974",
} as const;

export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}`;

/** Google Maps turn-by-turn directions to the showroom. */
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_LINE)}`;

// South to north. Keep in sync with SERVICE_ZIP_RANGES in lib/booking-config.ts.
export const SERVICE_COUNTIES = ["Miami-Dade", "Broward", "Palm Beach", "Martin", "St. Lucie", "Okeechobee"] as const;
export const SERVICE_AREA = "Miami-Dade, Broward, Palm Beach, Martin, St. Lucie & Okeechobee counties";
/** For badges and tight spaces where the full county list won't fit. */
export const SERVICE_AREA_SHORT = "Miami-Dade to Okeechobee, FL";

export const GOOGLE_BUSINESS_PROFILE = "https://g.page/r/CYJgn-z3BeA1EBM";
