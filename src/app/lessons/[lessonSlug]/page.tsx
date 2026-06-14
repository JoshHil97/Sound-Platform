import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkedAction, PageHeader, SurfaceCard, Tag } from "@/components/ui";
import { QuizRunner } from "@/components/quiz-runner";
import { getLesson, getModule, getQuizForLesson, lessonGuides } from "@/lib/data";

export default async function LessonPage({ params }: { params: Promise<{ lessonSlug: string }> }) {
  const { lessonSlug } = await params;
  const lesson = getLesson(lessonSlug);
  if (!lesson) {
    notFound();
  }
  const academyModule = getModule(lesson.moduleSlug);
  const quiz = getQuizForLesson(lesson.slug);
  const guide = lessonGuides.find((item) => item.lessonSlug === lesson.slug);

  return (
    <>
      <PageHeader eyebrow={academyModule?.title} title={lesson.title} description={lesson.summary} action={{ href: `/academy/${lesson.moduleSlug}`, label: "Back to Module" }} />
      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <SurfaceCard className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            <Tag>{lesson.difficulty}</Tag>
            <Tag>{lesson.durationMinutes} min</Tag>
            <Tag>Mentor sign-off</Tag>
          </div>
          <div className="mt-5 grid gap-4">
            <ContentBlock title="Beginner Explanation" body={lesson.beginner} />
            <ContentBlock title="Intermediate Explanation" body={lesson.intermediate} />
            <ContentBlock title="Advanced Explanation" body={lesson.advanced} />
            {guide ? (
              <section className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <h2 className="font-bold">Church Console Walkthrough</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{guide.coreIdea}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <ListBlock title="Board checks" items={guide.boardChecks} />
                  <ListBlock title="Listen for" items={guide.listeningTargets} />
                  <ListBlock title="Common mistakes" items={guide.commonMistakes} />
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                    <h3 className="text-sm font-bold text-amber-200">Mentor prompt</h3>
                    <p className="mt-2 text-sm leading-6 text-amber-50">{guide.mentorPrompt}</p>
                  </div>
                </div>
              </section>
            ) : null}
            <ContentBlock title="Practical Exercise" body={lesson.practical} />
            <ContentBlock title="Active Recall" body={lesson.recall} />
            <ContentBlock title="Spaced Repetition" body={lesson.spaced} />
            <ContentBlock title="Certification Criteria" body={lesson.signoff} />
          </div>
        </SurfaceCard>
        <SurfaceCard>
          <h2 className="text-xl font-bold">Church-specific notes</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Add local screenshots, exact X32 channels, Dante device names, Logic template links, Waves presets and room-specific warnings here.
          </p>
          <div className="mt-4"><LinkedAction href="/sound-lab">Open Sound Lab listening examples</LinkedAction></div>
          {lesson.troubleshootingLinks.length ? (
            <div className="mt-5">
              <h3 className="text-sm font-semibold">Related troubleshooting</h3>
              <div className="mt-2 grid gap-2">
                {lesson.troubleshootingLinks.map((slug) => (
                  <Link key={slug} className="focus-ring rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold hover:bg-amber-400/10" href={`/troubleshooting/${slug}`}>
                    Open {slug.replaceAll("-", " ")}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </SurfaceCard>
      </section>
      {quiz ? <QuizRunner quiz={quiz} /> : null}
    </>
  );
}

function ContentBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <h2 className="font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
    </section>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <h3 className="text-sm font-bold">{title}</h3>
      <ul className="mt-2 grid gap-2 text-sm leading-6 text-[var(--muted)]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
