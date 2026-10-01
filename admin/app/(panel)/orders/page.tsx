import PageHeader from '@/components/page-header';
import { getOrders } from '@/lib/data';
import OrderManager from '@/components/order-manager';
export default async function Orders({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const [orders, params] = await Promise.all([getOrders(), searchParams]);
  return <><PageHeader eyebrow="Operations" title="Orders" description="Track, confirm and ship customer orders." /><OrderManager initial={orders} initialStatus={typeof params.status === 'string' ? params.status : 'ALL'} /></>;
}
