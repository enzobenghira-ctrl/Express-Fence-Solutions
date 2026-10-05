"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { trackEvent } from "@/lib/metaEvents";
import { FUNNEL_ENTRY, MAIN_NAV, PRODUCT_NAV, SITE, TRADE_NAV_CTA } from "@/lib/site-config";
import FunnelButton from "@/components/funnel/FunnelButton";

interface Props {
  /** Homepage only: the nav sits transparent over the full-bleed hero until scrolled. */
  transparent?: boolean;
}

export default function SiteHeader({ transparent = false }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const productsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductsOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!productsRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [productsOpen]);

  const solid = !transparent || scrolled || open;
  const linkColor = solid ? "var(--dark)" : "var(--white)";
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transform: scrolled ? "translateY(calc(-1 * var(--topbar-h)))" : "none",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Contractor top bar */}
        <div
          style={{
            height: "var(--topbar-h)",
            background: "var(--dark)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 16px",
            fontFamily: "var(--font-dm-sans)",
            fontSize: 13,
            color: "rgba(250,250,247,0.85)",
            whiteSpace: "nowrap",
          }}
        >
          <Link href={FUNNEL_ENTRY.tradeHub} className="topbar-link">
            Contractor? <strong style={{ fontWeight: 700 }}>Open a trade account →</strong>
          </Link>
        </div>

        <nav
          aria-label="Main"
          style={{
            height: "var(--nav-h)",
            // No backdrop-filter blur: at 97% opacity it's invisible, and blurring the hero
            // photo underneath delayed first paint by ~1s in Lighthouse's mobile emulation.
            background: solid ? "rgba(250,250,247,0.97)" : "rgba(250,250,247,0)",
            borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
            transition: "background 0.35s ease, border-color 0.35s ease",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 1360,
              margin: "0 auto",
              padding: "0 clamp(16px, 4vw, 32px)",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", minWidth: 0 }}>
              <div className="nav-logo-img" style={{ position: "relative", height: 68, width: 68, flexShrink: 0 }}>
                <Image src="/images/logo-transparent.png" alt="" fill sizes="68px" style={{ objectFit: "contain" }} priority />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "clamp(19px, 5vw, 26px)",
                  fontWeight: 600,
                  color: "var(--accent)",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.01em",
                }}
              >
                {SITE.name}
              </span>
            </Link>

            {/* Desktop links */}
            <ul style={{ listStyle: "none", gap: 28, alignItems: "center" }} className="hidden xl:flex">
              <li
                ref={productsRef}
                style={{ position: "relative" }}
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  type="button"
                  className="site-header-link"
                  aria-expanded={productsOpen}
                  aria-controls="products-menu"
                  aria-current={PRODUCT_NAV.some((l) => isActive(l.href)) ? "page" : undefined}
                  onClick={() => setProductsOpen((v) => !v)}
                  style={{ color: linkColor }}
                >
                  Products <ChevronDown size={14} strokeWidth={2.5} aria-hidden />
                </button>
                {productsOpen && (
                  // Padding-top bridges the gap so the menu stays open while the pointer moves down.
                  <div style={{ position: "absolute", top: "100%", left: -18, paddingTop: 10 }}>
                    <ul
                      id="products-menu"
                      style={{
                        listStyle: "none",
                        background: "var(--white)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        boxShadow: "0 12px 32px rgba(26,25,24,0.12)",
                        padding: "8px 0",
                        minWidth: 220,
                      }}
                    >
                      {PRODUCT_NAV.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="site-dropdown-link" aria-current={isActive(l.href) ? "page" : undefined}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              {MAIN_NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="site-header-link"
                    aria-current={isActive(l.href) ? "page" : undefined}
                    style={{ color: linkColor }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop right */}
            <div className="hidden xl:flex" style={{ alignItems: "center", gap: 22, flexShrink: 0 }}>
              <a
                href={SITE.phone.href}
                onClick={() => trackEvent("Contact", { method: "phone" })}
                className="site-header-link"
                style={{ color: linkColor, gap: 6 }}
              >
                <Phone size={14} strokeWidth={2.5} style={{ color: "var(--accent)" }} aria-hidden />
                {SITE.phone.display}
              </a>
              <FunnelButton href={TRADE_NAV_CTA.href} size="sm" funnel="trade">
                {TRADE_NAV_CTA.label}
              </FunnelButton>
            </div>

            {/* Mobile burger */}
            <button
              type="button"
              className="xl:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: open ? "var(--accent)" : linkColor,
                padding: 10,
                marginRight: -10,
                flexShrink: 0,
                transition: "color 0.2s",
              }}
            >
              {open ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — CSS animation keeps framer-motion off pages that don't otherwise need it */}
      {open && (
          <div
            id="mobile-menu"
            className="site-mobile-menu"
            style={{
              position: "fixed",
              top: scrolled ? "var(--nav-h)" : "var(--header-h)",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99,
              background: "var(--background)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <nav aria-label="Mobile" style={{ padding: "8px 0" }}>
              <p className="efs-eyebrow" style={{ padding: "20px 24px 0", marginBottom: 8 }}>
                Products
              </p>
              <ul style={{ listStyle: "none", paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                {PRODUCT_NAV.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      style={{
                        display: "block",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "var(--dark)",
                        textDecoration: "none",
                        padding: "11px 24px",
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul style={{ listStyle: "none" }}>
                {MAIN_NAV.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontSize: 24,
                        fontWeight: 400,
                        color: "var(--dark)",
                        textDecoration: "none",
                        padding: "18px 24px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {l.label}
                      <span style={{ fontSize: 20, color: "var(--accent)" }} aria-hidden>
                        ›
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div style={{ padding: 24, marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              <FunnelButton href={TRADE_NAV_CTA.href} funnel="trade" block>
                {TRADE_NAV_CTA.label}
              </FunnelButton>
              <a
                href={SITE.phone.href}
                onClick={() => trackEvent("Contact", { method: "phone" })}
                className="efs-btn efs-btn--secondary efs-btn--block"
              >
                <Phone size={16} aria-hidden /> {SITE.phone.display}
              </a>
            </div>
          </div>
      )}
    </>
  );
}
