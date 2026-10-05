import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import GoogleTag from "@/components/GoogleTag";
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
  title: "Express Fence Solutions — Premium WPC Fences, Pergolas & Decking | Miami-Dade to Okeechobee, FL",
  description: `Family-owned fence company serving ${SITE.serviceArea}. Premium WPC composite fences, pergolas & gates. Free consultation.`,
  keywords:
    "WPC fence Miami, composite fence Florida, WPC pergola, WPC decking Miami, wood plastic composite fence, outdoor living Miami, Express Fence Solutions",
  openGraph: {
    title: "Express Fence Solutions — Premium WPC, built for Florida",
    description:
      "Premium WPC fencing, decking, cladding, pergolas and gates — supplied to contractors and installed for homeowners across South Florida.",
    url: "https://expressfencesolutions.com",
    siteName: "Express Fence Solutions",
    images: [{ url: "/images/fence-waterway-turf.jpg", alt: "Charcoal WPC privacy fence along a South Florida waterway" }],
    locale: "en_US",
    type: "website",
  },
  // No site-wide canonical: each page sets its own (a layout canonical would point every page at the homepage).
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
  areaServed: SITE.serviceCounties.map((county) => ({ "@type": "AdministrativeArea", name: `${county} County, FL` })),
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
        <GoogleTag />
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}
