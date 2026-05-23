"use client";

export default function MobileCTABar() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        height: 68,
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
        display: "flex",
      }}
      className="md:hidden"
    >
      <a
        href="tel:+13059679202"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--accent)",
          color: "var(--background)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 15,
          fontWeight: 700,
          textDecoration: "none",
          gap: 6,
        }}
      >
        📞 Call Now
      </a>
      <a
        href="https://wa.me/13059679202"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--whatsapp)",
          color: "white",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
          gap: 6,
        }}
      >
        💬 WhatsApp
      </a>
    </div>
  );
}
