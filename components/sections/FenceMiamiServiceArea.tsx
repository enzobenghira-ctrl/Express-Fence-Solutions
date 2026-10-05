"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { DIRECTIONS_URL, SITE } from "@/lib/site-config";

// Miami-Dade and Broward communities — this page targets the Miami market.
const cities = [
  "Miami",
  "North Miami Beach",
  "North Miami",
  "Aventura",
  "Miami Gardens",
  "Miami Beach",
  "Doral",
  "Kendall",
  "Coral Gables",
  "Pinecrest",
  "Palmetto Bay",
  "Hialeah",
  "Hollywood",
  "Pembroke Pines",
  "Fort Lauderdale",
  "Miramar",
  "Davie",
  "Plantation",
  "Weston",
  "Pompano Beach",
];

export default function FenceMiamiServiceArea() {
  return (
    <section
      className="section-mobile"
      style={{ background: "var(--background)", padding: "90px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 40 }}
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
            Where We Work
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(30px, 4vw, 48px)",
              color: "var(--dark)",
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Fence Installation from Miami-Dade to Okeechobee
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            We&apos;re a family-owned company installing across {SITE.serviceArea}, with our showroom at{" "}
            {SITE.address.street}, {SITE.address.city}.{" "}
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-text)", fontWeight: 600 }}>
              Get directions
            </a>
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 auto",
            maxWidth: 900,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {cities.map((city) => (
            <li
              key={city}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 100,
                padding: "8px 16px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                color: "var(--text-secondary)",
              }}
            >
              <MapPin size={12} style={{ color: "var(--accent)", flexShrink: 0 }} />
              {city}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
