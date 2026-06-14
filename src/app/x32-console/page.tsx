import { PageHeader, Meter, StatusPill, SurfaceCard } from "@/components/ui";
import { x32Panels } from "@/lib/data";

export default function X32ConsolePage() {
  return (
    <>
      <PageHeader eyebrow="Virtual Console Training" title="X32 Console training mode" description="Practice repeatable operator jobs: patch, name, gain, shape, route, monitor, scene-safe operation and livestream handoff." />
      <section className="mb-6 glass-panel rounded-3xl p-5">
        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-white/10 bg-black/35 p-5">
            <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4">
              <div className="mb-4 flex justify-between text-xs text-slate-400"><span>CH 01 LEAD VOCAL</span><span>Input 01 · Main LR · Bus 5</span></div>
              <div className="grid gap-4 md:grid-cols-[1fr_90px]">
                <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <div className="h-28 rounded-lg bg-[radial-gradient(circle_at_40%_35%,rgba(34,211,238,0.22),transparent_40%),linear-gradient(135deg,#111827,#020617)]" />
                  <div className="mt-4 grid grid-cols-6 gap-2">{["HPF", "Gate", "Dyn", "EQ", "Send", "Main"].map((item) => <button key={item} className="rounded-lg bg-violet-500/20 py-2 text-xs font-bold">{item}</button>)}</div>
                </div>
                <div className="flex items-end gap-1 rounded-xl border border-white/10 bg-black/35 p-3">{Array.from({ length: 6 }).map((_, i) => <span key={i} className="w-full rounded-t bg-emerald-400" style={{ height: `${30 + i * 10}%` }} />)}</div>
              </div>
            </div>
          </div>
          <SurfaceCard>
            <h2 className="text-xl font-bold">What to check first</h2>
            <div className="mt-4 grid gap-4">
              <Meter label="Input gain" value={72} />
              <Meter label="Bus send" value={58} />
              <Meter label="Main LR" value={64} />
            </div>
          </SurfaceCard>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {x32Panels.map((panel) => <TrainingCard key={panel.title} panel={panel} />)}
      </section>
    </>
  );
}

function TrainingCard({ panel }: { panel: (typeof x32Panels)[number] }) {
  return (
    <SurfaceCard>
      <div className="flex items-start justify-between gap-3"><h2 className="text-lg font-bold">{panel.title}</h2><StatusPill>{panel.status}</StatusPill></div>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{panel.summary}</p>
      <h3 className="mt-4 text-sm font-bold text-cyan-200">Checks</h3>
      <ul className="mt-2 grid gap-1 text-sm text-[var(--muted)]">{panel.checks.map((item) => <li key={item}>- {item}</li>)}</ul>
      <h3 className="mt-4 text-sm font-bold text-amber-200">Common mistakes</h3>
      <ul className="mt-2 grid gap-1 text-sm text-[var(--muted)]">{panel.mistakes.map((item) => <li key={item}>- {item}</li>)}</ul>
    </SurfaceCard>
  );
}
