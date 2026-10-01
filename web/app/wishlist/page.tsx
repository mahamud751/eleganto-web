'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/components/auth';
import ProductCard from '@/components/product-card';
import type { Product } from '@/lib/products';
type ApiProduct = Product & { id: string; colorName: string; colorHex: string };
export default function WishlistPage() { const { user, ready, wishlist } = useAuth(); const [products, setProducts] = useState<Product[]>([]); useEffect(() => { if (!user) return; api<{ product: ApiProduct }[]>('/users/me/wishlist').then(rows => { const mapped = rows.map(({ product }) => ({ ...product, color: { name: product.colorName, hex: product.colorHex }, tags: product.tags as Product['tags'] })); setProducts(mapped); }).catch(() => {}); }, [user, wishlist]); if (!ready) return null; if (!user) return <div className="px-5 py-28 text-center"><Heart className="mx-auto size-9" /><h1 className="mt-5 text-4xl font-extrabold uppercase">Your wishlist</h1><p className="mt-3 text-sm text-muted">Sign in to save products across devices.</p><Link href="/login" className="mt-7 inline-block bg-ink px-8 py-4 text-xs font-bold tracking-[.2em] text-white uppercase">Sign in</Link></div>; return <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-[104px]"><p className="text-[10px] font-bold tracking-[.3em] text-muted uppercase">Saved pieces</p><h1 className="mt-2 text-4xl font-extrabold uppercase">Wishlist ({products.length})</h1>{products.length ? <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{products.map(product => <ProductCard key={product.slug} product={product} />)}</div> : <div className="mt-12 border border-line p-12 text-center"><p className="text-sm text-muted">No saved products yet.</p><Link href="/shop" className="mt-4 inline-block text-xs font-bold underline">Explore the shop</Link></div>}</div>; }
