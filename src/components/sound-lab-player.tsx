"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Ear, HelpCircle, Play, RotateCcw, Shuffle, Square, XCircle } from "lucide-react";
import type { AudioExample } from "@/lib/types";
import { Meter, StatusPill, Tag } from "@/components/ui";

type LabTone = AudioExample["slug"];
type VariantKey = "A" | "B" | "C" | "Ref";

const diagnoses = [
  "Healthy gain structure",
  "Input clipping",
  "Low gain and raised noise floor",
  "Harsh upper-mid EQ",
  "Low-mid masking",
  "Over-compression",
  "Feedback build-up",
  "Limiter pushed too hard",
  "Livestream lacks space",
  "Too much room in stream",
  "Low livestream loudness",
  "Digital stream clipping",
  "Excessive sibilance",
  "Gate threshold too aggressive"
];

const firstChecks = [
  "Set preamp gain from real source level",
  "Lower the first red meter in the path",
  "Engage HPF and compare in context",
  "Bypass processing before adding more",
  "Check Dante/DVS/Logic route",
  "Identify mic and lower monitor safely",
  "Check audience mic and stream bus balance",
  "Log the root cause after recovery"
];

export function SoundLabPlayer({ examples }: { examples: AudioExample[] }) {
  const [activeSlug, setActiveSlug] = useState(examples[0]?.slug ?? null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [context, setContext] = useState<AudioContext | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null);
  const [selectedFirstCheck, setSelectedFirstCheck] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const selected = useMemo(() => examples.find((example) => example.slug === activeSlug) ?? examples[0], [activeSlug, examples]);
  const selectedMeter = selected?.meterProfile ?? { input: 70, output: 67, gainReduction: 24, noiseFloor: 18, clipping: false };
  const correctDiagnosis = selected?.diagnosis ?? selected?.title;
  const correct = Boolean(revealed && selectedDiagnosis === correctDiagnosis);

  useEffect(() => {
    return () => {
      if (context && context.state !== "closed") {
        void context.close();
      }
    };
  }, [context]);

  async function stopCurrent() {
    if (context && context.state !== "closed") {
      await context.close();
      setContext(null);
    }
    setPlayingId(null);
  }

  async function playExample(slug: string, variant: VariantKey = "A") {
    await stopCurrent();
    const audioContext = new AudioContext();
    setContext(audioContext);
    const id = `${slug}-${variant}`;
    setPlayingId(id);
    playTone(audioContext, slug as LabTone, variant);
    window.setTimeout(() => {
      void audioContext.close();
      setContext((current) => (current === audioContext ? null : current));
      setPlayingId((current) => (current === id ? null : current));
    }, 2800);
  }

  function chooseScenario(slug: string) {
    setActiveSlug(slug);
    resetAnswer();
  }

  function resetAnswer() {
    setRevealed(false);
    setSelectedDiagnosis(null);
    setSelectedFirstCheck(null);
  }

  function revealAnswer() {
    setAttempts((value) => value + 1);
    setRevealed(true);
  }

  if (!selected) {
    return null;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[340px_1fr_340px]">
      <section className="glass-panel rounded-3xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">Scenario Bank</p>
            <h2 className="mt-1 font-black">Choose a fault</h2>
          </div>
          <button type="button" className="focus-ring rounded-xl border border-violet-400/30 p-2 text-violet-100 hover:bg-violet-500/15" onClick={() => chooseScenario(examples[Math.floor(Math.random() * examples.length)].slug)}>
            <Shuffle size={16} aria-hidden="true" />
            <span className="sr-only">Random scenario</span>
          </button>
        </div>
        <div className="mt-4 grid max-h-[680px] gap-2 overflow-y-auto pr-1">
          {examples.map((example) => (
            <button key={example.slug} type="button" onClick={() => chooseScenario(example.slug)} className={`focus-ring rounded-2xl border p-3 text-left transition ${selected.slug === example.slug ? "border-violet-300/60 bg-violet-500/20" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold">{example.title}</p>
                <StatusPill tone={example.difficulty === "Hard" ? "danger" : example.difficulty === "Medium" ? "warning" : "info"}>{example.difficulty ?? "Easy"}</StatusPill>
              </div>
              <p className="mt-1 text-xs font-semibold text-cyan-200">{example.category}</p>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{example.whatYouHear}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Listen, diagnose, choose the first check</p>
            <h2 className="mt-2 text-2xl font-black">{selected.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{selected.whatYouHear}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => playingId?.startsWith(selected.slug) ? void stopCurrent() : void playExample(selected.slug, "A")} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.35)]">
              {playingId?.startsWith(selected.slug) ? <Square size={17} /> : <Play size={17} />}
              {playingId?.startsWith(selected.slug) ? "Stop" : "Play Current"}
            </button>
            <button type="button" onClick={resetAnswer} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-slate-100 hover:bg-white/[0.08]">
              <RotateCcw size={17} />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="flex h-32 items-center gap-1 overflow-hidden">
            {Array.from({ length: 92 }).map((_, index) => {
              const height = waveformHeight(index, selected.slug);
              const danger = selected.meterProfile?.clipping && index % 9 === 0;
              return <span key={`${selected.slug}-wave-${index}`} className={`w-full rounded-full ${danger ? "bg-red-400" : "bg-gradient-to-t from-violet-700 to-cyan-300"}`} style={{ height: `${height}%`, opacity: index % 7 === 0 ? 1 : 0.62 }} />;
            })}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {(["A", "B", "C", "Ref"] as VariantKey[]).map((variant) => {
              const variantLabel = selected.variants?.find((item) => item.key === variant)?.label ?? (variant === "Ref" ? "Reference" : `Variant ${variant}`);
              const id = `${selected.slug}-${variant}`;
              return (
                <button key={variant} type="button" onClick={() => void playExample(selected.slug, variant)} className={`focus-ring rounded-xl border py-2 text-sm font-bold ${playingId === id ? "border-cyan-300 bg-cyan-300/20 text-white" : "border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]"}`}>
                  {variant}: {variantLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <QuestionPanel
            title="What is the fault?"
            icon={<Ear size={18} />}
            options={diagnoses}
            selected={selectedDiagnosis}
            onSelect={setSelectedDiagnosis}
            correct={revealed ? correctDiagnosis : null}
          />
          <QuestionPanel
            title="What would you check first?"
            icon={<HelpCircle size={18} />}
            options={firstChecks}
            selected={selectedFirstCheck}
            onSelect={setSelectedFirstCheck}
            correct={revealed ? selected.firstSafeCheck ?? selected.checks[0] : null}
          />
        </div>

        <button onClick={revealAnswer} className="focus-ring mt-4 w-full rounded-xl bg-violet-500/90 px-4 py-3 text-sm font-bold text-white hover:bg-violet-500">Reveal answer and recommended fix</button>

        {revealed ? (
          <div className={`mt-4 rounded-2xl border p-4 ${correct ? "border-emerald-400/20 bg-emerald-400/10" : "border-amber-400/20 bg-amber-400/10"}`}>
            <div className={`flex items-center gap-2 font-bold ${correct ? "text-emerald-200" : "text-amber-200"}`}>
              {correct ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
              {correct ? "Diagnosis matched" : "Review the diagnosis"}
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-bold text-white">Correct diagnosis</p>
                <p className="mt-1 text-sm leading-6 text-slate-200">{correctDiagnosis}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Recommended fix</p>
                <p className="mt-1 text-sm leading-6 text-slate-200">{selected.recommendedFix ?? selected.checks.join(" ")}</p>
              </div>
            </div>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-100">
              {selected.checks.map((check) => <li key={check} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-300" />{check}</li>)}
            </ul>
          </div>
        ) : null}
      </section>

      <aside className="glass-panel rounded-3xl p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-bold">Visual reference</h2>
          <StatusPill tone={selectedMeter.clipping ? "danger" : "success"}>{selectedMeter.clipping ? "Clipping" : "No clip"}</StatusPill>
        </div>
        <div className="mt-5 grid gap-4">
          <Meter label="Input Meter" value={selectedMeter.input} />
          <Meter label="Output Meter" value={selectedMeter.output} />
          <Meter label="Gain Reduction" value={selectedMeter.gainReduction} />
          <Meter label="Noise Floor" value={selectedMeter.noiseFloor} />
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>20</span><span>100</span><span>1k</span><span>10k</span><span>20k</span>
          </div>
          <div className="mt-3 flex h-32 items-end gap-1">
            {Array.from({ length: 42 }).map((_, index) => (
              <span key={`${selected.slug}-spectrum-${index}`} className="w-full rounded-t bg-violet-500/70" style={{ height: `${spectrumHeight(index, selected.slug)}%` }} />
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{selected.spectrumHint}</p>
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-200"><XCircle size={17} /> Board symptoms</div>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
            {selected.boardSymptoms.map((symptom) => <li key={symptom}>- {symptom}</li>)}
          </ul>
        </div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-bold text-cyan-200">Related lessons</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selected.linkedLessons.map((lesson) => <Link key={lesson} href={`/lessons/${lesson}`}><Tag>{lesson.replaceAll("-", " ")}</Tag></Link>)}
          </div>
        </div>
        {selected.relatedTroubleshooting?.length ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm font-bold text-violet-200">Troubleshooting links</p>
            <div className="mt-3 grid gap-2">
              {selected.relatedTroubleshooting.map((flow) => (
                <Link key={flow} href={`/troubleshooting/${flow}`} className="focus-ring rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-bold text-slate-100 hover:bg-violet-500/15">
                  {flow.replaceAll("-", " ")}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        <p className="mt-5 text-xs leading-5 text-[var(--muted)]">Attempts this session: {attempts}. Future phase: persist Sound Lab attempts to certification evidence.</p>
      </aside>
    </div>
  );
}

function QuestionPanel({
  title,
  icon,
  options,
  selected,
  onSelect,
  correct
}: {
  title: string;
  icon: React.ReactNode;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  correct: string | null;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center gap-2 text-sm font-black text-white">
        <span className="text-cyan-300">{icon}</span>
        {title}
      </div>
      <div className="mt-3 grid gap-2">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = correct === option;
          return (
            <button key={option} type="button" onClick={() => onSelect(option)} className={`focus-ring rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${isCorrect ? "border-emerald-300/50 bg-emerald-400/15 text-emerald-50" : isSelected ? "border-violet-300/60 bg-violet-500/20 text-white" : "border-white/10 bg-black/20 text-slate-300 hover:bg-white/[0.06]"}`}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function playTone(context: AudioContext, tone: LabTone, variant: VariantKey) {
  const destination = context.createGain();
  destination.gain.value = variant === "Ref" ? 0.12 : 0.14;
  destination.connect(context.destination);

  if (tone === "feedback-ring") {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.setValueAtTime(960, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1180, context.currentTime + 1.8);
    gain.gain.setValueAtTime(0.005, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(variant === "Ref" ? 0.09 : 0.28, context.currentTime + 1.5);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 2.3);
    oscillator.connect(gain).connect(destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 2.4);
    return;
  }

  const buffer = context.createBuffer(1, context.sampleRate * 2.6, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    const time = index / context.sampleRate;
    const phrase = Math.sin(2 * Math.PI * 2.1 * time) > -0.2 ? 1 : 0.18;
    const noise = (Math.random() * 2 - 1) * 0.042;
    let sample = makeSpeechLikeSignal(time, phrase);

    if (variant === "Ref") sample *= 0.72;
    if (variant === "B") sample = applyVariantB(tone, sample, time, phrase, noise);
    if (variant === "C") sample = applyVariantC(tone, sample, time, phrase, noise);
    if (variant === "A") sample = applyScenario(tone, sample, time, phrase, noise);

    data[index] = sample;
  }

  const source = context.createBufferSource();
  source.buffer = buffer;

  if (tone === "rumble-hpf") {
    const dry = context.createGain();
    const wet = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 120;
    dry.gain.setValueAtTime(1, context.currentTime);
    dry.gain.setValueAtTime(0, context.currentTime + 1.25);
    wet.gain.setValueAtTime(0, context.currentTime);
    wet.gain.setValueAtTime(1, context.currentTime + 1.25);
    source.connect(dry).connect(destination);
    source.connect(filter).connect(wet).connect(destination);
  } else {
    source.connect(destination);
  }

  source.start();
}

function makeSpeechLikeSignal(time: number, phrase: number) {
  return (Math.sin(2 * Math.PI * 180 * time) * 0.28 + Math.sin(2 * Math.PI * 720 * time) * 0.08 + Math.sin(2 * Math.PI * 1420 * time) * 0.04) * phrase;
}

function applyScenario(tone: LabTone, sample: number, time: number, phrase: number, noise: number) {
  if (tone === "too-hot-clipping" || tone === "stream-clipping") return clamp(sample * 4.2, -0.55, 0.55);
  if (tone === "too-low-noisy") return sample * 0.18 + noise * 2.2;
  if (tone === "rumble-hpf") return sample + Math.sin(2 * Math.PI * 48 * time) * 0.28;
  if (tone === "harsh-presence" || tone === "sibilance-deess") return sample + Math.sin(2 * Math.PI * 3600 * time) * 0.16 * phrase;
  if (tone === "muddy-low-mids" || tone === "stream-too-roomy") return sample + Math.sin(2 * Math.PI * 280 * time) * 0.18 * phrase;
  if (tone === "compression-control") return Math.tanh(sample * (phrase > 0.8 ? 1.8 : 3.2)) * 0.45;
  if (tone === "over-compressed-vocal" || tone === "stream-limiter") return Math.tanh(sample * 4.0) * 0.48 + noise * 0.12;
  if (tone === "gate-chatter") return phrase > 0.6 ? sample : noise * 0.12;
  if (tone === "stream-too-dry") return sample * 0.9;
  if (tone === "stream-too-quiet") return sample * 0.34;
  return sample;
}

function applyVariantB(tone: LabTone, sample: number, time: number, phrase: number, noise: number) {
  if (tone.includes("gain")) return sample * 0.18 + noise * 1.5;
  return applyScenario(tone, sample, time, phrase, noise);
}

function applyVariantC(tone: LabTone, sample: number, time: number, phrase: number, noise: number) {
  if (tone.includes("gain")) return clamp(sample * 3.9, -0.5, 0.5);
  return Math.tanh(applyScenario(tone, sample, time, phrase, noise) * 2.4) * 0.52;
}

function waveformHeight(index: number, slug: string) {
  const base = 18 + Math.abs(Math.sin(index * 0.42 + slug.length)) * 70;
  if (slug.includes("quiet") || slug.includes("low")) return base * 0.55;
  if (slug.includes("clipping") || slug.includes("limiter") || slug.includes("compressed")) return 58 + Math.abs(Math.sin(index * 0.9)) * 28;
  return base;
}

function spectrumHeight(index: number, slug: string) {
  const base = 20 + Math.abs(Math.cos(index * 0.42 + slug.length)) * 58;
  if (slug.includes("muddy") || slug.includes("roomy")) return index < 15 ? base + 22 : base * 0.7;
  if (slug.includes("harsh") || slug.includes("sibilance")) return index > 25 ? base + 24 : base * 0.72;
  if (slug.includes("rumble")) return index < 6 ? 92 : base * 0.55;
  if (slug.includes("feedback")) return index === 24 ? 98 : base * 0.45;
  return base;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
