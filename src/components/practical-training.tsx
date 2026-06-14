import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Ear, Gauge, ShieldAlert, UserCheck, Wrench } from "lucide-react";
import type { PracticalTrainingWorkflow } from "@/lib/types";
import { Meter, StatusPill, SurfaceCard, Tag } from "@/components/ui";

const domainTone: Record<PracticalTrainingWorkflow["domain"], string> = {
  X32: "text-cyan-300",
  Logic: "text-violet-300",
  Dante: "text-sky-300",
  Waves: "text-fuchsia-300",
  Wireless: "text-emerald-300",
  P16: "text-amber-300",
  Troubleshooting: "text-red-300"
};

export function PracticalTrainingWorkflowCard({ workflow, compact = false }: { workflow: PracticalTrainingWorkflow; compact?: boolean }) {
  return (
    <section className="glass-panel overflow-hidden rounded-3xl">
      <div className="border-b border-white/10 bg-white/[0.025] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2">
              <Tag>{workflow.domain}</Tag>
              <Tag>{workflow.estimatedMinutes} min drill</Tag>
              <StatusPill tone="warning">Mentor sign-off</StatusPill>
            </div>
            <h2 className="mt-4 text-2xl font-black">{workflow.title}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-[var(--muted)]">{workflow.scenario}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm">
            <p className="font-black text-white">Operator target</p>
            <p className="mt-2 max-w-xs leading-6 text-slate-300">{workflow.operatorTarget}</p>
          </div>
        </div>
      </div>

      <div className={`grid gap-5 p-5 ${compact ? "" : "xl:grid-cols-[1fr_340px]"}`}>
        <div className="grid gap-4">
          <TrainingVisual workflow={workflow} />
          <div className="grid gap-3">
            {workflow.steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500/25 text-sm font-black text-violet-100">{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-black">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{step.action}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <MiniFact label="Observe" value={step.observe} />
                  <MiniFact label="Why" value={step.why} />
                  <MiniFact label="If wrong" value={step.ifWrong} warning />
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <SurfaceCard>
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-amber-300" size={19} />
              <h3 className="font-black">Safety rule</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-amber-50">{workflow.safetyRule}</p>
          </SurfaceCard>
          <ChecklistPanel title="Board checks" icon={<ClipboardCheck size={18} />} items={workflow.boardChecks} />
          <ChecklistPanel title="Listen for" icon={<Ear size={18} />} items={workflow.listeningTargets} />
          <ChecklistPanel title="Evidence" icon={<UserCheck size={18} />} items={workflow.evidenceRequired} />
          <SurfaceCard>
            <div className="flex items-center gap-2">
              <UserCheck className="text-emerald-300" size={19} />
              <h3 className="font-black">Mentor sign-off</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{workflow.mentorSignoff}</p>
          </SurfaceCard>
          {workflow.relatedRoutes.length ? (
            <SurfaceCard>
              <h3 className="font-black">Related tools</h3>
              <div className="mt-3 grid gap-2">
                {workflow.relatedRoutes.map((route) => (
                  <Link key={`${workflow.slug}-${route.href}`} href={route.href} className="focus-ring inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-slate-100 hover:bg-violet-500/15">
                    {route.label}
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </SurfaceCard>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

export function PracticalWorkflowMiniCard({ workflow }: { workflow: PracticalTrainingWorkflow }) {
  return (
    <Link href={workflow.lessonSlug ? `/lessons/${workflow.lessonSlug}` : `/academy/${workflow.moduleSlug}`} className="focus-ring grid rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-violet-400/40 hover:bg-violet-500/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.16em] ${domainTone[workflow.domain]}`}>{workflow.domain} drill</p>
          <h3 className="mt-2 text-lg font-black">{workflow.title}</h3>
        </div>
        <StatusPill>{workflow.estimatedMinutes} min</StatusPill>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{workflow.operatorTarget}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {workflow.boardChecks.slice(0, 3).map((check) => <Tag key={check}>{check}</Tag>)}
      </div>
    </Link>
  );
}

function TrainingVisual({ workflow }: { workflow: PracticalTrainingWorkflow }) {
  const meterValues = workflow.domain === "Dante" ? [92, 76, 84] : workflow.domain === "Waves" ? [58, 38, 72] : workflow.domain === "Troubleshooting" ? [22, 65, 80] : [72, 56, 68];
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Gauge className={domainTone[workflow.domain]} />
          <p className="font-black">{workflow.domain} practice surface</p>
        </div>
        <StatusPill tone="success">Guided drill</StatusPill>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="rounded-2xl border border-white/10 bg-[#070b16] p-4">
          <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
            <span>{workflow.title}</span>
            <span>{workflow.operatorTarget}</span>
          </div>
          <div className="flex h-32 items-center gap-1 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-3">
            {Array.from({ length: 72 }).map((_, index) => (
              <span
                key={`${workflow.slug}-wave-${index}`}
                className="w-full rounded-full bg-gradient-to-t from-violet-700 via-fuchsia-400 to-cyan-300"
                style={{ height: `${12 + Math.abs(Math.sin(index * 0.4 + workflow.slug.length)) * 76}%`, opacity: 0.28 + (index % 5) * 0.12 }}
              />
            ))}
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-4">
            {workflow.steps.slice(0, 4).map((step, index) => (
              <div key={step.title} className="rounded-xl border border-white/10 bg-white/[0.035] p-3 text-xs">
                <span className="font-mono text-violet-200">0{index + 1}</span>
                <p className="mt-1 font-bold text-slate-200">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <Meter label="Input" value={meterValues[0]} />
          <Meter label="Processing" value={meterValues[1]} />
          <Meter label="Output" value={meterValues[2]} />
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-50">
            <div className="mb-2 flex items-center gap-2 font-black"><Wrench size={15} /> Failure mode</div>
            {workflow.steps[0]?.ifWrong}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChecklistPanel({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <SurfaceCard>
      <div className="flex items-center gap-2">
        <span className="text-cyan-300">{icon}</span>
        <h3 className="font-black">{title}</h3>
      </div>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}

function MiniFact({ label, value, warning = false }: { label: string; value: string; warning?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${warning ? "border-amber-300/20 bg-amber-300/10" : "border-white/10 bg-black/20"}`}>
      <p className={`text-xs font-black uppercase tracking-[0.16em] ${warning ? "text-amber-200" : "text-cyan-200"}`}>{label}</p>
      <p className="mt-2 text-xs leading-5 text-slate-200">{value}</p>
    </div>
  );
}
