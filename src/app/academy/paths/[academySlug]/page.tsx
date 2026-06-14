import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ClipboardCheck, FlaskConical, RadioTower, ShieldCheck } from "lucide-react";
import {
  AcademyCommandPanel,
  AcademySidebar,
  AcademyTopBar,
  CertificationBand,
  SkillTreePreview,
  SpecialistHero,
  SpecialistModuleCard
} from "@/components/academy-framework";
import { ProgressBar, StatusPill, SurfaceCard, Tag } from "@/components/ui";
import {
  academies,
  getAcademy,
  getCertificationDefinitionForAcademy,
  getCompetenciesForAcademy,
  getModulesForAcademy,
  getSkillsForAcademy,
  getSkillTreeForAcademy
} from "@/lib/data";

const progressByAcademy: Record<string, number> = {
  "foundations-academy": 18,
  "foh-operator-academy": 42,
  "livestream-academy": 27,
  "systems-academy": 14,
  "leadership-academy": 0,
  "technical-director-academy": 0
};

const visualByAcademy: Record<string, "wave" | "eq" | "signal"> = {
  "foundations-academy": "signal",
  "foh-operator-academy": "eq",
  "livestream-academy": "wave",
  "systems-academy": "signal",
  "leadership-academy": "eq",
  "technical-director-academy": "signal"
};

export function generateStaticParams() {
  return academies.map((academy) => ({ academySlug: academy.slug }));
}

export default async function AcademyPathPage({ params }: { params: Promise<{ academySlug: string }> }) {
  const { academySlug } = await params;
  const academy = getAcademy(academySlug);
  if (!academy) {
    notFound();
  }

  const modules = getModulesForAcademy(academy.slug);
  const certification = getCertificationDefinitionForAcademy(academy.slug);
  const competencies = getCompetenciesForAcademy(academy.slug);
  const skills = getSkillsForAcademy(academy.slug);
  const skillTree = getSkillTreeForAcademy(academy.slug);
  const progress = progressByAcademy[academy.slug] ?? 0;
  const navItems = ["Overview", "Lessons", "Practice Labs", "Assessments", "Resources", "Certificate Path"];
  const masteryItems = competencies.length > 0 ? competencies.slice(0, 5).map((competency) => competency.title) : ["Operate the path safely", "Document service changes", "Escalate issues clearly"];

  return (
    <>
      <AcademyTopBar current={academy.title.replace("Academy", "Specialist")} />

      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <AcademySidebar title={academy.title.replace("Academy", "Specialist")} mission={academy.mission} progress={progress} navItems={navItems} masteryItems={masteryItems} />

        <main className="grid gap-5">
          <SpecialistHero
            academy={academy}
            certification={certification}
            moduleCount={modules.length}
            skillCount={skills.length}
            visual={visualByAcademy[academy.slug] ?? "wave"}
          />

          <section id="overview" className="grid gap-4 lg:grid-cols-4">
            <SurfaceCard>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Progress</p>
              <h2 className="mt-2 text-3xl font-black">{progress}%</h2>
              <div className="mt-4"><ProgressBar value={progress} /></div>
              <p className="mt-2 text-xs text-[var(--muted)]">Lessons, labs and evidence combined.</p>
            </SurfaceCard>
            <SurfaceCard>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Modules</p>
              <h2 className="mt-2 text-3xl font-black">{modules.length}</h2>
              <p className="mt-2 text-xs text-[var(--muted)]">Designed as practical service capabilities, not passive courses.</p>
            </SurfaceCard>
            <SurfaceCard>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Competencies</p>
              <h2 className="mt-2 text-3xl font-black">{competencies.length}</h2>
              <p className="mt-2 text-xs text-[var(--muted)]">Knowledge, practical, operational and service readiness outcomes.</p>
            </SurfaceCard>
            <SurfaceCard>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-300">Service Reps</p>
              <h2 className="mt-2 text-3xl font-black">{certification?.requiredServiceObservations ?? 0}</h2>
              <p className="mt-2 text-xs text-[var(--muted)]">Required observations before certification approval.</p>
            </SurfaceCard>
          </section>

          <section id="lessons">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Module Path</p>
                <h2 className="mt-1 text-3xl font-black">Train in the order you serve</h2>
              </div>
              <StatusPill tone={progress > 0 ? "success" : "warning"}>{progress > 0 ? "In progress" : "Ready to start"}</StatusPill>
            </div>
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {modules.map((module, index) => (
                <SpecialistModuleCard key={module.slug} module={module} index={index} href={`/academy/${module.slug}`} />
              ))}
            </div>
          </section>

          <section id="practice-labs" className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <SkillTreePreview tree={skillTree} skills={skills} />
            <AcademyCommandPanel
              title="Practice Labs"
              tone="cyan"
              items={[
                { label: "Scenario mode", value: "Ready", detail: "Use Sound Lab drills to hear gain, EQ, dynamics and stream translation problems." },
                { label: "Board checks", value: "Mapped", detail: "Each module points to real X32, Dante, Logic or Waves checks." },
                { label: "Mentor review", value: "Required", detail: "Practical work needs observed sign-off before certification gates unlock." }
              ]}
            />
          </section>

          <section id="assessments" className="grid gap-4 lg:grid-cols-3">
            {["Knowledge Check", "Practical Sign-Off", "Service Observation"].map((item, index) => (
              <SurfaceCard key={item}>
                <div className="flex items-center justify-between gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/20 text-violet-100">
                    {index === 0 ? <ClipboardCheck /> : index === 1 ? <FlaskConical /> : <RadioTower />}
                  </div>
                  <Tag>{index === 0 ? "Quiz" : index === 1 ? "Mentor" : "Live Service"}</Tag>
                </div>
                <h2 className="mt-4 text-xl font-black">{item}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {index === 0
                    ? "Confirm core understanding with active recall and scenario-based questions."
                    : index === 1
                      ? "Demonstrate the skill on the board, template or workflow while a mentor observes."
                      : "Serve in context, recover calmly when needed and document service evidence."}
                </p>
              </SurfaceCard>
            ))}
          </section>

          <section id="resources" className="grid gap-4 lg:grid-cols-2">
            <SurfaceCard>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Related Systems</p>
              <div className="mt-4 grid gap-3">
                {["X32 Console", "Logic Stream", "Dante", "Troubleshooting", "SOPs", "Equipment"].map((system) => (
                  <div key={system} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-3">
                    <span className="font-bold">{system}</span>
                    <CheckCircle2 size={17} className="text-emerald-300" />
                  </div>
                ))}
              </div>
            </SurfaceCard>
            <SurfaceCard>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">How This Path Feels</p>
              <p className="mt-4 text-sm leading-6 text-slate-200">
                Lessons should feel like guided console work: what to press, what to check, what you should hear, what could go wrong and how to recover without disrupting worship.
              </p>
              <Link href="/service-mode" className="focus-ring mt-5 inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-black text-violet-100 hover:bg-violet-500/25">
                Preview Service Mode
                <ArrowRight size={17} />
              </Link>
            </SurfaceCard>
          </section>

          <section id="certificate-path">
            <CertificationBand certification={certification} competencies={competencies} />
          </section>

          <SurfaceCard>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Phase 4 Foundation</p>
                <h2 className="mt-1 text-2xl font-black">Ready for deeper lesson redesign</h2>
              </div>
              <ShieldCheck className="text-emerald-300" size={28} />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              This pathway framework gives the next phases a strong place to attach interactive lessons, listening labs, simulator drills, source-backed visuals, mentor evidence and certification rules.
            </p>
          </SurfaceCard>
        </main>
      </div>
    </>
  );
}
