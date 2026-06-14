import Image from "next/image";
import { PageHeader, Meter, StatusPill, SurfaceCard } from "@/components/ui";
import { PracticalWorkflowMiniCard } from "@/components/practical-training";
import { practicalTrainingWorkflows, x32InputChannels, x32Panels, x32SceneSnapshot } from "@/lib/data";
import { referenceLookAssets, vbciLogicTrainingAssets } from "@/lib/training-assets";

export default function X32ConsolePage() {
  const workflows = practicalTrainingWorkflows.filter((workflow) => workflow.domain === "X32" || workflow.domain === "P16");
  const featuredChannel = x32InputChannels[2] ?? x32InputChannels[0];
  const x32Reference = referenceLookAssets.find((asset) => asset.slug === "reference-x32-orientation");
  const livestreamDiagram = vbciLogicTrainingAssets.find((asset) => asset.slug === "x32-livestream-diagram");

  return (
    <>
      <PageHeader eyebrow="Virtual Console Training" title="X32 Console training mode" description="Training from the digital twin: practice repeatable operator jobs using the real channel map for patch, name, gain, shape, route, monitor, scene-safe operation and livestream handoff." />
      <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.72fr]">
        {x32Reference ? (
          <SurfaceCard className="overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Target Lesson Look</p>
                <h2 className="mt-1 text-2xl font-black">X32 orientation board</h2>
              </div>
              <StatusPill>Reference</StatusPill>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image src={x32Reference.src} alt={x32Reference.title} width={x32Reference.width} height={x32Reference.height} className="h-auto w-full" priority />
            </div>
          </SurfaceCard>
        ) : null}
        {livestreamDiagram ? (
          <SurfaceCard className="overflow-hidden">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Scene Diagram Asset</p>
            <h2 className="mt-1 text-2xl font-black">{livestreamDiagram.title}</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white">
              <Image src={livestreamDiagram.src} alt={livestreamDiagram.title} width={livestreamDiagram.width} height={livestreamDiagram.height} className="h-auto w-full" />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{livestreamDiagram.purpose}</p>
          </SurfaceCard>
        ) : null}
      </section>
      <section className="mb-6 glass-panel rounded-3xl p-5">
        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-white/10 bg-black/35 p-5">
            <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-4">
              <div className="mb-4 flex justify-between text-xs text-slate-400"><span>CH {featuredChannel.number.toString().padStart(2, "0")} {featuredChannel.name.toUpperCase()}</span><span>{featuredChannel.stageInput} · {featuredChannel.streamBus} · {featuredChannel.dca}</span></div>
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
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm font-black text-cyan-200">Digital Twin normal state</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{featuredChannel.normalState}</p>
            </div>
          </SurfaceCard>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {x32Panels.map((panel) => <TrainingCard key={panel.title} panel={panel} />)}
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Imported X32 Scene</p>
              <h2 className="mt-1 text-2xl font-black">{x32SceneSnapshot.sceneName}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">This snapshot is extracted from the attached .scn file and should become the source for console drills, routing questions and P16 walkthroughs after senior review.</p>
            </div>
            <StatusPill tone="success">Confirmed from scene</StatusPill>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {x32SceneSnapshot.routing.map((route) => (
              <div key={route} className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-slate-200">{route}</div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <h2 className="text-xl font-bold">DCAs and service control</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {x32SceneSnapshot.dcas.map((dca) => <span key={dca} className="rounded-xl border border-violet-300/20 bg-violet-500/15 px-3 py-2 text-sm font-bold text-violet-100">{dca}</span>)}
          </div>
          <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">Matrices</h3>
          <div className="mt-3 grid gap-2">
            {x32SceneSnapshot.matrices.map((matrix) => <p key={matrix} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-200">{matrix}</p>)}
          </div>
        </SurfaceCard>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <SurfaceCard>
          <h2 className="text-xl font-bold">Real channel examples for drills</h2>
          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[860px] rounded-2xl border border-white/10">
              <div className="grid grid-cols-[64px_1fr_0.9fr_0.8fr_0.8fr_1.4fr] border-b border-white/10 bg-white/[0.04] text-xs font-black uppercase tracking-[0.12em] text-[var(--muted)]">
                {["CH", "Name", "Group", "Gain", "Main", "Key Sends"].map((header) => <span key={header} className="p-3">{header}</span>)}
              </div>
              {x32SceneSnapshot.channels.map((channel) => (
                <div key={channel.number} className="grid grid-cols-[64px_1fr_0.9fr_0.8fr_0.8fr_1.4fr] border-b border-white/10 text-sm last:border-0">
                  <span className="p-3 font-mono text-cyan-200">{channel.number}</span>
                  <span className="p-3 font-bold">{channel.name}</span>
                  <span className="p-3 text-slate-300">{channel.sourceGroup}</span>
                  <span className="p-3 text-slate-300">{channel.preampGain}</span>
                  <span className="p-3 text-slate-300">{channel.mainLevel}</span>
                  <span className="p-3 text-[var(--muted)]">{channel.keySends.join("; ")}</span>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <h2 className="text-xl font-bold">Scene teaching notes</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-300">{x32SceneSnapshot.trainingNotes.map((note) => <li key={note}>- {note}</li>)}</ul>
          <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-amber-300">Needs review</h3>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">{x32SceneSnapshot.reviewNotes.map((note) => <li key={note}>- {note}</li>)}</ul>
        </SurfaceCard>
      </section>

      <section className="mt-6">
        <div className="mb-4">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Practical Drills</p>
          <h2 className="mt-1 text-2xl font-black">Console tasks to practice</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {workflows.map((workflow) => <PracticalWorkflowMiniCard key={workflow.slug} workflow={workflow} />)}
        </div>
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
