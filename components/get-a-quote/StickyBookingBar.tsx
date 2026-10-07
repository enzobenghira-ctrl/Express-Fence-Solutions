"use client";

import { useEffect, useState } from "react";
import { CallButton, WhatsAppButton } from "@/components/get-a-quote/ContactButtons";

/**
 * /get-a-quote only, phones only (CSS): call + WhatsApp pinned to the bottom. Hidden while a
 * field in the form's details step is focused, so it never sits on top of what's being typed.
 */
export default function StickyBookingBar({ projectType }: { projectType?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const update = () => setHidden(Boolean((document.activeElement as HTMLElement | null)?.closest("[data-hide-sticky]")));
    // On focusout, activeElement is still the old field; check once focus has moved.
    const onFocusOut = () => setTimeout(update, 0);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <>
      {/* data-hidden → visibility: hidden, which also takes the links out of the tab order. */}
      <div className="efs-booking-bar" data-hidden={hidden || undefined}>
        <CallButton placement="sticky" className="efs-booking-bar-call">
          Call to book
        </CallButton>
        <WhatsAppButton placement="sticky" projectType={projectType} className="efs-booking-bar-wa">
          WhatsApp
        </WhatsAppButton>
      </div>
      {/* Room at the bottom of the page (phones only) so the bar never covers the footer. */}
      <style>{"@media (max-width: 767px) { body { padding-bottom: 68px; } }"}</style>
    </>
  );
}
