import { PageHeader, StatCard } from "@/components/ui";
import { audioExamples, certifications, equipment, lessonGuides, lessons, modules, quizzes, sops, trainingVideos, troubleshootingFlows, users, visualSources } from "@/lib/data";

export default function AdminPage() {
  return (
    <>
      <PageHeader eyebrow="Content Management" title="Admin" description="MVP admin overview for curriculum, quizzes, practical assessments, equipment, SOPs, troubleshooting flows, certifications, incidents and user roles." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Users" value={String(users.length)} detail="Seeded trainees, operators, engineers, director and admin." />
        <StatCard label="Modules" value={String(modules.length)} detail="Curriculum-as-data across all five levels." />
        <StatCard label="Lessons" value={String(lessons.length)} detail="Structured lesson template with practical work." />
        <StatCard label="Quizzes" value={String(quizzes.length)} detail="Low-stakes knowledge checks." />
        <StatCard label="SOPs" value={String(sops.length)} detail="Versioned service procedures." />
        <StatCard label="Equipment" value={String(equipment.length)} detail="Knowledge base records." />
        <StatCard label="Troubleshooting" value={String(troubleshootingFlows.length)} detail="Interactive decision trees." />
        <StatCard label="Visuals" value={String(visualSources.length)} detail="Sourced references and capture backlog." />
        <StatCard label="Audio examples" value={String(audioExamples.length)} detail="Listening drills for gain, EQ, dynamics and stream faults." />
        <StatCard label="Lesson guides" value={String(lessonGuides.length)} detail="Board checks, listening targets and mentor prompts." />
        <StatCard label="Videos" value={String(trainingVideos.length)} detail="YouTube lesson source queue." />
        <StatCard label="Certifications" value={String(certifications.length)} detail="Evidence-oriented progress records." />
      </section>
      <section className="mt-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Admin build notes</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
          <p>Create/edit forms are the next layer over the Prisma models.</p>
          <p>Gate mentor sign-offs to Senior Engineer and above, certification approval to Technical Director/Admin, and content governance to Admin.</p>
          <p>Keep SOP, troubleshooting and equipment updates auditable because they affect live service operations.</p>
        </div>
      </section>
    </>
  );
}
