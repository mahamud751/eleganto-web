'use client';
import { useState } from 'react';
import { Mail, Phone, Users } from 'lucide-react';
import { Customer } from '@/lib/api';
import { initials } from '@/lib/format';
import { Empty, SearchBox, Tabs } from './ui';

const AVATAR = ['bg-accent', 'bg-sky-200', 'bg-amber-200', 'bg-rose-200', 'bg-violet-200', 'bg-emerald-200'];

export default function CustomerList({ initial }: { initial: Customer[] }) {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<'ALL' | 'CUSTOMER' | 'ADMIN'>('ALL');
  const q = query.trim().toLowerCase();
  const visible = initial.filter(u => (role === 'ALL' || u.role === role) && (!q || `${u.name} ${u.email} ${u.phone || ''}`.toLowerCase().includes(q)));
  return <>
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><Tabs value={role} onChange={setRole} options={[{ value: 'ALL', label: 'All', count: initial.length }, { value: 'CUSTOMER', label: 'Customers', count: initial.filter(u => u.role === 'CUSTOMER').length }, { value: 'ADMIN', label: 'Admins', count: initial.filter(u => u.role === 'ADMIN').length }]} /><SearchBox value={query} onChange={setQuery} placeholder="Search name, email, phone…" /></div>
    <div className="card overflow-x-auto">{visible.length === 0 ? <Empty icon={<Users size={24} />} title="No customers found" text={initial.length ? 'Try a different search.' : 'Customers appear here once they create an account.'} /> :
      <table className="table min-w-[760px]"><thead><tr><th>Customer</th><th>Contact</th><th>Orders</th><th>Role</th><th>Status</th><th>Joined</th></tr></thead><tbody>
        {visible.map((u, i) => <tr key={u.id}>
          <td><div className="flex items-center gap-3"><span className={`grid size-10 flex-none place-items-center rounded-full text-xs font-black ${AVATAR[i % AVATAR.length]}`}>{initials(u.name)}</span><span className="font-bold">{u.name}</span></div></td>
          <td><p className="flex items-center gap-1.5 text-sm"><Mail size={13} className="text-muted" />{u.email}</p>{u.phone && <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted"><Phone size={12} />{u.phone}</p>}</td>
          <td><span className="font-black">{u._count.orders}</span></td>
          <td><span className={`pill ${u.role === 'ADMIN' ? 'bg-ink text-white' : 'bg-[#f0f0eb] text-[#55554f]'}`}>{u.role === 'ADMIN' ? 'Admin' : 'Customer'}</span></td>
          <td><span className={`pill ${u.active ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}`}><i className="size-1.5 rounded-full bg-current" />{u.active ? 'Active' : 'Disabled'}</span></td>
          <td className="text-muted">{new Date(u.createdAt).toLocaleDateString()}</td>
        </tr>)}
      </tbody></table>}</div>
  </>;
}
