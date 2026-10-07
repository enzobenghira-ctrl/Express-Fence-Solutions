import type { Metadata } from "next";
import FunnelShell from "@/components/funnel/FunnelShell";
import TestimonialBlock from "@/components/funnel/TestimonialBlock";
import ProcessSteps from "@/components/funnel/ProcessSteps";
import ProjectGallery from "@/components/funnel/ProjectGallery";
import FAQ from "@/components/funnel/FAQ";
import FactText from "@/components/funnel/FactText";
import BookingHero from "@/components/get-a-quote/BookingHero";
import { ClosingCta, WhyInPerson } from "@/components/get-a-quote/BookingSections";
import StickyBookingBar from "@/components/get-a-quote/StickyBookingBar";
import VisitRequestForm from "@/components/get-a-quote/VisitRequestForm";
import { isVisible } from "@/lib/facts";
import { HOME_PROJECT_TYPES } from "@/lib/forms/home";
import { CALLBACK_WINDOW, CALL_HOURS, QUOTE_FAQS, WHY_IN_PERSON } from "@/lib/get-a-quote/content";
import { HOME_STEPS } from "@/lib/home-content";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Free In-Home Consultation — WPC Fences, Decks & Pergolas | Express Fence Solutions",
  description: "Book a free in-home visit: we bring WPC samples, measure your property and build an exact quote. Serving Miami-Dade to Okeechobee, FL.",
  alternates: { canonical: `${SITE.url}/get-a-quote` },
};

interface Props {
  searchParams: { type?: string };
}

// Every "Get a Home Quote" button lands here. We never price from a form: the page's one
// job is getting the visitor onto the calendar — call first, then WhatsApp, then an online
// appointment request we confirm by phone.
export default function GetAQuotePage({ searchParams }: Props) {
  const presetType = HOME_PROJECT_TYPES.some((t) => t.value === searchParams.type) ? searchParams.type : undefined;

  return (
    <FunnelShell>
      <main>
        <BookingHero projectType={presetType} callHours={isVisible(CALL_HOURS) ? <FactText value={CALL_HOURS} /> : null} />
        <WhyInPerson items={WHY_IN_PERSON} />

        <section id="book" className="efs-section" style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 className="efs-h2" style={{ marginBottom: 12 }}>
                Request your in-home visit
              </h2>
              <p className="efs-booking-lead">Pick a few times that work. We&apos;ll call you to confirm.</p>
            </div>
            <VisitRequestForm presetType={presetType} callbackWindow={CALLBACK_WINDOW} />
          </div>
        </section>

        <TestimonialBlock audience="home" eyebrow="Google reviews" title="What homeowners say" />
        <ProcessSteps eyebrow="How it works" title="Consult, design, install" steps={HOME_STEPS} background="background" />
        <ProjectGallery />
        <FAQ eyebrow="Questions" items={QUOTE_FAQS} />
        <ClosingCta projectType={presetType} />
      </main>
      <StickyBookingBar projectType={presetType} />
    </FunnelShell>
  );
}
