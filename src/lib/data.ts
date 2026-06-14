import type { Academy, ActivityItem, AudioExample, Certification, CertificationDefinition, CertificationEvidence, Competency, CurriculumAssessment, Equipment, EvidenceRecord, LearningOutcome, Lesson, LessonGuide, Module, PracticalExercise, ProgressionRule, Quiz, RoadmapNode, ServiceChecklistItem, ServiceExperienceRecord, Skill, SkillTree, SOP, SystemHealth, TrainingPanel, TrainingVideo, TroubleshootingFlow, User, VisualSource } from "@/lib/types";

export const modules: Module[] = [
  ["ministry-safety-signal-flow", "Ministry, Safety and Signal Flow", "Foundations", "Service mindset, safe operation and end-to-end signal flow.", "2-3 hrs"],
  ["church-layout-gain-structure", "Church System Layout and Gain Structure", "Foundations", "Room layout, console path, stream path and clean nominal levels.", "3-4 hrs"],
  ["microphones-di-stage-basics", "Microphones, DI and Stage Basics", "Foundations", "Source capture, mic choice, DI use, polarity and stage etiquette.", "3-4 hrs"],
  ["x32-fundamentals", "Behringer X32 Fundamentals", "Foundations", "Channels, layers, buses, DCAs, mute groups, scenes and basic sends.", "4-6 hrs"],
  ["monitoring-p16-talkback", "Monitoring, P16 and Talkback Basics", "Foundations", "Personal monitoring, stage communication and talkback discipline.", "2-3 hrs"],
  ["critical-listening", "Critical Listening and Hearing Training", "Foundations", "Shared listening language before EQ, compression or routing changes.", "3-4 hrs + ongoing"],
  ["service-prep-patching-line-check", "Service Prep, Patching and Line Check", "Operator", "Repeatable pre-service setup and source verification.", "3-4 hrs"],
  ["foh-mixing-fundamentals", "FOH Mixing Fundamentals", "Operator", "Speech-first, worship-supporting room mixes.", "6-8 hrs"],
  ["x32-eq-dynamics-fx", "EQ, Gates, Compression and FX on X32", "Operator", "Intentional processing by source, context and service priority.", "6-8 hrs"],
  ["wireless-choir-worship-mixing", "Wireless, Choir, Speech and Worship Mixing", "Operator", "High-risk RF workflows, choir blend and church-specific transitions.", "5-7 hrs"],
  ["advanced-x32-routing-showfiles", "Advanced X32 Routing, Showfiles and Snippets", "Engineer", "Buses, matrices, scenes, snippets, showfiles and rollback plans.", "6-8 hrs"],
  ["livestream-signal-design", "Livestream Signal Design", "Engineer", "FOH and stream as different mixes with resilient routing.", "4-6 hrs"],
  ["logic-pro-livestream-mixing", "Logic Pro Livestream Mixing", "Engineer", "Templates, input naming, auxes, buses, latency, loudness and translation.", "8-10 hrs + service reps"],
  ["waves-workflows-livestream", "Waves Workflows for Livestream", "Engineer", "Purpose-first Waves training for EQ, dynamic EQ, compression, de-essing and limiting.", "6-8 hrs"],
  ["dante-networking-dvs", "Dante Networking and Virtual Soundcard", "Engineer", "Dante Controller, DVS, clocking, sample rate, subscriptions and latency.", "8-10 hrs"],
  ["troubleshooting-fault-isolation", "Troubleshooting and Fault Isolation", "Engineer", "Decision trees for stage, console, network, DAW and stream faults.", "6-8 hrs"],
  ["system-tuning-feedback", "System Tuning and Gain Before Feedback", "Senior Engineer", "Headroom, placement, monitor discipline and repeatable feedback control.", "6-8 hrs"],
  ["recording-virtual-soundcheck-review", "Recording, Virtual Soundcheck and Review", "Senior Engineer", "Capture, review and coaching loops from real services.", "4-6 hrs"],
  ["documentation-coaching-quality", "Documentation, Coaching and Quality Control", "Senior Engineer", "SOP writing, mentor rubrics and certification quality.", "5-7 hrs"],
  ["technical-director-governance", "Network, SOP and Certification Governance", "Technical Director", "Architecture, redundancy, procurement, change control and governance.", "12-16 hrs"]
].map(([slug, title, level, summary, duration], order) => ({
  slug,
  title,
  level: level as Module["level"],
  summary,
  duration,
  objectives: [`Explain ${title.toLowerCase()}`, "Perform the service task safely", "Document exceptions for the team"],
  prerequisites: order === 0 ? [] : ["Previous level capability"],
  certification: "Lesson completion, quiz pass, practical mentor sign-off and live service observation.",
  order: order + 1
}));

export const academies: Academy[] = [
  {
    slug: "foundations-academy",
    title: "Foundations Academy",
    mission: "Give new volunteers a safe, ministry-first understanding of sound, signal flow, gain, routing and first-line troubleshooting.",
    ownerRole: "Senior Engineer",
    activeVersion: "1.0",
    order: 1,
    moduleSlugs: ["ministry-safety-signal-flow", "church-layout-gain-structure", "microphones-di-stage-basics", "x32-fundamentals", "monitoring-p16-talkback", "critical-listening"]
  },
  {
    slug: "foh-operator-academy",
    title: "FOH Operator Academy",
    mission: "Prepare reliable Sunday operators who can set up, line-check, mix speech and worship, support monitors and recover common faults.",
    ownerRole: "Senior Engineer",
    activeVersion: "1.0",
    order: 2,
    moduleSlugs: ["service-prep-patching-line-check", "foh-mixing-fundamentals", "x32-eq-dynamics-fx", "wireless-choir-worship-mixing"]
  },
  {
    slug: "livestream-academy",
    title: "Livestream Academy",
    mission: "Train operators to build a dedicated broadcast mix through X32, Dante, Logic Pro, Waves processing and encoder handoff.",
    ownerRole: "Engineer",
    activeVersion: "1.0",
    order: 3,
    moduleSlugs: ["livestream-signal-design", "logic-pro-livestream-mixing", "waves-workflows-livestream"]
  },
  {
    slug: "systems-academy",
    title: "Systems Academy",
    mission: "Train engineers to own routing, Dante, showfiles, documentation, virtual soundcheck and cross-domain fault isolation.",
    ownerRole: "Senior Engineer",
    activeVersion: "1.0",
    order: 4,
    moduleSlugs: ["advanced-x32-routing-showfiles", "dante-networking-dvs", "troubleshooting-fault-isolation", "recording-virtual-soundcheck-review"]
  },
  {
    slug: "leadership-academy",
    title: "Leadership Academy",
    mission: "Prepare senior engineers to coach, assess, document, review services and guard team quality.",
    ownerRole: "Technical Director",
    activeVersion: "1.0",
    order: 5,
    moduleSlugs: ["system-tuning-feedback", "documentation-coaching-quality"]
  },
  {
    slug: "technical-director-academy",
    title: "Technical Director Academy",
    mission: "Govern system architecture, network design, redundancy, certification, inventory, budget, procurement and change control.",
    ownerRole: "Technical Director",
    activeVersion: "1.0",
    order: 6,
    moduleSlugs: ["technical-director-governance"]
  }
];

export const skills: Skill[] = [
  { slug: "x32-signal-navigation", title: "X32 Signal Navigation", domain: "X32", description: "Move from source to channel, bus, matrix, DCA and output without guessing.", competencySlugs: ["trace-signal-path", "operate-x32-channel"] },
  { slug: "dante-route-verification", title: "Dante Route Verification", domain: "Dante", description: "Verify device visibility, subscriptions, sample rate, clocking and DVS interface.", competencySlugs: ["verify-dante-path", "isolate-network-audio-fault"] },
  { slug: "logic-stream-template", title: "Logic Stream Template Operation", domain: "Logic", description: "Operate the approved Logic template with named inputs, buses, meters and encoder handoff.", competencySlugs: ["operate-logic-stream-template", "manage-stream-loudness"] },
  { slug: "waves-purpose-processing", title: "Purpose-First Waves Processing", domain: "Waves", description: "Choose Waves plugins by audible problem rather than plugin name.", competencySlugs: ["apply-purpose-first-processing"] },
  { slug: "wireless-service-readiness", title: "Wireless Service Readiness", domain: "Wireless", description: "Prepare mics, batteries, labels, receivers and handoff for service.", competencySlugs: ["prepare-wireless-systems"] },
  { slug: "p16-monitor-routing", title: "P16 Monitor Routing", domain: "P16", description: "Maintain predictable source order and safe personal monitoring workflows.", competencySlugs: ["support-monitoring-and-p16"] },
  { slug: "speech-first-mix", title: "Speech-First Mix Priority", domain: "FOH", description: "Protect intelligibility and priority of spoken word in room and stream.", competencySlugs: ["mix-speech-and-worship"] },
  { slug: "fault-isolation", title: "Fault Isolation", domain: "Troubleshooting", description: "Move from symptom to source, test, recovery, escalation and incident log.", competencySlugs: ["run-safe-troubleshooting-flow"] },
  { slug: "mentor-feedback", title: "Mentor Feedback", domain: "Leadership", description: "Observe, coach, sign off and document practical sound team growth.", competencySlugs: ["coach-and-sign-off-trainees"] }
];

