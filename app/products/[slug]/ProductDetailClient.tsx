"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Phone } from "lucide-react";
import NavbarPage from "@/components/sections/NavbarPage";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileCTABar from "@/components/ui/MobileCTABar";
import type { ProductData } from "@/lib/products-data";

const WHATSAPP = "https://wa.me/13059679202";

interface Props {
  product: ProductData;
}

export default function ProductDetailClient({ product }: Props) {
  return (
    <>
      <NavbarPage />

      <main style={{ paddingTop: 72, background: "var(--background)" }}>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            height: "clamp(380px, 58vh, 680px)",
            overflow: "hidden",
          }}
        >
          <Image
            src={product.heroImage}
            alt={product.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          {/* gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(28,28,26,0.25) 0%, rgba(28,28,26,0.65) 100%)",
            }}
          />
          {/* hero content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 32px 48px",
              maxWidth: 1280,
              margin: "0 auto",
              left: 0,
              right: 0,
            }}
          >
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.04em",
              }}
            >
              <Link
                href="/"
                style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/#products"
                style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                Products
              </Link>
              <span>/</span>
              <span style={{ color: "#fff" }}>{product.name}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  background: "rgba(250,250,247,0.12)",
                  border: "1px solid rgba(184,150,90,0.5)",
                  borderRadius: 4,
                  padding: "4px 10px",
                  marginBottom: 12,
                }}
              >
                {product.tagline}
              </span>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(44px, 6vw, 80px)",
                  color: "#fff",
                  lineHeight: 1.0,
                  margin: 0,
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                {product.name}
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ── Back link ──────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px 0" }}>
          <Link
            href="/#products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            All Products
          </Link>
        </div>

        {/* ── Main content ───────────────────────────────────────── */}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "48px 32px 0",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 64,
            alignItems: "start",
          }}
          className="product-detail-grid"
        >
          {/* LEFT: overview + composition + construction */}
          <div>
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Overview
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(30px, 3.5vw, 44px)",
                  color: "var(--dark)",
                  lineHeight: 1.1,
                  margin: "12px 0 24px",
                }}
              >
                Why WPC for {product.name.replace("WPC ", "")}?
              </h2>
              {product.overview.map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 15,
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    marginBottom: 16,
                  }}
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* WPC Material Composition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              style={{
                marginTop: 52,
                padding: "36px",
                background: "var(--surface)",
                borderRadius: 16,
                border: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Material Composition
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 28,
                  color: "var(--dark)",
                  margin: "10px 0 8px",
                }}
              >
                What is WPC made of?
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: 28,
                }}
              >
                Wood Plastic Composite (WPC) is an engineered material that bonds recycled wood fiber with a thermoplastic polymer under heat and pressure — creating a material that looks and feels like natural wood but performs like a modern synthetic.
              </p>
              {product.composition.map((c, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--dark)",
                      }}
                    >
                      {c.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 13,
                        fontWeight: 700,
                        color: c.color,
                      }}
                    >
                      {c.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "var(--border)",
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        background: c.color,
                        borderRadius: 99,
                      }}
                    />
                  </div>
                </div>
              ))}
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginTop: 24,
                  fontStyle: "italic",
                }}
              >
                {product.wpcRole}
              </p>
            </motion.div>

            {/* How It's Built */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              style={{ marginTop: 52 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Construction & Design
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(26px, 3vw, 38px)",
                  color: "var(--dark)",
                  lineHeight: 1.1,
                  margin: "12px 0 32px",
                }}
              >
                How it's built
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {product.construction.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr",
                      gap: "0 20px",
                      paddingBottom: 32,
                      position: "relative",
                    }}
                  >
                    {/* Step number + vertical line */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "var(--accent)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      {i < product.construction.length - 1 && (
                        <div
                          style={{
                            width: 1,
                            flex: 1,
                            background: "var(--border)",
                            marginTop: 8,
                            minHeight: 32,
                          }}
                        />
                      )}
                    </div>
                    <div style={{ paddingTop: 6 }}>
                      <h4
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: 15,
                          fontWeight: 700,
                          color: "var(--dark)",
                          marginBottom: 8,
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: 14,
                          color: "var(--text-secondary)",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: photo gallery + CTA card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Photos */}
            {product.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  position: "relative",
                  height: 300,
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "var(--surface)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="420px"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            ))}

            {/* Sticky CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: "var(--dark)",
                borderRadius: 16,
                padding: "32px 28px",
                marginTop: 4,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 26,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: 10,
                }}
              >
                Interested in {product.name}?
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                Get a free quote from our team. We'll discuss your project, recommend the right profile and color, and give you a detailed estimate.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Link
                  href="/#contact"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    background: "var(--accent)",
                    color: "#fff",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 14,
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: "14px 20px",
                    textDecoration: "none",
                    transition: "opacity 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Get a Free Quote
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </Link>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: "#25D366",
                    color: "#fff",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 14,
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: "14px 20px",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.882a.5.5 0 00.611.61l6.102-1.528A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.006-1.371l-.358-.213-3.722.931.994-3.63-.234-.373A9.818 9.818 0 012.182 12C2.182 6.568 6.568 2.182 12 2.182S21.818 6.568 21.818 12 17.432 21.818 12 21.818z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+13059679202"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: "12px 20px",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.12)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <Phone size={14} strokeWidth={2.5} />
                  (305) 967-9202
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Features Grid ──────────────────────────────────────── */}
        <section
          style={{
            maxWidth: 1280,
            margin: "80px auto 0",
            padding: "0 32px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 40 }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Key Benefits
            </span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(30px, 3.5vw, 44px)",
                color: "var(--dark)",
                lineHeight: 1.1,
                margin: "12px 0 0",
              }}
            >
              Why homeowners choose WPC
            </h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 2,
              background: "var(--border)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {product.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                style={{
                  background: "var(--white)",
                  padding: "28px 28px",
                }}
              >
                <CheckCircle2
                  size={20}
                  strokeWidth={2}
                  style={{ color: "var(--accent)", marginBottom: 14 }}
                />
                <h4
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--dark)",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────────────── */}
        <section style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            style={{
              background: "var(--dark)",
              borderRadius: 20,
              padding: "60px 48px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 24,
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                Ready to get started?
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(32px, 4vw, 52px)",
                  color: "#fff",
                  lineHeight: 1.1,
                  margin: "12px 0 16px",
                }}
              >
                Transform your outdoor space with premium WPC
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.65,
                  maxWidth: 560,
                  margin: 0,
                }}
              >
                Visit our North Miami Beach showroom to see, touch, and compare WPC products in person — or reach out for a free quote and we'll bring the samples to you.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 14,
                  fontWeight: 700,
                  borderRadius: 8,
                  padding: "14px 28px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Get a Free Quote
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#fff",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 14,
                  fontWeight: 700,
                  borderRadius: 8,
                  padding: "14px 24px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileCTABar />

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
