import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, CircleHelp, Download, Quote, Search, Wifi } from "lucide-react";

type MetricTone = "purple" | "blue" | "teal";

type Metric = {
  title: string;
  value: string;
  label: string;
  detail: string;
  action: string;
  href: string;
  progress: number;
  tone: MetricTone;
};

type HealthRow = {
  name: string;
  icon: string;
};

const metrics: Metric[] = [
  {
    title: "Service Readiness",
    value: "92%",
    label: "Almost Ready",
    detail: "5 of 6 checks complete",
    action: "View Checklist",
    href: "/service-mode",
    progress: 92,
    tone: "purple"
  },
  {
    title: "Training Progress",
    value: "68%",
    label: "Level 7",
    detail: "X32 Foundations",
    action: "Continue Learning",
    href: "/academy",
    progress: 68,
    tone: "blue"
  },
  {
    title: "Dante Health",
    value: "100%",
    label: "Excellent",
    detail: "All devices online",
    action: "View Dante Map",
    href: "/dante",
    progress: 100,
    tone: "teal"
  },
  {
    title: "Livestream Mix",
    value: "-18",
    label: "On Target",
    detail: "Headroom good",
    action: "Open Logic Stream",
    href: "/logic-stream",
    progress: 78,
    tone: "purple"
  }
];

const healthRows: HealthRow[] = [
  { name: "X32 Console", icon: "/dashboard-assets/health-x32-console.png" },
  { name: "Dante Network", icon: "/dashboard-assets/health-dante-network.png" },
  { name: "Logic Stream Mix", icon: "/dashboard-assets/health-logic-stream.png" },
  { name: "YouTube Output", icon: "/dashboard-assets/health-youtube-output.png" },
  { name: "Wireless Mics", icon: "/dashboard-assets/health-wireless-mic.png" },
  { name: "Recording Chain", icon: "/dashboard-assets/health-recording-chain.png" }
];

const schedule = [
  { time: "9:00 AM", title: "Setup & Line Check", status: "Upcoming" },
  { time: "12:30 PM", title: "Sound Check", status: "Upcoming" },
  { time: "2:15 PM", title: "Worship Service", status: "In Progress", active: true },
  { time: "5:00 PM", title: "Debrief & Shutdown", status: "Upcoming" }
];

const activity = [
  { initials: "MT", name: "Michael T.", text: "completed Dante Basics", time: "2h ago", tone: "blue" },
  { initials: "You", name: "You", text: "completed X32 EQ Deep Dive", time: "3h ago", tone: "slate" },
  { initials: "SP", name: "Sarah P.", text: "passed Drum Mic Challenge", time: "5h ago", tone: "purple" },
  { initials: "DW", name: "Daniel W.", text: "joined the team", time: "Yesterday", tone: "violet" }
];

const faults = [
  { title: "No Sound from Stage Box", detail: "Check Dante connection & clock" },
  { title: "Low Livestream Level", detail: "Check Logic gain staging" },
  { title: "Feedback / Howling", detail: "Run feedback killer & check mics" }
];

const ringGradient = {
  purple: ["#8B5CF6", "#D946EF"],
  blue: ["#3B82F6", "#60A5FA"],
  teal: ["#2DD4BF", "#34D399"]
} satisfies Record<MetricTone, [string, string]>;

const dashboardType = {
  heroTitle: "text-4xl font-black tracking-tight text-white md:text-7xl md:leading-none",
  heroBody: "text-lg leading-8 text-slate-100",
  cardTitle: "text-lg font-black text-white",
  featureTitle: "text-3xl font-black tracking-tight text-white",
  eyebrow: "text-sm font-black uppercase tracking-[0.2em]",
  body: "text-sm leading-6 text-slate-200",
  microLabel: "text-xs font-black uppercase tracking-[0.16em]"
};

const panelSurface =
  "border border-white/10 bg-black/30 shadow-[0_22px_52px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)]";

const primaryLearningCta =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 text-sm font-black text-white shadow-[0_0_34px_rgba(139,92,246,0.46)] transition hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(139,92,246,0.56)]";

