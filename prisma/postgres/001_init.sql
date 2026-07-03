-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('TRAINEE', 'SOUND_OPERATOR', 'ENGINEER', 'SENIOR_ENGINEER', 'TECHNICAL_DIRECTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "CurriculumLevel" AS ENUM ('FOUNDATIONS', 'OPERATOR', 'ENGINEER', 'SENIOR_ENGINEER', 'TECHNICAL_DIRECTOR');

-- CreateEnum
CREATE TYPE "LessonDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('ASSIGNED', 'IN_PROGRESS', 'NEEDS_MENTOR_REVIEW', 'APPROVED', 'RETRY_REQUIRED');

-- CreateEnum
CREATE TYPE "EquipmentCategory" AS ENUM ('MIXER', 'STAGE_BOX', 'MICROPHONE', 'WIRELESS_SYSTEM', 'SPEAKER', 'MONITOR', 'P16_SYSTEM', 'DANTE_DEVICE', 'COMPUTER', 'SOFTWARE', 'NETWORK_SWITCH', 'CABLE', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "VisualCategory" AS ENUM ('EQUIPMENT_PHOTO', 'CONSOLE_SCREENSHOT', 'SOFTWARE_SCREENSHOT', 'PLUGIN_EXAMPLE', 'SIGNAL_DIAGRAM', 'TRAINING_EXAMPLE');

-- CreateEnum
CREATE TYPE "VisualRights" AS ENUM ('OFFICIAL_VENDOR_REFERENCE', 'CHURCH_OWNED_REQUIRED', 'CREATE_ORIGINAL_DIAGRAM', 'PERMISSION_REQUIRED');

-- CreateEnum
CREATE TYPE "AudioExampleCategory" AS ENUM ('GAIN', 'EQ', 'DYNAMICS', 'FEEDBACK', 'LIVESTREAM');

-- CreateEnum
CREATE TYPE "VideoReviewStatus" AS ENUM ('CONFIRMED_SOURCE', 'NEEDS_FINAL_VIDEO_SELECTION');

-- CreateEnum
CREATE TYPE "CurriculumStatus" AS ENUM ('DRAFT', 'ACTIVE', 'RETIRED');

-- CreateEnum
CREATE TYPE "CompetencyCategory" AS ENUM ('KNOWLEDGE', 'PRACTICAL', 'OPERATIONAL', 'TROUBLESHOOTING', 'COMMUNICATION', 'LEADERSHIP');

-- CreateEnum
CREATE TYPE "SkillDomain" AS ENUM ('X32', 'DANTE', 'LOGIC', 'WAVES', 'WIRELESS', 'P16', 'FOH', 'LIVESTREAM', 'TROUBLESHOOTING', 'LEADERSHIP');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('CONCEPT', 'WALKTHROUGH', 'SIMULATOR', 'LISTENING_DRILL', 'SERVICE_DRILL', 'SCENARIO', 'MENTOR_ASSESSMENT');

-- CreateEnum
CREATE TYPE "CurriculumAssessmentType" AS ENUM ('KNOWLEDGE', 'PRACTICAL', 'SCENARIO', 'SERVICE', 'MENTOR', 'CERTIFICATION');

-- CreateEnum
CREATE TYPE "EvidenceType" AS ENUM ('QUIZ', 'SOUND_LAB', 'PRACTICAL', 'SERVICE_OBSERVATION', 'MENTOR_NOTE', 'MEDIA_UPLOAD');

-- CreateEnum
CREATE TYPE "EvidenceStatus" AS ENUM ('SUBMITTED', 'NEEDS_REVIEW', 'APPROVED', 'REVISION_REQUESTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReviewDecision" AS ENUM ('APPROVED', 'REVISION_REQUESTED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'TRAINEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" "UserRole" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "academyId" TEXT,
    "level" "CurriculumLevel" NOT NULL,
    "summary" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "objectives" TEXT NOT NULL,
    "prerequisites" TEXT,
    "certification" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "difficulty" "LessonDifficulty" NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "moduleId" TEXT NOT NULL,
    "beginnerExplanation" TEXT NOT NULL,
    "intermediateExplanation" TEXT NOT NULL,
    "advancedExplanation" TEXT NOT NULL,
    "practicalExercise" TEXT NOT NULL,
    "activeRecallPrompt" TEXT NOT NULL,
    "spacedRepetitionPrompt" TEXT NOT NULL,
    "mentorSignoffCriteria" TEXT NOT NULL,
    "lessonType" "LessonType" DEFAULT 'CONCEPT',
    "ministryContext" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Academy" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "ownerRole" "UserRole" NOT NULL,
    "order" INTEGER NOT NULL,
    "activeVersion" TEXT NOT NULL DEFAULT '1.0',
    "status" "CurriculumStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Academy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationDefinition" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "academyId" TEXT NOT NULL,
    "level" "CurriculumLevel" NOT NULL,
    "title" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "renewalMonths" INTEGER NOT NULL,
    "requiredServiceObservations" INTEGER NOT NULL,
    "status" "CurriculumStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "CertificationDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competency" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "CompetencyCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "level" "CurriculumLevel" NOT NULL,

    CONSTRAINT "Competency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "domain" "SkillDomain" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillTree" (
    "id" TEXT NOT NULL,
    "academyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',

    CONSTRAINT "SkillTree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillTreeNode" (
    "id" TEXT NOT NULL,
    "skillTreeId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "parentNodeId" TEXT,
    "unlockRule" TEXT NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,

    CONSTRAINT "SkillTreeNode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonStep" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "interfaceType" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "expectedObservation" TEXT NOT NULL,
    "whyItMatters" TEXT NOT NULL,
    "safetyNote" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "LessonStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningOutcome" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "outcomeType" TEXT NOT NULL,
    "measurableVerb" TEXT NOT NULL,
    "academyId" TEXT,
    "moduleId" TEXT,
    "lessonId" TEXT,

    CONSTRAINT "LearningOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticalExercise" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT,
    "lessonId" TEXT,
    "title" TEXT NOT NULL,
    "setup" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "expectedResult" TEXT NOT NULL,
    "evidenceRequired" TEXT NOT NULL,
    "safetyConstraints" TEXT NOT NULL,

    CONSTRAINT "PracticalExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurriculumAssessment" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "moduleId" TEXT,
    "type" "CurriculumAssessmentType" NOT NULL,
    "title" TEXT NOT NULL,
    "rubric" TEXT NOT NULL,
    "passCriteria" TEXT NOT NULL,
    "retryCriteria" TEXT NOT NULL,
    "mentorRoleRequired" "UserRole" NOT NULL,

    CONSTRAINT "CurriculumAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorSignOff" (
    "id" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "status" "AttemptStatus" NOT NULL DEFAULT 'NEEDS_MENTOR_REVIEW',
    "observedAt" TIMESTAMP(3),
    "serviceContext" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "nextStep" TEXT NOT NULL,

    CONSTRAINT "MentorSignOff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceExperience" (
    "id" TEXT NOT NULL,
    "traineeId" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "serviceType" TEXT NOT NULL,
    "roleServed" TEXT NOT NULL,
    "mentorId" TEXT,
    "observationNotes" TEXT NOT NULL,
    "approvedForCertification" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ServiceExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressionRule" (
    "id" TEXT NOT NULL,
    "fromAcademyId" TEXT,
    "toAcademyId" TEXT,
    "fromCertificationId" TEXT,
    "toCertificationId" TEXT,
    "ruleType" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ProgressionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "EvidenceType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assetUrl" TEXT,
    "relatedEntityType" TEXT NOT NULL,
    "relatedEntityId" TEXT NOT NULL,
    "competencyId" TEXT,
    "assessmentId" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "EvidenceStatus" NOT NULL DEFAULT 'SUBMITTED',

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceReview" (
    "id" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "decision" "ReviewDecision" NOT NULL,
    "notes" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvidenceReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonContent" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "sort" INTEGER NOT NULL,

    CONSTRAINT "LessonContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "passScore" INTEGER NOT NULL,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "rationale" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "evidence" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PracticalAssessment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rubric" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "PracticalAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentAttempt" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "AttemptStatus" NOT NULL DEFAULT 'ASSIGNED',
    "mentorName" TEXT,
    "evidence" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" "CurriculumLevel" NOT NULL,
    "modulesCompleted" INTEGER NOT NULL,
    "quizAverage" INTEGER NOT NULL,
    "practicalSignoffs" INTEGER NOT NULL,
    "serviceObservations" INTEGER NOT NULL,
    "status" "AttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "renewalDue" TIMESTAMP(3),
    "seniorNotes" TEXT,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "EquipmentCategory" NOT NULL,
    "model" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "inputs" TEXT NOT NULL,
    "outputs" TEXT NOT NULL,
    "connectedDevices" TEXT NOT NULL,
    "commonIssues" TEXT NOT NULL,
    "sopLinks" TEXT NOT NULL,
    "photoPlaceholder" TEXT,
    "notes" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisualAsset" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "VisualCategory" NOT NULL,
    "trainingUse" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "rights" "VisualRights" NOT NULL,
    "linkedTopics" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisualAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonGuide" (
    "id" TEXT NOT NULL,
    "lessonSlug" TEXT NOT NULL,
    "coreIdea" TEXT NOT NULL,
    "boardChecks" TEXT NOT NULL,
    "listeningTargets" TEXT NOT NULL,
    "commonMistakes" TEXT NOT NULL,
    "mentorPrompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioExample" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "AudioExampleCategory" NOT NULL,
    "whatYouHear" TEXT NOT NULL,
    "boardSymptoms" TEXT NOT NULL,
    "checks" TEXT NOT NULL,
    "linkedLessons" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudioExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingVideo" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "durationTarget" TEXT NOT NULL,
    "whyUse" TEXT NOT NULL,
    "linkedLessons" TEXT NOT NULL,
    "reviewStatus" "VideoReviewStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SOP" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "steps" TEXT NOT NULL,
    "ownerRole" "UserRole" NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SOP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TroubleshootingFlow" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "symptom" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "TroubleshootingFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TroubleshootingStep" (
    "id" TEXT NOT NULL,
    "flowId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "helpText" TEXT NOT NULL,
    "yesNextKey" TEXT,
    "noNextKey" TEXT,
    "resolution" TEXT,
    "sort" INTEGER NOT NULL,

    CONSTRAINT "TroubleshootingStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignalPath" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "SignalPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceChecklist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "steps" TEXT NOT NULL,
    "ownerRole" "UserRole" NOT NULL,

    CONSTRAINT "ServiceChecklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceLog" (
    "id" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "serviceType" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "ServiceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resolution" TEXT,
    "reporterId" TEXT NOT NULL,
    "serviceLogId" TEXT,
    "flowId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchSpecificNote" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT,
    "lessonId" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChurchSpecificNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AcademyCompetencies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AcademyCompetencies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CertificationCompetencies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CertificationCompetencies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CertificationModules" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CertificationModules_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CertificationAssessments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CertificationAssessments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ModuleCompetencies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ModuleCompetencies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_SkillCompetencies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SkillCompetencies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AssessmentCompetencies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AssessmentCompetencies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Module_slug_key" ON "Module"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_slug_key" ON "Lesson"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Academy_slug_key" ON "Academy"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CertificationDefinition_slug_key" ON "CertificationDefinition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Competency_slug_key" ON "Competency"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_slug_key" ON "Skill"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumAssessment_slug_key" ON "CurriculumAssessment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_slug_key" ON "Equipment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VisualAsset_slug_key" ON "VisualAsset"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LessonGuide_lessonSlug_key" ON "LessonGuide"("lessonSlug");

-- CreateIndex
CREATE UNIQUE INDEX "AudioExample_slug_key" ON "AudioExample"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingVideo_slug_key" ON "TrainingVideo"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SOP_slug_key" ON "SOP"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TroubleshootingFlow_slug_key" ON "TroubleshootingFlow"("slug");

-- CreateIndex
CREATE INDEX "_AcademyCompetencies_B_index" ON "_AcademyCompetencies"("B");

-- CreateIndex
CREATE INDEX "_CertificationCompetencies_B_index" ON "_CertificationCompetencies"("B");

-- CreateIndex
CREATE INDEX "_CertificationModules_B_index" ON "_CertificationModules"("B");

-- CreateIndex
CREATE INDEX "_CertificationAssessments_B_index" ON "_CertificationAssessments"("B");

-- CreateIndex
CREATE INDEX "_ModuleCompetencies_B_index" ON "_ModuleCompetencies"("B");

-- CreateIndex
CREATE INDEX "_SkillCompetencies_B_index" ON "_SkillCompetencies"("B");

-- CreateIndex
CREATE INDEX "_AssessmentCompetencies_B_index" ON "_AssessmentCompetencies"("B");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "Academy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationDefinition" ADD CONSTRAINT "CertificationDefinition_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "Academy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTree" ADD CONSTRAINT "SkillTree_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "Academy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTreeNode" ADD CONSTRAINT "SkillTreeNode_skillTreeId_fkey" FOREIGN KEY ("skillTreeId") REFERENCES "SkillTree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTreeNode" ADD CONSTRAINT "SkillTreeNode_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTreeNode" ADD CONSTRAINT "SkillTreeNode_parentNodeId_fkey" FOREIGN KEY ("parentNodeId") REFERENCES "SkillTreeNode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonStep" ADD CONSTRAINT "LessonStep_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningOutcome" ADD CONSTRAINT "LearningOutcome_academyId_fkey" FOREIGN KEY ("academyId") REFERENCES "Academy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningOutcome" ADD CONSTRAINT "LearningOutcome_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningOutcome" ADD CONSTRAINT "LearningOutcome_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticalExercise" ADD CONSTRAINT "PracticalExercise_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticalExercise" ADD CONSTRAINT "PracticalExercise_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurriculumAssessment" ADD CONSTRAINT "CurriculumAssessment_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorSignOff" ADD CONSTRAINT "MentorSignOff_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorSignOff" ADD CONSTRAINT "MentorSignOff_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorSignOff" ADD CONSTRAINT "MentorSignOff_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "CurriculumAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceExperience" ADD CONSTRAINT "ServiceExperience_traineeId_fkey" FOREIGN KEY ("traineeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceExperience" ADD CONSTRAINT "ServiceExperience_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressionRule" ADD CONSTRAINT "ProgressionRule_fromAcademyId_fkey" FOREIGN KEY ("fromAcademyId") REFERENCES "Academy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressionRule" ADD CONSTRAINT "ProgressionRule_toAcademyId_fkey" FOREIGN KEY ("toAcademyId") REFERENCES "Academy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressionRule" ADD CONSTRAINT "ProgressionRule_fromCertificationId_fkey" FOREIGN KEY ("fromCertificationId") REFERENCES "CertificationDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressionRule" ADD CONSTRAINT "ProgressionRule_toCertificationId_fkey" FOREIGN KEY ("toCertificationId") REFERENCES "CertificationDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_competencyId_fkey" FOREIGN KEY ("competencyId") REFERENCES "Competency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "CurriculumAssessment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceReview" ADD CONSTRAINT "EvidenceReview_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "Evidence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceReview" ADD CONSTRAINT "EvidenceReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonContent" ADD CONSTRAINT "LessonContent_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticalAssessment" ADD CONSTRAINT "PracticalAssessment_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "PracticalAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TroubleshootingStep" ADD CONSTRAINT "TroubleshootingStep_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "TroubleshootingFlow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceLog" ADD CONSTRAINT "ServiceLog_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_serviceLogId_fkey" FOREIGN KEY ("serviceLogId") REFERENCES "ServiceLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "TroubleshootingFlow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpecificNote" ADD CONSTRAINT "ChurchSpecificNote_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchSpecificNote" ADD CONSTRAINT "ChurchSpecificNote_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcademyCompetencies" ADD CONSTRAINT "_AcademyCompetencies_A_fkey" FOREIGN KEY ("A") REFERENCES "Academy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcademyCompetencies" ADD CONSTRAINT "_AcademyCompetencies_B_fkey" FOREIGN KEY ("B") REFERENCES "Competency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationCompetencies" ADD CONSTRAINT "_CertificationCompetencies_A_fkey" FOREIGN KEY ("A") REFERENCES "CertificationDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationCompetencies" ADD CONSTRAINT "_CertificationCompetencies_B_fkey" FOREIGN KEY ("B") REFERENCES "Competency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationModules" ADD CONSTRAINT "_CertificationModules_A_fkey" FOREIGN KEY ("A") REFERENCES "CertificationDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationModules" ADD CONSTRAINT "_CertificationModules_B_fkey" FOREIGN KEY ("B") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationAssessments" ADD CONSTRAINT "_CertificationAssessments_A_fkey" FOREIGN KEY ("A") REFERENCES "CertificationDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationAssessments" ADD CONSTRAINT "_CertificationAssessments_B_fkey" FOREIGN KEY ("B") REFERENCES "CurriculumAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleCompetencies" ADD CONSTRAINT "_ModuleCompetencies_A_fkey" FOREIGN KEY ("A") REFERENCES "Competency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleCompetencies" ADD CONSTRAINT "_ModuleCompetencies_B_fkey" FOREIGN KEY ("B") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillCompetencies" ADD CONSTRAINT "_SkillCompetencies_A_fkey" FOREIGN KEY ("A") REFERENCES "Competency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillCompetencies" ADD CONSTRAINT "_SkillCompetencies_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssessmentCompetencies" ADD CONSTRAINT "_AssessmentCompetencies_A_fkey" FOREIGN KEY ("A") REFERENCES "Competency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssessmentCompetencies" ADD CONSTRAINT "_AssessmentCompetencies_B_fkey" FOREIGN KEY ("B") REFERENCES "CurriculumAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

