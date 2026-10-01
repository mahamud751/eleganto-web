'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Search, X, XCircle } from 'lucide-react';


export function Label({ children, hint }: { children: React.ReactNode; hint?: React.ReactNode }) {
  return <span className="label flex items-center justify-between gap-2"><span>{children}</span>{hint && <span className="tracking-normal normal-case font-semibold text-[11px]">{hint}</span>}</span>;
}

export function Section({ title, hint, children, aside }: { title: string; hint?: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return <section className="card p-5 sm:p-6"><div className="mb-5 flex items-start justify-between gap-4"><div><h3 className="section-title">{title}</h3>{hint && <p className="section-hint">{hint}</p>}</div>{aside}</div>{children}</section>;
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`switch ${checked ? 'on' : ''}`} />;
}

export function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return <label className="relative block w-full sm:w-72"><Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" /><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="input h-10 rounded-full pl-10" />{value && <button type="button" onClick={() => onChange('')} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-ink"><X size={14} /></button>}</label>;
}

export function Tabs<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; count?: number }[] }) {
  return <div className="flex flex-wrap gap-1 rounded-full border border-line bg-white p-1">{options.map(o => <button type="button" key={o.value} onClick={() => onChange(o.value)} className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${value === o.value ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}>{o.label}{o.count !== undefined && <span className={`rounded-full px-1.5 text-[10px] ${value === o.value ? 'bg-white/20' : 'bg-[#f0f0eb]'}`}>{o.count}</span>}</button>)}</div>;
}

export function Empty({ icon, title, text, action }: { icon: React.ReactNode; title: string; text: string; action?: React.ReactNode }) {
  return <div className="flex flex-col items-center px-6 py-16 text-center"><div className="mb-4 grid size-14 place-items-center rounded-2xl bg-[#f0f0eb] text-muted">{icon}</div><p className="font-black tracking-[-.03em]">{title}</p><p className="mt-1 max-w-sm text-sm text-muted">{text}</p>{action && <div className="mt-5">{action}</div>}</div>;
}

type Toast = { id: number; type: 'success' | 'error'; text: string };
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = useCallback((text: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, type, text }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);
  const node = <div className="pointer-events-none fixed right-5 bottom-5 z-[60] flex flex-col gap-2">{toasts.map(t => <div key={t.id} className="toast pointer-events-auto flex min-w-64 items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-2xl">{t.type === 'success' ? <CheckCircle2 size={18} className="text-accent" /> : <XCircle size={18} className="text-red-400" />}{t.text}</div>)}</div>;
  return [node, show] as const;
}

type Ask = { title: string; text: string; confirm?: string; resolve: (ok: boolean) => void };
export function useConfirm() {
  const [ask, setAsk] = useState<Ask | null>(null);
  const confirm = useCallback((title: string, text: string, label = 'Delete') => new Promise<boolean>(resolve => setAsk({ title, text, confirm: label, resolve })), []);
  const close = (ok: boolean) => { ask?.resolve(ok); setAsk(null); };
  const node = ask && <><div className="overlay" onClick={() => close(false)} /><div className="dialog" role="alertdialog"><div className="mb-4 grid size-11 place-items-center rounded-xl bg-red-50 text-red-600"><AlertTriangle size={20} /></div><h3 className="text-lg font-black tracking-[-.03em]">{ask.title}</h3><p className="mt-1 text-sm text-muted">{ask.text}</p><div className="mt-6 flex justify-end gap-2"><button type="button" className="btn btn-ghost" onClick={() => close(false)}>Cancel</button><button type="button" className="btn btn-danger" onClick={() => close(true)} autoFocus>{ask.confirm}</button></div></div></>;
  return [node, confirm] as const;
}

export function useEscape(active: boolean, onEscape: () => void) {
  const ref = useRef(onEscape);
  useEffect(() => { ref.current = onEscape; });
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && ref.current();
    window.addEventListener('keydown', handler);
    const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = overflow; };
  }, [active]);
}

export async function uploadImage(api: string, file: File): Promise<string> {
  const data = new FormData(); data.append('file', file);
  const response = await fetch(`${api}/uploads/image`, { method: 'POST', body: data });
  if (!response.ok) throw new Error('Upload failed. Use JPG, PNG, WEBP, or GIF under 8MB.');
  return (await response.json()).url;
}
