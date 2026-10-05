import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Testimonials from "@/components/sections/Testimonials";
import ConsultationHero from "@/components/sections/ConsultationHero";
import ConsultationProcess from "@/components/sections/ConsultationProcess";
import ConsultationWhyInPerson from "@/components/sections/ConsultationWhyInPerson";
import ConsultationBookingSection from "@/components/sections/ConsultationBookingSection";
import StickyBookCTA from "@/components/ui/StickyBookCTA";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a Free In-Home Consultation | Express Fence Solutions Miami",
  description: `Book a free, no-obligation in-home consultation. We bring real WPC samples, measure your property, and give you an accurate custom quote on the spot. Serving ${SITE.serviceAreaShort}.`,
  keywords:
    "free consultation WPC fence Miami, in-home estimate fence Florida, book consultation Express Fence Solutions",
  openGraph: {
    title: "Book a Free In-Home Consultation | Express Fence Solutions",
    description:
      "We come to you with real WPC samples, measure your property, and give you an accurate custom quote on the spot — free, no obligation.",
    url: "https://expressfencesolutions.com/book-consultation",
    siteName: "Express Fence Solutions",
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://expressfencesolutions.com/book-consultation" },
  robots: { index: true, follow: true },
};

export default function BookConsultationPage() {
  return (
    <SiteShell mobileBar="none">
      <main>
        <ConsultationHero />
        <ConsultationBookingSection />
        <ConsultationProcess />
        <ConsultationWhyInPerson />
        <Testimonials />
      </main>
      <StickyBookCTA />
    </SiteShell>
  );
}
