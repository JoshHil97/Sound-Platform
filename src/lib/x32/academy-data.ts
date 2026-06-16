export type X32Accent = "purple" | "cyan" | "green" | "amber" | "orange" | "violet" | "blue" | "red";

export type X32LessonStatus = "placeholder" | "future" | "available";

export type X32Lesson = {
  id: string;
  order: number;
  title: string;
  difficulty: string;
  estimatedTime: string;
  status: X32LessonStatus;
  description: string;
  shortCardDescription: string;
  learningObjectives: string[];
  churchExamples: string[];
  relatedHotspots: string[];
  relatedSystems: string[];
  prerequisites: string[];
  nextLessons: string[];
  sectionId: string;
  panelCopy?: {
    whyItMatters: string;
    commonConfusion: string;
    churchApplication: string;
  };
};

export type X32AcademySection = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accent: X32Accent;
  lessons: X32Lesson[];
};

export const x32ConsoleMetadata = {
  title: "Interactive VBCI X32 Console",
  description: "Explore the real church mixing desk, signal groups and service workflow.",
  hardware: "Behringer X32",
  environment: "Church worship services",
  audioNetwork: "Dante",
  livestream: "Logic Pro",
  mode: "Training Mode",
  operatorLevel: "Operator Level 2",
  overviewStats: [
    {
      label: "Input Channels",
      value: "32",
      description: "Band, vocals, leadership mics and technical inputs.",
      accent: "purple" as X32Accent
    },
    {
      label: "DCA Groups",
      value: "8",
      description: "Control groups for vocals, Bishop mics, keys, band, bass, drums and guitar.",
      accent: "amber" as X32Accent
    },
    {
      label: "Buses",
      value: "16",
      description: "Monitor mixes, P16 feeds and FX sends. Bus 5/6 are not confirmed as primary livestream routing.",
      accent: "green" as X32Accent
    },
    {
      label: "Matrices",
      value: "5",
      description: "Side Fill, Overflow, Victoryland and scene-reference livestream matrices.",
      accent: "orange" as X32Accent
    },
    {
      label: "FX Returns",
      value: "3",
      description: "Drum Verb, Vocal Reverb and Vocal Delay references.",
      accent: "violet" as X32Accent
    }
  ],
  quickFacts: [
    { label: "Primary Console", value: "Behringer X32" },
    { label: "Audio Network", value: "Dante" },
    { label: "Livestream", value: "Logic Pro" },
    { label: "Environment", value: "Church worship services" }
  ],
  accuracyNotes: [
    "Inputs 1-16 are taught as Band / Instruments in the training model.",
    "Stage Monitor A and Stage Monitor B connect through Stage Box A.",
    "X32 Rack sits behind Bishop with wireless receivers nearby.",
    "Inputs 1-32 feed Dante and Logic Pro for livestream mixing."
  ]
};

