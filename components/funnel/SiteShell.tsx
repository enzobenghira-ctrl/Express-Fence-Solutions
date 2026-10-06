import type { ReactNode } from "react";
import SiteHeader from "@/components/funnel/SiteHeader";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileCTABar from "@/components/ui/MobileCTABar";

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

/** Chrome for shared pages: top bar + nav, footer, WhatsApp, sticky mobile bar. Pages render their own <main>. */
export default function SiteShell({ children, transparentHeader = false, mobileBar = "home" }: Props) {
  return (
    <>
      <SiteHeader transparent={transparentHeader} />
      {children}
      <Footer funnel={mobileBar === "trade" ? "trade" : "home"} />
      <WhatsAppButton />
      {mobileBar !== "none" && <MobileCTABar funnel={mobileBar} />}
      <div className="mobile-bar-spacer" aria-hidden />
    </>
  );
}
