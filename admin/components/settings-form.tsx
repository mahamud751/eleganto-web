'use client';
import { useState } from 'react';
import { CreditCard, Headset, Loader2, Share2, Store, Wallet } from 'lucide-react';
import { CLIENT_API } from '@/lib/api';
import { Label, Switch, useToast } from './ui';

const GROUPS = [
  { title: 'Store', hint: 'Basic identity and pricing rules.', icon: Store, fields: [['storeName', 'Store name', 'Eleganto'], ['tagline', 'Tagline', 'Wear the statement'], ['currency', 'Currency', 'BDT'], ['freeShippingOver', 'Free shipping over (৳)', '2000']] },
  { title: 'Support', hint: 'Shown in the footer and help page.', icon: Headset, fields: [['supportEmail', 'Support email', 'hello@eleganto.com'], ['supportPhone', 'Support phone', '+8801…']] },
  { title: 'Social', hint: 'Links to your community.', icon: Share2, fields: [['facebook', 'Facebook URL', 'https://facebook.com/…'], ['whatsapp', 'WhatsApp number', '+8801…']] },
  { title: 'Manual payments', hint: 'Numbers customers send bKash / Nagad payments to.', icon: CreditCard, fields: [['bkash', 'bKash number', '01…'], ['nagad', 'Nagad number', '01…']] },
];
// Stored as 'true' / 'false'; a missing key falls back to the default (only COD on)
const PAYMENT_TOGGLES = [['codEnabled', 'Cash on Delivery', true], ['bkashEnabled', 'bKash', false], ['nagadEnabled', 'Nagad', false]] as const;
const isOn = (values: Record<string, string>, key: string, fallback: boolean) => values[key] ? values[key] === 'true' : fallback;
const KEYS = [...GROUPS.flatMap(g => g.fields.map(([k]) => k)), ...PAYMENT_TOGGLES.map(([k]) => k)];

export default function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const [values, setValues] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [toast, notify] = useToast();
  const dirty = KEYS.some(k => (values[k] || '') !== (saved[k] || ''));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!PAYMENT_TOGGLES.some(([k, , d]) => isOn(values, k, d))) return notify('Keep at least one payment method enabled', 'error');
    setSaving(true);
    const body = Object.fromEntries(KEYS.map(k => [k, values[k] || '']));
    const r = await fetch(`${CLIENT_API}/settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null);
    setSaving(false);
    if (r?.ok) { setSaved(values); notify('Settings saved'); } else notify('Could not save settings', 'error');
  };
  return <form onSubmit={submit} className="max-w-4xl space-y-5 pb-20">
    {GROUPS.map(({ title, hint, icon: Icon, fields }) => <section key={title} className="card grid gap-5 p-6 md:grid-cols-[220px_1fr]">
      <div><span className="mb-3 grid size-10 place-items-center rounded-xl bg-[#f0f0eb]"><Icon size={18} /></span><h2 className="section-title">{title}</h2><p className="section-hint">{hint}</p></div>
      <div className="grid gap-4 sm:grid-cols-2">{fields.map(([name, label, placeholder]) => <label key={name} className="block"><Label>{label}</Label><input name={name} value={values[name] || ''} onChange={e => setValues(v => ({ ...v, [name]: e.target.value }))} placeholder={placeholder} className="input" /></label>)}</div>
    </section>)}
    <section className="card grid gap-5 p-6 md:grid-cols-[220px_1fr]">
      <div><span className="mb-3 grid size-10 place-items-center rounded-xl bg-[#f0f0eb]"><Wallet size={18} /></span><h2 className="section-title">Payment methods</h2><p className="section-hint">Turned-off methods are hidden from checkout.</p></div>
      <div className="grid gap-3">{PAYMENT_TOGGLES.map(([name, label, fallback]) => <div key={name} className="flex items-center justify-between rounded-xl border border-line px-4 py-3"><span className="text-sm font-semibold">{label}</span><Switch checked={isOn(values, name, fallback)} onChange={on => setValues(v => ({ ...v, [name]: String(on) }))} label={`Enable ${label}`} /></div>)}</div>
    </section>
    <div className={`fixed right-6 bottom-6 z-40 flex items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-5 text-sm font-semibold text-white shadow-2xl transition ${dirty ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
      Unsaved changes<button type="button" onClick={() => setValues(saved)} className="px-2 text-xs text-white/60 hover:text-white">Discard</button><button disabled={saving} className="btn btn-accent h-9">{saving && <Loader2 size={14} className="animate-spin" />}Save settings</button>
    </div>
    {toast}
  </form>;
}
