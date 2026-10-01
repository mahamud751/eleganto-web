import Link from "next/link";
import { ArrowUp, Clock, ExternalLink, Mail, MapPin, Phone, RefreshCw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { categories } from "@/lib/products";
import { site } from "@/lib/site";
import { FacebookIcon, MessengerIcon, WhatsAppIcon } from "./brand-icons";

const features = [
  { icon: Truck, title: "Express Delivery", text: "Inside Dhaka in 24–48 hrs (৳80). All districts across Bangladesh in 3–5 days (৳150)." },
  { icon: ShieldCheck, title: "Cash on Delivery", text: "Check your tee at your doorstep before you pay, anywhere in the country." },
  { icon: RefreshCw, title: "3-Day Exchange", text: "Simple size exchanges for unworn pieces with tags intact." },
  { icon: Sparkles, title: "Heavyweight Craft", text: "Heavyweight cotton, real acid wash finish and prints built to last wash after wash." },
];

const care = [
  { href: "/help#shipping", label: "Shipping Rates & Timelines" },
  { href: "/help#returns", label: "Returns & 3-Day Exchange" },
  { href: "/help#sizing", label: "Size Guide" },
  { href: "/help#care", label: "Garment Care & Wash Guide" },
  { href: "/help#contact", label: "Contact Us" },
];

export default function Footer() {
  const whatsappHref = site.whatsapp ? `https://wa.me/${site.whatsapp}` : null;

  return (
    <footer className="bg-ink text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-8 lg:px-[104px]">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5">
                <f.icon className="size-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[13px] font-bold tracking-[0.18em] uppercase">{f.title}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-white/60">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[1.35fr_0.6fr_0.9fr_0.95fr] lg:px-[104px] lg:py-20">
        <div>
          <p className="font-serif text-[40px] leading-none font-bold tracking-[0.1em]">ELEGANTO</p>
          <p className="mt-3 text-[11px] font-semibold tracking-[0.3em] text-white/70 uppercase">{site.tagline}</p>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed font-light text-white/70">
            Oversized silhouettes, real acid wash texture and statement prints for people who dress different. Every
            drop is produced in limited runs — when it&apos;s gone, it&apos;s gone.
          </p>
          <ul className="mt-8 space-y-3 text-[13px] text-white/80">
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-white/50" strokeWidth={1.5} /> {site.location}
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white">
                <FacebookIcon className="size-4 text-white/50" /> facebook.com/elegantooooo
              </a>
            </li>
            {site.email && (
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-white/50" strokeWidth={1.5} /> {site.email}
              </li>
            )}
            {site.phone && (
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-white/50" strokeWidth={1.5} /> {site.phone}
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-bold tracking-[0.2em] uppercase">Shop</p>
          <ul className="mt-5 space-y-3 text-[14px] text-white/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop?category=new" className="hover:text-white">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/shop" className="font-semibold text-white">
                View All Products →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-bold tracking-[0.2em] uppercase">Client Care</p>
          <ul className="mt-5 space-y-3 text-[14px] text-white/70">
            {care.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[13px] font-bold tracking-[0.2em] uppercase">Direct Concierge</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-emerald-400 uppercase">
              <span className="size-2 animate-pulse rounded-full bg-emerald-400" /> Live concierge online
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/80">
              Message us for size help, order tracking, or bulk & custom requests.
            </p>
            <a
              href={site.messenger}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2.5 rounded-md bg-[#0866FF] py-3 text-[12px] font-bold tracking-[0.15em] uppercase transition hover:brightness-110"
            >
              <MessengerIcon /> Chat on Messenger <ExternalLink className="size-3.5" />
            </a>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2.5 rounded-md bg-emerald-600 py-3 text-[12px] font-bold tracking-[0.15em] uppercase transition hover:bg-emerald-500"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            )}
            <p className="mt-4 flex items-center gap-2 text-[11px] text-white/50">
              <Clock className="size-3.5" /> Replies daily, 10:00 AM – 10:00 PM
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-[104px]">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.08em]">Copyright © 2026 | <a href="https://savasaachi.co.uk/" target="_blank" rel="noreferrer" className="underline underline-offset-4">Savaasachi</a> | All rights reserved. | Developed by Savasaachi Developers.</p>
            <p className="mt-1 text-[10px] tracking-[0.2em] text-white/40 uppercase">Different is beautiful · Oversized streetwear</p>
          </div>
          <div className="flex items-center gap-3">
            <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-9 place-items-center rounded-full border border-white/15 hover:bg-white hover:text-black">
              <FacebookIcon />
            </a>
            <a href={site.messenger} target="_blank" rel="noreferrer" aria-label="Messenger" className="grid size-9 place-items-center rounded-full border border-white/15 hover:bg-white hover:text-black">
              <MessengerIcon />
            </a>
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-9 place-items-center rounded-full border border-white/15 hover:bg-white hover:text-black">
                <WhatsAppIcon />
              </a>
            )}
            <a href="#" className="ml-2 flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold tracking-[0.2em] hover:bg-white hover:text-black">
              TOP <ArrowUp className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
