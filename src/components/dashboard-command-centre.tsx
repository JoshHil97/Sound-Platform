import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, CircleHelp, Clock3, Download, Quote, Search, Wifi } from "lucide-react";

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
    detail: "5 of 6 checks completed",
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
    detail: "Headroom Good",
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
    <section className={`relative overflow-hidden rounded-[18px] border border-slate-600/35 bg-[linear-gradient(145deg,rgba(17,28,50,0.74),rgba(5,10,22,0.88))] shadow-[0_22px_70px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl ${className}`}>
      {label ? (
        <span className="absolute -left-3 -top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.55)]">
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
        <circle
          cx="56"
          cy="56"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="drop-shadow-[0_0_10px_rgba(139,92,246,0.55)]"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-2xl font-black tracking-tight text-white">{text}</p>
          {sub ? <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">{sub}</p> : null}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ metric, label }: { metric: Metric; label: string }) {
  const actionTone =
    metric.tone === "teal" ? "text-cyan-300" : metric.tone === "blue" ? "text-blue-300" : "text-fuchsia-300";

  return (
    <DashboardCard label={label} className="min-h-[198px] p-5">
      <h2 className="text-base font-bold text-white">{metric.title}</h2>
      <div className="mt-4 flex items-center gap-4">
        <ProgressRing value={metric.progress} text={metric.value} tone={metric.tone} sub={metric.title === "Livestream Mix" ? "LUFS" : undefined} />
        <div className="min-w-0">
          <p className={`text-lg font-black ${actionTone}`}>{metric.label}</p>
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
    <div className="grid grid-cols-[34px_1fr_auto_auto] items-center gap-3 border-t border-white/10 py-3 first:border-t-0">
      <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-white/[0.04]">
        <Image src={row.icon} alt="" fill sizes="32px" className="object-cover" />
      </div>
      <p className="min-w-0 truncate text-sm font-bold text-white">{row.name}</p>
      <p className="flex items-center gap-2 text-xs font-semibold text-slate-200">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.65)]" />
        Online
      </p>
      <span className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-300">Healthy</span>
    </div>
  );
}

function ContinueLearningCard() {
  return (
    <DashboardCard label="5" className="p-4 md:p-5">
      <h2 className="mb-4 text-lg font-black text-white">Continue Learning</h2>
      <div className="grid gap-5 md:grid-cols-[minmax(220px,0.82fr)_1fr] md:items-center">
        <div className="relative aspect-[1.46/1] overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <Image src="/dashboard-assets/x32-hero.png" alt="X32 console training graphic" fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.05),rgba(2,6,23,0.26))]" />
        </div>
        <div>
          <p className="text-base text-slate-200">X32 Foundations</p>
          <h3 className="mt-1 text-2xl font-black tracking-tight text-white">EQ Deep Dive</h3>
          <p className="mt-3 max-w-xs text-base leading-7 text-slate-200">Learn how to shape your mix with confidence using EQ.</p>
          <div className="mt-5 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-700/80">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 shadow-[0_0_16px_rgba(139,92,246,0.55)]" />
            </div>
            <span className="text-xs font-semibold text-slate-200">75% complete</span>
          </div>
          <Link href="/lessons/x32-navigation" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 text-sm font-black text-white shadow-[0_0_28px_rgba(139,92,246,0.38)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(139,92,246,0.48)]">
            Continue Lesson
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </DashboardCard>
  );
}

function SoundLabCard() {
  return (
    <DashboardCard label="6" className="p-4 md:p-5">
      <h2 className="mb-4 text-lg font-black text-white">Up Next - Sound Lab</h2>
      <div className="grid gap-5 md:grid-cols-[160px_1fr] md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <Image src="/dashboard-assets/sound-lab-flask.png" alt="Sound Lab flask graphic" fill sizes="160px" className="object-cover" />
        </div>
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white">Drum Mic Challenge</h3>
          <p className="mt-3 max-w-sm text-base leading-7 text-slate-200">Practice drum mixing on a full kit and get your mix sounding solid.</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-sm font-bold text-cyan-300">Intermediate</span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Clock3 size={16} />
              25 min
            </span>
          </div>
          <Link href="/sound-lab" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 text-sm font-black text-white shadow-[0_0_24px_rgba(59,130,246,0.34)]">
            Start Drill
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </DashboardCard>
  );
}

