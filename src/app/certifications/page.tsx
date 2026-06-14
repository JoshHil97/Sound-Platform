import { MetricCard, PageHeader, ProgressBar, ProgressRing, SurfaceCard, Tag } from "@/components/ui";
import { certifications, users } from "@/lib/data";

export default function CertificationsPage() {
  return (
    <>
      <PageHeader eyebrow="Certification Tracker" title="Certification Passport" description="Track current level, modules, quiz scores, practical sign-offs, service observations, renewal dates and senior engineer notes." />
      <div className="grid gap-4">
        {certifications.map((certification) => {
          const user = users.find((candidate) => candidate.email === certification.userEmail);
          const progress = Math.min(100, Math.round((certification.modulesCompleted / 20) * 100));
          return (
            <SurfaceCard key={`${certification.userEmail}-${certification.level}`}>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex items-center gap-4">
                  <ProgressRing value={progress} label="Passport" />
                  <div><h2 className="text-xl font-bold">{user?.name ?? certification.userEmail}</h2><p className="mt-1 text-sm text-[var(--muted)]">{user?.role} · {certification.level}</p></div>
                </div>
                <div className="flex flex-wrap gap-2"><Tag>{certification.status}</Tag><Tag>Renewal {certification.renewalDue}</Tag></div>
              </div>
              <div className="mt-5"><ProgressBar value={progress} /></div>
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                <MetricCard label="Modules" value={certification.modulesCompleted} />
                <MetricCard label="Quiz avg" value={`${certification.quizAverage}%`} />
                <MetricCard label="Sign-offs" value={certification.practicalSignoffs} />
                <MetricCard label="Services" value={certification.serviceObservations} />
              </div>
              <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[var(--muted)]">{certification.seniorNotes}</p>
            </SurfaceCard>
          );
        })}
      </div>
    </>
  );
}
