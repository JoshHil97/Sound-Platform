import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { TroubleshootingRunner } from "@/components/troubleshooting-runner";
import { getTroubleshootingFlow } from "@/lib/data";

export default async function TroubleshootingFlowPage({ params }: { params: Promise<{ flowSlug: string }> }) {
  const { flowSlug } = await params;
  const flow = getTroubleshootingFlow(flowSlug);
  if (!flow) {
    notFound();
  }
  return (
    <>
      <PageHeader eyebrow="Live Workflow" title={flow.title} description="Use during rehearsal or service pressure. Make one change at a time and document the final cause." action={{ href: "/troubleshooting", label: "All Flows" }} />
      <TroubleshootingRunner flow={flow} />
    </>
  );
}