export const competencies: Competency[] = [
  { slug: "trace-signal-path", title: "Trace Signal Path", category: "Knowledge", description: "Explain source to mic/DI, X32, buses, Dante, Logic, encoder, PA and P16 paths.", level: "Foundations", academySlugs: ["foundations-academy"], moduleSlugs: ["ministry-safety-signal-flow", "church-layout-gain-structure"], skillSlugs: ["x32-signal-navigation"] },
  { slug: "operate-x32-channel", title: "Operate an X32 Channel", category: "Practical", description: "Select a channel, set gain, engage HPF, read meters and avoid unsafe routing changes.", level: "Foundations", academySlugs: ["foundations-academy", "foh-operator-academy"], moduleSlugs: ["x32-fundamentals", "service-prep-patching-line-check"], skillSlugs: ["x32-signal-navigation"] },
  { slug: "support-monitoring-and-p16", title: "Support Monitoring and P16", category: "Operational", description: "Verify P16 source order, stage monitor sends and talkback without disrupting FOH.", level: "Operator", academySlugs: ["foh-operator-academy"], moduleSlugs: ["monitoring-p16-talkback", "service-prep-patching-line-check"], skillSlugs: ["p16-monitor-routing"] },
  { slug: "mix-speech-and-worship", title: "Mix Speech and Worship", category: "Practical", description: "Balance speech, worship team and choir with appropriate EQ, dynamics and service priority.", level: "Operator", academySlugs: ["foh-operator-academy"], moduleSlugs: ["foh-mixing-fundamentals", "x32-eq-dynamics-fx", "wireless-choir-worship-mixing"], skillSlugs: ["speech-first-mix"] },
  { slug: "prepare-wireless-systems", title: "Prepare Wireless Systems", category: "Operational", description: "Prepare batteries, labels, mute state, receivers and handoff before service.", level: "Operator", academySlugs: ["foh-operator-academy"], moduleSlugs: ["wireless-choir-worship-mixing"], skillSlugs: ["wireless-service-readiness"] },
  { slug: "verify-dante-path", title: "Verify Dante Path", category: "Practical", description: "Confirm Dante device visibility, subscriptions, DVS state, sample rate and clock before service.", level: "Engineer", academySlugs: ["livestream-academy", "systems-academy"], moduleSlugs: ["dante-networking-dvs", "logic-pro-livestream-mixing"], skillSlugs: ["dante-route-verification"] },
  { slug: "operate-logic-stream-template", title: "Operate Logic Stream Template", category: "Practical", description: "Run the approved Logic livestream template with named inputs, buses, plugins and output handoff.", level: "Engineer", academySlugs: ["livestream-academy"], moduleSlugs: ["logic-pro-livestream-mixing"], skillSlugs: ["logic-stream-template"] },
  { slug: "manage-stream-loudness", title: "Manage Stream Loudness", category: "Operational", description: "Monitor loudness, limiting, translation and plugin delay across livestream outputs.", level: "Engineer", academySlugs: ["livestream-academy"], moduleSlugs: ["logic-pro-livestream-mixing", "waves-workflows-livestream"], skillSlugs: ["logic-stream-template"] },
  { slug: "apply-purpose-first-processing", title: "Apply Purpose-First Processing", category: "Practical", description: "Use EQ, dynamic EQ, compression, de-essing and limiting to solve audible problems.", level: "Engineer", academySlugs: ["livestream-academy"], moduleSlugs: ["waves-workflows-livestream", "x32-eq-dynamics-fx"], skillSlugs: ["waves-purpose-processing"] },
  { slug: "run-safe-troubleshooting-flow", title: "Run Safe Troubleshooting Flow", category: "Troubleshooting", description: "Use symptom-based yes/no checks, recover service, escalate and log the root cause.", level: "Engineer", academySlugs: ["systems-academy"], moduleSlugs: ["troubleshooting-fault-isolation"], skillSlugs: ["fault-isolation"] },
  { slug: "coach-and-sign-off-trainees", title: "Coach and Sign Off Trainees", category: "Leadership", description: "Observe trainees, give feedback, require evidence and approve practical readiness.", level: "Senior Engineer", academySlugs: ["leadership-academy"], moduleSlugs: ["documentation-coaching-quality"], skillSlugs: ["mentor-feedback"] }
];

export const certificationDefinitions: CertificationDefinition[] = [
  { slug: "foundations-ready", academySlug: "foundations-academy", level: "Foundations", title: "Foundations Ready", mission: "Can serve as an assisted volunteer who understands signal flow, safety and first checks.", renewalMonths: 12, requiredServiceObservations: 1, moduleSlugs: academies[0].moduleSlugs, competencySlugs: ["trace-signal-path", "operate-x32-channel"] },
  { slug: "foh-operator-certified", academySlug: "foh-operator-academy", level: "Operator", title: "FOH Operator Certified", mission: "Can prepare and operate routine Sunday FOH workflows with mentor-approved competence.", renewalMonths: 12, requiredServiceObservations: 4, moduleSlugs: academies[1].moduleSlugs, competencySlugs: ["operate-x32-channel", "support-monitoring-and-p16", "mix-speech-and-worship", "prepare-wireless-systems"] },
  { slug: "livestream-engineer-certified", academySlug: "livestream-academy", level: "Engineer", title: "Livestream Engineer Certified", mission: "Can verify Dante into Logic and produce a controlled livestream mix through approved templates.", renewalMonths: 12, requiredServiceObservations: 6, moduleSlugs: academies[2].moduleSlugs, competencySlugs: ["verify-dante-path", "operate-logic-stream-template", "manage-stream-loudness", "apply-purpose-first-processing"] },
  { slug: "systems-engineer-certified", academySlug: "systems-academy", level: "Engineer", title: "Systems Engineer Certified", mission: "Can manage advanced routing, Dante, documentation and cross-domain troubleshooting.", renewalMonths: 12, requiredServiceObservations: 8, moduleSlugs: academies[3].moduleSlugs, competencySlugs: ["verify-dante-path", "run-safe-troubleshooting-flow"] },
  { slug: "senior-engineer-mentor", academySlug: "leadership-academy", level: "Senior Engineer", title: "Senior Engineer Mentor", mission: "Can coach, assess and approve practical readiness with consistent rubrics.", renewalMonths: 18, requiredServiceObservations: 12, moduleSlugs: academies[4].moduleSlugs, competencySlugs: ["coach-and-sign-off-trainees", "run-safe-troubleshooting-flow"] },
  { slug: "technical-director-governance", academySlug: "technical-director-academy", level: "Technical Director", title: "Technical Director Governance", mission: "Can govern architecture, certification, procurement, SOPs and change control.", renewalMonths: 24, requiredServiceObservations: 16, moduleSlugs: academies[5].moduleSlugs, competencySlugs: ["coach-and-sign-off-trainees"] }
];

export const skillTrees: SkillTree[] = academies.map((academy) => ({
  academySlug: academy.slug,
  title: `${academy.title} Skill Tree`,
  version: academy.activeVersion,
  nodes: skills
    .filter((skill) => competencies.some((competency) => competency.academySlugs.includes(academy.slug) && competency.skillSlugs.includes(skill.slug)))
    .map((skill, index) => ({
      skillSlug: skill.slug,
      parentSkillSlug: index === 0 ? undefined : skills.find((candidate) => competencies.some((competency) => competency.academySlugs.includes(academy.slug) && competency.skillSlugs.includes(candidate.slug)))?.slug,
      unlockRule: index === 0 ? "Available at academy start" : "Unlock after mentor confirms prior practical evidence",
      positionX: 120 + index * 180,
      positionY: 120 + (index % 2) * 120
    }))
}));

export const curriculumAssessments: CurriculumAssessment[] = [
  { slug: "foundations-signal-flow-scenario", moduleSlug: "ministry-safety-signal-flow", type: "Scenario", title: "Trace the Church Signal Path", rubric: "Trainee explains each handoff from mic to room and stream using church equipment names.", passCriteria: "Correctly traces source, X32, output and stream path with no unsafe assumptions.", retryCriteria: "Retry if the trainee cannot identify where signal enters or leaves the X32.", mentorRoleRequired: "Senior Engineer", competencySlugs: ["trace-signal-path"] },
  { slug: "x32-channel-practical", moduleSlug: "x32-fundamentals", type: "Practical", title: "Set Gain on an X32 Vocal Channel", rubric: "Trainee sets clean gain, reads meter, engages HPF and explains fader vs preamp.", passCriteria: "No clipping, clear explanation and correct channel handling.", retryCriteria: "Retry if gain is set from quiet test level or fader is used to hide bad gain.", mentorRoleRequired: "Senior Engineer", competencySlugs: ["operate-x32-channel"] },
  { slug: "logic-stream-practical", moduleSlug: "logic-pro-livestream-mixing", type: "Practical", title: "Verify Dante Into Logic and Stream Output", rubric: "Engineer verifies X32 send, Dante subscription, DVS, Logic meter and encoder handoff.", passCriteria: "Signal is verified at every point and documented.", retryCriteria: "Retry if operator skips Dante/DVS verification.", mentorRoleRequired: "Senior Engineer", competencySlugs: ["verify-dante-path", "operate-logic-stream-template"] },
  { slug: "troubleshooting-live-scenario", moduleSlug: "troubleshooting-fault-isolation", type: "Scenario", title: "Recover Livestream No Sound", rubric: "Engineer uses the decision tree, tests one change at a time, restores signal and logs cause.", passCriteria: "Correct recovery path and calm escalation discipline.", retryCriteria: "Retry if changes are made blindly or FOH is disrupted.", mentorRoleRequired: "Senior Engineer", competencySlugs: ["run-safe-troubleshooting-flow"] },
  { slug: "mentor-review-assessment", moduleSlug: "documentation-coaching-quality", type: "Mentor", title: "Observe and Sign Off an Operator", rubric: "Senior engineer observes, gives specific feedback, records evidence and sets next step.", passCriteria: "Feedback is specific, kind, evidence-based and actionable.", retryCriteria: "Retry if sign-off lacks observable criteria.", mentorRoleRequired: "Technical Director", competencySlugs: ["coach-and-sign-off-trainees"] }
];

export const practicalExercises: PracticalExercise[] = [
  { moduleSlug: "x32-fundamentals", lessonSlug: "x32-navigation", title: "Find and Verify a Vocal Channel", setup: "Use training scene or supervised rehearsal channel.", task: "Select the channel, identify meter, mute state, sends and main assignment.", expectedResult: "Trainee can explain what is active without changing service routing.", evidenceRequired: "Mentor observation note.", safetyConstraints: "Do not recall scenes or change routing during a live service." },
  { moduleSlug: "logic-pro-livestream-mixing", lessonSlug: "dante-into-logic", title: "Dante to Logic Checkpoint", setup: "Approved Logic template and Dante Controller open.", task: "Verify one speech channel from X32 send to Logic input and stream output.", expectedResult: "Signal is visible and named correctly at every stage.", evidenceRequired: "Screenshot or mentor note with route confirmed.", safetyConstraints: "Do not change clock leader without senior approval." },
  { moduleSlug: "waves-workflows-livestream", lessonSlug: "waves-vocal-speech-chains", title: "Purpose-First Vocal Chain", setup: "Use Sound Lab or virtual soundcheck vocal sample.", task: "Choose F6/C6/RComp/CLA Vocals only when the audible problem justifies it.", expectedResult: "Processing improves clarity without harshness or over-compression.", evidenceRequired: "Before/after note and chain purpose explanation.", safetyConstraints: "Do not insert heavy plugins during service without checking latency." },
  { moduleSlug: "troubleshooting-fault-isolation", lessonSlug: "fault-isolation-method", title: "No Sound Decision Tree Drill", setup: "Simulated no-sound microphone fault.", task: "Run through safe first checks and identify root cause.", expectedResult: "Trainee tests one point at a time and logs the final cause.", evidenceRequired: "Scenario result and mentor sign-off.", safetyConstraints: "Do not repeatedly unmute unknown paths at show volume." }
];

