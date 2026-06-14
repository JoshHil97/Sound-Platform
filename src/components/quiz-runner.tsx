"use client";

import { useMemo, useState } from "react";
import type { Quiz } from "@/lib/types";
import { StatusPill, SurfaceCard } from "@/components/ui";

export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => {
    const correct = quiz.questions.filter((question, index) => answers[index] === question.answer).length;
    return Math.round((correct / quiz.questions.length) * 100);
  }, [answers, quiz.questions]);

  return (
    <SurfaceCard>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          <p className="text-sm text-[var(--muted)]">Pass score: {quiz.passScore}%</p>
        </div>
        {submitted ? <StatusPill tone={score >= quiz.passScore ? "success" : "warning"}>{score}%</StatusPill> : null}
      </div>
      <div className="mt-5 grid gap-5">
        {quiz.questions.map((question, index) => (
          <fieldset key={question.prompt} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <legend className="px-1 text-sm font-semibold">{question.prompt}</legend>
            <div className="mt-3 grid gap-2">
              {question.options.map((option) => (
                <label key={option} className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-200 hover:bg-violet-500/10">
                  <input type="radio" name={`question-${index}`} value={option} checked={answers[index] === option} onChange={() => setAnswers((current) => ({ ...current, [index]: option }))} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {submitted ? <p className="mt-3 text-sm text-[var(--muted)]">{question.rationale}</p> : null}
          </fieldset>
        ))}
      </div>
      <button className="focus-ring mt-5 rounded-xl bg-violet-500 px-4 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.25)] hover:bg-violet-400" onClick={() => setSubmitted(true)}>
        Submit Knowledge Check
      </button>
    </SurfaceCard>
  );
}
