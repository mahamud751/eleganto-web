"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRight, Heart, Menu, ShoppingBag, Sparkles, UserRound, X } from "lucide-react";
import { useCart } from "./cart";
import { categories } from "@/lib/products";
import { marquee, site } from "@/lib/site";
import { MessengerIcon } from "./brand-icons";
import { useAuth } from "./auth";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { count, setOpen } = useCart();
  const { user, wishlist } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus after navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setCatsOpen(false);
    setMobileOpen(false);
  }

  const solid = !isHome || scrolled || catsOpen;
  const tone = solid ? "text-ink" : "text-white";
  const navLink =
    "relative text-[11px] font-bold uppercase tracking-[0.22em] transition-opacity hover:opacity-60";

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        {/* announcement marquee */}
        <div className="h-8 overflow-hidden bg-ink text-white">
          <div className="animate-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center" aria-hidden={k === 1}>
                {Array.from({ length: 3 }).map((_, r) => (
                  <span key={r} className="flex items-center px-12 text-[13px] leading-8 font-medium tracking-wider">
                    {marquee.join(" · ")}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <header
          onMouseLeave={() => setCatsOpen(false)}
          className={`relative transition-colors duration-500 ${
            solid ? "bg-white/95 shadow-[0_1px_0_#ececec] backdrop-blur" : "bg-transparent"
          }`}
        >
          <div
            className={`mx-auto grid h-[68px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 transition-[height] duration-500 sm:px-8 lg:px-[104px] ${
              solid ? "" : "lg:h-[100px]"
            } ${tone}`}
          >
            <nav className="flex items-center gap-10">
              <button className="lg:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
                <Menu className="size-6" strokeWidth={1.6} />
              </button>
              <Link href="/shop" className={`${navLink} hidden lg:block`}>
                Shop
                {pathname === "/shop" && <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-current" />}
              </Link>
              <button
                className={`${navLink} hidden lg:block`}
                onMouseEnter={() => setCatsOpen(true)}
                onClick={() => setCatsOpen((v) => !v)}
                aria-expanded={catsOpen}
              >
                Categories
              </button>
              <Link href="/#lookbook" className={`${navLink} hidden items-center gap-1.5 lg:flex`}>
                <Sparkles className="size-3.5" strokeWidth={1.8} /> Lookbook
              </Link>
            </nav>

            <Link href="/" aria-label={`${site.name} home`} className="flex flex-col items-center leading-none">
              <span className="relative font-serif text-[26px] font-bold tracking-[0.06em] sm:text-[30px]">
                ELEGANTO
                <sup className="absolute -top-1 -right-4 font-sans text-[9px] font-bold">™</sup>
              </span>
            </Link>

            <div className="flex items-center justify-end gap-7">
              <a
                href={site.messenger}
                target="_blank"
                rel="noreferrer"
                className={`${navLink} hidden items-center gap-2 lg:flex`}
              >
                <MessengerIcon className="size-4" /> Messenger
              </a>
              <Link href="/wishlist" aria-label="Wishlist" className="relative transition-opacity hover:opacity-60">
                <Heart className="size-[21px]" strokeWidth={1.6} />
                {wishlist.size > 0 && <span className="absolute -top-2 -right-2 grid size-[17px] place-items-center rounded-full bg-ink text-[9px] font-bold text-white ring-2 ring-white">{wishlist.size}</span>}
              </Link>
              <Link href={user ? "/account" : "/login"} aria-label={user ? "My account" : "Sign in"} className="transition-opacity hover:opacity-60"><UserRound className="size-[21px]" strokeWidth={1.6} /></Link>
              <button
                onClick={() => setOpen(true)}
                aria-label={`Open bag, ${count} items`}
                className="relative transition-opacity hover:opacity-60"
              >
                <ShoppingBag className="size-[22px]" strokeWidth={1.6} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 grid size-[18px] place-items-center rounded-full bg-ink text-[10px] font-bold text-white ring-2 ring-white">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* categories mega menu */}
          {catsOpen && (
            <div className="animate-fade-in absolute inset-x-0 top-full hidden border-t border-line bg-white lg:block">
              <div className="mx-auto grid max-w-[1440px] grid-cols-[260px_1fr] gap-12 px-[104px] py-10">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase">Categories</p>
                  <ul className="mt-5 space-y-3">
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/shop?category=${c.slug}`} className="group flex items-center justify-between text-lg font-bold tracking-tight">
                          {c.name}
                          <ChevronRight className="size-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/shop" className="text-sm font-semibold underline underline-offset-4">
                        View all products
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {categories.map((c) => (
                    <Link key={c.slug} href={`/shop?category=${c.slug}`} className="group relative aspect-[4/3] overflow-hidden bg-mist">
                      <Image src={c.cover} alt={c.name} fill sizes="25vw" className="object-cover object-[center_30%] transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-sm font-bold tracking-[0.18em] text-white uppercase">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </header>
      </div>

      {!isHome && <div className="h-[100px]" />}

      {/* mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="animate-fade-in absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="animate-fade-in absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white">
            <div className="flex h-[68px] items-center justify-between border-b border-line px-5">
              <span className="font-serif text-2xl font-bold">ELEGANTO</span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X className="size-6" strokeWidth={1.6} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-5">
              {[{ href: "/", label: "Home" }, { href: "/shop", label: "Shop All" }, { href: "/#lookbook", label: "Lookbook" }].map((l) => (
                <Link key={l.href} href={l.href} className="py-3 text-2xl font-extrabold tracking-tight uppercase">
                  {l.label}
                </Link>
              ))}
              <p className="mt-6 text-[10px] font-bold tracking-[0.3em] text-muted uppercase">Categories</p>
              {categories.map((c) => (
                <Link key={c.slug} href={`/shop?category=${c.slug}`} className="flex items-center gap-4 py-2.5">
                  <span className="relative size-14 overflow-hidden bg-mist">
                    <Image src={c.cover} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="text-sm font-bold tracking-[0.12em] uppercase">{c.name}</span>
                </Link>
              ))}
              <Link href={user ? "/account" : "/login"} className="mt-6 border-t border-line pt-5 text-sm font-bold uppercase">{user ? `Account · ${user.name}` : "Login / Register"}</Link>
              <Link href="/wishlist" className="py-2 text-sm font-bold uppercase">Wishlist ({wishlist.size})</Link>
            </nav>
            <a href={site.messenger} target="_blank" rel="noreferrer" className="mt-auto flex items-center justify-center gap-2 bg-ink py-4 text-xs font-bold tracking-[0.25em] text-white uppercase">
              <MessengerIcon /> Chat on Messenger
            </a>
          </aside>
        </div>
      )}
    </>
  );
}
