"use client";

import { useMemo, useState } from "react";
import type { TroubleshootingFlow } from "@/lib/types";
import { StatusPill, SurfaceCard } from "@/components/ui";

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
    <SurfaceCard>
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-bold">{flow.title}</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{flow.symptom}</p>
        </div>
        <StatusPill tone="warning">{flow.priority}</StatusPill>
      </div>
      <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
        <p className="text-sm font-semibold text-cyan-200">Current check</p>
        <h3 className="mt-2 text-2xl font-bold">{current.prompt}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-200">{current.helpText}</p>
        {current.resolution ? <p className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm font-semibold text-emerald-100">{current.resolution}</p> : null}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {current.yes ? <button className="focus-ring rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold text-white" onClick={() => move(current.yes)}>Yes</button> : null}
        {current.no ? <button className="focus-ring rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-100" onClick={() => move(current.no)}>No</button> : null}
        <button className="focus-ring rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-100" onClick={() => { setHistory([]); setCurrentKey(firstKey); }}>Restart Flow</button>
      </div>
      {history.length ? <p className="mt-4 text-xs text-[var(--muted)]">Checks completed: {history.length}</p> : null}
    </SurfaceCard>
  );
}
