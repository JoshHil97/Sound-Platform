import { PrismaClient } from "@prisma/client";
import { audioExamples, equipment, lessonGuides, lessons, modules, quizzes, sops, trainingVideos, troubleshootingFlows, users, visualSources } from "../src/lib/data";

const prisma = new PrismaClient();

const roleMap = {
  "Trainee": "TRAINEE",
  "Sound Operator": "SOUND_OPERATOR",
  "Engineer": "ENGINEER",
  "Senior Engineer": "SENIOR_ENGINEER",
  "Technical Director": "TECHNICAL_DIRECTOR",
  "Admin": "ADMIN"
} as const;

const levelMap = {
  "Foundations": "FOUNDATIONS",
  "Operator": "OPERATOR",
  "Engineer": "ENGINEER",
  "Senior Engineer": "SENIOR_ENGINEER",
  "Technical Director": "TECHNICAL_DIRECTOR"
} as const;

const difficultyMap = { Beginner: "BEGINNER", Intermediate: "INTERMEDIATE", Advanced: "ADVANCED" } as const;
const equipmentCategoryMap: Record<string, string> = {
  Mixer: "MIXER",
  "P16 system": "P16_SYSTEM",
  Microphone: "MICROPHONE",
  "Wireless system": "WIRELESS_SYSTEM",
  Software: "SOFTWARE",
  "Network switch": "NETWORK_SWITCH"
};
const visualCategoryMap = {
  "Equipment Photo": "EQUIPMENT_PHOTO",
  "Console Screenshot": "CONSOLE_SCREENSHOT",
  "Software Screenshot": "SOFTWARE_SCREENSHOT",
  "Plugin Example": "PLUGIN_EXAMPLE",
  "Signal Diagram": "SIGNAL_DIAGRAM",
  "Training Example": "TRAINING_EXAMPLE"
} as const;
const visualRightsMap = {
  "Official vendor reference": "OFFICIAL_VENDOR_REFERENCE",
  "Church-owned required": "CHURCH_OWNED_REQUIRED",
  "Create original diagram": "CREATE_ORIGINAL_DIAGRAM",
  "Permission required": "PERMISSION_REQUIRED"
} as const;
const audioCategoryMap = {
  Gain: "GAIN",
  EQ: "EQ",
  Dynamics: "DYNAMICS",
  Feedback: "FEEDBACK",
  Livestream: "LIVESTREAM"
} as const;
const videoReviewStatusMap = {
  "Confirmed source": "CONFIRMED_SOURCE",
  "Needs final video selection": "NEEDS_FINAL_VIDEO_SELECTION"
} as const;

