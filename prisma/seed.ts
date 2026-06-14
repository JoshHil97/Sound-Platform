import { PrismaClient } from "@prisma/client";
import { academies, audioExamples, certificationDefinitions, competencies, curriculumAssessments, equipment, evidenceRecords, learningOutcomes, lessonGuides, lessons, modules, practicalExercises, progressionRules, quizzes, serviceExperiences, skillTrees, skills, sops, trainingVideos, troubleshootingFlows, users, visualSources } from "../src/lib/data";

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
const competencyCategoryMap = {
  Knowledge: "KNOWLEDGE",
  Practical: "PRACTICAL",
  Operational: "OPERATIONAL",
  Troubleshooting: "TROUBLESHOOTING",
  Communication: "COMMUNICATION",
  Leadership: "LEADERSHIP"
} as const;
const skillDomainMap = {
  X32: "X32",
  Dante: "DANTE",
  Logic: "LOGIC",
  Waves: "WAVES",
  Wireless: "WIRELESS",
  P16: "P16",
  FOH: "FOH",
  Livestream: "LIVESTREAM",
  Troubleshooting: "TROUBLESHOOTING",
  Leadership: "LEADERSHIP"
} as const;
const curriculumAssessmentTypeMap = {
  Knowledge: "KNOWLEDGE",
  Practical: "PRACTICAL",
  Scenario: "SCENARIO",
  Service: "SERVICE",
  Mentor: "MENTOR",
  Certification: "CERTIFICATION"
} as const;
const evidenceTypeMap = {
  Quiz: "QUIZ",
  "Sound Lab": "SOUND_LAB",
  Practical: "PRACTICAL",
  "Service Observation": "SERVICE_OBSERVATION",
  "Mentor Note": "MENTOR_NOTE",
  "Media Upload": "MEDIA_UPLOAD"
} as const;
const evidenceStatusMap = {
  Submitted: "SUBMITTED",
  "Needs Review": "NEEDS_REVIEW",
  Approved: "APPROVED",
  "Revision Requested": "REVISION_REQUESTED",
  Rejected: "REJECTED"
} as const;

