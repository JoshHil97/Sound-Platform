import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InfoTile, PageHeader, SurfaceCard, Tag } from "@/components/ui";
import { digitalSignalPaths, signalPaths } from "@/lib/data";

export default function SignalFlowPage() {
  return (
    <>
      <PageHeader eyebrow="System Maps" title="Signal Flow" description="Church-specific paths for FOH, monitors and livestream, backed by the Digital Twin model." action={{ href: "/digital-twin", label: "Open Digital Twin" }} />
      <section className="mb-6 glass-panel rounded-3xl p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Digital Twin Paths</p>
            <h2 className="mt-1 text-2xl font-black">Validated church signal routes</h2>
          </div>
          <Tag>{digitalSignalPaths.length} mapped routes</Tag>
        </div>
        <div className="grid gap-3">
          {digitalSignalPaths.map((path) => (
            <article key={path.slug} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-black">{path.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{path.source}</p>
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
      </section>
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
