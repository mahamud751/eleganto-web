import Link from "next/link";
import Hero from "@/components/hero";
import CategoryTiles from "@/components/category-tiles";
import ProductRail from "@/components/product-rail";
import Campaign from "@/components/campaign";
import BrandMark from "@/components/brand-mark";
import Newsletter from "@/components/newsletter";
import { byTag } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <ProductRail label="Trending Now" title="Trending Now" icon="flame" products={byTag("trending")} />
      <ProductRail label="Best Selling" title="Best Selling" icon="trophy" products={byTag("best")} />
      <ProductRail label="Must Buy" title="Must Buy" icon="star" products={byTag("must")} />
      <div className="flex justify-center py-20">
        <Link
          href="/shop"
          className="bg-ink px-16 py-[21px] text-[12px] font-bold tracking-[0.4em] text-white uppercase transition hover:bg-neutral-800"
        >
          View All Products
        </Link>
      </div>
      <Campaign />
      <BrandMark />
      <Newsletter />
    </>
  );
}
