import Link from "next/link";
import { Bell, BookOpen, ClipboardCheck, Gauge, GraduationCap, Headphones, ListChecks, MonitorCog, Network, RadioTower, Search, Settings, ShieldCheck, SlidersHorizontal, UserCircle, Wrench, Zap } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/academy", label: "Academy", icon: BookOpen },
  { href: "/practical-training", label: "Practice", icon: ClipboardCheck },
  { href: "/sound-lab", label: "Sound Lab", icon: Headphones },
  { href: "/service-mode", label: "Service Mode", icon: ListChecks },
  { href: "/digital-twin", label: "Digital Twin", icon: Network },
  { href: "/x32-console", label: "X32 Console", icon: SlidersHorizontal },
  { href: "/logic-stream", label: "Logic Stream", icon: MonitorCog },
  { href: "/dante", label: "Dante", icon: Network },
  { href: "/troubleshooting", label: "Troubleshooting", icon: Wrench },
  { href: "/equipment", label: "Equipment", icon: RadioTower },
  { href: "/sops", label: "SOPs", icon: ClipboardCheck },
  { href: "/certifications", label: "Certifications", icon: GraduationCap },
  { href: "/admin", label: "Admin", icon: Settings }
];

const mobileItems = navItems.slice(0, 5);

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-[var(--ink)]">
      <div className="pointer-events-none fixed inset-0 border border-white/5" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-black/35 px-4 py-5 backdrop-blur-2xl xl:block">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-2xl">
          <span className="grid h-11 w-11 place-items-center rounded-2xl purple-gradient shadow-[0_0_28px_rgba(124,58,237,0.38)]">
            <Zap size={22} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-wide">SOUND ACADEMY</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Church Sound Training</span>
          </span>
        </Link>

        <nav className="mt-8 grid gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="focus-ring group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-semibold text-slate-300 hover:border-violet-400/20 hover:bg-violet-500/10 hover:text-white">
                <Icon size={18} className="text-slate-500 group-hover:text-cyan-300" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="glass-panel mt-8 rounded-2xl p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">Serving this weekend?</p>
          <p className="mt-3 text-sm text-white">Sunday, 9:00 AM</p>
          <Link href="/service-mode" className="focus-ring mt-4 inline-flex w-full justify-center rounded-xl bg-emerald-500/20 px-3 py-2 text-sm font-bold text-emerald-100 hover:bg-emerald-500/30">
            Prepare for Service
          </Link>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050711]/75 backdrop-blur-2xl xl:ml-72">
        <div className="flex items-center gap-3 px-4 py-3 md:px-6">
          <Link href="/" className="focus-ring flex items-center gap-2 rounded-xl xl:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl purple-gradient">
              <ShieldCheck size={20} aria-hidden="true" />
            </span>
            <span className="font-black">Sound Academy</span>
          </Link>
          <div className="ml-auto hidden min-w-0 flex-1 justify-center md:flex">
            <label className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} aria-hidden="true" />
              <span className="sr-only">Search</span>
              <input className="focus-ring w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-3 text-sm text-white placeholder:text-slate-500" placeholder="Search lessons, topics, equipment, faults..." />
            </label>
          </div>
          <button className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300">
            <Bell size={18} aria-hidden="true" />
            <span className="sr-only">Notifications</span>
          </button>
          <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 md:flex">
            <UserCircle size={28} className="text-amber-200" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold">Alex Morgan</p>
              <p className="text-[10px] text-violet-200">Operator · 67%</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pb-28 pt-5 md:px-6 xl:ml-72 xl:pb-8">
        <div className="mx-auto max-w-[1500px]">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050711]/90 px-2 py-2 backdrop-blur-2xl xl:hidden">
        <div className="grid grid-cols-5 gap-1">
          {mobileItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="focus-ring flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold text-slate-300 hover:bg-violet-500/10 hover:text-white">
                <Icon size={18} aria-hidden="true" />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