function DashboardCard({
  children,
  className = "",
  label
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section className={`relative overflow-hidden rounded-[22px] border border-slate-500/40 bg-[linear-gradient(145deg,rgba(17,28,50,0.74),rgba(5,10,22,0.92))] shadow-[0_28px_88px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl ${className}`}>
      <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.62),rgba(139,92,246,0.2)_44%,transparent_72%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%,transparent_72%,rgba(59,130,246,0.03))]" aria-hidden="true" />
      {label ? (
        <span className="absolute -left-3 -top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.58)]">
          {label}
        </span>
      ) : null}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
      {children}
    </section>
  );
}

function ProgressRing({ value, text, tone, sub }: { value: number; text: string; tone: MetricTone; sub?: string }) {
  const [start, end] = ringGradient[tone];
  const gradientId = `ring-${tone}-${value}`;
  const radius = 43;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-[116px] w-[116px] shrink-0">
      <svg viewBox="0 0 112 112" className="h-full w-full -rotate-90" role="img" aria-label={`${text} ${value}%`}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>
        </defs>
        <circle cx="56" cy="56" r={radius} fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="8" />
        <circle cx="56" cy="56" r={radius} fill="none" stroke={`url(#${gradientId})`} strokeLinecap="round" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} className="drop-shadow-[0_0_16px_rgba(168,85,247,0.72)]" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-3xl font-black tracking-tight text-white">{text}</p>
          {sub ? <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{sub}</p> : null}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ metric, label }: { metric: Metric; label: string }) {
  const actionTone =
    metric.tone === "teal" ? "text-cyan-300" : metric.tone === "blue" ? "text-blue-300" : "text-fuchsia-300";

  return (
    <DashboardCard label={label} className="min-h-[224px] p-5">
      <h2 className={dashboardType.cardTitle}>{metric.title}</h2>
      <div className="mt-4 flex items-center gap-4">
        <ProgressRing value={metric.progress} text={metric.value} tone={metric.tone} sub={metric.title === "Livestream Mix" ? "LUFS" : undefined} />
        <div className="min-w-0 flex-1">
          <p className={`text-xl font-black leading-8 ${actionTone}`}>{metric.label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{metric.detail}</p>
        </div>
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <Link href={metric.href} className={`inline-flex items-center gap-2 text-sm font-bold ${actionTone}`}>
          {metric.action}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </DashboardCard>
  );
}

function HealthStatusRow({ row }: { row: HealthRow }) {
  return (
    <div className="grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-3.5 py-3.5">
      <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white/[0.04]">
        <Image src={row.icon} alt="" fill sizes="40px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-base font-black text-white">{row.name}</p>
        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-300">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.65)]" />
          Online
        </p>
      </div>
      <span className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-sm font-bold text-emerald-300">Healthy</span>
    </div>
  );
}

function ContinueLearningCard() {
  return (
    <DashboardCard label="5" className="p-5 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch">
        <div className={`relative min-h-[316px] overflow-hidden rounded-3xl ${panelSurface}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_68%,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_76%_24%,rgba(217,70,239,0.16),transparent_38%)]" />
          <Image src="/dashboard-assets/x32-hero.png" alt="X32 console training graphic" fill sizes="(max-width: 768px) 100vw, 560px" className="scale-[1.05] object-cover object-[52%_50%]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.01),rgba(2,6,23,0.22)_34%,rgba(2,6,23,0.7)_100%)]" />
          <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Current Lesson</p>
            <p className="mt-1 text-lg font-black text-white">X32 Foundations</p>
          </div>
        </div>
        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div>
            <p className={`${dashboardType.eyebrow} text-violet-300`}>Continue Learning</p>
            <h2 className={`mt-3 ${dashboardType.featureTitle}`}>EQ Deep Dive</h2>
            <p className={`mt-3 max-w-xl ${dashboardType.body}`}>Learn how to shape your mix with confidence using the X32 channel EQ, subtractive moves, and real service listening checks.</p>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-700/80">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 shadow-[0_0_16px_rgba(139,92,246,0.55)]" />
              </div>
              <span className="text-sm font-bold text-slate-100">75% complete</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Next: feedback notch", "12 min left", "+250 XP"].map((item) => (
                <span key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  {item}
                </span>
              ))}
            </div>
            <Link href="/lessons/x32-navigation" className={`mt-5 ${primaryLearningCta}`}>
              Continue Lesson
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

function UpNextSoundLabCard() {
  return (
    <DashboardCard label="6" className="p-5 md:p-6">
      <div className="flex h-full flex-col justify-between gap-4">
        <div className={`relative h-60 overflow-hidden rounded-3xl ${panelSurface}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_54%_76%,rgba(139,92,246,0.17),transparent_32%)]" />
          <Image src="/dashboard-assets/sound-lab-flask.png" alt="Sound Lab flask graphic" fill sizes="(max-width: 768px) 100vw, 360px" className="scale-[1.2] object-cover object-center drop-shadow-[0_0_18px_rgba(96,165,250,0.16)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.22)_48%,rgba(2,6,23,0.82)_100%)]" />
        </div>
        <div>
          <p className={`${dashboardType.eyebrow} text-cyan-300`}>Up Next - Sound Lab</p>
          <h3 className={`mt-2 ${dashboardType.featureTitle}`}>Drum Mic Challenge</h3>
          <p className={`mt-2 ${dashboardType.body}`}>Practice drum mic balance before the next live service.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`${dashboardType.microLabel} rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.08)]`}>Intermediate</span>
          <span className={`${dashboardType.microLabel} rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-slate-100`}>25 min</span>
        </div>
        <Link href="/sound-lab" className={primaryLearningCta}>
          Start Drill
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </DashboardCard>
  );
}

