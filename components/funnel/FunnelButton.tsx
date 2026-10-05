"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackFunnelClick } from "@/lib/analytics";
import type { Funnel } from "@/lib/site-config";

export interface FunnelCTA {
  label: string;
  href: string;
  /** Set on shared pages so the click fires FunnelClick. Leave unset inside a funnel. */
  funnel?: Funnel;
}

interface Props {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "outline-light";
  size?: "md" | "sm";
  block?: boolean;
  funnel?: Funnel;
  className?: string;
}

export default function FunnelButton({ href, children, variant = "primary", size = "md", block, funnel, className }: Props) {
  const classes = ["efs-btn", `efs-btn--${variant}`, size === "sm" && "efs-btn--sm", block && "efs-btn--block", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      className={classes}
      onClick={funnel ? () => trackFunnelClick(funnel, typeof children === "string" ? children : href) : undefined}
    >
      {children}
    </Link>
  );
}
