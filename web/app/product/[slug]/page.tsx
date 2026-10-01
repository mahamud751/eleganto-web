import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/product-view";
import ProductRail from "@/components/product-rail";
import { products } from "@/lib/products";
import { fetchProduct, fetchProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const p = await fetchProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, openGraph: { images: [p.images[0]] } };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const product = await fetchProduct((await params).slug);
  if (!product) notFound();
  const allProducts = await fetchProducts();

  const related = [
    ...allProducts.filter((p) => p.category === product.category && p.slug !== product.slug),
    ...allProducts.filter((p) => p.category !== product.category),
  ].slice(0, 8);

  return (
    <>
      <ProductView product={product} />
      <ProductRail label="Complete the look" title="Complementary Pieces" icon="gem" products={related} />
    </>
  );
}
