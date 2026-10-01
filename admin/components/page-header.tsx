export default function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: React.ReactNode }) {
  return <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 text-[11px] font-bold tracking-[.2em] text-muted uppercase">{eyebrow}</p><h1 className="text-4xl font-black tracking-[-.06em]">{title}</h1>{description && <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>}</div>{action}</header>;
}
