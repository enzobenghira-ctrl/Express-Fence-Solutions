"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { trackFunnelClick } from "@/lib/analytics";
import type { Funnel } from "@/lib/site-config";

/** Text-style funnel link (FunnelButton's inline sibling) that fires FunnelClick. */
export default function FunnelLink({
  href,
  funnel,
  children,
  className = "efs-link",
  style,
}: {
  href: string;
  funnel: Funnel;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Link href={href} className={className} style={style} onClick={() => trackFunnelClick(funnel, typeof children === "string" ? children : href)}>
      {children}
    </Link>
  );
}
