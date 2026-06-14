import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, FlaskConical, RadioTower, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { PageHeader, StatusPill, SurfaceCard, Tag } from "@/components/ui";
import { PracticalWorkflowMiniCard } from "@/components/practical-training";
import { CheckListPanel, LessonDeckChrome, VisualAssetCard, VisualHeroBoard, WaveformCompareCard } from "@/components/training-visuals";
import { logicPanels, logicTemplateSnapshot, practicalTrainingWorkflows } from "@/lib/data";
import { referenceLookAssets, vbciLogicTrainingAssets } from "@/lib/training-assets";

const featuredAsset = vbciLogicTrainingAssets.find((asset) => asset.slug === "logic-course-hero") ?? vbciLogicTrainingAssets[0];
const mixerAsset = vbciLogicTrainingAssets.find((asset) => asset.slug === "logic-mixer-full") ?? vbciLogicTrainingAssets[1];
const channelAsset = vbciLogicTrainingAssets.find((asset) => asset.slug === "logic-channel-strip");
const pluginAsset = vbciLogicTrainingAssets.find((asset) => asset.slug === "plugin-window-examples");
const flowAsset = vbciLogicTrainingAssets.find((asset) => asset.slug === "livestream-signal-flow");
const setupAssets = vbciLogicTrainingAssets.filter((asset) => ["logic-io-setup", "logic-bus-setup", "logic-tracks-list", "mac-audio-midi-dante"].includes(asset.slug));
const environmentAssets = vbciLogicTrainingAssets.filter((asset) => ["control-room-photos", "church-system-diagram", "icons-visual-assets", "waveform-meter-assets", "x32-livestream-diagram"].includes(asset.slug));
const lookReferences = referenceLookAssets.filter((asset) => ["reference-logic-pro-fx", "reference-waves-fx", "reference-fx-specialist"].includes(asset.slug));

export default function LogicStreamPage() {
  const workflows = practicalTrainingWorkflows.filter((workflow) => workflow.domain === "Logic" || workflow.domain === "Waves");

  return (
    <>
      <PageHeader
        eyebrow="Next Visual Phase"
        title="Logic Stream training mode"
        description="A more visual, church-specific Logic livestream academy page using the new VBCI training asset pack, real template metadata and source-backed workflow references."
      />

      <VisualHeroBoard
        title="Logic Pro Livestream Setup"
        subtitle="Learn how this church routes X32 audio through Dante into Logic Pro, builds a livestream mix, checks buses, records safely and delivers to YouTube or Facebook."
        asset={featuredAsset}
        stats={[
          { label: "Template", value: logicTemplateSnapshot.name },
          { label: "Tracks", value: `${logicTemplateSnapshot.trackCount}` },
          { label: "Audio", value: logicTemplateSnapshot.sampleRate },
          { label: "Training", value: "15 lesson path" }
        ]}
      />

      <section className="mt-6 grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          <LessonDeckChrome
            title="Logic Livestream Specialist"
            lessonLabel="Lesson Board"
            progress={47}
            sidebar={
              <div className="grid gap-4">
                <CheckListPanel title="Pre-service checks" items={["DVS selected in Logic", "48 kHz confirmed", "Bus 9-10 livestream mix active", "Bus 11-12 record mix ready", "OBS or stream capture receiving output"]} />
                <WaveformCompareCard />
              </div>
            }
          >
            <div className="grid gap-5">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                {mixerAsset ? <VisualAssetCard asset={mixerAsset} large /> : null}
                <div className="grid gap-4">
                  {channelAsset ? <VisualAssetCard asset={channelAsset} /> : null}
                  {pluginAsset ? <VisualAssetCard asset={pluginAsset} /> : null}
                </div>
              </div>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {logicPanels.map((panel) => (
                  <article key={panel.title} className="rounded-2xl border border-white/15 bg-black/25 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-black">{panel.title}</h3>
                      <StatusPill>{panel.status}</StatusPill>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{panel.summary}</p>
                    <ul className="mt-4 grid gap-2 text-sm text-slate-300">
                      {panel.checks.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-300" />{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </section>
            </div>
          </LessonDeckChrome>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {setupAssets.map((asset) => <VisualAssetCard key={asset.slug} asset={asset} />)}
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            {flowAsset ? <VisualAssetCard asset={flowAsset} large /> : null}
            <SurfaceCard>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-300">Signal Flow Mission</p>
                  <h2 className="mt-1 text-2xl font-black">Trace every handoff before touching plugins</h2>
                </div>
                <RadioTower className="text-cyan-300" />
              </div>
              <div className="mt-5 grid gap-3">
                {["Behringer X32 sends the livestream feed", "Dante Virtual Soundcard receives network audio", "Logic Pro processes and mixes", "Bus 9-10 feeds livestream", "Bus 11-12 feeds recording"].map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-500/20 text-sm font-black text-violet-100">{index + 1}</span>
                    <p className="text-sm leading-6 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          </section>

          <section>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Environment Assets</p>
                <h2 className="mt-1 text-3xl font-black">Room, system and visual language</h2>
              </div>
              <StatusPill tone="success">Imported</StatusPill>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {environmentAssets.map((asset) => <VisualAssetCard key={asset.slug} asset={asset} />)}
            </div>
          </section>
        </div>

        <aside className="grid content-start gap-4">
          <SurfaceCard>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black">Source-backed template</h2>
              <ShieldCheck className="text-emerald-300" />
            </div>
            <div className="mt-4 grid gap-3">
              <InfoLine label="Template" value={logicTemplateSnapshot.name} />
              <InfoLine label="Sample rate" value={logicTemplateSnapshot.sampleRate} />
              <InfoLine label="Tracks" value={`${logicTemplateSnapshot.trackCount}`} />
              <InfoLine label="Tempo" value={logicTemplateSnapshot.tempo} />
              <InfoLine label="Key" value={logicTemplateSnapshot.key} />
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-xl font-black">Plugin language</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {logicTemplateSnapshot.observedPlugins.slice(0, 11).map((plugin) => <Tag key={plugin}>{plugin}</Tag>)}
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Use this as the bridge between the real template and the FX Specialist lesson look.</p>
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-xl font-black">Reference look target</h2>
            <div className="mt-4 grid gap-3">
              {lookReferences.map((asset) => (
                <Link key={asset.slug} href={asset.src} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-3 hover:border-violet-300/30">
                  <p className="font-bold group-hover:text-violet-100">{asset.title}</p>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{asset.purpose}</p>
                </Link>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <h2 className="text-xl font-black">Practical drills</h2>
            <div className="mt-4 grid gap-3">
              {workflows.map((workflow) => <PracticalWorkflowMiniCard key={workflow.slug} workflow={workflow} />)}
            </div>
          </SurfaceCard>
        </aside>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { icon: SlidersHorizontal, title: "Mixer view first", text: "Every Logic lesson should begin with what the operator sees in the actual template." },
          { icon: FlaskConical, title: "Listen and compare", text: "FX and gain lessons need A/B listening prompts, waveform references and meter behavior." },
          { icon: FileText, title: "Source notes visible", text: "Each image must say where it came from and which lesson or checklist it supports." }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <SurfaceCard key={item.title}>
              <Icon className="text-violet-300" />
              <h2 className="mt-3 text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
            </SurfaceCard>
          );
        })}
      </section>

      <div className="mt-6 flex justify-end">
        <Link href="/visuals" className="focus-ring inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-black text-white hover:bg-violet-500">
          Open Visual Registry
          <ArrowRight size={17} />
        </Link>
      </div>
    </>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}
