"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  FileText,
  Headphones,
  Lock,
  Mic2,
  MonitorSpeaker,
  Network,
  Play,
  RadioTower,
  Settings2,
  SlidersHorizontal,
  StickyNote,
  Trophy,
  Zap
} from "lucide-react";
import type { ChannelViewState, LessonExperience, LessonTab as LessonTabModel, SignalFaultScenario, SignalFlowNode, SignalNodeState } from "@/lib/types";

type MissionFeedback = { tone: "success" | "hint"; message: string } | null;

const tabIcons: Record<LessonTabModel["id"], ComponentType<{ size?: number; className?: string }>> = {
  overview: BookOpen,
  simulator: SlidersHorizontal,
  listening: Headphones,
  setup: RadioTower,
  sop: FileText,
  notes: StickyNote
};

const stateClasses: Record<SignalNodeState, { node: string; label: string; icon: ReactNode; line: string }> = {
  OK: {
    node: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100 shadow-[0_0_28px_rgba(16,185,129,0.18)]",
    label: "text-emerald-300",
    icon: <CheckCircle2 size={17} />,
    line: "from-cyan-400 via-violet-400 to-emerald-400"
  },
  Fault: {
    node: "border-red-400/60 bg-red-500/15 text-red-100 shadow-[0_0_34px_rgba(239,68,68,0.25)]",
    label: "text-red-300",
    icon: <AlertTriangle size={17} />,
    line: "from-red-500 via-red-400 to-red-300"
  },
  Unknown: {
    node: "border-amber-300/45 bg-amber-400/10 text-amber-100 shadow-[0_0_24px_rgba(245,158,11,0.14)]",
    label: "text-amber-300",
    icon: <Circle size={17} />,
    line: "from-amber-400 via-violet-400 to-cyan-400"
  },
  Disabled: {
    node: "border-slate-600/70 bg-slate-900/60 text-slate-400",
    label: "text-slate-500",
    icon: <Lock size={17} />,
    line: "from-slate-700 via-slate-700 to-slate-700"
  }
};

