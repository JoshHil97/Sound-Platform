import Image from "next/image";
import { PageHeader, Meter, StatusPill, SurfaceCard } from "@/components/ui";
import { PracticalWorkflowMiniCard } from "@/components/practical-training";
import { logicPanels, logicTemplateSnapshot, practicalTrainingWorkflows } from "@/lib/data";

export default function LogicStreamPage() {
  const workflows = practicalTrainingWorkflows.filter((workflow) => workflow.domain === "Logic" || workflow.domain === "Waves");

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

      <section className="mb-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <SurfaceCard className="overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Church-Owned Source Capture</p>
              <h2 className="mt-1 text-2xl font-black">{logicTemplateSnapshot.name}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Imported from the attached Logic template metadata and mixer screenshot. This is the visual anchor for real livestream template walkthroughs.
              </p>
            </div>
            <StatusPill tone="success">Source-backed</StatusPill>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
            <Image src={logicTemplateSnapshot.screenshotSrc} alt="Logic Pro NLS Broadcast Template mixer capture" width={1913} height={605} className="h-auto w-full" priority />
          </div>
          <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[var(--muted)]">Sample rate</p><p className="mt-1 font-black">{logicTemplateSnapshot.sampleRate}</p></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[var(--muted)]">Tracks</p><p className="mt-1 font-black">{logicTemplateSnapshot.trackCount}</p></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[var(--muted)]">Tempo</p><p className="mt-1 font-black">{logicTemplateSnapshot.tempo}</p></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[var(--muted)]">Key</p><p className="mt-1 font-black">{logicTemplateSnapshot.key}</p></div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <h2 className="text-xl font-bold">Observed template patterns</h2>
          <div className="mt-4 grid gap-3">
            {logicTemplateSnapshot.observedChannelStrips.map((strip) => (
              <article key={strip.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{strip.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">{strip.input} to {strip.output}</p>
                  </div>
                  <StatusPill>{strip.confidence}</StatusPill>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {strip.plugins.map((plugin) => <span key={plugin} className="rounded-lg bg-violet-500/15 px-2 py-1 text-xs font-bold text-violet-100">{plugin}</span>)}
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">Sends: {strip.sends.join(", ")}</p>
              </article>
            ))}
          </div>
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
      <section className="mt-6">
        <div className="mb-4">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Practical Drills</p>
          <h2 className="mt-1 text-2xl font-black">Livestream tasks to practice</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {workflows.map((workflow) => <PracticalWorkflowMiniCard key={workflow.slug} workflow={workflow} />)}
        </div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <SurfaceCard>
          <h2 className="text-xl font-bold">Template teaching notes</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300">{logicTemplateSnapshot.trainingNotes.map((note) => <li key={note}>- {note}</li>)}</ul>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-bold">Review before certification</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-[var(--muted)]">{logicTemplateSnapshot.reviewNotes.map((note) => <li key={note}>- {note}</li>)}</ul>
        </SurfaceCard>
      </section>
    </>
  );
}
