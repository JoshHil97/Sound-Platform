import Link from "next/link";
import { PageHeader, ProgressBar, StatCard, Tag } from "@/components/ui";
import { audioExamples, equipment, lessons, modules, serviceLogs, troubleshootingFlows, users } from "@/lib/data";

export default function DashboardPage() {
  const currentUser = users[2];

  return (
    <>
      <PageHeader
        eyebrow="Live-Service Training"
        title="Church sound team dashboard"
        description="A practical home for volunteer onboarding, service readiness, church-specific knowledge, troubleshooting and certification progress."
        action={{ href: "/troubleshooting", label: "Open Troubleshooting" }}
      />
      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Curriculum modules" value={String(modules.length)} detail="Five levels from Foundations to Technical Director." />
        <StatCard label="Lessons seeded" value={String(lessons.length)} detail="Short lessons with exercises, recall and mentor sign-off." />
        <StatCard label="Equipment records" value={String(equipment.length)} detail="X32, Dante, Logic, Waves, P16, wireless and more." />
        <StatCard label="Sound examples" value={String(audioExamples.length)} detail="Interactive gain, EQ, dynamics, feedback and stream listening drills." />
      </section>
      <section className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{currentUser.role} · {currentUser.currentLevel}</p>
            </div>
            <Tag>{currentUser.progress}% complete</Tag>
          </div>
          <div className="mt-5">
            <ProgressBar value={currentUser.progress} />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="rounded-md bg-slate-50 p-4">
              <h3 className="font-semibold">Next target</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Operate the approved Logic stream template and recover one routing or plugin fault.</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4">
              <h3 className="font-semibold">Mentor note</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Prioritise Dante verification and livestream loudness consistency.</p>
            </div>
          </div>
        </article>
        <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Service readiness</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {["Wireless batteries checked", "X32 showfile loaded", "Dante devices visible", "Logic template verified", "Incident log ready"].map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-md border border-[var(--line)] p-3">
                <span className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
      <section className="mb-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold">Train your ears before service</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Hear clipping, weak gain, rumble, harsh EQ, compression, gates, feedback and stream limiting with board checks beside each example.</p>
          </div>
          <Link className="focus-ring inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]" href="/sound-lab">
            Open Sound Lab
          </Link>
        </div>
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="text-xl font-bold">Continue learning</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {lessons.slice(20, 24).map((lesson) => (
              <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="focus-ring rounded-md border border-[var(--line)] p-4 hover:border-teal-300 hover:bg-teal-50">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <Tag>{lesson.difficulty}</Tag>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{lesson.summary}</p>
              </Link>
            ))}
          </div>
        </article>
        <article className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Fast fault flows</h2>
          <div className="mt-4 grid gap-3">
            {troubleshootingFlows.slice(0, 3).map((flow) => (
              <Link key={flow.slug} href={`/troubleshooting/${flow.slug}`} className="focus-ring rounded-md border border-[var(--line)] p-4 hover:border-amber-300 hover:bg-amber-50">
                <p className="font-semibold">{flow.title}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{flow.symptom}</p>
              </Link>
            ))}
          </div>
        </article>
      </section>
      <section className="mt-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Recent service logs</h2>
        <div className="mt-4 grid gap-3">
          {serviceLogs.map((log) => (
            <div key={`${log.date}-${log.type}`} className="grid gap-2 rounded-md border border-[var(--line)] p-4 md:grid-cols-[160px_1fr_120px]">
              <p className="text-sm font-semibold">{log.date}</p>
              <p className="text-sm text-[var(--muted)]">{log.type}: {log.notes}</p>
              <p className="text-sm font-semibold">{log.incidents} incidents</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
