export type MatterSegment =
  | "love"
  | "building-systems"
  | "leading-extraordinary-teams"
  | "problems"
  | "humans";

export type StoryCard = {
  id: string;
  eyebrow?: string;
  title: string;
  body: string;
  span?: "sm" | "md" | "lg";
};

export type SegmentConfig = {
  label: string;
  text: string;
  tone: string;
  glow: string;
  stories: StoryCard[];
};

export const SEGMENTS: Record<MatterSegment, SegmentConfig> = {
  love: {
    label: "love",
    text: "love",
    tone: "text-rose-600 dark:text-rose-400",
    glow: "[text-shadow:0_0_1px_rgba(225,29,72,0.35),0_0_22px_rgba(225,29,72,0.22)] dark:[text-shadow:0_0_1px_rgba(251,113,133,0.45),0_0_26px_rgba(251,113,133,0.28)]",
    stories: [
      {
        id: "love-1",
        eyebrow: "EveryCure",
        title: "Why care became technical",
        body: "Placeholder — how warmth shows up in roadmaps, trade-offs, and the boring choices that compound.",
        span: "lg",
      },
      {
        id: "love-2",
        title: "Tough calls, made gently",
        body: "Placeholder — running difficult performance conversations without losing trust.",
        span: "md",
      },
      {
        id: "love-3",
        title: "Decisions over slogans",
        body: "Placeholder — translating care into the unglamorous parts of leadership.",
        span: "sm",
      },
      {
        id: "love-4",
        title: "The people I keep choosing",
        body: "Placeholder — the texture of collaborators I gravitate back to, project after project.",
        span: "sm",
      },
    ],
  },
  "building-systems": {
    label: "building systems",
    text: "building systems",
    tone: "text-violet-700 dark:text-violet-400",
    glow: "[text-shadow:0_0_1px_rgba(109,40,217,0.35),0_0_22px_rgba(139,92,246,0.2)] dark:[text-shadow:0_0_1px_rgba(167,139,250,0.45),0_0_26px_rgba(167,139,250,0.26)]",
    stories: [
      {
        id: "bs-1",
        eyebrow: "EveryCure",
        title: "Drug-repurposing pipeline at scale",
        body: "Placeholder — the ML platform that turned exploratory notebooks into a daily-run system.",
        span: "lg",
      },
      {
        id: "bs-2",
        title: "Reliability as a feature",
        body: "Placeholder — making the boring parts boring on purpose.",
        span: "md",
      },
      {
        id: "bs-3",
        title: "Kedro + Spark, in practice",
        body: "Placeholder — the patterns we kept and the ones we threw out.",
        span: "sm",
      },
      {
        id: "bs-4",
        title: "Quiet craftsmanship",
        body: "Placeholder — instrumentation, contracts, and the long view.",
        span: "sm",
      },
    ],
  },
  "leading-extraordinary-teams": {
    label: "leading extraordinary teams",
    text: "leading extraordinary teams",
    tone: "text-sky-700 dark:text-sky-400",
    glow: "[text-shadow:0_0_1px_rgba(3,105,161,0.35),0_0_22px_rgba(14,165,233,0.2)] dark:[text-shadow:0_0_1px_rgba(56,189,248,0.45),0_0_26px_rgba(56,189,248,0.26)]",
    stories: [
      {
        id: "lt-1",
        eyebrow: "EveryCure",
        title: "Two engineers to twelve",
        body: "Placeholder — building a platform team from scratch and how the operating cadence evolved.",
        span: "lg",
      },
      {
        id: "lt-2",
        title: "Safety + momentum",
        body: "Placeholder — making it safe to push back without losing pace.",
        span: "md",
      },
      {
        id: "lt-3",
        title: "Rituals that earned their keep",
        body: "Placeholder — the few meetings that actually changed outcomes.",
        span: "sm",
      },
      {
        id: "lt-4",
        title: "Coaching to autonomy",
        body: "Placeholder — taking promising ICs through the EM-readiness threshold.",
        span: "sm",
      },
    ],
  },
  problems: {
    label: "problems that matter",
    text: "problems that matter",
    tone: "text-amber-800 dark:text-amber-400",
    glow: "[text-shadow:0_0_1px_rgba(180,83,9,0.35),0_0_22px_rgba(245,158,11,0.2)] dark:[text-shadow:0_0_1px_rgba(251,191,36,0.45),0_0_26px_rgba(251,191,36,0.24)]",
    stories: [
      {
        id: "pr-1",
        eyebrow: "Decidere",
        title: "Salary calculators that respect the math",
        body: "Placeholder — building a tax calculator that takes cantonal complexity seriously.",
        span: "lg",
      },
      {
        id: "pr-2",
        title: "Stakes worth attention",
        body: "Placeholder — choosing what to work on when finite hours bite.",
        span: "md",
      },
      {
        id: "pr-3",
        title: "Messy importance over tidy trivia",
        body: "Placeholder — the smell test for whether a problem deserves you.",
        span: "sm",
      },
      {
        id: "pr-4",
        title: "Saying no, well",
        body: "Placeholder — protecting focus without burning bridges.",
        span: "sm",
      },
    ],
  },
  humans: {
    label: "humans that matter",
    text: "humans that matter",
    tone: "text-emerald-700 dark:text-emerald-400",
    glow: "[text-shadow:0_0_1px_rgba(4,120,87,0.35),0_0_22px_rgba(16,185,129,0.2)] dark:[text-shadow:0_0_1px_rgba(52,211,153,0.45),0_0_26px_rgba(52,211,153,0.26)]",
    stories: [
      {
        id: "hu-1",
        eyebrow: "Across roles",
        title: "Individuals before roles",
        body: "Placeholder — what changes when you remember who's reading the deadline email.",
        span: "lg",
      },
      {
        id: "hu-2",
        title: "Designing feedback",
        body: "Placeholder — written, regular, and specific — and how that lands.",
        span: "md",
      },
      {
        id: "hu-3",
        title: "Hiring with care",
        body: "Placeholder — leaving every candidate better off than you found them.",
        span: "sm",
      },
      {
        id: "hu-4",
        title: "Dignity in the small print",
        body: "Placeholder — onboarding, offboarding, and the parts no one watches.",
        span: "sm",
      },
    ],
  },
};
