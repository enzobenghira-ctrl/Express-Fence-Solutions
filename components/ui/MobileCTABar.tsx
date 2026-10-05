"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/metaEvents";
import { trackFunnelClick } from "@/lib/analytics";
import { FUNNEL_ENTRY, type Funnel } from "@/lib/site-config";

// Trade pages must never show a homeowner CTA, so the third button follows the page's funnel.
const FUNNEL_BUTTON: Record<Funnel, { label: string; href: string }> = {
  home: { label: "Get a Quote", href: FUNNEL_ENTRY.homeQuote },
  trade: { label: "Apply", href: FUNNEL_ENTRY.tradeApply },
};

export default function MobileCTABar({ funnel = "home" }: { funnel?: Funnel }) {
  const cta = FUNNEL_BUTTON[funnel];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        height: 68,
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
      }}
      // display lives in the class, not the style, or the inline style would override md:hidden
      className="flex md:hidden"
    >
      <a
        href="tel:+13059679202"
        onClick={() => trackEvent("Contact", { method: "phone" })}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--accent)",
          color: "var(--background)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 15,
          fontWeight: 700,
          textDecoration: "none",
          gap: 6,
        }}
      >
        📞 Call Now
      </a>
      <a
        href="https://wa.me/13059679202"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--whatsapp)",
          color: "white",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
          gap: 6,
        }}
      >
        💬 WhatsApp
      </a>
      <Link
        href={cta.href}
        onClick={() => trackFunnelClick(funnel, cta.label)}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--dark)",
          color: "var(--white)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 15,
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        {cta.label}
      </Link>
    </div>
  );
}
