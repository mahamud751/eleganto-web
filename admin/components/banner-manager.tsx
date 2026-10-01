'use client';
import { useState } from 'react';
import { ImageIcon, ImagePlus, Link2, Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { API, Banner } from '@/lib/api';
import { img } from '@/lib/format';
import { Empty, Label, Switch, uploadImage, useConfirm, useToast } from './ui';

type Draft = { id?: string; title: string; subtitle: string; image: string; link: string; position: string; active: boolean };
const blank = (position = 0): Draft => ({ title: '', subtitle: '', image: '', link: '', position: String(position), active: true });

export default function BannerManager({ initial }: { initial: Banner[] }) {
  const [items, setItems] = useState<Banner[]>(initial);
  const [d, setD] = useState<Draft>(blank(initial.length));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, notify] = useToast();
  const [dialog, confirm] = useConfirm();
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD(c => ({ ...c, [k]: v }));
  const sorted = [...items].sort((a, b) => a.position - b.position);

  const upload = async (file?: File) => { if (!file) return; setUploading(true); try { set('image', await uploadImage(API, file)); } catch (e) { notify(e instanceof Error ? e.message : 'Upload failed', 'error'); } finally { setUploading(false); } };
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!d.title.trim() || !d.image) return notify('Title and image are required', 'error');
    setSaving(true);
    const body = { title: d.title.trim(), subtitle: d.subtitle.trim() || null, image: d.image, link: d.link.trim() || null, position: Number(d.position) || 0, active: d.active };
    const r = await fetch(`${API}/banners${d.id ? `/${d.id}` : ''}`, { method: d.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => null);
    setSaving(false);
    if (!r?.ok) return notify('Could not save banner', 'error');
    const saved: Banner = await r.json();
    setItems(x => d.id ? x.map(b => b.id === saved.id ? saved : b) : [...x, saved]);
    notify(d.id ? 'Banner updated' : 'Banner added'); setD(blank(items.length + (d.id ? 0 : 1)));
  };
  const toggle = async (b: Banner) => {
    setItems(x => x.map(y => y.id === b.id ? { ...y, active: !b.active } : y));
    const r = await fetch(`${API}/banners/${b.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !b.active }) }).catch(() => null);
    if (!r?.ok) { setItems(x => x.map(y => y.id === b.id ? { ...y, active: b.active } : y)); notify('Could not update banner', 'error'); }
  };
  const remove = async (b: Banner) => {
    if (!await confirm('Delete banner?', `"${b.title}" will be removed from the homepage.`)) return;
    const r = await fetch(`${API}/banners/${b.id}`, { method: 'DELETE' }).catch(() => null);
    if (r?.ok) { setItems(x => x.filter(y => y.id !== b.id)); if (d.id === b.id) setD(blank(items.length - 1)); notify('Banner deleted'); } else notify('Could not delete banner', 'error');
  };

  return <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
    <div>{sorted.length === 0 ? <div className="card"><Empty icon={<ImageIcon size={24} />} title="No banners yet" text="Add a banner to feature campaigns on your homepage." /></div> :
      <div className="grid gap-4 md:grid-cols-2">{sorted.map(b => <article key={b.id} className={`card group overflow-hidden transition ${d.id === b.id ? 'ring-2 ring-ink' : ''} ${b.active ? '' : 'opacity-60'}`}>
        <div className="relative aspect-[16/8] bg-[#eee]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(b.image)} alt="" className="h-full w-full object-cover" />
          <span className="pill absolute top-3 left-3 bg-white/95">#{b.position}</span>
          <span className={`pill absolute top-3 right-3 ${b.active ? 'bg-accent' : 'bg-white/95 text-muted'}`}>{b.active ? 'Live' : 'Hidden'}</span>
        </div>
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="min-w-0"><h2 className="truncate font-black tracking-[-.02em]">{b.title}</h2>{b.subtitle && <p className="mt-0.5 truncate text-xs text-muted">{b.subtitle}</p>}{b.link && <p className="mt-1.5 flex items-center gap-1 truncate text-[11px] font-semibold text-muted"><Link2 size={11} />{b.link}</p>}</div>
          <div className="flex flex-none items-center gap-1.5"><Switch checked={b.active} onChange={() => toggle(b)} label="Active" /><button onClick={() => setD({ id: b.id, title: b.title, subtitle: b.subtitle || '', image: b.image, link: b.link || '', position: String(b.position), active: b.active })} className="icon-btn" title="Edit"><Pencil size={14} /></button><button onClick={() => remove(b)} className="icon-btn danger" title="Delete"><Trash2 size={14} /></button></div>
        </div>
      </article>)}</div>}
    </div>

    <form onSubmit={save} className="card h-fit space-y-4 p-6 xl:sticky xl:top-6">
      <div className="flex items-center justify-between"><h2 className="section-title flex items-center gap-2">{d.id ? <><Pencil size={15} />Edit banner</> : <><Plus size={16} />New banner</>}</h2>{d.id && <button type="button" onClick={() => setD(blank(items.length))} className="icon-btn" title="Cancel edit"><X size={14} /></button>}</div>
      <div><Label>Image</Label>
        {d.image ? <div className="relative aspect-[16/8] overflow-hidden rounded-xl bg-[#eee]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img(d.image)} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-3 text-white"><p className="truncate text-sm font-black">{d.title || 'Banner title'}</p>{d.subtitle && <p className="truncate text-xs opacity-80">{d.subtitle}</p>}</div>
          <button type="button" onClick={() => set('image', '')} className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white/95 shadow hover:bg-red-600 hover:text-white"><X size={14} /></button>
        </div> : <label className="flex aspect-[16/8] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-[#fafaf7] text-sm font-bold transition hover:border-ink">{uploading ? <Loader2 className="animate-spin" size={20} /> : <ImagePlus size={20} />}{uploading ? 'Uploading…' : 'Upload banner image'}<span className="text-xs font-normal text-muted">Wide image, at least 1600px</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={e => upload(e.target.files?.[0])} /></label>}
        {!d.image && <input value={d.image} onChange={e => set('image', e.target.value)} className="input mt-2 h-10" placeholder="…or paste an image URL" />}
      </div>
      <label className="block"><Label>Title</Label><input value={d.title} onChange={e => set('title', e.target.value)} className="input" placeholder="New season drop" /></label>
      <label className="block"><Label>Subtitle</Label><input value={d.subtitle} onChange={e => set('subtitle', e.target.value)} className="input" placeholder="Optional supporting line" /></label>
      <div className="grid grid-cols-[1fr_90px] gap-3"><label className="block"><Label>Link</Label><input value={d.link} onChange={e => set('link', e.target.value)} className="input" placeholder="/shop?c=oversized" /></label><label className="block"><Label>Order</Label><input type="number" value={d.position} onChange={e => set('position', e.target.value)} className="input" /></label></div>
      <div className="flex items-center justify-between rounded-xl bg-[#fafaf7] p-3"><span className="text-sm font-bold">Show on homepage</span><Switch checked={d.active} onChange={v => set('active', v)} /></div>
      <button disabled={saving || uploading} className="btn btn-primary w-full rounded-xl">{saving && <Loader2 size={15} className="animate-spin" />}{d.id ? 'Save changes' : 'Add banner'}</button>
    </form>
    {toast}{dialog}
  </div>;
}
