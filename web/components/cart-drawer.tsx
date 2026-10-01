"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { useCart } from "./cart";
import { getProduct } from "@/lib/products";
import { money, site } from "@/lib/site";

export default function CartDrawer() {
  const { open, setOpen, lines, count, subtotal, setQty, remove } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;
  const remaining = Math.max(0, site.freeShippingOver - subtotal);
  const pct = Math.min(100, (subtotal / site.freeShippingOver) * 100);

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
      <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-white">
        <div className="flex h-[68px] items-center justify-between border-b border-line px-6">
          <p className="text-[12px] font-bold tracking-[0.28em] uppercase">Your Bag ({count})</p>
          <button aria-label="Close bag" onClick={() => setOpen(false)} className="transition hover:rotate-90">
            <X className="size-5" strokeWidth={1.6} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <ShoppingBag className="size-10 text-muted" strokeWidth={1.2} />
            <p className="text-2xl font-extrabold tracking-tight uppercase">Your bag is empty</p>
            <p className="text-sm text-muted">Different is beautiful. Find your next piece.</p>
            <Link href="/shop" onClick={() => setOpen(false)} className="mt-2 bg-ink px-10 py-4 text-[11px] font-bold tracking-[0.3em] text-white uppercase">
              Shop the drop
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-6 py-4">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-wide">
                <Truck className="size-4" strokeWidth={1.6} />
                {remaining > 0 ? (
                  <>Add {money(remaining)} more for free delivery</>
                ) : (
                  <>You unlocked free delivery</>
                )}
              </p>
              <div className="mt-2.5 h-1 bg-line">
                <div className="h-full bg-ink transition-[width] duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((l) => {
                const p = l.product;
                return (
                  <li key={l.slug + l.size + l.color} className="flex gap-4 py-5">
                    <Link href={`/product/${p.slug}`} onClick={() => setOpen(false)} className="relative h-[120px] w-[92px] shrink-0 overflow-hidden bg-mist">
                      <Image src={p.images[0]} alt={p.name} fill sizes="92px" className="object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <p className="text-[13px] font-bold uppercase leading-snug">{p.name}</p>
                        <p className="text-[13px] font-bold">{money(p.price * l.qty)}</p>
                      </div>
                      <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">
                        {l.color} · Size {l.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-line">
                          <button aria-label="Decrease" className="grid size-8 place-items-center hover:bg-mist" onClick={() => setQty(l.slug, l.size, l.color, l.qty - 1)}>
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{l.qty}</span>
                          <button aria-label="Increase" className="grid size-8 place-items-center hover:bg-mist" onClick={() => setQty(l.slug, l.size, l.color, l.qty + 1)}>
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <button onClick={() => remove(l.slug, l.size, l.color)} className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase underline-offset-4 hover:text-ink hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line p-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase">Bag Total</span>
                <span className="text-xl font-extrabold">{money(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted">Delivery calculated at checkout. Cash on Delivery available.</p>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="mt-5 block bg-ink py-[18px] text-center text-[11px] font-bold tracking-[0.35em] text-white uppercase transition hover:bg-neutral-800"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
