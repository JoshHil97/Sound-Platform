import { PageHeader, Tag } from "@/components/ui";
import { sops } from "@/lib/data";

export default function SOPPage() {
  return (
    <>
      <PageHeader eyebrow="Operating Manual" title="SOP Library" description="Repeatable service procedures for setup, sound check, line check, wireless, P16, Logic, Dante, shutdown, incidents and handover." />
      <div className="mb-4">
        <input className="focus-ring w-full rounded-md border border-[var(--line)] bg-white px-4 py-3 text-sm shadow-sm" placeholder="Search SOPs by service, Dante, Logic, wireless, P16 or incident..." />
      </div>
      <div className="grid gap-4">
        {sops.map((sop) => (
          <article key={sop.slug} className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{sop.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{sop.purpose}</p>
              </div>
              <div className="flex flex-wrap gap-2"><Tag>{sop.category}</Tag><Tag>{sop.ownerRole}</Tag><Tag>v{sop.version}</Tag></div>
            </div>
            <ol className="mt-4 grid gap-2 text-sm">
              {sop.steps.map((step, index) => <li key={step} className="rounded-md bg-slate-50 p-3">{index + 1}. {step}</li>)}
            </ol>
          </article>
        ))}
      </div>
    </>
  );
}
