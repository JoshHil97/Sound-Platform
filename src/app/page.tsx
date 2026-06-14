import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Radio, Sparkles } from "lucide-react";
import { activityFeed, audioExamples, modules, serviceChecklist, serviceLogs, systemHealth, troubleshootingFlows, users } from "@/lib/data";
import { Meter, PageHeader, ProgressBar, ProgressRing, StatCard, StatusPill, SurfaceCard, Tag } from "@/components/ui";

export default function DashboardPage() {
  const currentUser = users[2];
  const readyCount = serviceChecklist.filter((item) => item.status === "Done").length;
  const readiness = Math.round((readyCount / serviceChecklist.length) * 100);

  return (
    <>
      <PageHeader
        eyebrow="Live Production Command Centre"
        title="Welcome back, Alex"
        description="Build confident, excellent sound for the house of God. Today’s dashboard blends training progress, service readiness, system health and mentor activity."
        action={{ href: "/service-mode", label: "Start Service Mode" }}
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SurfaceCard className="flex items-center gap-4">
          <ProgressRing value={currentUser.progress} label="Overall" />
          <div>
            <p className="text-sm text-[var(--muted)]">My Progress</p>
            <p className="mt-1 text-xl font-bold">{currentUser.currentLevel}</p>
            <Link href="/academy" className="mt-3 inline-flex text-sm font-bold text-violet-200">Continue learning</Link>
          </div>
        </SurfaceCard>
        <StatCard label="Current Level" value={currentUser.role} detail="Next: Engineer certification pathway." />
        <StatCard label="Modules Complete" value="7 / 20" detail={`${modules.length} total modules in five levels.`} />
        <StatCard label="XP This Week" value="1,250" detail="+320 from Sound Lab and Dante practice." />
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <SurfaceCard>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Continue Learning</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">Recommended next practical walkthrough</p>
            </div>
            <StatusPill>63% complete</StatusPill>
          </div>
          <Link href="/lessons/x32-navigation" className="mt-5 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-violet-500/10 md:grid-cols-[160px_1fr_auto] md:items-center">
            <div className="rounded-xl border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(124,58,237,0.5),transparent_40%),linear-gradient(135deg,#111827,#030712)] p-4">
              <div className="h-16 rounded-lg border border-white/10 bg-black/50">
                <div className="mt-3 mx-3 h-2 rounded bg-blue-500" />
                <div className="mx-3 mt-2 grid grid-cols-5 gap-1">
                  {[1, 2, 3, 4, 5].map((item) => <span key={item} className="h-8 rounded bg-emerald-400/40" />)}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold">X32 Input Channel Deep Dive</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">Lesson 7 of 16 · Select channel, gain, HPF, EQ and sends.</p>
              <div className="mt-3 max-w-md"><ProgressBar value={63} /></div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-xl bg-violet-500/20 px-3 py-2 text-sm font-bold text-violet-100">Continue <ArrowRight size={16} /></span>
          </Link>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Up Next</h2>
            <Tag>{audioExamples.length} lab drills</Tag>
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-cyan-400/10 text-cyan-200"><Sparkles /></div>
              <div>
                <p className="font-bold">EQ for Vocals in Worship</p>
                <p className="text-sm text-[var(--muted)]">Estimated 28 min · includes harsh EQ lab</p>
              </div>
            </div>
            <Link href="/sound-lab" className="mt-4 inline-flex w-full justify-center rounded-xl bg-violet-500/25 px-3 py-2 text-sm font-bold text-white hover:bg-violet-500/35">Start Sound Lab</Link>
          </div>
        </SurfaceCard>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <SurfaceCard>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">System Health</h2>
            <StatusPill tone={readiness > 75 ? "success" : "warning"}>{readiness}% service ready</StatusPill>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {systemHealth.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold">{item.name}</p>
                  <CheckCircle2 size={17} className={item.status === "Warning" ? "text-amber-300" : "text-emerald-300"} />
                </div>
                <p className="mt-2 text-sm text-cyan-200">{item.status}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{item.detail}</p>
                <p className="mt-3 text-xs font-bold text-white">{item.metric}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Today’s Schedule</h2>
            <Link href="/service-logs" className="text-sm font-bold text-violet-200">View logs</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["9:00 AM", "Sound Team Run-Through", "Sanctuary"],
              ["10:30 AM", "Worship Service", "Live Stream"],
              ["12:00 PM", "Service Debrief", "Youth Room"]
            ].map(([time, title, place]) => (
              <div key={title} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <Clock size={17} className="mt-1 text-cyan-300" />
                <div>
                  <p className="text-sm font-bold">{time} · {title}</p>
                  <p className="text-xs text-[var(--muted)]">{place}</p>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SurfaceCard>
          <h2 className="text-xl font-bold">Recent Activity</h2>
          <div className="mt-4 grid gap-3">
            {activityFeed.map((item) => (
              <div key={item.title} className="flex gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <span className={`mt-1 h-3 w-3 rounded-full ${item.tone === "warning" ? "bg-amber-400" : item.tone === "success" ? "bg-emerald-400" : "bg-cyan-400"}`} />
                <div>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="text-xs leading-5 text-[var(--muted)]">{item.detail}</p>
                  <p className="mt-1 text-[11px] text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <h2 className="text-xl font-bold">Quick Faults</h2>
          <div className="mt-4 grid gap-3">
            {troubleshootingFlows.slice(0, 4).map((flow) => (
              <Link key={flow.slug} href={`/troubleshooting/${flow.slug}`} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-bold hover:bg-red-500/10">
                {flow.title}
                <p className="mt-1 text-xs font-normal text-[var(--muted)]">{flow.priority}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <h2 className="text-xl font-bold">Stream Output</h2>
          <div className="mt-4 grid gap-4">
            <Meter label="Input Meter" value={72} />
            <Meter label="Gain Reduction" value={36} />
            <Meter label="Output Meter" value={66} />
          </div>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-2 text-sm font-bold"><Radio size={16} className="text-emerald-300" /> Livestream bus stable</div>
            <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Last log: {serviceLogs[0]?.notes}</p>
          </div>
        </SurfaceCard>
      </section>
    </>
  );
}