function SystemHealthPanel() {
  return (
    <DashboardCard label="7" className="p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-white">System Health</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Sunday signal chain readiness at a glance.</p>
        </div>
        <span className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-sm font-black text-emerald-300">All Online</span>
      </div>
      <div className="mt-4 grid gap-2.5">
        {healthRows.map((row) => (
          <HealthStatusRow key={row.name} row={row} />
        ))}
      </div>
      <Link href="/dante" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-300">
        View System Details
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </DashboardCard>
  );
}

function ScheduleTimeline() {
  return (
    <DashboardCard label="8" className="p-5">
      <h2 className="text-lg font-black text-white">Today&apos;s Schedule</h2>
      <div className="mt-5 space-y-1">
        {schedule.map((item, index) => (
          <div key={item.time} className="grid min-h-10 grid-cols-[22px_64px_1fr_auto] items-center gap-3">
            <div className="relative flex h-10 items-center justify-center">
              <span className={`z-10 h-3.5 w-3.5 rounded-full ${item.active ? "h-6 w-6 border border-emerald-300 bg-slate-950 shadow-[0_0_16px_rgba(45,212,191,0.5)]" : "bg-indigo-300"}`}>
                {item.active ? <span className="mx-auto mt-[6px] block h-2 w-2 rounded-full bg-emerald-300" /> : null}
              </span>
              {index < schedule.length - 1 ? <span className="absolute bottom-0 top-1/2 w-px bg-indigo-300/40" /> : null}
            </div>
            <p className={`text-sm font-black ${item.active ? "text-emerald-300" : "text-white"}`}>{item.time}</p>
            <p className="truncate text-sm font-semibold text-slate-100">{item.title}</p>
            <span className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold ${item.active ? "bg-emerald-400/12 text-emerald-300" : "bg-slate-700/45 text-indigo-200"}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
      <Link href="/service-mode" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-300">
        View Full Schedule
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </DashboardCard>
  );
}

function ActivityFeed() {
  const toneClass = {
    blue: "bg-blue-500",
    slate: "bg-slate-500",
    purple: "bg-violet-500",
    violet: "bg-indigo-500"
  };

  return (
    <DashboardCard label="9" className="p-5">
      <h2 className="text-lg font-black text-white">Recent Activity</h2>
      <div className="mt-5 space-y-4">
        {activity.map((item) => (
          <div key={`${item.name}-${item.time}`} className="grid grid-cols-[36px_1fr_auto] items-center gap-3">
            <span className={`grid h-9 w-9 place-items-center rounded-full ${toneClass[item.tone as keyof typeof toneClass]} text-[11px] font-black text-white shadow-[0_0_18px_rgba(139,92,246,0.22)]`}>
              {item.initials}
            </span>
            <p className="min-w-0 truncate text-sm text-slate-100">
              <span className="font-bold">{item.name}</span> {item.text}
            </p>
            <span className="text-xs text-slate-400">{item.time}</span>
          </div>
        ))}
      </div>
      <Link href="/academy" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky-300">
        View All Activity
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </DashboardCard>
  );
}

function QuickFaultsPanel() {
  return (
    <DashboardCard label="10" className="p-5">
      <h2 className="text-lg font-black text-white">Quick Faults</h2>
      <div className="mt-5 divide-y divide-white/10">
        {faults.map((fault) => (
          <Link key={fault.title} href="/troubleshooting" className="grid grid-cols-[36px_1fr_auto] items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span className="relative h-9 w-9 overflow-hidden rounded-xl">
              <Image src="/dashboard-assets/warning-triangle.png" alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span>
              <span className="block text-sm font-bold text-white">{fault.title}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">{fault.detail}</span>
            </span>
            <ArrowRight size={18} className="text-white" aria-hidden="true" />
          </Link>
        ))}
      </div>
      <Link href="/troubleshooting" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber-300">
        View All Troubleshooting
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </DashboardCard>
  );
}

function MeterStack({ label, tone }: { label: string; tone: "green" | "teal" | "purple" }) {
  const colors = {
    green: "from-emerald-500 via-lime-400 to-yellow-300",
    teal: "from-teal-600 via-teal-400 to-emerald-300",
    purple: "from-violet-700 via-violet-500 to-fuchsia-400"
  };
  const heights = label === "Input" ? [88, 73, 62] : label === "Gain Reduction" ? [36, 48, 32] : [78, 62, 70];

  return (
    <div className="text-center">
      <div className="mb-2 flex h-20 items-end justify-center gap-1.5 rounded-2xl border border-white/10 bg-slate-950/45 p-2">
        {heights.map((height, index) => (
          <div key={index} className="flex h-full w-4 items-end rounded-full bg-slate-800/80">
            <span className={`block w-full rounded-md bg-gradient-to-t ${colors[tone]}`} style={{ height: `${height}%` }} />
          </div>
        ))}
      </div>
      <p className="text-[10px] font-black uppercase leading-3 tracking-[0.14em] text-white">{label}</p>
    </div>
  );
}

function StreamOutputPanel() {
  return (
    <DashboardCard label="11" className="p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-black text-white">Stream Output</h2>
          <p className="mt-1.5 text-xs leading-5 text-slate-300">Audio monitoring for the livestream chain: input level, gain reduction, output loudness and stream health.</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.16em] text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.72)]" />
          Live
        </span>
      </div>
      <div className="mt-3 grid gap-3">
        <div className="grid grid-cols-3 gap-2.5">
          <MeterStack label="Input" tone="green" />
          <MeterStack label="Gain Reduction" tone="teal" />
          <MeterStack label="Output" tone="purple" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            ["Input Level", "-12.4 dB"],
            ["Gain Reduction", "-2.1 dB"],
            ["Output Level", "-18.0 LUFS"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] leading-4 text-slate-400">{label}</p>
              <p className="mt-1.5 text-xl font-black leading-none text-white">{value}</p>
            </div>
          ))}
          <div className="col-span-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] p-3">
            <p className="text-base font-black text-emerald-300">Stream Healthy</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-200">1080p</span>
              <span className="rounded-xl border border-slate-500/25 bg-slate-500/10 px-2.5 py-1 text-xs font-bold text-slate-200">60 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

