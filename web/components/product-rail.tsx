"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Flame, Gem, Star, Trophy } from "lucide-react";
import type { Product } from "@/lib/products";
import ProductCard from "./product-card";
import Reveal from "./reveal";

const icons = { flame: Flame, trophy: Trophy, star: Star, gem: Gem };

export default function ProductRail({
  label,
  title,
  icon = "flame",
  products,
}: {
  label: string;
  title: string;
  icon?: keyof typeof icons;
  products: Product[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const Icon = icons[icon];

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };

  useEffect(update, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn =
    "grid size-10 place-items-center border transition disabled:border-line disabled:text-black/20 enabled:border-ink enabled:hover:bg-ink enabled:hover:text-white";

  return (
    <section className="border-b border-line py-20 lg:py-24">
      <Reveal className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.45em] text-muted uppercase">
              <Icon className="size-3.5 text-orange-500" fill="currentColor" strokeWidth={1} /> {label}
            </p>
            <h2 className="mt-2 text-[34px] leading-none font-extrabold tracking-[-0.04em] uppercase sm:text-[40px]">{title}</h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button aria-label="Previous" className={btn} disabled={edge.start} onClick={() => scroll(-1)}>
              <ChevronLeft className="size-4" />
            </button>
            <button aria-label="Next" className={btn} disabled={edge.end} onClick={() => scroll(1)}>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Reveal>
      <div
        ref={ref}
        onScroll={update}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-pl-4 gap-2.5 overflow-x-auto scroll-smooth px-4 sm:scroll-pl-8 sm:px-8 lg:scroll-pl-12 lg:px-12"
      >
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i, 5) * 70} className="w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[30%] lg:w-[calc((100%-40px)/5.2)]">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
