'use client';
import Link from 'next/link';
import { ArrowUpRight, ImageIcon, LayoutDashboard, Settings, ShoppingBag, Shirt, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { STORE_URL } from '@/lib/format';

const groups = [
  { caption: 'Overview', links: [{ href: '/', label: 'Dashboard', icon: LayoutDashboard }] },
  { caption: 'Commerce', links: [{ href: '/orders', label: 'Orders', icon: ShoppingBag }, { href: '/products', label: 'Products', icon: Shirt }, { href: '/users', label: 'Customers', icon: Users }] },
  { caption: 'Storefront', links: [{ href: '/banners', label: 'Banners', icon: ImageIcon }, { href: '/settings', label: 'Settings', icon: Settings }] },
];

export default function Sidebar() {
  const path = usePathname();
  const active = (href: string) => path === href || (href !== '/' && path.startsWith(href));
  return <aside className="sidebar">
    <div className="mb-9 flex items-center gap-3 px-3"><span className="grid size-9 place-items-center rounded-xl bg-ink text-sm font-black text-accent">E</span><span className="brand-text text-lg font-black tracking-[-.06em]">ELEGANTO</span></div>
    <nav className="flex-1 space-y-6 overflow-y-auto">{groups.map(g => <div key={g.caption}>
      <p className="sidebar-caption mb-2 px-3 text-[10px] font-bold tracking-[.2em] text-muted uppercase">{g.caption}</p>
      <div className="space-y-1">{g.links.map(({ href, label, icon: Icon }) => <Link className={`nav-link ${active(href) ? 'active' : ''}`} href={href} key={href} title={label}><Icon size={18} strokeWidth={1.9} /><span className="nav-label">{label}</span></Link>)}</div>
    </div>)}</nav>
    <a href={STORE_URL} target="_blank" rel="noreferrer" className="nav-link mb-3 border border-line" title="View storefront"><ArrowUpRight size={18} /><span className="nav-label">View storefront</span></a>
    <div className="flex items-center gap-3 border-t border-line px-2 pt-4"><div className="grid size-9 flex-none place-items-center rounded-full bg-accent text-xs font-black">AD</div><div className="nav-label"><p className="text-xs font-bold">Admin</p><p className="text-[11px] text-muted">Store manager</p></div></div>
  </aside>;
}
