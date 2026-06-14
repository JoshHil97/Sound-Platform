import type { TrainingVisualAsset } from "@/lib/types";

export const vbciLogicTrainingAssets: TrainingVisualAsset[] = [
  {
    slug: "logic-course-hero",
    title: "Logic Pro Livestream Setup Hero",
    src: "/training-assets/vbci-logic/course-hero.png",
    width: 410,
    height: 345,
    category: "Logic",
    purpose: "Course hero showing the church room, livestream laptop and core workflow icons.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["logic-session-template", "dante-into-logic"]
  },
  {
    slug: "logic-mixer-full",
    title: "Logic Pro Mixer View",
    src: "/training-assets/vbci-logic/logic-pro-mixer-view-full.png",
    width: 600,
    height: 345,
    category: "Logic",
    purpose: "Full mixer reference for channel strips, sends, outputs, meters and livestream grouping.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["logic-session-template", "logic-vocal-clarity"]
  },
  {
    slug: "logic-channel-strip",
    title: "Logic Channel Strip Example",
    src: "/training-assets/vbci-logic/logic-channel-strip-example.png",
    width: 125,
    height: 345,
    category: "Logic",
    purpose: "Close-up strip showing plugin order, sends and output assignment.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["logic-vocal-clarity", "waves-vocal-speech-chains"]
  },
  {
    slug: "plugin-window-examples",
    title: "Plugin Window Examples",
    src: "/training-assets/vbci-logic/plugin-windows-examples.png",
    width: 465,
    height: 345,
    category: "FX",
    purpose: "Visual reference for EQ, compressor, de-esser and limiter plugin windows.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["waves-purpose-first", "waves-vocal-speech-chains"]
  },
  {
    slug: "livestream-signal-flow",
    title: "Livestream Signal Flow Diagram",
    src: "/training-assets/vbci-logic/livestream-signal-flow-diagram.png",
    width: 420,
    height: 295,
    category: "Logic",
    purpose: "Show X32 to Dante Virtual Soundcard, Logic processing, livestream bus, record bus and platform output.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["dante-into-logic", "livestream-has-no-sound"]
  },
  {
    slug: "logic-io-setup",
    title: "Logic I/O Setup Screen",
    src: "/training-assets/vbci-logic/io-setup-screen.png",
    width: 340,
    height: 295,
    category: "Logic",
    purpose: "Teach DVS input/output device selection, buffer size and latency awareness.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["dante-into-logic", "logic-latency-loudness"]
  },
  {
    slug: "logic-bus-setup",
    title: "Logic Bus Setup",
    src: "/training-assets/vbci-logic/bus-setup-logic-pro.png",
    width: 190,
    height: 295,
    category: "Logic",
    purpose: "Show monitor, feedback, livestream mix and record mix bus assignments.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["logic-session-template", "stream-bus-design"]
  },
  {
    slug: "logic-tracks-list",
    title: "Project Tracks List",
    src: "/training-assets/vbci-logic/project-tracks-list.png",
    width: 285,
    height: 295,
    category: "Logic",
    purpose: "Teach approved input naming: pastor, worship vox, choir, instruments, click and mix buses.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["logic-session-template"]
  },
  {
    slug: "mac-audio-midi-dante",
    title: "Mac Audio MIDI Dante Setup",
    src: "/training-assets/vbci-logic/mac-audio-midi-setup-dante.png",
    width: 365,
    height: 295,
    category: "Logic",
    purpose: "Visual check for Dante Virtual Soundcard in macOS Audio MIDI Setup.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["dante-into-logic", "dvs-sample-rate-clock"]
  },
  {
    slug: "control-room-photos",
    title: "Control Room Photos",
    src: "/training-assets/vbci-logic/control-room-photos.png",
    width: 470,
    height: 260,
    category: "Logic",
    purpose: "Show real room context: laptop, console, controller and stage view.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["logic-session-template", "service-readiness"]
  },
  {
    slug: "church-system-diagram",
    title: "Church System Diagram",
    src: "/training-assets/vbci-logic/system-diagram-church-setup.png",
    width: 510,
    height: 260,
    category: "Logic",
    purpose: "Show stage to X32, Dante, MacBook Pro and livestream outputs.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["basic-signal-flow", "dante-into-logic"]
  },
  {
    slug: "icons-visual-assets",
    title: "Icons and Visual Assets",
    src: "/training-assets/vbci-logic/icons-visual-assets.png",
    width: 255,
    height: 260,
    category: "Logic",
    purpose: "Icon visual language for mixer, computer, mic, instruments, stream and recording concepts.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["basic-signal-flow"]
  },
  {
    slug: "waveform-meter-assets",
    title: "Waveform and Meter Assets",
    src: "/training-assets/vbci-logic/waveform-meter-assets.png",
    width: 365,
    height: 260,
    category: "Logic",
    purpose: "Use as the visual base for A/B listening and level-meter training.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["gain-structure-basics", "logic-latency-loudness"]
  },
  {
    slug: "x32-livestream-diagram",
    title: "X32 Livestream Diagram",
    src: "/training-assets/vbci-logic/x32-livestream-diagram.png",
    width: 949,
    height: 504,
    category: "X32",
    purpose: "Scene-analysis diagram for 2ND-NLS 2026: sources, X32, buses 5/6 and matrices 5/6.",
    sourceName: "VBCI Logic Training Assets",
    confidence: "Confirmed from file",
    linkedLessons: ["stream-bus-design", "x32-mix-buses"]
  }
];

