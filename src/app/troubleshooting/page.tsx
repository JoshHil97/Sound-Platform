import Link from "next/link";
import { PageHeader, Tag } from "@/components/ui";
import { troubleshootingFlows } from "@/lib/data";

export default function TroubleshootingPage() {
  return (
    <>
      <PageHeader eyebrow="Decision Trees" title="Troubleshooting Centre" description="Interactive symptom-based workflows for live services: test one thing, confirm evidence, recover calmly, and log what happened." />
      <div className="grid gap-4 md:grid-cols-2">
        {troubleshootingFlows.map((flow) => (
          <Link key={flow.slug} href={`/troubleshooting/${flow.slug}`} className="focus-ring rounded-md border border-[var(--line)] bg-white p-5 shadow-sm hover:border-amber-300 hover:bg-amber-50">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-xl font-bold">{flow.title}</h2>
              <Tag>{flow.priority}</Tag>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{flow.symptom}</p>
            <p className="mt-4 text-sm font-semibold">{flow.steps.length} checks</p>
          </Link>
        ))}
      </div>
    </>
  );
}
