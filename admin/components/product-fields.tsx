'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Flame, GripVertical, ImagePlus, Link2, Loader2, Plus, Sparkles, Star, Trophy, X, Zap } from 'lucide-react';
import { img } from '@/lib/format';
import { Label } from './ui';

export type Color = { name: string; hex: string };

/* ---------- Colors ---------- */
export const PRESET_COLORS: Color[] = [
  { name: 'Jet Black', hex: '#0b0b0b' }, { name: 'Washed Black', hex: '#3a3a3a' }, { name: 'Charcoal', hex: '#4b4f54' }, { name: 'Heather Grey', hex: '#a7a9ac' },
  { name: 'Cloud White', hex: '#f1efe9' }, { name: 'Cream', hex: '#efe6d2' }, { name: 'Sand', hex: '#cbb595' }, { name: 'Chocolate', hex: '#5a3a29' },
  { name: 'Navy', hex: '#1f2a44' }, { name: 'Sky Blue', hex: '#8fb8de' }, { name: 'Olive', hex: '#6b6b3a' }, { name: 'Forest Green', hex: '#2f4f3a' },
  { name: 'Burgundy', hex: '#6d1f2c' }, { name: 'Rust', hex: '#a2512b' }, { name: 'Mustard', hex: '#d4a72c' }, { name: 'Lavender', hex: '#b9a7d6' },
];
const HEX = /^#[0-9a-f]{6}$/i;
const sameColor = (a: Color, b: Color) => a.hex.toLowerCase() === b.hex.toLowerCase();
const isLight = (hex: string) => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 175; };

export function ColorPicker({ value, onChange }: { value: Color[]; onChange: (v: Color[]) => void }) {
  const [hex, setHex] = useState('#7c3aed');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const has = (c: Color) => value.some(v => sameColor(v, c));
  const toggle = (c: Color) => onChange(has(c) ? value.filter(v => !sameColor(v, c)) : [...value, c]);
  const remove = (i: number) => onChange(value.filter((_, x) => x !== i));
  const makePrimary = (i: number) => onChange([value[i], ...value.filter((_, x) => x !== i)]);
  const addCustom = () => {
    const h = hex.trim().startsWith('#') ? hex.trim() : `#${hex.trim()}`;
    if (!HEX.test(h)) return setError('Enter a valid 6-digit hex, e.g. #1f2a44');
    if (!name.trim()) return setError('Give this color a name customers will see');
    if (value.some(v => sameColor(v, { name, hex: h }) || v.name.toLowerCase() === name.trim().toLowerCase())) return setError('This color is already added');
    onChange([...value, { name: name.trim(), hex: h.toLowerCase() }]); setName(''); setError('');
  };

  return <div className="space-y-5">
    <div>
      <Label hint={`${value.length} selected`}>Selected colors</Label>
      {value.length === 0 ? <p className="rounded-xl border border-dashed border-line px-4 py-5 text-center text-sm text-muted">No colors yet. Pick from the palette or create a custom one.</p> :
        <div className="flex flex-wrap gap-2">{value.map((c, i) => <div key={c.hex + c.name} className={`group flex items-center gap-2.5 rounded-full border bg-white py-1.5 pr-1.5 pl-1.5 transition ${i === 0 ? 'border-ink' : 'border-line'}`}>
          <span className="size-7 rounded-full border border-black/10 shadow-inner" style={{ background: c.hex }} />
          <span className="text-xs font-bold">{c.name}</span>
          <span className="font-mono text-[10px] text-muted uppercase">{c.hex}</span>
          {i === 0 ? <span className="pill bg-accent px-2 py-0.5 text-[10px]"><Star size={10} fill="currentColor" />Primary</span> : <button type="button" title="Make primary" onClick={() => makePrimary(i)} className="grid size-6 place-items-center rounded-full text-muted hover:bg-[#f0f0eb] hover:text-ink"><Star size={12} /></button>}
          <button type="button" title={`Remove ${c.name}`} onClick={() => remove(i)} className="grid size-6 place-items-center rounded-full text-muted hover:bg-red-50 hover:text-red-600"><X size={13} /></button>
        </div>)}</div>}
    </div>

    <div>
      <Label hint="Click to add · click again to remove">Palette</Label>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">{PRESET_COLORS.map(c => { const on = has(c); return <button type="button" key={c.hex} onClick={() => toggle(c)} title={c.name} className="group flex flex-col items-center gap-1.5">
        <span className={`relative grid size-11 place-items-center rounded-full border border-black/10 transition group-hover:scale-105 ${on ? 'ring-2 ring-ink ring-offset-2' : ''}`} style={{ background: c.hex }}>{on && <Check size={18} strokeWidth={3} className={isLight(c.hex) ? 'text-ink' : 'text-white'} />}</span>
        <span className={`text-center text-[10px] leading-tight font-semibold ${on ? 'text-ink' : 'text-muted'}`}>{c.name}</span>
      </button>; })}</div>
    </div>

    <div className="rounded-2xl border border-line bg-[#fafaf7] p-4">
      <Label>Custom color</Label>
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative size-11 flex-none cursor-pointer overflow-hidden rounded-xl border border-line shadow-inner" style={{ background: HEX.test(hex) ? hex : '#fff' }} title="Open color picker">
          <input type="color" value={HEX.test(hex) ? hex : '#000000'} onChange={e => { setHex(e.target.value); setError(''); }} className="absolute inset-0 cursor-pointer opacity-0" />
        </label>
        <input value={hex} onChange={e => { setHex(e.target.value); setError(''); }} maxLength={7} className="input w-28 flex-none font-mono uppercase" placeholder="#000000" />
        <input value={name} onChange={e => { setName(e.target.value); setError(''); }} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }} className="input min-w-40 flex-1" placeholder="Color name, e.g. Royal Purple" />
        <button type="button" onClick={addCustom} className="btn btn-primary h-11 rounded-xl"><Plus size={15} />Add</button>
      </div>
      {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
    </div>
  </div>;
}

