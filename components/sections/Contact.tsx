"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Phone, MessageCircle, MapPin, Mail, Home } from "lucide-react";

const CATALOG = "https://drive.google.com/file/d/1ppHVFNHBI4mRzAuBZgrRHWTiE0YpF2d6/view?usp=sharing";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", location: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us directly at (305) 967-9202.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-mobile"
      style={{ background: "var(--background)", padding: "100px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ maxWidth: 600, marginBottom: 60 }}
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
            Contact Us
          </span>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(32px, 4.5vw, 60px)",
              color: "var(--dark)",
              lineHeight: 1.0,
              marginBottom: 16,
            }}
          >
            Get your free quote.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.65,
            }}
          >
            We respond to every inquiry within 24 hours. Most projects get started within days of your first call.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
          className="contact-grid"
        >
          {/* Left — form + call card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Primary call CTA */}
            <div
              style={{
                background: "var(--dark)",
                borderRadius: 12,
                padding: "28px 32px",
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: "var(--background)",
                    marginBottom: 4,
                  }}
                >
                  Fastest way to get started?
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "rgba(250,250,247,0.5)" }}>
                  Give us a call — we&apos;ll quote you in the same conversation.
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
                  fontSize: 16,
                  fontWeight: 700,
                  borderRadius: 8,
                  padding: "13px 24px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <Phone size={16} strokeWidth={2.5} />
                (305) 967-9202
              </a>
            </div>

            {/* Form */}
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: 24,
                color: "var(--dark)",
                marginBottom: 24,
              }}
            >
              Or send a message
            </h3>

            {submitted ? (
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--accent-border)",
                  borderRadius: 12,
                  padding: 40,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "var(--accent-light)",
                    border: "1px solid var(--accent-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Check size={22} style={{ color: "var(--accent)" }} />
                </div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 22, color: "var(--dark)", marginBottom: 8 }}>
                  Message sent!
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)" }}>
                  We&apos;ll call you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
                  <input type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
                </div>
                <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} />
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="" disabled>Service...</option>
                    {["WPC Fences","WPC Pergolas","WPC Cladding","WPC Decking","WPC Gates","WPC Benches","Multiple Products","Not Sure Yet"].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <select name="location" value={form.location} onChange={handleChange} required>
                    <option value="" disabled>Location...</option>
                    <option>Miami / South Florida</option>
                    <option>Palm Beach County / Central Florida</option>
                    <option>Other</option>
                  </select>
                </div>
                <textarea name="message" placeholder="Tell us about your project..." value={form.message} onChange={handleChange} rows={4} style={{ resize: "vertical" }} />
                {error && (
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#c0392b", textAlign: "center" }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "var(--dark)",
                    color: "var(--white)",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: "16px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    width: "100%",
                    opacity: loading ? 0.7 : 1,
                    transition: "background 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = "var(--accent)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--dark)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}

            {/* Book a free in-home consultation — third option */}
            <Link
              href="/book-consultation"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "20px 24px",
                marginTop: 24,
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "var(--accent-light)",
                  border: "1px solid var(--accent-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Home size={20} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 700, color: "var(--dark)", marginBottom: 2 }}>
                  Book a Free In-Home Consultation
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--text-secondary)" }}>
                  Prefer we come to you? We&apos;ll bring samples and measure your property.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Right — info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/13059679202"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "20px 24px",
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#25D366";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MessageCircle size={20} style={{ color: "white" }} />
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 700, color: "var(--dark)", marginBottom: 2 }}>Chat on WhatsApp</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--text-secondary)" }}>Quick replies · Preferred in Miami</p>
              </div>
            </a>

            {/* Catalog */}
            <a
              href={CATALOG}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "20px 24px",
                textDecoration: "none",
                transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: "var(--accent-light)",
                  border: "1px solid var(--accent-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 20,
                }}
              >
                📄
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 700, color: "var(--dark)", marginBottom: 2 }}>Download Product Catalog</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--text-secondary)" }}>Full specs, colors & pricing guide</p>
              </div>
            </a>

            {/* Contact details */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "24px",
              }}
            >
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 16 }}>
                Contact Info
              </p>
              {[
                { icon: <Phone size={14} />, text: "(305) 967-9202", href: "tel:+13059679202" },
                { icon: <Phone size={14} />, text: "(786) 403-2322", href: "tel:+17864032322" },
                { icon: <Mail size={14} />, text: "Info@expressfencesolutions.com", href: "mailto:Info@expressfencesolutions.com" },
                { icon: <MapPin size={14} />, text: "Miami & Palm Beach County, FL", href: null },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < 3 ? 12 : 0 }}>
                  <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dark)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >{item.text}</a>
                  ) : (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)" }}>{item.text}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Trust */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Response within 24 hours", "Free quotes always", "Serving Miami & Palm Beach County"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Check size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Partner / trade callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="partner-callout"
          style={{
            marginTop: 56,
            padding: "40px 48px",
            background: "var(--dark)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2.6vw, 26px)",
                color: "var(--background)",
                marginBottom: 8,
              }}
            >
              Are you a contractor, developer, or builder?
            </p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "rgba(250,250,247,0.55)", lineHeight: 1.6 }}>
              We supply and install premium WPC products across South Florida projects — let&apos;s talk volume pricing and partnerships.
            </p>
          </div>
          <Link
            href="/partner"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--accent)",
              color: "var(--white)",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 8,
              padding: "14px 26px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Explore Partnerships →
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .partner-callout { padding: 32px 24px !important; flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
