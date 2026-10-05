import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import AttributionCapture from "@/components/funnel/AttributionCapture";
import { SITE } from "@/lib/site-config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://expressfencesolutions.com"),
  title: "Express Fence Solutions — Premium WPC Fences, Pergolas & Decking | Miami-Dade & Broward County FL",
  description:
    "Family-owned fence company serving Miami-Dade & Broward County. Premium WPC composite fences, aluminum pergolas & gates. Free consultation.",
  keywords:
    "WPC fence Miami, composite fence Florida, WPC pergola, WPC decking Miami, wood plastic composite fence, outdoor living Miami, Express Fence Solutions",
  openGraph: {
    title: "Express Fence Solutions — Premium WPC Fences, Pergolas & Decking | Miami FL",
    description:
      "Miami's premium WPC fence, pergola, decking and cladding specialists. Zero-maintenance outdoor products from the world's largest WPC manufacturer.",
    url: "https://expressfencesolutions.com",
    siteName: "Express Fence Solutions",
    images: [{ url: "/images/hero-home-luxury.jpg", width: 1200, height: 630, alt: "WPC fence luxury home Miami" }],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "https://expressfencesolutions.com" },
  robots: { index: true, follow: true },
  other: {
    "facebook-domain-verification": "6hwuisx9mjriqbpo8nnx27jazjrtwh",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.legalName,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
  },
  telephone: SITE.phone.e164,
  email: SITE.email,
  url: SITE.url,
  areaServed: ["Miami-Dade County, FL", "Broward County, FL"],
  sameAs: [SITE.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <MetaPixel />
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}
