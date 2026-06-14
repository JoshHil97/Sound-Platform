import Link from "next/link";
import { InfoTile, PageHeader, SearchField, SectionHeader, SurfaceCard, Tag } from "@/components/ui";
import { danteDevices, equipment, logicChannelStrips, p16Sources, x32InputChannels } from "@/lib/data";

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Knowledge Base"
        title="Equipment"
        description="Search-first records for the church system: location, purpose, I/O, connected devices, issues, SOPs, photo placeholders and notes."
      />
      <div className="mb-5">
        <SearchField placeholder="Search equipment by X32, Dante, Logic, Waves, P16, wireless, choir or network..." />
      </div>
      <SectionHeader title="System inventory" description="Digital Twin Coverage: every record should explain what normal looks like, what usually fails, and which live-service workflow depends on it." />
      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SurfaceCard>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Digital Twin</p>
          <h2 className="mt-2 text-2xl font-black">{x32InputChannels.length} X32 inputs</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Mapped X32 inputs, sources, P16 slots and common faults.</p>
          <Link href="/digital-twin" className="mt-4 inline-flex text-sm font-black text-violet-200">Open twin map</Link>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Dante</p>
          <h2 className="mt-2 text-2xl font-black">{danteDevices.length} devices</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Clock roles, sample rate and route health.</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">P16</p>
          <h2 className="mt-2 text-2xl font-black">{p16Sources.length} source slots</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Personal monitoring order and user notes.</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-300">Logic</p>
          <h2 className="mt-2 text-2xl font-black">{logicChannelStrips.length} strips</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Stream template channels and plugin intent.</p>
        </SurfaceCard>
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        {equipment.map((item) => (
          <SurfaceCard key={item.slug}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{item.model}</p>
              </div>
              <Tag>{item.category}</Tag>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.purpose}</p>
            <dl className="mt-4 grid gap-3 text-sm">
              <InfoTile label="Location" value={item.location} />
              <InfoTile label="Inputs" value={item.inputs} />
              <InfoTile label="Outputs" value={item.outputs} />
              <InfoTile label="Connected devices" value={item.connectedDevices} />
            </dl>
            <div className="mt-4 grid gap-2">
              <p className="text-sm font-semibold">Common issues</p>
              <div className="flex flex-wrap gap-2">
                {item.commonIssues.map((issue) => <Tag key={issue}>{issue}</Tag>)}
              </div>
            </div>
            <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[var(--muted)]">{item.notes}</p>
          </SurfaceCard>
        ))}
      </div>
    </>
  );
}
