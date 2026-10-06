import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import { LEAD_FORMS } from "@/lib/forms/registry";
import Confirmation from "@/components/funnel/Confirmation";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Request WPC Samples | Express Fence Solutions Trade",
  description: "Request samples of WPC fencing, decking, cladding, pergolas and gates for your next bid.",
  alternates: { canonical: `${SITE.url}/trade/samples` },
};

interface Props {
  searchParams: { sent?: string };
}

export default function SamplesPage({ searchParams }: Props) {
  const sent = searchParams.sent === "1";

  return (
    <SiteShell mobileBar="trade">
      <main>
        <Hero
          eyebrow="Samples"
          title="See and feel the product before you bid"
          subtitle="Tell us which product lines you're quoting and where to send them."
          aside={
            sent ? (
              <Confirmation title="Request received">
                We&apos;ll call you within 24 hours to arrange your samples. Questions? Call{" "}
                <a href={SITE.phone.href} className="efs-link" style={{ fontWeight: 600 }}>
                  {SITE.phone.display}
                </a>
                .
              </Confirmation>
            ) : (
              <MultiStepForm kind="sample_request" steps={LEAD_FORMS.sample_request.steps} submitLabel="Request samples" successHref="/trade/samples?sent=1" />
            )
          }
        />
      </main>
    </SiteShell>
  );
}
