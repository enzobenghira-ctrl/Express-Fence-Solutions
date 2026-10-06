// AI-generated images and design renders. These must never pass as real installs:
// FunnelImage stamps them "Concept", and they stay off trade and landing pages.
// Remove an entry only when it is replaced by a real photo of a real install, or move it
// to UNLABELLED_RENDERS when the owner chooses to show it without the badge.
export const CONCEPT_IMAGES = new Set<string>([
  "/images/fence-backyard-lawn-garden.webp",
  "/images/fence-modern-home-driveway.webp",
  "/images/container-pool-backyard-pergola-day.webp",
  "/images/container-pool-pergola-daytime.webp",
  "/images/container-pool-pergola-sunset-party.webp",
  "/images/aluminum-pergola-pool-sunset.webp",
  "/images/aluminum-pergola-waterfront-sunset.webp",
  "/images/gate-double-swing-render.webp",
  "/images/gate-wpc-sliding-white-frame.webp",
  "/images/aluminum-pergola-white-poolside.webp",
  "/images/aluminum-pergola-white-outdoor-kitchen.webp",
  "/images/container-pool-glass-wall-night.webp",
  "/images/container-pool-white-wpc-deck-sunset.webp",
]);

// Renders (or, for aluminium-fence-1, unknown origin) that the owner chose on 2026-10-06 to
// show without the "Concept" badge. They are still not photos of real installs, so they
// never go in REAL_INSTALL_PHOTOS, the homepage "Recent installs" gallery or /projects.
export const UNLABELLED_RENDERS = new Set<string>([
  "/images/fence-light-grey-decorative-patio.webp",
  "/images/aluminum-fence-black-pool.webp",
  "/images/aluminum-fence-black-pool-2.webp",
  "/images/aluminum-fence-black-front-yard.webp",
  "/images/aluminium-fence-1.png",
  "/images/aluminum-gate-black-driveway.webp",
  "/images/aluminum-pergola-black-patio.webp",
]);

// Confirmed photos of real EFS installs (matched to the owner's phone photos). The only
// images allowed on landing pages and in project galleries until more are confirmed.
export const REAL_INSTALL_PHOTOS = [
  { src: "/images/fence-waterway-turf.jpg", alt: "Charcoal WPC privacy fence along a South Florida waterway" },
  { src: "/images/fence-black-modern-home.jpg", alt: "Black horizontal WPC fence at a modern home" },
  { src: "/images/fence-charcoal-white-frame.jpg", alt: "Charcoal WPC fence panels in a white aluminum frame" },
  { src: "/images/gate-charcoal-single.jpg", alt: "Charcoal WPC gate with white aluminum frame" },
  { src: "/images/gate-wood-black-miami.jpg", alt: "Wood-look WPC gate with black frame" },
];

export function isConceptImage(src: string): boolean {
  return CONCEPT_IMAGES.has(src);
}
