import Link from "next/link";
import { ArrowRight, CheckCircle2, GitBranch, MonitorCog, Network, RadioTower, Rows3, SlidersHorizontal, Wifi } from "lucide-react";
import {
  danteDevices,
  danteSubscriptions,
  digitalSignalPaths,
  logicTemplateSnapshot,
  logicChannelStrips,
  p16Sources,
  stageZones,
  wirelessAssignments,
  x32Buses,
  x32InputChannels,
  x32SceneSnapshot
} from "@/lib/data";
import { InfoTile, MetricCard, PageHeader, StatusPill, SurfaceCard, Tag } from "@/components/ui";

export default function DigitalTwinPage() {
  const healthyDante = danteDevices.filter((device) => device.status === "Healthy").length;

  return (
    <>
      <PageHeader
        eyebrow="Phase 8"
        title="Digital Twin"
        description="A living model of the church production system: X32 inputs, buses, Dante subscriptions, Logic stream channels, P16 source order, wireless assignments, stage zones and signal paths."
        action={{ href: "/signal-flow", label: "Open Signal Flow" }}
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="X32 inputs" value={x32InputChannels.length} detail="Named church sources with stage inputs, P16 slots and common faults." />
        <MetricCard label="Imported scene" value={x32SceneSnapshot.channels.length} detail={`${x32SceneSnapshot.sceneName} channels summarized from .scn.`} />
        <MetricCard label="Dante devices" value={`${healthyDante}/${danteDevices.length}`} detail="Device health, clock role and sample-rate model." />
        <MetricCard label="Logic template" value={logicTemplateSnapshot.trackCount} detail={`${logicTemplateSnapshot.sampleRate}, ${logicTemplateSnapshot.tempo}, ${logicTemplateSnapshot.key}.`} />
      </section>

      <section className="mb-6 glass-panel overflow-hidden rounded-3xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">System Overview</p>
            <h2 className="mt-1 text-3xl font-black">Source to room, stream and monitor</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">The twin is the shared reference for lessons, troubleshooting and service mode. When the real church patch changes, this is the model that should change first.</p>
          </div>
          <StatusPill tone="success">Seed model active</StatusPill>
        </div>
        <div className="mt-6 overflow-x-auto">
          <div className="flex min-w-[900px] items-center gap-3">
            {[
              ["Stage Sources", "Mics, DI, playback"],
              ["X32 Console", "Inputs, buses, DCAs"],
              ["Dante", "X32 card to DVS"],
              ["Logic Pro", "Template and plugins"],
              ["OBS / Stream", "Online audience"],
              ["P16 / Monitors", "Stage monitoring"]
            ].map(([title, detail], index) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-36 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="font-black">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{detail}</p>
                </div>
                {index < 5 ? <ArrowRight className="shrink-0 text-cyan-300" size={18} /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <MonitorCog className="text-violet-300" />
            <h2 className="text-xl font-black">Source Import Status</h2>
          </div>
          <div className="grid gap-3">
            <article className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black">{x32SceneSnapshot.sceneName}</h3>
                  <p className="mt-1 text-sm text-emerald-100">Routing, DCAs, buses and selected channel sends extracted from the attached X32 scene file.</p>
                </div>
                <StatusPill tone="success">Scene parsed</StatusPill>
              </div>
            </article>
            <article className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black">{logicTemplateSnapshot.name}</h3>
                  <p className="mt-1 text-sm text-cyan-100">Metadata, screenshot and visible mixer labels imported for Logic/Waves livestream training.</p>
                </div>
                <StatusPill tone="success">Capture added</StatusPill>
              </div>
            </article>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <h2 className="text-xl font-black">Real service routing checkpoints</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {x32SceneSnapshot.buses.slice(0, 8).map((bus) => (
              <article key={bus.number} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm text-cyan-200">Bus {bus.number}</p>
                    <h3 className="mt-1 font-black">{bus.name || "Unnamed"}</h3>
                  </div>
                  <Tag>{bus.purpose}</Tag>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">Level {bus.mixLevel} · Pan {bus.pan}</p>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <GitBranch className="text-cyan-300" />
            <h2 className="text-xl font-black">Critical Signal Paths</h2>
          </div>
          <div className="grid gap-3">
            {digitalSignalPaths.map((path) => (
              <article key={path.slug} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{path.title}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">Source: {path.source}</p>
                  </div>
                  <Tag>{path.destinations.join(", ")}</Tag>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {path.checkpoints.map((checkpoint, index) => (
                    <span key={`${path.slug}-${checkpoint}`} className="inline-flex items-center gap-2">
                      <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-200">{checkpoint}</span>
                      {index < path.checkpoints.length - 1 ? <ArrowRight size={14} className="text-slate-500" /> : null}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {path.relatedLessons.map((lesson) => <Link key={lesson} href={`/lessons/${lesson}`}><Tag>{lesson.replaceAll("-", " ")}</Tag></Link>)}
                  {path.relatedTroubleshooting.map((flow) => <Link key={flow} href={`/troubleshooting/${flow}`}><Tag>{flow.replaceAll("-", " ")}</Tag></Link>)}
                </div>
              </article>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <Network className="text-violet-300" />
            <h2 className="text-xl font-black">Dante Devices</h2>
          </div>
          <div className="grid gap-3">
            {danteDevices.map((device) => (
              <article key={device.slug} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{device.name}</h3>
                    <p className="text-xs text-violet-200">{device.type}</p>
                  </div>
                  <StatusPill tone={device.status === "Healthy" ? "success" : device.status === "Warning" ? "warning" : "danger"}>{device.status}</StatusPill>
                </div>
                <dl className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                  <InfoTile label="Sample rate" value={device.sampleRate} />
                  <InfoTile label="Clock" value={device.clockRole} />
                </dl>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal className="text-cyan-300" />
            <h2 className="text-xl font-black">X32 Input Channels</h2>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[860px] rounded-2xl border border-white/10">
              <div className="grid grid-cols-[64px_1.2fr_1fr_1fr_80px_1fr] border-b border-white/10 bg-white/[0.04] text-xs font-black uppercase tracking-[0.12em] text-[var(--muted)]">
                {["CH", "Name", "Source", "Stage input", "P16", "Normal"].map((header) => <span key={header} className="p-3">{header}</span>)}
              </div>
              {x32InputChannels.map((channel) => (
                <div key={channel.number} className="grid grid-cols-[64px_1.2fr_1fr_1fr_80px_1fr] border-b border-white/10 text-sm last:border-0">
                  <span className="p-3 font-mono text-cyan-200">{channel.number}</span>
                  <span className="p-3 font-bold">{channel.name}</span>
                  <span className="p-3 text-slate-300">{channel.source}</span>
                  <span className="p-3 text-slate-300">{channel.stageInput}</span>
                  <span className="p-3 text-slate-300">{channel.p16Slot ?? "-"}</span>
                  <span className="p-3 text-[var(--muted)]">{channel.normalState}</span>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <Rows3 className="text-amber-300" />
            <h2 className="text-xl font-black">X32 Buses</h2>
          </div>
          <div className="grid gap-3">
            {x32Buses.map((bus) => (
              <article key={`${bus.number}-${bus.name}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm text-amber-200">Bus {bus.number}</p>
                    <h3 className="mt-1 font-black">{bus.name}</h3>
                  </div>
                  <Tag>{bus.purpose}</Tag>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{bus.tapPoint} to {bus.destination}</p>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="mb-6 grid gap-4 xl:grid-cols-3">
        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <MonitorCog className="text-violet-300" />
            <h2 className="text-xl font-black">Logic Stream Template</h2>
          </div>
          <div className="grid gap-3">
            {logicChannelStrips.map((strip) => (
              <article key={strip.name} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-black">{strip.name}</h3>
                  <Tag>{strip.input}</Tag>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{strip.target}</p>
                <div className="mt-2 flex flex-wrap gap-1">{strip.plugins.map((plugin) => <span key={plugin} className="rounded-lg bg-violet-500/15 px-2 py-1 text-[11px] font-bold text-violet-100">{plugin}</span>)}</div>
              </article>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <Wifi className="text-cyan-300" />
            <h2 className="text-xl font-black">Dante Subscriptions</h2>
          </div>
          <div className="grid gap-3">
            {danteSubscriptions.map((subscription) => (
              <article key={`${subscription.transmitChannel}-${subscription.receiveChannel}`} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black">{subscription.transmitChannel}</p>
                  <StatusPill tone={subscription.status === "Subscribed" ? "success" : subscription.status === "Warning" ? "warning" : "danger"}>{subscription.status}</StatusPill>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{subscription.transmitDevice} → {subscription.receiveDevice} · {subscription.receiveChannel}</p>
              </article>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="mb-4 flex items-center gap-2">
            <RadioTower className="text-emerald-300" />
            <h2 className="text-xl font-black">P16 Source Order</h2>
          </div>
          <div className="grid gap-2">
            {p16Sources.map((source) => (
              <div key={source.slot} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/15 font-mono text-sm text-emerald-100">{source.slot}</span>
                <div>
                  <p className="font-black">{source.label}</p>
                  <p className="text-xs text-[var(--muted)]">{source.x32Source} · {source.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <SurfaceCard>
          <h2 className="text-xl font-black">Stage Zones</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {stageZones.map((zone) => (
              <article key={zone.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <h3 className="font-black">{zone.name}</h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Sources</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{zone.sources.join(", ")}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Risks</p>
                <div className="mt-2 flex flex-wrap gap-2">{zone.risks.map((risk) => <Tag key={risk}>{risk}</Tag>)}</div>
              </article>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-black">Wireless Assignments</h2>
          <div className="mt-4 grid gap-3">
            {wirelessAssignments.map((assignment) => (
              <article key={assignment.pack} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-black">{assignment.assignedTo}</h3>
                  <Tag>{assignment.channel}</Tag>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{assignment.pack} · {assignment.batteryPolicy}</p>
                <div className="mt-3 rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-50">
                  <strong>Backup:</strong> {assignment.backupPlan}
                </div>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="mt-6 glass-panel rounded-3xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Digital Twin Governance</p>
            <h2 className="mt-1 text-2xl font-black">Update this before training content changes</h2>
          </div>
          <CheckCircle2 className="text-emerald-300" />
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Future admin tools should edit this model directly, then lessons, troubleshooting flows, Service Mode and equipment records should reflect the approved system state.</p>
      </section>
    </>
  );
}
