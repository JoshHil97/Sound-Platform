import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, RadioTower, Route, ShieldCheck } from "lucide-react";
import { AcademyCommandPanel, AcademyPathCard, AcademyTopBar } from "@/components/academy-framework";
import { ProgressBar, StatusPill, SurfaceCard, Tag } from "@/components/ui";
import { academies, certificationDefinitions, getCompetenciesForAcademy, getModulesForAcademy, progressionRules } from "@/lib/data";

const pathProgress = [18, 42, 27, 14, 0, 0];

export default function AcademyPage() {
  const activeAcademy = academies[2];
  const activeModules = getModulesForAcademy(activeAcademy.slug);

  return (
    <>
      <AcademyTopBar current="Pathways" />

      <section className="glass-panel relative overflow-hidden rounded-3xl p-5 md:p-8">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-60 lg:block">
          <div className="flex h-full items-center gap-1 px-10">
            {Array.from({ length: 78 }).map((_, index) => (
              <span
                key={`hero-wave-${index}`}
                className="w-full rounded-full bg-gradient-to-t from-violet-700 via-purple-400 to-cyan-300"
                style={{ height: `${10 + Math.abs(Math.sin(index * 0.31)) * 72}%`, opacity: 0.25 + (index % 6) * 0.08 }}
              />
            ))}
          </div>
        </div>
        <div className="relative max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <StatusPill>Structured Learning Paths</StatusPill>
            <Tag>{academies.length} specialist paths</Tag>
          </div>
          <h1 className="mt-5 text-4xl font-black uppercase tracking-wide md:text-6xl">Sound Academy Pathways</h1>
          <p className="mt-4 text-base leading-7 text-slate-200 md:text-lg">
            A church-specific progression system for volunteers learning X32 operation, FOH mixing, Logic livestream workflows, Dante routing, Waves processing and service-day troubleshooting.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/academy/paths/${activeAcademy.slug}`} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white hover:bg-violet-500">
              Continue Livestream Path
              <ArrowRight size={17} />
            </Link>
            <Link href="/sound-lab" className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-black text-slate-100 hover:bg-white/[0.1]">
              Open Sound Lab
              <FlaskConical size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SurfaceCard>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Current Path</p>
          <h2 className="mt-2 text-2xl font-black">Livestream Specialist</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">{activeModules.length} modules with Dante, Logic, Waves and stream output labs.</p>
          <div className="mt-4"><ProgressBar value={27} /></div>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Competencies</p>
          <h2 className="mt-2 text-2xl font-black">{getCompetenciesForAcademy(activeAcademy.slug).length} mapped skills</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Every path ties learning to practical, operational and mentor-observed ability.</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Certification</p>
          <h2 className="mt-2 text-2xl font-black">{certificationDefinitions.length} credentials</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Progression is governed by lessons, assessments, service evidence and renewal rules.</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-300">Service Ready</p>
          <h2 className="mt-2 text-2xl font-black">Sunday focused</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Academy work points directly into service checklists, SOPs and live fault recovery.</p>
        </SurfaceCard>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Specialist Roadmap</p>
              <h2 className="mt-1 text-3xl font-black">Choose the next training path</h2>
            </div>
            <StatusPill tone="info">Skill-tree governed</StatusPill>
          </div>
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {academies.map((academy, index) => (
              <AcademyPathCard
                key={academy.slug}
                academy={academy}
                moduleCount={getModulesForAcademy(academy.slug).length}
                progress={pathProgress[index] ?? 0}
                recommended={academy.slug === "foundations-academy"}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <AcademyCommandPanel
            title="Training Command"
            items={[
              { label: "Next lab", value: "Logic", detail: "Dante input verification into the approved Sunday livestream template." },
              { label: "Mentor review", value: "2 due", detail: "X32 gain drill and livestream handoff evidence need senior sign-off." },
              { label: "Service reps", value: "4 left", detail: "Required observations before Livestream Engineer certification." }
            ]}
          />
          <SurfaceCard>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Progression Gates</p>
            <div className="mt-4 grid gap-3">
              {progressionRules.map((rule) => (
                <div key={`${rule.fromAcademySlug}-${rule.toAcademySlug}`} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Route size={16} className="text-violet-300" />
                    <span>{rule.ruleType}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{rule.requirement}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <SurfaceCard>
          <BookOpen className="text-violet-300" />
          <h2 className="mt-3 text-xl font-black">Lesson maps before lesson volume</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Every path is built from the same curriculum map, so lessons stay connected to competencies, assessments and service evidence.</p>
        </SurfaceCard>
        <SurfaceCard>
          <RadioTower className="text-cyan-300" />
          <h2 className="mt-3 text-xl font-black">Built for church production</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">The path language is practical: check signal, verify routing, mix speech, recover faults and document what changed.</p>
        </SurfaceCard>
        <SurfaceCard>
          <ShieldCheck className="text-emerald-300" />
          <h2 className="mt-3 text-xl font-black">Certification has evidence</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Credentials are not course badges. They require practical sign-offs, service observations, mentor notes and renewal cycles.</p>
        </SurfaceCard>
      </section>
    </>
  );
}
