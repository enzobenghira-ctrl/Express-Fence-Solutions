"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/metaEvents";

/** Fires Meta ViewContent once per product page view (pixel + CAPI, deduplicated). */
export default function ProductViewTracker({ name }: { name: string }) {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: name, content_category: "WPC products" });
  }, [name]);
  return null;
}