export const x32ChurchSetupGroups = [
  {
    title: "FOH Systems",
    accent: "cyan" as X32Accent,
    systems: [
      {
        id: "x32-console",
        name: "Behringer X32 Console",
        location: "Main sound position",
        purpose: "Primary audio control surface for services.",
        criticality: "Critical",
        dependencies: ["Stage Box A", "X32 Rack"],
        failureImpact: "Loss of FOH control, monitor control and livestream source routing."
      },
      {
        id: "foh-system",
        name: "FOH Speaker System",
        location: "Front half of auditorium",
        purpose: "Main congregation reinforcement.",
        criticality: "Critical",
        dependencies: ["Main LR", "Subwoofer"],
        failureImpact: "Congregation cannot hear service."
      },
      {
        id: "subwoofer",
        name: "Subwoofer",
        location: "FOH speaker chain",
        purpose: "Low frequency support before FOH speakers.",
        criticality: "High",
        dependencies: ["Main LR"],
        failureImpact: "Weak or missing low end in the room."
      },
      {
        id: "side-fill",
        name: "Side Fill",
        location: "Front auditorium coverage",
        purpose: "FOH coverage zone fed from Matrix 2.",
        criticality: "Medium",
        dependencies: ["Matrix 2"],
        failureImpact: "Uneven front-room coverage."
      }
    ]
  },
  {
    title: "Stage Systems",
    accent: "green" as X32Accent,
    systems: [
      {
        id: "stage-box-a",
        name: "Stage Box A",
        location: "Near instruments",
        purpose: "Primary stage I/O and monitor outputs.",
        criticality: "High",
        dependencies: ["X32 Console"],
        failureImpact: "Loss of stage inputs or monitor outputs."
      },
      {
        id: "x32-rack",
        name: "X32 Rack",
        location: "Behind Bishop",
        purpose: "Additional local inputs and wireless receiver area.",
        criticality: "High",
        dependencies: ["X32 Console"],
        failureImpact: "Speech microphone or wireless signal routing issues."
      },
      {
        id: "stage-monitor-a",
        name: "Stage Monitor A",
        location: "Stage",
        purpose: "Performer foldback from Bus 1.",
        criticality: "Medium",
        dependencies: ["Bus 1", "Stage Box A"],
        failureImpact: "Left monitor position loses foldback."
      },
      {
        id: "stage-monitor-b",
        name: "Stage Monitor B",
        location: "Stage",
        purpose: "Performer foldback from Bus 2.",
        criticality: "Medium",
        dependencies: ["Bus 2", "Stage Box A"],
        failureImpact: "Right monitor position loses foldback."
      }
    ]
  },
  {
    title: "Livestream Systems",
    accent: "blue" as X32Accent,
    systems: [
      {
        id: "dante-network",
        name: "Dante Network",
        location: "X32 Dante card to livestream position",
        purpose: "Sends X32 Inputs 1-32 to Logic Pro.",
        criticality: "Critical",
        dependencies: ["X32 Console", "Dante Card"],
        failureImpact: "Logic loses discrete input channels."
      },
      {
        id: "logic-pro",
        name: "Logic Pro",
        location: "Livestream position",
        purpose: "Creates the broadcast mix from Dante inputs.",
        criticality: "Critical",
        dependencies: ["Dante Network"],
        failureImpact: "Broadcast mix unavailable."
      },
      {
        id: "livestream-platforms",
        name: "Livestream Platforms",
        location: "Online broadcast chain",
        purpose: "Receives the Logic Pro broadcast mix.",
        criticality: "High",
        dependencies: ["Logic Pro"],
        failureImpact: "Online service receives no usable audio."
      }
    ]
  },
  {
    title: "Monitoring Systems",
    accent: "violet" as X32Accent,
    systems: [
      {
        id: "p16-system",
        name: "P16 Personal Monitoring",
        location: "Stage musician monitoring",
        purpose: "Personal monitor feeds from confirmed P16 buses.",
        criticality: "Medium",
        dependencies: ["X32 Console", "Bus 4", "Bus 7-12"],
        failureImpact: "Performers lose personal monitor control."
      },
      {
        id: "talkback-system",
        name: "Talkback System",
        location: "Sound position to P16 users",
        purpose: "CH32 communication into monitor users.",
        criticality: "Low",
        dependencies: ["CH32", "P16 System"],
        failureImpact: "Operators cannot easily communicate with stage."
      }
    ]
  },
  {
    title: "Room Feeds",
    accent: "orange" as X32Accent,
    systems: [
      {
        id: "overflow",
        name: "Overflow",
        location: "Overflow room",
        purpose: "Room feed from Matrix 3.",
        criticality: "Medium",
        dependencies: ["Matrix 3"],
        failureImpact: "Overflow room loses service audio."
      },
      {
        id: "victoryland",
        name: "Victoryland",
        location: "Victoryland area",
        purpose: "Room feed from Matrix 4.",
        criticality: "Medium",
        dependencies: ["Matrix 4"],
        failureImpact: "Victoryland loses service audio."
      }
    ]
  }
];

