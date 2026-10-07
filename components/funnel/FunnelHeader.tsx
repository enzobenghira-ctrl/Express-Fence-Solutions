import Image from "next/image";
import HomeLink from "@/components/funnel/HomeLink";
import { SITE } from "@/lib/site-config";

/**
 * Landing / application / thank-you pages: logo only, no navigation — the page's one
 * action stays the focus. The logo and name still link home (owner's request: it must
 * always lead back to the homepage hero).
 */
export default function FunnelHeader() {
  return (
    <header
      style={{
        height: "var(--nav-h)",
        borderBottom: "1px solid var(--border)",
        background: "var(--background)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)", width: "100%" }}>
        <HomeLink style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div className="nav-logo-img" style={{ position: "relative", height: 60, width: 60, flexShrink: 0 }}>
            <Image src="/images/logo-transparent.png" alt="" fill sizes="60px" style={{ objectFit: "contain" }} priority />
          </div>
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(19px, 5vw, 24px)",
              fontWeight: 600,
              color: "var(--accent-text)",
              whiteSpace: "nowrap",
            }}
          >
            {SITE.name}
          </span>
        </HomeLink>
      </div>
    </header>
  );
}
