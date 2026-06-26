"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Phone, Mail } from "lucide-react";

const ROLES = [
  "General Contractor",
  "Developer",
  "Builder",
  "Architect",
  "Designer",
  "Property Manager",
  "Other",
];

export default function PartnerContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    role: "",
    email: "",
    phone: "",
    projectType: "",
    volume: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/partner-inquiry", {
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
      id="partner-contact"
      className="section-mobile"
      style={{ background: "var(--background)", padding: "100px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
            Become a Partner
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
            Let&apos;s talk partnership.
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.65 }}>
            Tell us about your business and project pipeline. We respond to every trade inquiry within 24 hours.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="contact-grid">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
                  Inquiry sent!
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--text-secondary)" }}>
                  We&apos;ll be in touch within 24 hours to talk partnership.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input type="text" name="companyName" placeholder="Company name" value={form.companyName} onChange={handleChange} required />
                  <input type="text" name="contactName" placeholder="Contact name" value={form.contactName} onChange={handleChange} required />
                </div>
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <select name="role" value={form.role} onChange={handleChange} required>
                    <option value="" disabled>Role / Title...</option>
                    {ROLES.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  <input type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
                </div>
                <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
                <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input type="text" name="projectType" placeholder="Project type (e.g. Fencing, Decking)" value={form.projectType} onChange={handleChange} />
                  <input type="text" name="volume" placeholder="Est. volume / # of projects (optional)" value={form.volume} onChange={handleChange} />
                </div>
                <textarea name="message" placeholder="Tell us about your pipeline..." value={form.message} onChange={handleChange} rows={4} style={{ resize: "vertical" }} />
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
                  {loading ? "Sending…" : "Become a Partner"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "24px",
              }}
            >
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 16 }}>
                Talk to Us Directly
              </p>
              {[
                { icon: <Phone size={14} />, text: "(305) 967-9202", href: "tel:+13059679202" },
                { icon: <Phone size={14} />, text: "(786) 403-2322", href: "tel:+17864032322" },
                { icon: <Mail size={14} />, text: "Info@expressfencesolutions.com", href: "mailto:Info@expressfencesolutions.com" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < 2 ? 12 : 0 }}>
                  <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                  <a
                    href={item.href}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--dark)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {item.text}
                  </a>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Response within 24 hours", "Trade & volume pricing available", "Supply-only or full install"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Check size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--text-secondary)" }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
