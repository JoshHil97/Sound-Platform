import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: { href: string; label: string };
}) {
  return (
    <section className="mb-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">{eyebrow}</p> : null}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{description}</p>
        </div>
        {action ? (
          <Link className="focus-ring inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]" href={action.href}>
            {action.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-md border border-[var(--line)] bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-sm leading-5 text-[var(--muted)]">{detail}</p>
    </article>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200" aria-label={`${value}% complete`}>
      <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-teal-100 bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800">{children}</span>;
}