export const learningOutcomes: LearningOutcome[] = [
  { academySlug: "foundations-academy", outcomeType: "Academy", measurableVerb: "Trace", text: "Trace the church signal path from source to FOH and livestream destination." },
  { academySlug: "foh-operator-academy", outcomeType: "Academy", measurableVerb: "Operate", text: "Operate routine FOH preparation, line check, speech mix and worship support tasks." },
  { academySlug: "livestream-academy", outcomeType: "Academy", measurableVerb: "Verify", text: "Verify Dante into Logic and produce a stable livestream mix using approved templates." },
  { moduleSlug: "dante-networking-dvs", outcomeType: "Module", measurableVerb: "Diagnose", text: "Diagnose Dante visibility, subscription, clock, sample-rate and DVS interface issues." },
  { lessonSlug: "gain-structure-basics", outcomeType: "Lesson", measurableVerb: "Set", text: "Set input gain with headroom and explain why fader level is not preamp gain." }
];

export const progressionRules: ProgressionRule[] = [
  { fromAcademySlug: "foundations-academy", toAcademySlug: "foh-operator-academy", fromCertificationSlug: "foundations-ready", toCertificationSlug: "foh-operator-certified", ruleType: "CertificationGate", requirement: "Foundations Ready certification, one observed service and mentor approval." },
  { fromAcademySlug: "foh-operator-academy", toAcademySlug: "livestream-academy", fromCertificationSlug: "foh-operator-certified", toCertificationSlug: "livestream-engineer-certified", ruleType: "ExperienceGate", requirement: "Operator certification plus four service observations and clean incident logging." },
  { fromAcademySlug: "livestream-academy", toAcademySlug: "systems-academy", fromCertificationSlug: "livestream-engineer-certified", toCertificationSlug: "systems-engineer-certified", ruleType: "CompetencyGate", requirement: "Dante verification, Logic stream template operation and livestream troubleshooting sign-off." },
  { fromAcademySlug: "systems-academy", toAcademySlug: "leadership-academy", fromCertificationSlug: "systems-engineer-certified", toCertificationSlug: "senior-engineer-mentor", ruleType: "MentorGate", requirement: "Systems certification plus senior engineer recommendation and observed coaching." }
];

export const serviceExperiences: ServiceExperienceRecord[] = [
  { traineeEmail: "daniel@example.church", mentorEmail: "samuel@example.church", serviceDate: "2026-06-07", serviceType: "Sunday Worship", roleServed: "FOH shadow operator", observationNotes: "Handled line check calmly; needs more confidence with choir mic feedback checks.", approvedForCertification: false },
  { traineeEmail: "grace@example.church", mentorEmail: "samuel@example.church", serviceDate: "2026-06-07", serviceType: "Sunday Worship Livestream", roleServed: "Logic stream engineer", observationNotes: "Verified DVS and Logic template before service; stream handoff was stable.", approvedForCertification: true }
];

export const evidenceRecords: EvidenceRecord[] = [
  { userEmail: "daniel@example.church", type: "Practical", title: "X32 channel gain practical", description: "Set gain on vocal channel during rehearsal and explained meter target.", relatedEntityType: "CurriculumAssessment", relatedEntityId: "x32-channel-practical", competencySlug: "operate-x32-channel", assessmentSlug: "x32-channel-practical", status: "Needs Review" },
  { userEmail: "grace@example.church", type: "Service Observation", title: "Livestream signal path verified", description: "Confirmed X32 stream bus, Dante subscription, DVS input, Logic strip and OBS capture.", relatedEntityType: "CurriculumAssessment", relatedEntityId: "logic-stream-practical", competencySlug: "operate-logic-stream-template", assessmentSlug: "logic-stream-practical", status: "Approved" },
  { userEmail: "ava@example.church", type: "Sound Lab", title: "Clipped mic diagnosis", description: "Identified too-hot gain and listed preamp-first checks.", relatedEntityType: "SoundLabExercise", relatedEntityId: "too-hot-clipping", competencySlug: "trace-signal-path", status: "Submitted" }
];

const lessonRows: Array<[string, string, string, Lesson["difficulty"], string]> = [
  ["why-sound-is-ministry", "Why Sound Is Ministry", "Serve worship, speech clarity and congregation participation.", "Beginner", "ministry-safety-signal-flow"],
  ["basic-signal-flow", "Basic Signal Flow", "Trace microphone to preamp, channel, bus, PA and livestream.", "Beginner", "ministry-safety-signal-flow"],
  ["safe-startup-shutdown", "Safe Startup and Shutdown", "Use mute and power order to avoid pops and surprises.", "Beginner", "ministry-safety-signal-flow"],
  ["room-system-map", "Church Room System Map", "Identify FOH, stage, monitors, livestream computer and network audio.", "Beginner", "church-layout-gain-structure"],
  ["gain-structure-basics", "Gain Structure Basics", "Set input gain and operating level without chasing volume.", "Beginner", "church-layout-gain-structure"],
  ["mic-di-choices", "Microphones and DI Choices", "Match speech, vocals, instruments and playback to capture tools.", "Beginner", "microphones-di-stage-basics"],
  ["choir-mic-placement", "Choir Mic Placement", "Balance choir image, spill and gain before feedback.", "Intermediate", "microphones-di-stage-basics"],
  ["x32-navigation", "X32 Navigation and Layers", "Move around channels, buses, DCAs and scenes confidently.", "Beginner", "x32-fundamentals"],
  ["x32-mix-buses", "X32 Mix Buses and Sends", "Send channels to monitors, FX and stream buses.", "Intermediate", "x32-fundamentals"],
  ["p16-monitor-basics", "P16 Monitor Basics", "Explain P16 sources, safe levels and performer expectations.", "Beginner", "monitoring-p16-talkback"],
  ["talkback-etiquette", "Talkback Etiquette", "Communicate calmly with stage without confusing the service.", "Beginner", "monitoring-p16-talkback"],
  ["critical-listening-language", "Critical Listening Language", "Name muddy, harsh, sibilant, thin, masked and dynamic problems.", "Beginner", "critical-listening"],
  ["translation-checks", "Translation Checks", "Compare stream on phone speakers, headphones, TVs and laptops.", "Intermediate", "critical-listening"],
  ["pre-service-check", "Pre-Service Check", "Prepare X32, wireless, P16, Dante, Logic and service notes.", "Intermediate", "service-prep-patching-line-check"],
  ["line-check-method", "Line Check Method", "Verify every source in patch order and document exceptions.", "Intermediate", "service-prep-patching-line-check"],
  ["speech-first-mixing", "Speech-First FOH Mixing", "Keep spoken word clear, stable and natural.", "Intermediate", "foh-mixing-fundamentals"],
  ["worship-balance", "Worship Team Balance", "Balance lead vocal, BVs, band and congregation energy.", "Intermediate", "foh-mixing-fundamentals"],
  ["hpf-eq-cuts", "HPF and Corrective EQ", "Use filters and cuts before boosting.", "Intermediate", "x32-eq-dynamics-fx"],
  ["gates-compression-fx", "Gates, Compression and FX", "Use dynamics and ambience intentionally on X32.", "Intermediate", "x32-eq-dynamics-fx"],
  ["wireless-prep", "Wireless Mic Preparation", "Prepare handhelds, beltpacks, batteries, labels and handoff.", "Intermediate", "wireless-choir-worship-mixing"],
  ["speech-choir-worship", "Speech, Choir and Worship Transitions", "Handle church-specific source changes without losing priority.", "Intermediate", "wireless-choir-worship-mixing"],
  ["x32-scenes-snippets", "Scenes, Snippets and Rollback", "Use showfile tools without overwriting the service.", "Advanced", "advanced-x32-routing-showfiles"],
  ["x32-matrices-routing", "Matrices and Advanced Routing", "Route mains, fills, stream sends and recordings.", "Advanced", "advanced-x32-routing-showfiles"],
  ["foh-vs-stream", "FOH Mix vs Livestream Mix", "Understand why room balance does not automatically translate online.", "Advanced", "livestream-signal-design"],
  ["stream-bus-design", "Stream Bus Design", "Build resilient X32 stream buses and source priorities.", "Advanced", "livestream-signal-design"],
  ["dante-into-logic", "Dante Into Logic Signal Path", "Verify X32 send, Dante Controller, DVS, Logic input and encoder.", "Advanced", "logic-pro-livestream-mixing"],
  ["logic-session-template", "Logic Session Templates", "Build templates with named inputs, auxes, buses and meters.", "Advanced", "logic-pro-livestream-mixing"],
  ["logic-vocal-clarity", "Vocal Clarity in Logic", "Shape lead vocals and speech for stream listeners.", "Advanced", "logic-pro-livestream-mixing"],
  ["logic-latency-loudness", "Latency, Plugin Delay and Loudness", "Manage Low Latency Monitoring, plugin delay, true peak and loudness.", "Advanced", "logic-pro-livestream-mixing"],
  ["waves-purpose-first", "Waves Purpose-First Processing", "Choose plugin categories by audible problem.", "Advanced", "waves-workflows-livestream"],
  ["waves-vocal-speech-chains", "Waves Vocal and Speech Chains", "Use F6, C6, RComp and CLA Vocals in repeatable chains.", "Advanced", "waves-workflows-livestream"],
  ["dante-controller-basics", "Dante Controller Basics", "Read device discovery, Receive, Status, Clock and Latency views.", "Advanced", "dante-networking-dvs"],
  ["dvs-sample-rate-clock", "DVS, Sample Rate and Clock", "Configure DVS and resolve clock or sample-rate mismatches.", "Advanced", "dante-networking-dvs"],
  ["fault-isolation-method", "Fault Isolation Method", "Move from symptom to likely cause, test, recovery and log.", "Advanced", "troubleshooting-fault-isolation"],
  ["gain-before-feedback", "Gain Before Feedback", "Improve headroom with placement, gain, monitors and EQ.", "Advanced", "system-tuning-feedback"],
  ["virtual-soundcheck-review", "Virtual Soundcheck Review", "Use recordings to coach operators and compare FOH/stream decisions.", "Advanced", "recording-virtual-soundcheck-review"],
  ["writing-sops", "Writing Useful SOPs", "Preserve church-specific workflows in concise versioned procedures.", "Advanced", "documentation-coaching-quality"],
  ["mentor-signoff", "Mentor Sign-Off Rubrics", "Assess practical ability consistently with evidence and notes.", "Advanced", "documentation-coaching-quality"],
  ["change-governance", "Change Governance", "Approve routing, network and certification changes with audit discipline.", "Advanced", "technical-director-governance"]
];

