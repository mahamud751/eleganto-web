export const STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || 'http://localhost:3000';
/** Product/banner images may be storefront-relative (/images/x.jpg); resolve them for display in the admin. */
export const img = (src: string) => (src.startsWith('/') && !src.startsWith('//') ? `${STORE_URL}${src}` : src);
export const money = (n: number) => `৳${Number(n || 0).toLocaleString('en-US')}`;
export const titleCase = (s: string) => s.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
export const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';

export const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const;
const ORDER_TONES: Record<string, string> = { PENDING: 'bg-amber-100 text-amber-800', CONFIRMED: 'bg-sky-100 text-sky-800', PACKED: 'bg-violet-100 text-violet-800', SHIPPED: 'bg-indigo-100 text-indigo-800', DELIVERED: 'bg-emerald-100 text-emerald-800', CANCELLED: 'bg-red-100 text-red-700' };
export const orderTone = (status: string) => ORDER_TONES[status] || 'bg-neutral-100 text-neutral-700';
export function StatusPill({ value }: { value: string }) { return <span className={`pill ${orderTone(value)}`}><i className="size-1.5 rounded-full bg-current" />{value.charAt(0) + value.slice(1).toLowerCase()}</span>; }
