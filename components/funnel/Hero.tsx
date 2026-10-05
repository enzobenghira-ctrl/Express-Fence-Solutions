import type { ReactNode } from "react";
import FunnelImage from "@/components/funnel/FunnelImage";
import FunnelButton, { type FunnelCTA } from "@/components/funnel/FunnelButton";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Shown full-bleed behind the copy with a dark overlay. Real photos only on funnel pages. */
  image?: { src: string; alt: string; position?: string };
  primary?: FunnelCTA;
  secondary?: FunnelCTA;
  trustItems?: string[];
  /** Beside the copy on desktop, below it on mobile — e.g. the landing-page form, above the fold. */
  aside?: ReactNode;
  /** True under SiteShell's fixed header; false under FunnelShell's static header. */
  offsetForHeader?: boolean;
}

export default function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  primary,
  secondary,
  trustItems,
  aside,
  offsetForHeader = true,
}: Props) {
  const onImage = Boolean(image);
  const textColor = onImage ? "var(--white)" : "var(--dark)";
  const mutedColor = onImage ? "rgba(255,255,255,0.82)" : "var(--text-secondary)";

  const copy = (
    <div style={{ maxWidth: aside ? 560 : 640 }}>
      {eyebrow &&
        (onImage ? (
          <span
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "var(--white)",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: 100,
              padding: "6px 14px",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </span>
        ) : (
          <span className="efs-eyebrow">{eyebrow}</span>
        ))}

      <h1
        style={{
          fontFamily: "var(--font-cormorant)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: aside ? "clamp(40px, 5.5vw, 68px)" : "clamp(44px, 6.5vw, 84px)",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: textColor,
          marginBottom: 20,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 17,
            lineHeight: 1.65,
            color: mutedColor,
            maxWidth: 500,
            marginBottom: primary || secondary ? 36 : 0,
          }}
        >
          {subtitle}
        </p>
      )}

      {(primary || secondary) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {primary && (
            <FunnelButton href={primary.href} funnel={primary.funnel} variant={onImage ? "light" : "primary"}>
              {primary.label}
            </FunnelButton>
          )}
          {secondary && (
            <FunnelButton href={secondary.href} funnel={secondary.funnel} variant={onImage ? "outline-light" : "secondary"}>
              {secondary.label}
            </FunnelButton>
          )}
        </div>
      )}

      {trustItems && trustItems.length > 0 && (
        <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: "10px 24px", marginTop: 36 }}>
          {trustItems.map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                fontWeight: 500,
                color: mutedColor,
              }}
            >
              <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: onImage ? "var(--dark)" : "var(--surface)",
        minHeight: onImage && !aside ? "min(88vh, 780px)" : undefined,
        display: "flex",
        alignItems: "center",
      }}
    >
      {image && (
        <>
          <FunnelImage
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: image.position ?? "center" }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: aside
                ? "linear-gradient(105deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.5) 60%, rgba(10,10,10,0.4) 100%)"
                : "linear-gradient(105deg, rgba(10,10,10,0.62) 0%, rgba(10,10,10,0.3) 60%, rgba(10,10,10,0.1) 100%)",
            }}
          />
        </>
      )}

      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: `${offsetForHeader ? "calc(var(--header-h) + clamp(32px, 6vw, 72px))" : "clamp(32px, 6vw, 72px)"} clamp(20px, 4vw, 32px) clamp(48px, 7vw, 88px)`,
        }}
      >
        {aside ? (
          <div className="efs-hero-grid">
            {copy}
            <div>{aside}</div>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
}
