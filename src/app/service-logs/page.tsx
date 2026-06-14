import { PageHeader, SurfaceCard, Tag } from "@/components/ui";
import { serviceLogs } from "@/lib/data";

export default function ServiceLogsPage() {
  return (
    <>
      <PageHeader eyebrow="Operational Memory" title="Service Logs" description="Record observations, incidents, stream issues, handover notes and follow-up actions from real services and training labs." />
      <SurfaceCard>
        <h2 className="text-xl font-bold">Recent Logs</h2>
        <div className="mt-4 grid gap-3">
          {serviceLogs.map((log) => (
            <article key={`${log.date}-${log.type}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><h3 className="font-bold">{log.type}</h3><p className="mt-1 text-sm text-[var(--muted)]">{log.date} · Operator: {log.operator}</p></div>
                <Tag>{log.incidents} incidents</Tag>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{log.notes}</p>
            </article>
          ))}
        </div>
      </SurfaceCard>
    </>
  );
}
