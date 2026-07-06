"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/metaEvents";

const links = [
  { label: "Home", href: "#", anchor: true },
  { label: "About Us", href: "#about", anchor: true },
  { label: "Products", href: "#products", anchor: true },
  { label: "Why WPC", href: "#why-wpc", anchor: true },
  { label: "More Products", href: "/other-products", anchor: false },
  { label: "Partner With Us", href: "/partner", anchor: false },
  { label: "Contact", href: "#contact", anchor: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 72,
          background: scrolled ? "rgba(250,250,247,0.97)" : "rgba(250,250,247,0.0)",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "all 0.35s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "0 32px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); go("#"); }}
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
          >
            <div className="nav-logo-img" style={{ position: "relative", height: 68, width: 68, flexShrink: 0 }}>
              <Image
                src="/images/logo-transparent.png"
                alt="Express Fence Solutions"
                fill
                sizes="68px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className="nav-brand-text" style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 26,
                fontWeight: 600,
                color: "var(--accent)",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}>
                Express Fence Solutions
              </span>
            </div>
          </a>

          {/* Nav links — desktop */}
          <ul
            style={{
              listStyle: "none",
              gap: 22,
              alignItems: "center",
            }}
            className="hidden xl:flex"
          >
            {links.map((l) => (
              <li key={l.href}>
                {l.anchor ? (
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); go(l.href); }}
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: scrolled ? "var(--dark)" : "var(--white)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "color 0.2s",
                      position: "relative",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "var(--dark)" : "var(--white)")}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: scrolled ? "var(--dark)" : "var(--white)",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "var(--dark)" : "var(--white)")}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="hidden xl:flex" style={{ alignItems: "center", gap: 22, flexShrink: 0 }}>
            <a
              href="tel:+13059679202"
              onClick={() => trackEvent("Contact", { method: "phone" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--dark)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <Phone size={14} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
              (305) 967-9202
            </a>
            <a
              href="/book-consultation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                fontWeight: 600,
                background: "var(--dark)",
                color: "var(--white)",
                borderRadius: 6,
                padding: "10px 22px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--dark)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: open ? "var(--accent)" : scrolled ? "var(--dark)" : "#ffffff",
              padding: 4,
              transition: "color 0.2s",
            }}
          >
            {open ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 72,
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
            {/* Nav links */}
            <div style={{ padding: "8px 0" }}>
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {l.anchor ? (
                    <a
                      href={l.href}
                      onClick={(e) => { e.preventDefault(); go(l.href); }}
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
                        transition: "color 0.2s",
                      }}
                      onTouchStart={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onTouchEnd={(e) => (e.currentTarget.style.color = "var(--dark)")}
                    >
                      {l.label}
                      <span style={{ fontSize: 20, color: "var(--accent)" }}>›</span>
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
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
                        transition: "color 0.2s",
                      }}
                    >
                      {l.label}
                      <span style={{ fontSize: 20, color: "var(--accent)" }}>›</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ padding: "24px", marginTop: "auto" }}
            >
              <a
                href="tel:+13059679202"
                onClick={() => trackEvent("Contact", { method: "phone" })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  background: "var(--accent)",
                  color: "var(--white)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 17,
                  fontWeight: 700,
                  borderRadius: 10,
                  padding: "18px",
                  textDecoration: "none",
                  marginBottom: 12,
                }}
              >
                📞 (305) 967-9202
              </a>
              <a
                href="/book-consultation"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--dark)",
                  color: "var(--white)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 10,
                  padding: "16px",
                  textDecoration: "none",
                }}
              >
                Book Appointment
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
