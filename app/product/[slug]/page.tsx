import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/product-view";
import ProductRail from "@/components/product-rail";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, openGraph: { images: [p.images[0]] } };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const related = [
    ...products.filter((p) => p.category === product.category && p.slug !== product.slug),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 8);

  return (
    <>
      <ProductView product={product} />
      <ProductRail label="Complete the look" title="Complementary Pieces" icon="gem" products={related} />
    </>
  );
}
