import { DIRECTIONS_URL, SITE, formatAddress } from "@/lib/site-config";

/** Minimal footer for funnel pages: business details only, no navigation links. */
export default function FunnelFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
        padding: "28px clamp(16px, 4vw, 32px)",
        fontFamily: "var(--font-dm-sans)",
        fontSize: 13,
        color: "var(--text-secondary)",
        textAlign: "center",
        lineHeight: 1.7,
      }}
    >
      <p>
        {SITE.legalName} · Showroom: {formatAddress()} (
        <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="efs-link" style={{ fontWeight: 600 }}>
          directions
        </a>
        ) ·{" "}
        <a href={SITE.phone.href} className="efs-link" style={{ fontWeight: 600 }}>
          {SITE.phone.display}
        </a>
      </p>
      <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
    </footer>
  );
}
