"use client";

export default function StickyBookCTA() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        padding: 12,
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
      }}
      className="md:hidden"
    >
      <a
        href="#book-form"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#book-form")?.scrollIntoView({ behavior: "smooth" });
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--accent)",
          color: "var(--white)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 15,
          fontWeight: 700,
          borderRadius: 8,
          padding: "16px",
          textDecoration: "none",
        }}
      >
        Book My Free Consultation
      </a>
    </div>
  );
}
