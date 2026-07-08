"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const finishes = [
  {
    name: "Teak",
    image: "/images/gate-wood-black-miami.jpg",
    alt: "teak WPC composite fence and pedestrian gate installed at a Miami home",
    desc: "Warm, natural wood tones with the depth of real teak. The classic choice for tropical landscaping and Mediterranean homes.",
  },
  {
    name: "Dark Grey",
    image: "/images/gate-charcoal-single.jpg",
    alt: "dark grey WPC composite fence panels and gate installation in South Florida",
    desc: "A deep charcoal grey that pairs with modern architecture, white stucco, and black window frames. Our most requested finish.",
  },
  {
    name: "Antique Driftwood",
    image: "/images/fence-beige-miami.png",
    alt: "antique driftwood WPC composite fence in a Miami-Dade backyard with tropical landscaping",
    desc: "A weathered, light-sand finish that brightens the yard and holds its color under the hardest South Florida sun.",
  },
];

export default function FenceMiamiFinishes() {
  return (
    <section
      className="section-mobile"
      style={{ background: "var(--surface)", padding: "90px 32px", borderTop: "1px solid var(--border)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 52 }}
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
            Three Finishes
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(30px, 4vw, 48px)",
              color: "var(--dark)",
              lineHeight: 1.05,
            }}
          >
            WPC Fence Finishes: Teak, Dark Grey &amp; Antique Driftwood
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="fence-miami-finishes-grid"
        >
          {finishes.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              style={{
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "4 / 3" }}>
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 760px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "24px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: 24,
                    fontWeight: 500,
                    color: "var(--dark)",
                    marginBottom: 8,
                  }}
                >
                  {f.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.65,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .fence-miami-finishes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
