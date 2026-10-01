'use client';
import { useMemo, useState } from 'react';
import { AlertCircle, Copy, Eye, EyeOff, Layers, Loader2, Package, PackageX, Pencil, Plus, Shirt, Trash2, X } from 'lucide-react';
import { API, Product } from '@/lib/api';
import { img, money, titleCase } from '@/lib/format';
import { Empty, Label, SearchBox, Section, Switch, Tabs, uploadImage, useConfirm, useEscape, useToast } from './ui';
import { Color, ColorPicker, ImageManager, ListEditor, SizePicker, TagPicker } from './product-fields';

const BASE_CATEGORIES = ['oversized', 'acid-wash', 'essentials'];
const LOW_STOCK = 10;
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-').replace(/^-|-$/g, '');

type Draft = { id?: string; name: string; slug: string; slugTouched: boolean; price: string; inventory: string; category: string; fabric: string; published: boolean; colors: Color[]; sizes: string[]; images: string[]; tags: string[]; details: string[] };
const blank = (): Draft => ({ name: '', slug: '', slugTouched: false, price: '', inventory: '', category: 'oversized', fabric: 'Heavyweight cotton', published: true, colors: [{ name: 'Jet Black', hex: '#0b0b0b' }], sizes: ['S', 'M', 'L', 'XL', '2XL'], images: [], tags: ['new'], details: ['Premium quality'] });
const colorsOf = (p: Product): Color[] => (Array.isArray(p.colors) && p.colors.length ? p.colors : p.colorName ? [{ name: p.colorName, hex: p.colorHex || '#000000' }] : []);
const toDraft = (p: Product): Draft => ({ id: p.id, name: p.name, slug: p.slug, slugTouched: true, price: String(p.price ?? ''), inventory: String(p.inventory ?? ''), category: p.category, fabric: p.fabric || '', published: p.published, colors: colorsOf(p), sizes: p.sizes?.length ? p.sizes : ['S', 'M', 'L', 'XL', '2XL'], images: p.images || [], tags: p.tags || [], details: p.details || [] });

function validate(d: Draft) {
  const errors: Record<string, string> = {};
  if (!d.name.trim()) errors.name = 'Product name is required';
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(d.slug)) errors.slug = 'Use lowercase letters, numbers and dashes';
  if (!(Number(d.price) > 0)) errors.price = 'Enter a price above 0';
  if (d.inventory === '' || Number(d.inventory) < 0 || !Number.isInteger(Number(d.inventory))) errors.inventory = 'Enter a whole number, 0 or more';
  if (!d.category.trim()) errors.category = 'Pick a category';
  if (!d.colors.length) errors.colors = 'Add at least one color';
  if (!d.sizes.length) errors.sizes = 'Select at least one size';
  if (!d.images.length) errors.images = 'Add at least one photo';
  return errors;
}

