import type { Metadata } from "next";
import SiteShell from "@/components/funnel/SiteShell";
import Testimonials from "@/components/sections/Testimonials";
import FenceMiamiHero from "@/components/sections/FenceMiamiHero";
import FenceMiamiWhyWPC from "@/components/sections/FenceMiamiWhyWPC";
import FenceMiamiFinishes from "@/components/sections/FenceMiamiFinishes";
import FenceMiamiOtherServices from "@/components/sections/FenceMiamiOtherServices";
import FenceMiamiServiceArea from "@/components/sections/FenceMiamiServiceArea";
import FenceMiamiContactStrip from "@/components/sections/FenceMiamiContactStrip";
import FenceMiamiBookingSection from "@/components/sections/FenceMiamiBookingSection";
import StickyBookCTA from "@/components/ui/StickyBookCTA";

export const metadata: Metadata = {
  title: "Fence Installation Miami | WPC Composite Fence Company — Express Fence Solutions",
  description:
    "Professional fence installation across Miami-Dade & Broward County. Premium zero-maintenance WPC composite fencing. Family-owned, free in-person consultation. Book today.",
  keywords:
    "fence installation Miami, fence company Miami, WPC composite fence Miami-Dade, fence installation Broward County, composite fencing South Florida",
  openGraph: {
    title: "Fence Installation Miami | WPC Composite Fence Company — Express Fence Solutions",
    description:
      "Professional fence installation across Miami-Dade & Broward County. Premium zero-maintenance WPC composite fencing. Family-owned, free in-person consultation.",
    url: "https://expressfencesolutions.com/fence-installation-miami",
    siteName: "Express Fence Solutions",
    images: [
      {
        url: "/images/fence-waterway-turf.jpg",
        width: 1200,
        height: 900,
        alt: "dark grey WPC composite fence installation in a Miami waterfront backyard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://expressfencesolutions.com/fence-installation-miami" },
  robots: { index: true, follow: true },
};

export default function FenceInstallationMiamiPage() {
  return (
    <SiteShell mobileBar="none">
      <main>
        <FenceMiamiHero />
        <FenceMiamiWhyWPC />
        <FenceMiamiFinishes />
        <FenceMiamiOtherServices />
        <FenceMiamiServiceArea />
        <Testimonials />
        <FenceMiamiContactStrip />
        <FenceMiamiBookingSection />
      </main>
      <StickyBookCTA />
    </SiteShell>
  );
}
