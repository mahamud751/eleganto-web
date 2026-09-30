import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import Reveal from "@/components/reveal";
import { byTag, categories, getCategory, products } from "@/lib/products";

export const metadata: Metadata = { title: "Shop" };

const tabs = [{ slug: "all", name: "All" }, { slug: "new", name: "New Arrivals" }, ...categories];

export default async function Shop({ searchParams }: PageProps<"/shop">) {
  const raw = (await searchParams).category;
  const active = typeof raw === "string" && (raw === "new" || getCategory(raw)) ? raw : "all";
  const list =
    active === "all" ? products : active === "new" ? byTag("new") : products.filter((p) => p.category === active);
  const heading = active === "all" ? "Archives" : tabs.find((t) => t.slug === active)!.name;

  return (
    <div className="pb-24">
      <div className="px-4 pt-12 pb-10 sm:px-8 lg:pt-20">
        <div className="flex items-end gap-4">
          <h1 className="text-[44px] leading-none font-extrabold tracking-[-0.045em] uppercase sm:text-[56px]">{heading}</h1>
          <span className="pb-1.5 text-xs font-bold text-muted">[{list.length} ARTICLES]</span>
        </div>
        <nav className="no-scrollbar mt-7 flex gap-9 overflow-x-auto">
          {tabs.map((t) => (
            <Link
              key={t.slug}
              href={t.slug === "all" ? "/shop" : `/shop?category=${t.slug}`}
              scroll={false}
              className={`relative shrink-0 pb-3 text-[11px] font-bold tracking-[0.3em] uppercase transition ${
                active === t.slug ? "text-ink" : "text-black/25 hover:text-black/60"
              }`}
            >
              {t.name}
              {active === t.slug && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-ink" />}
            </Link>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-2 gap-1.5 px-0 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {list.map((p, i) => (
          <Reveal key={active + p.slug} delay={(i % 5) * 60}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
