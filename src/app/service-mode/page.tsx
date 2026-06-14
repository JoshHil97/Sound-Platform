import Link from "next/link";
import type React from "react";
import { AlertTriangle, ArrowRight, BatteryCharging, CheckCircle2, Circle, Clock, FilePlus2, LifeBuoy, Phone, Radio, ShieldCheck, Wifi } from "lucide-react";
import {
  offlineResources,
  serviceChecklist,
  serviceEscalationContacts,
  serviceQuickFaults,
  serviceSchedule
} from "@/lib/data";
import { ProgressBar, ProgressRing, StatusPill, SurfaceCard, Tag } from "@/components/ui";

const sectionOrder = ["Pre-Service", "Line Check", "Stage", "Livestream", "Shutdown"] as const;

export default function ServiceModePage() {
  const done = serviceChecklist.filter((item) => item.status === "Done").length;
  const criticalOpen = serviceChecklist.filter((item) => item.priority === "Critical" && item.status !== "Done").length;
  const readiness = Math.round((done / serviceChecklist.length) * 100);

  return (
    <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
      <main className="grid gap-5">
        <section className="glass-panel relative overflow-hidden rounded-[2rem] p-5 md:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500" />
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <StatusPill tone={criticalOpen === 0 ? "success" : "warning"}>{criticalOpen === 0 ? "All critical systems go" : `${criticalOpen} critical checks open`}</StatusPill>
                <Tag>Sunday 9:00 AM</Tag>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Sunday Service Mode</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">I am serving today</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">One-handed service workflow for readiness, fast fault recovery, escalation and incident memory.</p>
            </div>
            <div className="flex items-center justify-center gap-4 rounded-3xl border border-white/10 bg-black/25 p-4">
              <ProgressRing value={readiness} label="Ready" />
              <div>
                <p className="text-3xl font-black">{done}/{serviceChecklist.length}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">systems confirmed</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">
              <span>Service readiness</span>
              <span>{readiness}%</span>
            </div>
            <ProgressBar value={readiness} />
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ServiceMetric icon={<BatteryCharging />} label="Wireless" value="Ready" detail="Fresh batteries and RF/audio checked." tone="success" />
          <ServiceMetric icon={<Wifi />} label="Dante" value="48 kHz" detail="DVS running, subscriptions green." tone="success" />
          <ServiceMetric icon={<Radio />} label="Logic" value="Due" detail="Template and OBS handoff still need test." tone="warning" />
          <ServiceMetric icon={<ShieldCheck />} label="Fallback" value="Planned" detail="Backup X32 stereo stream path noted." tone="info" />
        </section>

        <section className="grid gap-4">
          {sectionOrder.map((section) => {
            const items = serviceChecklist.filter((item) => item.section === section);
            if (!items.length) return null;
            return (
              <div key={section} className="glass-panel rounded-3xl p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">{section}</p>
                    <h2 className="mt-1 text-xl font-black">{section === "Livestream" ? "Broadcast readiness" : `${section} checks`}</h2>
                  </div>
                  <StatusPill>{items.filter((item) => item.status === "Done").length}/{items.length} done</StatusPill>
                </div>
                <div className="grid gap-3">
                  {items.map((item, index) => (
                    <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="flex gap-4">
                        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${item.status === "Done" ? "bg-emerald-400/15 text-emerald-200" : item.status === "Due" ? "bg-amber-400/15 text-amber-200" : "bg-cyan-400/15 text-cyan-200"}`}>
                          {item.status === "Done" ? <CheckCircle2 /> : item.status === "Due" ? <AlertTriangle /> : <Circle />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs text-slate-500">#{index + 1}</span>
                            <h3 className="font-black">{item.title}</h3>
                            <StatusPill tone={item.status === "Done" ? "success" : item.status === "Due" ? "warning" : "info"}>{item.status}</StatusPill>
                            {item.priority ? <Tag>{item.priority}</Tag> : null}
                          </div>
                          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
                          <div className="mt-3 grid gap-2 text-xs leading-5 text-slate-300 md:grid-cols-3">
                            <span><strong className="text-slate-100">Due:</strong> {item.dueTime}</span>
                            <span><strong className="text-slate-100">Owner:</strong> {item.owner}</span>
                            <span><strong className="text-slate-100">Area:</strong> {item.area}</span>
                          </div>
                          <div className="mt-3 rounded-xl border border-amber-300/20 bg-amber-300/10 p-3 text-xs leading-5 text-amber-50">
                            <strong>Fallback:</strong> {item.fallback}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.quickFaultSlug ? <Link href={`/troubleshooting/${item.quickFaultSlug}`} className="focus-ring rounded-xl border border-red-300/20 bg-red-400/10 px-3 py-2 text-xs font-black text-red-100 hover:bg-red-400/20">Open fault flow</Link> : null}
                            {item.relatedSop ? <Link href="/sops" className="focus-ring rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-slate-100 hover:bg-white/[0.08]">Related SOP</Link> : null}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <aside className="grid h-max gap-4 xl:sticky xl:top-24">
        <SurfaceCard>
          <div className="flex items-center gap-2">
            <Clock className="text-cyan-300" size={19} />
            <h2 className="text-xl font-black">Today’s Run</h2>
          </div>
          <div className="mt-4 grid gap-3">
            {serviceSchedule.map((item) => (
              <div key={`${item.time}-${item.title}`} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-sm text-cyan-200">{item.time}</p>
                    <h3 className="mt-1 font-black">{item.title}</h3>
                  </div>
                  <StatusPill tone={item.status === "Done" ? "success" : item.status === "Now" ? "warning" : "info"}>{item.status}</StatusPill>
                </div>
                <p className="mt-2 text-xs text-[var(--muted)]">{item.location} · {item.operatorFocus}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-center gap-2">
            <LifeBuoy className="text-red-300" size={19} />
            <h2 className="text-xl font-black">Quick Faults</h2>
          </div>
          <div className="mt-4 grid gap-2">
            {serviceQuickFaults.map((fault) => (
              <Link key={fault.title} href={`/troubleshooting/${fault.flowSlug}`} className="focus-ring rounded-2xl border border-white/10 bg-white/[0.04] p-3 hover:border-red-300/30 hover:bg-red-400/10">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black">{fault.title}</p>
                  <StatusPill tone={fault.urgency === "Emergency" ? "danger" : fault.urgency === "High" ? "warning" : "info"}>{fault.urgency}</StatusPill>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{fault.firstSafeCheck}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-center gap-2">
            <Phone className="text-violet-300" size={19} />
            <h2 className="text-xl font-black">Escalation</h2>
          </div>
          <div className="mt-4 grid gap-3">
            {serviceEscalationContacts.map((contact) => (
              <div key={contact.name} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black">{contact.name}</p>
                    <p className="text-xs text-violet-200">{contact.role}</p>
                  </div>
                  <StatusPill>{contact.availability}</StatusPill>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{contact.whenToEscalate}</p>
                <button className="focus-ring mt-3 w-full rounded-xl bg-violet-500/85 px-3 py-2 text-sm font-black text-white hover:bg-violet-500">{contact.contactAction}</button>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-center gap-2">
            <FilePlus2 className="text-amber-300" size={19} />
            <h2 className="text-xl font-black">Incident Draft</h2>
          </div>
          <div className="mt-4 grid gap-3">
            {["Symptom", "Impact", "First check", "Temporary fix"].map((field) => (
              <div key={field} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">{field}</p>
                <p className="mt-2 text-sm text-slate-400">Tap to record during service</p>
              </div>
            ))}
            <Link href="/service-logs" className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-3 py-3 text-sm font-black text-amber-100 hover:bg-amber-300/20">
              Open service logs
              <ArrowRight size={16} />
            </Link>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-center gap-2">
            <Radio className="text-emerald-300" size={19} />
            <h2 className="text-xl font-black">Offline Pack</h2>
          </div>
          <div className="mt-4 grid gap-2">
            {offlineResources.map((resource) => (
              <Link key={resource.title} href={resource.route} className="focus-ring rounded-xl border border-white/10 bg-white/[0.04] p-3 hover:bg-white/[0.08]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black">{resource.title}</p>
                  <StatusPill tone={resource.status === "Cached" ? "success" : "warning"}>{resource.status}</StatusPill>
                </div>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{resource.detail}</p>
              </Link>
            ))}
          </div>
        </SurfaceCard>
      </aside>
    </div>
  );
}

function ServiceMetric({
  icon,
  label,
  value,
  detail,
  tone
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: "success" | "warning" | "info";
}) {
  const toneClass = tone === "success" ? "text-emerald-300" : tone === "warning" ? "text-amber-300" : "text-cyan-300";
  return (
    <SurfaceCard>
      <div className={`mb-3 ${toneClass}`}>{icon}</div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
      <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{detail}</p>
    </SurfaceCard>
  );
}
