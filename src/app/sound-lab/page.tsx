import Link from "next/link";
import { ExternalLink, Headphones, RadioTower, ScanSearch, Target } from "lucide-react";
import { MetricCard, PageHeader, ProgressBar, SurfaceCard, Tag } from "@/components/ui";
import { SoundLabPlayer } from "@/components/sound-lab-player";
import { audioExamples, lessonGuides, trainingVideos } from "@/lib/data";

export default function SoundLabPage() {
  const hardScenarios = audioExamples.filter((example) => example.difficulty === "Hard").length;

  return (
    <>
      <PageHeader
        eyebrow="Interactive Ear Training"
        title="Sound Lab diagnostic simulator"
        description="Train your ears, diagnose the fault, read the meters, choose the first safe board check, and connect every sound back to a real service workflow."
      />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Scenarios" value={audioExamples.length} detail="Generated examples for gain, EQ, dynamics, feedback and stream faults." />
        <MetricCard label="Hard drills" value={hardScenarios} detail="Feedback, clipping and limiter decisions under pressure." />
        <MetricCard label="Mentor playbooks" value={lessonGuides.length} detail="Board checks and listening targets for practical lessons." />
        <MetricCard label="Video references" value={trainingVideos.length} detail="Sourced companion lesson slots." />
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-4">
        <SurfaceCard>
          <Headphones className="text-violet-300" />
          <h2 className="mt-3 text-xl font-black">Listen first</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Use A/B/C playback to hear the difference before reading the answer.</p>
        </SurfaceCard>
        <SurfaceCard>
          <ScanSearch className="text-cyan-300" />
          <h2 className="mt-3 text-xl font-black">Read the clues</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Meters, waveform, spectrum and board symptoms point to the likely fault.</p>
        </SurfaceCard>
        <SurfaceCard>
          <Target className="text-emerald-300" />
          <h2 className="mt-3 text-xl font-black">Choose first check</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Train the safest first move instead of guessing with random board changes.</p>
        </SurfaceCard>
        <SurfaceCard>
          <RadioTower className="text-amber-300" />
          <h2 className="mt-3 text-xl font-black">Connect to service</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Every scenario links back to lessons, workflows or troubleshooting flows.</p>
        </SurfaceCard>
      </section>

      <SoundLabPlayer examples={audioExamples} />

      <section className="mt-6 grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <SurfaceCard>
          <h2 className="text-xl font-bold">Board check modes</h2>
          <div className="mt-4 grid gap-2 md:grid-cols-5">
            {["X32 Check", "Dante Check", "Logic Check", "Monitor Check", "Stream Check"].map((item) => (
              <button key={item} className="rounded-xl border border-violet-400/25 bg-violet-500/10 px-3 py-3 text-sm font-bold text-violet-100 hover:bg-violet-500/20">{item}</button>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-bold">Mentor review mode</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">A mentor should ask the trainee to name the fault, point to the meter clue, choose the first safe check, then explain what they would document after service.</p>
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-xs font-bold text-[var(--muted)]"><span>Mentor review readiness</span><span>45%</span></div>
            <ProgressBar value={45} />
          </div>
        </SurfaceCard>
      </section>

      <section className="mt-6 glass-panel rounded-3xl p-5">
        <h2 className="text-xl font-bold">YouTube lesson references</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {trainingVideos.map((video) => (
            <article key={video.slug} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">{video.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{video.topic} · {video.durationTarget}</p>
                </div>
                <Tag>{video.reviewStatus}</Tag>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{video.whyUse}</p>
              <Link href={video.sourceUrl} className="focus-ring mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/10">
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
