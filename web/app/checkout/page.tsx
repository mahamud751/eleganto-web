"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Banknote, Check, Copy, ShieldCheck, Smartphone } from "lucide-react";
import { useCart } from "@/components/cart";
import { MessengerIcon, WhatsAppIcon } from "@/components/brand-icons";
import { getProduct } from "@/lib/products";
import { money, site } from "@/lib/site";
import { API_URL } from "@/lib/api";

type Form = { name: string; phone: string; alt: string; address: string; city: string; notes: string };

const field =
  "h-12 w-full border border-line bg-white px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-ink";
const labelCls = "mb-2 block text-[10px] font-bold tracking-[0.25em] text-muted uppercase";

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [zone, setZone] = useState<string>(site.zones[0].id);
  const [form, setForm] = useState<Form>({ name: "", phone: "", alt: "", address: "", city: "", notes: "" });
  const [placed, setPlaced] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [numberCopied, setNumberCopied] = useState(false);
  const [payment, setPayment] = useState<"COD" | "BKASH" | "NAGAD">("COD");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentNumbers, setPaymentNumbers] = useState<{ bkash: string; nagad: string }>({ bkash: site.bkash, nagad: site.nagad });
  useEffect(() => { fetch(`${API_URL}/settings`).then(response => response.ok ? response.json() : {}).then((settings: Record<string, string>) => setPaymentNumbers({ bkash: settings.bkash || site.bkash, nagad: settings.nagad || site.nagad })).catch(() => {}); }, []);

  const z = site.zones.find((x) => x.id === zone)!;
  const delivery = subtotal >= site.freeShippingOver ? 0 : z.fee;
  const total = subtotal + delivery;
  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildMessage = () => {
    const items = lines
      .map((l) => {
        const p = l.product;
        return `• ${p.name} — ${l.color} · Size ${l.size} × ${l.qty} = ${money(p.price * l.qty)}`;
      })
      .join("\n");
    return [
      `NEW ORDER — ${site.name}`,
      "",
      items,
      "",
      `Subtotal: ${money(subtotal)}`,
      `Delivery (${z.label}): ${delivery ? money(delivery) : "FREE"}`,
      `Total: ${money(total)}`,
      `Payment: ${payment === "COD" ? "Cash on Delivery" : payment}`,
      payment !== "COD" ? `Sender number: ${paymentNumber}` : null,
      payment !== "COD" ? `Transaction ID: ${transactionId}` : null,
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.alt ? `Alt phone: ${form.alt}` : null,
      `Address: ${form.address}, ${form.city}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ]
      .filter((x) => x !== null)
      .join("\n");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = buildMessage();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(localStorage.getItem("eleganto_token") ? { Authorization: `Bearer ${localStorage.getItem("eleganto_token")}` } : {}) },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          altPhone: form.alt,
          address: form.address,
          city: form.city,
          zone: z.label,
          notes: form.notes,
          deliveryFee: delivery,
          paymentMethod: payment,
          paymentNumber: payment !== "COD" ? paymentNumber : undefined,
          transactionId: payment !== "COD" ? transactionId : undefined,
          items: lines.map((line) => ({ slug: line.slug, size: line.size, color: line.color, quantity: line.qty })),
        }),
      });
    } catch {
      // The external contact handoff below remains available while the API is offline.
    }
    if (site.whatsapp) {
      window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    } else {
      try {
        await navigator.clipboard.writeText(msg);
        setCopied(true);
      } catch {}
      window.open(site.messenger, "_blank");
    }
    setPlaced(msg);
    clear();
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-ink text-white">
          <Check className="size-7" />
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-[-0.04em] uppercase">Order ready</h1>
        <p className="mt-3 text-sm text-neutral-600">
          {site.whatsapp
            ? "We opened WhatsApp with your order. Press send and our team will confirm it shortly."
            : `We opened ${site.name} on Messenger${copied ? " and copied your order" : ""}. Paste it into the chat and press send — we'll confirm it shortly.`}
        </p>
        <pre className="mt-8 border border-line bg-mist p-5 text-left text-xs leading-relaxed whitespace-pre-wrap">{placed}</pre>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(placed);
              setCopied(true);
            }}
            className="flex items-center justify-center gap-2 border border-ink px-6 py-3 text-[11px] font-bold tracking-[0.2em] uppercase"
          >
            <Copy className="size-3.5" /> {copied ? "Copied" : "Copy order"}
          </button>
          <Link href="/shop" className="bg-ink px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-white uppercase">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="px-5 py-28 text-center">
        <h1 className="text-4xl font-extrabold tracking-[-0.04em] uppercase">Your bag is empty</h1>
        <Link href="/shop" className="mt-8 inline-block bg-ink px-10 py-4 text-[11px] font-bold tracking-[0.3em] text-white uppercase">
          Shop the drop
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-[1280px] gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:py-16">
      <div>
        <h1 className="text-[40px] leading-none font-extrabold tracking-[-0.045em] uppercase">Checkout</h1>
        <p className="mt-3 text-sm text-muted">Choose Cash on Delivery or complete a manual mobile payment.</p>

        <h2 className="mt-10 text-[12px] font-bold tracking-[0.3em] uppercase">Customer Information</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className={labelCls}>Full name</span>
            <input required className={field} value={form.name} onChange={set("name")} placeholder="Your name" />
          </label>
          <label>
            <span className={labelCls}>Phone number</span>
            <input required type="tel" pattern="[0-9+ -]{10,16}" className={field} value={form.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" />
          </label>
          <label>
            <span className={labelCls}>Alternative number</span>
            <input type="tel" className={field} value={form.alt} onChange={set("alt")} placeholder="Optional" />
          </label>
          <label className="sm:col-span-2">
            <span className={labelCls}>Address</span>
            <input required className={field} value={form.address} onChange={set("address")} placeholder="House no, road, area" />
          </label>
          <label className="sm:col-span-2">
            <span className={labelCls}>City / District</span>
            <input required className={field} value={form.city} onChange={set("city")} placeholder="e.g. Dhaka" />
          </label>
        </div>

        <h2 className="mt-10 text-[12px] font-bold tracking-[0.3em] uppercase">Delivery Zone</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {site.zones.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center justify-between border p-5 transition ${zone === opt.id ? "border-ink bg-mist" : "border-line hover:border-black/30"}`}
            >
              <span>
                <span className="block text-sm font-bold uppercase">{opt.label}</span>
                <span className="text-xs text-muted">{opt.eta}</span>
              </span>
              <span className="flex items-center gap-3 text-sm font-bold">
                {money(opt.fee)}
                <input type="radio" name="zone" value={opt.id} checked={zone === opt.id} onChange={() => setZone(opt.id)} className="accent-black" />
              </span>
            </label>
          ))}
        </div>

        <label className="mt-8 block">
          <span className={labelCls}>Order notes</span>
          <textarea rows={3} className={`${field} h-auto py-3`} value={form.notes} onChange={set("notes")} placeholder="Anything we should know?" />
        </label>

        <h2 className="mt-10 text-[12px] font-bold tracking-[0.3em] uppercase">Payment method</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {([{ id: "COD", label: "Cash on Delivery", icon: Banknote, tone: "bg-neutral-100" }, { id: "BKASH", label: "bKash", icon: Smartphone, tone: "bg-pink-50" }, { id: "NAGAD", label: "Nagad", icon: Smartphone, tone: "bg-orange-50" }] as const).map(option => <button type="button" key={option.id} onClick={() => setPayment(option.id)} className={`relative flex min-h-28 flex-col items-start justify-between border p-4 text-left transition ${payment === option.id ? 'border-ink ring-1 ring-ink' : 'border-line hover:border-black/30'} ${option.tone}`}><option.icon className="size-5"/><span className="text-xs font-bold uppercase">{option.label}</span>{payment === option.id && <span className="absolute top-3 right-3 grid size-5 place-items-center rounded-full bg-ink text-white"><Check className="size-3"/></span>}</button>)}
        </div>
        {payment === "COD" ? <div className="mt-4 flex items-center gap-3 border border-line p-5"><ShieldCheck className="size-5" strokeWidth={1.5}/><div><p className="text-sm font-bold uppercase">Pay at your doorstep</p><p className="text-xs text-muted">Check the parcel and pay the delivery agent in cash.</p></div></div> : <div className={`mt-4 border p-5 ${payment === 'BKASH' ? 'border-pink-200 bg-pink-50' : 'border-orange-200 bg-orange-50'}`}><p className="text-sm font-bold">Send Money with {payment === 'BKASH' ? 'bKash' : 'Nagad'}</p>{(payment === 'BKASH' ? paymentNumbers.bkash : paymentNumbers.nagad) && <div className="mt-3 flex items-center justify-between gap-3 border border-black/10 bg-white px-4 py-3"><div><p className="text-[10px] font-bold tracking-[0.25em] text-muted uppercase">{payment === 'BKASH' ? 'bKash' : 'Nagad'} number (Personal)</p><p className="text-xl font-extrabold tracking-wide">{payment === 'BKASH' ? paymentNumbers.bkash : paymentNumbers.nagad}</p></div><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(payment === 'BKASH' ? paymentNumbers.bkash : paymentNumbers.nagad); setNumberCopied(true); setTimeout(() => setNumberCopied(false), 1500); } catch {} }} className="flex items-center gap-2 border border-ink px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase">{numberCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}{numberCopied ? 'Copied' : 'Copy'}</button></div>}<ol className="mt-3 space-y-1 text-xs text-neutral-600"><li>1. Send Money the exact total <strong>{money(total)}</strong> to <strong>{payment === 'BKASH' ? (paymentNumbers.bkash || 'the shop bKash number') : (paymentNumbers.nagad || 'the shop Nagad number')}</strong>.</li><li>2. Enter your sender number and transaction ID below.</li><li>3. We will manually verify payment before dispatch.</li></ol><div className="mt-4 grid gap-3 sm:grid-cols-2"><input required value={paymentNumber} onChange={e=>setPaymentNumber(e.target.value)} className={field} placeholder="Sender mobile number"/><input required value={transactionId} onChange={e=>setTransactionId(e.target.value)} className={field} placeholder="Transaction ID"/></div></div>}
      </div>

      <aside className="h-fit border border-line bg-mist p-6 lg:sticky lg:top-[124px]">
        <p className="text-[12px] font-bold tracking-[0.3em] uppercase">Order Summary</p>
        <ul className="mt-5 divide-y divide-line">
          {lines.map((l) => {
            const p = l.product;
            return (
              <li key={l.slug + l.size + l.color} className="flex gap-4 py-4">
                <span className="relative h-20 w-16 shrink-0 overflow-hidden bg-white">
                  <Image src={p.images[0]} alt={p.name} fill sizes="64px" className="object-cover" />
                  <span className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">{l.qty}</span>
                </span>
                <span className="flex-1">
                  <span className="block text-[12px] font-bold uppercase">{p.name}</span>
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-muted uppercase">{l.color} · Size {l.size}</span>
                </span>
                <span className="text-sm font-bold">{money(p.price * l.qty)}</span>
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd className="font-semibold">{money(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Delivery · {z.label}</dt><dd className="font-semibold">{delivery ? money(delivery) : "FREE"}</dd></div>
          <div className="flex justify-between border-t border-line pt-3 text-lg"><dt className="font-bold uppercase">Total</dt><dd className="font-extrabold">{money(total)}</dd></div>
        </dl>
        <button className="mt-6 flex h-16 w-full items-center justify-center gap-3 bg-ink text-[12px] font-bold tracking-[0.35em] text-white uppercase transition hover:bg-neutral-800">
          {site.whatsapp ? <WhatsAppIcon /> : <MessengerIcon />} Place Order
        </button>
        <p className="mt-3 text-center text-[11px] text-muted">
          Your order is sent to us on {site.whatsapp ? "WhatsApp" : "Messenger"} for confirmation.
        </p>
      </aside>
    </form>
  );
}
