import Link from "next/link";
import { PageHeader, Tag } from "@/components/ui";
import { modules } from "@/lib/data";

const levels = ["Foundations", "Operator", "Engineer", "Senior Engineer", "Technical Director"];

export default function AcademyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Curriculum Levels"
        title="Learning Academy"
        description="Role-based progression for volunteers: safe basics, Sunday operation, engineering, mentoring and technical governance."
      />
      <div className="grid gap-6">
        {levels.map((level) => (
          <section key={level} className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-bold">{level}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {modules.filter((module) => module.level === level).map((module) => (
                <Link key={module.slug} href={`/academy/${module.slug}`} className="focus-ring rounded-md border border-[var(--line)] p-4 hover:border-teal-300 hover:bg-teal-50">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-semibold">{module.title}</h3>
                    <Tag>{module.duration}</Tag>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{module.summary}</p>
                  <p className="mt-3 text-xs font-semibold text-[var(--accent-strong)]">Certification: {module.certification}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