export default function ProductManager({ initial, openNew = false }: { initial: Product[]; openNew?: boolean }) {
  const [items, setItems] = useState<Product[]>(initial);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'published' | 'draft' | 'low'>('all');
  const [category, setCategory] = useState('all');
  const [editing, setEditing] = useState<Draft | null>(openNew ? blank() : null);
  const [toast, notify] = useToast();
  const [dialog, confirm] = useConfirm();

  const categories = useMemo(() => [...new Set([...BASE_CATEGORIES, ...items.map(p => p.category).filter(Boolean)])], [items]);
  const counts = { all: items.length, published: items.filter(p => p.published).length, draft: items.filter(p => !p.published).length, low: items.filter(p => p.inventory < LOW_STOCK).length };
  const visible = items.filter(p => {
    const q = query.trim().toLowerCase();
    if (q && !`${p.name} ${p.slug} ${p.category}`.toLowerCase().includes(q)) return false;
    if (category !== 'all' && p.category !== category) return false;
    if (status === 'published') return p.published;
    if (status === 'draft') return !p.published;
    if (status === 'low') return p.inventory < LOW_STOCK;
    return true;
  });

  const togglePublished = async (p: Product) => {
    setItems(list => list.map(x => x.id === p.id ? { ...x, published: !p.published } : x));
    const r = await fetch(`${API}/products/${p.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !p.published }) }).catch(() => null);
    if (r?.ok) notify(p.published ? `"${p.name}" moved to drafts` : `"${p.name}" is live`);
    else { setItems(list => list.map(x => x.id === p.id ? { ...x, published: p.published } : x)); notify('Could not update status', 'error'); }
  };
  const remove = async (p: Product) => {
    if (!await confirm('Delete product?', `"${p.name}" will be removed from your catalogue permanently. Products with existing orders cannot be deleted — move them to drafts instead.`)) return;
    const r = await fetch(`${API}/products/${p.id}`, { method: 'DELETE' }).catch(() => null);
    if (r?.ok) { setItems(list => list.filter(x => x.id !== p.id)); notify('Product deleted'); }
    else notify('Could not delete — this product may have orders', 'error');
  };
  const duplicate = (p: Product) => { const d = toDraft(p); setEditing({ ...d, id: undefined, name: `${d.name} (copy)`, slug: `${d.slug}-copy`, published: false }); };
  const onSaved = (saved: Product, isNew: boolean) => { setItems(list => isNew ? [saved, ...list] : list.map(x => x.id === saved.id ? saved : x)); setEditing(null); notify(isNew ? 'Product created' : 'Changes saved'); };

  return <>
    <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Mini icon={<Package size={17} />} label="Total products" value={counts.all} />
      <Mini icon={<Eye size={17} />} label="Live on store" value={counts.published} />
      <Mini icon={<EyeOff size={17} />} label="Drafts" value={counts.draft} />
      <Mini icon={<PackageX size={17} />} label={`Low stock (< ${LOW_STOCK})`} value={counts.low} warn={counts.low > 0} />
    </div>

    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <Tabs value={status} onChange={setStatus} options={[{ value: 'all', label: 'All', count: counts.all }, { value: 'published', label: 'Published', count: counts.published }, { value: 'draft', label: 'Drafts', count: counts.draft }, { value: 'low', label: 'Low stock', count: counts.low }]} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <select value={category} onChange={e => setCategory(e.target.value)} className="input h-10 rounded-full sm:w-44"><option value="all">All categories</option>{categories.map(c => <option key={c} value={c}>{titleCase(c)}</option>)}</select>
        <SearchBox value={query} onChange={setQuery} placeholder="Search products…" />
        <button onClick={() => setEditing(blank())} className="btn btn-primary h-10"><Plus size={15} />Add product</button>
      </div>
    </div>

    <div className="card overflow-x-auto">
      {visible.length === 0 ? <Empty icon={<Shirt size={24} />} title={items.length ? 'No matching products' : 'No products yet'} text={items.length ? 'Try a different search or filter.' : 'Create your first product to start selling.'} action={!items.length && <button onClick={() => setEditing(blank())} className="btn btn-primary"><Plus size={15} />Add product</button>} /> :
        <table className="table min-w-[900px]">
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Variants</th><th>Stock</th><th>Live</th><th className="text-right pr-5">Actions</th></tr></thead>
          <tbody>{visible.map(p => { const colors = colorsOf(p); return <tr key={p.id}>
            <td><div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.images?.[0] ? <img src={img(p.images[0])} alt="" className="size-12 rounded-xl object-cover" /> : <span className="grid size-12 place-items-center rounded-xl bg-[#f0f0eb] text-muted"><Shirt size={18} /></span>}
              <div className="min-w-0"><button onClick={() => setEditing(toDraft(p))} className="block max-w-[240px] truncate text-left font-bold hover:underline">{p.name}</button><p className="text-xs text-muted">/{p.slug}</p></div>
            </div></td>
            <td><span className="pill bg-[#f0f0eb] text-[#55554f]">{titleCase(p.category)}</span></td>
            <td className="font-bold">{money(p.price)}</td>
            <td><div className="flex items-center gap-2"><div className="flex -space-x-1.5">{colors.slice(0, 5).map(c => <span key={c.hex + c.name} title={c.name} className="size-5 rounded-full border-2 border-white shadow-sm" style={{ background: c.hex }} />)}</div>{colors.length > 5 && <span className="text-[11px] font-bold text-muted">+{colors.length - 5}</span>}</div><p className="mt-1 text-[11px] text-muted">{(p.sizes?.length ? p.sizes : []).join(' · ') || '—'}</p></td>
            <td>{p.inventory === 0 ? <span className="pill bg-red-100 text-red-700">Out of stock</span> : p.inventory < LOW_STOCK ? <span className="pill bg-amber-100 text-amber-800">{p.inventory} left</span> : <span className="font-semibold">{p.inventory}</span>}</td>
            <td><Switch checked={p.published} onChange={() => togglePublished(p)} label={`Publish ${p.name}`} /></td>
            <td><div className="flex justify-end gap-1.5 pr-1"><button onClick={() => setEditing(toDraft(p))} className="icon-btn" title="Edit"><Pencil size={14} /></button><button onClick={() => duplicate(p)} className="icon-btn" title="Duplicate"><Copy size={14} /></button><button onClick={() => remove(p)} className="icon-btn danger" title="Delete"><Trash2 size={14} /></button></div></td>
          </tr>; })}</tbody>
        </table>}
    </div>

    {editing && <ProductEditor key={editing.id || 'new'} initial={editing} categories={categories} onClose={() => setEditing(null)} onSaved={onSaved} />}
    {toast}{dialog}
  </>;
}

function Mini({ icon, label, value, warn }: { icon: React.ReactNode; label: string; value: number; warn?: boolean }) {
  return <div className="card flex items-center gap-4 p-4"><span className={`grid size-10 place-items-center rounded-xl ${warn ? 'bg-amber-100 text-amber-800' : 'bg-[#f0f0eb]'}`}>{icon}</span><div><p className="text-[11px] font-bold tracking-[.1em] text-muted uppercase">{label}</p><p className="text-2xl font-black tracking-[-.05em]">{value}</p></div></div>;
}

function ProductEditor({ initial, categories, onClose, onSaved }: { initial: Draft; categories: string[]; onClose: () => void; onSaved: (p: Product, isNew: boolean) => void }) {
  const [d, setD] = useState<Draft>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [toast, notify] = useToast();
  useEscape(true, onClose);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setD(cur => ({ ...cur, [key]: value }));
  const errors = validate(d);
  const shown = submitted ? errors : {};
  const cats = [...new Set([...categories, d.category].filter(Boolean))];

  const upload = async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    try { const urls: string[] = []; for (const f of files) urls.push(await uploadImage(API, f)); setD(cur => ({ ...cur, images: [...cur.images, ...urls] })); notify(`${urls.length} photo${urls.length > 1 ? 's' : ''} uploaded`); }
    catch (e) { notify(e instanceof Error ? e.message : 'Upload failed', 'error'); }
    finally { setUploading(false); }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true); setServerError('');
    if (Object.keys(errors).length) return;
    setSaving(true);
    const body = { name: d.name.trim(), slug: d.slug, price: Number(d.price), inventory: Number(d.inventory), category: d.category, fabric: d.fabric.trim(), published: d.published, colorName: d.colors[0].name, colorHex: d.colors[0].hex, colors: d.colors, sizes: d.sizes, images: d.images, tags: d.tags, details: d.details.map(x => x.trim()).filter(Boolean) };
    try {
      const r = await fetch(`${API}/products${d.id ? `/${d.id}` : ''}`, { method: d.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!r.ok) { const data = await r.json().catch(() => ({})); throw new Error(r.status >= 500 || !data.message ? 'Could not save. Make sure the URL slug is unique.' : String(data.message)); }
      onSaved(await r.json(), !d.id);
    } catch (err) { setServerError(err instanceof Error ? err.message : 'Could not save product'); }
    finally { setSaving(false); }
  };

  const errorCount = Object.keys(shown).length;
  return <>
    <div className="overlay" onClick={onClose} />
    <form onSubmit={save} className="drawer" style={{ width: 'min(1100px, 100%)' }} noValidate>
      <header className="flex items-center justify-between gap-4 border-b border-line bg-white px-6 py-4">
        <div className="min-w-0"><p className="text-[10px] font-bold tracking-[.2em] text-muted uppercase">{d.id ? 'Edit product' : 'New product'}</p><h2 className="truncate text-xl font-black tracking-[-.04em]">{d.name || 'Untitled product'}</h2></div>
        <button type="button" onClick={onClose} className="icon-btn size-10 rounded-full" title="Close (Esc)"><X size={18} /></button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="space-y-5">
            <Section title="Basic information" hint="What customers see first.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Product name" error={shown.name} className="sm:col-span-2"><input value={d.name} onChange={e => setD(cur => ({ ...cur, name: e.target.value, slug: cur.slugTouched ? cur.slug : slugify(e.target.value) }))} className="input" placeholder="e.g. Acid Wash Oversized Tee" autoFocus /></Field>
                <Field label="URL slug" error={shown.slug} hint="Auto from name"><div className="input-affix"><span>/</span><input value={d.slug} onChange={e => setD(cur => ({ ...cur, slug: slugify(e.target.value), slugTouched: true }))} className="input" /></div></Field>
                <Field label="Fabric / material"><input value={d.fabric} onChange={e => set('fabric', e.target.value)} className="input" placeholder="e.g. 240 GSM cotton" /></Field>
              </div>
              <div className="mt-4"><Label>Category</Label>
                <div className="flex flex-wrap gap-2">{cats.map(c => <button type="button" key={c} onClick={() => set('category', c)} className={`chip ${d.category === c ? 'on' : ''}`}>{titleCase(c)}</button>)}
                  <div className="flex gap-2"><input value={newCategory} onChange={e => setNewCategory(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); const s = slugify(newCategory); if (s) set('category', s); setNewCategory(''); } }} className="input h-10 w-40" placeholder="+ New category" /></div>
                </div>
                {shown.category && <Err>{shown.category}</Err>}
              </div>
            </Section>

            <Section title="Photos" hint="Add multiple angles. Drag order matters — the cover shows on listings." aside={<Count n={d.images.length} />}>
              <ImageManager value={d.images} onChange={v => set('images', v)} onUpload={upload} uploading={uploading} />
              {shown.images && <Err>{shown.images}</Err>}
            </Section>

            <Section title="Colors" hint="The primary color is shown by default on the storefront." aside={<Count n={d.colors.length} />}>
              <ColorPicker value={d.colors} onChange={v => set('colors', v)} />
              {shown.colors && <Err>{shown.colors}</Err>}
            </Section>

            <Section title="Sizes" hint="Click a size to add it, click again to remove it." aside={<Count n={d.sizes.length} />}>
              <SizePicker value={d.sizes} onChange={v => set('sizes', v)} />
              {shown.sizes && <Err>{shown.sizes}</Err>}
            </Section>

            <Section title="Product details" hint="Short bullet points shown on the product page.">
              <ListEditor value={d.details} onChange={v => set('details', v)} placeholder="Add a detail, e.g. Drop-shoulder fit — press Enter" />
            </Section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-0 lg:self-start">
            <Section title="Visibility">
              <div className="flex items-center justify-between gap-3 rounded-xl bg-[#fafaf7] p-3"><div><p className="text-sm font-bold">{d.published ? 'Published' : 'Draft'}</p><p className="text-xs text-muted">{d.published ? 'Visible on the storefront' : 'Hidden from customers'}</p></div><Switch checked={d.published} onChange={v => set('published', v)} label="Published" /></div>
            </Section>
            <Section title="Pricing & stock">
              <div className="space-y-4">
                <Field label="Price" error={shown.price}><div className="input-affix"><span>৳</span><input type="number" min={0} inputMode="numeric" value={d.price} onChange={e => set('price', e.target.value)} className="input" placeholder="0" /></div></Field>
                <Field label="Inventory" error={shown.inventory}><input type="number" min={0} inputMode="numeric" value={d.inventory} onChange={e => set('inventory', e.target.value)} className="input" placeholder="0" /></Field>
              </div>
            </Section>
            <Section title="Badges" hint="Controls the home page rails.">
              <TagPicker compact value={d.tags} onChange={v => set('tags', v)} />
            </Section>
            <Section title="Preview">
              <div className="overflow-hidden rounded-xl border border-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="aspect-[4/5] bg-[#f0f0eb]">{d.images[0] ? <img src={img(d.images[0])} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-muted"><Layers size={26} /></div>}</div>
                <div className="p-3"><p className="truncate text-sm font-bold">{d.name || 'Product name'}</p><p className="text-sm font-black">{Number(d.price) > 0 ? money(Number(d.price)) : '৳—'}</p><div className="mt-2 flex gap-1">{d.colors.map(c => <span key={c.hex + c.name} className="size-4 rounded-full border border-black/10" style={{ background: c.hex }} />)}</div></div>
              </div>
            </Section>
          </aside>
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-6 py-4">
        <div className="min-h-5 text-xs font-semibold">{serverError ? <span className="flex items-center gap-1.5 text-red-600"><AlertCircle size={15} />{serverError}</span> : errorCount > 0 ? <span className="flex items-center gap-1.5 text-red-600"><AlertCircle size={15} />Fix {errorCount} field{errorCount > 1 ? 's' : ''} to continue</span> : <span className="text-muted">{d.colors.length} colors · {d.sizes.length} sizes · {d.images.length} photos</span>}</div>
        <div className="flex gap-2"><button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button><button disabled={saving || uploading} className="btn btn-primary min-w-36">{saving ? <><Loader2 size={15} className="animate-spin" />Saving…</> : d.id ? 'Save changes' : d.published ? 'Create & publish' : 'Save as draft'}</button></div>
      </footer>
    </form>
    {toast}
  </>;
}

function Field({ label, error, hint, className = '', children }: { label: string; error?: string; hint?: string; className?: string; children: React.ReactNode }) {
  return <label className={`block ${className} ${error ? '[&_.input]:border-red-400' : ''}`}><Label hint={hint}>{label}</Label>{children}{error && <Err>{error}</Err>}</label>;
}
function Err({ children }: { children: React.ReactNode }) { return <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-600"><AlertCircle size={12} />{children}</p>; }
function Count({ n }: { n: number }) { return <span className="pill bg-[#f0f0eb] text-[#55554f]">{n}</span>; }