export function LessonExperienceShell({ experience }: { experience: LessonExperience }) {
  const firstFault = experience.faultScenarios[0] ?? createFallbackFault(experience.nodes[0]?.id ?? "source");
  const firstTab = experience.tabs[0] ?? createFallbackTab();
  const [activeTab, setActiveTab] = useState<LessonTabModel["id"]>("simulator");
  const [activeFault, setActiveFault] = useState<SignalFaultScenario>(firstFault);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<MissionFeedback>(null);

  const resolvedNodes = useMemo(() => resolveNodeStates(experience.nodes, activeFault), [experience.nodes, activeFault]);
  const currentTab = experience.tabs.find((tab) => tab.id === activeTab) ?? firstTab;

  function selectFault(fault: SignalFaultScenario) {
    setActiveFault(fault);
    setSelectedNodeId(null);
    setFeedback(null);
  }

  function answerMission(nodeId: string) {
    setSelectedNodeId(nodeId);
    if (nodeId === activeFault.faultNodeId) {
      setFeedback({ tone: "success", message: experience.mission.success });
      return;
    }
    setFeedback({ tone: "hint", message: activeFault.hint });
  }

  return (
    <section className="sound-simulator relative min-h-screen overflow-hidden border border-white/10 bg-[#02050c] text-white shadow-[0_0_90px_rgba(0,0,0,0.7)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.24),transparent_30rem),radial-gradient(circle_at_88%_8%,rgba(14,165,233,0.16),transparent_28rem),linear-gradient(180deg,rgba(2,6,14,0.98),rgba(3,8,18,0.96))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      <div className="relative grid min-h-screen gap-0 2xl:grid-cols-[280px_minmax(0,1fr)_380px]">
        <LessonSidebar experience={experience} />
        <main className="min-w-0 border-white/10 px-3 py-3 sm:px-5 2xl:border-x">
          <LessonTopBar experience={experience} />
          <LessonHeader experience={experience} />
          <LessonTabs tabs={experience.tabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="mt-3 grid gap-3">
            {activeTab === "simulator" ? (
              <SignalFlowSimulator nodes={resolvedNodes} activeFault={activeFault} />
            ) : (
              <TabContent tab={currentTab} experience={experience} />
            )}
            <MissionFaultFinder
              experience={experience}
              nodes={resolvedNodes}
              activeFault={activeFault}
              selectedNodeId={selectedNodeId}
              feedback={feedback}
              onSelect={answerMission}
            />
          </div>
          <LessonBottomNav experience={experience} />
        </main>
        <aside className="grid content-start gap-3 border-t border-white/10 p-3 sm:p-5 2xl:border-t-0">
          <CertificationProgressCard experience={experience} />
          <X32ChannelViewPanel channel={experience.channelView} fault={activeFault} />
          <FaultInjectionPanel scenarios={experience.faultScenarios} activeFault={activeFault} onSelect={selectFault} />
          <SignalStatusPanel nodes={resolvedNodes} activeFault={activeFault} />
        </aside>
      </div>
    </section>
  );
}

export function LessonSidebar({ experience }: { experience: LessonExperience }) {
  return (
    <aside className="hidden min-h-full border-r border-white/10 bg-black/45 p-3 backdrop-blur-2xl 2xl:block">
      <Link href="/academy" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/20 text-violet-200 shadow-[0_0_22px_rgba(168,85,247,0.25)]">
          <Activity size={19} />
        </span>
        <span>
          <span className="block text-sm font-black uppercase tracking-[0.12em]">Sound Academy</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">By Sound Platform</span>
        </span>
      </Link>

      <div className="mt-4 rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-500/15 to-cyan-500/5 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">{experience.academyTitle}</p>
        <h2 className="mt-2 text-lg font-black leading-tight">{experience.moduleTitle}</h2>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${experience.progress}%` }} />
        </div>
        <p className="mt-2 flex justify-between text-xs text-slate-400"><span>Your progress</span><span>{experience.progress}%</span></p>
      </div>

      <nav className="mt-4 grid gap-1.5" aria-label="Lesson list">
        {experience.sidebarLessons.map((lesson, index) => {
          const active = lesson.status === "Active";
          return (
            <Link
              key={lesson.slug}
              href={`/lessons/${lesson.slug}`}
              className={`group grid grid-cols-[30px_1fr_auto] items-center gap-2 rounded-xl border px-2.5 py-2 text-sm transition ${
                active ? "border-violet-400/60 bg-violet-600/30 text-white shadow-[0_0_22px_rgba(124,58,237,0.18)]" : "border-white/10 bg-white/[0.025] text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-300/10"
              }`}
            >
              <span className={`grid h-7 w-7 place-items-center rounded-lg text-xs font-black ${active ? "bg-violet-500 text-white" : "bg-white/10 text-slate-300"}`}>{index + 1}</span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-bold">{lesson.title}</span>
                <span className="text-xs text-slate-500">{lesson.duration} min</span>
              </span>
              {lesson.status === "Complete" ? <CheckCircle2 className="text-emerald-300" size={16} /> : lesson.status === "Locked" ? <Lock className="text-slate-500" size={16} /> : <Circle className="text-violet-300" size={14} />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/5 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Course Resources</p>
        <div className="mt-3 grid gap-2 text-xs text-slate-300">
          <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">Church signal map</span>
          <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">SOP checklist</span>
          <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">Mentor rubric</span>
        </div>
      </div>
    </aside>
  );
}

export function LessonTopBar({ experience }: { experience: LessonExperience }) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/10 px-1 pb-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Link href="/academy" className="hover:text-white">Academy</Link>
        <ChevronRight size={14} />
        <span>{experience.academyTitle}</span>
        <ChevronRight size={14} />
        <span className="font-bold text-white">{experience.title}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-orange-400/25 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-200">12 day streak</span>
        <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">+{experience.xpReward} XP</span>
        <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-100">Lesson {experience.lessonNumber} of {experience.totalLessons}</span>
      </div>
    </div>
  );
}

export function LessonHeader({ experience }: { experience: LessonExperience }) {
  return (
    <header className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.20),transparent_28rem),linear-gradient(90deg,rgba(15,23,42,0.44),rgba(2,6,23,0.88))]" />
      <div className="absolute right-0 top-5 hidden h-24 w-1/2 opacity-55 lg:block">
        <WaveformStrip />
      </div>
      <div className="relative grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <span className="inline-flex rounded-md bg-violet-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">Lesson {experience.lessonNumber} of {experience.totalLessons}</span>
          <h1 className="mt-3 text-3xl font-black leading-none tracking-tight md:text-5xl">{experience.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{experience.objective}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <HeaderPill icon={<Clock size={15} />} text={`${experience.estimatedMinutes} min`} />
            <HeaderPill icon={<SlidersHorizontal size={15} />} text="Simulator" />
            <HeaderPill icon={<Trophy size={15} />} text={`${experience.xpReward} XP`} />
            <HeaderPill icon={<Zap size={15} />} text={experience.difficulty} />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-2">
          {experience.heroAsset ? (
            <Image src={experience.heroAsset.src} alt={experience.heroAsset.title} width={experience.heroAsset.width} height={experience.heroAsset.height} className="h-44 w-full rounded-xl object-cover object-top opacity-95" priority />
          ) : (
            <div className="grid h-44 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10">
              <Play className="text-violet-200" size={42} />
            </div>
          )}
          <div className="absolute inset-x-2 bottom-2 rounded-b-xl bg-gradient-to-t from-black/85 to-transparent p-3">
            <p className="text-xs font-bold text-white">{experience.heroAsset?.title ?? experience.moduleTitle}</p>
            <p className="mt-1 line-clamp-1 text-[10px] text-slate-300">{experience.heroAsset?.sourceName ?? "Sound Academy simulator"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderPill({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs font-bold text-slate-200">
      <span className="text-violet-300">{icon}</span>
      {text}
    </span>
  );
}

export function LessonTabs({ tabs, activeTab, onChange }: { tabs: LessonTabModel[]; activeTab: LessonTabModel["id"]; onChange: (tab: LessonTabModel["id"]) => void }) {
  return (
    <div className="mt-3 flex gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/35 p-1.5">
      {tabs.map((tab) => {
        const Icon = tabIcons[tab.id];
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-black uppercase tracking-[0.06em] transition ${
              active ? "bg-violet-600 text-white shadow-[0_0_24px_rgba(124,58,237,0.3)]" : "text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function TabContent({ tab, experience }: { tab: LessonTabModel; experience: LessonExperience }) {
  const assets = experience.visualAssets ?? [];
  return (
    <article className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">{tab.label}</p>
        <h2 className="mt-2 text-3xl font-black">{tab.title}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">{tab.body}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
        {tab.bullets.map((bullet) => (
          <div key={bullet} className="flex gap-3 rounded-xl border border-white/10 bg-black/30 p-3 text-sm leading-6 text-slate-200">
            <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} />
            <span>{bullet}</span>
          </div>
        ))}
        </div>
        {experience.trainingCards?.length ? (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {experience.trainingCards.slice(0, 3).map((card) => (
              <section key={card.title} className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-3">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">{card.eyebrow}</p>
                <h3 className="mt-1 font-black">{card.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">{card.body}</p>
              </section>
            ))}
          </div>
        ) : null}
      </section>
      <aside className="grid gap-3">
        {assets.slice(0, 2).map((asset) => (
          <figure key={asset.slug} className="overflow-hidden rounded-2xl border border-white/10 bg-black/35">
            <Image src={asset.src} alt={asset.title} width={asset.width} height={asset.height} className="h-40 w-full object-cover object-top" />
            <figcaption className="p-3">
              <p className="text-sm font-black">{asset.title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{asset.purpose}</p>
            </figcaption>
          </figure>
        ))}
        {experience.referenceAsset ? (
          <figure className="overflow-hidden rounded-2xl border border-violet-400/25 bg-violet-500/10">
            <Image src={experience.referenceAsset.src} alt={experience.referenceAsset.title} width={experience.referenceAsset.width} height={experience.referenceAsset.height} className="h-44 w-full object-cover object-top" />
            <figcaption className="p-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">Design target</p>
              <p className="mt-1 text-sm font-black">{experience.referenceAsset.title}</p>
            </figcaption>
          </figure>
        ) : null}
      </aside>
    </article>
  );
}

function WaveformStrip() {
  return (
    <div className="flex h-full items-center gap-1 overflow-hidden">
      {Array.from({ length: 74 }).map((_, index) => (
        <span
          key={index}
          className="w-1 rounded-full bg-gradient-to-t from-violet-700 via-violet-400 to-cyan-300 opacity-70"
          style={{ height: `${18 + Math.abs(Math.sin(index * 0.47)) * 72}px` }}
        />
      ))}
      </div>
  );
}

export function SignalFlowSimulator({ nodes, activeFault }: { nodes: SignalFlowNode[]; activeFault: SignalFaultScenario }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#050a14]/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Interactive Signal Flow Simulator</p>
          <h2 className="mt-1 text-2xl font-black">Trace the live signal path</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{activeFault.symptom}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-200">
          <AlertTriangle size={14} />
          Fault loaded
        </span>
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_230px]">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-4">
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>
          <div className="relative grid gap-3 lg:grid-cols-7">
            {nodes.map((node, index) => (
              <div key={node.id} className="relative min-w-0">
                <SignalNode node={node} />
                {index < nodes.length - 1 ? (
                  <div className={`mx-auto my-2 h-1 w-16 rounded-full bg-gradient-to-r ${stateClasses[node.state].line} lg:absolute lg:-right-7 lg:top-1/2 lg:mx-0 lg:my-0 lg:w-12 lg:-translate-y-1/2`} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-violet-400/25 bg-violet-500/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">Live Readout</p>
          <div className="mt-4 grid gap-3">
            <MeterRow label="Input Meter" value={nodes[0]?.meterValue ?? 0} />
            <MeterRow label="X32 Channel" value={nodes.find((node) => node.id === "x32")?.meterValue ?? 0} />
            <MeterRow label="Stream Output" value={nodes[nodes.length - 1]?.meterValue ?? 0} />
          </div>
          <p className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-xs leading-5 text-cyan-100">Watch the meters from left to right. The first failed checkpoint is usually the safest place to investigate.</p>
        </div>
      </div>
    </article>
  );
}

export function SignalNode({ node }: { node: SignalFlowNode }) {
  const classes = stateClasses[node.state];
  const NodeIcon = getSignalNodeIcon(node.id);
  return (
    <section className={`min-h-[164px] rounded-2xl border p-3 transition ${classes.node}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-black/40 text-cyan-100">
          <NodeIcon size={19} />
        </span>
        <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.14em] ${classes.label}`}>
          {classes.icon}
          {node.state}
        </span>
      </div>
      <h3 className="mt-3 text-sm font-black leading-tight">{node.label}</h3>
      <p className="mt-2 min-h-12 text-[11px] leading-4 text-slate-300">{node.detail}</p>
      <MeterRow label="Meter" value={node.meterValue} compact />
    </section>
  );
}

function getSignalNodeIcon(nodeId: string): ComponentType<{ size?: number; className?: string }> {
  if (nodeId.includes("source")) return Mic2;
  if (nodeId.includes("receiver")) return RadioTower;
  if (nodeId.includes("x32") || nodeId.includes("bus")) return SlidersHorizontal;
  if (nodeId.includes("dante")) return Network;
  if (nodeId.includes("logic")) return Activity;
  if (nodeId.includes("encoder")) return MonitorSpeaker;
  return Circle;
}

function MeterRow({ label, value, compact = false }: { label: string; value: number; compact?: boolean }) {
  return (
    <div className={compact ? "mt-3" : ""}>
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${value > 70 ? "bg-gradient-to-r from-emerald-400 via-yellow-300 to-red-400" : value > 0 ? "bg-gradient-to-r from-cyan-400 to-emerald-400" : "bg-slate-700"}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function FaultInjectionPanel({ scenarios, activeFault, onSelect }: { scenarios: SignalFaultScenario[]; activeFault: SignalFaultScenario; onSelect: (fault: SignalFaultScenario) => void }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-red-300">Fault Injection</p>
      <h2 className="mt-1 text-lg font-black">Choose a live-service fault</h2>
      <div className="mt-4 grid gap-2">
        {scenarios.map((scenario) => {
          const active = scenario.id === activeFault.id;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario)}
              className={`rounded-xl border p-3 text-left transition ${
                active ? "border-red-400/55 bg-red-500/15 text-white shadow-[0_0_22px_rgba(239,68,68,0.16)]" : "border-white/10 bg-black/25 text-slate-300 hover:border-violet-400/40 hover:bg-violet-500/10"
              }`}
            >
              <span className="block text-sm font-black">{scenario.label}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">{scenario.description}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function X32ChannelViewPanel({ channel, fault }: { channel: ChannelViewState; fault: SignalFaultScenario }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">X32 Channel View</p>
          <h2 className="mt-1 text-lg font-black">{channel.channelName}</h2>
        </div>
        <Settings2 className="text-violet-300" size={20} />
      </div>
      <div className="mt-4 grid grid-cols-[82px_1fr] gap-2 text-xs">
        <ChannelRow label="Input" value={channel.input} />
        <ChannelRow label="Gain" value={channel.gain} />
        <ChannelRow label="HPF" value={channel.hpf} />
        <ChannelRow label="Route" value={channel.route} />
        <ChannelRow label="DCA" value={channel.dca} />
      </div>
      <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 p-3">
        <p className="text-xs font-bold text-red-200">Current symptom</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">{fault.symptom}</p>
      </div>
      <div className="mt-4 grid grid-cols-8 items-end gap-1 rounded-xl border border-white/10 bg-black/25 p-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="rounded-t bg-gradient-to-t from-emerald-500 via-yellow-400 to-red-500" style={{ height: `${22 + index * 6}px`, opacity: index % 3 === 0 ? 0.35 : 0.85 }} />
        ))}
      </div>
    </section>
  );
}

function ChannelRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="rounded-lg bg-black/25 px-2 py-2 font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
      <span className="rounded-lg border border-white/10 bg-white/[0.035] px-2 py-2 text-slate-200">{value}</span>
    </>
  );
}

export function SignalStatusPanel({ nodes, activeFault }: { nodes: SignalFlowNode[]; activeFault: SignalFaultScenario }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Signal Status</p>
      <h2 className="mt-1 text-lg font-black">Checkpoint health</h2>
      <div className="mt-4 grid gap-2">
        {nodes.map((node) => (
          <div key={node.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 p-3">
            <div>
              <p className="text-sm font-bold">{node.label}</p>
              <p className="text-xs text-slate-500">{node.detail}</p>
            </div>
            <span className={`rounded-full border px-2 py-1 text-[10px] font-black uppercase ${node.state === "Fault" ? "border-red-400/40 bg-red-500/10 text-red-200" : node.state === "OK" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-amber-400/30 bg-amber-400/10 text-amber-200"}`}>{node.state}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-violet-400/20 bg-violet-500/10 p-3">
        <p className="text-xs font-bold text-violet-200">Recommended fix</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">{activeFault.fix}</p>
      </div>
    </section>
  );
}

export function MissionFaultFinder({
  experience,
  nodes,
  activeFault,
  selectedNodeId,
  feedback,
  onSelect
}: {
  experience: LessonExperience;
  nodes: SignalFlowNode[];
  activeFault: SignalFaultScenario;
  selectedNodeId: string | null;
  feedback: MissionFeedback;
  onSelect: (nodeId: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">Mission Fault Finder</p>
          <h2 className="mt-1 text-2xl font-black">{experience.mission.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{experience.mission.prompt}</p>
        </div>
        <span className="rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-200">{activeFault.label}</span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-7">
        {nodes.map((node) => {
          const selected = selectedNodeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelect(node.id)}
              className={`min-h-24 rounded-xl border p-3 text-left transition ${
                selected ? "border-violet-400 bg-violet-500/20 text-white" : "border-white/10 bg-black/20 text-slate-300 hover:border-cyan-300/40 hover:bg-cyan-300/10"
              }`}
            >
              <span className="text-xs font-black">{node.label}</span>
              <span className="mt-1 block text-[11px] leading-4 text-slate-500">{node.detail}</span>
            </button>
          );
        })}
      </div>
      {feedback ? (
        <div className={`mt-3 rounded-xl border p-4 text-sm leading-6 ${feedback.tone === "success" ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-100" : "border-amber-400/35 bg-amber-400/10 text-amber-100"}`}>
          {feedback.message}
        </div>
      ) : null}
    </section>
  );
}

export function CertificationProgressCard({ experience }: { experience: LessonExperience }) {
  return (
    <section className="rounded-2xl border border-violet-400/25 bg-violet-500/10 p-4">
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 place-items-center rounded-full" style={{ background: `conic-gradient(#8b5cf6 ${experience.progress * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}>
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#060b16] text-sm font-black">{experience.progress}%</div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">Certification Progress</p>
          <h2 className="mt-1 text-lg font-black">{experience.academyTitle}</h2>
          <p className="mt-1 text-xs text-slate-400">Lesson {experience.lessonNumber} of {experience.totalLessons}</p>
        </div>
      </div>
    </section>
  );
}

export function LessonBottomNav({ experience }: { experience: LessonExperience }) {
  return (
    <footer className="sticky bottom-2 z-10 mt-3 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/55 p-3 backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
      <Link href="/academy" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-bold text-slate-200 hover:bg-white/10">
        <ChevronLeft size={16} />
        Previous Lesson
      </Link>
      <div className="min-w-0 flex-1 px-4 text-center">
        <p className="text-xs text-slate-500">Lesson {experience.lessonNumber} of {experience.totalLessons}</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${experience.progress}%` }} />
        </div>
      </div>
      <Link href="/sound-lab" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-black text-white shadow-[0_0_28px_rgba(124,58,237,0.35)] hover:bg-violet-500">
        Next: Listening Lab
        <ArrowRight size={16} />
      </Link>
    </footer>
  );
}

function resolveNodeStates(nodes: SignalFlowNode[], activeFault: SignalFaultScenario): SignalFlowNode[] {
  const faultIndex = nodes.findIndex((node) => node.id === activeFault.faultNodeId);
  return nodes.map((node, index) => {
    if (faultIndex === -1) {
      return { ...node, state: node.state, meterValue: node.meterValue };
    }
    if (index < faultIndex) {
      return { ...node, state: "OK", meterValue: Math.max(node.meterValue, 68) };
    }
    if (index === faultIndex) {
      return { ...node, state: "Fault", meterValue: Math.min(node.meterValue, 8) };
    }
    return { ...node, state: index === faultIndex + 1 ? "Unknown" : "Disabled", meterValue: 0 };
  });
}

function createFallbackFault(faultNodeId: string): SignalFaultScenario {
  return {
    id: "fallback-fault",
    label: "Signal stopped",
    description: "A generic fault for this training path.",
    faultNodeId,
    symptom: "Signal is not reaching the expected output.",
    hint: "Start at the first checkpoint and move downstream one point at a time.",
    fix: "Restore the first failed checkpoint, then verify every downstream destination."
  };
}

function createFallbackTab(): LessonTabModel {
  return {
    id: "overview",
    label: "Overview",
    title: "Lesson overview",
    body: "Use the simulator to trace the signal path and identify the first failed checkpoint.",
    bullets: ["Confirm source.", "Check the console.", "Verify the destination."]
  };
}
