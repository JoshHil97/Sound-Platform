import { PageHeader, Tag } from "@/components/ui";
import { signalPaths } from "@/lib/data";

export default function SignalFlowPage() {
  return (
    <>
      <PageHeader eyebrow="System Maps" title="Signal Flow" description="Church-specific paths for FOH, monitors and livestream. Future versions can add real diagrams, X32 screenshots and Dante maps." />
      <div className="grid gap-4">
        {signalPaths.map((path) => (
          <article key={path.title} className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3"><h2 className="text-xl font-bold">{path.title}</h2><Tag>{path.destination}</Tag></div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr_1fr]">
              <FlowBox label="Source" value={path.source} />
              <FlowBox label="Path" value={path.path} />
              <FlowBox label="Destination" value={path.destination} />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{path.notes}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function FlowBox({ label, value }: { label: string; value: string }) {
  return <div className="rounded-md border border-teal-100 bg-teal-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-teal-800">{label}</p><p className="mt-2 text-sm leading-6 text-slate-700">{value}</p></div>;
}