const consoleBasicsLessons: X32Lesson[] = [
  {
    id: "understanding-the-console",
    order: 1,
    title: "Understanding the Console",
    difficulty: "Beginner",
    estimatedTime: "10-15 min",
    status: "placeholder",
    description: "Overview of the X32 console, its layout and main sections.",
    shortCardDescription: "Learn what the X32 is, what it controls and how the surface is organised.",
    learningObjectives: ["Understand the role of the X32 in a church service", "Identify the main physical areas of the console", "Understand the difference between input channels, outputs and control sections"],
    churchExamples: ["Main VBCI X32 console", "Main LR output", "Screen area", "Channel bank"],
    relatedHotspots: ["screen-main", "main-lr"],
    relatedSystems: ["x32-console", "foh-system"],
    prerequisites: [],
    nextLessons: ["understanding-channels"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "A volunteer needs to understand the layout before learning individual features.",
      commonConfusion: "New users often mistake DCAs, buses and channels as the same thing.",
      churchApplication: "This lesson helps new VBCI team members understand what the console controls before a service starts."
    }
  },
  {
    id: "understanding-channels",
    order: 2,
    title: "Understanding Channels",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    status: "placeholder",
    description: "What a channel is and how inputs are organised at VBCI.",
    shortCardDescription: "Learn what a channel is and how voices and instruments enter the desk.",
    learningObjectives: ["Define what an input channel is", "Understand how a microphone or instrument becomes a console channel", "Recognise the VBCI channel groups"],
    churchExamples: ["CH8 BASS", "CH16 OH R", "CH24 LV S2", "CH25 LV S1", "CH26 BishopHH"],
    relatedHotspots: ["ch-01", "ch-08", "ch-16", "ch-24", "ch-25", "ch-26"],
    relatedSystems: ["x32-console", "x32-rack", "stage-box-a"],
    prerequisites: ["understanding-the-console"],
    nextLessons: ["gain-staging-fundamentals"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "Almost every mix decision starts with understanding the channel you are controlling.",
      commonConfusion: "A channel is not the same as a speaker output or monitor mix.",
      churchApplication: "VBCI uses channels for band, vocals, speech microphones and technical inputs."
    }
  },
  {
    id: "gain-staging-fundamentals",
    order: 3,
    title: "Gain Staging Fundamentals",
    difficulty: "Beginner",
    estimatedTime: "20 min",
    status: "placeholder",
    description: "Set clean gain, avoid clipping and get the best signal.",
    shortCardDescription: "Learn how to set clean input level before mixing.",
    learningObjectives: ["Understand what gain is", "Understand why gain is different from channel fader level", "Recognise clipping and distortion"],
    churchExamples: ["BishopHH", "LV S1", "BASS", "Kick"],
    relatedHotspots: ["ch-08", "ch-09", "ch-24", "ch-25", "ch-26"],
    relatedSystems: ["x32-console", "wireless-receivers", "x32-rack"],
    prerequisites: ["understanding-channels"],
    nextLessons: ["understanding-dca-groups"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "Poor gain staging causes distortion, noise, weak livestream audio and inconsistent FOH levels.",
      commonConfusion: "Turning up a fader is not the same as setting proper input gain.",
      churchApplication: "Speech mics, vocals and drums all need clean gain before service starts."
    }
  },
  {
    id: "understanding-dca-groups",
    order: 4,
    title: "Understanding DCA Groups",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    status: "placeholder",
    description: "Control multiple channels with a single fader.",
    shortCardDescription: "Learn how DCAs control groups without routing audio.",
    learningObjectives: ["Understand what a DCA group does", "Understand why DCAs are useful during live service", "Know the difference between a DCA and a bus"],
    churchExamples: ["DCA 1 BVS", "DCA 2 LVS", "DCA 3 Bishop Mics", "DCA 5 Band"],
    relatedHotspots: ["dca-01", "dca-02", "dca-03", "dca-04", "dca-05"],
    relatedSystems: ["x32-console"],
    prerequisites: ["understanding-channels"],
    nextLessons: ["understanding-buses"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "DCAs let operators move groups quickly during service without touching every channel.",
      commonConfusion: "A DCA does not carry audio. It controls channel levels assigned to it.",
      churchApplication: "Bishop mics, drums, band and vocals can be managed quickly with DCAs."
    }
  },
  {
    id: "understanding-buses",
    order: 5,
    title: "Understanding Buses",
    difficulty: "Intermediate",
    estimatedTime: "20 min",
    status: "placeholder",
    description: "Create monitor mixes, sends and subgroup outputs.",
    shortCardDescription: "Learn how audio is sent to monitors, P16 and FX.",
    learningObjectives: ["Understand what a bus is", "Understand how buses differ from DCAs", "Understand monitor mixes"],
    churchExamples: ["Bus 1 Stage Monitor L", "Bus 2 Stage Monitor R", "Bus 4 LVS P16", "Bus 7 Bishop P16"],
    relatedHotspots: ["bus-01", "bus-02", "bus-04", "bus-07", "bus-08"],
    relatedSystems: ["stage-monitor-a", "stage-monitor-b", "p16-system", "talkback-system"],
    prerequisites: ["understanding-dca-groups"],
    nextLessons: ["understanding-matrices"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "Buses explain why FOH can sound fine while a monitor or P16 mix has a problem.",
      commonConfusion: "A bus is an audio path, while a DCA is a control group.",
      churchApplication: "Stage monitors and P16 mixes depend on bus sends."
    }
  },
  {
    id: "understanding-matrices",
    order: 6,
    title: "Understanding Matrices",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
    status: "placeholder",
    description: "Send audio to multiple destinations at once.",
    shortCardDescription: "Learn how room zones like Side Fill and Overflow receive audio.",
    learningObjectives: ["Understand what a matrix is", "Understand why separate zones need their own feeds", "Understand the difference between Main LR and matrix outputs"],
    churchExamples: ["Matrix 2 Side Fill", "Matrix 3 Overflow", "Matrix 4 Victoryland"],
    relatedHotspots: ["matrix-02", "matrix-03", "matrix-04", "matrix-05", "matrix-06"],
    relatedSystems: ["side-fill", "overflow", "victoryland", "foh-system"],
    prerequisites: ["understanding-buses"],
    nextLessons: ["understanding-fx"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "Matrices explain how different rooms and speaker zones receive their own feeds.",
      commonConfusion: "A matrix is not the same as a normal input channel or DCA.",
      churchApplication: "Side Fill, Overflow and Victoryland are all taught through matrix concepts."
    }
  },
  {
    id: "understanding-fx",
    order: 7,
    title: "Understanding FX",
    difficulty: "Intermediate",
    estimatedTime: "20 min",
    status: "placeholder",
    description: "Reverb, delay and effects sends explained.",
    shortCardDescription: "Learn how vocal reverb, vocal delay and drum verb work.",
    learningObjectives: ["Understand what reverb does", "Understand what delay does", "Understand FX sends and FX returns"],
    churchExamples: ["FX 13 Drum Verb", "FX 15 Vocal Reverb", "FX 16 Vocal Delay"],
    relatedHotspots: ["fx-13", "fx-15", "fx-16", "bus-13", "bus-15"],
    relatedSystems: ["x32-console"],
    prerequisites: ["understanding-buses"],
    nextLessons: ["monitor-mixing"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "FX shape the feel of vocals and drums, especially in worship moments.",
      commonConfusion: "The send level and return level are different controls.",
      churchApplication: "Vocal reverb and delay should support worship without making words unclear."
    }
  },
  {
    id: "monitor-mixing",
    order: 8,
    title: "Monitor Mixing",
    difficulty: "Intermediate",
    estimatedTime: "25 min",
    status: "placeholder",
    description: "Build useful monitor mixes for musicians and singers.",
    shortCardDescription: "Learn how performers hear themselves on stage.",
    learningObjectives: ["Understand why monitor mixes are different from FOH", "Understand what singers and musicians usually need", "Understand how buses feed stage monitors"],
    churchExamples: ["Stage Monitor A", "Stage Monitor B", "P16 System", "Bus 1"],
    relatedHotspots: ["bus-01", "bus-02", "bus-04", "bus-07", "bus-08"],
    relatedSystems: ["stage-box-a", "stage-monitor-a", "stage-monitor-b", "p16-system", "talkback-system"],
    prerequisites: ["understanding-buses"],
    nextLessons: ["service-mixing-fundamentals"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "Poor monitor mixes affect the confidence and timing of singers and musicians.",
      commonConfusion: "Changing FOH does not always change what someone hears in their monitor.",
      churchApplication: "Stage Monitor A, Stage Monitor B and P16 feeds must be checked before service."
    }
  },
  {
    id: "service-mixing-fundamentals",
    order: 9,
    title: "Service Mixing Fundamentals",
    difficulty: "Intermediate",
    estimatedTime: "30 min",
    status: "placeholder",
    description: "Mix worship, preaching and everything in between.",
    shortCardDescription: "Learn how to balance the service from worship to word.",
    learningObjectives: ["Understand worship mix priorities", "Understand preaching and speech mix priorities", "Balance vocals, band and leadership microphones"],
    churchExamples: ["Worship Team", "BishopHH", "Bishop LP", "Moderator"],
    relatedHotspots: ["ch-08", "ch-09", "ch-16", "ch-24", "ch-25", "ch-26", "dca-03"],
    relatedSystems: ["foh-system", "x32-console", "dante-network", "logic-pro"],
    prerequisites: ["understanding-dca-groups", "understanding-buses"],
    nextLessons: ["church-audio-system-overview"],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "The service mix changes depending on whether the church is in worship, transition or preaching.",
      commonConfusion: "A good music mix is not automatically a good speech mix.",
      churchApplication: "Operators must move between band, vocals and speech without losing clarity."
    }
  },
  {
    id: "church-audio-system-overview",
    order: 10,
    title: "Church Audio System Overview",
    difficulty: "Advanced Beginner",
    estimatedTime: "20 min",
    status: "placeholder",
    description: "Understand how the entire VBCI audio system connects.",
    shortCardDescription: "Learn how the X32 connects to stage, FOH, Dante and livestream.",
    learningObjectives: ["Understand how the X32 connects to Stage Box A", "Understand the X32 Rack behind Bishop", "Understand how Dante sends inputs to Logic Pro"],
    churchExamples: ["Stage Box A", "X32 Rack", "Dante Network", "Logic Pro"],
    relatedHotspots: ["main-lr", "screen-main", "matrix-02", "matrix-03", "matrix-04"],
    relatedSystems: ["stage-box-a", "x32-rack", "dante-network", "logic-pro", "foh-system"],
    prerequisites: ["understanding-matrices"],
    nextLessons: [],
    sectionId: "console-basics",
    panelCopy: {
      whyItMatters: "Troubleshooting becomes much easier when volunteers understand how the system is physically connected.",
      commonConfusion: "FOH, livestream, monitors and room feeds are related but separate paths.",
      churchApplication: "This lesson links the console to the real VBCI production environment."
    }
  }
];

