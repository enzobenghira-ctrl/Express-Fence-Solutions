"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { trackEvent } from "@/lib/metaEvents";

const containerPools = [
  {
    image: "/images/container-pool-1.jpg",
    alt: "Container pool with waterfall feature backyard Miami",
  },
  {
    image: "/images/container-pool-2.jpg",
    alt: "White container pool with WPC decking South Florida",
  },
  {
    image: "/images/container-pool-3.jpg",
    alt: "Dark container pool with WPC cladding Miami patio",
  },
  {
    image: "/images/container-pool-4.jpg",
    alt: "Family container pool with WPC deck surround",
  },
];

const aluminiumPergolas = [
  {
    image: "/images/aluminium-pergola-1.jpg",
    alt: "Aluminium louvered pergola with LED lighting children play area",
  },
  {
    image: "/images/aluminium-pergola-2.jpg",
    alt: "White aluminium pergola with outdoor dining set",
  },
  {
    image: "/images/aluminium-pergola-3.jpg",
    alt: "Glass aluminium pergola enclosure at night with string lights",
  },
  {
    image: "/images/aluminium-pergola-4.jpg",
    alt: "White free-standing aluminium pergola ocean view",
  },
  {
    image: "/images/aluminium-pergola-5.jpg",
    alt: "Dark charcoal aluminium pergola with outdoor kitchen BBQ",
  },
];

const poolFeatures = [
  "Quick installation — no excavation required",
  "Built for Florida's heat, humidity & salt air",
  "Customizable sizes and finishes",
  "Optional WPC decking surround",
  "Waterfall, lighting & heating upgrades available",
  "Structurally engineered for longevity",
];

const pergolaFeatures = [
  "Adjustable louvered roof — sun or shade on demand",
  "Powder-coated aluminium — rust and corrosion proof",
  "UV-resistant and weatherproof",
  "Available with integrated LED lighting",
  "Custom sizes to fit any outdoor space",
  "Zero maintenance required",
];

const fenceFeatures = [
  "Lightweight yet structurally strong",
  "Rust-proof powder-coated finish",
  "Available in custom heights and styles",
  "Ideal for pool enclosures and property lines",
  "Low maintenance — no painting or sealing",
  "Fast installation by certified professionals",
];

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      style={{ marginBottom: 60, maxWidth: 620 }}
    >
      <span style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--accent)",
        display: "block",
        marginBottom: 16,
      }}>
        {label}
      </span>
      <h2 style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "clamp(36px, 4.5vw, 56px)",
        color: "var(--dark)",
        lineHeight: 1.0,
        marginBottom: 20,
      }}>
        {title}
      </h2>
      <p style={{
        fontFamily: "var(--font-dm-sans)",
        fontSize: 15,
        color: "var(--text-secondary)",
        lineHeight: 1.65,
      }}>
        {subtitle}
      </p>
    </motion.div>
  );
}

