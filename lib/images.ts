// AI-generated images and design renders. These must never pass as real installs:
// FunnelImage stamps them "Concept", and they stay off trade and landing pages.
// Remove an entry only when it is replaced by a real photo of a real install.
export const CONCEPT_IMAGES = new Set<string>([
  "/images/fence-backyard-lawn-garden.png",
  "/images/fence-modern-home-driveway.png",
  "/images/container-pool-backyard-pergola-day.png",
  "/images/container-pool-pergola-daytime.png",
  "/images/container-pool-pergola-sunset-party.png",
  "/images/aluminum-pergola-pool-sunset.png",
  "/images/aluminum-pergola-waterfront-sunset.png",
  "/images/gate-double-swing-render.png",
]);

export function isConceptImage(src: string): boolean {
  return CONCEPT_IMAGES.has(src);
}
