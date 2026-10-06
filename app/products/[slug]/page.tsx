import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, productsData, specRows } from "@/lib/products-data";
import { getComposition } from "@/lib/composition-data";
import { SITE } from "@/lib/site-config";
import SiteShell from "@/components/funnel/SiteShell";
import Hero from "@/components/funnel/Hero";
import FeatureGrid from "@/components/funnel/FeatureGrid";
import ProjectGallery from "@/components/funnel/ProjectGallery";
import SpecTable, { visibleRows } from "@/components/funnel/SpecTable";
import MaterialComposition from "@/components/funnel/MaterialComposition";
import { TodoNote } from "@/components/funnel/FactText";
import { SHOW_TODOS } from "@/lib/facts";
import ProductFunnelCTA from "@/components/funnel/ProductFunnelCTA";
import ProductViewTracker from "@/components/funnel/ProductViewTracker";

interface Props {
  params: { slug: string };
}

// /get-a-quote project type for each product, so "Get a Home Quote" arrives pre-selected.
const QUOTE_TYPE: Record<string, string> = {
  "wpc-fencing": "fence",
  "wpc-pergolas": "pergola",
  "wpc-cladding": "cladding",
  "wpc-decking": "decking",
  gates: "gate",
};

export function generateStaticParams() {
  return productsData.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — Supply & Installation in South Florida | Express Fence Solutions`,
    description: `${product.desc} Installed for homeowners and supplied to contractors across ${SITE.serviceAreaShort}.`,
    alternates: { canonical: `${SITE.url}/products/${product.slug}` },
    openGraph: { title: `${product.name} | Express Fence Solutions`, description: product.desc, images: [{ url: product.heroImage }] },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const composition = getComposition(product.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.desc,
    image: `${SITE.url}${product.heroImage}`,
    category: "Wood plastic composite (WPC) outdoor products",
    brand: { "@type": "Brand", name: SITE.name },
  };

  return (
    <SiteShell>
      <ProductViewTracker name={product.name} />
      <main>
        <Hero
          eyebrow={product.tagline}
          title={product.name}
          subtitle={product.overview.join(" ")}
          image={{ src: product.heroImage, alt: product.alt }}
        />
        <FeatureGrid eyebrow="Why homeowners choose it" title={`The benefits of ${product.name}`} items={product.benefits} background="background" />
        <ProjectGallery eyebrow="Gallery" title={product.name} photos={product.gallery} />

        {/* Composition + specs: confirmed content only in production; the whole section drops out if there's none. */}
        {(composition || visibleRows(specRows(product)).length > 0 || product.installGuide || SHOW_TODOS) && (
          <section className="efs-section" style={{ background: "var(--surface)" }}>
            <div style={{ maxWidth: 820, margin: "0 auto" }}>
              <MaterialComposition productName={product.name} composition={composition} />
              <SpecTable title="Specifications" caption={`${product.name} specifications`} rows={specRows(product)} />
              {(product.installGuide || SHOW_TODOS) && (
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--text-secondary)", marginTop: 20 }}>
                  Installation guide:{" "}
                  {product.installGuide ? (
                    <a href={product.installGuide} download className="efs-link" style={{ fontWeight: 600, color: "var(--accent-text)" }}>
                      Download PDF
                    </a>
                  ) : (
                    <TodoNote>install guide PDF</TodoNote>
                  )}
                </p>
              )}
            </div>
          </section>
        )}

        <ProductFunnelCTA productName={product.name} quoteType={QUOTE_TYPE[product.slug]} />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </SiteShell>
  );
}
