"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CircleHelp, Search, Zap } from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  iconSrc: string;
  disabled?: boolean;
  mobileLabel?: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", iconSrc: "/icons/nav/dashboard.svg", mobileLabel: "Home" },
  { href: "/x32-console", label: "X32 Console", iconSrc: "/icons/nav/x32-console.svg", mobileLabel: "X32" },
  { href: "/logic-stream", label: "Logic Stream", iconSrc: "/icons/nav/logic-stream.svg", mobileLabel: "Logic" },
  { href: "/dante", label: "Dante Network", iconSrc: "/icons/nav/dante-network.svg", mobileLabel: "Dante" },
  { href: "/service-mode", label: "Service Mode", iconSrc: "/icons/nav/service-mode.svg", mobileLabel: "Service" },
  { href: "/academy", label: "Academy", iconSrc: "/icons/nav/academy.svg" },
  { href: "/sound-lab", label: "Drills & Labs", iconSrc: "/icons/nav/drills-labs.svg" },
  { label: "Team", iconSrc: "/icons/nav/team.svg", disabled: true },
  { label: "Resources", iconSrc: "/icons/nav/resources.svg", disabled: true },
  { label: "Reports", iconSrc: "/icons/nav/reports.svg", disabled: true },
  { label: "Settings", iconSrc: "/icons/nav/settings.svg", disabled: true }
];

const mobileItems = navItems.filter((item) => item.href).slice(0, 5);

function isActivePath(pathname: string, href?: string) {
  if (!href) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function SoundAcademyMark({ compact = false }: { compact?: boolean }) {
  return (
    <Image
      src="/icons/sound-platform-logo.svg"
      alt=""
      width={compact ? 44 : 48}
      height={compact ? 44 : 48}
      className={`sound-platform-logo shrink-0 ${compact ? "h-11 w-11" : "h-12 w-12"}`}
      aria-hidden="true"
      priority
      unoptimized
    />
  );
}

function SidebarNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActivePath(pathname, item.href);
  const baseClass =
    "shell-nav-item group relative flex h-12 items-center gap-3 rounded-2xl border px-3 text-sm font-semibold focus-ring md:justify-center xl:justify-start";
  const activeClass =
    "border-violet-300/40 bg-violet-600/30 text-white shadow-[var(--glow-primary-active),inset_0_1px_0_rgba(255,255,255,0.08)]";
  const inactiveClass =
    "border-transparent text-slate-400 hover:border-violet-300/18 hover:bg-white/[0.06] hover:text-white hover:shadow-[var(--glow-primary-hover)]";
  const disabledClass = "cursor-not-allowed border-transparent text-slate-600 opacity-75";

  if (item.disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title={`${item.label} coming later`}
        className={`${baseClass} ${disabledClass}`}
      >
        <Image
          src={item.iconSrc}
          alt=""
          width={28}
          height={28}
          className="nav-concept-icon nav-concept-icon-disabled"
          aria-hidden="true"
          unoptimized
        />
        <span className="hidden min-w-0 truncate xl:block">{item.label}</span>
        <span className="sr-only">{item.label} coming later</span>
      </button>
    );
  }

  return (
    <Link
      href={item.href ?? "#"}
      aria-current={active ? "page" : undefined}
      title={item.label}
      className={`${baseClass} ${active ? activeClass : inactiveClass}`}
    >
      <span
        className={`absolute left-0 top-1/2 hidden h-7 w-1 -translate-y-1/2 rounded-r-full xl:block ${
          active ? "bg-violet-300 shadow-[0_0_18px_rgba(168,85,247,0.8)]" : "bg-transparent"
        }`}
        aria-hidden="true"
      />
      <Image
        src={item.iconSrc}
        alt=""
        width={28}
        height={28}
        className={`nav-concept-icon ${active ? "nav-concept-icon-active" : ""}`}
        aria-hidden="true"
        unoptimized
      />
      <span className="hidden min-w-0 truncate xl:block">{item.label}</span>
      {active ? <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-emerald-300 xl:block" aria-hidden="true" /> : null}
      <span className="sr-only">{item.label}</span>
    </Link>
  );
}