export const lessons: Lesson[] = lessonRows.map(([slug, title, summary, difficulty, moduleSlug], index) => ({
  slug,
  title,
  summary,
  difficulty,
  durationMinutes: difficulty === "Advanced" ? 20 : 12,
  moduleSlug,
  beginner: `Plain-language focus: ${summary}`,
  intermediate: "Connect the skill to rehearsal, service operation, handover and documentation.",
  advanced: "Evaluate the wider impact across X32 routing, Dante, Logic, Waves, monitors, FOH and stream.",
  practical: `Complete the church-specific ${title.toLowerCase()} drill using the approved template or checklist.`,
  recall: `Without looking, name the first three checks for ${title.toLowerCase()}.`,
  spaced: "Revisit this during the next rehearsal and record one observation for the team.",
  signoff: "Mentor confirms safe execution, clear explanation, and useful documentation.",
  troubleshootingLinks: index % 7 === 0 ? ["no-sound-from-microphone"] : index % 6 === 0 ? ["livestream-has-no-sound"] : []
}));

export const lessonGuides: LessonGuide[] = [
  {
    lessonSlug: "gain-structure-basics",
    coreIdea: "Input gain is the channel's clean starting point. It is not the same as the fader. Set preamp gain so the source is strong, clean and leaving headroom before you shape tone or send it anywhere.",
    boardChecks: ["Select the channel and watch the input meter while the person speaks or sings at real service level.", "Aim for healthy green/yellow movement with headroom, not red clipping.", "PFL the channel before changing EQ, compression, buses or mains.", "Check whether a DCA, bus send or matrix is causing perceived level problems after gain is correct."],
    listeningTargets: ["Clean gain sounds present without harsh crackle.", "Too little gain sounds distant once raised later, with hiss becoming obvious.", "Too much gain sounds crunchy, flattened and stressful even when the fader is low."],
    commonMistakes: ["Using the fader to hide a bad preamp setting.", "Setting gain from a quiet test voice instead of real service volume.", "Changing EQ before confirming the source is clean."],
    mentorPrompt: "Ask the trainee to make a clipped mic clean without touching the main LR level first."
  },
  {
    lessonSlug: "hpf-eq-cuts",
    coreIdea: "EQ is problem solving. Start with high-pass filtering and narrow cuts before reaching for wide boosts. Every EQ move should have a reason you can hear.",
    boardChecks: ["Engage HPF on speech and vocals to remove rumble that does not help intelligibility.", "Sweep carefully at low level to find mud, boxiness, harshness or ringing.", "Compare in context, not solo forever.", "Bypass the EQ briefly to confirm the change helped."],
    listeningTargets: ["HPF removes low rumble without thinning the voice.", "Low-mid cuts can clear mud and masking.", "Presence boosts can add clarity but become harsh quickly."],
    commonMistakes: ["Boosting highs to fix every unclear vocal.", "Cutting so much low-mid that speech loses body.", "EQing a feedback issue while the monitor is still too loud."],
    mentorPrompt: "Have the trainee identify whether a sample needs HPF, low-mid cut or presence reduction."
  },
  {
    lessonSlug: "gates-compression-fx",
    coreIdea: "Dynamics control movement over time. Compression can steady speech and vocals; gates can clean noise between phrases. Both can sound unnatural when overused.",
    boardChecks: ["Watch gain reduction while listening, not as a target by itself.", "Set threshold from actual performance level.", "Use attack and release so words still feel natural.", "Bypass to confirm the processing is helping the service, not just making meters move."],
    listeningTargets: ["Good compression makes loud and soft phrases easier to follow.", "Too much compression makes the voice feel flat or breathy.", "A badly set gate chops off word endings."],
    commonMistakes: ["Compressing because the plugin is available.", "Using a gate to fix stage discipline.", "Leaving old dynamics settings on a different speaker or singer."],
    mentorPrompt: "Ask the trainee to explain why they used compression before approving the setting."
  },
  {
    lessonSlug: "gain-before-feedback",
    coreIdea: "Feedback is a loop between microphone and speaker or monitor. The fastest fix is often level, placement or monitor discipline before EQ.",
    boardChecks: ["Identify the mic or bus feeding back before making global changes.", "Check monitor sends and wedge position.", "Confirm the person is close enough to the mic.", "Use narrow EQ cuts only after the physical and level checks are sensible."],
    listeningTargets: ["Ringing before feedback often hints at the frequency that is about to run away.", "A monitor-driven problem changes when the monitor send comes down.", "A placement problem improves when the mic points away from the speaker and closer to the source."],
    commonMistakes: ["Cutting the whole mix when one monitor send is the issue.", "Leaving too many open mics live.", "Trying to EQ around a mic pointed at a loudspeaker."],
    mentorPrompt: "Run a mock feedback scenario and require the trainee to say what they would check before touching EQ."
  },
  {
    lessonSlug: "logic-latency-loudness",
    coreIdea: "Livestream sound has to be controlled for delay, loudness and translation. A mix can feel good in the room and still be too quiet, too harsh or late online.",
    boardChecks: ["Confirm Logic receives the correct Dante inputs.", "Check plugin latency before adding heavy chains.", "Watch loudness and true peak on the stream master.", "Listen on phone speaker, headphones and laptop after major changes."],
    listeningTargets: ["A good stream has stable speech and worship impact without clipping.", "Plugin delay feels like the stream is detached from video.", "Over-limiting makes worship feel small and tiring."],
    commonMistakes: ["Using FOH balance as the stream balance.", "Adding Waves plugins without checking latency or CPU.", "Only listening on studio headphones."],
    mentorPrompt: "Ask the trainee to compare a clean master, clipped master and over-limited master in the Sound Lab."
  }
];

export const audioExamples: AudioExample[] = [
  {
    slug: "clean-gain",
    title: "Clean Mic Gain",
    category: "Gain",
    whatYouHear: "A steady speech-like tone with transient detail and no crackle.",
    boardSymptoms: ["Input meter moves clearly below red", "Fader has useful travel", "PFL sounds natural"],
    checks: ["Set preamp first", "Confirm source is speaking at real level", "Leave headroom for loud moments"],
    linkedLessons: ["gain-structure-basics", "line-check-method"]
  },
  {
    slug: "too-hot-clipping",
    title: "Too Much Gain and Clipping",
    category: "Gain",
    whatYouHear: "Crunchy, flattened peaks that stay ugly even if the fader is pulled down.",
    boardSymptoms: ["Input meter touches red", "Channel sounds distorted in PFL", "Compression may react too hard"],
    checks: ["Lower preamp gain", "Check pad if available", "Ask for real performance level again"],
    linkedLessons: ["gain-structure-basics", "no-sound-from-microphone"]
  },
  {
    slug: "too-low-noisy",
    title: "Too Little Gain and Noise",
    category: "Gain",
    whatYouHear: "The useful signal is weak, then hiss becomes obvious when the channel is turned up later.",
    boardSymptoms: ["Input meter barely moves", "Fader pushed high", "Stream sounds distant or noisy"],
    checks: ["Raise preamp gain safely", "Check mic distance", "Confirm correct input patch"],
    linkedLessons: ["gain-structure-basics", "dante-into-logic"]
  },
  {
    slug: "rumble-hpf",
    title: "Rumble Before and After HPF",
    category: "EQ",
    whatYouHear: "Low thumps and room rumble clear up when the high-pass filter is applied.",
    boardSymptoms: ["Low meter activity with no useful voice content", "Muddy stream", "Sub energy on speech"],
    checks: ["Engage HPF", "Do not thin the voice", "Compare in the mix"],
    linkedLessons: ["hpf-eq-cuts", "speech-first-mixing"]
  },
  {
    slug: "harsh-presence",
    title: "Harsh Presence Boost",
    category: "EQ",
    whatYouHear: "A voice becomes sharp and tiring when upper-mid presence is pushed too far.",
    boardSymptoms: ["Listeners complain it is piercing", "Sibilance jumps forward", "Stream hurts on small speakers"],
    checks: ["Try a small upper-mid cut", "Check de-essing only if needed", "Compare phone and headphones"],
    linkedLessons: ["hpf-eq-cuts", "logic-vocal-clarity"]
  },
  {
    slug: "compression-control",
    title: "Compression Control",
    category: "Dynamics",
    whatYouHear: "Soft and loud phrases become easier to follow, but too much control can flatten expression.",
    boardSymptoms: ["Gain reduction moves on loud words", "Speech sits more consistently", "Overdone settings sound squeezed"],
    checks: ["Set threshold from real speech", "Use moderate ratio", "Bypass and compare"],
    linkedLessons: ["gates-compression-fx", "waves-vocal-speech-chains"]
  },
  {
    slug: "gate-chatter",
    title: "Gate Chatter and Cut-Off Words",
    category: "Dynamics",
    whatYouHear: "Noise disappears between phrases, but a bad threshold chops consonants and word endings.",
    boardSymptoms: ["Gate closes while person is still speaking", "Words feel clipped", "Noise pumps in and out"],
    checks: ["Lower threshold", "Adjust release", "Use less gate on speech"],
    linkedLessons: ["gates-compression-fx", "wireless-prep"]
  },
  {
    slug: "feedback-ring",
    title: "Feedback Ringing",
    category: "Feedback",
    whatYouHear: "A narrow tone grows quickly, like a warning before full feedback.",
    boardSymptoms: ["One mic or monitor path starts ringing", "RTA would show one strong frequency", "Monitor send may be too hot"],
    checks: ["Identify mic", "Lower monitor or channel safely", "Check mic position", "Use narrow EQ only after level and placement checks"],
    linkedLessons: ["gain-before-feedback", "feedback"]
  },
  {
    slug: "stream-limiter",
    title: "Livestream Limiter Working Too Hard",
    category: "Livestream",
    whatYouHear: "The stream gets loud but smaller, flatter and tiring when the limiter is pushed.",
    boardSymptoms: ["Master limiter gain reduction is constant", "True peak may be safe but worship loses impact", "Phone speaker sounds dense"],
    checks: ["Reduce bus level into limiter", "Fix mix balance before master limiting", "Check loudness over time"],
    linkedLessons: ["logic-latency-loudness", "translation-checks"]
  }
];

