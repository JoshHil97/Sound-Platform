import { PageHeader, SearchField, StepCard, SurfaceCard, Tag } from "@/components/ui";
import { sops } from "@/lib/data";

export default function SOPPage() {
  return (
    <>
      <PageHeader eyebrow="Operating Manual" title="SOP Library" description="Repeatable service procedures for setup, sound check, line check, wireless, P16, Logic, Dante, shutdown, incidents and handover." />
      <div className="mb-5">
        <SearchField placeholder="Search SOPs by service, Dante, Logic, wireless, P16 or incident..." />
      </div>
      <div className="grid gap-4">
        {sops.map((sop) => (
          <SurfaceCard key={sop.slug}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{sop.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{sop.purpose}</p>
              </div>
              <div className="flex flex-wrap gap-2"><Tag>{sop.category}</Tag><Tag>{sop.ownerRole}</Tag><Tag>v{sop.version}</Tag></div>
            </div>
            <ol className="mt-4 grid gap-2">
              {sop.steps.map((step, index) => <StepCard key={step} index={index + 1}>{step}</StepCard>)}
            </ol>
          </SurfaceCard>
        ))}
      </div>
    </>
  );
}
