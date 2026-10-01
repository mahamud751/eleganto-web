import type { Metadata } from "next";
import { money, site } from "@/lib/site";

export const metadata: Metadata = { title: "Client Care" };

const sections = [
  {
    id: "shipping",
    title: "Shipping Rates & Timelines",
    body: [
      ...site.zones.map((z) => `${z.label}: ${money(z.fee)} — delivered in ${z.eta}.`),
      `Free delivery on orders over ${money(site.freeShippingOver)}.`,
      "Cash on Delivery is available nationwide — check your order at the door before you pay.",
    ],
  },
  {
    id: "returns",
    title: "Returns & 3-Day Exchange",
    body: [
      "Size exchanges are accepted within 3 days of delivery.",
      "Items must be unworn, unwashed and have original tags attached.",
      "Message us on Facebook with your order details to start an exchange.",
    ],
  },
  {
    id: "sizing",
    title: "Size Guide",
    body: [
      "All tees are cut oversized with a dropped shoulder.",
      "Take your usual size for the relaxed Eleganto fit, or one size down for a closer fit.",
      "Each product page has a size chart with chest, length and sleeve measurements.",
    ],
  },
  {
    id: "care",
    title: "Garment Care & Wash Guide",
    body: [
      "Wash cold, inside out, with similar colours.",
      "Acid wash pieces may release a little colour in the first wash — wash separately.",
      "Do not bleach, tumble dry low, and never iron directly on the print.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "Fastest reply: message us on Facebook Messenger (m.me/elegantooooo).",
      "We reply daily from 10:00 AM to 10:00 PM.",
    ],
  },
];

export default function Help() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 lg:py-20">
      <p className="text-[11px] font-bold tracking-[0.4em] text-muted uppercase">Client Care</p>
      <h1 className="mt-2 text-[44px] leading-none font-extrabold tracking-[-0.045em] uppercase">How can we help?</h1>
      <div className="mt-12 divide-y divide-line border-y border-line">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-32 py-10">
            <h2 className="text-[13px] font-bold tracking-[0.3em] uppercase">{s.title}</h2>
            <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-neutral-600">
              {s.body.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <a
        href={site.messenger}
        target="_blank"
        rel="noreferrer"
        className="mt-10 inline-block bg-ink px-10 py-4 text-[11px] font-bold tracking-[0.3em] text-white uppercase"
      >
        Message us on Messenger
      </a>
    </div>
  );
}
