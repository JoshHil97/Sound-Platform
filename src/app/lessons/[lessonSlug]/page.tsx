import { notFound } from "next/navigation";
import { LessonExperienceShell } from "@/components/lesson-experience-shell";
import { getLesson, getModule, getRichLessonContent, lessonGuides, lessons } from "@/lib/data";
import { getTrainingAssetsForLesson, referenceLookAssets } from "@/lib/training-assets";
import type { Lesson, LessonExperience, Module, RichLessonContent } from "@/lib/types";

export default async function LessonPage({ params }: { params: Promise<{ lessonSlug: string }> }) {
  const { lessonSlug } = await params;
  const lesson = getLesson(lessonSlug);
  if (!lesson) {
    notFound();
  }
  const academyModule = getModule(lesson.moduleSlug);
  const richContent = getRichLessonContent(lesson.slug);
  const lessonAssets = getTrainingAssetsForLesson(lesson.slug);
  const referenceAsset = lesson.slug.includes("waves")
    ? referenceLookAssets.find((asset) => asset.slug === "reference-waves-fx")
    : lesson.slug.includes("x32")
      ? referenceLookAssets.find((asset) => asset.slug === "reference-x32-orientation")
      : lesson.slug.includes("signal") || lesson.slug.includes("gain") || lesson.slug.includes("sound")
        ? referenceLookAssets.find((asset) => asset.slug === "reference-foundations-grid")
        : lesson.slug.includes("foh") || lesson.slug.includes("stream") || lesson.slug.includes("logic") || lesson.slug.includes("dante")
          ? referenceLookAssets.find((asset) => asset.slug === "reference-logic-pro-fx")
          : referenceLookAssets.find((asset) => asset.slug === "reference-fx-specialist");
  const lessonExperience = buildLessonExperience(lesson, academyModule, richContent, lessonAssets, referenceAsset);

  return <LessonExperienceShell experience={lessonExperience} />;
}

function buildLessonExperience(
  lesson: Lesson,
  academyModule: Module | undefined,
  richContent: RichLessonContent | undefined,
  lessonAssets: LessonExperience["visualAssets"] = [],
  referenceAsset?: LessonExperience["referenceAsset"]
): LessonExperience {
  const moduleLessons = lessons.filter((item) => item.moduleSlug === lesson.moduleSlug);
  const lessonIndex = Math.max(0, moduleLessons.findIndex((item) => item.slug === lesson.slug));
  const totalLessons = Math.max(moduleLessons.length, 1);
  const lessonNumber = lessonIndex + 1;
  const progress = Math.min(95, Math.max(8, Math.round((lessonNumber / totalLessons) * 100)));
  const isSignalFlow = lesson.slug === "basic-signal-flow";
  const isFohStream = lesson.slug === "foh-vs-stream";
  const guide = lessonGuides.find((item) => item.lessonSlug === lesson.slug);
  const visualAssets = lessonAssets ?? [];

  return {
    slug: lesson.slug,
    title: isSignalFlow ? "Signal Flow Fundamentals" : isFohStream ? "FOH vs Livestream Mix Simulator" : lesson.title,
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
      : isFohStream
        ? "Compare what works in the room against what translates online, then diagnose why the stream can fail even when FOH sounds fine."
        : lesson.summary,
    sidebarLessons: moduleLessons.length
      ? moduleLessons.map((item, index) => ({
          slug: item.slug,
          title: item.slug === "basic-signal-flow" ? "Signal Flow Fundamentals" : item.slug === "foh-vs-stream" ? "FOH vs Livestream Mix" : item.title,
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
    heroAsset: visualAssets[0],
    visualAssets,
    referenceAsset,
    trainingCards: [
      {
        eyebrow: "Board checks",
        title: "What to verify first",
        body: guide?.coreIdea ?? richContent?.operatorContext ?? "Use the approved church workflow and verify one checkpoint at a time.",
        items: guide?.boardChecks ?? richContent?.mentorRubric ?? ["Check source", "Check routing", "Check output"]
      },
      {
        eyebrow: "Listen for",
        title: "What good should sound like",
        body: richContent?.ministryWhy ?? lesson.beginner,
        items: guide?.listeningTargets ?? richContent?.examples.map((example) => example.good) ?? ["Clear speech", "Stable level", "No clipping"]
      },
      {
        eyebrow: "Common mistakes",
        title: "What usually goes wrong",
        body: lesson.practical,
        items: guide?.commonMistakes ?? richContent?.examples.map((example) => example.bad) ?? ["Guessing", "Skipping meters", "Changing too much"]
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
    faultScenarios: isFohStream ? [
      {
        id: "foh-good-stream-missing",
        label: "Room hears it, stream missing",
        description: "Main LR is healthy but the livestream bus does not receive the source.",
        faultNodeId: "bus",
        symptom: "The room mix sounds right, but online viewers cannot hear the vocal clearly in the livestream.",
        hint: "If FOH works, do not start with the microphone. Compare the source assignment into the stream bus and Logic path.",
        fix: "Restore the approved stream bus send/tap point, verify Bus 5/6 meters, then confirm Logic receives the channel."
      },
      {
        id: "logic-too-quiet",
        label: "Logic stream too quiet",
        description: "X32 and Dante meter, but the stream master is under-driven.",
        faultNodeId: "logic",
        symptom: "The stream is technically passing audio, but speech is small and viewers keep turning up their devices.",
        hint: "The source reaches Logic. Now compare channel level, speech bus, master bus and loudness meter.",
        fix: "Raise the approved Logic speech/stream balance, confirm loudness target, then compare on phone and headphones."
      },
      {
        id: "dante-stream-break",
        label: "Dante into Logic silent",
        description: "X32 stream bus meters but Logic input is silent.",
        faultNodeId: "dante",
        symptom: "FOH is normal and the X32 stream bus meters, but Logic does not receive the livestream source.",
        hint: "The room and X32 bus are alive. Check Dante Controller, DVS, sample rate and Logic input device.",
        fix: "Restore the X32 card to DVS subscription, confirm clock sync, then check Logic input assignment."
      }
    ] : [
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
