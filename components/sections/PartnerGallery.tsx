"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Same masonry layout as the homepage Gallery section. width/height are each
// photo's real pixel dimensions so it displays at its true aspect ratio
// instead of being cropped to a fixed box.
const photos: { image: string; alt: string; width: number; height: number }[] = [
  { image: "/images/fence-modern-home-driveway.png", alt: "WPC fence modern white home driveway Miami", width: 768, height: 1376 },
  { image: "/images/container-pool-pergola-daytime.png", alt: "Container pool with wood pergola daytime backyard", width: 896, height: 1200 },
  { image: "/images/fence-backyard-lawn-garden.png", alt: "WPC fence backyard lawn and garden Miami", width: 3072, height: 5504 },
  { image: "/images/container-pool-pergola-sunset-party.png", alt: "Container pool with aluminum pergola sunset gathering", width: 3712, height: 4608 },
  { image: "/images/aluminum-pergola-pool-sunset.png", alt: "White aluminum pergola with lounge chairs poolside sunset", width: 1376, height: 768 },
  { image: "/images/container-pool-backyard-pergola-day.png", alt: "Container pool with wood pergola dining area backyard", width: 3712, height: 4608 },
  { image: "/images/aluminum-pergola-waterfront-sunset.png", alt: "Aluminum pergola waterfront Miami skyline sunset", width: 3712, height: 4608 },
];

export default function PartnerGallery() {
  return (
    <section className="section-mobile" style={{ background: "var(--surface)", padding: "100px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ maxWidth: 600, marginBottom: 48 }}
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
            Project Gallery
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
            What your projects could look like.
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65 }}>
            A look at the finish quality, consistency, and range your projects can carry our name into.
          </p>
        </motion.div>

        <div style={{ columns: 3, columnGap: 12 }} className="partner-gallery-masonry">
          {photos.map((p, i) => (
            <motion.div
              key={p.image}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.3) }}
              style={{
                marginBottom: 12,
                borderRadius: 10,
                overflow: "hidden",
                breakInside: "avoid",
              }}
            >
              <Image
                src={p.image}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .partner-gallery-masonry {
          columns: 1;
        }
        @media (min-width: 640px) {
          .partner-gallery-masonry {
            columns: 2;
          }
        }
        @media (min-width: 1024px) {
          .partner-gallery-masonry {
            columns: 3;
          }
        }
      `}</style>
    </section>
  );
}
