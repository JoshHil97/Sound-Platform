import { InfoTile, PageHeader, SearchField, SectionHeader, SurfaceCard, Tag } from "@/components/ui";
import { equipment } from "@/lib/data";

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
      <SectionHeader title="System inventory" description="Every record should explain what normal looks like, what usually fails, and which live-service workflow depends on it." />
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