export const trainingVideos: TrainingVideo[] = [
  {
    slug: "dante-overview-audinate",
    title: "Dante overview from Audinate",
    topic: "Dante basics",
    sourceUrl: "https://www.youtube.com/watch?v=C78zn60pVGk",
    sourceName: "Audinate on YouTube",
    durationTarget: "Short segment or chapter",
    whyUse: "Use as a sourced Dante platform orientation before hands-on Dante Controller practice.",
    linkedLessons: ["dante-controller-basics", "dvs-sample-rate-clock"],
    reviewStatus: "Confirmed source"
  },
  {
    slug: "x32-gain-structure-youtube",
    title: "Short X32 gain structure tutorial",
    topic: "X32 preamp gain, meters and headroom",
    sourceUrl: "https://www.youtube.com/results?search_query=Behringer+X32+gain+structure+short+tutorial",
    sourceName: "YouTube search shortlist",
    durationTarget: "Under 10 minutes",
    whyUse: "Pair with the Sound Lab clipping and low-gain examples so trainees connect sound to X32 meters.",
    linkedLessons: ["gain-structure-basics", "x32-navigation"],
    reviewStatus: "Needs final video selection"
  },
  {
    slug: "feedback-church-sound-youtube",
    title: "Short church sound feedback prevention lesson",
    topic: "Feedback, mic placement and monitors",
    sourceUrl: "https://www.youtube.com/results?search_query=church+sound+feedback+microphone+placement+monitor+short+tutorial",
    sourceName: "YouTube search shortlist",
    durationTarget: "Under 8 minutes",
    whyUse: "Use before the feedback troubleshooting decision tree and gain-before-feedback practical.",
    linkedLessons: ["gain-before-feedback", "choir-mic-placement"],
    reviewStatus: "Needs final video selection"
  },
  {
    slug: "x32-eq-compression-youtube",
    title: "Short X32 EQ and compression walkthrough",
    topic: "EQ, gates and compression on X32",
    sourceUrl: "https://www.youtube.com/results?search_query=Behringer+X32+EQ+compression+gate+short+tutorial",
    sourceName: "YouTube search shortlist",
    durationTarget: "Under 12 minutes",
    whyUse: "Use as a visual console companion to the EQ and dynamics listening examples.",
    linkedLessons: ["hpf-eq-cuts", "gates-compression-fx"],
    reviewStatus: "Needs final video selection"
  },
  {
    slug: "logic-livestream-loudness-youtube",
    title: "Short Logic Pro livestream loudness tutorial",
    topic: "Logic Pro stream mix, limiter and loudness metering",
    sourceUrl: "https://www.youtube.com/results?search_query=Logic+Pro+livestream+mixing+loudness+meter+short+tutorial",
    sourceName: "YouTube search shortlist",
    durationTarget: "Under 12 minutes",
    whyUse: "Use in the Logic Pro livestream module before trainees build the approved church template.",
    linkedLessons: ["logic-latency-loudness", "logic-session-template"],
    reviewStatus: "Needs final video selection"
  }
];

export const quizzes: Quiz[] = lessons.slice(0, 12).map((lesson) => ({
  lessonSlug: lesson.slug,
  title: `${lesson.title} Knowledge Check`,
  passScore: 80,
  questions: [
    { prompt: `What is the safest habit during ${lesson.title.toLowerCase()}?`, options: ["Make one intentional change at a time", "Turn up every output", "Reload a random scene", "Bypass all processing"], answer: "Make one intentional change at a time", rationale: "Calm, reversible changes protect the service." },
    { prompt: "What should happen after a live-service issue is resolved?", options: ["Log the incident and learning", "Ignore it", "Delete the showfile", "Change every SOP immediately"], answer: "Log the incident and learning", rationale: "Incident notes preserve church-specific knowledge." }
  ]
}));

export const troubleshootingFlows: TroubleshootingFlow[] = [
  { slug: "no-sound-from-microphone", title: "No Sound From Microphone", symptom: "A mic is not reaching FOH or livestream.", priority: "Live service critical", steps: [
    { key: "mic-on", prompt: "Is the mic on and unmuted?", helpText: "Check switch, pack mute and receiver.", yes: "battery", no: "turn-on" },
    { key: "turn-on", prompt: "Turn it on or unmute it. Is signal restored?", helpText: "Mute the channel while handling.", yes: "resolved", no: "battery" },
    { key: "battery", prompt: "Is the battery charged?", helpText: "Swap with a known-good battery.", yes: "channel", no: "replace" },
    { key: "replace", prompt: "Replace battery. Is signal restored?", helpText: "Remove failed cells from service.", yes: "resolved", no: "channel" },
    { key: "channel", prompt: "Is the X32 channel, DCA or mute group muted?", helpText: "Check channel mute, DCA mute and mute groups.", yes: "unmute", no: "gain" },
    { key: "unmute", prompt: "Unmute correct path. Is signal restored?", helpText: "Confirm the right channel.", yes: "resolved", no: "gain" },
    { key: "gain", prompt: "Is gain present on the X32 input meter?", helpText: "Use PFL/input meter before routing changes.", yes: "routing", no: "patch" },
    { key: "patch", prompt: "Is the channel patched correctly?", helpText: "Compare patch list with socket or receiver.", yes: "routing", no: "fix-patch" },
    { key: "fix-patch", prompt: "Correct patch. Is signal restored?", helpText: "Log temporary changes.", yes: "resolved", no: "routing" },
    { key: "routing", prompt: "Is it routed to main, bus or stream output?", helpText: "Check main LR, buses, matrices, Dante and Logic.", yes: "resolved", no: "fix-routing" },
    { key: "fix-routing", prompt: "Restore approved routing. Is signal restored?", helpText: "Use known-good scene only with approval.", yes: "resolved", no: "escalate" },
    { key: "resolved", prompt: "Resolution confirmed.", helpText: "Log root cause.", resolution: "Audio restored and documented." },
    { key: "escalate", prompt: "Escalate to engineer.", helpText: "Move to Dante or stream flow if needed.", resolution: "Use backup path if service-critical." }
  ] },
  { slug: "livestream-has-no-sound", title: "Livestream Has No Sound", symptom: "Room audio works but stream is silent.", priority: "Broadcast critical", steps: [
    { key: "x32", prompt: "Is X32 stream send metering?", helpText: "Check bus mute, sends and matrix.", yes: "dante", no: "fix-x32" },
    { key: "fix-x32", prompt: "Restore X32 stream send. Audio back?", helpText: "Avoid affecting FOH.", yes: "resolved", no: "dante" },
    { key: "dante", prompt: "Does Dante Controller show subscription?", helpText: "Check X32 card to DVS receive.", yes: "dvs", no: "fix-dante" },
    { key: "fix-dante", prompt: "Restore subscription. Audio back?", helpText: "Confirm names and sample rate.", yes: "resolved", no: "dvs" },
    { key: "dvs", prompt: "Is DVS running on the correct interface?", helpText: "Check wired NIC, sample rate and channel count.", yes: "logic", no: "start-dvs" },
    { key: "start-dvs", prompt: "Start/correct DVS. Audio back?", helpText: "Do not change clock casually.", yes: "resolved", no: "logic" },
    { key: "logic", prompt: "Is Logic receiving input?", helpText: "Check named channel strip meters.", yes: "obs", no: "template" },
    { key: "template", prompt: "Correct Logic input/template. Audio back?", helpText: "Verify approved template.", yes: "resolved", no: "obs" },
    { key: "obs", prompt: "Is OBS receiving Logic output?", helpText: "Check capture source and output device.", yes: "resolved", no: "escalate" },
    { key: "resolved", prompt: "Resolution confirmed.", helpText: "Log cause.", resolution: "Stream audio restored." },
    { key: "escalate", prompt: "Escalate stream fault.", helpText: "Use backup capture if available.", resolution: "Technical director review required." }
  ] },
  { slug: "feedback", title: "Feedback During Service", symptom: "Ringing or howling from room or monitors.", priority: "Live service critical", steps: [
    { key: "identify", prompt: "Can you identify the mic/path?", helpText: "Use mute groups carefully.", yes: "monitor", no: "reduce" },
    { key: "reduce", prompt: "Reduce likely output. Did it stop?", helpText: "Protect the service first.", yes: "monitor", no: "escalate" },
    { key: "monitor", prompt: "Is monitor send excessive?", helpText: "Check recent requests.", yes: "lower", no: "position" },
    { key: "lower", prompt: "Lower monitor send. Stable?", helpText: "Communicate calmly.", yes: "resolved", no: "position" },
    { key: "position", prompt: "Is mic aimed poorly or too far from source?", helpText: "Move source before heavy EQ.", yes: "move", no: "eq" },
    { key: "move", prompt: "Reposition. Stable?", helpText: "Keep clarity.", yes: "resolved", no: "eq" },
    { key: "eq", prompt: "Can a small gain/EQ change fix it?", helpText: "Make narrow, reversible changes.", yes: "resolved", no: "escalate" },
    { key: "resolved", prompt: "Resolution confirmed.", helpText: "Document source and action.", resolution: "Feedback controlled." },
    { key: "escalate", prompt: "Escalate to senior engineer.", helpText: "Use safe reduction.", resolution: "Review gain-before-feedback workflow." }
  ] },
  { slug: "dante-issue", title: "Dante Issue", symptom: "Network audio missing, unstable or clocking incorrectly.", priority: "Network critical", steps: [
    { key: "visible", prompt: "Is the device visible?", helpText: "Check power, cable, switch and NIC.", yes: "interface", no: "network" },
    { key: "network", prompt: "Fix visibility. Device visible?", helpText: "Do not reconfigure unrelated devices.", yes: "interface", no: "escalate" },
    { key: "interface", prompt: "Correct Dante interface selected?", helpText: "Use wired NIC, not Wi-Fi.", yes: "sample", no: "fix-interface" },
    { key: "fix-interface", prompt: "Select interface. Route recovered?", helpText: "Restart DVS if needed.", yes: "resolved", no: "sample" },
    { key: "sample", prompt: "Same sample rate and clock domain?", helpText: "Check Device Config and Clock.", yes: "subscription", no: "fix-sample" },
    { key: "fix-sample", prompt: "Restore sample rate. Audio back?", helpText: "Avoid pull-up/down surprises.", yes: "resolved", no: "subscription" },
    { key: "subscription", prompt: "Correct subscription?", helpText: "Check Receive tab state.", yes: "clock", no: "fix-subscription" },
    { key: "fix-subscription", prompt: "Restore subscription. Audio back?", helpText: "Use known-good map.", yes: "resolved", no: "clock" },
    { key: "clock", prompt: "Clock synced without warnings?", helpText: "Clock warnings are service risks.", yes: "resolved", no: "escalate" },
    { key: "resolved", prompt: "Resolution confirmed.", helpText: "Record Dante state.", resolution: "Dante path restored." },
    { key: "escalate", prompt: "Escalate Dante network fault.", helpText: "Review topology and switch health.", resolution: "Use backup path if available." }
  ] }
];

