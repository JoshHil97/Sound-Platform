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
