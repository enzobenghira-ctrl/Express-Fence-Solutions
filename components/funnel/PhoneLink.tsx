"use client";

import type { CSSProperties, ReactNode } from "react";
import { trackEvent } from "@/lib/metaEvents";
import { SITE } from "@/lib/site-config";

/** tel: link that fires Meta "Contact" — usable from server components. */
export default function PhoneLink({ children, className, style }: { children?: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <a href={SITE.phone.href} className={className} style={style} onClick={() => trackEvent("Contact", { method: "phone" })}>
      {children ?? SITE.phone.display}
    </a>
  );
}
