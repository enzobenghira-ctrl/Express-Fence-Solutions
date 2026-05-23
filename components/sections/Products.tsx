"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { productsData } from "@/lib/products-data";

const CATALOG = "https://drive.google.com/file/d/1ppHVFNHBI4mRzAuBZgrRHWTiE0YpF2d6/view?usp=sharing";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Products() {
  return (
    <section
      id="products"
      style={{ background: "var(--background)", padding: "100px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginBottom: 60,
            maxWidth: 600,
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
              marginBottom: 16,
            }}
          >
            Our Products
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.5vw, 56px)",
              color: "var(--dark)",
              lineHeight: 1.0,
              marginBottom: 20,
            }}
          >
            WPC Outdoor Solutions
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              marginBottom: 24,
            }}
          >
            Six premium product lines. All made from Wood Plastic Composite — the material that looks like real wood but never warps, rots, or needs maintenance.
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
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--accent-border)")}
          >
            Download Full Product Catalog
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </motion.div>

        {/* Product grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 2,
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {productsData.map((p) => (
            <motion.div
              key={p.num}
              variants={cardVariants}
              style={{
                background: "var(--white)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover="hover"
              initial="rest"
            >
              {/* Entire card is a link to the detail page */}
              <Link
                href={`/products/${p.slug}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                {/* Image */}
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    position: "relative",
                    height: 220,
                    background: p.bg,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Product number overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: 4,
                      padding: "4px 8px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--text-secondary)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.num}
                  </div>
                  {/* "Learn More" hover badge */}
                  <motion.div
                    variants={{
                      rest: { opacity: 0, y: 6 },
                      hover: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      bottom: 14,
                      left: 14,
                      background: "rgba(28,28,26,0.85)",
                      backdropFilter: "blur(6px)",
                      borderRadius: 6,
                      padding: "6px 12px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      letterSpacing: "0.03em",
                    }}
                  >
                    Learn More
                    <ArrowUpRight size={12} strokeWidth={2.5} />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div style={{ padding: "24px 28px 28px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: 6,
                    }}
                  >
                    {p.tagline}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontStyle: "italic",
                      fontSize: 26,
                      fontWeight: 500,
                      color: "var(--dark)",
                      marginBottom: 10,
                      lineHeight: 1.1,
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: 20,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    View Details
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
