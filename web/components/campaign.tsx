"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Film, Play, X } from "lucide-react";
import { lookbook } from "@/lib/products";
import Reveal from "./reveal";

const COLS = 3;

export default function Campaign() {
  const [tick, setTick] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);

  // each of the three frames advances in turn, so the panel always feels in motion
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1800);
    return () => clearInterval(t);
  }, []);

  const frameImage = (col: number) => {
    const turns = Math.floor((tick + (COLS - 1 - col)) / COLS);
    return (col + turns * COLS) % lookbook.length;
  };

  const step = useCallback(
    (d: number) => setViewer((v) => (v === null ? v : (v + d + lookbook.length) % lookbook.length)),
    [],
  );

  useEffect(() => {
    if (viewer === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const auto = setInterval(() => step(1), 3500);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearInterval(auto);
    };
  }, [viewer, step]);

  return (
    <section id="lookbook" className="scroll-mt-24 bg-black pt-8 pb-20 text-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-20">
        <Reveal>
          <p className="flex flex-wrap items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-white/60 uppercase">
            <span className="flex items-center gap-2">
              <Film className="size-3.5" /> Campaign Archive 2026
            </span>
            <span className="text-white/30">/</span>
            <span>Acid Wash · Oversized Capsule</span>
          </p>
          <div className="mt-5 flex flex-col justify-between gap-6 border-b border-white/10 pb-7 md:flex-row md:items-end">
            <div>
              <h2 className="text-[34px] leading-none font-extrabold tracking-[-0.04em] sm:text-[40px]">
                THE &apos;26 VISUAL MANIFESTO
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed font-light text-white/60">
                Subway tunnels, caution tape and mirrors — oversized silhouettes, acid wash texture and loud back
                prints. Different is beautiful, captured frame by frame.
              </p>
            </div>
            <Link
              href="/shop"
              className="flex w-fit items-center gap-3 border border-white/25 px-5 py-3 text-[12px] font-bold tracking-[0.2em] uppercase transition hover:bg-white hover:text-black"
            >
              Explore Looks <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100} className="relative mt-8 overflow-hidden border border-white/15">
          <div className="grid aspect-[4/5] grid-cols-3 sm:aspect-[16/9]">
            {Array.from({ length: COLS }).map((_, col) => {
              const current = frameImage(col);
              return (
                <button
                  key={col}
                  onClick={() => setViewer(current)}
                  className="group relative overflow-hidden border-white/10 [&:not(:last-child)]:border-r"
                  aria-label="Open lookbook"
                >
                  {lookbook.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      fill
                      sizes="33vw"
                      className={`object-cover object-[center_30%] grayscale-[35%] transition-all duration-[1400ms] group-hover:grayscale-0 ${
                        i === current ? "scale-100 opacity-100" : "scale-110 opacity-0"
                      }`}
                    />
                  ))}
                </button>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
          <span className="absolute top-4 left-4 font-serif text-xs font-bold tracking-[0.2em] text-white/60">ELEGANTO</span>
          <span className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/70">
            <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> REC
          </span>

          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-5">
              <button
                onClick={() => setViewer(0)}
                aria-label="Play lookbook"
                className="grid size-[112px] place-items-center rounded-full border border-white/40 transition hover:scale-105"
              >
                <span className="grid size-24 place-items-center rounded-full bg-white text-black shadow-2xl">
                  <Play className="ml-1 size-9" fill="currentColor" />
                </span>
              </button>
              <span className="flex items-center gap-2 bg-black/80 px-4 py-2 text-[11px] font-bold tracking-[0.18em]">
                <Film className="size-3.5" /> PLAY LOOKBOOK <span className="text-white/40">·</span> {lookbook.length} FRAMES
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-[11px] font-medium tracking-[0.12em] text-white/50 uppercase">
          <span className="flex items-center gap-2">
            <Film className="size-3" /> Eleganto Campaign Archive
          </span>
          <span>All rights reserved © 2026</span>
        </div>
      </div>

      {viewer !== null && (
        <div className="animate-fade-in fixed inset-0 z-[80] flex items-center justify-center bg-black/95" role="dialog" aria-modal="true" aria-label="Lookbook">
          <button onClick={() => setViewer(null)} aria-label="Close" className="absolute top-5 right-5 z-10 text-white/80 hover:text-white">
            <X className="size-7" strokeWidth={1.4} />
          </button>
          <button onClick={() => step(-1)} aria-label="Previous" className="absolute left-3 z-10 text-white/70 hover:text-white sm:left-8">
            <ChevronLeft className="size-9" strokeWidth={1.2} />
          </button>
          <button onClick={() => step(1)} aria-label="Next" className="absolute right-3 z-10 text-white/70 hover:text-white sm:right-8">
            <ChevronRight className="size-9" strokeWidth={1.2} />
          </button>
          <div key={viewer} className="animate-fade-in relative h-[84vh] w-[min(92vw,63vh)]">
            <Image src={lookbook[viewer]} alt={`Lookbook frame ${viewer + 1}`} fill sizes="63vh" className="object-contain" />
          </div>
          <p className="absolute bottom-6 text-[11px] font-bold tracking-[0.3em] text-white/60">
            {String(viewer + 1).padStart(2, "0")} / {String(lookbook.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </section>
  );
}
