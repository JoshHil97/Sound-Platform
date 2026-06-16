"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, Clock3, Gauge, Headphones, ListChecks, Network, RadioTower, ShieldCheck, SlidersHorizontal } from "lucide-react";
import {
  getX32Lesson,
  x32AcademySections,
  x32ChurchSetupGroups,
  x32ConsoleMetadata,
  x32ProgressPlaceholder,
  x32WorkflowCards,
  type X32Accent,
  type X32Lesson
} from "@/lib/x32/academy-data";
import hotspotMap from "@/lib/x32/hotspots.json";

type HotspotType = "channel" | "bus" | "dca" | "matrix" | "fx" | "master" | "screen";

type Hotspot = {
  id: string;
  type: HotspotType;
  number?: number;
  name: string;
  category?: string;
  categoryLabel?: string;
  accent?: string;
  purpose: string;
  associatedHotspots?: string[];
  routingSummary: string;
  commonIssues: string[];
  trainingLinks: string[];
  rect: {
    xPercent: number;
    yPercent: number;
    widthPercent: number;
    heightPercent: number;
  };
};

type SpotlightContent = Partial<Hotspot> & {
  associatedLabel?: string;
  alsoAvailableTo?: string[];
  churchUsage?: string;
  contains?: string[];
  feeds?: string[];
  signalPath?: string[];
  systemRole?: string;
  usedDuring?: string[];
  usedOn?: string[];
  verificationNote?: string;
  whatToCheck?: string[];
};

const hotspots = hotspotMap.hotspots as Hotspot[];

const quickJumpGroups: { label: string; type: HotspotType }[] = [
  { label: "Channels", type: "channel" },
  { label: "DCAs", type: "dca" },
  { label: "Buses", type: "bus" },
  { label: "Matrices", type: "matrix" },
  { label: "FX", type: "fx" },
  { label: "Main LR", type: "master" },
  { label: "System View", type: "screen" }
];

const typeLabels: Record<HotspotType, string> = {
  channel: "Input Channel",
  bus: "Bus",
  dca: "DCA Group",
  matrix: "Matrix",
  fx: "Effect",
  master: "Master Section",
  screen: "Screen Area"
};

const accentStyles: Record<string, { border: string; rgb: string; soft: string; text: string }> = {
  amber: { border: "#fbbf24", rgb: "251 191 36", soft: "rgba(251,191,36,0.15)", text: "text-amber-200" },
  blue: { border: "#60a5fa", rgb: "96 165 250", soft: "rgba(96,165,250,0.16)", text: "text-blue-200" },
  green: { border: "#4ade80", rgb: "74 222 128", soft: "rgba(74,222,128,0.16)", text: "text-emerald-200" },
  orange: { border: "#fb923c", rgb: "251 146 60", soft: "rgba(251,146,60,0.17)", text: "text-orange-200" },
  purple: { border: "#c084fc", rgb: "192 132 252", soft: "rgba(192,132,252,0.17)", text: "text-purple-200" },
  violet: { border: "#a78bfa", rgb: "167 139 250", soft: "rgba(167,139,250,0.18)", text: "text-violet-200" },
  cyan: { border: "#22d3ee", rgb: "34 211 238", soft: "rgba(34,211,238,0.14)", text: "text-cyan-200" },
  red: { border: "#f87171", rgb: "248 113 113", soft: "rgba(248,113,113,0.15)", text: "text-red-200" }
};

const typeAccent: Record<HotspotType, string> = {
  bus: "blue",
  channel: "violet",
  dca: "green",
  fx: "purple",
  master: "orange",
  matrix: "cyan",
  screen: "blue"
};