function UserCard() {
  return (
    <div className="shell-user-card mt-auto hidden rounded-3xl border border-white/10 bg-white/[0.055] p-3 md:block">
      <div className="flex items-center justify-center gap-3 xl:justify-start">
        <div className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-700 text-sm font-black text-white">
          JS
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#060914] bg-emerald-400" />
        </div>
        <div className="hidden min-w-0 xl:block">
          <p className="truncate text-sm font-bold text-white">Joshua</p>
          <p className="truncate text-xs text-slate-400">Sound Team</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Online
          </p>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersiveLesson = pathname.startsWith("/lessons/");
  const commandDashboard = pathname === "/";
  const mainClass = immersiveLesson
    ? "relative px-0 pb-0 pt-0"
    : commandDashboard
      ? "relative px-3 pb-8 pt-4 md:ml-20 md:px-4 xl:ml-72"
      : "relative px-4 pb-28 pt-5 md:ml-20 md:px-6 md:pb-8 xl:ml-72";

  return (
    <div className="min-h-screen text-[var(--ink)]">
      <div className="pointer-events-none fixed inset-0 border border-white/5" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_43%_12%,rgba(139,92,246,0.095),transparent_28rem),radial-gradient(circle_at_88%_10%,rgba(45,212,191,0.075),transparent_22rem)]" />

      <aside
        className={`shell-sidebar fixed inset-y-0 left-0 z-30 hidden w-20 flex-col border-r border-white/10 px-3 py-5 backdrop-blur-2xl md:flex xl:w-72 xl:px-5 ${
          immersiveLesson ? "md:hidden" : ""
        }`}
      >
        <Link href="/" className="group focus-ring flex items-center justify-center gap-3 rounded-2xl xl:justify-start" aria-label="Sound Academy home">
          <SoundAcademyMark compact />
          <span className="hidden xl:block">
            <span className="block text-lg font-black uppercase leading-none tracking-wide text-white">Sound</span>
            <span className="block text-lg font-black uppercase leading-none tracking-[0.12em] text-slate-200">Academy</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Sound Platform</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="mt-8 grid gap-1.5">
          {navItems.map((item) => (
            <SidebarNavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>

        <UserCard />
      </aside>

      <header
        className={`sticky top-0 z-20 border-b border-white/10 bg-[#040711]/78 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:ml-20 xl:ml-72 ${
          immersiveLesson || commandDashboard ? "hidden" : ""
        }`}
      >
        <div className="flex min-h-16 items-center gap-3 px-4 py-3 md:px-6">
          <Link href="/" className="group focus-ring flex items-center gap-3 rounded-2xl md:hidden" aria-label="Sound Academy home">
            <SoundAcademyMark compact />
            <span className="font-black uppercase tracking-wide">Sound Academy</span>
          </Link>

          <div className="hidden min-w-0 flex-1 md:block">
            <label className="relative block w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} aria-hidden="true" />
              <span className="sr-only">Search</span>
              <input
                className="shell-search focus-ring h-11 w-full rounded-2xl border border-white/10 bg-white/[0.045] py-2 pl-10 pr-3 text-sm text-white placeholder:text-slate-500"
                placeholder="Search lessons, consoles, faults, SOPs..."
              />
            </label>
          </div>

          <div className="ml-auto hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-semibold text-slate-300 sm:flex">
            <Zap size={16} className="text-violet-300" aria-hidden="true" />
            <span className="text-white">Operator</span>
            <span className="text-slate-500">Level 2</span>
          </div>

          <button className="shell-nav-item focus-ring grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.045] text-slate-300 hover:border-violet-300/30 hover:text-white hover:shadow-[var(--glow-primary-hover)]">
            <CircleHelp size={18} aria-hidden="true" />
            <span className="sr-only">Help</span>
          </button>
        </div>
      </header>

      <main className={mainClass}>
        <div className={immersiveLesson ? "mx-auto max-w-none" : "mx-auto max-w-[1540px]"}>{children}</div>
      </main>

      <nav
        aria-label="Mobile navigation"
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050711]/92 px-2 py-2 backdrop-blur-2xl md:hidden ${
          immersiveLesson ? "hidden" : ""
        }`}
      >
        <div className="grid grid-cols-5 gap-1">
          {mobileItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href ?? "#"}
                aria-current={active ? "page" : undefined}
                className={`focus-ring flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-[11px] font-semibold transition ${
                  active
                    ? "bg-violet-600/28 text-white shadow-[0_0_22px_rgba(124,58,237,0.18)]"
                    : "text-slate-400 hover:bg-white/[0.055] hover:text-white"
                  }`}
              >
                <Image
                  src={item.iconSrc}
                  alt=""
                  width={24}
                  height={24}
                  className={`nav-concept-icon h-5 w-5 ${active ? "nav-concept-icon-active" : ""}`}
                  aria-hidden="true"
                  unoptimized
                />
                <span className="truncate">{item.mobileLabel ?? item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
