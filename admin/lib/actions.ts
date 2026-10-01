'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API } from './api';
import { SESSION_COOKIE, getToken } from './session';

export async function login(_: string | null, form: FormData): Promise<string | null> {
  let res: Response;
  try { res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }), cache: 'no-store' }); }
  catch { return 'Cannot reach the API. Is the backend running?'; }
  if (!res.ok) return 'Invalid email or password';
  const { token, user } = await res.json();
  if (user.role !== 'ADMIN') {
    await fetch(`${API}/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    return 'This account does not have admin access';
  }
  (await cookies()).set(SESSION_COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 30 });
  redirect('/');
}

export async function logout() {
  const token = await getToken();
  if (token) await fetch(`${API}/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
  (await cookies()).delete(SESSION_COOKIE);
  redirect('/login');
}
