import Link from "next/link";
import { ArrowRight, ClipboardCheck, Ear, RadioTower, ShieldCheck, UserCheck } from "lucide-react";
import { PracticalTrainingWorkflowCard, PracticalWorkflowMiniCard } from "@/components/practical-training";
import { MetricCard, PageHeader, ProgressBar, StatusPill, SurfaceCard, Tag } from "@/components/ui";
import { practicalTrainingWorkflows } from "@/lib/data";
import type { PracticalTrainingWorkflow } from "@/lib/types";

const domains: PracticalTrainingWorkflow["domain"][] = ["X32", "Logic", "Dante", "Waves", "Wireless", "P16", "Troubleshooting"];

export default function PracticalTrainingPage() {
  const featuredWorkflow = practicalTrainingWorkflows[2] ?? practicalTrainingWorkflows[0];
  const totalSteps = practicalTrainingWorkflows.reduce((sum, workflow) => sum + workflow.steps.length, 0);

  return (
    <>
      <PageHeader
        eyebrow="Phase 5"
        title="Practical Training Systems"
        description="Task-based operator drills for X32, Logic, Dante, Waves, wireless, P16 and live-service troubleshooting. Every workflow teaches what to do, what to observe, why it matters and how to recover safely."
        action={{ href: `/lessons/${featuredWorkflow.lessonSlug}`, label: "Open Featured Lesson" }}
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Workflows" value={practicalTrainingWorkflows.length} detail="Seeded practical drills ready for lesson integration." />
        <MetricCard label="Operator steps" value={totalSteps} detail="Each step includes action, observation, purpose and recovery." />
        <MetricCard label="Mentor sign-offs" value="Required" detail="Every workflow has explicit evidence and mentor criteria." />
        <MetricCard label="Service-safe" value="Yes" detail="Safety rules prevent panic changes during live operation." />
      </section>

      <section className="mb-6 glass-panel overflow-hidden rounded-3xl">
        <div className="grid gap-5 p-5 xl:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap gap-2">
              <StatusPill tone="success">Featured drill</StatusPill>
              <Tag>{featuredWorkflow.domain}</Tag>
            </div>
            <h2 className="mt-4 text-3xl font-black">Sunday-ready practice, not passive reading</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
              Practical workflows make every lesson behave like a guided operator session: trace the signal, check the board, listen for the result, record evidence and get mentor sign-off.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {["Action", "Observe", "Recover", "Sign off"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <span className="font-mono text-sm text-violet-200">0{index + 1}</span>
                  <p className="mt-2 font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <SurfaceCard>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Training readiness</p>
            <div className="mt-4 grid gap-4">
              <div>
                <div className="mb-2 flex justify-between text-xs font-bold text-[var(--muted)]"><span>Lesson integration</span><span>72%</span></div>
                <ProgressBar value={72} />
              </div>
              <div>
                <div className="mb-2 flex justify-between text-xs font-bold text-[var(--muted)]"><span>Mentor evidence model</span><span>64%</span></div>
                <ProgressBar value={64} />
              </div>
              <div>
                <div className="mb-2 flex justify-between text-xs font-bold text-[var(--muted)]"><span>Service-day safety</span><span>88%</span></div>
                <ProgressBar value={88} />
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SurfaceCard>
          <ClipboardCheck className="text-violet-300" />
          <h2 className="mt-3 text-xl font-black">Step-by-step operation</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Every drill says what to press, what to check and what the operator should see.</p>
        </SurfaceCard>
        <SurfaceCard>
          <Ear className="text-cyan-300" />
          <h2 className="mt-3 text-xl font-black">Listening targets</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Trainees learn what clean gain, safe dynamics, clear speech and stable stream handoff should sound like.</p>
        </SurfaceCard>
        <SurfaceCard>
          <ShieldCheck className="text-emerald-300" />
          <h2 className="mt-3 text-xl font-black">Safe recovery</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Each step includes what to do when the expected signal, meter or sound is wrong.</p>
        </SurfaceCard>
        <SurfaceCard>
          <UserCheck className="text-amber-300" />
          <h2 className="mt-3 text-xl font-black">Mentor evidence</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Sign-off criteria make practical readiness visible and reviewable.</p>
        </SurfaceCard>
      </section>

      <section className="mb-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Workflow Library</p>
            <h2 className="mt-1 text-3xl font-black">Operator drills by system</h2>
          </div>
          <Link href="/academy" className="focus-ring inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-black text-violet-100 hover:bg-violet-500/25">
            Back to Academy
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {practicalTrainingWorkflows.map((workflow) => (
            <PracticalWorkflowMiniCard key={workflow.slug} workflow={workflow} />
          ))}
        </div>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-7">
        {domains.map((domain) => {
          const count = practicalTrainingWorkflows.filter((workflow) => workflow.domain === domain).length;
          return (
            <SurfaceCard key={domain} className="lg:col-span-1">
              <RadioTower className="text-cyan-300" size={18} />
              <p className="mt-3 text-sm font-black">{domain}</p>
              <p className="mt-1 text-2xl font-black">{count}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">active drills</p>
            </SurfaceCard>
          );
        })}
      </section>

      <PracticalTrainingWorkflowCard workflow={featuredWorkflow} />
    </>
  );
}