const spotlightContent: Record<string, SpotlightContent> = {
  "ch-26": {
    purpose: "Primary Bishop handheld microphone.",
    churchUsage: "Used during preaching, ministry, altar calls and service leadership.",
    signalPath: ["Wireless Receiver", "X32 Channel 26", "DCA 3 (Bishop Mics)", "Main LR", "FOH System"],
    alsoAvailableTo: ["Monitor mixes", "Dante Network", "Logic Pro Livestream"],
    routingSummary: "Wireless receiver feeds X32 Channel 26, DCA 3 Bishop Mics, Main LR and the FOH system.",
    commonIssues: ["Flat battery", "Wireless interference", "Gain too low", "Gain too high", "Channel muted", "DCA muted"],
    whatToCheck: ["Battery", "RF signal", "Channel mute", "DCA 3 mute", "Main LR assignment"],
    trainingLinks: ["Wireless Microphones", "Gain Staging", "DCA Groups", "Troubleshooting Speech Channels"],
    associatedLabel: "DCA 3 - Bishop Mics"
  },
  "ch-08": {
    purpose: "Bass Guitar Input.",
    churchUsage: "Provides low frequency foundation for worship and praise.",
    signalPath: ["Bass DI", "X32 Channel 8", "DCA 6", "Main LR", "FOH"],
    routingSummary: "Bass DI feeds X32 Channel 8, DCA 6, Main LR and FOH.",
    commonIssues: ["DI disconnected", "Gain too low", "Excessive compression", "Missing from livestream"],
    trainingLinks: ["Band Mixing", "Gain Structure", "Low Frequency Management"]
  },
  "dca-07": {
    purpose: "Controls all drum channels together for praise and worship dynamics.",
    contains: ["Kick", "Snare Top", "Snare Bottom", "Floor Tom", "High Tom", "Mid Tom", "OH Left", "OH Right"],
    routingSummary: "DCA 7 controls the full drum group together while individual drum channels remain adjustable.",
    commonIssues: ["DCA muted", "Drums overpowering vocals", "Drums disappear during worship"],
    whatToCheck: ["DCA level", "Individual drum channels", "Drum bus routing"],
    trainingLinks: ["Drum Mixing", "DCA Workflow", "Praise vs Worship Dynamics"]
  },
  "dca-03": {
    purpose: "Master control for Bishop microphones.",
    contains: ["BishopHH", "Bishop LP", "MOD"],
    routingSummary: "Groups BishopHH, Bishop LP and MOD so speech leadership mics can be managed together during service.",
    commonIssues: ["DCA muted", "Multiple speech mics left open"],
    trainingLinks: ["Speech Mixing", "Service Leadership Workflow"]
  },
  "bus-01": {
    purpose: "Left stage monitor mix.",
    feeds: ["Stage Monitor A"],
    routingSummary: "Bus 1 carries channel sends to the left stage monitor path.",
    commonIssues: ["No monitor sound", "Incorrect send level", "Wrong routing"],
    whatToCheck: ["Bus level", "Channel sends", "Output routing", "Stage monitor power"],
    trainingLinks: ["Monitor Mixing", "Sends On Fader"]
  },
  "bus-02": {
    purpose: "Right stage monitor mix.",
    feeds: ["Stage Monitor B"],
    routingSummary: "Bus 2 carries channel sends to the right stage monitor path for performer foldback.",
    commonIssues: ["No monitor sound", "Performer requests more vocal"],
    trainingLinks: ["Monitor Mixing"]
  },
  "bus-05": {
    purpose: "Scene-labelled livestream left bus requiring church verification before teaching as confirmed routing.",
    routingSummary: "Bus 5 appears in the scene and hotspot map as LiveStream L. Asset 002 explicitly says Bus 5 should be confirmed active usage before teaching it as the main livestream path.",
    verificationNote: "Confirm active VBCI usage before treating Bus 5 as the primary livestream route.",
    commonIssues: ["Unconfirmed active usage", "Wrong bus assumed for livestream", "Logic or Dante routing mismatch"],
    trainingLinks: ["Confirm with church system owner", "Livestream routing review"]
  },
  "bus-06": {
    purpose: "Scene-labelled livestream right bus requiring church verification before teaching as confirmed routing.",
    routingSummary: "Bus 6 appears in the scene and hotspot map as LiveStream R. Asset 002 explicitly says Bus 6 should be confirmed active usage before teaching it as the main livestream path.",
    verificationNote: "Confirm active VBCI usage before treating Bus 6 as the primary livestream route.",
    commonIssues: ["Unconfirmed active usage", "Wrong bus assumed for livestream", "Logic or Dante routing mismatch"],
    trainingLinks: ["Confirm with church system owner", "Livestream routing review"]
  },
  "matrix-02": {
    purpose: "Feeds side fill speakers.",
    systemRole: "Part of the FOH reinforcement system.",
    routingSummary: "Matrix 2 distributes the main console mix to side fill coverage.",
    commonIssues: ["Side fill silent", "Side fill too loud"],
    trainingLinks: ["Matrix Outputs", "FOH Coverage"]
  },
  "matrix-03": {
    purpose: "Feeds the overflow room.",
    routingSummary: "Matrix 3 distributes service audio to the overflow room.",
    commonIssues: ["Overflow room has no audio", "Wrong matrix source"],
    trainingLinks: ["Building Audio Distribution"]
  },
  "matrix-04": {
    purpose: "Feeds the Victoryland area.",
    routingSummary: "Matrix 4 distributes service audio to Victoryland.",
    commonIssues: ["Missing room feed", "Matrix muted"],
    trainingLinks: ["Building Audio Distribution"]
  },
  "matrix-05": {
    purpose: "Scene-labelled livestream matrix requiring church verification before being taught as confirmed active routing.",
    routingSummary: "Matrix 5 appears in the hotspot map as LIVESTREAM L, but Asset 003 only approves Matrix 2 Side Fill, Matrix 3 Overflow and Matrix 4 Victoryland content.",
    verificationNote: "Confirm with the church environment before presenting Matrix 5 as an active livestream feed.",
    commonIssues: ["Unconfirmed active usage", "Wrong matrix source", "Livestream feed assumption"],
    trainingLinks: ["Confirm with church system owner", "Building Audio Distribution"]
  },
  "matrix-06": {
    purpose: "Scene-labelled livestream matrix requiring church verification before being taught as confirmed active routing.",
    routingSummary: "Matrix 6 appears in the hotspot map as LIVESTREAM R, but Asset 003 only approves Matrix 2 Side Fill, Matrix 3 Overflow and Matrix 4 Victoryland content.",
    verificationNote: "Confirm with the church environment before presenting Matrix 6 as an active livestream feed.",
    commonIssues: ["Unconfirmed active usage", "Wrong matrix source", "Livestream feed assumption"],
    trainingLinks: ["Confirm with church system owner", "Building Audio Distribution"]
  },
  "fx-13": {
    purpose: "Scene-labelled drum reverb effect.",
    routingSummary: "Drum channels can send to FX 13 for shared drum ambience. Asset 003 names Drum Verb for validation but does not provide additional approved content.",
    verificationNote: "Confirm current VBCI drum reverb usage and preferred teaching wording.",
    commonIssues: ["Too much drum ambience", "No reverb return", "Drums sound detached from the room"],
    trainingLinks: ["Effects Processing", "Drum Mixing"]
  },
  "fx-15": {
    purpose: "Adds ambience and depth to vocals.",
    usedOn: ["Lead Vocals", "Backing Vocals"],
    routingSummary: "Vocal channels can send to FX 15 for shared vocal reverb return processing.",
    commonIssues: ["Too much reverb", "No reverb", "Muddy vocal sound"],
    trainingLinks: ["Effects Processing", "Vocal Mixing"]
  },
  "fx-16": {
    purpose: "Creates repeating vocal echoes.",
    usedDuring: ["Praise", "Transitions", "Special Moments"],
    routingSummary: "Vocal channels can send to FX 16 when delay is needed for musical or transition moments.",
    commonIssues: ["Delay too loud", "Delay timing incorrect"],
    trainingLinks: ["Delay Effects", "Creative Mixing"]
  },
  "main-lr": {
    purpose: "Primary FOH output.",
    signalPath: ["Main LR", "Subwoofer", "FOH Left", "FOH Centre", "FOH Right", "Side Fill"],
    routingSummary: "Main LR feeds the primary house sound path and connected FOH coverage zones.",
    commonIssues: ["No house sound", "Main LR muted", "Output routing issue"],
    trainingLinks: ["FOH Signal Flow", "System Architecture"]
  },
  "screen-main": {
    purpose: "Shows console metering, channel views, routing pages and system state.",
    signalPath: ["Inputs 1-32", "Dante Card", "Dante Network", "Logic Pro", "Livestream Platforms"],
    routingSummary: "Use the screen area to confirm console pages and Dante or Logic handoff context during training.",
    commonIssues: ["Dante clock issue", "Missing subscription", "Logic input mismatch", "Dante Virtual Soundcard offline"],
    trainingLinks: ["Dante Fundamentals", "Logic Livestream Workflow", "Troubleshooting Digital Audio"]
  }
};

