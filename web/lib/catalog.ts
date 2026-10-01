import { API_URL } from './api';
import { products as fallback, type Product } from './products';
type DbProduct = Omit<Product, 'color'> & { colorName: string; colorHex: string; colors?: { name: string; hex: string }[] };
const normalize = (p: DbProduct): Product => ({ ...p, color: { name: p.colorName, hex: p.colorHex }, colors: Array.isArray(p.colors) && p.colors.length ? p.colors : [{ name: p.colorName, hex: p.colorHex }], sizes: p.sizes?.length ? p.sizes : ['S', 'M', 'L', 'XL', '2XL'] });
export async function fetchProducts(): Promise<Product[]> { try { const response = await fetch(`${API_URL}/products`, { cache: 'no-store' }); if (!response.ok) throw new Error(); const rows = await response.json() as DbProduct[]; return rows.filter(p => p.published !== false).map(normalize); } catch { return fallback; } }
export async function fetchProduct(slug: string): Promise<Product | undefined> { return (await fetchProducts()).find(p => p.slug === slug); }
