"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/look-stairs-duo.jpg",
    pos: "center 45%",
    kicker: "NEW DROP '26",
    title: "COLLECTION IS LIVE",
    links: [
      { label: "Surf The Drop", href: "/shop" },
      { label: "Shop Now", href: "/shop" },
    ],
  },
  {
    src: "/images/porsche-back.jpg",
    pos: "center 40%",
    kicker: "OVERSIZED GRAPHIC TEES",
    title: "DIFFERENT IS BEAUTIFUL",
    links: [
      { label: "Explore Graphics", href: "/shop?category=oversized" },
      { label: "Shop Now", href: "/shop" },
    ],
  },
  {
    src: "/images/star-girl-poster.jpg",
    pos: "center 30%",
    kicker: "ACID WASH SERIES",
    title: "STAR GIRL IS HERE",
    links: [
      { label: "Shop Acid Wash", href: "/shop?category=acid-wash" },
      { label: "View Piece", href: "/product/star-girl-acid-wash" },
    ],
  },
  {
    src: "/images/queen-back-caution.jpg",
    pos: "center 35%",
    kicker: "LIMITED EDITION",
    title: "THE QUEEN ARCHIVE",
    links: [
      { label: "View Piece", href: "/product/the-queen-acid-wash" },
      { label: "Shop Now", href: "/shop" },
    ],
  },
];

const DURATION = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [active]);

  const s = slides[active];

  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-white">
      {slides.map((sl, i) => (
        <div
          key={sl.src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === active ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== active}
        >
          <Image
            src={sl.src}
            alt=""
            fill
            preload={i === 0}
            sizes="100vw"
            className={`object-cover ${i === active ? "animate-kenburns" : ""}`}
            style={{ objectPosition: sl.pos }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/40" />

      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-16 sm:px-8 lg:px-24 lg:pb-[60px]">
        <div key={active}>
          <p className="animate-rise text-base font-bold tracking-tight sm:text-lg">{s.kicker}</p>
          <h1
            className="animate-rise mt-3 max-w-[16ch] text-[44px] leading-[0.95] font-extrabold tracking-[-0.045em] sm:text-7xl lg:text-[76px]"
            style={{ animationDelay: "120ms" }}
          >
            {s.title}
          </h1>
          <div className="animate-rise mt-7 flex gap-10" style={{ animationDelay: "240ms" }}>
            {s.links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="border-b-2 border-white pb-0.5 text-lg font-bold tracking-tight transition-opacity hover:opacity-70 sm:text-xl"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-[96px]">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className="relative h-[2px] w-12 overflow-hidden bg-white/30"
            >
              {i === active && (
                <span key={active} className="animate-progress absolute inset-0 bg-white" style={{ ["--dur" as string]: `${DURATION}ms` }} />
              )}
              {i < active && <span className="absolute inset-0 bg-white/70" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
