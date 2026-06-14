import Link from "next/link";
import { Lock, Route, ShieldCheck } from "lucide-react";
import { PageHeader, ProgressBar, StatusPill, Tag } from "@/components/ui";
import { modules, roadmapNodes } from "@/lib/data";

const levels = ["Foundations", "Operator", "Engineer", "Senior Engineer", "Technical Director"] as const;

export default function AcademyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skill Roadmap"
        title="Academy progression"
        description="A practical pathway from first-time volunteer to technical director, built around X32 operation, Dante, Logic livestream mixing, Waves workflows and real service competence."
      />

      <div className="grid gap-6">
        {levels.map((level, levelIndex) => (
          <section key={level} className="glass-panel rounded-3xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/20 text-violet-100">
                  <Route size={22} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">{level}</h2>
                  <p className="text-sm text-[var(--muted)]">Level {levelIndex + 1} certification path</p>
                </div>
              </div>
              <StatusPill tone={levelIndex < 2 ? "success" : levelIndex === 2 ? "info" : "warning"}>{levelIndex < 2 ? "Active path" : levelIndex === 2 ? "Unlocked" : "Locked soon"}</StatusPill>
            </div>

            <div className="relative mt-6 grid gap-4 lg:grid-cols-3">
              <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-violet-400 via-cyan-400 to-transparent lg:block" />
              {modules.filter((module) => module.level === level).map((module) => {
                const node = roadmapNodes.find((item) => item.moduleSlug === module.slug);
                return (
                  <Link key={module.slug} href={`/academy/${module.slug}`} className="focus-ring group relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-violet-400/40 hover:bg-violet-500/10">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <div className="mb-2 flex flex-wrap gap-2">
                          <Tag>{node?.difficulty}</Tag>
                          <Tag>{module.duration}</Tag>
                        </div>
                        <h3 className="text-lg font-bold">{module.title}</h3>
                      </div>
                      {node?.state === "Locked" ? <Lock size={18} className="text-slate-500" /> : <ShieldCheck size={18} className="text-emerald-300" />}
                    </div>
                    <p className="text-sm leading-6 text-[var(--muted)]">{module.summary}</p>
                    <div className="mt-4">
                      <ProgressBar value={node?.completion ?? 0} />
                      <p className="mt-2 text-xs font-bold text-slate-400">{node?.completion ?? 0}% · {node?.state}</p>
                    </div>
                    <div className="mt-4 grid gap-3">
                      <SurfaceMini title="Linked equipment" items={node?.linkedEquipment ?? []} />
                      <SurfaceMini title="Service skills" items={node?.serviceSkills ?? []} />
                    </div>
                    <p className="mt-4 rounded-xl bg-black/25 p-3 text-xs font-semibold text-cyan-100">{node?.nextAction}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function SurfaceMini({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => <span key={item} className="rounded-lg bg-white/[0.06] px-2 py-1 text-xs text-slate-200">{item}</span>)}
      </div>
    </div>
  );
}