function getAccent(hotspot: Hotspot) {
  return accentStyles[hotspot.accent ?? typeAccent[hotspot.type]] ?? accentStyles.violet;
}

function formatHotspotName(hotspot: Hotspot) {
  if (hotspot.type === "channel" && hotspot.number) {
    return `CH${hotspot.number.toString().padStart(2, "0")} - ${hotspot.name}`;
  }

  return hotspot.name;
}

function getDisplayHotspot(hotspot: Hotspot) {
  return { ...hotspot, ...spotlightContent[hotspot.id] };
}

function associatedItems(hotspot: Hotspot) {
  const displayHotspot = getDisplayHotspot(hotspot);

  if (displayHotspot.associatedLabel) {
    return [displayHotspot.associatedLabel];
  }

  return (displayHotspot.associatedHotspots ?? [])
    .map((id) => hotspots.find((item) => item.id === id))
    .filter((item): item is Hotspot => Boolean(item))
    .map(formatHotspotName);
}

export default function X32ConsolePage() {
  const [selectedId, setSelectedId] = useSelectedHotspot();
  const [hoveredId, setHoveredId] = useState<string | undefined>();
  const selectedHotspot = hotspots.find((hotspot) => hotspot.id === selectedId);
  const nextLesson = getX32Lesson(x32ProgressPlaceholder.nextLessonId);

  return (
    <div className="x32-console-stage -mt-1 pb-8">
      <header className="mb-4 rounded-xl border border-violet-300/20 bg-[#050812]/90 px-4 py-4 shadow-[0_0_32px_rgba(124,58,237,0.16)] backdrop-blur-xl md:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Link href="/" className="focus-ring mb-2 inline-flex items-center gap-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.18em] text-violet-200 hover:text-white">
              <ChevronLeft size={15} aria-hidden="true" />
              Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="hidden text-cyan-200 sm:block" size={28} aria-hidden="true" />
              <div>
                <h1 className="text-2xl font-black leading-tight text-white md:text-3xl">{x32ConsoleMetadata.title}</h1>
                <p className="mt-1 max-w-3xl text-sm leading-5 text-slate-300">{x32ConsoleMetadata.description}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="w-fit rounded-full border border-violet-300/30 bg-violet-500/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
              {x32ConsoleMetadata.mode}
            </span>
            <span className="w-fit rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
              {x32ConsoleMetadata.operatorLevel}
            </span>
          </div>
        </div>
      </header>

      <section className="mb-3 grid gap-3 md:grid-cols-2 xl:grid-cols-5" aria-label="Console overview">
        {x32ConsoleMetadata.overviewStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <main className="grid gap-3 2xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0">
          <section className="grid gap-3 xl:grid-cols-[260px_minmax(0,1fr)]">
            <ConsoleOverviewPanel />
            <div className="min-w-0 rounded-xl border border-white/10 bg-black/45 p-1.5 shadow-[0_20px_70px_rgba(0,0,0,0.46)]">
              <div className="relative mx-auto overflow-visible rounded-lg bg-black">
                <Image
                  src="/x32-sprint-1/x32-master-base.png"
                  alt="Behringer X32 console configured for VBCI sound training"
                  width={1659}
                  height={948}
                  className="h-auto w-full select-none rounded-lg object-contain"
                  priority
                  draggable={false}
                />
                <div className="absolute inset-0" aria-label="Interactive X32 console hotspots">
                  {hotspots.map((hotspot) => {
                    const active = hotspot.id === selectedId;
                    const hovered = hotspot.id === hoveredId;
                    const label = formatHotspotName(hotspot);
                    const accent = getAccent(hotspot);
                    const hotspotStyle = {
                      "--spot-rgb": accent.rgb,
                      "--spot-border": accent.border,
                      "--spot-soft": accent.soft,
                      borderColor: active || hovered ? accent.border : "transparent",
                      backgroundColor: active ? `rgb(${accent.rgb} / 0.23)` : hovered ? `rgb(${accent.rgb} / 0.15)` : "transparent",
                      boxShadow: active
                        ? `0 0 0 1px rgba(255,255,255,0.34), 0 0 28px rgb(${accent.rgb} / 0.82), inset 0 0 18px rgb(${accent.rgb} / 0.22)`
                        : hovered
                          ? `0 0 22px rgb(${accent.rgb} / 0.66), inset 0 0 12px rgb(${accent.rgb} / 0.18)`
                          : "none",
                      left: `${hotspot.rect.xPercent}%`,
                      top: `${hotspot.rect.yPercent}%`,
                      width: `${hotspot.rect.widthPercent}%`,
                      height: `${hotspot.rect.heightPercent}%`
                    } as CSSProperties;

                    return (
                      <button
                        key={hotspot.id}
                        type="button"
                        data-hotspot-id={hotspot.id}
                        data-hotspot-type={hotspot.type}
                        aria-label={`Select ${label}`}
                        aria-pressed={active}
                        title={label}
                        onClick={() => setSelectedId(hotspot.id)}
                        onMouseEnter={() => setHoveredId(hotspot.id)}
                        onMouseLeave={() => setHoveredId((current) => (current === hotspot.id ? undefined : current))}
                        className="group absolute rounded-[5px] border transition duration-200 focus-ring"
                        style={hotspotStyle}
                      >
                        <span
                          className={`pointer-events-none absolute -right-1 -top-1 hidden h-2.5 w-2.5 rounded-full border border-white/60 bg-[var(--spot-border)] shadow-[0_0_12px_rgb(var(--spot-rgb)/0.9)] ${
                            active ? "block" : "group-hover:block"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="pointer-events-none absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-[calc(100%+7px)] whitespace-nowrap rounded-md border border-[rgb(var(--spot-rgb)/0.42)] bg-[#080b16]/96 px-2.5 py-1.5 text-[11px] font-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.48)] group-hover:block">
                          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--spot-border)] align-middle" aria-hidden="true" />
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <nav className="mt-3 rounded-xl border border-white/10 bg-[#070b16]/88 p-2 shadow-[0_14px_46px_rgba(0,0,0,0.24)] backdrop-blur-xl" aria-label="X32 quick jump">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Quick Jump</span>
              {quickJumpGroups.map((group) => {
                const firstHotspot = hotspots.find((hotspot) => hotspot.type === group.type);
                const active = selectedHotspot?.type === group.type;
                const accent = accentStyles[typeAccent[group.type]];

                return (
                  <button
                    key={group.type}
                    type="button"
                    onClick={() => firstHotspot && setSelectedId(firstHotspot.id)}
                    style={{ "--jump-rgb": accent.rgb, "--jump-border": accent.border } as CSSProperties}
                    className={`focus-ring rounded-xl border px-3 py-2 text-xs font-bold transition ${
                      active
                        ? "border-[var(--jump-border)] bg-[rgb(var(--jump-rgb)/0.22)] text-white shadow-[0_0_18px_rgb(var(--jump-rgb)/0.28)]"
                        : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-[var(--jump-border)] hover:bg-[rgb(var(--jump-rgb)/0.12)]"
                    }`}
                  >
                    {group.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        <InfoPanel hotspot={selectedHotspot} />
      </main>

      <section className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-3">
          <AcademySection section={x32AcademySections[0]} />
          <WorkflowSection />
          <ChurchSetupSection />
          <AcademySection section={x32AcademySections[2]} compact />
        </div>
        <aside className="grid content-start gap-3">
          <ProgressPanel nextLesson={nextLesson} />
          <NextLessonPanel lesson={nextLesson} />
          <RelationshipPanel />
        </aside>
      </section>
    </div>
  );
}

function getAccentByName(accentName: X32Accent) {
  return accentStyles[accentName] ?? accentStyles.violet;
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-300">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-black text-white md:text-2xl">{title}</h2>
      {description ? <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">{description}</p> : null}
    </div>
  );
}

function StatCard({ stat }: { stat: (typeof x32ConsoleMetadata.overviewStats)[number] }) {
  const accent = getAccentByName(stat.accent);

  return (
    <article className="rounded-xl border bg-[#070b16]/88 p-3 shadow-[0_14px_44px_rgba(0,0,0,0.24)]" style={{ borderColor: `rgb(${accent.rgb} / 0.26)` }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl font-black text-white">{stat.value}</p>
          <h2 className={`mt-1 text-[11px] font-black uppercase tracking-[0.16em] ${accent.text}`}>{stat.label}</h2>
        </div>
        <Gauge size={20} className={accent.text} aria-hidden="true" />
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-400">{stat.description}</p>
    </article>
  );
}

function ConsoleOverviewPanel() {
  return (
    <aside className="rounded-xl border border-white/10 bg-[#070b16]/92 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.3)]">
      <SectionTitle eyebrow="Console Overview" title="VBCI X32 Setup" />
      <div className="mt-4 grid gap-2">
        {x32ConsoleMetadata.quickFacts.map((fact) => (
          <div key={fact.label} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{fact.label}</p>
            <p className="mt-1 text-sm font-bold text-slate-100">{fact.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-cyan-300/20 bg-cyan-400/10 p-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
          <Network size={15} aria-hidden="true" />
          Confirmed Livestream Path
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-300">Inputs 1-32 feed the X32 Dante card, Dante Network and Logic Pro. Bus 5/6 remain scene references until verified.</p>
      </div>
      <ul className="mt-4 grid gap-2">
        {x32ConsoleMetadata.accuracyNotes.map((note) => (
          <li key={note} className="flex gap-2 text-xs leading-5 text-slate-300">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function AcademySection({ section, compact = false }: { section: (typeof x32AcademySections)[number]; compact?: boolean }) {
  const lessons = compact ? section.lessons : section.lessons.slice(0, 10);

  return (
    <section className="rounded-xl border border-white/10 bg-[#070b16]/88 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.28)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <SectionTitle eyebrow={section.title} title={section.subtitle} description={section.description} />
        <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300">{lessons.length} shells</span>
      </div>
      <div className={`mt-4 grid gap-3 ${compact ? "md:grid-cols-2 xl:grid-cols-5" : "md:grid-cols-2 xl:grid-cols-5"}`}>
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </section>
  );
}

function LessonCard({ lesson }: { lesson: X32Lesson }) {
  const statusLabel = lesson.status === "future" ? "Coming Soon" : lesson.status === "placeholder" ? "Lesson Shell" : "Available";

  return (
    <article className="flex min-h-[190px] flex-col rounded-xl border border-white/10 bg-white/[0.035] p-3 shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-violet-300/30 bg-violet-500/20 text-sm font-black text-violet-100">{lesson.order}</span>
        <div className="min-w-0">
          <h3 className="text-sm font-black leading-5 text-white">{lesson.title}</h3>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <SmallChip>{lesson.difficulty}</SmallChip>
            <SmallChip>
              <Clock3 size={12} aria-hidden="true" />
              {lesson.estimatedTime}
            </SmallChip>
          </div>
        </div>
      </div>
      <p className="mt-3 flex-1 text-xs leading-5 text-slate-400">{lesson.shortCardDescription}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-0 rounded-full bg-violet-300" />
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{statusLabel}</span>
        <Link href={`/x32/lessons/${lesson.id}`} className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-violet-300/25 bg-violet-500/15 px-2.5 py-1.5 text-xs font-bold text-violet-100 hover:border-violet-200/50 hover:bg-violet-500/24">
          {lesson.status === "future" ? "View" : "Start"}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function WorkflowSection() {
  return (
    <section className="rounded-xl border border-white/10 bg-[#070b16]/88 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.28)]">
      <SectionTitle eyebrow="Service Workflow" title="Sunday Production Flow" description="Workflow shells for preparing, checking, running, monitoring and closing the VBCI production system." />
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {x32WorkflowCards.map((workflow) => (
          <article key={workflow.id} className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
            <div className="flex items-start gap-2">
              <ListChecks size={18} className="shrink-0 text-violet-300" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-black text-white">{workflow.title}</h3>
                <p className="mt-1 text-[11px] font-bold text-cyan-200">{workflow.estimatedTime}</p>
              </div>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{workflow.purpose}</p>
            <PanelMiniList title="Checklist" items={workflow.checklistPreview} />
            <PanelMiniList title="Common Failures" items={workflow.commonFailures} />
          </article>
        ))}
      </div>
    </section>
  );
}

function ChurchSetupSection() {
  return (
    <section className="rounded-xl border border-white/10 bg-[#070b16]/88 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.28)]">
      <SectionTitle eyebrow="Church Setup" title="VBCI Production Infrastructure" description="Compact technical map of the systems connected to the X32 ecosystem." />
      <div className="mt-4 grid gap-3 lg:grid-cols-2 2xl:grid-cols-5">
        {x32ChurchSetupGroups.map((group) => {
          const accent = getAccentByName(group.accent);

          return (
            <article key={group.title} className="rounded-xl border bg-black/20 p-3" style={{ borderColor: `rgb(${accent.rgb} / 0.24)` }}>
              <h3 className={`text-[11px] font-black uppercase tracking-[0.16em] ${accent.text}`}>{group.title}</h3>
              <div className="mt-3 grid gap-2">
                {group.systems.map((system) => (
                  <div key={system.id} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-black text-white">{system.name}</h4>
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-bold text-slate-300">{system.criticality}</span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-slate-300">{system.location}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{system.purpose}</p>
                    <p className="mt-2 text-[11px] leading-5 text-slate-500">Depends on: {system.dependencies.join(", ")}</p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProgressPanel({ nextLesson }: { nextLesson?: X32Lesson }) {
  return (
    <section className="rounded-xl border border-violet-300/20 bg-[#070b16]/92 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.3)]">
      <div className="flex items-start gap-3">
        <ShieldCheck className="text-violet-300" size={22} aria-hidden="true" />
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-300">Your Progress</p>
          <h2 className="mt-1 text-lg font-black text-white">{x32ProgressPlaceholder.title}</h2>
        </div>
      </div>
      <p className="mt-4 text-3xl font-black text-white">{x32ProgressPlaceholder.completed}<span className="text-base text-slate-500"> / {x32ProgressPlaceholder.total}</span></p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-0 rounded-full bg-violet-400" />
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-300">
        <p>Current path: <span className="font-bold text-white">{x32ProgressPlaceholder.currentPath}</span></p>
        <p>Next lesson: <span className="font-bold text-white">{nextLesson?.title ?? "Understanding the Console"}</span></p>
      </div>
    </section>
  );
}

function NextLessonPanel({ lesson }: { lesson?: X32Lesson }) {
  if (!lesson) {
    return null;
  }

  return (
    <section className="rounded-xl border border-white/10 bg-[#070b16]/92 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.3)]">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">Next Lesson</p>
      <h2 className="mt-2 text-xl font-black text-white">{lesson.title}</h2>
      <div className="mt-2 flex flex-wrap gap-2">
        <SmallChip>{lesson.difficulty}</SmallChip>
        <SmallChip>
          <Clock3 size={12} aria-hidden="true" />
          {lesson.estimatedTime}
        </SmallChip>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">{lesson.panelCopy?.whyItMatters ?? lesson.description}</p>
      <Link href={`/x32/lessons/${lesson.id}`} className="focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300/30 bg-violet-600/28 px-4 py-3 text-sm font-black text-violet-50 hover:bg-violet-600/38">
        Start Lesson
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}

function RelationshipPanel() {
  const relationships = [
    { icon: RadioTower, title: "BishopHH", detail: "CH26, DCA 3 Bishop Mics, Preaching workflow, Gain Staging." },
    { icon: Headphones, title: "Stage Monitor A", detail: "Bus 1 through Stage Box A, checked during Sound Check." },
    { icon: Network, title: "Dante to Logic", detail: "Inputs 1-32 through Dante Card, Dante Network and Logic Pro." }
  ];

  return (
    <section className="rounded-xl border border-white/10 bg-[#070b16]/92 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.3)]">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-300">Relationship Map</p>
      <div className="mt-3 grid gap-2">
        {relationships.map((relationship) => {
          const Icon = relationship.icon;

          return (
            <div key={relationship.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-cyan-200" aria-hidden="true" />
                <h3 className="text-sm font-black text-white">{relationship.title}</h3>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{relationship.detail}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PanelMiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{title}</p>
      <ul className="mt-1 grid gap-1">
        {items.slice(0, 3).map((item) => (
          <li key={item} className="flex gap-1.5 text-[11px] leading-4 text-slate-400">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-300" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SmallChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[11px] font-bold text-slate-300">
      {children}
    </span>
  );
}

function InfoPanel({ hotspot }: { hotspot?: Hotspot }) {
  if (!hotspot) {
    return (
      <aside className="rounded-xl border border-white/10 bg-[#070b16]/92 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.34)] xl:sticky xl:top-20 xl:self-start">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-300">Information Panel</p>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          Select any channel, bus, DCA, matrix, effect or master section to learn how it works in the VBCI production environment.
        </p>
        <div className="mt-5 grid gap-2">
          {quickJumpGroups.map((group) => {
            const accent = accentStyles[typeAccent[group.type]];

            return (
              <span key={group.type} className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent.border, boxShadow: `0 0 12px rgb(${accent.rgb} / 0.6)` }} aria-hidden="true" />
                {group.label}
              </span>
            );
          })}
        </div>
      </aside>
    );
  }

  const displayHotspot = getDisplayHotspot(hotspot);
  const items = associatedItems(hotspot);
  const accent = getAccent(hotspot);

  return (
    <aside
      className="rounded-xl border bg-[#070b16]/95 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.34)] xl:sticky xl:top-20 xl:max-h-[calc(100vh-6rem)] xl:self-start xl:overflow-y-auto"
      style={{ borderColor: `rgb(${accent.rgb} / 0.28)` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-[11px] font-black uppercase tracking-[0.18em] ${accent.text}`}>Information Panel</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-white">{formatHotspotName(hotspot)}</h2>
        </div>
        <span className="mt-0.5 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: accent.border, boxShadow: `0 0 18px rgb(${accent.rgb} / 0.85)` }} aria-hidden="true" />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <MetaChip accent={accent}>{typeLabels[hotspot.type]}</MetaChip>
        <MetaChip accent={accent}>{displayHotspot.categoryLabel ?? "Console Operations"}</MetaChip>
      </div>

      <InfoSection label="Type" accent={accent}>
        {typeLabels[hotspot.type]}
      </InfoSection>
      <InfoSection label="Category" accent={accent}>
        {displayHotspot.categoryLabel ?? "Console Operations"}
      </InfoSection>
      <InfoSection label="Purpose" accent={accent}>
        {displayHotspot.purpose}
      </InfoSection>
      <InfoSection label="Routing Summary" accent={accent}>{displayHotspot.routingSummary}</InfoSection>
      <InfoSection label="Associated Items" accent={accent}>{items.length > 0 ? items.join(", ") : "No associated items listed for Sprint 1."}</InfoSection>
      {displayHotspot.verificationNote ? (
        <InfoSection label="Verification Note" accent={accent}>
          <div className="rounded-lg border px-2.5 py-2 text-xs font-semibold leading-5 text-amber-100" style={{ backgroundColor: accentStyles.amber.soft, borderColor: `rgb(${accentStyles.amber.rgb} / 0.34)` }}>
            {displayHotspot.verificationNote}
          </div>
        </InfoSection>
      ) : null}
      {displayHotspot.churchUsage ? <InfoSection label="Church Usage" accent={accent}>{displayHotspot.churchUsage}</InfoSection> : null}
      {displayHotspot.signalPath ? (
        <InfoSection label="Signal Path" accent={accent}>
          <SignalPath items={displayHotspot.signalPath} accent={accent} />
        </InfoSection>
      ) : null}
      {displayHotspot.alsoAvailableTo ? (
        <InfoSection label="Also Available To" accent={accent}>
          <ChipList items={displayHotspot.alsoAvailableTo} accent={accent} />
        </InfoSection>
      ) : null}
      {displayHotspot.contains ? (
        <InfoSection label="Contains" accent={accent}>
          <ChipList items={displayHotspot.contains} accent={accent} />
        </InfoSection>
      ) : null}
      {displayHotspot.feeds ? (
        <InfoSection label="Feeds" accent={accent}>
          <ChipList items={displayHotspot.feeds} accent={accent} />
        </InfoSection>
      ) : null}
      {displayHotspot.usedOn ? (
        <InfoSection label="Used On" accent={accent}>
          <ChipList items={displayHotspot.usedOn} accent={accent} />
        </InfoSection>
      ) : null}
      {displayHotspot.usedDuring ? (
        <InfoSection label="Used During" accent={accent}>
          <ChipList items={displayHotspot.usedDuring} accent={accent} />
        </InfoSection>
      ) : null}
      {displayHotspot.systemRole ? <InfoSection label="System Role" accent={accent}>{displayHotspot.systemRole}</InfoSection> : null}
      {displayHotspot.whatToCheck ? (
        <InfoSection label={hotspot.type === "dca" ? "What To Check" : "What To Check First"} accent={accent}>
          <NumberedList items={displayHotspot.whatToCheck} accent={accent} />
        </InfoSection>
      ) : null}
      <InfoSection label="Common Issues" accent={accent}>
        <PanelList items={displayHotspot.commonIssues} accent={accent} />
      </InfoSection>
      <InfoSection label="Related Training" accent={accent}>
        <ChipList items={displayHotspot.trainingLinks} accent={accent} />
      </InfoSection>
    </aside>
  );
}

function InfoSection({ label, children, accent = accentStyles.violet }: { label: string; children: ReactNode; accent?: (typeof accentStyles)[string] }) {
  return (
    <section className="mt-3 border-t border-white/10 pt-3">
      <h3 className={`text-[11px] font-black uppercase tracking-[0.16em] ${accent.text}`}>{label}</h3>
      <div className="mt-1.5 text-sm leading-5 text-slate-300">{children}</div>
    </section>
  );
}

function PanelList({ items, accent }: { items: string[]; accent: (typeof accentStyles)[string] }) {
  return (
    <ul className="grid gap-1.5 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent.border }} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items, accent }: { items: string[]; accent: (typeof accentStyles)[string] }) {
  return (
    <ol className="grid gap-1.5">
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-2">
          <span
            className="grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10px] font-black text-white"
            style={{ backgroundColor: accent.soft, border: `1px solid rgb(${accent.rgb} / 0.38)` }}
          >
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function SignalPath({ items, accent }: { items: string[]; accent: (typeof accentStyles)[string] }) {
  return (
    <ol className="grid gap-1.5">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: accent.border, boxShadow: `0 0 10px rgb(${accent.rgb} / 0.55)` }} aria-hidden="true" />
          <span className="min-w-0 rounded-lg border border-white/10 bg-white/[0.035] px-2 py-1 text-xs font-semibold text-slate-200">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function ChipList({ items, accent }: { items: string[]; accent: (typeof accentStyles)[string] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="rounded-lg border px-2 py-1 text-xs font-bold text-slate-100" style={{ backgroundColor: accent.soft, borderColor: `rgb(${accent.rgb} / 0.35)` }}>
          {item}
        </span>
      ))}
    </div>
  );
}

function MetaChip({ children, accent }: { children: ReactNode; accent: (typeof accentStyles)[string] }) {
  return (
    <span className="rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-100" style={{ backgroundColor: accent.soft, borderColor: `rgb(${accent.rgb} / 0.42)` }}>
      {children}
    </span>
  );
}

function useSelectedHotspot() {
  return useState<string | undefined>("ch-26");
}