const serviceWorkflowLessons: X32Lesson[] = [
  lessonShell("before-service-checklist", 1, "Before Service Checklist", "Beginner", "15 min", "Prepare the console, stage, microphones and livestream path before service starts.", ["x32-console", "stage-box-a", "x32-rack", "dante-network", "logic-pro"], "service-workflow"),
  lessonShell("sound-check-process", 2, "Sound Check Process", "Beginner", "20 min", "Check channels, monitors, speech mics and livestream inputs.", ["x32-console", "stage-monitor-a", "stage-monitor-b", "logic-pro"], "service-workflow"),
  lessonShell("worship-mixing", 3, "Worship Mixing", "Intermediate", "30 min", "Balance band, vocals and dynamics during worship.", ["x32-console", "foh-system", "dante-network"], "service-workflow", ["dca-01", "dca-02", "dca-05", "dca-07"]),
  lessonShell("preaching-mixing", 4, "Preaching Mixing", "Beginner", "15 min", "Manage Bishop, moderator and speech microphones clearly.", ["x32-console", "x32-rack"], "service-workflow", ["ch-26", "ch-27", "ch-28", "dca-03"]),
  lessonShell("shutdown-procedure", 5, "Shutdown Procedure", "Beginner", "10 min", "Safely close down the production system after service.", ["x32-console", "logic-pro"], "service-workflow")
];

