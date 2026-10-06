import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import ContainerScheduleCard from "@/components/funnel/ContainerScheduleCard";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import { LEAD_FORMS } from "@/lib/forms/registry";
import Confirmation from "@/components/funnel/Confirmation";
import { FUNNEL_ENTRY, SITE } from "@/lib/site-config";
import { robotsFor } from "@/lib/content-readiness";

export const metadata: Metadata = {
  title: "Container Schedule — Reserve WPC Pallets | Express Fence Solutions Trade",
  description: "See when the next WPC container arrives and how much is already allocated. Trade partners reserve pallets ahead of arrival.",
  alternates: { canonical: `${SITE.url}/trade/container-schedule` },
  // Unlisted + noindex until the next arrival month is set (lib/content-readiness.ts).
  robots: robotsFor("/trade/container-schedule"),
};

interface Props {
  searchParams: { sent?: string };
}

// Primary action for new visitors: apply to reserve. Existing partners reserve pallets below.
export default function ContainerSchedulePage({ searchParams }: Props) {
  const sent = searchParams.sent === "1";

  return (
    <SiteShell mobileBar="trade">
      <main>
        <Hero
          eyebrow="Container schedule"
          title="Reserve space on the next container"
          subtitle="In-stock items ship now. Larger orders ship on the next container — trade partners reserve pallets ahead of arrival."
          primary={{ label: "Apply to reserve", href: FUNNEL_ENTRY.tradeApply }}
          aside={<ContainerScheduleCard />}
        />

        <section id="reserve" className="efs-section" style={{ background: "var(--background)" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span className="efs-eyebrow">Existing partners</span>
              <h2 className="efs-h2">Reserve pallets</h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)", marginTop: 12 }}>
                Not a partner yet? Apply first — reservations are confirmed for approved trade accounts.
              </p>
            </div>
            {sent ? (
              <Confirmation title="Reservation request received">
                We&apos;ll confirm your pallets and pricing by phone. Questions? Call{" "}
                <a href={SITE.phone.href} className="efs-link" style={{ fontWeight: 600 }}>
                  {SITE.phone.display}
                </a>
                .
              </Confirmation>
            ) : (
              <MultiStepForm kind="pallet_reservation" steps={LEAD_FORMS.pallet_reservation.steps} submitLabel="Send reservation" successHref="/trade/container-schedule?sent=1#reserve" />
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
