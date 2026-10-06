import type { Metadata } from "next";
import FunnelShell from "@/components/funnel/FunnelShell";
import Hero from "@/components/funnel/Hero";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import { LEAD_FORMS } from "@/lib/forms/registry";
import TestimonialBlock from "@/components/funnel/TestimonialBlock";
import ProcessSteps from "@/components/funnel/ProcessSteps";
import FeatureGrid from "@/components/funnel/FeatureGrid";
import ProjectGallery from "@/components/funnel/ProjectGallery";
import FAQ from "@/components/funnel/FAQ";
import { HOME_PROJECT_TYPES } from "@/lib/forms/home";
import { HOME_FAQS, HOME_STEPS, WHY_WPC_FLORIDA } from "@/lib/home-content";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get a Free Quote — WPC Fences, Decks & Pergolas | Express Fence Solutions",
  description: `Get a free quote on a WPC fence, gate, deck, pergola or outdoor living project. Free consultation, serving ${SITE.serviceAreaShort}.`,
  alternates: { canonical: `${SITE.url}/get-a-quote` },
};

interface Props {
  searchParams: { type?: string };
}

// Homeowner ad landing page: logo-only layout, form above the fold, never mentions trade.
export default function GetAQuotePage({ searchParams }: Props) {
  const presetType = HOME_PROJECT_TYPES.some((t) => t.value === searchParams.type) ? searchParams.type : undefined;
  const form = (
    <MultiStepForm
      kind="home_quote" steps={LEAD_FORMS.home_quote.steps}
      submitLabel="Get my free quote"
      successHref="/thank-you-home"
      initialValues={presetType ? { projectType: presetType } : undefined}
    />
  );

  return (
    <FunnelShell>
      <main>
        <Hero
          offsetForHeader={false}
          eyebrow="Free consultation"
          title="Premium WPC, built for Florida"
          subtitle="Fences, gates, decks, pergolas and outdoor living — designed and installed for your home. Tell us about your project in three quick steps."
          image={{ src: "/images/fence-black-modern-home.jpg", alt: "Black horizontal WPC fence at a modern South Florida home" }}
          trustItems={["Free in-home consultation", `Showroom in ${SITE.address.city}, FL`, `Serving ${SITE.serviceAreaShort}`]}
          aside={form}
        />
        <TestimonialBlock audience="home" eyebrow="Google reviews" title="What homeowners say" />
        <ProcessSteps eyebrow="How it works" title="Consult, design, install" steps={HOME_STEPS} background="background" />
        <FeatureGrid eyebrow="Why WPC for Florida" title="Made for heat, humidity and salt air" items={WHY_WPC_FLORIDA} />
        <ProjectGallery />
        <FAQ eyebrow="Questions" items={HOME_FAQS} />
        <section className="efs-section" style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2 className="efs-h2" style={{ textAlign: "center", marginBottom: 28 }}>
              Ready for your free quote?
            </h2>
            {form}
          </div>
        </section>
      </main>
    </FunnelShell>
  );
}
