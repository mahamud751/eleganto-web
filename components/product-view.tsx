"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Package, Plus, RefreshCw, Ruler, Sparkles, Truck, X } from "lucide-react";
import { useCart } from "./cart";
import { SIZES, getCategory, type Product } from "@/lib/products";
import { money, site } from "@/lib/site";
import { MessengerIcon } from "./brand-icons";

const sizeChart = [
  ["S", "42", "27", "8.5"],
  ["M", "44", "28", "9"],
  ["L", "46", "29", "9.5"],
  ["XL", "48", "30", "10"],
  ["2XL", "50", "31", "10.5"],
];

export default function ProductView({ product }: { product: Product }) {
  const { add } = useCart();
  const [idx, setIdx] = useState(0);
  const [size, setSize] = useState<string>("M");
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [chart, setChart] = useState(false);
  const [added, setAdded] = useState(false);
  const cat = getCategory(product.category);
  const n = product.images.length;

  const sections = [
    {
      id: "details",
      icon: Package,
      title: "Product Details",
      body: (
        <>
          <p>{product.name.toUpperCase()} — {product.fabric.toUpperCase()}.</p>
          <ul className="mt-4 space-y-1">
            {product.details.map((d) => (
              <li key={d}>• {d.toUpperCase()}</li>
            ))}
          </ul>
          <p className="mt-4">STYLE TIP:</p>
          <p>WEAR IT OVERSIZED WITH WIDE-LEG DENIM OR CARGOS, OR LAYER A LONG SLEEVE UNDERNEATH FOR THE FULL ELEGANTO LOOK.</p>
        </>
      ),
    },
    {
      id: "shipping",
      icon: Truck,
      title: "Shipping Details",
      body: (
        <ul className="space-y-1">
          {site.zones.map((z) => (
            <li key={z.id}>
              • {z.label.toUpperCase()}: {money(z.fee)} · {z.eta.toUpperCase()}
            </li>
          ))}
          <li>• FREE DELIVERY ON ORDERS OVER {money(site.freeShippingOver)}</li>
          <li>• CASH ON DELIVERY AVAILABLE NATIONWIDE</li>
        </ul>
      ),
    },
    {
      id: "care",
      icon: Sparkles,
      title: "Care Instructions",
      body: <p>MACHINE WASH COLD, INSIDE OUT. DO NOT BLEACH. DO NOT IRON DIRECTLY ON PRINT. ACID WASH PIECES MAY RELEASE A LITTLE COLOUR IN THE FIRST WASH — WASH SEPARATELY.</p>,
    },
    {
      id: "returns",
      icon: RefreshCw,
      title: "Returns & Exchange",
      body: <p>SIZE EXCHANGE WITHIN 3 DAYS OF DELIVERY FOR UNWORN PIECES WITH ORIGINAL TAGS INTACT. MESSAGE US ON FACEBOOK TO START AN EXCHANGE.</p>,
    },
  ];

  return (
    <section className="grid border-b border-line lg:grid-cols-[1.5fr_1fr]">
      {/* gallery */}
      <div className="relative bg-mist lg:sticky lg:top-[100px] lg:h-[calc(100vh-100px)]">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full">
          {product.images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${product.name} — image ${i + 1}`}
              fill
              preload={i === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={`object-contain transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {n > 1 && (
            <>
              <button aria-label="Previous image" onClick={() => setIdx((idx - 1 + n) % n)} className="absolute top-1/2 left-4 -translate-y-1/2 p-2 text-black/50 hover:text-black">
                <ChevronLeft className="size-7" strokeWidth={1.3} />
              </button>
              <button aria-label="Next image" onClick={() => setIdx((idx + 1) % n)} className="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-black/50 hover:text-black">
                <ChevronRight className="size-7" strokeWidth={1.3} />
              </button>
            </>
          )}
          <p className="absolute bottom-5 left-6 text-[11px] font-semibold tracking-[0.3em] text-black/50">
            {idx + 1} / {n}
          </p>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {product.images.map((_, i) => (
              <button key={i} aria-label={`Image ${i + 1}`} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-ink" : "w-1.5 bg-black/20"}`} />
            ))}
          </div>
          {n > 1 && (
            <div className="absolute top-6 left-6 hidden flex-col gap-2 xl:flex">
              {product.images.map((src, i) => (
                <button key={src} onClick={() => setIdx(i)} className={`relative h-20 w-16 overflow-hidden border-2 transition ${i === idx ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* info */}
      <div className="px-5 py-10 sm:px-10 lg:px-12 lg:py-14">
        <nav className="text-[10px] font-bold tracking-[0.25em] text-muted uppercase">
          <Link href="/shop" className="hover:text-ink">Shop</Link> <span className="mx-1.5">/</span>
          {cat && (
            <Link href={`/shop?category=${cat.slug}`} className="hover:text-ink">
              {cat.name}
            </Link>
          )}
        </nav>
        <h1 className="mt-4 text-[34px] leading-[1.02] font-extrabold tracking-[-0.04em] uppercase sm:text-[40px]">{product.name}</h1>
        <p className="mt-4 text-2xl font-bold">{money(product.price)}</p>
        <p className="mt-1 text-[11px] font-medium tracking-wider text-muted">Tax included · Cash on Delivery available</p>

        <p className="mt-10 text-[11px] font-bold tracking-[0.35em] text-muted uppercase">Select color · <span className="text-ink">{product.color.name}</span></p>
        <div className="mt-4 bg-mist p-5">
          <span className="block h-[68px] w-[60px] ring-2 ring-ink ring-offset-2" style={{ background: product.color.hex }} />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <p className="text-[11px] font-bold tracking-[0.35em] text-muted uppercase">Select size</p>
          <button onClick={() => setChart(true)} className="flex items-center gap-1.5 rounded-full bg-mist px-4 py-2 text-[10px] font-bold tracking-[0.1em] uppercase underline underline-offset-2">
            <Ruler className="size-3" /> Size chart
          </button>
        </div>
        <div className="mt-4 grid grid-cols-5 border-t border-l border-line">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`h-[72px] border-r border-b border-line text-[12px] font-bold transition ${size === s ? "bg-ink text-white" : "hover:bg-mist"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="mt-5 text-[10.5px] font-semibold tracking-[0.1em] text-black/35 uppercase">
          <span className="text-ink">Fit</span> Oversized drop shoulder — take your usual size for a relaxed fit, one size down for a closer fit.
        </p>

        <button
          onClick={() => {
            add(product.slug, size);
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
          className="mt-9 h-20 w-full bg-ink text-[13px] font-bold tracking-[0.5em] text-white uppercase shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)] transition hover:bg-neutral-800 active:scale-[0.99]"
        >
          {added ? "Added to bag ✓" : "Add to cart"}
        </button>
        <a
          href={site.messenger}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex h-14 w-full items-center justify-center gap-2 border border-ink text-[11px] font-bold tracking-[0.3em] uppercase transition hover:bg-mist"
        >
          <MessengerIcon /> Ask on Messenger
        </a>

        <div className="mt-12 border-t border-line">
          {sections.map((s) => {
            const open = openSection === s.id;
            return (
              <div key={s.id} className="border-b border-line">
                <button onClick={() => setOpenSection(open ? null : s.id)} className="flex w-full items-center gap-5 py-7 text-left" aria-expanded={open}>
                  <s.icon className="size-5" strokeWidth={1.4} />
                  <span className="flex-1 text-[11.5px] font-bold tracking-[0.3em] text-neutral-700 uppercase">{s.title}</span>
                  <Plus className={`size-4 text-black/30 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="pb-8 text-[11.5px] leading-[1.7] text-neutral-500">{s.body}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {chart && (
        <div className="fixed inset-0 z-[80] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label="Size chart">
          <div className="animate-fade-in absolute inset-0 bg-black/50" onClick={() => setChart(false)} />
          <div className="animate-rise relative w-full max-w-md bg-white p-8">
            <button aria-label="Close" onClick={() => setChart(false)} className="absolute top-5 right-5">
              <X className="size-5" />
            </button>
            <p className="text-[11px] font-bold tracking-[0.35em] text-muted uppercase">Size chart · inches</p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight uppercase">Oversized Tee</p>
            <table className="mt-6 w-full text-center text-sm">
              <thead>
                <tr className="bg-ink text-[11px] tracking-[0.15em] text-white uppercase">
                  {["Size", "Chest", "Length", "Sleeve"].map((h) => (
                    <th key={h} className="py-3 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((r) => (
                  <tr key={r[0]} className="border-b border-line">
                    {r.map((c, i) => (
                      <td key={i} className={`py-3 ${i === 0 ? "font-bold" : ""}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[11px] text-muted">Measurements are of the garment laid flat. Allow ±0.5&quot;.</p>
          </div>
        </div>
      )}
    </section>
  );
}
