import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader, StatCard, Tag } from "@/components/ui";
import { visualSources } from "@/lib/data";

const categories = Array.from(new Set(visualSources.map((source) => source.category)));
const rightsCounts = visualSources.reduce<Record<string, number>>((counts, source) => {
  counts[source.rights] = (counts[source.rights] ?? 0) + 1;
  return counts;
}, {});

export default function VisualsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sourced Media"
        title="Visual source registry"
        description="A working catalog for official references, church-owned captures and original diagrams needed across X32, Dante, Logic, Waves, monitoring and live-service training."
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Visual sources" value={String(visualSources.length)} detail="Seeded references and production placeholders." />
        <StatCard label="Official references" value={String(rightsCounts["Official vendor reference"] ?? 0)} detail="Vendor and support pages for accurate UI/equipment examples." />
        <StatCard label="Church captures needed" value={String(rightsCounts["Church-owned required"] ?? 0)} detail="Exact room, rack, mic and software screenshots to capture." />
        <StatCard label="Original diagrams" value={String(rightsCounts["Create original diagram"] ?? 0)} detail="Signal flow and chain diagrams to draw from church workflows." />
      </section>

      <section className="mb-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Sourcing standard</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)] md:grid-cols-3">
          <p>Official vendor references are used for accurate product, plugin and software UI orientation.</p>
          <p>Church-owned captures are required anywhere the visual must match your actual X32 scene, Logic template, OBS setup, patching, room or equipment placement.</p>
          <p>Original diagrams should explain your approved signal paths and decision points without copying vendor artwork.</p>
        </div>
      </section>

      <div className="grid gap-6">
        {categories.map((category) => (
          <section key={category}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">{category}</h2>
              <Tag>{visualSources.filter((source) => source.category === category).length} items</Tag>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {visualSources.filter((source) => source.category === category).map((source) => (
                <article key={source.slug} className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{source.title}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{source.sourceName}</p>
                    </div>
                    <Tag>{source.rights}</Tag>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{source.trainingUse}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {source.linkedTopics.map((topic) => (
                      <span key={topic} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{topic}</span>
                    ))}
                  </div>
                  <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm leading-6 text-[var(--muted)]">{source.notes}</p>
                  <Link href={source.sourceUrl} className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-teal-50">
                    Open source
                    <ExternalLink size={16} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
