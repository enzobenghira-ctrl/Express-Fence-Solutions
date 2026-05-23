import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, productsData } from "@/lib/products-data";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return productsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} Miami — Express Fence Solutions`,
    description: `Premium WPC ${product.name.toLowerCase()} for South Florida homes. ${product.desc} Zero maintenance, built for Florida's climate. Get a free quote today.`,
    openGraph: {
      title: `${product.name} — Express Fence Solutions Miami`,
      description: product.desc,
      images: [{ url: product.heroImage }],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
