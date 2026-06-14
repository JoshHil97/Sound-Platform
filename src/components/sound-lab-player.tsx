"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Play, Shuffle, Square, XCircle } from "lucide-react";
import type { AudioExample } from "@/lib/types";
import { Meter, StatusPill } from "@/components/ui";

type LabTone = AudioExample["slug"];

const diagnoses = ["Clipping / Distortion", "Low Gain / Noise", "Feedback", "Harsh / Bright", "Muddy / Boomy", "Dynamics Problem"];

export function SoundLabPlayer({ examples }: { examples: AudioExample[] }) {
  const [activeSlug, setActiveSlug] = useState(examples[0]?.slug ?? null);
  const [playingSlug, setPlayingSlug] = useState<string | null>(null);
  const [context, setContext] = useState<AudioContext | null>(null);
  const [revealed, setRevealed] = useState(false);
  const selected = useMemo(() => examples.find((example) => example.slug === activeSlug) ?? examples[0], [activeSlug, examples]);

  async function stopCurrent() {
    if (context) {
      await context.close();
      setContext(null);
    }
    setPlayingSlug(null);
  }

  async function playExample(slug: string) {
    await stopCurrent();
    const audioContext = new AudioContext();
    setContext(audioContext);
    setPlayingSlug(slug);
    playTone(audioContext, slug as LabTone);
    window.setTimeout(() => {
      void audioContext.close();
      setContext((current) => (current === audioContext ? null : current));
      setPlayingSlug((current) => (current === slug ? null : current));
    }, 2600);
  }

  function chooseScenario(slug: string) {
    setActiveSlug(slug);
    setRevealed(false);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[330px_1fr_320px]">
      <section className="glass-panel rounded-3xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Choose a scenario</h2>
          <button type="button" className="focus-ring rounded-xl border border-violet-400/30 p-2 text-violet-100" onClick={() => chooseScenario(examples[Math.floor(Math.random() * examples.length)].slug)}>
            <Shuffle size={16} aria-hidden="true" />
            <span className="sr-only">Random scenario</span>
          </button>
        </div>
        <div className="mt-4 grid gap-2">
          {examples.map((example) => (
            <button key={example.slug} type="button" onClick={() => chooseScenario(example.slug)} className={`focus-ring rounded-2xl border p-3 text-left transition ${selected?.slug === example.slug ? "border-violet-300/60 bg-violet-500/20" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"}`}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold">{example.title}</p>
                <StatusPill>{example.category}</StatusPill>
              </div>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{example.whatYouHear}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Listen and diagnose</p>
            <h2 className="mt-2 text-2xl font-black">{selected?.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{selected?.whatYouHear}</p>
          </div>
          {selected ? (
            <button type="button" onClick={() => playingSlug === selected.slug ? void stopCurrent() : void playExample(selected.slug)} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.35)]">
              {playingSlug === selected.slug ? <Square size={17} /> : <Play size={17} />}
              {playingSlug === selected.slug ? "Stop" : "Play A/B"}
            </button>
          ) : null}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="flex h-28 items-center gap-1 overflow-hidden">
            {Array.from({ length: 80 }).map((_, index) => (
              <span key={index} className="w-full rounded-full bg-gradient-to-t from-violet-700 to-cyan-300" style={{ height: `${18 + Math.abs(Math.sin(index * 0.42)) * 78}%`, opacity: index % 7 === 0 ? 1 : 0.62 }} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {["A", "B", "C", "Ref"].map((item) => <button key={item} className="rounded-xl border border-white/10 bg-white/[0.04] py-2 text-sm font-bold text-slate-200">{item}</button>)}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">What do you hear?</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {diagnoses.map((diagnosis) => (
              <button key={diagnosis} className="focus-ring rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-slate-200 hover:border-violet-400/40 hover:bg-violet-500/10">
                {diagnosis}
              </button>
            ))}
          </div>
          <button onClick={() => setRevealed(true)} className="focus-ring mt-4 w-full rounded-xl bg-violet-500/90 px-4 py-3 text-sm font-bold text-white hover:bg-violet-500">Reveal answer and recommended fix</button>
          {revealed && selected ? (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <div className="flex items-center gap-2 text-emerald-200"><CheckCircle2 size={18} /> Recommended first checks</div>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-emerald-50">
                {selected.checks.map((check) => <li key={check}>- {check}</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <aside className="glass-panel rounded-3xl p-5">
        <h2 className="font-bold">Visual reference</h2>
        <div className="mt-5 grid gap-4">
          <Meter label="Input Meter" value={selected?.slug.includes("clipping") ? 96 : selected?.slug.includes("low") ? 24 : 72} />
          <Meter label="Output Meter" value={selected?.slug.includes("limiter") ? 91 : 67} />
          <Meter label="Gain Reduction" value={selected?.category === "Dynamics" ? 68 : 28} />
          <Meter label="Noise Floor" value={selected?.slug.includes("noisy") ? 70 : 18} />
        </div>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>20</span><span>100</span><span>1k</span><span>10k</span><span>20k</span>
          </div>
          <div className="mt-3 flex h-32 items-end gap-1">
            {Array.from({ length: 36 }).map((_, index) => (
              <span key={index} className="w-full rounded-t bg-violet-500/70" style={{ height: `${20 + Math.abs(Math.cos(index * 0.55)) * 70}%` }} />
            ))}
          </div>
        </div>
        {selected ? (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-200"><XCircle size={17} /> Board symptoms</div>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[var(--muted)]">
              {selected.boardSymptoms.map((symptom) => <li key={symptom}>- {symptom}</li>)}
            </ul>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function playTone(context: AudioContext, tone: LabTone) {
  const destination = context.createGain();
  destination.gain.value = 0.14;
  destination.connect(context.destination);

  if (tone === "feedback-ring") {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.setValueAtTime(960, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1180, context.currentTime + 1.7);
    gain.gain.setValueAtTime(0.005, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.28, context.currentTime + 1.4);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 2.1);
    oscillator.connect(gain).connect(destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 2.2);
    return;
  }

  const buffer = context.createBuffer(1, context.sampleRate * 2.4, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    const time = index / context.sampleRate;
    const speech = Math.sin(2 * Math.PI * 180 * time) * 0.28 + Math.sin(2 * Math.PI * 720 * time) * 0.08 + Math.sin(2 * Math.PI * 1420 * time) * 0.04;
    const phrase = Math.sin(2 * Math.PI * 2.2 * time) > -0.25 ? 1 : 0.18;
    const noise = (Math.random() * 2 - 1) * 0.045;
    let sample = speech * phrase;

    if (tone === "too-hot-clipping") sample = clamp(sample * 4.2, -0.55, 0.55);
    if (tone === "too-low-noisy") sample = sample * 0.18 + noise * 2.2;
    if (tone === "rumble-hpf") sample += Math.sin(2 * Math.PI * 48 * time) * 0.28;
    if (tone === "harsh-presence") sample += Math.sin(2 * Math.PI * 3100 * time) * 0.16 * phrase;
    if (tone === "compression-control") sample = Math.tanh(sample * (phrase > 0.8 ? 1.8 : 3.2)) * 0.45;
    if (tone === "gate-chatter") sample = phrase > 0.6 ? sample : noise * 0.12;
    if (tone === "stream-limiter") sample = Math.tanh(sample * 3.8) * 0.48;

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
    dry.gain.setValueAtTime(0, context.currentTime + 1.15);
    wet.gain.setValueAtTime(0, context.currentTime);
    wet.gain.setValueAtTime(1, context.currentTime + 1.15);
    source.connect(dry).connect(destination);
    source.connect(filter).connect(wet).connect(destination);
  } else {
    source.connect(destination);
  }

  source.start();
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
