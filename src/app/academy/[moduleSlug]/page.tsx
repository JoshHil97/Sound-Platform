import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, StepCard, SurfaceCard, Tag } from "@/components/ui";
import { PracticalWorkflowMiniCard } from "@/components/practical-training";
import { getAcademyForModule, getLessonsForModule, getModule, getPracticalWorkflowsForModule } from "@/lib/data";

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const academyModule = getModule(moduleSlug);
  if (!academyModule) {
    notFound();
  }
  const lessons = getLessonsForModule(academyModule.slug);
  const parentAcademy = getAcademyForModule(academyModule.slug);
  const practicalWorkflows = getPracticalWorkflowsForModule(academyModule.slug);

  return (
    <>
      <PageHeader
        eyebrow={parentAcademy?.title ?? academyModule.level}
        title={academyModule.title}
        description={academyModule.summary}
        action={{ href: parentAcademy ? `/academy/paths/${parentAcademy.slug}` : "/academy", label: parentAcademy ? "Back to Path" : "All Modules" }}
      />
      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <SurfaceCard className="lg:col-span-2">
          <h2 className="text-xl font-bold">Learning objectives</h2>
          <ul className="mt-3 grid gap-2">
            {academyModule.objectives.map((objective, index) => (
              <StepCard key={`${objective}-${index}`} index={index + 1}>{objective}</StepCard>
            ))}
          </ul>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-bold">Certification criteria</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{academyModule.certification}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{academyModule.duration}</Tag>
            <Tag>{lessons.length} lessons</Tag>
          </div>
        </SurfaceCard>
      </section>
      <SurfaceCard>
        <h2 className="text-xl font-bold">Lessons</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {lessons.map((lesson) => (
            <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="focus-ring rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:border-cyan-300/30 hover:bg-cyan-300/10">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{lesson.title}</h3>
                <Tag>{lesson.difficulty}</Tag>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{lesson.summary}</p>
              <p className="mt-3 text-xs font-semibold">{lesson.durationMinutes} min</p>
            </Link>
          ))}
        </div>
      </SurfaceCard>
      {practicalWorkflows.length ? (
        <section className="mt-6">
          <div className="mb-4">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Practical Training Systems</p>
            <h2 className="mt-1 text-2xl font-black">Operator drills in this module</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {practicalWorkflows.map((workflow) => (
              <PracticalWorkflowMiniCard key={workflow.slug} workflow={workflow} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
