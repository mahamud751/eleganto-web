import { cookies } from 'next/headers';
import { API } from './api';

export const SESSION_COOKIE = 'eleganto_admin';
export type Admin = { id: string; name: string; email: string; role: string };

export async function getToken() { return (await cookies()).get(SESSION_COOKIE)?.value; }

// Server-side fetch to the API with the signed-in admin's token attached.
export async function authFetch(path: string, init: RequestInit = {}) {
  const token = await getToken();
  return fetch(`${API}${path}`, { cache: 'no-store', ...init, headers: { ...init.headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
}

export async function getAdmin(): Promise<Admin | null> {
  if (!(await getToken())) return null;
  try { const r = await authFetch('/auth/me'); if (!r.ok) return null; const user: Admin = await r.json(); return user.role === 'ADMIN' ? user : null; } catch { return null; }
}
