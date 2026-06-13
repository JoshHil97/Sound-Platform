"use client";

import { useMemo, useState } from "react";
import type { Quiz } from "@/lib/types";

export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = useMemo(() => {
    const correct = quiz.questions.filter((question, index) => answers[index] === question.answer).length;
    return Math.round((correct / quiz.questions.length) * 100);
  }, [answers, quiz.questions]);

  return (
    <section className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          <p className="text-sm text-[var(--muted)]">Pass score: {quiz.passScore}%</p>
        </div>
        {submitted ? <span className="rounded-md bg-teal-50 px-3 py-2 text-sm font-bold text-teal-800">{score}%</span> : null}
      </div>
      <div className="mt-5 grid gap-5">
        {quiz.questions.map((question, index) => (
          <fieldset key={question.prompt} className="rounded-md border border-[var(--line)] p-4">
            <legend className="px-1 text-sm font-semibold">{question.prompt}</legend>
            <div className="mt-3 grid gap-2">
              {question.options.map((option) => (
                <label key={option} className="flex items-start gap-2 rounded-md border border-slate-200 p-3 text-sm hover:bg-slate-50">
                  <input type="radio" name={`question-${index}`} value={option} checked={answers[index] === option} onChange={() => setAnswers((current) => ({ ...current, [index]: option }))} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {submitted ? <p className="mt-3 text-sm text-[var(--muted)]">{question.rationale}</p> : null}
          </fieldset>
        ))}
      </div>
      <button className="focus-ring mt-5 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]" onClick={() => setSubmitted(true)}>
        Submit Knowledge Check
      </button>
    </section>
  );
}