/* ---------- Sizes ---------- */
const SIZE_GROUPS = [
  { label: 'Apparel', sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'] },
  { label: 'Waist', sizes: ['28', '30', '32', '34', '36', '38', '40'] },
  { label: 'Other', sizes: ['Free Size'] },
];
const ORDER = SIZE_GROUPS.flatMap(g => g.sizes);
const sortSizes = (sizes: string[]) => [...sizes].sort((a, b) => { const x = ORDER.indexOf(a), y = ORDER.indexOf(b); return (x < 0 ? 999 : x) - (y < 0 ? 999 : y); });

export function SizePicker({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [custom, setCustom] = useState('');
  const has = (s: string) => value.some(v => v.toLowerCase() === s.toLowerCase());
  const toggle = (s: string) => onChange(has(s) ? value.filter(v => v.toLowerCase() !== s.toLowerCase()) : sortSizes([...value, s]));
  const extras = value.filter(v => !ORDER.includes(v));
  const addCustom = () => { const s = custom.trim().toUpperCase(); if (s && !has(s)) onChange(sortSizes([...value, s])); setCustom(''); };

  return <div className="space-y-5">
    <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-ink p-3 text-white">
      <span className="px-2 text-[10px] font-bold tracking-[.15em] text-white/60 uppercase">Selected</span>
      {value.length === 0 ? <span className="text-xs text-white/60">Choose at least one size below</span> : value.map(s => <button type="button" key={s} onClick={() => toggle(s)} title={`Remove ${s}`} className="group flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-bold transition hover:bg-red-500">{s}<X size={12} className="opacity-60 group-hover:opacity-100" /></button>)}
      {value.length > 0 && <button type="button" onClick={() => onChange([])} className="ml-auto px-2 text-[11px] font-bold text-white/60 underline-offset-2 hover:text-white hover:underline">Clear all</button>}
    </div>

    {SIZE_GROUPS.map(group => { const all = group.sizes.every(has); return <div key={group.label}>
      <Label hint={group.sizes.length > 1 && <button type="button" onClick={() => onChange(all ? value.filter(v => !group.sizes.includes(v)) : sortSizes([...new Set([...value, ...group.sizes])]))} className="text-ink underline-offset-2 hover:underline">{all ? 'Deselect all' : 'Select all'}</button>}>{group.label}</Label>
      <div className="flex flex-wrap gap-2">{group.sizes.map(s => <button type="button" key={s} onClick={() => toggle(s)} aria-pressed={has(s)} className={`chip ${has(s) ? 'on' : ''}`}>{has(s) && <Check size={13} strokeWidth={3} />}{s}</button>)}</div>
    </div>; })}

    <div>
      <Label>Custom size</Label>
      <div className="flex flex-wrap gap-2">
        {extras.map(s => <button type="button" key={s} onClick={() => toggle(s)} className="chip on">{s}<X size={13} /></button>)}
        <div className="flex gap-2"><input value={custom} onChange={e => setCustom(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }} className="input h-10 w-36" placeholder="e.g. 4XL" /><button type="button" onClick={addCustom} disabled={!custom.trim()} className="btn btn-ghost h-10 rounded-xl px-4"><Plus size={14} />Add</button></div>
      </div>
    </div>
  </div>;
}

/* ---------- Tags ---------- */
const TAGS = [
  { value: 'new', label: 'New arrival', icon: Sparkles },
  { value: 'trending', label: 'Trending', icon: Flame },
  { value: 'best', label: 'Best seller', icon: Trophy },
  { value: 'must', label: 'Must have', icon: Zap },
];
export function TagPicker({ value, onChange, compact }: { value: string[]; onChange: (v: string[]) => void; compact?: boolean }) {
  const toggle = (t: string) => onChange(value.includes(t) ? value.filter(v => v !== t) : [...value, t]);
  return <div className={`grid grid-cols-2 gap-2 ${compact ? '' : 'sm:grid-cols-4'}`}>{TAGS.map(({ value: t, label, icon: Icon }) => { const on = value.includes(t); return <button type="button" key={t} onClick={() => toggle(t)} aria-pressed={on} className={`flex items-center gap-2.5 rounded-xl border-[1.5px] px-3 py-3 text-left text-xs font-bold transition ${on ? 'border-ink bg-ink text-white' : 'border-line bg-white text-[#55554f] hover:border-[#b9b9b1]'}`}>
    <span className={`grid size-7 place-items-center rounded-lg ${on ? 'bg-accent text-ink' : 'bg-[#f0f0eb]'}`}><Icon size={14} /></span>{label}
  </button>; })}</div>;
}

/* ---------- Detail bullets ---------- */
export function ListEditor({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const [draft, setDraft] = useState('');
  const add = () => { if (draft.trim()) onChange([...value, draft.trim()]); setDraft(''); };
  const edit = (i: number, text: string) => onChange(value.map((v, x) => x === i ? text : v));
  return <div className="space-y-2">
    {value.map((item, i) => <div key={i} className="group flex items-center gap-2"><GripVertical size={14} className="flex-none text-[#c9c9c2]" /><input value={item} onChange={e => edit(i, e.target.value)} className="input h-10" /><button type="button" onClick={() => onChange(value.filter((_, x) => x !== i))} className="icon-btn danger flex-none" title="Remove"><X size={14} /></button></div>)}
    <div className="flex items-center gap-2"><Plus size={14} className="flex-none text-muted" /><input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} placeholder={placeholder} className="input h-10 border-dashed" /><button type="button" onClick={add} disabled={!draft.trim()} className="btn btn-ghost h-10 flex-none rounded-xl px-4">Add</button></div>
  </div>;
}

/* ---------- Images ---------- */
export function ImageManager({ value, onChange, onUpload, uploading }: { value: string[]; onChange: (v: string[]) => void; onUpload: (files: File[]) => void; uploading: boolean }) {
  const [drag, setDrag] = useState(false);
  const [url, setUrl] = useState('');
  const move = (i: number, d: number) => { const next = [...value]; [next[i], next[i + d]] = [next[i + d], next[i]]; onChange(next); };
  const addUrl = () => { const u = url.trim(); if (u && !value.includes(u)) onChange([...value, u]); setUrl(''); };
  return <div className="space-y-4">
    <label onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); onUpload(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))); }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-7 text-center transition ${drag ? 'border-accent-deep bg-accent/15' : 'border-line bg-[#fafaf7] hover:border-ink'}`}>
      <span className="grid size-11 place-items-center rounded-xl bg-white shadow-sm">{uploading ? <Loader2 size={20} className="animate-spin" /> : <ImagePlus size={20} />}</span>
      <span className="text-sm font-bold">{uploading ? 'Uploading…' : 'Drop photos here or click to browse'}</span>
      <span className="text-xs text-muted">JPG, PNG, WEBP or GIF · up to 8MB each · first photo is the cover</span>
      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple disabled={uploading} onChange={e => { onUpload(Array.from(e.target.files || [])); e.target.value = ''; }} className="hidden" />
    </label>
    <div className="flex gap-2"><div className="relative flex-1"><Link2 size={15} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" /><input value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addUrl(); } }} className="input h-10 pl-10" placeholder="…or paste an image URL" /></div><button type="button" onClick={addUrl} disabled={!url.trim()} className="btn btn-ghost h-10 rounded-xl px-4">Add</button></div>
    {value.length > 0 && <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">{value.map((src, i) => <div key={src} className={`group relative aspect-[4/5] overflow-hidden rounded-xl bg-[#eee] ${i === 0 ? 'ring-2 ring-ink ring-offset-2' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(src)} alt="" className="h-full w-full object-cover" />
      {i === 0 && <span className="pill absolute top-2 left-2 bg-ink text-white"><Star size={10} fill="currentColor" className="text-accent" />Cover</span>}
      <button type="button" onClick={() => onChange(value.filter(x => x !== src))} title="Remove photo" className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white/95 text-ink shadow transition hover:bg-red-600 hover:text-white"><X size={14} /></button>
      <div className="absolute inset-x-2 bottom-2 flex justify-between gap-1 opacity-0 transition group-hover:opacity-100">
        <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="grid size-7 place-items-center rounded-full bg-white/95 shadow disabled:invisible" title="Move left"><ArrowLeft size={13} /></button>
        {i !== 0 && <button type="button" onClick={() => onChange([src, ...value.filter(x => x !== src)])} className="rounded-full bg-white/95 px-2.5 text-[10px] font-bold shadow">Set cover</button>}
        <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="grid size-7 place-items-center rounded-full bg-white/95 shadow disabled:invisible" title="Move right"><ArrowRight size={13} /></button>
      </div>
    </div>)}</div>}
  </div>;
}