async function main() {
  await prisma.comment.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.serviceLog.deleteMany();
  await prisma.serviceChecklist.deleteMany();
  await prisma.signalPath.deleteMany();
  await prisma.troubleshootingStep.deleteMany();
  await prisma.troubleshootingFlow.deleteMany();
  await prisma.sOP.deleteMany();
  await prisma.trainingVideo.deleteMany();
  await prisma.audioExample.deleteMany();
  await prisma.lessonGuide.deleteMany();
  await prisma.visualAsset.deleteMany();
  await prisma.equipment.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.assessmentAttempt.deleteMany();
  await prisma.practicalAssessment.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.churchSpecificNote.deleteMany();
  await prisma.lessonContent.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();

  for (const [label, value] of Object.entries(roleMap)) {
    await prisma.role.create({ data: { name: value as never, description: `${label} platform access` } });
  }

  for (const user of users) {
    await prisma.user.create({ data: { name: user.name, email: user.email, role: roleMap[user.role] as never } });
  }

  for (const curriculumModule of modules) {
    await prisma.module.create({
      data: {
        slug: curriculumModule.slug,
        title: curriculumModule.title,
        level: levelMap[curriculumModule.level] as never,
        summary: curriculumModule.summary,
        duration: curriculumModule.duration,
        objectives: curriculumModule.objectives.join("\n"),
        prerequisites: curriculumModule.prerequisites.join("\n"),
        certification: curriculumModule.certification,
        order: curriculumModule.order,
        assessments: { create: { title: `${curriculumModule.title} Practical Sign-Off`, rubric: "Perform safely, explain decisions, follow SOP and document exceptions." } }
      }
    });
  }

  for (const lesson of lessons) {
    const curriculumModule = await prisma.module.findUniqueOrThrow({ where: { slug: lesson.moduleSlug } });
    await prisma.lesson.create({
      data: {
        slug: lesson.slug,
        title: lesson.title,
        summary: lesson.summary,
        difficulty: difficultyMap[lesson.difficulty] as never,
        durationMinutes: lesson.durationMinutes,
        moduleId: curriculumModule.id,
        beginnerExplanation: lesson.beginner,
        intermediateExplanation: lesson.intermediate,
        advancedExplanation: lesson.advanced,
        practicalExercise: lesson.practical,
        activeRecallPrompt: lesson.recall,
        spacedRepetitionPrompt: lesson.spaced,
        mentorSignoffCriteria: lesson.signoff,
        contentBlocks: { create: [{ heading: "Short Focus", body: lesson.summary, sort: 1 }, { heading: "Practical Exercise", body: lesson.practical, sort: 2 }] }
      }
    });
  }

  for (const quiz of quizzes) {
    const lesson = await prisma.lesson.findUniqueOrThrow({ where: { slug: quiz.lessonSlug } });
    await prisma.quiz.create({
      data: {
        title: quiz.title,
        passScore: quiz.passScore,
        lessonId: lesson.id,
        questions: { create: quiz.questions.map((question) => ({ prompt: question.prompt, options: JSON.stringify(question.options), answer: question.answer, rationale: question.rationale })) }
      }
    });
  }

  for (const flow of troubleshootingFlows) {
    await prisma.troubleshootingFlow.create({
      data: {
        slug: flow.slug,
        title: flow.title,
        symptom: flow.symptom,
        priority: flow.priority,
        steps: { create: flow.steps.map((step, sort) => ({ key: step.key, prompt: step.prompt, helpText: step.helpText, yesNextKey: step.yes, noNextKey: step.no, resolution: step.resolution, sort })) }
      }
    });
  }

  for (const sop of sops) {
    await prisma.sOP.create({ data: { slug: sop.slug, title: sop.title, category: sop.category, purpose: sop.purpose, steps: sop.steps.join("\n"), ownerRole: roleMap[sop.ownerRole] as never, version: sop.version } });
  }

  for (const item of equipment) {
    await prisma.equipment.create({
      data: {
        slug: item.slug,
        name: item.name,
        category: (equipmentCategoryMap[item.category] ?? "ACCESSORY") as never,
        model: item.model,
        location: item.location,
        purpose: item.purpose,
        inputs: item.inputs,
        outputs: item.outputs,
        connectedDevices: item.connectedDevices,
        commonIssues: item.commonIssues.join("\n"),
        sopLinks: item.sopLinks.join("\n"),
        notes: item.notes,
        photoPlaceholder: "Add real church photo later",
        lastUpdated: new Date(item.lastUpdated)
      }
    });
  }

  for (const source of visualSources) {
    await prisma.visualAsset.create({
      data: {
        slug: source.slug,
        title: source.title,
        category: visualCategoryMap[source.category] as never,
        trainingUse: source.trainingUse,
        sourceName: source.sourceName,
        sourceUrl: source.sourceUrl,
        rights: visualRightsMap[source.rights] as never,
        linkedTopics: source.linkedTopics.join("\n"),
        notes: source.notes
      }
    });
  }

  for (const guide of lessonGuides) {
    await prisma.lessonGuide.create({
      data: {
        lessonSlug: guide.lessonSlug,
        coreIdea: guide.coreIdea,
        boardChecks: guide.boardChecks.join("\n"),
        listeningTargets: guide.listeningTargets.join("\n"),
        commonMistakes: guide.commonMistakes.join("\n"),
        mentorPrompt: guide.mentorPrompt
      }
    });
  }

  for (const example of audioExamples) {
    await prisma.audioExample.create({
      data: {
        slug: example.slug,
        title: example.title,
        category: audioCategoryMap[example.category] as never,
        whatYouHear: example.whatYouHear,
        boardSymptoms: example.boardSymptoms.join("\n"),
        checks: example.checks.join("\n"),
        linkedLessons: example.linkedLessons.join("\n")
      }
    });
  }

  for (const video of trainingVideos) {
    await prisma.trainingVideo.create({
      data: {
        slug: video.slug,
        title: video.title,
        topic: video.topic,
        sourceUrl: video.sourceUrl,
        sourceName: video.sourceName,
        durationTarget: video.durationTarget,
        whyUse: video.whyUse,
        linkedLessons: video.linkedLessons.join("\n"),
        reviewStatus: videoReviewStatusMap[video.reviewStatus] as never
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());
