import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Tag } from "@/components/ui";
import { getLessonsForModule, getModule } from "@/lib/data";

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const academyModule = getModule(moduleSlug);
  if (!academyModule) {
    notFound();
  }
  const lessons = getLessonsForModule(academyModule.slug);

  return (
    <>
      <PageHeader eyebrow={academyModule.level} title={academyModule.title} description={academyModule.summary} action={{ href: "/academy", label: "All Modules" }} />
      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold">Learning objectives</h2>
          <ul className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
            {academyModule.objectives.map((objective) => (
              <li key={objective} className="rounded-md bg-slate-50 p-3">{objective}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Certification criteria</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{academyModule.certification}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{academyModule.duration}</Tag>
            <Tag>{lessons.length} lessons</Tag>
          </div>
        </article>
      </section>
      <section className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Lessons</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {lessons.map((lesson) => (
            <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="focus-ring rounded-md border border-[var(--line)] p-4 hover:border-teal-300 hover:bg-teal-50">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{lesson.title}</h3>
                <Tag>{lesson.difficulty}</Tag>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{lesson.summary}</p>
              <p className="mt-3 text-xs font-semibold">{lesson.durationMinutes} min</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
