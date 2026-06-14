import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LessonExperienceShell } from "@/components/lesson-experience-shell";
import { LinkedAction, PageHeader, StepCard, SurfaceCard, Tag } from "@/components/ui";
import { QuizRunner } from "@/components/quiz-runner";
import { PracticalTrainingWorkflowCard } from "@/components/practical-training";
import { getLesson, getModule, getPracticalWorkflowsForLesson, getPracticalWorkflowsForModule, getQuizForLesson, getRichLessonContent, lessonGuides, lessons } from "@/lib/data";
import { getTrainingAssetsForLesson, referenceLookAssets } from "@/lib/training-assets";
import type { Lesson, LessonExperience, Module, RichLessonContent } from "@/lib/types";

export default async function LessonPage({ params }: { params: Promise<{ lessonSlug: string }> }) {
  const { lessonSlug } = await params;
  const lesson = getLesson(lessonSlug);
  if (!lesson) {
    notFound();
  }
  const academyModule = getModule(lesson.moduleSlug);
  const quiz = getQuizForLesson(lesson.slug);
  const guide = lessonGuides.find((item) => item.lessonSlug === lesson.slug);
  const richContent = getRichLessonContent(lesson.slug);
  const exactWorkflows = getPracticalWorkflowsForLesson(lesson.slug);
  const relatedModuleWorkflows = exactWorkflows.length ? [] : getPracticalWorkflowsForModule(lesson.moduleSlug).slice(0, 1);
  const workflows = exactWorkflows.length ? exactWorkflows : relatedModuleWorkflows;
  const lessonAssets = getTrainingAssetsForLesson(lesson.slug);
  const lessonExperience = buildLessonExperience(lesson, academyModule, richContent);
  const referenceAsset = lesson.slug.includes("waves")
    ? referenceLookAssets.find((asset) => asset.slug === "reference-waves-fx")
    : lesson.slug.includes("x32")
      ? referenceLookAssets.find((asset) => asset.slug === "reference-x32-orientation")
      : lesson.slug.includes("signal") || lesson.slug.includes("gain")
        ? referenceLookAssets.find((asset) => asset.slug === "reference-foundations-grid")
        : referenceLookAssets.find((asset) => asset.slug === "reference-logic-pro-fx");

  return (
    <>
      <LessonExperienceShell experience={lessonExperience} />
      <div className="mt-8" />
      <PageHeader eyebrow={academyModule?.title} title={lesson.title} description={lesson.summary} action={{ href: `/academy/${lesson.moduleSlug}`, label: "Back to Module" }} />
      {lessonAssets.length || referenceAsset ? (
        <section className="mb-6 grid gap-4 xl:grid-cols-[1fr_360px]">
          <SurfaceCard className="overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Visual Lesson Board</p>
                <h2 className="mt-1 text-2xl font-black">See the workflow before reading it</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">These are the sourced images connected to this lesson. They are here to make the lesson feel like a training board, not a text page.</p>
              </div>
              <Tag>{lessonAssets.length} sourced assets</Tag>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {lessonAssets.map((asset) => (
                <figure key={asset.slug} className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                  <Image src={asset.src} alt={asset.title} width={asset.width} height={asset.height} className="h-64 w-full object-cover" />
                  <figcaption className="border-t border-white/10 p-4">
                    <p className="font-black">{asset.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{asset.purpose}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </SurfaceCard>
          {referenceAsset ? (
            <SurfaceCard className="overflow-hidden">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Desired Look Reference</p>
              <h2 className="mt-1 text-xl font-black">{referenceAsset.title}</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <Image src={referenceAsset.src} alt={referenceAsset.title} width={referenceAsset.width} height={referenceAsset.height} className="h-72 w-full object-cover object-top" />
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{referenceAsset.purpose}</p>
            </SurfaceCard>
          ) : null}
        </section>
      ) : null}
      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <SurfaceCard className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            <Tag>{lesson.difficulty}</Tag>
            <Tag>{lesson.durationMinutes} min</Tag>
            <Tag>Mentor sign-off</Tag>
          </div>
          <div className="mt-5 grid gap-4">
            {richContent ? (
              <section className="grid gap-4">
                <section className="rounded-2xl border border-violet-300/20 bg-violet-500/10 p-4">
                  <h2 className="font-bold text-violet-100">Why This Matters in Ministry</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{richContent.ministryWhy}</p>
                </section>
                <section className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <h2 className="font-bold text-cyan-100">Church Operator Context</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{richContent.operatorContext}</p>
                </section>
                <div className="grid gap-3 md:grid-cols-3">
                  {richContent.keyConcepts.map((concept) => (
                    <section key={concept.title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <h3 className="text-sm font-bold text-cyan-200">{concept.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{concept.detail}</p>
                    </section>
                  ))}
                </div>
                <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <h2 className="font-bold">Step-by-Step Walkthrough</h2>
                  <ol className="mt-4 grid gap-3">
                    {richContent.walkthrough.map((step, index) => (
                      <StepCard key={step.title} index={index + 1}>
                        <strong>{step.title}:</strong> {step.action} <span className="text-cyan-200">Observe:</span> {step.observe} <span className="text-violet-200">Why:</span> {step.why}
                      </StepCard>
                    ))}
                  </ol>
                </section>
              </section>
            ) : null}
            <ContentBlock title="Beginner Explanation" body={lesson.beginner} />
            <ContentBlock title="Intermediate Explanation" body={lesson.intermediate} />
            <ContentBlock title="Advanced Explanation" body={lesson.advanced} />
            {guide ? (
              <section className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <h2 className="font-bold">Church Console Walkthrough</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{guide.coreIdea}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <ListBlock title="Board checks" items={guide.boardChecks} />
                  <ListBlock title="Listen for" items={guide.listeningTargets} />
                  <ListBlock title="Common mistakes" items={guide.commonMistakes} />
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                    <h3 className="text-sm font-bold text-amber-200">Mentor prompt</h3>
                    <p className="mt-2 text-sm leading-6 text-amber-50">{guide.mentorPrompt}</p>
                  </div>
                </div>
              </section>
            ) : null}
            <ContentBlock title="Practical Exercise" body={lesson.practical} />
            {richContent ? (
              <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <h2 className="font-bold">Good vs Bad Examples</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {richContent.examples.map((example) => (
                    <div key={example.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <h3 className="text-sm font-bold text-violet-200">{example.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-emerald-100"><strong>Good:</strong> {example.good}</p>
                      <p className="mt-2 text-sm leading-6 text-amber-100"><strong>Bad:</strong> {example.bad}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
            <ContentBlock title="Active Recall" body={lesson.recall} />
            <ContentBlock title="Spaced Repetition" body={lesson.spaced} />
            <ContentBlock title="Certification Criteria" body={lesson.signoff} />
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-bold">Church-specific notes</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{richContent?.practiceLab ?? "Add local screenshots, exact X32 channels, Dante device names, Logic template links, Waves presets and room-specific warnings here."}</p>
          {richContent ? (
            <div className="mt-5 grid gap-4">
              <ListBlock title="Mentor rubric" items={richContent.mentorRubric} />
              <ListBlock title="Visual/audio source backlog" items={richContent.sourceBacklog} />
            </div>
          ) : null}
          <div className="mt-4"><LinkedAction href="/sound-lab">Open Sound Lab listening examples</LinkedAction></div>
          {lesson.troubleshootingLinks.length ? (
            <div className="mt-5">
              <h3 className="text-sm font-semibold">Related troubleshooting</h3>
              <div className="mt-2 grid gap-2">
                {lesson.troubleshootingLinks.map((slug) => (
                  <Link key={slug} className="focus-ring rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold hover:bg-amber-400/10" href={`/troubleshooting/${slug}`}>
                    Open {slug.replaceAll("-", " ")}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </SurfaceCard>
      </section>
      {workflows.length ? (
        <section className="mb-6 grid gap-5">
          {workflows.map((workflow) => (
            <PracticalTrainingWorkflowCard key={workflow.slug} workflow={workflow} />
          ))}
        </section>
      ) : null}
      {quiz ? <QuizRunner quiz={quiz} /> : null}
    </>
  );
}

function buildLessonExperience(lesson: Lesson, academyModule: Module | undefined, richContent: RichLessonContent | undefined): LessonExperience {
  const moduleLessons = lessons.filter((item) => item.moduleSlug === lesson.moduleSlug);
  const lessonIndex = Math.max(0, moduleLessons.findIndex((item) => item.slug === lesson.slug));
  const totalLessons = Math.max(moduleLessons.length, 1);
  const lessonNumber = lessonIndex + 1;
  const progress = Math.min(95, Math.max(8, Math.round((lessonNumber / totalLessons) * 100)));
  const isSignalFlow = lesson.slug === "basic-signal-flow";

  return {
    slug: lesson.slug,
    title: isSignalFlow ? "Signal Flow Fundamentals" : lesson.title,
    academyTitle: academyModule?.level ? `${academyModule.level} Academy` : "Sound Academy",
    moduleTitle: academyModule?.title ?? "Church Sound Fundamentals",
    lessonNumber,
    totalLessons,
    progress,
    estimatedMinutes: lesson.durationMinutes,
    xpReward: lesson.difficulty === "Advanced" ? 175 : lesson.difficulty === "Intermediate" ? 125 : 75,
    difficulty: lesson.difficulty,
    objective: isSignalFlow
      ? "Trace a church microphone from the stage to X32, Dante, Logic and the livestream, then diagnose where the signal stops under pressure."
      : lesson.summary,
    sidebarLessons: moduleLessons.length
      ? moduleLessons.map((item, index) => ({
          slug: item.slug,
          title: item.slug === "basic-signal-flow" ? "Signal Flow Fundamentals" : item.title,
          status: getSidebarLessonStatus(index, lessonIndex),
          duration: item.durationMinutes
        }))
      : [{ slug: lesson.slug, title: lesson.title, status: "Active", duration: lesson.durationMinutes }],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "What this lesson trains",
        body: richContent?.ministryWhy ?? lesson.beginner,
        bullets: [
          "Follow the source-to-output path instead of guessing from the loudest symptom.",
          "Use meters, mute states, routing and listening checks in a calm order.",
          "Explain the signal path in plain language before changing the mix."
        ]
      },
      {
        id: "simulator",
        label: "Simulator",
        title: "Trace the signal live",
        body: "Inject a realistic service fault, watch the right panel change, and identify the first checkpoint where the signal stops.",
        bullets: ["Read the X32 input first.", "Confirm bus and Dante handoff.", "Check Logic and stream output last."]
      },
      {
        id: "listening",
        label: "Listening Lab",
        title: "What the fault sounds like",
        body: richContent?.operatorContext ?? lesson.intermediate,
        bullets: ["No input sounds silent everywhere.", "Bad routing often works in one destination but not another.", "Clipping sounds harsh even if the fader is low."]
      },
      {
        id: "setup",
        label: "Real Church Setup",
        title: "Our approved church path",
        body: "Stage source enters the X32, is routed to the room and livestream buses, passes through Dante into Logic, then hands off to the stream encoder.",
        bullets: ["X32 is the source of truth for input and bus routing.", "Dante/DVS must match sample rate and interface.", "Logic receives named inputs and outputs the final stream mix."]
      },
      {
        id: "sop",
        label: "SOP",
        title: "Safe operating procedure",
        body: lesson.practical,
        bullets: ["Make one intentional change at a time.", "Confirm the result before moving downstream.", "Log the root cause after service."]
      },
      {
        id: "notes",
        label: "Notes",
        title: "Mentor notes and sign-off",
        body: lesson.signoff,
        bullets: richContent?.mentorRubric.slice(0, 3) ?? ["Trainee explains the signal path.", "Trainee isolates the first failed checkpoint.", "Trainee restores service safely."]
      }
    ],
    nodes: [
      { id: "source", label: "Source", detail: "Pastor mic, vocal, instrument or playback.", state: "OK", meterValue: 74 },
      { id: "receiver", label: "Receiver / DI", detail: "Wireless receiver, DI box or stage input.", state: "OK", meterValue: 72 },
      { id: "x32", label: "X32 Input", detail: "Preamp, mute, patch, channel processing.", state: "OK", meterValue: 76 },
      { id: "bus", label: "Bus / LR", detail: "Main LR, stream bus, matrix or monitor send.", state: "OK", meterValue: 70 },
      { id: "dante", label: "Dante / DVS", detail: "Network route into the Mac and Logic.", state: "OK", meterValue: 66 },
      { id: "logic", label: "Logic Mix", detail: "Template input, plugin path and output bus.", state: "OK", meterValue: 68 },
      { id: "encoder", label: "Stream Output", detail: "OBS or encoder capture to online service.", state: "OK", meterValue: 64 }
    ],
    faultScenarios: [
      {
        id: "muted-receiver",
        label: "Wireless receiver muted",
        description: "Nothing reaches the X32 input meter.",
        faultNodeId: "receiver",
        symptom: "Pastor mic is silent in FOH and livestream. Receiver looks active but the X32 meter is dead.",
        hint: "Start before the X32 channel. If the console never sees signal, downstream routing cannot fix it.",
        fix: "Check pack mute, receiver AF/RF, battery and receiver output before adjusting the X32."
      },
      {
        id: "x32-channel-muted",
        label: "X32 channel muted",
        description: "Signal reaches preamp but stops before buses.",
        faultNodeId: "x32",
        symptom: "Input meter moves on the X32, but nothing reaches the room or livestream buses.",
        hint: "The source is arriving. Look at channel mute, DCA, mute group and main/bus assignment.",
        fix: "Unmute the correct channel path, confirm DCA and mute group state, then verify the bus send."
      },
      {
        id: "stream-bus-off",
        label: "Stream bus send off",
        description: "FOH works but livestream does not receive this source.",
        faultNodeId: "bus",
        symptom: "The room hears the source, but the livestream mix is missing it.",
        hint: "If FOH works, the source and channel are probably okay. Compare Main LR and stream bus sends.",
        fix: "Restore the approved stream bus send/tap point and confirm it does not affect FOH level."
      },
      {
        id: "dante-subscription",
        label: "Dante route broken",
        description: "X32 stream bus meters but Logic input is silent.",
        faultNodeId: "dante",
        symptom: "X32 stream bus meters normally, but Logic receives no input on the expected channel.",
        hint: "The console path is alive. Check Dante Controller, DVS, sample rate and network interface.",
        fix: "Restore the X32 card to DVS subscription, confirm clock sync, then check Logic input assignment."
      },
      {
        id: "logic-output",
        label: "Logic output misrouted",
        description: "Logic meters, but stream output is silent.",
        faultNodeId: "logic",
        symptom: "Logic channels are moving, but the encoder audio capture is silent.",
        hint: "Logic has the signal. Now check master output, output device and encoder capture source.",
        fix: "Set Logic output to the approved stream output, verify master bus meters and reselect encoder capture."
      }
    ],
    channelView: {
      channelName: isSignalFlow ? "CH 26 Bishop HH" : "CH 01 Lead Vocal",
      input: isSignalFlow ? "Wireless Rx / Local 26" : "AES50 A01",
      gain: "-18 dBFS target",
      hpf: "100 Hz engaged",
      route: "Main LR + Bus 5/6 LiveStream",
      dca: isSignalFlow ? "Bishop / Speech" : "Worship Vocals"
    },
    mission: {
      title: "Where did the signal stop?",
      prompt: "Choose the first checkpoint that should be investigated. The goal is not to guess the broken device. The goal is to prove the last known good signal and the first failed point.",
      success: "Correct. You found the first failed checkpoint. Now apply the recommended fix and verify the signal returns downstream."
    }
  };
}

function getSidebarLessonStatus(index: number, activeIndex: number): LessonExperience["sidebarLessons"][number]["status"] {
  if (index < activeIndex) {
    return "Complete";
  }
  if (index === activeIndex) {
    return "Active";
  }
  if (index > activeIndex + 2) {
    return "Locked";
  }
  return "Available";
}

function ContentBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <h3 className="text-sm font-bold">{title}</h3>
      <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--muted)]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