export const referenceLookAssets: TrainingVisualAsset[] = [
  {
    slug: "reference-fx-specialist",
    title: "FX Specialist Reference Board",
    src: "/training-assets/reference-look/fx-specialist-board.png",
    width: 1672,
    height: 941,
    category: "Reference Look",
    purpose: "Visual target for specialist path density, sidebar, lesson tiles and waveform hero treatment.",
    sourceName: "User-provided desired look reference",
    confidence: "Confirmed from file",
    linkedLessons: ["waves-purpose-first"]
  },
  {
    slug: "reference-logic-pro-fx",
    title: "Logic Pro FX Reference Page",
    src: "/training-assets/reference-look/logic-pro-fx-page.png",
    width: 1536,
    height: 1024,
    category: "Reference Look",
    purpose: "Visual target for Logic FX lesson pages with hero waveform, sidebars, cards and media-heavy examples.",
    sourceName: "User-provided desired look reference",
    confidence: "Confirmed from file",
    linkedLessons: ["waves-vocal-speech-chains"]
  },
  {
    slug: "reference-waves-fx",
    title: "Waves FX Reference Page",
    src: "/training-assets/reference-look/waves-fx-page.png",
    width: 1536,
    height: 1024,
    category: "Reference Look",
    purpose: "Visual target for Waves lesson layout, plugin carousel and before/after listening cards.",
    sourceName: "User-provided desired look reference",
    confidence: "Confirmed from file",
    linkedLessons: ["waves-purpose-first"]
  },
  {
    slug: "reference-foundations-grid",
    title: "Foundations Asset Grid",
    src: "/training-assets/reference-look/foundations-asset-grid.png",
    width: 1536,
    height: 1024,
    category: "Reference Look",
    purpose: "Visual target for foundations lessons: large infographic boards rather than text-only pages.",
    sourceName: "User-provided desired look reference",
    confidence: "Confirmed from file",
    linkedLessons: ["basic-signal-flow", "gain-structure-basics"]
  },
  {
    slug: "reference-x32-orientation",
    title: "X32 Orientation Reference Board",
    src: "/training-assets/reference-look/x32-orientation-board.png",
    width: 1536,
    height: 1024,
    category: "Reference Look",
    purpose: "Visual target for X32 console orientation and diagram-led lessons.",
    sourceName: "User-provided desired look reference",
    confidence: "Confirmed from file",
    linkedLessons: ["x32-navigation"]
  }
];

export function getTrainingAssetsForLesson(lessonSlug: string) {
  return vbciLogicTrainingAssets.filter((asset) => asset.linkedLessons.includes(lessonSlug));
}
