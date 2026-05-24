"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const images = [
  { src: "/images/gate-wood-black-miami.jpg",       alt: "WPC wood-look gate with black aluminum frame Miami" },
  { src: "/images/fence-charcoal-white-frame.jpg",  alt: "Charcoal WPC fence with white aluminum frame Miami" },
  { src: "/images/fence-waterway-turf.jpg",          alt: "Charcoal WPC fence along waterfront with turf Miami" },
  { src: "/images/fence-black-modern-home.jpg",      alt: "Black WPC horizontal fence modern home Miami" },
  { src: "/images/gate-charcoal-single.jpg",         alt: "Charcoal WPC single gate white frame close up" },
  { src: "/images/pergola-key-west.jpeg",              alt: "WPC pergola waterfront Key West outdoor living" },
  { src: "/images/gate-double-swing-render.png",     alt: "Double swing WPC gate render warm wood tone" },
  { src: "/images/fence-grey-decorative-top.png",    alt: "Grey WPC fence with decorative laser-cut top panel" },
  { src: "/images/fence-beige-miami.png",            alt: "Beige WPC fence Miami backyard with turf" },
  { src: "/images/decking-aerial-waterfront.png",    alt: "WPC decking aerial view Miami waterfront dock" },
  { src: "/images/decking-pergola-aerial.png",       alt: "WPC decking and pergola aerial outdoor kitchen Miami" },
  { src: "/images/fence-tropical-lounge.png",        alt: "WPC fence tropical garden with lounge chairs" },
  { src: "/images/wall-slat-interior.png",           alt: "WPC wood slat interior wall panel living room" },
];

const bgColors = [
  "#C8B898", "#C0BAB0", "#B8B8B0", "#C8C2B0",
  "#B8B4A8", "#D0CAB8", "#C4B898", "#C8C8B8",
  "#D4CFC0", "#BEB8A8", "#C4C0B0", "#C0BAA8",
  "#BEB4A4",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="section-mobile"
      style={{ background: "var(--surface)", padding: "100px 32px" }}
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
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 20,
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
                display: "block",
                marginBottom: 12,
              }}
            >
              Our Work
            </span>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "var(--dark)",
                lineHeight: 1.0,
              }}
            >
              Installed across South Florida.
            </h2>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--dark)",
              textDecoration: "none",
              background: "var(--white)",
              border: "1px solid var(--border-strong)",
              borderRadius: 8,
              padding: "12px 20px",
              transition: "border-color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
          >
            Start your project
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </motion.div>

        {/* Masonry grid */}
        <div
          style={{ columns: 3, columnGap: 12 }}
          className="gallery-masonry"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.3) }}
              style={{
                position: "relative",
                marginBottom: 12,
                borderRadius: 10,
                overflow: "hidden",
                breakInside: "avoid",
                background: bgColors[i % bgColors.length],
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={i % 4 === 0 ? 500 : i % 3 === 0 ? 380 : 300}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.opacity = "0";
                  el.parentElement!.style.minHeight = i % 4 === 0 ? "280px" : "180px";
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="gallery-cta"
          style={{
            marginTop: 64,
            padding: "48px",
            background: "var(--dark)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "clamp(22px, 3vw, 32px)",
                color: "var(--background)",
                marginBottom: 6,
              }}
            >
              Like what you see?
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color: "rgba(250,250,247,0.55)",
              }}
            >
              Call us and let&apos;s design your project today.
            </p>
          </div>
          <a
            href="tel:+13059679202"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--accent)",
              color: "var(--white)",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 18,
              fontWeight: 700,
              borderRadius: 8,
              padding: "16px 36px",
              textDecoration: "none",
              transition: "opacity 0.2s, transform 0.15s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            📞 (305) 967-9202
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .gallery-masonry { columns: 1; }
        @media (min-width: 640px) { .gallery-masonry { columns: 2; } }
        @media (min-width: 1024px) { .gallery-masonry { columns: 3; } }
      `}</style>
    </section>
  );
}
