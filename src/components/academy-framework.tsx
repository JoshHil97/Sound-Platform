import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, FlaskConical, FolderOpen, GraduationCap, Lock, ShieldCheck, Trophy, Users, Zap } from "lucide-react";
import type { Academy, CertificationDefinition, Competency, Module, Skill, SkillTree } from "@/lib/types";
import { ProgressBar, StatusPill, SurfaceCard, Tag } from "@/components/ui";

const accentByIndex = ["violet", "cyan", "amber", "emerald", "fuchsia"] as const;

export function AcademyTopBar({ current }: { current?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/academy" className="font-semibold text-slate-400 hover:text-white">Academy</Link>
        {current ? (
          <>
            <span className="text-slate-600">/</span>
            <span className="font-bold text-white">{current}</span>
          </>
        ) : null}
      </div>
      <div className="flex items-center gap-5">
        <span className="inline-flex items-center gap-2"><Zap className="text-orange-300" size={18} /> 12 day streak</span>
        <span className="inline-flex items-center gap-2"><Trophy className="text-amber-300" size={18} /> Certification available</span>
      </div>
    </div>
  );
}

export function AcademySidebar({
  title,
  mission,
  progress,
  navItems,
  masteryItems
}: {
  title: string;
  mission: string;
  progress: number;
  navItems: string[];
  masteryItems: string[];
}) {
  return (
    <aside className="grid gap-4 lg:sticky lg:top-24 lg:self-start">
      <SurfaceCard>
        <p className="text-2xl font-black uppercase tracking-wide text-violet-300">{title}</p>
        <p className="mt-3 text-sm leading-6 text-slate-200">{mission}</p>
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
            <span>Your progress</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
        <nav className="mt-5 grid gap-2">
          {navItems.map((item, index) => (
            <a key={item} href={`#${slugify(item)}`} className={`focus-ring flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold ${index === 0 ? "bg-violet-500/25 text-white" : "text-slate-300 hover:bg-white/[0.05] hover:text-white"}`}>
              {index === 0 ? <BookOpen size={17} /> : index < 4 ? <FlaskConical size={17} /> : <FolderOpen size={17} />}
              {item}
            </a>
          ))}
        </nav>
      </SurfaceCard>
      <SurfaceCard>
        <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">What you’ll master</p>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-200">
          {masteryItems.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <MiniWaveform className="mt-5" />
      </SurfaceCard>
    </aside>
  );
}

export function SpecialistHero({
  academy,
  certification,
  moduleCount,
  skillCount,
  visual = "wave"
}: {
  academy: Academy;
  certification?: CertificationDefinition;
  moduleCount: number;
  skillCount: number;
  visual?: "wave" | "eq" | "signal";
}) {
  return (
    <section className="glass-panel relative overflow-hidden rounded-3xl p-5 md:p-7">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-70 lg:block">
        {visual === "eq" ? <LargeEqCurve /> : visual === "signal" ? <SignalChainVisual /> : <LargeWaveform />}
      </div>
      <div className="relative max-w-3xl lg:max-w-[52%]">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-black uppercase tracking-wide md:text-5xl">{academy.title.replace("Academy", "Specialist")}</h1>
          <StatusPill>{moduleCount} modules</StatusPill>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">{academy.mission}</p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-200">
          <span className="inline-flex items-center gap-2"><BookOpen className="text-violet-300" size={19} /> {moduleCount} modules</span>
          <span className="inline-flex items-center gap-2"><FlaskConical className="text-violet-300" size={19} /> 20+ practice labs</span>
          <span className="inline-flex items-center gap-2"><Users className="text-violet-300" size={19} /> Real church scenarios</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="text-violet-300" size={19} /> {skillCount} skill nodes</span>
          {certification ? <span className="inline-flex items-center gap-2"><GraduationCap className="text-violet-300" size={19} /> Certification ready</span> : null}
        </div>
      </div>
    </section>
  );
}

export function SpecialistModuleCard({ module, index, href }: { module: Module; index: number; href: string }) {
  const accent = accentByIndex[index % accentByIndex.length];
  return (
    <Link href={href} className="focus-ring group grid min-h-[260px] rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-violet-400/40 hover:bg-violet-500/10">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500/70 text-lg font-black text-white shadow-[0_0_24px_rgba(124,58,237,0.35)]">{index + 1}</span>
        <div>
          <Tag>{module.level}</Tag>
          <h2 className="mt-3 text-xl font-bold leading-tight">{module.title}</h2>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{module.summary}</p>
      <div className="mt-4">
        {accent === "cyan" ? <MiniSpectrum /> : accent === "amber" ? <MiniEqCurve tone="amber" /> : accent === "emerald" ? <MiniEqCurve tone="emerald" /> : <MiniWaveform />}
      </div>
      <div className="mt-auto flex items-center justify-between pt-4 text-sm text-slate-300">
        <span>{module.duration}</span>
        <span className="inline-flex items-center gap-2 text-violet-200"><FlaskConical size={16} /> Practice Lab</span>
      </div>
    </Link>
  );
}

export function SkillTreePreview({ tree, skills }: { tree?: SkillTree; skills: Skill[] }) {
  return (
    <SurfaceCard>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Skill tree</p>
          <h2 className="mt-1 text-2xl font-black">{tree?.title ?? "Academy Skill Tree"}</h2>
        </div>
        <StatusPill>{skills.length} skills</StatusPill>
      </div>
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="relative min-h-44 min-w-[720px]">
          <div className="absolute left-12 right-12 top-20 h-px bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400" />
          {skills.slice(0, 6).map((skill, index) => (
            <div key={skill.slug} className="absolute top-8 grid w-28 place-items-center gap-2 text-center" style={{ left: `${index * 118}px` }}>
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-violet-300/30 bg-violet-500/20 text-violet-100 shadow-[0_0_28px_rgba(124,58,237,0.18)]">
                {index === 0 ? <BookOpen /> : index === skills.length - 1 ? <Trophy /> : <Zap />}
              </div>
              <p className="text-xs font-bold leading-4 text-slate-200">{skill.title}</p>
            </div>
          ))}
        </div>
      </div>
    </SurfaceCard>
  );
}

export function CertificationBand({ certification, competencies }: { certification?: CertificationDefinition; competencies: Competency[] }) {
  return (
    <section className="glass-panel grid gap-5 rounded-3xl p-5 lg:grid-cols-[1fr_2fr_1fr] lg:items-center">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-violet-500/20 text-violet-100">
          <GraduationCap size={30} />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">{certification?.title ?? "Certification Path"}</p>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{certification?.mission ?? "Complete the path, pass assessments and earn mentor sign-off."}</p>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {competencies.slice(0, 6).map((competency) => (
          <p key={competency.slug} className="flex gap-2 text-sm text-slate-200">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-300" />
            {competency.title}
          </p>
        ))}
      </div>
      <Link href="/certifications" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white hover:bg-violet-500">
        View Certification
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}