const sopRows: Array<[string, string, string, string, SOP["ownerRole"], string[]]> = [
  ["before-service-checklist", "Before Service Checklist", "Service", "Prepare room, console, stage, stream and team.", "Sound Operator", ["Power system in approved order", "Load X32 showfile", "Check wireless batteries", "Verify P16 and talkback", "Start DVS and Logic", "Record exceptions"]],
  ["sound-check-checklist", "Sound Check Checklist", "Service", "Move from source verification to musical balance.", "Engineer", ["Confirm patch list", "Line check every source", "Set gain", "Build monitor sends", "Balance speech then worship", "Confirm stream"]],
  ["line-check-checklist", "Line Check Checklist", "Service", "Catch dead sources and wrong patches early.", "Sound Operator", ["Mute mains if needed", "Call each source", "Confirm input meter", "Confirm FOH", "Confirm stream", "Mark failed sources"]],
  ["wireless-mic-preparation", "Wireless Mic Preparation", "Wireless", "Prepare handhelds and beltpacks.", "Sound Operator", ["Install fresh batteries", "Check RF/audio", "Label owner", "Confirm mute", "Place for handoff", "Log weak packs"]],
  ["p16-setup", "P16 Setup", "Monitoring", "Give musicians predictable monitor sources.", "Engineer", ["Confirm Ultranet assignment", "Power P16 units", "Verify labels", "Set safe volume", "Handle requests"]],
  ["logic-livestream-startup", "Logic Livestream Startup", "Livestream", "Start approved Logic workflow.", "Engineer", ["Launch template", "Confirm DVS", "Verify sample rate", "Check buses", "Confirm loudness meter", "Send test to OBS"]],
  ["dante-verification", "Dante Verification", "Dante", "Validate network audio before service.", "Engineer", ["Open Dante Controller", "Confirm devices", "Check subscriptions", "Check clock", "Check sample rate", "Start DVS"]],
  ["end-of-service-shutdown", "End of Service Shutdown", "Service", "Close service cleanly.", "Sound Operator", ["Save notes", "Archive Logic session", "Mute outputs", "Power down", "Return mics", "Log incidents"]],
  ["incident-reporting", "Incident Reporting", "Governance", "Turn issues into team learning.", "Senior Engineer", ["Record symptom", "Record impact", "Record steps", "Record fix", "Link SOP", "Assign owner"]],
  ["equipment-handover", "Equipment Handover", "Equipment", "Keep shared gear reliable.", "Sound Operator", ["Inspect item", "Return to location", "Report damage", "Update notes", "Flag replacements"]]
];

export const sops: SOP[] = sopRows.map(([slug, title, category, purpose, ownerRole, steps]) => ({ slug, title, category, purpose, ownerRole, steps, version: 1 }));

export const equipment: Equipment[] = [
  { slug: "behringer-x32", name: "FOH Console", category: "Mixer", model: "Behringer X32", location: "FOH booth", purpose: "Main FOH, monitor and stream routing.", inputs: "Local, AES50, Dante card", outputs: "Main LR, matrices, buses, Ultranet/P16, Dante", connectedDevices: "Stage boxes, P16, Dante network, livestream Mac", commonIssues: ["Wrong scene", "Muted DCA", "Routing change"], sopLinks: ["before-service-checklist"], notes: "Store approved showfiles and document scene changes.", lastUpdated: "2026-06-13" },
  { slug: "dante-virtual-soundcard", name: "Dante Virtual Soundcard", category: "Software", model: "Audinate DVS", location: "Livestream Mac", purpose: "Receives Dante audio into Logic.", inputs: "Dante subscriptions", outputs: "Core Audio channels", connectedDevices: "Dante Controller, Logic Pro", commonIssues: ["Wrong interface", "DVS stopped", "Sample-rate mismatch"], sopLinks: ["dante-verification"], notes: "Confirm wired NIC and sample rate.", lastUpdated: "2026-06-13" },
  { slug: "logic-pro-stream", name: "Logic Pro Stream Session", category: "Software", model: "Logic Pro", location: "Livestream Mac", purpose: "Broadcast mix, plugins, loudness and encoder output.", inputs: "DVS inputs", outputs: "OBS/audio capture", connectedDevices: "DVS, Waves, OBS", commonIssues: ["Wrong template", "Plugin latency", "Output not captured"], sopLinks: ["logic-livestream-startup"], notes: "Future asset: approved template download.", lastUpdated: "2026-06-13" },
  { slug: "waves-plugin-bundle", name: "Waves Livestream Plugins", category: "Software", model: "F6, C6, RComp, CLA Vocals", location: "Livestream Mac", purpose: "Dynamic EQ, compression, vocal processing and limiting.", inputs: "Logic strips", outputs: "Processed buses", connectedDevices: "Logic Pro", commonIssues: ["Missing license", "CPU overload", "Over-processing"], sopLinks: ["logic-livestream-startup"], notes: "Teach by purpose before plugin name.", lastUpdated: "2026-06-13" },
  { slug: "p16-system", name: "P16 Personal Monitoring", category: "P16 system", model: "Behringer P16", location: "Stage", purpose: "Personal monitor mixes.", inputs: "Ultranet", outputs: "Performer headphones", connectedDevices: "X32, P16 mixers", commonIssues: ["Wrong source", "High volume", "No feed"], sopLinks: ["p16-setup"], notes: "Document source order.", lastUpdated: "2026-06-13" },
  { slug: "wireless-handhelds", name: "Wireless Handheld Mics", category: "Wireless system", model: "Church wireless system", location: "Mic storage", purpose: "Speech and worship leading.", inputs: "Transmitter", outputs: "Receiver to X32", connectedDevices: "Receivers, X32", commonIssues: ["Flat battery", "Muted pack", "RF drops"], sopLinks: ["wireless-mic-preparation"], notes: "Add exact model later.", lastUpdated: "2026-06-13" },
  { slug: "choir-mics", name: "Choir Microphones", category: "Microphone", model: "Choir condenser pair", location: "Choir area", purpose: "Choir pickup for FOH and stream.", inputs: "Choir", outputs: "X32 channels", connectedDevices: "X32", commonIssues: ["Feedback", "Too much room", "Harsh blend"], sopLinks: ["sound-check-checklist"], notes: "Add placement photos.", lastUpdated: "2026-06-13" },
  { slug: "network-switch", name: "Audio Network Switch", category: "Network switch", model: "Dante-capable switch", location: "Tech rack", purpose: "Carries Dante audio.", inputs: "Dante devices", outputs: "Dante devices", connectedDevices: "X32 Dante card, Mac NIC", commonIssues: ["Wrong port", "Power loss", "QoS uncertainty"], sopLinks: ["dante-verification"], notes: "Collect switch model and VLAN/QoS.", lastUpdated: "2026-06-13" }
];

