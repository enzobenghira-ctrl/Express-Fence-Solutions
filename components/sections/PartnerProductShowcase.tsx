"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { productsData } from "@/lib/products-data";

const CATALOG = "https://drive.google.com/file/d/1ppHVFNHBI4mRzAuBZgrRHWTiE0YpF2d6/view?usp=sharing";

const otherProducts = [
  {
    name: "Aluminum Pergolas",
    tagline: "Adjustable Louvered Roofs",
    href: "/other-products#aluminium-pergolas",
    image: "/images/aluminium-pergola-1.jpg",
    alt: "Aluminium louvered pergola Miami",
  },
  {
    name: "Aluminum Fences",
    tagline: "Clean Lines, Lasting Strength",
    href: "/other-products#aluminium-fences",
    image: "/images/aluminium-fence-1.png",
    alt: "Aluminium fence installation Miami South Florida",
  },
  {
    name: "Container Pools",
    tagline: "Resort-Quality, No Excavation",
    href: "/other-products#container-pools",
    image: "/images/container-pool-1.jpg",
    alt: "Container pool with waterfall feature backyard Miami",
  },
];

export default function PartnerProductShowcase() {
  return (
    <section className="section-mobile" style={{ background: "var(--surface)", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ maxWidth: 640, marginBottom: 48 }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              display: "block",
              marginBottom: 16,
            }}
          >
            Product Line
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              color: "var(--dark)",
              lineHeight: 1.0,
              marginBottom: 16,
            }}
          >
            Nine product lines, ready to spec.
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 20 }}>
            Full specs, dimensions, and finish options across our six WPC lines — fences, pergolas, decking, cladding, gates, and benches — plus aluminum pergolas, aluminum fences, and container pools. Everything you need to write us into a bid.
          </p>
          <a
            href={CATALOG}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
              borderBottom: "1px solid var(--accent-border)",
              paddingBottom: 2,
            }}
          >
            Download Full Product Catalog
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </motion.div>

        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: 16,
          }}
        >
          WPC Product Line
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="partner-product-grid">
          {productsData.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3), ease: "easeOut" }}
            >
              <Link
                href={`/products/${p.slug}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "relative", height: 160, background: p.bg }}>
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 19, color: "var(--dark)", marginBottom: 4 }}>
                    {p.name}
                  </h3>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    Spec sheet
                    <ArrowUpRight size={12} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginTop: 40,
            marginBottom: 16,
          }}
        >
          Also Available — Aluminum &amp; Pool Solutions
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="partner-product-grid">
          {otherProducts.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3), ease: "easeOut" }}
            >
              <Link
                href={p.href}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  background: "var(--white)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div className="img-placeholder" style={{ position: "relative", height: 160 }}>
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 19, color: "var(--dark)", marginBottom: 4 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
                    {p.tagline}
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    Learn more
                    <ArrowUpRight size={12} strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .partner-product-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          .partner-product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
