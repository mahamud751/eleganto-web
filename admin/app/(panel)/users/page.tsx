import PageHeader from '@/components/page-header';
import CustomerList from '@/components/customer-list';
import { getUsers } from '@/lib/data';
export default async function UsersPage() { return <><PageHeader eyebrow="People" title="Customers" description="Everyone who has an account on your store." /><CustomerList initial={await getUsers()} /></>; }
