import type { ReactNode } from "react";
import SiteHeader from "@/components/funnel/SiteHeader";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileCTABar from "@/components/ui/MobileCTABar";
import { isPageReady } from "@/lib/content-readiness";
import { PRODUCT_NAV, type NavLink } from "@/lib/site-config";

interface Props {
  children: ReactNode;
  /** Homepage only: header starts transparent over the hero. */
  transparentHeader?: boolean;
  /**
   * Which funnel the sticky mobile bar's third button feeds. Trade pages must use
   * "trade" so they never show a homeowner CTA. "none" for pages with their own bar.
   */
  mobileBar?: "home" | "trade" | "none";
}

const HOMEOWNER_LINKS: NavLink[] = [
  { label: "Get a Home Quote", href: "/get-a-quote" },
  { label: "Outdoor Living Packages", href: "/outdoor-living-packages" },
  { label: "Container Pools", href: "/container-pools" },
  { label: "Homeowners", href: "/homeowners" },
];

// Navigation is filtered here, on the server: pages still waiting on content
// (lib/content-readiness.ts) are never linked, and the client header/footer only ever
// receive finished link lists — so no {{TODO}} content reaches the browser bundle.
const productNav = PRODUCT_NAV.filter((l) => isPageReady(l.href));
const footerProducts = [...productNav, { label: "WPC Benches", href: "/products/benches" }];
const homeownerLinks = HOMEOWNER_LINKS.filter((l) => isPageReady(l.href));

/** Chrome for shared pages: top bar + nav, footer, WhatsApp, sticky mobile bar. Pages render their own <main>. */
export default function SiteShell({ children, transparentHeader = false, mobileBar = "home" }: Props) {
  return (
    <>
      <SiteHeader transparent={transparentHeader} productNav={productNav} />
      {children}
      <Footer
        products={footerProducts}
        // Trade pages never show the homeowner quote CTA.
        homeownerLinks={mobileBar === "trade" ? homeownerLinks.filter((l) => l.href !== "/get-a-quote") : homeownerLinks}
        showSpecKit={isPageReady("/trade/spec-kit")}
      />
      <WhatsAppButton />
      {mobileBar !== "none" && <MobileCTABar funnel={mobileBar} />}
      <div className="mobile-bar-spacer" aria-hidden />
    </>
  );
}
