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
  ["/other-products", "/products/aluminum-fences"],
  ["/partner", "/trade"],
  ["/book-consultation", "/get-a-quote"],
  // The combined aluminum page and /container-pools became separate product pages
  ["/products/aluminum", "/products/aluminum-fences"],
  ["/container-pools", "/products/container-pools"],
];

// {{TODO}} placeholders are visible on preview deployments and local builds, and removed
// entirely from production builds (Vercel sets VERCEL_ENV at build time).
// A branch named "*-prodview" builds a preview that looks exactly like production.
// Override with SHOW_TODOS=0|1, e.g. to check the production view locally.
const PRODUCTION_VIEW =
  process.env.VERCEL_ENV === "production" || (process.env.VERCEL_GIT_COMMIT_REF ?? "").endsWith("-prodview");
const SHOW_TODOS = process.env.SHOW_TODOS ?? (PRODUCTION_VIEW ? "0" : "1");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_SHOW_TODOS: SHOW_TODOS },
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
