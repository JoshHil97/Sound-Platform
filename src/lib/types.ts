export type Role = "Trainee" | "Sound Operator" | "Engineer" | "Senior Engineer" | "Technical Director" | "Admin";
export type Level = "Foundations" | "Operator" | "Engineer" | "Senior Engineer" | "Technical Director";

export type Module = {
  slug: string;
  title: string;
  level: Level;
  summary: string;
  duration: string;
  objectives: string[];
  prerequisites: string[];
  certification: string;
  order: number;
};

export type Lesson = {
  slug: string;
  title: string;
  summary: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  durationMinutes: number;
  moduleSlug: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  practical: string;
  recall: string;
  spaced: string;
  signoff: string;
  troubleshootingLinks: string[];
};

export type LessonGuide = {
  lessonSlug: string;
  coreIdea: string;
  boardChecks: string[];
  listeningTargets: string[];
  commonMistakes: string[];
  mentorPrompt: string;
};

export type QuizQuestion = { prompt: string; options: string[]; answer: string; rationale: string };
export type Quiz = { lessonSlug: string; title: string; passScore: number; questions: QuizQuestion[] };
export type TroubleshootingStep = { key: string; prompt: string; helpText: string; yes?: string; no?: string; resolution?: string };
export type TroubleshootingFlow = { slug: string; title: string; symptom: string; priority: string; steps: TroubleshootingStep[] };
export type SOP = { slug: string; title: string; category: string; purpose: string; ownerRole: Role; steps: string[]; version: number };
export type Equipment = {
  slug: string;
  name: string;
  category: string;
  model: string;
  location: string;
  purpose: string;
  inputs: string;
  outputs: string;
  connectedDevices: string;
  commonIssues: string[];
  sopLinks: string[];
  notes: string;
  lastUpdated: string;
};
export type User = { name: string; email: string; role: Role; currentLevel: Level; progress: number };
export type Certification = {
  userEmail: string;
  level: Level;
  modulesCompleted: number;
  quizAverage: number;
  practicalSignoffs: number;
  serviceObservations: number;
  status: "In Progress" | "Needs Mentor Review" | "Approved" | "Retry Required";
  renewalDue: string;
  seniorNotes: string;
};

export type VisualSource = {
  slug: string;
  title: string;
  category: "Equipment Photo" | "Console Screenshot" | "Software Screenshot" | "Plugin Example" | "Signal Diagram" | "Training Example";
  trainingUse: string;
  sourceName: string;
  sourceUrl: string;
  rights: "Official vendor reference" | "Church-owned required" | "Create original diagram" | "Permission required";
  linkedTopics: string[];
  notes: string;
};

export type AudioExample = {
  slug: string;
  title: string;
  category: "Gain" | "EQ" | "Dynamics" | "Feedback" | "Livestream";
  whatYouHear: string;
  boardSymptoms: string[];
  checks: string[];
  linkedLessons: string[];
};

export type TrainingVideo = {
  slug: string;
  title: string;
  topic: string;
  sourceUrl: string;
  sourceName: string;
  durationTarget: string;
  whyUse: string;
  linkedLessons: string[];
  reviewStatus: "Confirmed source" | "Needs final video selection";
};

export type SystemHealth = {
  name: string;
  status: "Connected" | "Healthy" | "Ready" | "Warning" | "Offline";
  detail: string;
  metric: string;
};

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
  tone: "success" | "warning" | "info";
};

export type RoadmapNode = {
  moduleSlug: string;
  completion: number;
  state: "Complete" | "In Progress" | "Unlocked" | "Locked";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  linkedEquipment: string[];
  serviceSkills: string[];
  nextAction: string;
};

export type ServiceChecklistItem = {
  title: string;
  detail: string;
  area: "Wireless" | "X32" | "Dante" | "Logic" | "P16" | "Stage" | "Talkback" | "Livestream";
  status: "Done" | "Due" | "Check";
};

export type TrainingPanel = {
  title: string;
  summary: string;
  status: "Ready" | "Practice" | "Needs Review";
  checks: string[];
  mistakes: string[];
};

export type CertificationEvidence = {
  title: string;
  type: "Quiz" | "Sound Lab" | "Practical" | "Service Observation" | "Mentor Note";
  status: "Complete" | "Pending" | "Needs Review";
  detail: string;
};

export type Academy = {
  slug: string;
  title: string;
  mission: string;
  ownerRole: Role;
  activeVersion: string;
  order: number;
  moduleSlugs: string[];
};

export type CertificationDefinition = {
  slug: string;
  academySlug: string;
  level: Level;
  title: string;
  mission: string;
  renewalMonths: number;
  requiredServiceObservations: number;
  moduleSlugs: string[];
  competencySlugs: string[];
};

export type CompetencyCategory = "Knowledge" | "Practical" | "Operational" | "Troubleshooting" | "Communication" | "Leadership";

export type Competency = {
  slug: string;
  title: string;
  category: CompetencyCategory;
  description: string;
  level: Level;
  academySlugs: string[];
  moduleSlugs: string[];
  skillSlugs: string[];
};

export type Skill = {
  slug: string;
  title: string;
  domain: "X32" | "Dante" | "Logic" | "Waves" | "Wireless" | "P16" | "FOH" | "Livestream" | "Troubleshooting" | "Leadership";
  description: string;
  competencySlugs: string[];
};

export type SkillTreeNode = {
  skillSlug: string;
  parentSkillSlug?: string;
  unlockRule: string;
  positionX: number;
  positionY: number;
};

export type SkillTree = {
  academySlug: string;
  title: string;
  version: string;
  nodes: SkillTreeNode[];
};

export type CurriculumAssessment = {
  slug: string;
  moduleSlug: string;
  type: "Knowledge" | "Practical" | "Scenario" | "Service" | "Mentor" | "Certification";
  title: string;
  rubric: string;
  passCriteria: string;
  retryCriteria: string;
  mentorRoleRequired: Role;
  competencySlugs: string[];
};

export type PracticalExercise = {
  moduleSlug: string;
  lessonSlug?: string;
  title: string;
  setup: string;
  task: string;
  expectedResult: string;
  evidenceRequired: string;
  safetyConstraints: string;
};

export type LearningOutcome = {
  text: string;
  outcomeType: "Academy" | "Module" | "Lesson";
  measurableVerb: string;
  academySlug?: string;
  moduleSlug?: string;
  lessonSlug?: string;
};

export type ProgressionRule = {
  fromAcademySlug?: string;
  toAcademySlug?: string;
  fromCertificationSlug?: string;
  toCertificationSlug?: string;
  ruleType: string;
  requirement: string;
};

export type ServiceExperienceRecord = {
  traineeEmail: string;
  serviceDate: string;
  serviceType: string;
  roleServed: string;
  mentorEmail?: string;
  observationNotes: string;
  approvedForCertification: boolean;
};

export type EvidenceRecord = {
  userEmail: string;
  type: "Quiz" | "Sound Lab" | "Practical" | "Service Observation" | "Mentor Note" | "Media Upload";
  title: string;
  description: string;
  relatedEntityType: string;
  relatedEntityId: string;
  competencySlug?: string;
  assessmentSlug?: string;
  status: "Submitted" | "Needs Review" | "Approved" | "Revision Requested" | "Rejected";
};
