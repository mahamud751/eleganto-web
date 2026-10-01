import { redirect } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import { getAdmin } from '@/lib/session';

export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const admin = await getAdmin();
  if (!admin) redirect('/login');
  return <div className="shell"><Sidebar admin={admin} /><main className="content">{children}</main></div>;
}