function FooterStrip() {
  return (
    <DashboardCard label="12" className="p-5">
      <div className="grid gap-5 text-slate-200 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] md:items-center">
        <div className="flex gap-4">
          <Quote className="mt-0.5 shrink-0 text-3xl text-violet-400" aria-hidden="true" />
          <p className="text-base leading-7">&ldquo;Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.&rdquo; - Colossians 3:23</p>
        </div>
        <p className="flex items-center justify-center gap-3 border-white/10 text-base md:border-l">
          <Download size={19} className="text-slate-300" />
          Last Backup: 1h ago
        </p>
        <p className="flex items-center justify-center gap-3 border-white/10 text-base md:border-l">
          <Wifi size={19} className="text-slate-300" />
          System Uptime: 7d 14h
        </p>
        <p className="flex items-center justify-center gap-3 border-white/10 text-base md:border-l">
          <CircleHelp size={19} className="text-slate-300" />
          Need Help?
        </p>
      </div>
    </DashboardCard>
  );
}

export function DashboardCommandCentre() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-600/45 bg-[#050a16]/60 p-4 shadow-[0_32px_96px_rgba(0,0,0,0.42)] md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(139,92,246,0.12),transparent_25rem),radial-gradient(circle_at_78%_24%,rgba(45,212,191,0.08),transparent_20rem)]" />
      <div className="relative">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full max-w-[430px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} aria-hidden="true" />
            <span className="sr-only">Search the platform</span>
            <input className="h-12 w-full rounded-2xl border border-slate-500/45 bg-slate-800/65 py-2 pl-12 pr-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_44px_rgba(0,0,0,0.26)] placeholder:text-slate-400 outline-none focus:border-violet-400/55 focus:shadow-[0_0_36px_rgba(139,92,246,0.3)]" placeholder="Search the platform..." />
          </label>
          <div className="hidden items-center gap-6 text-slate-200 lg:flex">
            <Bell size={22} aria-hidden="true" />
            <CircleHelp size={24} aria-hidden="true" />
          </div>
        </div>

        <DashboardCard className="p-5 md:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.06fr)_260px_280px] lg:items-center">
            <div className="pl-8 md:pl-10">
              <span className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.55)]">1</span>
              <h1 className={dashboardType.heroTitle}>Sound Team Command Centre</h1>
              <p className={`mt-4 max-w-[680px] ${dashboardType.heroBody}`}>Monitor service readiness, continue training, check Dante and livestream health, and keep the team aligned.</p>
            </div>
            <Link href="/service-mode" className="relative flex min-h-[96px] items-center gap-4 rounded-2xl border border-violet-400/38 bg-violet-600/22 p-5 shadow-[0_0_32px_rgba(139,92,246,0.24)]">
              <span className="absolute -left-6 -top-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.55)]">2</span>
              <Image src="/dashboard-assets/sunday-service.png" alt="" width={48} height={48} className="h-12 w-12 rounded-xl object-cover" />
              <span>
                <span className="block text-base font-black text-white">Sunday Service</span>
                <span className="text-3xl font-black text-white">2h 15m <span className="text-base font-semibold">to go</span></span>
              </span>
            </Link>
            <Link href="/service-mode" className="relative flex min-h-[96px] items-center justify-center gap-4 rounded-2xl border border-blue-300/55 bg-gradient-to-br from-violet-600 via-violet-600 to-blue-600 px-6 text-xl font-black text-white shadow-[0_0_50px_rgba(139,92,246,0.54)] transition hover:-translate-y-0.5">
              <span className="absolute -left-6 -top-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.55)]">3</span>
              <Image src="/dashboard-assets/start-service-rocket.png" alt="" width={48} height={48} className="h-12 w-12 rounded-xl object-cover mix-blend-screen" />
              Start Service Mode
            </Link>
          </div>
        </DashboardCard>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.title} metric={metric} label={index === 0 ? "4" : ""} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(320px,0.92fr)]">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.14fr)_minmax(310px,0.9fr)]">
            <ContinueLearningCard />
            <UpNextSoundLabCard />
          </div>
          <SystemHealthPanel />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-4 xl:items-start">
          <ScheduleTimeline />
          <ActivityFeed />
          <QuickFaultsPanel />
          <StreamOutputPanel />
        </div>

        <div className="mt-4">
          <FooterStrip />
        </div>
      </div>
    </div>
  );
}