export const visualSources: VisualSource[] = [
  {
    slug: "x32-console-reference",
    title: "Behringer X32 Console Reference",
    category: "Equipment Photo",
    trainingUse: "Use as the primary console orientation visual for layers, buses, DCAs, scenes and physical navigation.",
    sourceName: "Behringer X32 product page",
    sourceUrl: "https://www.behringer.com/en/products/0603-ACE",
    rights: "Official vendor reference",
    linkedTopics: ["x32-navigation", "x32-mix-buses", "x32-scenes-snippets"],
    notes: "Use linked vendor page for reference; replace lesson hero images with church-owned console photos when captured."
  },
  {
    slug: "x32-ultranet-p16-reference",
    title: "X32 Ultranet and P16 Monitoring Reference",
    category: "Training Example",
    trainingUse: "Explain how X32 Ultranet feeds P16 personal monitor mixers and why source order must stay predictable.",
    sourceName: "Behringer X32 product page",
    sourceUrl: "https://www.behringer.com/en/products/0603-ACE",
    rights: "Official vendor reference",
    linkedTopics: ["p16-monitor-basics", "x32-mix-buses"],
    notes: "Pair this with an original church P16 source-order diagram."
  },
  {
    slug: "p16-personal-monitor-reference",
    title: "P16 Personal Monitoring Mixer Reference",
    category: "Equipment Photo",
    trainingUse: "Show volunteers the personal monitoring control surface before hands-on stage practice.",
    sourceName: "Behringer P16-HQ product page",
    sourceUrl: "https://www.behringer.com/en/products/0609-aap",
    rights: "Official vendor reference",
    linkedTopics: ["p16-monitor-basics", "p16-setup"],
    notes: "If the church owns P16-M rather than P16-HQ, add a church-owned photo of the exact deployed unit."
  },
  {
    slug: "dante-controller-receive-tab",
    title: "Dante Controller Receive Tab",
    category: "Software Screenshot",
    trainingUse: "Teach receive subscriptions, available transmit channels and how to confirm X32-to-DVS routing.",
    sourceName: "Audinate Dante Controller User Guide",
    sourceUrl: "https://dev.audinate.com/GA/dante-controller/userguide/webhelp/content/receive_tab.htm",
    rights: "Official vendor reference",
    linkedTopics: ["dante-controller-basics", "dante-into-logic", "livestream-has-no-sound"],
    notes: "Use as the authoritative reference for subscription behavior; capture church-specific screenshots once devices are named."
  },
  {
    slug: "dante-controller-transmit-tab",
    title: "Dante Controller Transmit Tab",
    category: "Software Screenshot",
    trainingUse: "Show how transmit channels are named and inspected before building a route map.",
    sourceName: "Audinate Dante Controller User Guide",
    sourceUrl: "https://dev.audinate.com/GA/dante-controller/userguide/webhelp/content/transmit_tab.htm",
    rights: "Official vendor reference",
    linkedTopics: ["dante-controller-basics", "dvs-sample-rate-clock"],
    notes: "Good visual for teaching clean channel naming before Logic input naming."
  },
  {
    slug: "dante-device-config-latency",
    title: "Dante Device Config and Latency",
    category: "Software Screenshot",
    trainingUse: "Support lessons on sample rate, latency settings and device-level configuration checks.",
    sourceName: "Audinate Dante Controller User Guide",
    sourceUrl: "https://dev.audinate.com/GA/dante-controller/userguide/webhelp/content/device_config_tab.htm",
    rights: "Official vendor reference",
    linkedTopics: ["dvs-sample-rate-clock", "dante-issue"],
    notes: "Use during simulated Dante fault isolation."
  },
  {
    slug: "logic-loudness-meter",
    title: "Logic Pro Loudness Meter",
    category: "Software Screenshot",
    trainingUse: "Teach momentary, short-term and integrated loudness for livestream consistency.",
    sourceName: "Apple Logic Pro User Guide",
    sourceUrl: "https://support.apple.com/guide/logicpro/loudness-meter-lgce12d9d256/mac",
    rights: "Official vendor reference",
    linkedTopics: ["logic-latency-loudness", "translation-checks"],
    notes: "Pair with church targets for spoken word, worship bus and master stream level."
  },
  {
    slug: "logic-plugin-latency",
    title: "Logic Pro Plug-In Latency Compensation",
    category: "Software Screenshot",
    trainingUse: "Explain why heavy plugins can change monitoring feel and how Low Latency Monitoring affects sends.",
    sourceName: "Apple Logic Pro User Guide",
    sourceUrl: "https://support.apple.com/guide/logicpro/work-with-plug-in-latencies-lgcpe11997ba/mac",
    rights: "Official vendor reference",
    linkedTopics: ["logic-latency-loudness", "waves-purpose-first"],
    notes: "Add screenshots from the church livestream Mac after the approved template is built."
  },
  {
    slug: "waves-f6-dynamic-eq",
    title: "Waves F6 Dynamic EQ",
    category: "Plugin Example",
    trainingUse: "Demonstrate dynamic EQ for vocal harshness, low-mid buildup and frequency-specific control.",
    sourceName: "Waves F6 product page",
    sourceUrl: "https://www.waves.com/plugins/f6-floating-band-dynamic-eq",
    rights: "Official vendor reference",
    linkedTopics: ["waves-purpose-first", "waves-vocal-speech-chains", "logic-vocal-clarity"],
    notes: "Use with original before/after examples from church vocal recordings once available."
  },
  {
    slug: "waves-c6-multiband",
    title: "Waves C6 Multiband Compressor",
    category: "Plugin Example",
    trainingUse: "Teach multiband control for vocal, choir and worship bus shaping.",
    sourceName: "Waves C6 product page",
    sourceUrl: "https://www.waves.com/plugins/c6-multiband-compressor",
    rights: "Official vendor reference",
    linkedTopics: ["waves-purpose-first", "waves-vocal-speech-chains"],
    notes: "Reference only; training examples should use church-specific chain screenshots."
  },
  {
    slug: "waves-rcomp",
    title: "Waves Renaissance Compressor",
    category: "Plugin Example",
    trainingUse: "Show smooth compression for speech, lead vocal and bus control without over-processing.",
    sourceName: "Waves Renaissance Compressor product page",
    sourceUrl: "https://www.waves.com/plugins/renaissance-compressor",
    rights: "Official vendor reference",
    linkedTopics: ["waves-vocal-speech-chains", "logic-vocal-clarity"],
    notes: "Build presets as training examples after senior engineer approval."
  },
  {
    slug: "waves-cla-vocals",
    title: "Waves CLA Vocals",
    category: "Plugin Example",
    trainingUse: "Explain quick vocal shaping while still teaching purpose, restraint and gain staging.",
    sourceName: "Waves CLA Vocals product page",
    sourceUrl: "https://www.waves.com/plugins/cla-vocals",
    rights: "Official vendor reference",
    linkedTopics: ["waves-vocal-speech-chains", "logic-vocal-clarity"],
    notes: "Use as an example, not a default fix for every vocal."
  },
  {
    slug: "church-signal-flow-diagram",
    title: "Church Signal Flow Diagram",
    category: "Signal Diagram",
    trainingUse: "Show microphone to X32, Dante, Logic, OBS, PA, P16 and livestream paths in one church-specific map.",
    sourceName: "Original platform diagram",
    sourceUrl: "/signal-flow",
    rights: "Create original diagram",
    linkedTopics: ["basic-signal-flow", "dante-into-logic", "stream-bus-design"],
    notes: "Must be drawn from the church patch list and updated whenever routing changes."
  },
  {
    slug: "logic-session-template-screenshot",
    title: "Approved Logic Session Template Screenshot",
    category: "Software Screenshot",
    trainingUse: "Show named inputs, auxes, buses, vocal chains, stream master and loudness metering exactly as volunteers will see them.",
    sourceName: "Church-owned capture required",
    sourceUrl: "/visuals",
    rights: "Church-owned required",
    linkedTopics: ["logic-session-template", "logic-latency-loudness", "livestream-has-no-sound"],
    notes: "Capture from the actual livestream Mac after sensitive names are reviewed."
  },
  {
    slug: "obs-audio-capture-screenshot",
    title: "OBS Audio Capture Screenshot",
    category: "Software Screenshot",
    trainingUse: "Confirm the final handoff from Logic output to OBS/audio capture in livestream troubleshooting.",
    sourceName: "Church-owned capture required",
    sourceUrl: "/visuals",
    rights: "Church-owned required",
    linkedTopics: ["livestream-has-no-sound", "logic-session-template"],
    notes: "Use the church OBS scene collection, with stream keys or private account details hidden."
  },
  {
    slug: "wireless-mic-labeling-photo",
    title: "Wireless Mic Battery and Labeling Photo",
    category: "Equipment Photo",
    trainingUse: "Show the exact battery orientation, label convention and handoff staging for services.",
    sourceName: "Church-owned capture required",
    sourceUrl: "/visuals",
    rights: "Church-owned required",
    linkedTopics: ["wireless-prep", "no-sound-from-microphone"],
    notes: "This should be a real church photo because volunteer muscle memory matters here."
  },
  {
    slug: "choir-mic-placement-photo",
    title: "Choir Microphone Placement Photo",
    category: "Training Example",
    trainingUse: "Compare correct and risky choir mic placement for spill, clarity and feedback control.",
    sourceName: "Church-owned capture required",
    sourceUrl: "/visuals",
    rights: "Church-owned required",
    linkedTopics: ["choir-mic-placement", "gain-before-feedback", "speech-choir-worship"],
    notes: "Capture at rehearsal from multiple angles and avoid identifying people where possible."
  },
  {
    slug: "vocal-chain-original-diagram",
    title: "Livestream Vocal Chain Diagram",
    category: "Signal Diagram",
    trainingUse: "Visualize HPF, corrective EQ, dynamic EQ, compression, de-essing and bus processing as a purpose-first chain.",
    sourceName: "Original platform diagram",
    sourceUrl: "/visuals",
    rights: "Create original diagram",
    linkedTopics: ["waves-vocal-speech-chains", "logic-vocal-clarity"],
    notes: "Diagram should show decision points, not magic settings."
  },
  {
    slug: "speech-chain-original-diagram",
    title: "Speech Chain Diagram",
    category: "Signal Diagram",
    trainingUse: "Teach speech intelligibility processing for pastors, readers and announcements.",
    sourceName: "Original platform diagram",
    sourceUrl: "/visuals",
    rights: "Create original diagram",
    linkedTopics: ["speech-first-mixing", "waves-vocal-speech-chains"],
    notes: "Include clarity, consistency, sibilance and loudness checks."
  },
  {
    slug: "livestream-master-chain-diagram",
    title: "Livestream Master Chain Diagram",
    category: "Signal Diagram",
    trainingUse: "Show bus processing, limiting, metering and translation checks for the final stream output.",
    sourceName: "Original platform diagram",
    sourceUrl: "/visuals",
    rights: "Create original diagram",
    linkedTopics: ["logic-latency-loudness", "translation-checks", "stream-bus-design"],
    notes: "Use approved church loudness policy once defined."
  }
];

export const users: User[] = [
  { name: "Ava Williams", email: "ava@example.church", role: "Trainee", currentLevel: "Foundations", progress: 32 },
  { name: "Daniel Mensah", email: "daniel@example.church", role: "Sound Operator", currentLevel: "Operator", progress: 58 },
  { name: "Grace Chen", email: "grace@example.church", role: "Engineer", currentLevel: "Engineer", progress: 74 },
  { name: "Samuel Brooks", email: "samuel@example.church", role: "Senior Engineer", currentLevel: "Senior Engineer", progress: 86 },
  { name: "Naomi Patel", email: "naomi@example.church", role: "Technical Director", currentLevel: "Technical Director", progress: 91 },
  { name: "Admin User", email: "admin@example.church", role: "Admin", currentLevel: "Technical Director", progress: 100 }
];

export const certifications: Certification[] = [
  { userEmail: "ava@example.church", level: "Foundations", modulesCompleted: 2, quizAverage: 84, practicalSignoffs: 1, serviceObservations: 1, status: "In Progress", renewalDue: "2027-06-13", seniorNotes: "Needs more X32 layer practice before first solo line check." },
  { userEmail: "daniel@example.church", level: "Operator", modulesCompleted: 7, quizAverage: 88, practicalSignoffs: 4, serviceObservations: 5, status: "Needs Mentor Review", renewalDue: "2027-03-01", seniorNotes: "Ready for wireless and choir assessment." },
  { userEmail: "grace@example.church", level: "Engineer", modulesCompleted: 14, quizAverage: 92, practicalSignoffs: 8, serviceObservations: 12, status: "Approved", renewalDue: "2027-01-15", seniorNotes: "Approved for Logic stream operation and Dante verification." },
  { userEmail: "samuel@example.church", level: "Senior Engineer", modulesCompleted: 18, quizAverage: 94, practicalSignoffs: 12, serviceObservations: 28, status: "Approved", renewalDue: "2027-02-20", seniorNotes: "Mentor for operator assessments." }
];

export const signalPaths = [
  { title: "Speech Mic to FOH", source: "Wireless handheld", path: "Receiver -> X32 input -> channel processing -> Main LR -> PA", destination: "Room speakers", notes: "Speech remains highest priority." },
  { title: "Speech Mic to Livestream", source: "Wireless handheld", path: "Receiver -> X32 -> stream bus -> Dante -> DVS -> Logic speech chain -> OBS", destination: "Online stream", notes: "Verify Logic input and output meters." },
  { title: "Worship Team to P16", source: "Band and vocal channels", path: "X32 channels -> Ultranet source assignment -> P16 units", destination: "Personal monitors", notes: "Keep source order predictable." },
  { title: "Choir to Stream", source: "Choir mic pair", path: "X32 inputs -> stream bus -> Dante -> Logic choir processing -> master chain", destination: "Livestream mix", notes: "Watch spill, harshness and mono compatibility." }
];

