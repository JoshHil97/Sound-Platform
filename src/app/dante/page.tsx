import { PageHeader, StatusPill, SurfaceCard } from "@/components/ui";
import { PracticalWorkflowMiniCard } from "@/components/practical-training";
import { dantePanels, practicalTrainingWorkflows } from "@/lib/data";

export default function DantePage() {
  const devices = ["X32-DANTE", "STREAM-MAC-DVS", "LOGIC-MIX", "RECORDING-MAC"];
  const workflows = practicalTrainingWorkflows.filter((workflow) => workflow.domain === "Dante" || workflow.slug === "dante-logic-signal-drill");

  return (
    <>
      <PageHeader eyebrow="Network Audio Simulator" title="Dante training mode" description="Learn device discovery, routing subscriptions, clocking, sample rate, latency, DVS and service-day Dante fault isolation." />
      <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_360px]">
        <SurfaceCard>
          <h2 className="text-xl font-bold">Routing matrix mock</h2>
          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[620px] rounded-2xl border border-white/10">
              <div className="grid grid-cols-5 border-b border-white/10 bg-white/[0.04] text-xs font-bold text-slate-300">
                <span className="p-3">Transmit / Receive</span>
                {devices.map((d) => <span key={d} className="p-3">{d}</span>)}
              </div>
              {["Lead Vocal", "Speech", "Choir L", "Choir R", "Stream Bus"].map((source, row) => (
                <div key={source} className="grid grid-cols-5 border-b border-white/10 text-sm last:border-0">
                  <span className="p-3 font-bold">{source}</span>
                  {devices.map((device, col) => <span key={device} className="p-3">{(row + col) % 3 === 0 ? <StatusPill tone="success">subscribed</StatusPill> : <span className="text-slate-600">empty</span>}</span>)}
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-bold">Clock and sample rate</h2>
          <div className="mt-4 grid gap-3">
            <StatusPill tone="success">Clock leader stable</StatusPill>
            <StatusPill tone="success">48 kHz aligned</StatusPill>
            <StatusPill>DVS on Ethernet</StatusPill>
            <StatusPill tone="warning">Latency watch enabled</StatusPill>
          </div>
        </SurfaceCard>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dantePanels.map((panel) => (
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
          <h2 className="mt-1 text-2xl font-black">Network audio tasks to practice</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {workflows.map((workflow) => <PracticalWorkflowMiniCard key={workflow.slug} workflow={workflow} />)}
        </div>
      </section>
    </>
  );
}
