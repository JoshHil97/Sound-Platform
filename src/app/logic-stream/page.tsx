import { PageHeader, Meter, StatusPill, SurfaceCard } from "@/components/ui";
import { logicPanels } from "@/lib/data";

export default function LogicStreamPage() {
  return (
    <>
      <PageHeader eyebrow="Livestream Mixing" title="Logic Stream training mode" description="Practical livestream workflow from Dante input to Logic template, Waves chains, loudness metering, translation checks and OBS handoff." />
      <section className="mb-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <SurfaceCard>
          <h2 className="text-xl font-bold">Logic-style mixer placeholder</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
            {["Speech", "Lead Vox", "Choir", "Worship", "Audience"].map((channel, index) => (
              <div key={channel} className="rounded-2xl border border-white/10 bg-black/35 p-3">
                <p className="text-xs font-bold text-cyan-200">{channel}</p>
                <div className="mt-3 h-28 rounded-lg bg-white/[0.04] p-2">
                  <div className="h-2 rounded bg-violet-400" />
                  <div className="mt-2 h-2 rounded bg-cyan-400/60" />
                  <div className="mt-2 h-2 rounded bg-emerald-400/60" />
                </div>
                <div className="mt-3 h-24 rounded-full bg-white/10 p-1"><div className="mx-auto w-3 rounded-full bg-emerald-400" style={{ height: `${50 + index * 8}%` }} /></div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-bold">Stream master</h2>
          <div className="mt-4 grid gap-4">
            <Meter label="Short-term loudness" value={62} />
            <Meter label="True peak safety" value={78} />
            <Meter label="Limiter gain reduction" value={34} />
          </div>
          <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-[var(--muted)]">A/B prompt: compare clean speech, over-bright speech and over-limited worship before touching the master chain.</p>
        </SurfaceCard>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {logicPanels.map((panel) => (
          <SurfaceCard key={panel.title}>
            <div className="flex items-start justify-between gap-3"><h2 className="text-lg font-bold">{panel.title}</h2><StatusPill>{panel.status}</StatusPill></div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{panel.summary}</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-300">{panel.checks.map((item) => <li key={item}>- {item}</li>)}</ul>
          </SurfaceCard>
        ))}
      </section>
    </>
  );
}
