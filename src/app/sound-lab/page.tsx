import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { PageHeader, StatCard, Tag } from "@/components/ui";
import { SoundLabPlayer } from "@/components/sound-lab-player";
import { audioExamples, lessonGuides, trainingVideos } from "@/lib/data";

export default function SoundLabPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive Listening"
        title="Sound Lab"
        description="A training environment for hearing gain, EQ, dynamics, feedback and livestream processing problems before volunteers meet them during a service."
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Audio examples" value={String(audioExamples.length)} detail="Generated safely in the browser with no external audio rights issues." />
        <StatCard label="Board check guides" value={String(lessonGuides.length)} detail="What to look at on the X32, Logic and stream path." />
        <StatCard label="Video slots" value={String(trainingVideos.length)} detail="YouTube lesson references and review queue." />
      </section>

      <section className="mb-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">How to use this lab</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)] md:grid-cols-3">
          <p>Listen first, then name the fault in plain language before touching a control.</p>
          <p>Use the board symptoms to decide where to look: preamp meter, PFL, fader, DCA, bus send, monitor send, Logic input or stream master.</p>
          <p>Make one change, compare, then document what fixed the problem so the team learns from it.</p>
        </div>
      </section>

      <SoundLabPlayer examples={audioExamples} />

      <section className="mt-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Board check playbooks</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {lessonGuides.map((guide) => (
            <article key={guide.lessonSlug} className="rounded-md border border-[var(--line)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold">{guide.lessonSlug.replaceAll("-", " ")}</h3>
                <Link className="focus-ring text-sm font-semibold text-[var(--accent-strong)] hover:underline" href={`/lessons/${guide.lessonSlug}`}>Open lesson</Link>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{guide.coreIdea}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <MiniList title="Board checks" items={guide.boardChecks} />
                <MiniList title="Listen for" items={guide.listeningTargets} />
              </div>
              <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm leading-6 text-amber-900">{guide.mentorPrompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">YouTube lesson references</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          These are sourced video slots for short companion lessons. Confirm exact church-approved videos before embedding them permanently into lesson pages.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {trainingVideos.map((video) => (
            <article key={video.slug} className="rounded-md border border-[var(--line)] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{video.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{video.topic} · {video.durationTarget}</p>
                </div>
                <Tag>{video.reviewStatus}</Tag>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{video.whyUse}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {video.linkedLessons.map((lesson) => (
                  <span key={lesson} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{lesson}</span>
                ))}
              </div>
              <Link href={video.sourceUrl} className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--line)] px-3 py-2 text-sm font-semibold hover:bg-teal-50">
                Open YouTube source
                <ExternalLink size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <h4 className="text-sm font-bold">{title}</h4>
      <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--muted)]">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
