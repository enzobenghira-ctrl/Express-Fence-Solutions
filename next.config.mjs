// Every old URL that may still be indexed or linked → its closest new page.
// statusCode 301 is explicit: Next's `permanent: true` sends 308, but the launch
// checklist requires 301s. Add more entries from the Search Console "Pages" export.
const REDIRECTS = [
  // 2022 site (Odoo) URLs still in Google
  ["/contact", "/#contact"],
  ["/benches", "/products/benches"],
  ["/gates", "/products/gates"],
  ["/en_US/fences", "/products/wpc-fencing"],
  ["/en_US/fences/", "/products/wpc-fencing"],
  ["/en_US/:path*", "/"],
  // Product pages renamed in the funnel rebuild
  ["/products/fences", "/products/wpc-fencing"],
  ["/products/decking", "/products/wpc-decking"],
  ["/products/cladding", "/products/wpc-cladding"],
  ["/products/pergolas", "/products/wpc-pergolas"],
  // Pages replaced by the funnels (/book-consultation is the Business Profile appointment link)
  ["/other-products", "/products/aluminum"],
  ["/partner", "/trade"],
  ["/book-consultation", "/get-a-quote"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  // Trailing slashes are stripped with a 301 by middleware.ts instead of Next's 308.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return REDIRECTS.map(([source, destination]) => ({ source, destination, statusCode: 301 }));
  },
};

export default nextConfig;
