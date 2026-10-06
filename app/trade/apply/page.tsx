import type { Metadata } from "next";
import FunnelShell from "@/components/funnel/FunnelShell";
import Hero from "@/components/funnel/Hero";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import { LEAD_FORMS } from "@/lib/forms/registry";
import TestimonialBlock from "@/components/funnel/TestimonialBlock";
import { TRADE_TYPES } from "@/lib/forms/trade";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Apply for a Trade Account | Express Fence Solutions",
  description: `Apply for trade pricing on premium WPC fencing, decking, cladding, pergolas and gates. Serving contractors from ${SITE.serviceAreaShort}.`,
  alternates: { canonical: `${SITE.url}/trade/apply` },
};

interface Props {
  searchParams: { installer?: string; trade?: string };
}

// Ad landing page: logo-only layout, form above the fold, trust items and one testimonial only.
export default function TradeApplyPage({ searchParams }: Props) {
  const installer = searchParams.installer === "1";
  const presetTrade = TRADE_TYPES.some((t) => t.value === searchParams.trade) ? searchParams.trade : undefined;

  return (
    <FunnelShell>
      <main>
        <Hero
          offsetForHeader={false}
          eyebrow={installer ? "Certified Installer Network" : "Trade Program"}
          title="Apply for a trade account"
          subtitle="Trade pricing on premium WPC fencing, decking, cladding, pergolas and gates. Three short steps — then we'll set up your qualification call."
          image={{ src: "/images/gate-charcoal-single.jpg", alt: "Charcoal WPC gate with white aluminum frame on a South Florida home", position: "center 40%" }}
          trustItems={["Trade pricing after approval", `Showroom in ${SITE.address.city}, FL`, `Serving ${SITE.serviceAreaShort}`]}
          aside={
            <MultiStepForm
              kind="trade_application" steps={LEAD_FORMS.trade_application.steps}
              submitLabel="Submit application"
              successHref="/thank-you-trade"
              initialValues={presetTrade ? { tradeType: presetTrade } : undefined}
              hiddenValues={installer ? { installer: "1" } : undefined}
            />
          }
        />
        <TestimonialBlock audience="trade" limit={1} />
      </main>
    </FunnelShell>
  );
}
