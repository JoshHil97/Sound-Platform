import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

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
    <section className="glass-panel mb-6 rounded-2xl p-5">
      {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p> : null}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="neon-text text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">{description}</p>
        </div>
        {action ? (
          <Link className="focus-ring inline-flex items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/20 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_26px_rgba(124,58,237,0.25)] hover:bg-violet-500/30" href={action.href}>
            {action.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="glass-panel rounded-2xl p-4">
      <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      <p className="mt-2 text-sm leading-5 text-[var(--muted)]">{detail}</p>
    </article>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${value}% complete`}
      className="h-2 overflow-hidden rounded-full bg-white/10"
    >
      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs font-semibold text-cyan-100">{children}</span>;
}

export function SurfaceCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <article className={`glass-panel rounded-2xl p-5 ${className}`}>{children}</article>;
}

export function StatusPill({ children, tone = "info" }: { children: React.ReactNode; tone?: "success" | "warning" | "danger" | "info" }) {
  const tones = {
    success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    warning: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    danger: "border-red-400/30 bg-red-400/10 text-red-200",
    info: "border-violet-400/30 bg-violet-400/10 text-violet-100"
  };
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function ProgressRing({ value, label }: { value: number; label?: string }) {
  return (
    <div className="relative grid h-24 w-24 place-items-center rounded-full" style={{ background: `conic-gradient(#8b5cf6 ${value * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}>
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#080c19] text-center">
        <span className="text-xl font-bold">{value}%</span>
        {label ? <span className="text-[10px] text-[var(--muted)]">{label}</span> : null}
      </div>
    </div>
  );
}

export function Meter({ value = 70, label }: { value?: number; label: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-[var(--muted)]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="meter-gradient h-full rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <label className="relative block">
      <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
      <span className="sr-only">{placeholder}</span>
      <input
        className="focus-ring w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        placeholder={placeholder}
      />
    </label>
  );
}

export function SectionHeader({ title, description, action }: { title: string; description?: string; action?: { href: string; label: string } }) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-3 py-2 text-sm font-bold text-violet-100 hover:bg-violet-500/25">
          {action.label}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

export function MetricCard({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
      {detail ? <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{detail}</p> : null}
    </div>
  );
}

export function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-slate-200">{value}</dd>
    </div>
  );
}

export function StepCard({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet-500/20 text-xs font-black text-violet-100">{index}</span>
      <span>{children}</span>
    </li>
  );
}

export function LinkedAction({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-slate-100 hover:border-cyan-300/30 hover:bg-cyan-300/10">
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}
