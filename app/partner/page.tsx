import type { Metadata } from "next";
import NavbarPage from "@/components/sections/NavbarPage";
import Footer from "@/components/sections/Footer";
import PartnerHero from "@/components/sections/PartnerHero";
import PartnerAudiences from "@/components/sections/PartnerAudiences";
import PartnerWhyUs from "@/components/sections/PartnerWhyUs";
import PartnerHowItWorks from "@/components/sections/PartnerHowItWorks";
import PartnerProductShowcase from "@/components/sections/PartnerProductShowcase";
import PartnerGallery from "@/components/sections/PartnerGallery";
import PartnerContactSection from "@/components/sections/PartnerContactSection";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileCTABar from "@/components/ui/MobileCTABar";

export const metadata: Metadata = {
  title: "Partner With Us — WPC Contractor & Trade Partnerships | Express Fence Solutions",
  description:
    "Trade & volume pricing for general contractors, developers, and builders. A standing WPC supply and install partnership backed by the world's largest WPC manufacturer. Serving Miami & Palm Beach County.",
  keywords:
    "WPC contractor partnership Miami, trade composite fencing Florida, wholesale WPC supplier, WPC trade pricing, general contractor fence supplier Miami",
  openGraph: {
    title: "Partner With Us — WPC Contractor & Trade Partnerships | Express Fence Solutions",
    description:
      "Trade & volume pricing for general contractors, developers, and builders. Reliable supply, consistent quality, and spec support for every bid.",
    url: "https://expressfencesolutions.com/partner",
    siteName: "Express Fence Solutions",
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://expressfencesolutions.com/partner" },
  robots: { index: true, follow: true },
};

export default function PartnerPage() {
  return (
    <>
      <NavbarPage />
      <main>
        <PartnerHero />
        <PartnerAudiences />
        <PartnerWhyUs />
        <PartnerHowItWorks />
        <PartnerProductShowcase />
        <PartnerGallery />
        <PartnerContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCTABar />
    </>
  );
}
