"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  /** Runs on every click, e.g. to close the mobile menu. */
  onClick?: () => void;
}

const SCROLL_FLAG = "efs_home_top";

/**
 * The top-left logo and name: always back to the homepage hero. From another page it
 * links home and lands at the very top (Next only scrolls the new page "into view", which
 * can stop a few pixels short); on the homepage itself — even mid-page or on a #section —
 * it clears the hash and scrolls back up to the hero.
 */
export default function HomeLink({ children, style, onClick }: Props) {
  // Arriving on the homepage from the logo: finish at the exact top.
  useEffect(() => {
    if (window.location.pathname !== "/") return;
    try {
      if (!window.sessionStorage.getItem(SCROLL_FLAG)) return;
      window.sessionStorage.removeItem(SCROLL_FLAG);
    } catch {
      return;
    }
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
  }, []);

  return (
    <Link
      href="/"
      aria-label="Express Fence Solutions — home"
      style={style}
      onClick={(e) => {
        onClick?.();
        if (window.location.pathname !== "/") {
          try {
            window.sessionStorage.setItem(SCROLL_FLAG, "1");
          } catch {
            // Storage blocked: the browser's own scroll-to-top still applies.
          }
          return;
        }
        e.preventDefault();
        if (window.location.hash || window.location.search) window.history.replaceState(window.history.state, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {children}
    </Link>
  );
}
