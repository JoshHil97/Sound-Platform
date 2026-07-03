import Image from "next/image";
import { CheckCircle2, CirclePlay, Download, Maximize2 } from "lucide-react";
import type { TrainingVisualAsset } from "@/lib/types";

export function VisualHeroBoard({
  title,
  subtitle,
  asset,
  stats
}: {
  title: string;
  subtitle: string;
  asset: TrainingVisualAsset;
  stats: Array<{ label: string; value: string }>;
}) {
  return (
    <section className="relative overflow-hidden rounded-[1.25rem] border border-white/15 bg-[radial-gradient(circle_at_22%_0%,rgba(124,58,237,0.18),transparent_28rem),radial-gradient(circle_at_88%_10%,rgba(14,165,233,0.13),transparent_26rem),linear-gradient(145deg,rgba(2,6,23,0.96),rgba(7,14,29,0.92))] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.05)] md:p-7">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-1/3 top-12 h-24 w-2/3 bg-[radial-gradient(circle,rgba(168,85,247,0.35),transparent_60%)]" />
        <div className="absolute right-10 top-8 h-32 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(168,85,247,0.32),transparent)] blur-sm" />
      </div>
      <div className="relative grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Sound Academy</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black tracking-tight text-white md:text-6xl">{title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-200">{subtitle}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{stat.label}</p>
                <p className="mt-2 text-xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <Image src={asset.src} alt={asset.title} width={asset.width} height={asset.height} sizes="(min-width: 1280px) 59vw, 100vw" className="h-full min-h-[260px] w-full object-cover" priority />
          <figcaption className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/70 px-4 py-3 text-sm text-slate-200 backdrop-blur-xl">
            {asset.purpose}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function VisualAssetCard({ asset, large = false }: { asset: TrainingVisualAsset; large?: boolean }) {
  return (
    <article className={`group overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgba(15,23,42,0.68),rgba(2,6,23,0.78)),radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_18rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_48px_rgba(0,0,0,0.24)] ${large ? "md:col-span-2" : ""}`}>
      <div className="relative overflow-hidden bg-black/35">
        <Image src={asset.src} alt={asset.title} width={asset.width} height={asset.height} sizes={large ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className={`w-full object-cover transition duration-300 group-hover:scale-[1.02] ${large ? "h-[320px]" : "h-[210px]"}`} />
        <div className="absolute left-3 top-3 rounded-xl border border-violet-300/25 bg-black/65 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-violet-100 backdrop-blur-xl">
          {asset.category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black">{asset.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{asset.purpose}</p>
          </div>
          <Maximize2 className="shrink-0 text-slate-500" size={18} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {asset.linkedLessons.map((lesson) => (
            <span key={lesson} className="rounded-lg border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-xs font-bold text-cyan-100">{lesson.replaceAll("-", " ")}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function LessonDeckChrome({
  title,
  lessonLabel,
  progress,
  children,
  sidebar
}: {
  title: string;
  lessonLabel: string;
  progress: number;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[1.25rem] border border-white/15 bg-[radial-gradient(circle_at_22%_0%,rgba(124,58,237,0.18),transparent_28rem),radial-gradient(circle_at_88%_10%,rgba(14,165,233,0.13),transparent_26rem),linear-gradient(145deg,rgba(2,6,23,0.96),rgba(7,14,29,0.92))] shadow-[0_26px_90px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="grid min-h-[620px] xl:grid-cols-[250px_1fr_300px]">
        <aside className="border-b border-white/10 bg-black/25 p-4 xl:border-b-0 xl:border-r">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">{lessonLabel}</p>
          <h2 className="mt-2 text-xl font-black">{title}</h2>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">{progress}% complete</p>
          <nav className="mt-5 grid gap-2 text-sm">
            {["Overview", "Signal Flow", "I/O Setup", "Bus Setup", "Practice", "Review"].map((item, index) => (
              <span key={item} className={`rounded-xl border px-3 py-2 font-bold ${index === 0 ? "border-violet-300/30 bg-violet-500/20 text-white" : "border-white/10 bg-white/[0.03] text-slate-300"}`}>
                {index + 1}. {item}
              </span>
            ))}
          </nav>
        </aside>
        <div className="p-4 md:p-5">{children}</div>
        <aside className="border-t border-white/10 bg-black/20 p-4 xl:border-l xl:border-t-0">{sidebar}</aside>
      </div>
    </section>
  );
}

export function WaveformCompareCard() {
  return (
    <div className="rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgba(15,23,42,0.68),rgba(2,6,23,0.78)),radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_18rem)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_48px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">Listen and Compare</p>
          <h3 className="mt-1 text-lg font-black">Dry vs processed stream</h3>
        </div>
        <CirclePlay className="text-violet-300" />
      </div>
      <div className="mt-4 grid gap-3">
        {[
          ["Dry vocal", "from-violet-600 to-fuchsia-500"],
          ["With FX", "from-cyan-500 to-blue-500"]
        ].map(([label, gradient]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-3">
            <div className="mb-2 flex justify-between text-xs text-[var(--muted)]"><span>{label}</span><span>0:00 / 0:15</span></div>
            <div className="flex h-16 items-center gap-1">
              {Array.from({ length: 52 }).map((_, index) => (
                <span key={`${label}-${index}`} className={`w-full rounded-full bg-gradient-to-t ${gradient}`} style={{ height: `${18 + Math.abs(Math.sin(index * 0.42)) * 44}%`, opacity: 0.5 + (index % 5) * 0.08 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-black text-white">
        Compare in Fullscreen
        <Download size={16} />
      </button>
    </div>
  );
}

export function CheckListPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgba(15,23,42,0.68),rgba(2,6,23,0.78)),radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_18rem)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_48px_rgba(0,0,0,0.24)]">
      <h3 className="text-lg font-black">{title}</h3>
      <ul className="mt-4 grid gap-3 text-sm text-slate-200">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={16} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
