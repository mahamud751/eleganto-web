import PageHeader from '@/components/page-header';
import ProductManager from '@/components/product-manager';
import { getProducts } from '@/lib/api';
export default async function Products({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  return <><PageHeader eyebrow="Catalogue" title="Products" description="Manage photos, colors, sizes, pricing and stock for everything in your store." /><ProductManager initial={products} openNew={params.new === '1'} /></>;
}
