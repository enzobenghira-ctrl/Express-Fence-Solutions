"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "WPC Products", href: "/#products" },
  { label: "Why WPC", href: "/#why-wpc" },
  { label: "More Products", href: "/other-products" },
  { label: "Contact", href: "/#contact" },
];

export default function NavbarPage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 72,
          background: scrolled ? "rgba(250,250,247,0.97)" : "rgba(250,250,247,0.97)",
          borderBottom: "1px solid var(--border)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "all 0.35s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
          >
            <div style={{ position: "relative", height: 68, width: 68, flexShrink: 0 }}>
              <Image
                src="/images/logo-transparent.png"
                alt="Express Fence Solutions"
                fill
                sizes="68px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
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
          </Link>

          {/* Nav links — desktop */}
          <ul
            style={{ display: "flex", listStyle: "none", gap: 24, alignItems: "center" }}
            className="hidden lg:flex"
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--dark)",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dark)")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: 20 }}>
            <a
              href="tel:+13059679202"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--dark)",
                textDecoration: "none",
              }}
            >
              <Phone size={14} strokeWidth={2.5} style={{ color: "var(--accent)" }} />
              (305) 967-9202
            </a>
            <Link
              href="/#contact"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                fontWeight: 600,
                background: "var(--dark)",
                color: "var(--white)",
                borderRadius: 6,
                padding: "10px 22px",
                textDecoration: "none",
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
              Free Quote
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dark)", padding: 4 }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "var(--background)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                height: 72,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ position: "relative", height: 44, width: 44, flexShrink: 0 }}>
                  <Image
                    src="/images/logo-transparent.png"
                    alt="Express Fence Solutions"
                    fill
                    sizes="44px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--accent)",
                  whiteSpace: "nowrap",
                }}>
                  Express Fence Solutions
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--dark)" }}
              >
                <X size={24} />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 32px",
                gap: 0,
              }}
            >
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: 42,
                      fontWeight: 400,
                      color: "var(--dark)",
                      textDecoration: "none",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="tel:+13059679202"
                style={{
                  marginTop: 32,
                  display: "block",
                  textAlign: "center",
                  background: "var(--accent)",
                  color: "var(--white)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 18,
                  fontWeight: 700,
                  borderRadius: 8,
                  padding: "18px",
                  textDecoration: "none",
                }}
              >
                📞 (305) 967-9202
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
