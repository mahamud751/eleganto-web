import PageHeader from '@/components/page-header';
import SettingsForm from '@/components/settings-form';
import { getSettings } from '@/lib/api';
export default async function Settings() { return <><PageHeader eyebrow="Workspace" title="Settings" description="Global storefront values and payment numbers." /><SettingsForm initial={await getSettings()} /></>; }
