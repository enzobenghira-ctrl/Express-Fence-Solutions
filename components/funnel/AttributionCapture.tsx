"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Mounted once in the root layout: records UTMs, landing page and referrer on arrival. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
