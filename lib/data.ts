/**
 * Single source of truth for ALL personal content on the site.
 *
 * Everything the owner needs to edit lives here — components read from these
 * exports and never hardcode copy. Anything still using a stand-in value is
 * marked with a `[REPLACE]` comment so it's grep-able before going live.
 */

import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiR,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiGit,
  SiGithub,
  SiJupyter,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Chiranth Agarkhed",
  initials: "CA",
  role: "Data Science & Economics Student",
  university: "Rutgers University — New Brunswick, NJ",
  degree: "B.S. Data Science & Economics",
  graduation: "May 2028",
  // Used in SEO + hero sub-headline.
  seeking: "data science, analytics, and software internships",
  resumeUrl: "/resume.pdf", // [REPLACE] drop the real PDF in /public
  email: "chiranthagarkhed@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/chiranth-agarkhed-20107a284/",
    github: "https://github.com/chiranthagarkhed-eng",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  availability: "Open to internships · Summer 2026",
  // Split so exactly one phrase can carry the site's single gradient moment.
  headline: {
    lead: "I turn messy data into ",
    accent: "decisions",
    tail: " people actually use.",
  },
  subheadline:
    "Data Science & Economics @ Rutgers — I look for internships where the analysis changes what gets done, not just what gets reported.",
} as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  paragraphs: [
    "I study data science and economics together because the two questions I care about most are inseparable: what does the data actually say, and what should anyone do about it? A model that predicts well but ignores incentives is half an answer. I spend my time on the other half.",
    "I build things, not just notebooks. I recently shipped DraftLab, a personalized League of Legends draft assistant: it reads your last 30 ranked matches through the Riot API, weights recommendations toward champions you actually play, and attaches honest confidence to every number instead of pretending small samples are certain. I'm comfortable across the whole path — pulling and cleaning data, modeling it, and shipping the result as something a person can click.",
    "I'm looking for an internship in data science, analytics, or software where the work is measured by the decisions it improves. I'm most useful where quantitative rigor meets a real domain — finance and markets especially — and I'd rather go deep on a hard problem than wide on an easy one.",
  ],
  photoAlt: "Portrait of Chiranth Agarkhed", // [REPLACE] add photo at /public/profile.jpg
  // Presented as a spec sheet (label → value), not metric tiles.
  stats: [
    { label: "Shipped to production", value: "1 live app" },
    { label: "Languages I work in", value: "5" },
    { label: "Graduating", value: "Rutgers ’28" },
    { label: "Focus", value: "Data Science × Economics" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  name: string;
  status: "shipped" | "in-development";
  problem: string;
  build: string;
  // Economic / domain angle — surfaced before the tech to reflect the DS×Econ thesis.
  insight: string;
  stack: string[];
  outcome?: string;
  liveUrl?: string;
  githubUrl?: string;
  // A short, representative code snippet shown in the card's visual column.
  snippet: { language: string; code: string };
};

export const projects: Project[] = [
  {
    name: "DraftLab",
    status: "shipped",
    problem:
      "Most League of Legends draft tools spit out global \"best picks\" that ignore which champions you actually play — and quote win-rates from tiny samples as if they were certain.",
    build:
      "A personalized draft assistant that reads your last 30 ranked matches through the Riot API, builds a per-role champion pool, and recommends picks weighted toward what you really play. It analyzes cross-role matchups (e.g. ADC vs enemy jungler) with a role-interaction matrix to surface advantages that global \"best-pick\" tools ignore.",
    // Google XYZ formula — accomplished [X], as measured by [Y], by doing [Z].
    insight:
      "Shipped a personalized draft assistant live on Vercel (X), measured by recommendations that carry an explicit sample-size confidence badge instead of false precision (Y), by applying sample-size-aware shrinkage — pulling thin-sample win-rates back toward 50% so low-volume champions can't masquerade as high-confidence picks (Z).",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "Riot API",
      "SQLite",
    ],
    outcome: "Live on Vercel • 30-match personalization • confidence-badged stats",
    githubUrl: "https://github.com/chiranthagarkhed-eng/draftLab",
    liveUrl: "https://draftlab-lol.vercel.app",
    snippet: {
      language: "typescript",
      code: `// Shrink a win-rate toward 50% when the sample is thin,
// so low-volume champions can't fake high confidence.
function adjustedEdge(rawWinrate: number, games: number) {
  const confidence = Math.min(1, Math.sqrt(games / 1000));
  return (rawWinrate - 0.5) * confidence;
}`,
    },
  },
  {
    name: "Stock Market Scanner",
    status: "in-development",
    problem:
      "Retail traders miss high-probability technical setups because the signals are buried across hundreds of tickers and only obvious in hindsight.",
    build:
      "A Python application that pulls live and historical price data, detects Bullish Breakout and Doji Reversal patterns with rule-based logic, and ranks the matches on a live dashboard so a user sees the handful of names worth a closer look — not a wall of charts.",
    insight:
      "Patterns are only worth acting on when they beat a naive baseline. The scanner is built to be back-tested, so a signal earns its place by how it would have performed — not by how good the chart looks.",
    stack: ["Python", "Pandas", "NumPy", "Plotly / Dash", "yfinance"],
    outcome: "Scans 500+ tickers per refresh • back-testing harness in progress",
    githubUrl: undefined, // [REPLACE] add repo URL when public
    liveUrl: undefined, // [REPLACE] add when deployed
    snippet: {
      language: "python",
      code: `def detect_doji_reversal(df, body_ratio=0.1):
    """Flag candles whose body is tiny vs. their range
    after a downtrend — a classic reversal tell."""
    rng = df["high"] - df["low"]
    body = (df["close"] - df["open"]).abs()
    is_doji = body <= body_ratio * rng
    downtrend = df["close"] < df["close"].rolling(5).mean()
    return df[is_doji & downtrend]`,
    },
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type Skill = { name: string; icon?: IconType };

export type SkillGroup = { title: string; skills: Skill[] };

/*
 * Two axes on purpose. Splitting "Data & ML" from "Economics & Quantitative
 * Methods" is the design choice that signals the intersection — a generic dev
 * portfolio would collapse these into one flat grid.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Libraries",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "SQL" }, // no honest brand icon for generic SQL — monogram tile
      { name: "R", icon: SiR },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "scikit-learn", icon: SiScikitlearn },
      { name: "Matplotlib" }, // simple-icons has no Matplotlib mark — monogram tile
    ],
  },
  {
    title: "Data & ML",
    skills: [
      { name: "Machine Learning" },
      { name: "Data Analysis" },
      { name: "Statistical Modeling" },
      { name: "Data Pipelines" },
      { name: "REST APIs" },
    ],
  },
  {
    title: "Economics & Quantitative Methods",
    skills: [
      { name: "Econometrics" },
      { name: "Regression Analysis" },
      { name: "Time-Series Analysis" },
      { name: "Market & Financial Data" },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Jupyter", icon: SiJupyter },
      { name: "VS Code", icon: VscVscode },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export const education = {
  school: "Rutgers University — New Brunswick, NJ",
  degree: "B.S. Data Science & Economics",
  graduation: "Expected May 2028",
  coursework: [
    "Data Structures", // [REPLACE] with actual courses as you take them
    "Econometrics",
    "Introduction to Machine Learning",
    "Statistical Analysis",
    "Linear Algebra",
    "Database Systems",
  ],
  activities: [
    "Rutgers Data Science Club", // [REPLACE]
    "Quantitative Finance / Investing Group", // [REPLACE]
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Experience & Involvement                                            */
/* ------------------------------------------------------------------ */

export type ExperienceItem = {
  role: string;
  org: string;
  dates: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Creator — DraftLab (LoL Draft Assistant)",
    org: "Independent project · live on Vercel",
    dates: "2025 — Present",
    bullets: [
      // Each bullet follows the Google XYZ formula: accomplished [X], measured by [Y], by doing [Z].
      "Designed, built, and shipped DraftLab to production on Vercel, measured by a working end-to-end flow from Riot match history to ranked, personalized champion picks, by building a Python data pipeline and a client-side Next.js/TypeScript recommendation engine.",
      "Eliminated false confidence from thin-sample champions by applying sample-size-aware shrinkage — (winrate − 0.5) × min(1, √(games/1000)) — so every recommendation degrades gracefully instead of overclaiming on low-volume data.",
      "Improved draft relevance over global \"best pick\" tools by weighting cross-role matchups with a role-interaction matrix (1.0 → 0.2) that captures interactions other tools ignore (e.g. ADC vs enemy jungler).",
    ],
  },
  {
    role: "Independent Project Work — Data Science",
    org: "Self-directed",
    dates: "2024 — Present",
    bullets: [
      "Building a Python market scanner end to end — data ingestion, pattern-detection logic, and a live dashboard — to turn raw price feeds into a ranked shortlist of tradable setups.",
      "Designing every signal to be back-tested so it has to beat a naive baseline before it earns a place in the tool.",
    ],
  },
  {
    role: "Add your role here", // [REPLACE] club leadership, tutoring, part-time work, etc.
    org: "Organization",
    dates: "Dates",
    bullets: [
      "Replace with an impact statement: what changed because you were there, with a number if you have one.",
      "Lead with the result, not the task — e.g. 'Grew turnout 40% over a semester by …' rather than 'Managed events.'",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
