import Link from "next/link";
import { AlertTriangle, CheckCircle2, Phone, Radio } from "lucide-react";
import { serviceChecklist, troubleshootingFlows } from "@/lib/data";
import { ProgressRing, StatusPill, SurfaceCard } from "@/components/ui";

export default function ServiceModePage() {
  const done = serviceChecklist.filter((item) => item.status === "Done").length;
  const readiness = Math.round((done / serviceChecklist.length) * 100);

  return (
    <div className="mx-auto max-w-5xl">
      <section className="glass-panel overflow-hidden rounded-[2rem] p-5 md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Sunday Service Mode</p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">I am serving today</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Large-touch checklist, quick fault access and escalation prompts for one-handed service-day operation.</p>
          </div>
          <ProgressRing value={readiness} label="Ready" />
        </div>
        <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-200"><CheckCircle2 size={18} /> {done} of {serviceChecklist.length} systems confirmed</div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${readiness}%` }} /></div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-3">
          {serviceChecklist.map((item, index) => (
            <div key={item.title} className="glass-panel flex items-center gap-4 rounded-2xl p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-sm font-black">{index + 1}</div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold">{item.title}</h2>
                  <StatusPill tone={item.status === "Done" ? "success" : item.status === "Due" ? "warning" : "info"}>{item.status}</StatusPill>
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.detail}</p>
              </div>
              {item.status === "Done" ? <CheckCircle2 className="text-emerald-300" /> : <AlertTriangle className="text-amber-300" />}
            </div>
          ))}
        </div>

        <aside className="grid h-max gap-4">
          <SurfaceCard>
            <h2 className="text-xl font-bold">Quick faults</h2>
            <div className="mt-4 grid gap-2">
              {troubleshootingFlows.slice(0, 4).map((flow) => (
                <Link key={flow.slug} href={`/troubleshooting/${flow.slug}`} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-bold hover:bg-red-500/10">{flow.title}</Link>
              ))}
            </div>
          </SurfaceCard>
          <SurfaceCard>
            <h2 className="text-xl font-bold">Escalation</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Senior Engineer on call: placeholder contact. Log any routing, Dante, Logic or wireless changes after service.</p>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-bold text-white"><Phone size={16} /> Message mentor</button>
          </SurfaceCard>
          <SurfaceCard>
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-200"><Radio size={16} /> Offline-ready structure</div>
            <p className="mt-2 text-sm text-[var(--muted)]">Next pass: cache today’s checklist, key SOPs and emergency troubleshooting trees for patchy connectivity.</p>
          </SurfaceCard>
        </aside>
      </section>
    </div>
  );
}
