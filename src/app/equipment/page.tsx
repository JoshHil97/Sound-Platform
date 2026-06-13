import { PageHeader, Tag } from "@/components/ui";
import { equipment } from "@/lib/data";

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Knowledge Base"
        title="Equipment"
        description="Search-first records for the church system: location, purpose, I/O, connected devices, issues, SOPs, photo placeholders and notes."
      />
      <div className="mb-4">
        <input className="focus-ring w-full rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm shadow-sm" placeholder="Search equipment by X32, Dante, Logic, Waves, P16, wireless, choir or network..." />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {equipment.map((item) => (
          <article key={item.slug} className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{item.model}</p>
              </div>
              <Tag>{item.category}</Tag>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.purpose}</p>
            <dl className="mt-4 grid gap-3 text-sm">
              <Info label="Location" value={item.location} />
              <Info label="Inputs" value={item.inputs} />
              <Info label="Outputs" value={item.outputs} />
              <Info label="Connected devices" value={item.connectedDevices} />
            </dl>
            <div className="mt-4 grid gap-2">
              <p className="text-sm font-semibold">Common issues</p>
              <div className="flex flex-wrap gap-2">
                {item.commonIssues.map((issue) => <Tag key={issue}>{issue}</Tag>)}
              </div>
            </div>
            <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm leading-6 text-[var(--muted)]">{item.notes}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <dt className="font-semibold">{label}</dt>
      <dd className="mt-1 text-[var(--muted)]">{value}</dd>
    </div>
  );
}
