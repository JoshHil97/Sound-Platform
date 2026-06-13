"use client";

import { useMemo, useState } from "react";
import type { TroubleshootingFlow } from "@/lib/types";

export function TroubleshootingRunner({ flow }: { flow: TroubleshootingFlow }) {
  const firstKey = flow.steps[0]?.key ?? "";
  const [currentKey, setCurrentKey] = useState(firstKey);
  const [history, setHistory] = useState<string[]>([]);
  const current = useMemo(() => flow.steps.find((step) => step.key === currentKey) ?? flow.steps[0], [currentKey, flow.steps]);

  function move(next?: string) {
    if (!next) {
      return;
    }
    setHistory((items) => [...items, current.key]);
    setCurrentKey(next);
  }

  return (
    <section className="rounded-md border border-[var(--line)] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-bold">{flow.title}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{flow.symptom}</p>
        </div>
        <span className="rounded-md bg-amber-100 px-3 py-2 text-xs font-bold text-amber-800">{flow.priority}</span>
      </div>
      <div className="mt-5 rounded-md border border-teal-100 bg-teal-50 p-5">
        <p className="text-sm font-semibold text-teal-800">Current check</p>
        <h3 className="mt-2 text-2xl font-bold">{current.prompt}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">{current.helpText}</p>
        {current.resolution ? <p className="mt-4 rounded-md bg-white p-3 text-sm font-semibold text-[var(--accent-strong)]">{current.resolution}</p> : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {current.yes ? <button className="focus-ring rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white" onClick={() => move(current.yes)}>Yes</button> : null}
        {current.no ? <button className="focus-ring rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold" onClick={() => move(current.no)}>No</button> : null}
        <button className="focus-ring rounded-md border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold" onClick={() => { setHistory([]); setCurrentKey(firstKey); }}>Restart Flow</button>
      </div>
      {history.length ? <p className="mt-4 text-xs text-[var(--muted)]">Checks completed: {history.length}</p> : null}
    </section>
  );
}
