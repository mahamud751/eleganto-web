"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { money } from "@/lib/site";
import { useAuth } from "./auth";
import { useRouter } from "next/navigation";

export default function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const [idx, setIdx] = useState(0);
  const { user, wishlist, toggleWishlist } = useAuth();
  const router = useRouter();
  const imgs = product.images.slice(0, 3);

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group block border border-line bg-white transition-shadow duration-500 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)] ${className}`}
      onMouseEnter={() => imgs.length > 1 && setIdx(1)}
      onMouseLeave={() => setIdx(0)}
    >
      <div className="relative aspect-[4/5.4] overflow-hidden bg-mist">
        {imgs.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? product.name : ""}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className={`object-cover transition-all duration-700 ${
              i === idx ? "scale-100 opacity-100" : "scale-105 opacity-0"
            } group-hover:scale-[1.03]`}
          />
        ))}
        {product.tags.includes("new") && (
          <span className="absolute top-0 left-0 z-10 flex items-center gap-1 bg-ink px-2.5 py-1 text-[8.5px] font-bold tracking-wide text-white uppercase">
            <Star className="size-2.5" strokeWidth={2} /> New Arrival
          </span>
        )}
        <button aria-label="Toggle wishlist" onClick={async e => { e.preventDefault(); if (!user) { router.push('/login'); return; } await toggleWishlist(product.slug); }} className="absolute top-3 right-3 z-20 grid size-9 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-105"><Heart className={`size-4 ${wishlist.has(product.slug) ? 'fill-black' : ''}`} /></button>
        {imgs.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                aria-label={`Show image ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIdx(i);
                }}
                className={`h-[3px] rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-ink" : "w-2.5 bg-black/20"}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="px-4 pt-3.5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <p className="line-clamp-1 text-[11.5px] font-bold tracking-tight uppercase">{product.name}</p>
          <p className="shrink-0 text-[12.5px] font-bold">{money(product.price)}</p>
        </div>
        <p className="mt-1.5 text-[8.5px] font-semibold tracking-[0.2em] text-muted uppercase">1 color · {product.color.name}</p>
      </div>
    </Link>
  );
}
