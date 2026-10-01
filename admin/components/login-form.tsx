'use client';
import { useActionState } from 'react';
import { Loader2, LogIn } from 'lucide-react';
import { login } from '@/lib/actions';
import { Label } from './ui';

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return <form action={action} className="space-y-4">
    <label className="block"><Label>Email</Label><input name="email" type="email" required autoComplete="username" className="input" placeholder="admin@eleganto.com" /></label>
    <label className="block"><Label>Password</Label><input name="password" type="password" required autoComplete="current-password" className="input" /></label>
    {error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600">{error}</p>}
    <button disabled={pending} className="btn btn-primary w-full">{pending ? <Loader2 size={15} className="animate-spin" /> : <LogIn size={15} />}Sign in</button>
  </form>;
}
