import type { MetadataRoute } from "next";
import { productsData } from "@/lib/products-data";
import { SITE } from "@/lib/site-config";

// Indexable pages only — thank-you pages and APIs are excluded (see robots.ts).
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/trade", priority: 0.9 },
  { path: "/trade/apply", priority: 0.8 },
  { path: "/get-a-quote", priority: 0.8 },
  { path: "/homeowners", priority: 0.8 },
  { path: "/projects", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/fence-installation-miami", priority: 0.7 },
  { path: "/outdoor-living-packages", priority: 0.6 },
  { path: "/container-pools", priority: 0.6 },
  { path: "/products/aluminum", priority: 0.6 },
  { path: "/trade/container-schedule", priority: 0.6 },
  { path: "/trade/spec-kit", priority: 0.5 },
  { path: "/trade/samples", priority: 0.5 },
  { path: "/trade/certified-installer", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...PAGES.map(({ path, priority }) => ({ url: `${SITE.url}${path}`, lastModified, priority })),
    ...productsData.map((p) => ({ url: `${SITE.url}/products/${p.slug}`, lastModified, priority: 0.7 })),
  ];
}
