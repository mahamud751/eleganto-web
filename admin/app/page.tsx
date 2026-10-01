import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Clock3, ImageIcon, PackageCheck, Plus, Settings, ShoppingBag, TrendingUp } from 'lucide-react';
import PageHeader from '@/components/page-header';
import { getOrders, getSummary } from '@/lib/api';
import { ORDER_STATUSES, STORE_URL, StatusPill, money, orderTone } from '@/lib/format';

const greeting = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

export default async function Dashboard() {
  const [summary, orders] = await Promise.all([getSummary(), getOrders()]);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const byStatus = ORDER_STATUSES.map(s => ({ status: s, count: orders.filter(o => o.status === s).length }));
  return <>
    <PageHeader eyebrow={today} title={`${greeting()}, admin.`} description="Here's what's happening in your store." action={<a href={STORE_URL} target="_blank" rel="noreferrer" className="btn btn-primary">View storefront <ArrowUpRight size={15} /></a>} />
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat icon={<ShoppingBag size={18} />} label="Total orders" value={summary.orders} note="All time" />
      <Stat icon={<TrendingUp size={18} />} label="Revenue" value={money(summary.revenue)} note="Excluding cancelled" accent />
      <Stat icon={<PackageCheck size={18} />} label="Products" value={summary.products} note="In catalogue" />
      <Stat icon={<Clock3 size={18} />} label="Needs attention" value={summary.pending} note="Pending orders" alert={summary.pending > 0} />
    </section>
    <section className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4"><div><h2 className="text-lg font-black tracking-[-.04em]">Recent orders</h2><p className="mt-1 text-xs text-muted">Latest activity from your storefront</p></div><Link className="btn btn-ghost h-9 px-4" href="/orders">View all <ArrowRight size={14} /></Link></div>
        <div className="overflow-x-auto"><table className="table min-w-[560px]"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead><tbody>
          {orders.slice(0, 6).map(o => <tr key={o.id}><td className="font-bold">{o.orderNumber}</td><td>{o.customerName}</td><td className="text-muted">{new Date(o.createdAt).toLocaleDateString()}</td><td className="font-bold">{money(o.total)}</td><td><StatusPill value={o.status} /></td></tr>)}
          {orders.length === 0 && <tr><td className="py-12 text-center text-muted" colSpan={5}>No orders yet. They will show up here as soon as customers check out.</td></tr>}
        </tbody></table></div>
      </div>
      <div className="space-y-5">
        <div className="card p-6"><h2 className="text-lg font-black tracking-[-.04em]">Order pipeline</h2><p className="mt-1 text-xs text-muted">Where every order currently stands</p>
          <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-[#f0f0eb]">{byStatus.filter(s => s.count).map(s => <span key={s.status} className={orderTone(s.status)} style={{ width: `${(s.count / Math.max(orders.length, 1)) * 100}%` }} />)}</div>
          <div className="mt-4 grid grid-cols-2 gap-2">{byStatus.map(s => <Link href={`/orders?status=${s.status}`} key={s.status} className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5 transition hover:border-ink"><StatusPill value={s.status} /><span className="text-sm font-black">{s.count}</span></Link>)}</div>
        </div>
        <div className="card dot-grid p-6"><h2 className="text-lg font-black tracking-[-.04em]">Quick actions</h2>
          <div className="mt-4 grid gap-2">{[{ href: '/products?new=1', label: 'Add a new product', icon: Plus }, { href: '/banners', label: 'Update homepage banners', icon: ImageIcon }, { href: '/settings', label: 'Payment & store settings', icon: Settings }].map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="group flex items-center gap-3 rounded-xl border border-line bg-white p-3 text-sm font-bold transition hover:border-ink"><span className="grid size-8 place-items-center rounded-lg bg-accent"><Icon size={15} /></span>{label}<ArrowRight size={15} className="ml-auto text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" /></Link>)}</div>
        </div>
      </div>
    </section>
  </>;
}

function Stat({ icon, label, value, note, alert, accent }: { icon: React.ReactNode; label: string; value: string | number; note: string; alert?: boolean; accent?: boolean }) {
  return <div className={`card stat ${accent ? 'border-ink bg-ink text-white' : ''}`}><div className="mb-5 flex items-center justify-between"><span className={`grid size-10 place-items-center rounded-xl ${accent ? 'bg-accent text-ink' : 'bg-[#f0f0eb]'}`}>{icon}</span>{alert && <span className="pill bg-amber-100 text-amber-800">Action needed</span>}</div><p className={`text-[11px] font-bold tracking-[.12em] uppercase ${accent ? 'text-white/60' : 'text-muted'}`}>{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em]">{value}</p><p className={`mt-2 text-xs ${accent ? 'text-white/60' : 'text-muted'}`}>{note}</p></div>;
}