export const systemHealth: SystemHealth[] = [
  { name: "X32 Console", status: "Connected", detail: "Showfile loaded, 32 inputs visible", metric: "0 clipped preamps" },
  { name: "Dante Network", status: "Healthy", detail: "X32 card, DVS and stream Mac discovered", metric: "48 kHz locked" },
  { name: "Logic Stream", status: "Ready", detail: "Approved template open with stream master armed", metric: "-16 LUFS target" },
  { name: "P16 Monitoring", status: "Connected", detail: "Ultranet source order verified", metric: "16 sources" },
  { name: "Wireless Mics", status: "Warning", detail: "Two packs need fresh batteries before service", metric: "8/10 ready" },
  { name: "Livestream Output", status: "Ready", detail: "OBS capture receiving Logic output", metric: "1080p / 6 Mbps" }
];

export const activityFeed: ActivityItem[] = [
  { title: "Passed Sound Lab: Compression Control", detail: "Grace identified over-compression and chose bus input trim first.", time: "2h ago", tone: "success" },
  { title: "Mentor sign-off requested", detail: "Daniel submitted X32 patch-name-gain evidence for review.", time: "Yesterday", tone: "info" },
  { title: "Wireless battery warning", detail: "Two handhelds were returned without fresh batteries after rehearsal.", time: "2 days ago", tone: "warning" },
  { title: "Dante route restored", detail: "Stream Mac subscription was corrected and logged after training lab.", time: "3 days ago", tone: "success" }
];

export const roadmapNodes: RoadmapNode[] = modules.map((module, index) => ({
  moduleSlug: module.slug,
  completion: index < 4 ? 100 : index < 9 ? 60 + (index % 3) * 10 : index < 15 ? 20 + (index % 4) * 8 : 0,
  state: index < 4 ? "Complete" : index < 9 ? "In Progress" : index < 15 ? "Unlocked" : "Locked",
  difficulty: module.level === "Foundations" ? "Beginner" : module.level === "Operator" ? "Intermediate" : "Advanced",
  linkedEquipment: module.slug.includes("logic") ? ["Logic Pro", "DVS", "Waves"] : module.slug.includes("dante") ? ["Dante Controller", "X-DANTE", "Network switch"] : module.slug.includes("x32") ? ["Behringer X32", "P16", "Stagebox"] : ["X32", "Wireless", "Service workflow"],
  serviceSkills: module.slug.includes("troubleshooting") ? ["Fault isolation", "Incident logging"] : module.slug.includes("monitoring") ? ["P16 setup", "Talkback"] : module.slug.includes("livestream") || module.slug.includes("logic") ? ["Stream mix", "OBS handoff"] : ["Line check", "Safe operation"],
  nextAction: index < 4 ? "Review for spaced repetition" : index < 9 ? "Complete mentor drill" : index < 15 ? "Start guided walkthrough" : "Complete previous level"
}));

export const serviceChecklist: ServiceChecklistItem[] = [
  { title: "Wireless Mic Check", detail: "Fresh batteries, labels, RF/audio verified", area: "Wireless", status: "Done" },
  { title: "X32 Console Check", detail: "Sunday showfile loaded, key inputs named", area: "X32", status: "Done" },
  { title: "Dante Network Check", detail: "DVS running, green subscriptions, 48 kHz", area: "Dante", status: "Done" },
  { title: "Logic Stream Check", detail: "Template open, DVS selected, loudness meter active", area: "Logic", status: "Due" },
  { title: "P16 Personal Monitoring", detail: "Ultranet source order and musician requests checked", area: "P16", status: "Done" },
  { title: "Stage and Monitors Check", detail: "Wedges safe, stage volume under control", area: "Stage", status: "Check" },
  { title: "Talkback Check", detail: "Talkback mic routed only to intended destinations", area: "Talkback", status: "Done" },
  { title: "Livestream Output Check", detail: "OBS receives Logic output, short test record complete", area: "Livestream", status: "Due" }
];

export const x32Panels: TrainingPanel[] = [
  { title: "Input Channel", summary: "Select the channel, confirm source, set preamp gain, check meter and name the scribble strip.", status: "Practice", checks: ["Correct layer selected", "Input meter active", "No red clipping", "Source name is meaningful"], mistakes: ["Setting gain from a quiet test voice", "Editing a bus instead of an input", "Leaving mystery channel names"] },
  { title: "EQ and HPF", summary: "Use HPF and small corrective moves before boosting. Bypass to compare.", status: "Ready", checks: ["HPF engaged for speech", "Narrow harshness cuts", "Bypass comparison"], mistakes: ["Boosting highs for every unclear vocal", "EQing around bad mic placement"] },
  { title: "Gate and Compressor", summary: "Use dynamics to control noise and level movement without chopping speech or flattening worship.", status: "Practice", checks: ["Threshold from real source", "Gain reduction visible", "Natural release"], mistakes: ["Gate eats consonants", "Compression hides bad gain"] },
  { title: "Sends on Fader", summary: "Build monitor and stream sends intentionally without disturbing FOH balance.", status: "Ready", checks: ["Correct bus selected", "Pre/post tap understood", "Monitor request documented"], mistakes: ["Changing FOH to fix monitors", "Wrong bus destination"] },
  { title: "Scenes and Snippets", summary: "Recall service states safely, protect routing and document anything that changes.", status: "Needs Review", checks: ["Safe scene scope", "Rollback plan", "Pastor mic protected"], mistakes: ["Panic recall during service", "Overwriting approved showfile"] }
];

export const logicPanels: TrainingPanel[] = [
  { title: "Dante Into Logic", summary: "Confirm DVS, sample rate, subscriptions and Logic input meters before plugins.", status: "Practice", checks: ["Wired interface selected", "DVS running", "Logic audio device correct", "Input meter follows source"], mistakes: ["Starting in Logic when Dante is broken", "Wrong input order"] },
  { title: "Stream Template", summary: "Use named inputs, speech/vocal/choir/worship auxes, output routing and dated session saves.", status: "Ready", checks: ["Inputs named", "Aux buses visible", "Master chain active", "Save as template"], mistakes: ["Blank project on Sunday", "No dated archive"] },
  { title: "Waves Chains", summary: "Apply purpose-first processing: dynamic EQ, compression, de-essing, bus control and safe limiting.", status: "Practice", checks: ["F6 for dynamic harshness", "RComp for consistency", "Limiter last", "Latency watched"], mistakes: ["Plugin because it looks good", "Fixing bad gain in Logic"] },
  { title: "Translation Checks", summary: "Compare phone, headphones, laptop and TV-style playback before trusting the stream mix.", status: "Ready", checks: ["Speech clear on phone", "Worship not crushed", "Room mics intentional"], mistakes: ["Only checking studio headphones", "Copying FOH balance"] }
];

export const dantePanels: TrainingPanel[] = [
  { title: "Device Discovery", summary: "Confirm X32 Dante card, stream Mac/DVS and any network devices are visible before routing.", status: "Ready", checks: ["Correct wired interface", "Device names stable", "No missing endpoints"], mistakes: ["Using Wi-Fi", "Renaming devices casually"] },
  { title: "Routing Matrix", summary: "Read transmit and receive channels, then confirm green subscription status.", status: "Practice", checks: ["Tx source correct", "Rx destination correct", "Green tick", "Channel count expected"], mistakes: ["Routing from memory", "Wrong receive device"] },
  { title: "Clock and Sample Rate", summary: "Verify 48 kHz policy, leader clock and latency warnings before service.", status: "Ready", checks: ["Clock synced", "Sample rate aligned", "No latency warnings"], mistakes: ["Changing clock during pressure", "Ignoring sample-rate mismatch"] },
  { title: "DVS Status", summary: "DVS must run on the correct Ethernet interface before Logic receives network audio.", status: "Practice", checks: ["DVS started", "Correct NIC", "Core Audio available"], mistakes: ["DVS stopped", "USB/Bluetooth bridge confusion"] }
];

export const certificationEvidence: CertificationEvidence[] = [
  { title: "Foundations quiz average", type: "Quiz", status: "Complete", detail: "92% across signal flow, gain and routing basics." },
  { title: "Sound Lab: clipped mic diagnosis", type: "Sound Lab", status: "Complete", detail: "Identified preamp clipping and chose gain before fader." },
  { title: "X32 patch-name-gain drill", type: "Practical", status: "Needs Review", detail: "Evidence uploaded; awaiting Senior Engineer sign-off." },
  { title: "Sunday service shadowing", type: "Service Observation", status: "Pending", detail: "Needs one more observed line check and stream verification." },
  { title: "Mentor note", type: "Mentor Note", status: "Complete", detail: "Ready for Dante subscription practice with supervision." }
];

export const serviceLogs = [
  { date: "2026-06-07", type: "Sunday Service", operator: "Grace Chen", notes: "Logic template loaded cleanly. Choir needed lower 3 kHz in stream.", incidents: 1 },
  { date: "2026-06-10", type: "Midweek Rehearsal", operator: "Daniel Mensah", notes: "P16 source order reviewed with worship team.", incidents: 0 },
  { date: "2026-06-13", type: "Training Lab", operator: "Samuel Brooks", notes: "Dante sample-rate mismatch simulation completed.", incidents: 0 }
];

export function getModule(slug: string) {
  return modules.find((module) => module.slug === slug);
}

export function getAcademy(slug: string) {
  return academies.find((academy) => academy.slug === slug);
}

export function getModulesForAcademy(academySlug: string) {
  const academy = getAcademy(academySlug);
  return academy ? academy.moduleSlugs.map((slug) => getModule(slug)).filter((module): module is Module => Boolean(module)) : [];
}

export function getAcademyForModule(moduleSlug: string) {
  return academies.find((academy) => academy.moduleSlugs.includes(moduleSlug));
}

export function getCertificationDefinitionForAcademy(academySlug: string) {
  return certificationDefinitions.find((definition) => definition.academySlug === academySlug);
}

export function getCompetenciesForAcademy(academySlug: string) {
  return competencies.filter((competency) => competency.academySlugs.includes(academySlug));
}

export function getSkillsForAcademy(academySlug: string) {
  const academyCompetencies = getCompetenciesForAcademy(academySlug);
  const skillSlugs = new Set(academyCompetencies.flatMap((competency) => competency.skillSlugs));
  return skills.filter((skill) => skillSlugs.has(skill.slug));
}

export function getSkillTreeForAcademy(academySlug: string) {
  return skillTrees.find((tree) => tree.academySlug === academySlug);
}

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonsForModule(moduleSlug: string) {
  return lessons.filter((lesson) => lesson.moduleSlug === moduleSlug);
}

export function getQuizForLesson(lessonSlug: string) {
  return quizzes.find((quiz) => quiz.lessonSlug === lessonSlug);
}

export function getTroubleshootingFlow(slug: string) {
  return troubleshootingFlows.find((flow) => flow.slug === slug);
}
