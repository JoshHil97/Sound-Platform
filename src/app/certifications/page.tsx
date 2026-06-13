import { PageHeader, ProgressBar, Tag } from "@/components/ui";
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
            <article key={`${certification.userEmail}-${certification.level}`} className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div><h2 className="text-xl font-bold">{user?.name ?? certification.userEmail}</h2><p className="mt-1 text-sm text-[var(--muted)]">{user?.role} · {certification.level}</p></div>
                <div className="flex flex-wrap gap-2"><Tag>{certification.status}</Tag><Tag>Renewal {certification.renewalDue}</Tag></div>
              </div>
              <div className="mt-5"><ProgressBar value={progress} /></div>
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                <Metric label="Modules" value={certification.modulesCompleted} />
                <Metric label="Quiz avg" value={`${certification.quizAverage}%`} />
                <Metric label="Sign-offs" value={certification.practicalSignoffs} />
                <Metric label="Services" value={certification.serviceObservations} />
              </div>
              <p className="mt-4 rounded-md bg-slate-50 p-3 text-sm leading-6 text-[var(--muted)]">{certification.seniorNotes}</p>
            </article>
          );
        })}
      </div>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">{label}</p><p className="mt-2 text-xl font-bold">{value}</p></div>;
}
