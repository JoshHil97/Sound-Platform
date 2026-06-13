"use client";

import { useMemo, useState } from "react";
import { Play, Square } from "lucide-react";
import type { AudioExample } from "@/lib/types";
import { Tag } from "@/components/ui";

type LabTone = "clean-gain" | "too-hot-clipping" | "too-low-noisy" | "rumble-hpf" | "harsh-presence" | "compression-control" | "gate-chatter" | "feedback-ring" | "stream-limiter";

export function SoundLabPlayer({ examples }: { examples: AudioExample[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [context, setContext] = useState<AudioContext | null>(null);
  const selected = useMemo(() => examples.find((example) => example.slug === activeSlug) ?? examples[0], [activeSlug, examples]);

  async function stopCurrent() {
    if (context) {
      await context.close();
      setContext(null);
    }
    setActiveSlug(null);
  }

  async function playExample(slug: string) {
    await stopCurrent();
    const audioContext = new AudioContext();
    setContext(audioContext);
    setActiveSlug(slug);
    playTone(audioContext, slug as LabTone);
    window.setTimeout(() => {
      void audioContext.close();
      setContext((current) => (current === audioContext ? null : current));
      setActiveSlug((current) => (current === slug ? null : current));
    }, 2600);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <section className="grid gap-3">
        {examples.map((example) => (
          <article key={example.slug} className="rounded-md border border-[var(--line)] bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold">{example.title}</h3>
                  <Tag>{example.category}</Tag>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{example.whatYouHear}</p>
              </div>
              <button
                type="button"
                onClick={() => activeSlug === example.slug ? void stopCurrent() : void playExample(example.slug)}
                className="focus-ring inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]"
              >
                {activeSlug === example.slug ? <Square size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
                {activeSlug === example.slug ? "Stop" : "Play"}
              </button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Checklist title="Board symptoms" items={example.boardSymptoms} />
              <Checklist title="Checks to make" items={example.checks} />
            </div>
          </article>
        ))}
      </section>

      <aside className="h-max rounded-md border border-[var(--line)] bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-xl font-bold">Listening brief</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Play examples at a comfortable volume. These are synthetic training sounds, not real service recordings, so they are rights-safe and repeatable.
        </p>
        {selected ? (
          <div className="mt-5 rounded-md bg-slate-50 p-4">
            <p className="text-sm font-semibold">Current focus</p>
            <p className="mt-2 text-lg font-bold">{selected.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{selected.whatYouHear}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.linkedLessons.map((lesson) => (
                <span key={lesson} className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-700">{lesson}</span>
              ))}
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <h4 className="text-sm font-bold">{title}</h4>
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
