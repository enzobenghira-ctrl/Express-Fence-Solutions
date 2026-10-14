"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { readLastLead } from "@/lib/last-lead";
import { SITE } from "@/lib/site-config";

// The lead API saves every request before delivering it, so it always answers "ok" — but
// when delivery to the inbox/CRM failed it adds `delivered: false`, and the confirmation
// shows this line so the customer can reach us if nobody calls.

const STYLE: CSSProperties = { fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)" };

export function DeliveryFallbackLine({ style }: { style?: CSSProperties }) {
  return (
    <p style={{ ...STYLE, ...style }}>
      If you don&apos;t hear from us today, call{" "}
      <a href={SITE.phone.href} style={{ color: "var(--dark)", fontWeight: 700, whiteSpace: "nowrap" }}>
        {SITE.phone.display}
      </a>
      .
    </p>
  );
}

/** For thank-you pages reached after MultiStepForm: shows the line if that submission wasn't delivered. */
export default function LastLeadDeliveryNotice({ style }: { style?: CSSProperties }) {
  const [undelivered, setUndelivered] = useState(false);
  useEffect(() => setUndelivered(readLastLead()?.delivered === false), []);
  return undelivered ? <DeliveryFallbackLine style={style} /> : null;
}
