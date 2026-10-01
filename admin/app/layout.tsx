import type { Metadata } from 'next';
import '../styles.css';
import Sidebar from '@/components/sidebar';

export const metadata: Metadata = { title: 'Eleganto Admin', description: 'Eleganto store management' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="shell"><Sidebar /><main className="content">{children}</main></div></body></html>;
}
