import PageHeader from '@/components/page-header';
import BannerManager from '@/components/banner-manager';
import { getBanners } from '@/lib/api';
export default async function BannersPage() { return <><PageHeader eyebrow="Storefront" title="Banners" description="Hero banners shown on the homepage, in order." /><BannerManager initial={await getBanners()} /></>; }
