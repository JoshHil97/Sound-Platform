import Link from "next/link";
import { BookOpen, ClipboardCheck, Gauge, GraduationCap, Headphones, Images, ListChecks, Map, RadioTower, Settings, ShieldCheck, Wrench } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Gauge },
  { href: "/academy", label: "Academy", icon: BookOpen },
  { href: "/sound-lab", label: "Sound Lab", icon: Headphones },
  { href: "/troubleshooting", label: "Troubleshooting", icon: Wrench },
  { href: "/sops", label: "SOPs", icon: ClipboardCheck },
  { href: "/equipment", label: "Equipment", icon: RadioTower },
  { href: "/signal-flow", label: "Signal Flow", icon: Map },
  { href: "/visuals", label: "Visuals", icon: Images },
  { href: "/certifications", label: "Certifications", icon: GraduationCap },
  { href: "/service-logs", label: "Service Logs", icon: ListChecks },
  { href: "/admin", label: "Admin", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--accent)] text-white">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-bold">Church Sound Academy</span>
              <span className="block text-xs text-[var(--muted)]">X32, Dante, Logic, Waves and live-service operations</span>
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium text-[var(--muted)]" htmlFor="role">Role</label>
            <select id="role" className="focus-ring rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm">
              <option>Trainee</option>
              <option>Sound Operator</option>
              <option>Engineer</option>
              <option>Senior Engineer</option>
              <option>Technical Director</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
        <nav className="h-max rounded-md border border-[var(--line)] bg-white p-2 shadow-sm lg:sticky lg:top-24">
          <ul className="grid gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link className="focus-ring flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[var(--ink)] hover:bg-teal-50" href={item.href}>
                    <Icon size={18} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}
