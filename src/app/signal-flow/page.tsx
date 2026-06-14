import { InfoTile, PageHeader, SurfaceCard, Tag } from "@/components/ui";
import { signalPaths } from "@/lib/data";

export default function SignalFlowPage() {
  return (
    <>
      <PageHeader eyebrow="System Maps" title="Signal Flow" description="Church-specific paths for FOH, monitors and livestream. Future versions can add real diagrams, X32 screenshots and Dante maps." />
      <div className="grid gap-4">
        {signalPaths.map((path) => (
          <SurfaceCard key={path.title}>
            <div className="flex flex-wrap items-start justify-between gap-3"><h2 className="text-xl font-bold">{path.title}</h2><Tag>{path.destination}</Tag></div>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr_1fr]">
              <InfoTile label="Source" value={path.source} />
              <InfoTile label="Path" value={path.path} />
              <InfoTile label="Destination" value={path.destination} />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{path.notes}</p>
          </SurfaceCard>
        ))}
      </div>
    </>
  );
}