function PhotoGrid({ images }: { images: { image: string; alt: string }[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 12,
        marginBottom: 20,
      }}
      className="photo-grid"
    >
      {images.map((img, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            aspectRatio: "4/3",
            background: "var(--surface)",
            cursor: "pointer",
          }}
        >
          <Image
            src={img.image}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(26,25,24,0.3) 0%, transparent 50%)",
            transition: "opacity 0.3s",
          }} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "12px 32px",
      marginTop: 8,
    }}>
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
        >
          <CheckCircle2 size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
          <span style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}>
            {f}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function OtherProductsPage() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "Other Products", content_category: "Fencing" });
  }, []);

  return (
    <>
      {/* Page Hero */}
      <section style={{
        background: "var(--dark)",
        padding: "140px 32px 80px",
        textAlign: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ maxWidth: 720, margin: "0 auto" }}
        >
          <span style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
            display: "block",
            marginBottom: 20,
          }}>
            More Ways to Transform Your Space
          </span>
          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(42px, 6vw, 72px)",
            color: "var(--white)",
            lineHeight: 1.0,
            marginBottom: 24,
          }}>
            Beyond WPC — Our Full Range of Outdoor Solutions
          </h1>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 16,
            color: "rgba(250,250,247,0.6)",
            lineHeight: 1.7,
            marginBottom: 36,
          }}>
            Container pools, aluminium pergolas, and aluminium fences — premium outdoor living products designed for South Florida&apos;s climate and lifestyle.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 14,
                fontWeight: 700,
                background: "var(--accent)",
                color: "var(--white)",
                borderRadius: 8,
                padding: "14px 28px",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              Get a Free Quote
            </a>
            <a
              href="https://wa.me/13059679202"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 14,
                fontWeight: 700,
                background: "rgba(250,250,247,0.1)",
                color: "var(--white)",
                border: "1px solid rgba(250,250,247,0.2)",
                borderRadius: 8,
                padding: "14px 28px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* Container Pools */}
      <section id="container-pools" style={{ background: "var(--background)", padding: "100px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            label="Container Pools"
            title="Your Dream Pool, Without the Excavation"
            subtitle="Container pools deliver a stunning, resort-quality swimming experience without the months of construction or high costs of traditional in-ground pools. Engineered for Florida's climate — salt-resistant, UV-proof, and built to last."
          />
          <PhotoGrid images={containerPools} />
          <div style={{
            background: "var(--surface)",
            borderRadius: 16,
            padding: "40px 40px",
            marginTop: 16,
          }}>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 20,
            }}>
              Why Choose a Container Pool
            </p>
            <FeatureList features={poolFeatures} />
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  background: "var(--dark)",
                  color: "var(--white)",
                  borderRadius: 8,
                  padding: "12px 24px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--dark)")}
              >
                Get a Pool Quote
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
              <a
                href="https://wa.me/13059679202"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  background: "var(--whatsapp)",
                  color: "var(--white)",
                  borderRadius: 8,
                  padding: "12px 24px",
                  textDecoration: "none",
                }}
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Aluminium Pergolas */}
      <section id="aluminium-pergolas" style={{ background: "var(--surface)", padding: "100px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            label="Aluminium Pergolas"
            title="Year-Round Outdoor Living — Built to Last"
            subtitle="Our aluminium pergolas combine architectural elegance with zero-maintenance engineering. Adjustable louvered roofs let you control sun and shade on demand, while powder-coated aluminium stands up to Florida's heat, humidity, and salt air indefinitely."
          />
          <PhotoGrid images={aluminiumPergolas} />
          <div style={{
            background: "var(--background)",
            borderRadius: 16,
            padding: "40px 40px",
            marginTop: 16,
          }}>
            <p style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 20,
            }}>
              Aluminium Pergola Features
            </p>
            <FeatureList features={pergolaFeatures} />
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="/#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  background: "var(--dark)",
                  color: "var(--white)",
                  borderRadius: 8,
                  padding: "12px 24px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--dark)")}
              >
                Get a Pergola Quote
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </a>
              <a
                href="https://wa.me/13059679202"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  fontWeight: 700,
                  background: "var(--whatsapp)",
                  color: "var(--white)",
                  borderRadius: 8,
                  padding: "12px 24px",
                  textDecoration: "none",
                }}
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Aluminium Fences */}
      <section id="aluminium-fences" style={{ background: "var(--background)", padding: "100px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHeader
            label="Aluminium Fences"
            title="Clean Lines, Lasting Strength"
            subtitle="Aluminium fencing delivers a sleek, modern look with none of the upkeep of wood or the rust risk of iron. Perfect for pool enclosures, property boundaries, and decorative applications across South Florida homes."
          />

          {/* Two-col layout: image + features */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
            className="fence-layout"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                aspectRatio: "4/3",
                background: "var(--surface)",
              }}
            >
              <Image
                src="/images/aluminium-fence-1.png"
                alt="Aluminium fence installation Miami South Florida"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 20,
              }}>
                Aluminium Fence Features
              </p>
              <FeatureList features={fenceFeatures} />
              <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="/#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13,
                    fontWeight: 700,
                    background: "var(--dark)",
                    color: "var(--white)",
                    borderRadius: 8,
                    padding: "12px 24px",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--dark)")}
                >
                  Get a Fence Quote
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
                <a
                  href="https://wa.me/13059679202"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13,
                    fontWeight: 700,
                    background: "var(--whatsapp)",
                    color: "var(--white)",
                    borderRadius: 8,
                    padding: "12px 24px",
                    textDecoration: "none",
                  }}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "var(--dark)", padding: "80px 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}
        >
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(32px, 4vw, 52px)",
            color: "var(--white)",
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Ready to Transform Your Outdoor Space?
          </h2>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 15,
            color: "rgba(250,250,247,0.55)",
            lineHeight: 1.65,
            marginBottom: 36,
          }}>
            Visit our showroom at 15431 W. Dixie Hwy, Unit 12, North Miami Beach — or get in touch and we&apos;ll come to you for a free consultation.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a
              href="tel:+13059679202"
              onClick={() => trackEvent("Contact", { method: "phone" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 14,
                fontWeight: 700,
                background: "var(--accent)",
                color: "var(--white)",
                borderRadius: 8,
                padding: "16px 32px",
                textDecoration: "none",
              }}
            >
              <Phone size={16} strokeWidth={2.5} />
              (305) 967-9202
            </a>
            <a
              href="https://wa.me/13059679202"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 14,
                fontWeight: 700,
                background: "var(--whatsapp)",
                color: "var(--white)",
                borderRadius: 8,
                padding: "16px 32px",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              WhatsApp Us
            </a>
          </div>
          <Link
            href="/#products"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              color: "rgba(250,250,247,0.45)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,247,0.45)")}
          >
            ← View our WPC Products
          </Link>
        </motion.div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .fence-layout {
            grid-template-columns: 1fr !important;
          }
          .photo-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .photo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
