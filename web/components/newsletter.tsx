"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="border-b border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-[104px]">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] text-white/60 uppercase">
            <span className="size-2 rounded-full bg-emerald-500" /> Private access dispatch
          </p>
          <h2 className="mt-3 text-[32px] leading-none font-extrabold tracking-[-0.04em] sm:text-[38px]">JOIN THE ELEGANTO LIST</h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed font-light text-white/70">
            Be first to know about new drops, restocks of sold-out prints, and limited acid wash runs before they go
            public.
          </p>
        </div>
        <div>
          {done ? (
            <p className="flex items-center gap-3 rounded-md border border-white/15 bg-white/5 px-5 py-4 text-sm">
              <Check className="size-4 text-emerald-400" /> You&apos;re on the list. Watch our page for the next drop.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <label className="flex flex-1 items-center gap-3 rounded-md border border-white/15 bg-white/5 px-5 focus-within:border-white/50">
                <Mail className="size-4 text-white/50" strokeWidth={1.6} />
                <input
                  required
                  type="email"
                  placeholder="ENTER YOUR EMAIL FOR VIP ENTRY..."
                  className="h-[46px] flex-1 bg-transparent text-[15px] outline-none placeholder:text-white/40"
                />
              </label>
              <button className="flex h-[46px] items-center justify-center gap-3 rounded-md bg-white px-6 text-[13px] font-bold tracking-[0.18em] text-black uppercase transition hover:bg-white/85">
                Subscribe <ArrowRight className="size-4" />
              </button>
            </form>
          )}
          <p className="mt-3 text-[11px] text-white/50">Strict privacy · No spam · Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
