import type { Metadata } from "next";
import OtherProductsPage from "@/components/sections/OtherProductsPage";
import Navbar from "@/components/sections/NavbarPage";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileCTABar from "@/components/ui/MobileCTABar";

export const metadata: Metadata = {
  title: "Container Pools, Aluminum Pergolas & Fences | Express Fence Solutions Miami",
  description:
    "Discover container pools, aluminum pergolas, and aluminum fences from Express Fence Solutions. Premium outdoor living solutions for Miami & South Florida. Get a free quote today.",
  keywords:
    "container pool Miami, aluminum pergola Florida, aluminum fence Miami, outdoor pool South Florida, Express Fence Solutions",
  openGraph: {
    title: "Container Pools, Aluminum Pergolas & Fences | Express Fence Solutions",
    description:
      "Premium container pools, aluminum pergolas, and aluminum fences for South Florida homes. Get a free quote from Express Fence Solutions.",
    url: "https://expressfencesolutions.com/other-products",
    siteName: "Express Fence Solutions",
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://expressfencesolutions.com/other-products" },
  robots: { index: true, follow: true },
};

export default function OtherProducts() {
  return (
    <>
      <Navbar />
      <main>
        <OtherProductsPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCTABar />
    </>
  );
}
