// Pages that would be mostly empty without their {{TODO}} content. Until the owner fills
// it in, each one is noindex, left out of the sitemap, and not linked from navigation or
// other pages (it stays reachable by direct URL for review). Readiness is computed from
// the content itself, so filling the data in un-gates the page automatically.

import schedule from "@/content/container-schedule.json";
import { isTodo } from "@/lib/facts";
import { SPEC_KIT_FILES } from "@/lib/downloads";
import { CONTAINER_POOL_FEATURES, PACKAGE_DEFINITIONS } from "@/lib/home-content";
import { ALUMINUM_SPECS } from "@/lib/products-data";

/** The schedule card needs at least the next arrival month to say anything real. */
export const SCHEDULE_READY = (schedule as { nextArrival: string | null }).nextArrival !== null;

const READY: Record<string, boolean> = {
  "/trade/spec-kit": SPEC_KIT_FILES.some((f) => f.href),
  "/trade/container-schedule": SCHEDULE_READY,
  "/outdoor-living-packages": !isTodo(PACKAGE_DEFINITIONS),
  "/container-pools": !isTodo(CONTAINER_POOL_FEATURES),
  "/products/aluminum": ALUMINUM_SPECS.some((r) => !isTodo(r.value)),
};

/** False for gated pages. Accepts hrefs with a query or hash. */
export function isPageReady(href: string): boolean {
  const path = href.split(/[?#]/)[0];
  return READY[path] ?? true;
}

export const GATED_PAGES = Object.keys(READY).filter((p) => !READY[p]);

/** Metadata `robots` value for a page: noindex while it's gated. */
export function robotsFor(path: string) {
  return isPageReady(path) ? undefined : { index: false, follow: true };
}