export function AcademyPathCard({ academy, moduleCount, progress }: { academy: Academy; moduleCount: number; progress: number }) {
  return (
    <Link href={`/academy/paths/${academy.slug}`} className="focus-ring glass-panel grid min-h-[300px] rounded-3xl p-5 transition hover:border-violet-400/40 hover:bg-violet-500/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">Specialist Path</p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-wide">{academy.title.replace("Academy", "Specialist")}</h2>
        </div>
        {progress > 0 ? <StatusPill tone="success">Active</StatusPill> : <Lock className="text-slate-500" size={19} />}
      </div>
      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{academy.mission}</p>
      <div className="mt-5">
        <MiniWaveform />
      </div>
      <div className="mt-auto pt-5">
        <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
          <span>{moduleCount} modules</span>
          <span>{progress}%</span>
        </div>
        <ProgressBar value={progress} />
      </div>
    </Link>
  );
}

export function AcademyCommandPanel({
  title,
  items,
  tone = "violet"
}: {
  title: string;
  items: Array<{ label: string; value: string; detail: string }>;
  tone?: "violet" | "cyan" | "emerald";
}) {
  const toneClass = tone === "cyan" ? "text-cyan-300" : tone === "emerald" ? "text-emerald-300" : "text-violet-300";
  return (
    <SurfaceCard>
      <p className={`text-sm font-black uppercase tracking-[0.16em] ${toneClass}`}>{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold text-white">{item.label}</p>
              <span className="font-mono text-sm text-cyan-200">{item.value}</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{item.detail}</p>
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}

function LargeWaveform() {
  return <div className="absolute inset-0 flex items-center gap-1">{Array.from({ length: 90 }).map((_, index) => <span key={index} className="w-full rounded-full bg-violet-500/60" style={{ height: `${8 + Math.abs(Math.sin(index * 0.35)) * 44}%`, opacity: index % 5 === 0 ? 1 : 0.45 }} />)}</div>;
}

function LargeEqCurve() {
  return (
    <svg viewBox="0 0 600 240" className="absolute inset-0 h-full w-full">
      <defs><linearGradient id="eqHero" x1="0" x2="1"><stop stopColor="#8b5cf6" /><stop offset="0.45" stopColor="#22d3ee" /><stop offset="1" stopColor="#f59e0b" /></linearGradient></defs>
      <path d="M20 145 C90 145 92 70 150 92 C210 118 205 174 268 150 C330 128 320 70 386 86 C454 103 438 190 506 170 C550 158 560 126 590 132" fill="none" stroke="url(#eqHero)" strokeWidth="5" />
      {[80, 170, 275, 385, 510].map((x) => <circle key={x} cx={x} cy={x === 170 ? 102 : x === 385 ? 88 : x === 510 ? 168 : 145} r="8" fill="#0b1020" stroke="#fff" strokeWidth="3" />)}
    </svg>
  );
}

function SignalChainVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
        {["Stage", "X32", "Dante", "Logic", "Stream"].map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">{item}</span>
            {index < 4 ? <ArrowRight className="text-cyan-300" size={18} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniWaveform({ className = "" }: { className?: string }) {
  return <div className={`flex h-16 items-center gap-1 overflow-hidden rounded-xl border border-white/10 bg-black/25 p-3 ${className}`}>{Array.from({ length: 46 }).map((_, index) => <span key={index} className="w-full rounded-full bg-gradient-to-t from-violet-700 to-cyan-300" style={{ height: `${18 + Math.abs(Math.sin(index * 0.55)) * 72}%`, opacity: 0.42 + (index % 4) * 0.12 }} />)}</div>;
}

function MiniSpectrum() {
  return <div className="flex h-20 items-end gap-1 rounded-xl border border-white/10 bg-black/25 p-3">{Array.from({ length: 28 }).map((_, index) => <span key={index} className="w-full rounded-t bg-gradient-to-t from-red-500 via-yellow-300 to-cyan-300" style={{ height: `${18 + Math.abs(Math.sin(index * 0.22)) * 72}%` }} />)}</div>;
}

function MiniEqCurve({ tone = "violet" }: { tone?: "violet" | "amber" | "emerald" }) {
  const stroke = tone === "amber" ? "#f59e0b" : tone === "emerald" ? "#22c55e" : "#8b5cf6";
  return (
    <svg viewBox="0 0 320 100" className="h-20 w-full rounded-xl border border-white/10 bg-black/25">
      <path d="M10 62 C58 62 56 28 92 42 C132 57 130 82 170 64 C208 48 204 30 244 42 C282 54 282 38 310 40" fill="none" stroke={stroke} strokeWidth="4" />
      <path d="M10 62 C58 62 56 28 92 42 C132 57 130 82 170 64 C208 48 204 30 244 42 C282 54 282 38 310 40 L310 100 L10 100 Z" fill={stroke} opacity="0.12" />
    </svg>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
