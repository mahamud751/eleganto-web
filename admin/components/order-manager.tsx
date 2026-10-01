'use client';
import { Fragment, useState } from 'react';
import { ChevronDown, Copy, MapPin, Phone, ShoppingBag, StickyNote } from 'lucide-react';
import { CLIENT_API, Order } from '@/lib/api';
import { ORDER_STATUSES, money, orderTone } from '@/lib/format';
import { Empty, SearchBox, Tabs, useToast } from './ui';

const PAYMENT_TONES: Record<string, string> = { BKASH: 'bg-pink-100 text-pink-700', NAGAD: 'bg-orange-100 text-orange-700' };

export default function OrderManager({ initial, initialStatus = 'ALL' }: { initial: Order[]; initialStatus?: string }) {
  const [orders, setOrders] = useState(initial);
  const [status, setStatus] = useState(initialStatus);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [toast, notify] = useToast();

  const update = async (o: Order, next: string) => {
    setOrders(x => x.map(y => y.id === o.id ? { ...y, status: next } : y));
    const r = await fetch(`${CLIENT_API}/orders/${o.id}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) }).catch(() => null);
    if (r?.ok) notify(`${o.orderNumber} marked ${next.toLowerCase()}`);
    else { setOrders(x => x.map(y => y.id === o.id ? { ...y, status: o.status } : y)); notify('Could not update status', 'error'); }
  };
  const copy = (text: string) => { navigator.clipboard?.writeText(text); notify('Copied to clipboard'); };

  const q = query.trim().toLowerCase();
  const visible = orders.filter(o => (status === 'ALL' || o.status === status) && (!q || `${o.orderNumber} ${o.customerName} ${o.phone} ${o.city} ${o.transactionId || ''}`.toLowerCase().includes(q)));
  const tabs = [{ value: 'ALL', label: 'All', count: orders.length }, ...ORDER_STATUSES.map(s => ({ value: s, label: s.charAt(0) + s.slice(1).toLowerCase(), count: orders.filter(o => o.status === s).length }))];

  return <>
    <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"><Tabs value={status} onChange={setStatus} options={tabs} /><SearchBox value={query} onChange={setQuery} placeholder="Order #, name, phone, Trx ID…" /></div>
    <div className="card overflow-x-auto">
      {visible.length === 0 ? <Empty icon={<ShoppingBag size={24} />} title="No orders found" text={orders.length ? 'Try a different status or search.' : 'Orders placed on the storefront will appear here.'} /> :
      <table className="table min-w-[980px]">
        <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Placed</th><th /></tr></thead>
        <tbody>{visible.map(o => { const expanded = open === o.id; return <Fragment key={o.id}>
          <tr className={`cursor-pointer ${expanded ? 'bg-[#fbfbf9]' : ''}`} onClick={() => setOpen(expanded ? null : o.id)}>
            <td className="font-bold">{o.orderNumber}</td>
            <td><p className="font-bold">{o.customerName}</p><p className="text-xs text-muted">{o.phone} · {o.city}</p></td>
            <td>{o.items?.reduce((a, i) => a + i.quantity, 0) || 0} pcs</td>
            <td className="font-bold">{money(o.total)}</td>
            <td><span className={`pill ${PAYMENT_TONES[o.paymentMethod] || 'bg-neutral-100 text-neutral-700'}`}>{o.paymentMethod || 'COD'}</span>{o.transactionId && <p className="mt-1 font-mono text-[10px] text-muted">{o.transactionId}</p>}</td>
            <td onClick={e => e.stopPropagation()}><select value={o.status} onChange={e => update(o, e.target.value)} className={`input h-9 w-36 rounded-full border-0 text-xs font-bold ${orderTone(o.status)}`}>{ORDER_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}</select></td>
            <td className="text-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
            <td><ChevronDown size={16} className={`text-muted transition ${expanded ? 'rotate-180' : ''}`} /></td>
          </tr>
          {expanded && <tr className="hover:bg-transparent"><td colSpan={8} className="!border-t-0 bg-[#fbfbf9] !pt-0">
            <div className="grid gap-4 pb-2 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-2xl border border-line bg-white p-4"><p className="label">Items</p>
                {o.items.map(i => <div key={i.id} className="flex items-center justify-between border-b border-line py-2.5 text-sm last:border-0"><div><p className="font-bold">{i.name}</p><p className="text-xs text-muted">Size {i.size} · Qty {i.quantity}</p></div><span className="font-bold">{money(i.unitPrice * i.quantity)}</span></div>)}
                <div className="mt-2 space-y-1 border-t border-line pt-3 text-sm"><Row k="Subtotal" v={money(o.subtotal)} /><Row k="Delivery" v={money(o.deliveryFee)} /><Row k="Total" v={money(o.total)} bold /></div>
              </div>
              <div className="space-y-3 rounded-2xl border border-line bg-white p-4 text-sm"><p className="label">Delivery</p>
                <p className="flex gap-2"><MapPin size={15} className="mt-0.5 flex-none text-muted" />{o.address}, {o.zone}, {o.city}</p>
                <p className="flex items-center gap-2"><Phone size={15} className="text-muted" />{o.phone}{o.altPhone && ` / ${o.altPhone}`}<button onClick={() => copy(o.phone)} className="text-muted hover:text-ink" title="Copy phone"><Copy size={13} /></button></p>
                {o.notes && <p className="flex gap-2"><StickyNote size={15} className="mt-0.5 flex-none text-muted" />{o.notes}</p>}
                {o.transactionId && <p className="rounded-xl bg-[#fafaf7] p-3 text-xs">Paid via <b>{o.paymentMethod}</b> from {o.paymentNumber || '—'}<br />Trx ID <b className="font-mono">{o.transactionId}</b></p>}
              </div>
            </div>
          </td></tr>}
        </Fragment>; })}</tbody>
      </table>}
    </div>
    {toast}
  </>;
}
function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) { return <div className={`flex justify-between ${bold ? 'font-black' : 'text-muted'}`}><span>{k}</span><span>{v}</span></div>; }
