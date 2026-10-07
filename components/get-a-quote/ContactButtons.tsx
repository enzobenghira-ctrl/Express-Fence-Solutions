"use client";

import type { CSSProperties, ReactNode } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { BOOKING_SOURCE, whatsAppBookingUrl } from "@/lib/get-a-quote/booking";
import { trackEvent } from "@/lib/metaEvents";
import { SITE } from "@/lib/site-config";

/** Where on /get-a-quote a call or WhatsApp button sits — sent as the Contact event's `placement`. */
export type ContactPlacement = "hero" | "closing" | "sticky" | "out_of_area" | "confirmation";

/** Meta "Contact" (pixel + CAPI, one event id) with { method, placement }. */
function trackContact(method: "phone" | "whatsapp", placement: ContactPlacement) {
  trackEvent("Contact", { method, placement, source: BOOKING_SOURCE });
}

interface ButtonProps {
  placement: ContactPlacement;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** The number never breaks across lines. */
export function PhoneNumber() {
  return <span style={{ whiteSpace: "nowrap" }}>{SITE.phone.display}</span>;
}

/** Tap-to-call. Default label: "Call to book your visit — (305) 967-9202". */
export function CallButton({ placement, className = "efs-btn efs-btn--primary", style, children }: ButtonProps) {
  return (
    <a href={SITE.phone.href} className={className} style={style} onClick={() => trackContact("phone", placement)}>
      <Phone size={20} aria-hidden style={{ flexShrink: 0 }} />
      <span>{children ?? <>Call to book your visit — <PhoneNumber /></>}</span>
    </a>
  );
}

/** WhatsApp chat with a pre-filled booking message (naming the project when we know it). */
export function WhatsAppButton({ placement, projectType, className = "efs-btn efs-btn--secondary", style, children }: ButtonProps & { projectType?: string }) {
  return (
    <a
      href={whatsAppBookingUrl(projectType)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={() => trackContact("whatsapp", placement)}
    >
      <MessageCircle size={20} aria-hidden style={{ flexShrink: 0 }} />
      {children ?? "Book on WhatsApp"}
    </a>
  );
}