const churchSpecificLessons: X32Lesson[] = [
  lessonShell("vbci-routing-explained", 1, "VBCI Routing Explained", "Intermediate", "25 min", "Understand the real routing approach used at VBCI.", ["x32-console", "stage-box-a", "x32-rack", "foh-system", "dante-network"], "church-specific"),
  lessonShell("stage-box-a", 2, "Stage Box A", "Beginner", "15 min", "Learn what Stage Box A does and how it connects to stage monitors.", ["stage-box-a", "stage-monitor-a", "stage-monitor-b"], "church-specific", ["bus-01", "bus-02"]),
  lessonShell("x32-rack-overview", 3, "X32 Rack Overview", "Beginner", "15 min", "Learn how the X32 Rack behind Bishop supports local inputs and wireless receivers.", ["x32-rack", "wireless-receivers"], "church-specific", ["ch-26", "ch-27", "ch-28"]),
  lessonShell("livestream-path", 4, "Livestream Path", "Intermediate", "25 min", "Understand how Dante feeds Logic Pro for livestream mixing.", ["dante-network", "logic-pro", "livestream-platforms"], "church-specific", ["screen-main"]),
  lessonShell("overflow-and-victoryland", 5, "Overflow & Victoryland", "Intermediate", "15 min", "Understand how room feeds are managed with matrices.", ["overflow", "victoryland"], "church-specific", ["matrix-03", "matrix-04"])
];

