'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';

type User = { id: string; name: string; email: string; phone?: string; role: string };
type AuthContextValue = { user: User | null; ready: boolean; wishlist: Set<string>; login(email: string, password: string): Promise<void>; register(data: { name: string; email: string; phone?: string; password: string }): Promise<void>; logout(): void; toggleWishlist(slug: string): Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); const [ready, setReady] = useState(false); const [wishlist, setWishlist] = useState(new Set<string>());
  const loadWishlist = async () => { try { const rows = await api<{ product: { slug: string } }[]>('/users/me/wishlist'); setWishlist(new Set(rows.map(row => row.product.slug))); } catch {} };
  useEffect(() => { if (!localStorage.getItem('eleganto_token')) { setReady(true); return; } api<User>('/auth/me').then(async value => { setUser(value); await loadWishlist(); }).catch(() => localStorage.removeItem('eleganto_token')).finally(() => setReady(true)); }, []);
  const accept = async (result: { token: string; user: User }) => { localStorage.setItem('eleganto_token', result.token); setUser(result.user); await loadWishlist(); };
  const login = async (email: string, password: string) => accept(await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }));
  const register = async (data: { name: string; email: string; phone?: string; password: string }) => accept(await api('/auth/register', { method: 'POST', body: JSON.stringify(data) }));
  const logout = () => { api('/auth/logout', { method: 'POST' }).catch(() => {}); localStorage.removeItem('eleganto_token'); setUser(null); setWishlist(new Set()); };
  const toggleWishlist = async (slug: string) => { if (!user) throw new Error('Please sign in first'); const active = wishlist.has(slug); await api(`/users/me/wishlist/${slug}`, { method: active ? 'DELETE' : 'POST' }); setWishlist(current => { const next = new Set(current); active ? next.delete(slug) : next.add(slug); return next; }); };
  return <AuthContext.Provider value={{ user, ready, wishlist, login, register, logout, toggleWishlist }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be inside AuthProvider'); return value; }
