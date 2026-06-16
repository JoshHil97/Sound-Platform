import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, Layers3, RadioTower, ShieldCheck } from "lucide-react";
import { formatSystemLabel, getNextX32Lesson, getX32Lesson, getX32Lessons } from "@/lib/x32/academy-data";

export function generateStaticParams() {
  return getX32Lessons().map((lesson) => ({ lessonId: lesson.id }));
}

export default async function X32LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = getX32Lesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const nextLesson = getNextX32Lesson(lesson);
  const statusLabel = lesson.status === "future" ? "Coming Soon" : lesson.status === "placeholder" ? "Lesson Shell" : "Available";

  return (
    <div className="pb-10">
      <header className="rounded-xl border border-violet-300/20 bg-[#050812]/92 p-5 shadow-[0_0_32px_rgba(124,58,237,0.16)]">
        <Link href="/x32-console" className="focus-ring inline-flex items-center gap-2 rounded-lg text-xs font-black uppercase tracking-[0.16em] text-violet-200 hover:text-white">
          <ArrowLeft size={15} aria-hidden="true" />
          Back to X32 Console
        </Link>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">VBCI X32 Academy</p>
            <h1 className="mt-2 text-3xl font-black text-white md:text-5xl">{lesson.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">{lesson.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <LessonPill>{lesson.difficulty}</LessonPill>
            <LessonPill>
              <Clock3 size={14} aria-hidden="true" />
              {lesson.estimatedTime}
            </LessonPill>
            <LessonPill>{statusLabel}</LessonPill>
          </div>
        </div>
      </header>

      <main className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-4">
          <LessonPanel title="Overview" icon={<BookOpen size={18} />}>
            <p>{lesson.shortCardDescription}</p>
            {lesson.status === "future" ? (
              <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                This lesson is planned for a later content pass. Phase 2 only provides the route, structure, metadata and VBCI relationships.
              </div>
            ) : null}
          </LessonPanel>

          <LessonPanel title="Learning Objectives" icon={<CheckCircle2 size={18} />}>
            <ul className="grid gap-2">
              {lesson.learningObjectives.map((objective, index) => (
                <li key={objective} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-violet-300/25 bg-violet-500/15 text-xs font-black text-violet-100">{index + 1}</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </LessonPanel>

          <div className="grid gap-4 lg:grid-cols-2">
            <LessonPanel title="VBCI Church Examples" icon={<RadioTower size={18} />}>
              <TagList items={lesson.churchExamples} />
            </LessonPanel>
            <LessonPanel title="Related Console Areas" icon={<Layers3 size={18} />}>
              <TagList items={lesson.relatedHotspots.length ? lesson.relatedHotspots : ["Linked during content build"]} />
            </LessonPanel>
          </div>

          <LessonPanel title="Related Systems" icon={<ShieldCheck size={18} />}>
            <TagList items={lesson.relatedSystems.map(formatSystemLabel)} />
          </LessonPanel>

          <LessonPanel title="Lesson Content">
            <p>
              Full teaching content is intentionally not written in this phase. This shell gives the training team a stable page structure for future media, demonstrations, checkpoints and service examples.
            </p>
          </LessonPanel>
        </div>

        <aside className="grid content-start gap-4">
          <section className="rounded-xl border border-violet-300/20 bg-[#070b16]/92 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.3)]">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-300">Progress Placeholder</p>
            <h2 className="mt-2 text-xl font-black text-white">0% complete</h2>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-0 rounded-full bg-violet-400" />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">Local shell only. No backend progress storage has been added.</p>
          </section>

          <SideList title="Prerequisites" items={lesson.prerequisites.length ? lesson.prerequisites.map(titleFromId) : ["No prerequisite lessons"]} />

          {lesson.panelCopy ? (
            <section className="rounded-xl border border-white/10 bg-[#070b16]/92 p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">Why This Matters</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{lesson.panelCopy.whyItMatters}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500">{lesson.panelCopy.churchApplication}</p>
            </section>
          ) : null}

          <section className="rounded-xl border border-white/10 bg-[#070b16]/92 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-300">Next Lesson</p>
            {nextLesson ? (
              <>
                <h2 className="mt-2 text-lg font-black text-white">{nextLesson.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{nextLesson.description}</p>
                <Link href={`/x32/lessons/${nextLesson.id}`} className="focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-300/30 bg-violet-600/25 px-4 py-3 text-sm font-black text-violet-50 hover:bg-violet-600/35">
                  Continue
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </>
            ) : (
              <p className="mt-2 text-sm leading-6 text-slate-400">This is the end of the current placeholder sequence.</p>
            )}
          </section>
        </aside>
      </main>
    </div>
  );
}

function titleFromId(id: string) {
  return getX32Lesson(id)?.title ?? id;
}

function LessonPanel({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#070b16]/90 p-5 shadow-[0_18px_56px_rgba(0,0,0,0.24)]">
      <div className="flex items-center gap-2 text-violet-200">
        {icon}
        <h2 className="text-sm font-black uppercase tracking-[0.16em]">{title}</h2>
      </div>
      <div className="mt-4 text-sm leading-6 text-slate-300">{children}</div>
    </section>
  );
}

function LessonPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-bold text-slate-200">
      {children}
    </span>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-bold text-slate-200">
          {item}
        </span>
      ))}
    </div>
  );
}

function SideList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#070b16]/92 p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-violet-300">{title}</p>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-300">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
