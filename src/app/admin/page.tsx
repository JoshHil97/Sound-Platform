import { AlertTriangle, Archive, BookOpen, CheckCircle2, Database, FileAudio, FileText, GraduationCap, Image as ImageIcon, LockKeyhole, Network, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";
import {
  adminContentAreas,
  adminWorkQueue,
  audioExamples,
  certificationDefinitions,
  evidenceRecords,
  governanceStatuses,
  mentorSignOffTasks,
  modules,
  sops,
  trainingVideos,
  troubleshootingFlows,
  users,
  visualSources
} from "@/lib/data";
import { MetricCard, PageHeader, ProgressBar, SectionHeader, StatusPill, SurfaceCard, Tag } from "@/components/ui";
import type { AdminContentArea, AdminWorkQueueItem, GovernanceStatus } from "@/lib/types";

const areaIcons: Record<AdminContentArea["title"], React.ReactNode> = {
  "Curriculum Editor": <BookOpen size={21} />,
  "Equipment Knowledge Base": <SlidersHorizontal size={21} />,
  "SOP Library": <FileText size={21} />,
  "Troubleshooting Flows": <AlertTriangle size={21} />,
  "Visual Asset Registry": <ImageIcon size={21} />,
  "Audio and Video Examples": <FileAudio size={21} />,
  "Certification Approval": <GraduationCap size={21} />,
  "Users and Roles": <Users size={21} />
};

const statusTone: Record<AdminContentArea["status"], "success" | "warning" | "danger" | "info"> = {
  Healthy: "success",
  Drafting: "info",
  "Needs Review": "warning",
  Blocked: "danger"
};

const priorityTone: Record<AdminWorkQueueItem["priority"], "success" | "warning" | "danger" | "info"> = {
  Low: "success",
  Normal: "info",
  High: "warning",
  Critical: "danger"
};

const governanceTone: Record<GovernanceStatus["status"], "success" | "warning" | "danger" | "info"> = {
  Compliant: "success",
  Attention: "warning",
  "At Risk": "danger"
};

export default function AdminPage() {
  const reviewQueue = adminWorkQueue.filter((item) => item.status === "Review" || item.status === "Changes Requested");
  const criticalQueue = adminWorkQueue.filter((item) => item.priority === "Critical" || item.priority === "High");
  const healthyAreas = adminContentAreas.filter((area) => area.status === "Healthy").length;
  const governanceScore = Math.round((governanceStatuses.filter((status) => status.status === "Compliant").length / governanceStatuses.length) * 100);
  const sourceRisk = visualSources.filter((source) => source.rights !== "Church-owned required").length;

  return (
    <>
      <PageHeader
        eyebrow="Phase 10 Admin CMS"
        title="Admin Command Centre"
        description="Manage curriculum, equipment, SOPs, troubleshooting flows, assets, users, certification approvals and governance without losing the church-specific operating context."
        action={{ href: "/certifications", label: "Open Certification Cockpit" }}
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="CMS areas" value={adminContentAreas.length} detail={`${healthyAreas} healthy, ${adminContentAreas.length - healthyAreas} need attention.`} />
        <MetricCard label="Review queue" value={reviewQueue.length} detail={`${criticalQueue.length} high-priority or critical items.`} />
        <MetricCard label="Governance score" value={`${governanceScore}%`} detail="Based on current review cadence health." />
        <MetricCard label="Users and roles" value={users.length} detail="Mock role model until auth is connected." />
      </section>

      <section className="mb-6 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <SurfaceCard>
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Content Operations</p>
              <h2 className="mt-1 text-2xl font-black">CMS Control Surface</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">Each area has an owner, risk level and next action so the platform can grow without breaking Sunday operations.</p>
            </div>
            <StatusPill tone="warning">{reviewQueue.length} reviews pending</StatusPill>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {adminContentAreas.map((area) => (
              <article key={area.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-violet-200">
                      {areaIcons[area.title]}
                    </div>
                    <div>
                      <h3 className="font-black">{area.title}</h3>
                      <p className="mt-1 text-sm leading-5 text-[var(--muted)]">{area.description}</p>
                    </div>
                  </div>
                  <StatusPill tone={statusTone[area.status]}>{area.status}</StatusPill>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <MetricCard label="Records" value={area.count} />
                  <MetricCard label="Owner" value={area.ownerRole} />
                  <MetricCard label="Risk" value={area.risk} />
                </div>
                <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-200">{area.primaryAction}</p>
              </article>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Production Safety</p>
              <h2 className="mt-1 text-2xl font-black">Governance Health</h2>
            </div>
            <ShieldCheck className="text-emerald-300" />
          </div>
          <div className="mt-5">
            <ProgressBar value={governanceScore} />
          </div>
          <div className="mt-5 grid gap-3">
            {governanceStatuses.map((status) => (
              <article key={status.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{status.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{status.cadence} · {status.ownerRole}</p>
                  </div>
                  <StatusPill tone={governanceTone[status.status]}>{status.status}</StatusPill>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">{status.notes}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-violet-200">Next review {status.nextReview}</p>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="mb-6 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <SurfaceCard>
          <SectionHeader title="Editorial and Approval Queue" description="Mock CMS work queue for curriculum edits, SOP changes, asset capture, equipment verification and certification approvals." />
          <div className="grid gap-3">
            {adminWorkQueue.map((item) => (
              <article key={`${item.area}-${item.title}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{item.area} · Requested by {item.requester}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill tone={priorityTone[item.priority]}>{item.priority}</StatusPill>
                    <Tag>{item.status}</Tag>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">{item.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span>Owner: {item.ownerRole}</span>
                  <span>Due: {item.dueDate}</span>
                </div>
              </article>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <SectionHeader title="Certification Approval Cockpit" description="Phase 10 gives admins a place to see mentor reviews, evidence records and credential definitions together." />
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Credentials" value={certificationDefinitions.length} detail="Governed definitions." />
            <MetricCard label="Evidence" value={evidenceRecords.length} detail="Submitted records." />
            <MetricCard label="Sign-offs" value={mentorSignOffTasks.length} detail="Mentor tasks." />
          </div>
          <div className="mt-5 grid gap-3">
            {mentorSignOffTasks.map((task) => (
              <article key={`${task.traineeEmail}-${task.title}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{task.title}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{task.mentorName} · due {task.dueDate}</p>
                  </div>
                  <Tag>{task.status}</Tag>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">{task.rubric}</p>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <section className="mb-6 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <SurfaceCard>
          <SectionHeader title="Editor Panels" description="These are static MVP panels now; Phase 12 should wire them to forms and server actions once auth is ready." />
          <div className="grid gap-3">
            {[
              { icon: <Database size={18} />, title: "Curriculum graph", detail: `${modules.length} modules ready for controlled content population.` },
              { icon: <Network size={18} />, title: "Troubleshooting builder", detail: `${troubleshootingFlows.length} decision trees need rehearsal validation.` },
              { icon: <Archive size={18} />, title: "SOP versioning", detail: `${sops.length} SOPs carry owner and version metadata.` },
              { icon: <LockKeyhole size={18} />, title: "Role-gated publishing", detail: "Admin and Technical Director approval will be enforced after auth." }
            ].map((panel) => (
              <div key={panel.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-200">{panel.icon}</div>
                  <div>
                    <h3 className="font-black">{panel.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{panel.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <SectionHeader title="Asset and Media Governance" description="Visuals, audio examples and videos must be sourced, reviewed and eventually replaced with church-owned material where needed." />
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Visual sources" value={visualSources.length} detail={`${sourceRisk} external/source-reference records.`} />
            <MetricCard label="Audio examples" value={audioExamples.length} detail="Generated or future church-owned sound clips." />
            <MetricCard label="Training videos" value={trainingVideos.length} detail="Short YouTube/source queue." />
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {visualSources.slice(0, 4).map((source) => (
              <article key={source.slug} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black">{source.title}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{source.category}</p>
                  </div>
                  <Tag>{source.rights}</Tag>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-200">{source.trainingUse}</p>
              </article>
            ))}
          </div>
        </SurfaceCard>
      </section>

      <SurfaceCard>
        <SectionHeader title="Phase 10 Implementation Boundary" description="This phase creates the admin operating surface and data model. It intentionally avoids pretending that static mock buttons are live CMS mutations." />
        <div className="grid gap-3 text-sm leading-6 text-[var(--muted)] md:grid-cols-3">
          <p><CheckCircle2 className="mr-2 inline text-emerald-300" size={16} />Content areas, queues and governance are visible.</p>
          <p><CheckCircle2 className="mr-2 inline text-emerald-300" size={16} />Certification approvals are connected to Phase 9 data.</p>
          <p><CheckCircle2 className="mr-2 inline text-emerald-300" size={16} />Real create/edit/publish actions wait for auth and server actions.</p>
        </div>
      </SurfaceCard>
    </>
  );
}
