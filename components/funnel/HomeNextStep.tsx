"use client";

import { useEffect, useState } from "react";
import BookingForm, { type BookingFormInitial } from "@/components/booking/BookingForm";
import CalendarEmbed from "@/components/funnel/CalendarEmbed";
import Confirmation from "@/components/funnel/Confirmation";
import { readLastLead, type LastLead } from "@/lib/last-lead";
import { SITE } from "@/lib/site-config";

// /get-a-quote project types → the in-house booking form's project types.
const BOOKING_PROJECT: Record<string, string> = {
  fence: "WPC Fences",
  gate: "Gates",
  decking: "Decking",
  cladding: "Cladding",
  pergola: "Pergolas",
  "outdoor-living-package": "Outdoor Living",
  "container-pool": "Container Pools",
};

/**
 * The /thank-you-home action. Leads routed to a partner installer (small or out-of-area
 * jobs) get a call instead of a consultation slot; everyone else books the consultation —
 * on the external scheduler when CALENDAR_HOME_URL is set, otherwise in-house, pre-filled.
 */
export default function HomeNextStep({ calendarUrl }: { calendarUrl?: string }) {
  const [lead, setLead] = useState<LastLead | null | undefined>(undefined);

  useEffect(() => {
    setLead(readLastLead());
  }, []);

  if (lead === undefined) return <div style={{ minHeight: 420 }} aria-busy="true" />;

  if (lead?.kind === "home_quote" && lead.route === "partner_referral") {
    return (
      <Confirmation title="We've got your request">
        We&apos;ll call you shortly to talk through your project and the best way to get it built. Questions in the meantime? Call{" "}
        <a href={SITE.phone.href} className="efs-link" style={{ fontWeight: 600 }}>
          {SITE.phone.display}
        </a>
        .
      </Confirmation>
    );
  }

  const c = lead?.kind === "home_quote" ? lead.contact : {};
  const initial: BookingFormInitial = {
    projectTypes: c.projectType && BOOKING_PROJECT[c.projectType] ? [BOOKING_PROJECT[c.projectType]] : undefined,
    zip: c.zip,
    name: c.contactName,
    email: c.email,
    phone: c.phone,
  };

  return <CalendarEmbed url={calendarUrl} title="Book your design consultation" scheduledEvent="Schedule_Home" fallback={<BookingForm initial={initial} />} />;
}