async function main() {
  await prisma.evidenceReview.deleteMany();
  await prisma.evidence.deleteMany();
  await prisma.serviceExperience.deleteMany();
  await prisma.mentorSignOff.deleteMany();
  await prisma.progressionRule.deleteMany();
  await prisma.practicalExercise.deleteMany();
  await prisma.learningOutcome.deleteMany();
  await prisma.skillTreeNode.deleteMany();
  await prisma.skillTree.deleteMany();
  await prisma.curriculumAssessment.deleteMany();
  await prisma.certificationDefinition.deleteMany();
  await prisma.competency.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.academy.deleteMany();
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

  for (const academy of academies) {
    await prisma.academy.create({
      data: {
        slug: academy.slug,
        title: academy.title,
        mission: academy.mission,
        ownerRole: roleMap[academy.ownerRole] as never,
        activeVersion: academy.activeVersion,
        order: academy.order
      }
    });
  }

  for (const curriculumModule of modules) {
    const academy = academies.find((item) => item.moduleSlugs.includes(curriculumModule.slug));
    await prisma.module.create({
      data: {
        slug: curriculumModule.slug,
        title: curriculumModule.title,
        academyId: academy ? (await prisma.academy.findUniqueOrThrow({ where: { slug: academy.slug } })).id : undefined,
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

  for (const skill of skills) {
    await prisma.skill.create({
      data: {
        slug: skill.slug,
        title: skill.title,
        domain: skillDomainMap[skill.domain] as never,
        description: skill.description
      }
    });
  }

  for (const competency of competencies) {
    await prisma.competency.create({
      data: {
        slug: competency.slug,
        title: competency.title,
        category: competencyCategoryMap[competency.category] as never,
        description: competency.description,
        level: levelMap[competency.level] as never,
        academies: { connect: competency.academySlugs.map((slug) => ({ slug })) },
        modules: { connect: competency.moduleSlugs.map((slug) => ({ slug })) },
        skills: { connect: competency.skillSlugs.map((slug) => ({ slug })) }
      }
    });
  }

  for (const definition of certificationDefinitions) {
    const academy = await prisma.academy.findUniqueOrThrow({ where: { slug: definition.academySlug } });
    await prisma.certificationDefinition.create({
      data: {
        slug: definition.slug,
        academyId: academy.id,
        level: levelMap[definition.level] as never,
        title: definition.title,
        mission: definition.mission,
        renewalMonths: definition.renewalMonths,
        requiredServiceObservations: definition.requiredServiceObservations,
        moduleRequirements: { connect: definition.moduleSlugs.map((slug) => ({ slug })) },
        competencyRequirements: { connect: definition.competencySlugs.map((slug) => ({ slug })) }
      }
    });
  }

  for (const tree of skillTrees) {
    const academy = await prisma.academy.findUniqueOrThrow({ where: { slug: tree.academySlug } });
    const createdTree = await prisma.skillTree.create({ data: { academyId: academy.id, title: tree.title, version: tree.version } });
    const nodeIds = new Map<string, string>();
    for (const node of tree.nodes) {
      const skill = await prisma.skill.findUniqueOrThrow({ where: { slug: node.skillSlug } });
      const createdNode = await prisma.skillTreeNode.create({
        data: {
          skillTreeId: createdTree.id,
          skillId: skill.id,
          parentNodeId: node.parentSkillSlug ? nodeIds.get(node.parentSkillSlug) : undefined,
          unlockRule: node.unlockRule,
          positionX: node.positionX,
          positionY: node.positionY
        }
      });
      nodeIds.set(node.skillSlug, createdNode.id);
    }
  }

  for (const assessment of curriculumAssessments) {
    const curriculumModuleRecord = await prisma.module.findUniqueOrThrow({ where: { slug: assessment.moduleSlug } });
    await prisma.curriculumAssessment.create({
      data: {
        slug: assessment.slug,
        moduleId: curriculumModuleRecord.id,
        type: curriculumAssessmentTypeMap[assessment.type] as never,
        title: assessment.title,
        rubric: assessment.rubric,
        passCriteria: assessment.passCriteria,
        retryCriteria: assessment.retryCriteria,
        mentorRoleRequired: roleMap[assessment.mentorRoleRequired] as never,
        competencies: { connect: assessment.competencySlugs.map((slug) => ({ slug })) }
      }
    });
  }

  for (const definition of certificationDefinitions) {
    await prisma.certificationDefinition.update({
      where: { slug: definition.slug },
      data: {
        assessmentRequirements: {
          connect: curriculumAssessments
            .filter((assessment) => definition.moduleSlugs.includes(assessment.moduleSlug))
            .map((assessment) => ({ slug: assessment.slug }))
        }
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

  for (const outcome of learningOutcomes) {
    const academy = outcome.academySlug ? await prisma.academy.findUnique({ where: { slug: outcome.academySlug } }) : null;
    const curriculumModuleRecord = outcome.moduleSlug ? await prisma.module.findUnique({ where: { slug: outcome.moduleSlug } }) : null;
    const lesson = outcome.lessonSlug ? await prisma.lesson.findUnique({ where: { slug: outcome.lessonSlug } }) : null;
    await prisma.learningOutcome.create({
      data: {
        text: outcome.text,
        outcomeType: outcome.outcomeType,
        measurableVerb: outcome.measurableVerb,
        academyId: academy?.id,
        moduleId: curriculumModuleRecord?.id,
        lessonId: lesson?.id
      }
    });
  }

  for (const exercise of practicalExercises) {
    const curriculumModuleRecord = await prisma.module.findUniqueOrThrow({ where: { slug: exercise.moduleSlug } });
    const lesson = exercise.lessonSlug ? await prisma.lesson.findUnique({ where: { slug: exercise.lessonSlug } }) : null;
    await prisma.practicalExercise.create({
      data: {
        moduleId: curriculumModuleRecord.id,
        lessonId: lesson?.id,
        title: exercise.title,
        setup: exercise.setup,
        task: exercise.task,
        expectedResult: exercise.expectedResult,
        evidenceRequired: exercise.evidenceRequired,
        safetyConstraints: exercise.safetyConstraints
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

  for (const rule of progressionRules) {
    const fromAcademy = rule.fromAcademySlug ? await prisma.academy.findUnique({ where: { slug: rule.fromAcademySlug } }) : null;
    const toAcademy = rule.toAcademySlug ? await prisma.academy.findUnique({ where: { slug: rule.toAcademySlug } }) : null;
    const fromCertification = rule.fromCertificationSlug ? await prisma.certificationDefinition.findUnique({ where: { slug: rule.fromCertificationSlug } }) : null;
    const toCertification = rule.toCertificationSlug ? await prisma.certificationDefinition.findUnique({ where: { slug: rule.toCertificationSlug } }) : null;
    await prisma.progressionRule.create({
      data: {
        fromAcademyId: fromAcademy?.id,
        toAcademyId: toAcademy?.id,
        fromCertificationId: fromCertification?.id,
        toCertificationId: toCertification?.id,
        ruleType: rule.ruleType,
        requirement: rule.requirement
      }
    });
  }

  for (const experience of serviceExperiences) {
    const trainee = await prisma.user.findUniqueOrThrow({ where: { email: experience.traineeEmail } });
    const mentor = experience.mentorEmail ? await prisma.user.findUnique({ where: { email: experience.mentorEmail } }) : null;
    await prisma.serviceExperience.create({
      data: {
        traineeId: trainee.id,
        serviceDate: new Date(experience.serviceDate),
        serviceType: experience.serviceType,
        roleServed: experience.roleServed,
        mentorId: mentor?.id,
        observationNotes: experience.observationNotes,
        approvedForCertification: experience.approvedForCertification
      }
    });
  }

  for (const evidence of evidenceRecords) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email: evidence.userEmail } });
    const competency = evidence.competencySlug ? await prisma.competency.findUnique({ where: { slug: evidence.competencySlug } }) : null;
    const assessment = evidence.assessmentSlug ? await prisma.curriculumAssessment.findUnique({ where: { slug: evidence.assessmentSlug } }) : null;
    await prisma.evidence.create({
      data: {
        userId: user.id,
        type: evidenceTypeMap[evidence.type] as never,
        title: evidence.title,
        description: evidence.description,
        relatedEntityType: evidence.relatedEntityType,
        relatedEntityId: evidence.relatedEntityId,
        competencyId: competency?.id,
        assessmentId: assessment?.id,
        status: evidenceStatusMap[evidence.status] as never
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());
