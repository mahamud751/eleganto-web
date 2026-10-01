import { authFetch } from './session';
import type { Banner, Customer, Order, Product, Summary } from './api';

export async function getSummary(): Promise<Summary> { try { const r = await authFetch('/dashboard/summary'); if (!r.ok) throw new Error(); return r.json(); } catch { return { orders: 0, products: 0, revenue: 0, pending: 0 }; } }
export async function getOrders(): Promise<Order[]> { try { const r = await authFetch('/orders'); if (!r.ok) throw new Error(); return r.json(); } catch { return []; } }
export async function getProducts(): Promise<Product[]> { try { const r = await authFetch('/products'); if (!r.ok) throw new Error(); return r.json(); } catch { return []; } }
export async function getBanners(): Promise<Banner[]> { try { const r = await authFetch('/banners'); return r.ok ? r.json() : []; } catch { return []; } }
export async function getUsers(): Promise<Customer[]> { try { const r = await authFetch('/users'); return r.ok ? r.json() : []; } catch { return []; } }
export async function getSettings(): Promise<Record<string, string>> { try { const r = await authFetch('/settings'); return r.ok ? r.json() : {}; } catch { return {}; } }
