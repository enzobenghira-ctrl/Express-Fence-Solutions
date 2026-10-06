import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you-trade", "/thank-you-home", "/dev-preview"] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
