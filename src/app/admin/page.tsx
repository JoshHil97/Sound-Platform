import { MetricCard, PageHeader, SectionHeader, SurfaceCard } from "@/components/ui";
import { academies, audioExamples, certificationDefinitions, certifications, competencies, curriculumAssessments, equipment, evidenceRecords, lessonGuides, lessons, modules, practicalExercises, progressionRules, quizzes, skillTrees, skills, sops, trainingVideos, troubleshootingFlows, users, visualSources } from "@/lib/data";

export default function AdminPage() {
  return (
    <>
      <PageHeader eyebrow="Content Management" title="Admin" description="MVP admin overview for curriculum, quizzes, practical assessments, equipment, SOPs, troubleshooting flows, certifications, incidents and user roles." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Users" value={users.length} detail="Seeded trainees, operators, engineers, director and admin." />
        <MetricCard label="Modules" value={modules.length} detail="Curriculum-as-data across all five levels." />
        <MetricCard label="Lessons" value={lessons.length} detail="Structured lesson template with practical work." />
        <MetricCard label="Quizzes" value={quizzes.length} detail="Low-stakes knowledge checks." />
        <MetricCard label="SOPs" value={sops.length} detail="Versioned service procedures." />
        <MetricCard label="Equipment" value={equipment.length} detail="Knowledge base records." />
        <MetricCard label="Troubleshooting" value={troubleshootingFlows.length} detail="Interactive decision trees." />
        <MetricCard label="Visuals" value={visualSources.length} detail="Sourced references and capture backlog." />
        <MetricCard label="Audio examples" value={audioExamples.length} detail="Listening drills for gain, EQ, dynamics and stream faults." />
        <MetricCard label="Lesson guides" value={lessonGuides.length} detail="Board checks, listening targets and mentor prompts." />
        <MetricCard label="Videos" value={trainingVideos.length} detail="YouTube lesson source queue." />
        <MetricCard label="Certifications" value={certifications.length} detail="Evidence-oriented progress records." />
        <MetricCard label="Academies" value={academies.length} detail="Phase 0 hierarchy now represented as platform data." />
        <MetricCard label="Certification definitions" value={certificationDefinitions.length} detail="Governed award criteria separate from user progress." />
        <MetricCard label="Competencies" value={competencies.length} detail="Knowledge, practical, operational and leadership requirements." />
        <MetricCard label="Skills" value={skills.length} detail="X32, Dante, Logic, Waves and service-operation skill nodes." />
        <MetricCard label="Skill trees" value={skillTrees.length} detail="Roadmap structures for future Academy rendering." />
        <MetricCard label="Curriculum assessments" value={curriculumAssessments.length} detail="Scenario, practical, service and mentor assessment definitions." />
        <MetricCard label="Practical exercises" value={practicalExercises.length} detail="Hands-on training tasks mapped to modules and lessons." />
        <MetricCard label="Progression rules" value={progressionRules.length} detail="Certification gates and academy movement requirements." />
        <MetricCard label="Evidence records" value={evidenceRecords.length} detail="Seed examples for future mentor review workflow." />
      </section>
      <SurfaceCard className="mt-6">
        <SectionHeader title="Admin build notes" description="The CMS should protect anything that can affect a live service, certification award, or church-specific system document." />
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
          <p>Create/edit forms are the next layer over the Prisma models.</p>
          <p>Gate mentor sign-offs to Senior Engineer and above, certification approval to Technical Director/Admin, and content governance to Admin.</p>
          <p>Keep SOP, troubleshooting and equipment updates auditable because they affect live service operations.</p>
        </div>
      </SurfaceCard>
    </>
  );
}
