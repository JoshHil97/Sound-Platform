import { Award, CheckCircle2, ClipboardCheck, Clock3, FileCheck2, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import {
  certificationDefinitions,
  certificationPassports,
  certifications,
  competencies,
  curriculumAssessments,
  evidenceRecords,
  mentorSignOffTasks,
  serviceExperiences,
  users
} from "@/lib/data";
import { MetricCard, PageHeader, ProgressBar, ProgressRing, SectionHeader, StatusPill, SurfaceCard, Tag } from "@/components/ui";
import type { CertificationGateStatus, EvidenceRecord, MentorSignOffTask } from "@/lib/types";

const gateTone: Record<CertificationGateStatus, "success" | "warning" | "danger" | "info"> = {
  Complete: "success",
  "In Progress": "info",
  "Needs Review": "warning",
  Blocked: "danger"
};

const evidenceTone: Record<EvidenceRecord["status"], "success" | "warning" | "danger" | "info"> = {
  Approved: "success",
  Submitted: "info",
  "Needs Review": "warning",
  "Revision Requested": "warning",
  Rejected: "danger"
};

const mentorTone: Record<MentorSignOffTask["status"], "success" | "warning" | "danger" | "info"> = {
  Observed: "success",
  Scheduled: "info",
  "Ready for Review": "warning",
  "Retry Required": "danger"
};

export default function CertificationsPage() {
  const featuredPassport = certificationPassports[1] ?? certificationPassports[0];
  const featuredUser = users.find((user) => user.email === featuredPassport?.userEmail);
  const featuredDefinition = certificationDefinitions.find((definition) => definition.slug === featuredPassport?.certificationSlug);
  const featuredCertification = certifications.find((certification) => certification.userEmail === featuredPassport?.userEmail);
  const featuredCompetencies = featuredPassport?.competencyProgress
    .map((item) => ({
      progress: item,
      competency: competencies.find((competency) => competency.slug === item.competencySlug)
    }))
    .filter((item) => item.competency) ?? [];

  const approvedEvidence = evidenceRecords.filter((record) => record.status === "Approved").length;
  const reviewEvidence = evidenceRecords.filter((record) => record.status === "Needs Review" || record.status === "Submitted").length;
  const approvedServices = serviceExperiences.filter((experience) => experience.approvedForCertification).length;

  return (
    <>
      <PageHeader
        eyebrow="Certification"
        title="Certification Passport"
        description="Evidence-based certification for real church sound readiness: competencies, Sound Lab results, practical sign-offs, service observations, mentor reviews and renewal gates."
        action={{ href: "/academy", label: "Review Academy Paths" }}
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Credential definitions" value={certificationDefinitions.length} detail="Governed award criteria." />
        <MetricCard label="Evidence reviewed" value={approvedEvidence} detail={`${reviewEvidence} records still need mentor review.`} />
        <MetricCard label="Service approvals" value={approvedServices} detail="Observed services approved for certification." />
        <MetricCard label="Mentor tasks" value={mentorSignOffTasks.length} detail="Practical reviews, retries and final approvals." />
      </section>

      {featuredPassport && featuredUser && featuredDefinition ? (
        <section className="mb-6 grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
          <SurfaceCard className="overflow-hidden">
            <div className="relative">
              <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-center gap-4">
                  <ProgressRing value={featuredPassport.readiness} label="Ready" />
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Active Passport</p>
                    <h2 className="mt-1 text-3xl font-black">{featuredUser.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{featuredUser.role} pursuing {featuredDefinition.title}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Tag>{featuredPassport.targetRole}</Tag>
                      <Tag>{featuredPassport.xp.toLocaleString()} XP</Tag>
                      <Tag>{featuredPassport.soundLabScore}% Sound Lab</Tag>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-violet-300/20 bg-violet-500/10 p-4 lg:max-w-sm">
                  <p className="text-sm font-black text-violet-100">Next certification action</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{featuredPassport.nextAction}</p>
                  <div className="mt-4">
                    <ProgressBar value={featuredPassport.readiness} />
                  </div>
                </div>
              </div>

              <div className="relative mt-6 grid gap-3 md:grid-cols-4">
                <MetricCard label="Modules" value={featuredCertification?.modulesCompleted ?? 0} detail="Completed against current path." />
                <MetricCard label="Quiz avg" value={`${featuredCertification?.quizAverage ?? 0}%`} detail="Knowledge assessment baseline." />
                <MetricCard label="Sign-offs" value={featuredCertification?.practicalSignoffs ?? 0} detail={`${featuredPassport.pendingSignoffs} pending.`} />
                <MetricCard label="Services" value={featuredCertification?.serviceObservations ?? 0} detail={`${featuredDefinition.requiredServiceObservations} required.`} />
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Credential Policy</p>
                <h2 className="mt-1 text-2xl font-black">{featuredDefinition.title}</h2>
              </div>
              <ShieldCheck className="text-emerald-300" />
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{featuredDefinition.mission}</p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Renewal</p>
                <p className="mt-2 text-sm text-slate-200">{featuredPassport.renewalWindow}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Senior notes</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{featuredCertification?.seniorNotes}</p>
              </div>
            </div>
          </SurfaceCard>
        </section>
      ) : null}

      {featuredPassport ? (
        <section className="mb-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
          <SurfaceCard>
            <SectionHeader title="Certification Gates" description="A credential unlocks only when learning, evidence, service experience and mentor review all agree." />
            <div className="grid gap-3">
              {featuredPassport.gates.map((gate) => (
                <div key={gate.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black">{gate.label}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{gate.required}</p>
                    </div>
                    <StatusPill tone={gateTone[gate.status]}>{gate.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-200">{gate.completed}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionHeader title="Competency Evidence" description="Each competency needs a real artifact, observation or practical result before it can count toward certification." />
            <div className="grid gap-3">
              {featuredCompetencies.map(({ progress, competency }) => (
                <div key={progress.competencySlug} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">{competency?.category}</p>
                      <h3 className="mt-1 font-black">{competency?.title}</h3>
                    </div>
                    <StatusPill tone={gateTone[progress.status]}>{progress.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{competency?.description}</p>
                  <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-200">
                    <strong>{progress.evidenceTitle}:</strong> {progress.mentorNote}
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </section>
      ) : null}

      <section className="mb-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <SurfaceCard>
          <SectionHeader title="Mentor Sign-Off Queue" description="Senior engineers and technical directors review practical evidence before credentials are awarded." />
          <div className="grid gap-3">
            {mentorSignOffTasks.map((task) => {
              const trainee = users.find((user) => user.email === task.traineeEmail);
              return (
                <article key={`${task.traineeEmail}-${task.title}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black">{task.title}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{trainee?.name ?? task.traineeEmail} · Mentor: {task.mentorName}</p>
                    </div>
                    <StatusPill tone={mentorTone[task.status]}>{task.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{task.rubric}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-200"><Clock3 size={14} /> Due {task.dueDate}</p>
                </article>
              );
            })}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <SectionHeader title="Evidence Review" description="Evidence records are the audit trail for why someone is or is not certified." />
          <div className="grid gap-3">
            {evidenceRecords.map((record) => {
              const user = users.find((candidate) => candidate.email === record.userEmail);
              return (
                <article key={`${record.userEmail}-${record.title}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black">{record.title}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{user?.name ?? record.userEmail} · {record.type}</p>
                    </div>
                    <StatusPill tone={evidenceTone[record.status]}>{record.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{record.description}</p>
                </article>
              );
            })}
          </div>
        </SurfaceCard>
      </section>

      <section className="mb-6">
        <SectionHeader title="Credential Catalogue" description="Every award has a mission, modules, competencies, service requirements and renewal cycle." />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {certificationDefinitions.map((definition) => {
            const academyCompetencies = competencies.filter((competency) => definition.competencySlugs.includes(competency.slug));
            return (
              <SurfaceCard key={definition.slug}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">{definition.level}</p>
                    <h2 className="mt-1 text-xl font-black">{definition.title}</h2>
                  </div>
                  <Award className="text-amber-300" />
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{definition.mission}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <MetricCard label="Modules" value={definition.moduleSlugs.length} />
                  <MetricCard label="Services" value={definition.requiredServiceObservations} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {academyCompetencies.map((competency) => <Tag key={competency.slug}>{competency.title}</Tag>)}
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Renew every {definition.renewalMonths} months</p>
              </SurfaceCard>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr_1fr]">
        <SurfaceCard>
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-1 text-cyan-300" />
            <div>
              <h2 className="text-xl font-black">Service Experience</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Observed services prove that trainees can perform calmly in the real worship environment.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {serviceExperiences.map((experience) => (
              <div key={`${experience.traineeEmail}-${experience.serviceDate}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold">{experience.roleServed}</p>
                  <StatusPill tone={experience.approvedForCertification ? "success" : "warning"}>{experience.approvedForCertification ? "Approved" : "Coaching"}</StatusPill>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{experience.serviceDate} · {experience.serviceType}</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">{experience.observationNotes}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-start gap-3">
            <FileCheck2 className="mt-1 text-violet-300" />
            <div>
              <h2 className="text-xl font-black">Assessment Architecture</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Assessments are tied to modules, competencies and mentor roles.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {curriculumAssessments.map((assessment) => (
              <div key={assessment.slug} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-bold">{assessment.title}</p>
                  <Tag>{assessment.type}</Tag>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{assessment.passCriteria}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">{assessment.mentorRoleRequired} required</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-start gap-3">
            <Sparkles className="mt-1 text-amber-300" />
            <div>
              <h2 className="text-xl font-black">Approval Standard</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Certification means the team trusts the operator with real services, not just completed lessons.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-200">
            {[
              "Required modules are complete and understood.",
              "Knowledge checks prove recall, not guessing.",
              "Practical work is observed on the church system.",
              "Sound Lab diagnosis supports real fault isolation.",
              "Service observations show calm Sunday operation.",
              "Mentor notes explain readiness, risks and next steps."
            ].map((standard) => (
              <p key={standard} className="flex gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                {standard}
              </p>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
            <p className="flex items-center gap-2 text-sm font-black text-emerald-100"><UserCheck size={16} /> Final approval</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Senior Engineers approve practical readiness. Technical Director/Admin governs final certification policy and renewals.</p>
          </div>
        </SurfaceCard>
      </section>
    </>
  );
}
