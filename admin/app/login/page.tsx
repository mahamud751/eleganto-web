import { redirect } from 'next/navigation';
import LoginForm from '@/components/login-form';
import { getAdmin } from '@/lib/session';

export const metadata = { title: 'Sign in · Eleganto Admin' };
export default async function Login() {
  if (await getAdmin()) redirect('/');
  return <main className="dot-grid grid min-h-screen place-items-center p-5">
    <div className="card w-full max-w-sm p-8">
      <div className="mb-7 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-ink text-sm font-black text-accent">E</span><div><p className="text-lg font-black tracking-[-.06em]">ELEGANTO</p><p className="text-xs text-muted">Admin panel</p></div></div>
      <h1 className="text-2xl font-extrabold tracking-[-.03em]">Sign in</h1>
      <p className="section-hint mb-6">Only admin accounts can access the store dashboard.</p>
      <LoginForm />
    </div>
  </main>;
}