function SystemHealthPanel() {
  return (
    <DashboardCard label="7" className="p-5 xl:row-span-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-black text-white">System Health</h2>
      </div>
      <div className="mt-4">
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
      <h2 className="text-lg font-black text-white">Today's Schedule</h2>
      <div className="mt-5 space-y-0">
        {schedule.map((item, index) => (
          <div key={item.time} className="grid grid-cols-[24px_72px_1fr_auto] items-center gap-3">
            <div className="relative flex h-10 items-center justify-center">
              <span className={`z-10 h-3 w-3 rounded-full ${item.active ? "h-6 w-6 border border-emerald-300 bg-slate-950 shadow-[0_0_16px_rgba(45,212,191,0.5)]" : "bg-indigo-300"}`}>
                {item.active ? <span className="mx-auto mt-[6px] block h-2 w-2 rounded-full bg-emerald-300" /> : null}
              </span>
              {index < schedule.length - 1 ? <span className="absolute bottom-0 top-1/2 w-px bg-indigo-300/40" /> : null}
            </div>
            <p className={`text-sm font-black ${item.active ? "text-emerald-300" : "text-white"}`}>{item.time}</p>
            <p className="truncate text-sm font-semibold text-slate-100">{item.title}</p>
            <span className={`rounded-md px-2 py-1 text-[11px] font-semibold ${item.active ? "bg-emerald-400/12 text-emerald-300" : "bg-slate-700/45 text-indigo-200"}`}>
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
          <div key={`${item.name}-${item.time}`} className="grid grid-cols-[34px_1fr_auto] items-center gap-3">
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
            <span className="relative h-8 w-8 overflow-hidden rounded-lg">
              <Image src="/dashboard-assets/warning-triangle.png" alt="" fill sizes="32px" className="object-cover" />
            </span>
            <span>
              <span className="block text-sm font-bold text-white">{fault.title}</span>
              <span className="block text-xs text-slate-400">{fault.detail}</span>
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
  const heights = label === "Input" ? [86, 70, 58] : label === "GR" ? [38, 48, 30] : [74, 58, 66];

  return (
    <div className="text-center">
      <div className="mb-2 flex h-36 items-end justify-center gap-2 rounded-xl border border-white/10 bg-slate-950/45 p-3">
        {heights.map((height, index) => (
          <div key={index} className="flex h-full w-5 items-end rounded-full bg-slate-800/80">
            <span className={`block w-full rounded-sm bg-gradient-to-t ${colors[tone]}`} style={{ height: `${height}%` }} />
          </div>
        ))}
      </div>
      <p className="text-xs font-bold text-white">{label}</p>
    </div>
  );
}

function StreamOutputPanel() {
  return (
    <DashboardCard label="11" className="p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-white">Stream Output</h2>
        <span className="flex items-center gap-2 text-sm font-bold text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.72)]" />
          Live
        </span>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-[1.2fr_0.9fr]">
        <div className="grid grid-cols-3 gap-3">
          <MeterStack label="Input" tone="green" />
          <MeterStack label="GR" tone="teal" />
          <MeterStack label="Output" tone="purple" />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-300">Input Level</p>
            <p className="text-2xl font-black text-white">-12.4 dB</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">Gain Reduction</p>
            <p className="text-2xl font-black text-white">-2.1 dB</p>
          </div>
          <div>
            <p className="text-sm text-slate-300">Output Level</p>
            <p className="text-2xl font-black text-white">-18.0 LUFS</p>
          </div>
          <p className="font-bold text-emerald-300">Stream Healthy</p>
          <div className="flex gap-2">
            <span className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-sm text-blue-200">1080p</span>
            <span className="rounded-lg border border-slate-500/25 bg-slate-500/10 px-3 py-1.5 text-sm text-slate-200">60 FPS</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

function FooterStrip() {
  return (
    <DashboardCard label="12" className="p-4">
      <div className="grid gap-4 text-slate-200 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] md:items-center">
        <div className="flex gap-4">
          <Quote className="mt-0.5 shrink-0 text-3xl text-violet-400" aria-hidden="true" />
          <p className="text-sm leading-6">"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." - Colossians 3:23</p>
        </div>
        <p className="flex items-center justify-center gap-3 border-white/10 text-sm md:border-l">
          <Download size={19} className="text-slate-300" />
          Last Backup: 1h ago
        </p>
        <p className="flex items-center justify-center gap-3 border-white/10 text-sm md:border-l">
          <Wifi size={19} className="text-slate-300" />
          System Uptime: 7d 14h
        </p>
        <p className="flex items-center justify-center gap-3 border-white/10 text-sm md:border-l">
          <CircleHelp size={19} className="text-slate-300" />
          Need Help?
        </p>
      </div>
    </DashboardCard>
  );
}

export function DashboardCommandCentre() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-700/40 bg-[#050a16]/60 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.38)] md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(139,92,246,0.12),transparent_25rem),radial-gradient(circle_at_78%_24%,rgba(45,212,191,0.08),transparent_20rem)]" />
      <div className="relative">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full max-w-[430px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} aria-hidden="true" />
            <span className="sr-only">Search the platform</span>
            <input className="h-12 w-full rounded-xl border border-slate-600/40 bg-slate-800/55 py-2 pl-12 pr-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.22)] placeholder:text-slate-400 outline-none focus:border-violet-400/55 focus:shadow-[0_0_34px_rgba(139,92,246,0.28)]" placeholder="Search the platform..." />
          </label>
          <div className="hidden items-center gap-6 text-slate-300 lg:flex">
            <Bell size={21} />
            <CircleHelp size={23} />
          </div>
        </div>

        <DashboardCard className="p-4 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_260px_280px] lg:items-center">
            <div className="pl-8 md:pl-10">
              <span className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.55)]">1</span>
              <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">Sound Team Command Centre</h1>
              <p className="mt-2 max-w-[610px] text-base leading-7 text-slate-200">Monitor service readiness, continue training, check Dante and livestream health, and keep the team aligned.</p>
            </div>
            <Link href="/service-mode" className="relative flex min-h-[86px] items-center gap-4 rounded-xl border border-violet-400/35 bg-violet-600/20 p-4 shadow-[0_0_28px_rgba(139,92,246,0.22)]">
              <span className="absolute -left-6 -top-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.55)]">2</span>
              <Image src="/dashboard-assets/sunday-service.png" alt="" width={42} height={42} className="h-11 w-11 rounded-lg object-cover" />
              <span>
                <span className="block text-sm font-black text-white">Sunday Service</span>
                <span className="text-2xl font-black text-white">2h 15m <span className="text-base font-semibold">to go</span></span>
              </span>
            </Link>
            <Link href="/service-mode" className="relative flex min-h-[86px] items-center justify-center gap-4 rounded-xl border border-blue-300/50 bg-gradient-to-br from-violet-600 via-violet-600 to-blue-600 px-6 text-lg font-black text-white shadow-[0_0_42px_rgba(139,92,246,0.5)]">
              <span className="absolute -left-6 -top-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.55)]">3</span>
              <Image src="/dashboard-assets/start-service-rocket.png" alt="" width={44} height={44} className="h-11 w-11 rounded-lg object-cover mix-blend-screen" />
              Start Service Mode
            </Link>
          </div>
        </DashboardCard>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_320px]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric, index) => (
                <MetricCard key={metric.title} metric={metric} label={index === 0 ? "4" : ""} />
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <ContinueLearningCard />
              <SoundLabCard />
            </div>
          </div>
          <SystemHealthPanel />
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1.05fr_1.05fr_1.45fr]">
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
