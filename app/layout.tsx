import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
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
  title: "Express Fence Solutions — Premium WPC Fences, Pergolas & Decking | Miami & Palm Beach County FL",
  description:
    "Miami's premium WPC fence, pergola, decking and cladding specialists. Eco-friendly, zero-maintenance outdoor products from the world's largest WPC manufacturer. Serving Miami & Palm Beach County. Call for a free quote.",
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
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Express Fence Solutions LLC",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Miami",
    addressRegion: "FL",
  },
  telephone: "+13059679202",
  email: "Info@expressfencesolutions.com",
  url: "https://expressfencesolutions.com",
  areaServed: ["Miami, FL", "Palm Beach County, FL", "South Florida"],
  sameAs: ["https://www.instagram.com/express_fence_solutions/"],
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
        {children}
      </body>
    </html>
  );
}