function lessonShell(
  id: string,
  order: number,
  title: string,
  difficulty: string,
  estimatedTime: string,
  description: string,
  relatedSystems: string[],
  sectionId: string,
  relatedHotspots: string[] = []
): X32Lesson {
  return {
    id,
    order,
    title,
    difficulty,
    estimatedTime,
    status: "future",
    description,
    shortCardDescription: description,
    learningObjectives: ["Review the VBCI-specific setup", "Connect the topic to Sunday service operation", "Identify the related console or system areas"],
    churchExamples: relatedSystems.map(formatSystemLabel),
    relatedHotspots,
    relatedSystems,
    prerequisites: sectionId === "service-workflow" ? ["understanding-the-console"] : ["church-audio-system-overview"],
    nextLessons: [],
    sectionId
  };
}

export const x32AcademySections: X32AcademySection[] = [
  {
    id: "console-basics",
    title: "Console Basics",
    subtitle: "Learn the fundamental building blocks of the X32",
    description: "Core concepts every new sound team member needs before touching the desk during a service.",
    accent: "purple",
    lessons: consoleBasicsLessons
  },
  {
    id: "service-workflow",
    title: "Service Workflow",
    subtitle: "Learn the VBCI production workflow",
    description: "Placeholder workflow lessons for preparing, checking, running and closing a service.",
    accent: "violet",
    lessons: serviceWorkflowLessons
  },
  {
    id: "church-specific",
    title: "Church Specific",
    subtitle: "Learn the real VBCI setup and routing",
    description: "System-specific shells for VBCI routing, stage infrastructure, livestream and room feeds.",
    accent: "green",
    lessons: churchSpecificLessons
  }
];

export const x32WorkflowCards = [
  {
    id: "before-service",
    title: "Before Service",
    purpose: "Prepare every system before musicians and congregation arrive.",
    estimatedTime: "60-90 min before service",
    checklistPreview: ["Power X32 and rack path", "Check wireless batteries", "Confirm Dante and Logic inputs"],
    relatedSystems: ["X32 Console", "Stage Box A", "X32 Rack", "Dante", "Logic Pro"],
    commonFailures: ["Flat battery", "Disconnected cable", "Muted receiver", "Wrong patch"]
  },
  {
    id: "sound-check",
    title: "Sound Check",
    purpose: "Verify all channels, monitors and livestream paths.",
    estimatedTime: "30-45 min",
    checklistPreview: ["Line check inputs", "Set gain", "Check Monitor A/B", "Verify Logic meters"],
    relatedSystems: ["Channels", "Stage Monitors", "Logic Pro"],
    commonFailures: ["No signal", "Wrong gain", "Monitor issue"]
  },
  {
    id: "during-service",
    title: "During Service",
    purpose: "Deliver a clear FOH and livestream mix.",
    estimatedTime: "Entire service",
    checklistPreview: ["Manage DCAs", "Keep speech clear", "Watch meters"],
    relatedSystems: ["FOH", "DCA Groups", "Dante Network"],
    commonFailures: ["Feedback", "Unbalanced mix", "Speech unintelligible"]
  },
  {
    id: "livestream-monitoring",
    title: "Livestream Monitoring",
    purpose: "Ensure Logic and livestream audio remain healthy.",
    estimatedTime: "Entire service",
    checklistPreview: ["Confirm Dante input health", "Monitor Logic input mapping", "Check timing"],
    relatedSystems: ["Dante Network", "Logic Pro", "Livestream Platforms"],
    commonFailures: ["No Dante signal", "Wrong Logic input", "Timing mismatch"]
  },
  {
    id: "shutdown",
    title: "Shutdown",
    purpose: "Leave the system ready for the next service.",
    estimatedTime: "10-20 min",
    checklistPreview: ["Save required notes", "Power down safely", "Reset obvious service changes"],
    relatedSystems: ["X32 Console", "Logic Pro", "Wireless Systems"],
    commonFailures: ["Scene not saved", "System left running"]
  }
];

export const x32ProgressPlaceholder = {
  title: "X32 Academy Progress",
  completed: 0,
  total: 10,
  currentPath: "Console Basics",
  nextLessonId: "understanding-the-console"
};

export function getX32Lessons() {
  return x32AcademySections.flatMap((section) => section.lessons);
}

export function getX32Lesson(lessonId: string) {
  return getX32Lessons().find((lesson) => lesson.id === lessonId);
}

export function getNextX32Lesson(lesson: X32Lesson) {
  const nextId = lesson.nextLessons[0];
  return nextId ? getX32Lesson(nextId) : undefined;
}

export function formatSystemLabel(id: string) {
  return id
    .split("-")
    .map((part) => (part === "x32" ? "X32" : part === "foh" ? "FOH" : part === "vbci" ? "VBCI" : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}
