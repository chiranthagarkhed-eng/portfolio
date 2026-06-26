/**
 * Single source of truth for all portfolio content. Layout/aesthetic come from
 * the imported Claude Design ("Portfolio - Chiranth"); the case studies are
 * Chiranth's real projects (DraftLab + the Market Pattern Scanner) and each viz
 * panel reflects that project's actual mechanics, not invented metrics.
 *
 * Anything still needing a real value is tagged `[REPLACE]`.
 */

/* ------------------------------------------------------------------ */
/* Identity + navigation                                              */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Chiranth Agarkhed",
  resumeUrl: "/resume.pdf", // [REPLACE] drop the real PDF in /public
  email: "chiranthagarkhed@gmail.com",
  links: {
    github: { label: "@chiranthagarkhed-eng", href: "https://github.com/chiranthagarkhed-eng" },
    linkedin: {
      label: "in/chiranth-agarkhed",
      href: "https://www.linkedin.com/in/chiranth-agarkhed-20107a284/",
    },
  },
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  badge: "Open to 2027 internships & freelance",
  nameLines: ["CHIRANTH", "AGARKHED"] as const,
  lede: {
    lead: "Data Science & Economics student at ",
    emphasis: "Rutgers University",
    tail: ". I turn messy, high-dimensional data into models and decisions that hold up in production.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Selected work                                                      */
/* ------------------------------------------------------------------ */

// DraftLab — formula + role-interaction matrix (both real implementation details).
export type DraftViz = {
  kind: "draft";
  header: string;
  formulaCaption: string;
  formula: string;
  matrixLabel: string;
  roles: string[];
  matrix: number[][]; // weights 0.2–1.0; diagonal = same lane
  footer: { left: string; right: string };
};

// Scanner — price line with a flagged pattern + the real detection rule.
export type ScannerViz = {
  kind: "scanner";
  header: string;
  caption: string;
  points: string; // SVG polyline in a 0 0 400 80 viewBox
  marker: { x: number; y: number }; // flagged pattern point
  rule: string;
  matchesLabel: string;
  matches: { ticker: string; pattern: string }[];
  footer: { left: string; right: string };
};

export type ProjectViz = DraftViz | ScannerViz;

export type Project = {
  num: string;
  meta: string;
  titleLines: [string, string];
  description: string;
  stack: string[];
  metric: string;
  href: string;
  linkLabel: string;
  viz: ProjectViz;
};

export const projects: Project[] = [
  {
    num: "01",
    meta: "LoL Draft Assistant · TypeScript · 2025",
    titleLines: ["DraftLab", "Draft Assistant"],
    description:
      "Personalized League of Legends draft assistant. It reads your last 30 ranked games through the Riot API, builds a per-role champion pool, and ranks picks with sample-size-aware shrinkage so thin data never masquerades as confidence.",
    stack: ["Next.js", "TypeScript", "Python", "Riot API", "SQLite"],
    metric: "Live on Vercel · 30-game personalization",
    href: "https://draftlab-lol.vercel.app",
    linkLabel: "View live →",
    viz: {
      kind: "draft",
      header: "DRAFTLAB / DRAFT ENGINE",
      formulaCaption: "Sample-size-aware shrinkage",
      formula: "edge = (winrate − 0.5) × min(1, √(games ÷ 1000))",
      matrixLabel: "Role-interaction matrix",
      roles: ["TOP", "JNG", "MID", "ADC", "SUP"],
      matrix: [
        [1.0, 0.5, 0.4, 0.2, 0.2],
        [0.5, 1.0, 0.6, 0.4, 0.4],
        [0.4, 0.6, 1.0, 0.4, 0.4],
        [0.2, 0.4, 0.4, 1.0, 0.8],
        [0.2, 0.4, 0.4, 0.8, 1.0],
      ],
      footer: { left: "Pool: last 30 ranked", right: "Weights 1.0 → 0.2" },
    },
  },
  {
    num: "02",
    meta: "Market Scanner · Python · 2024",
    titleLines: ["Market Pattern", "Scanner"],
    description:
      "Python scanner that pulls live and historical price data and flags technical setups — Bullish Breakouts and Doji Reversals — ranking matches on a live dashboard. Every signal is built to be back-tested, so it has to beat a naive baseline before it counts.",
    stack: ["Python", "Pandas", "NumPy", "Plotly / Dash", "yfinance"],
    metric: "500+ tickers / refresh · back-test harness",
    href: "#", // [REPLACE] repo / live link when public
    linkLabel: "View →",
    viz: {
      kind: "scanner",
      header: "SCANNER / DOJI REVERSAL",
      caption: "Sample setup · 1D candles · flagged",
      points:
        "0,40 30,34 60,42 90,30 120,46 150,55 180,62 210,66 240,68 252,67 272,55 300,44 330,33 360,25 400,16",
      marker: { x: 252, y: 67 },
      rule: "flag if  body ≤ 0.1 × range   and   close < SMA(5)",
      matchesLabel: "Latest matches",
      matches: [
        { ticker: "NVDA", pattern: "Bullish Breakout" },
        { ticker: "AAPL", pattern: "Doji Reversal" },
        { ticker: "TSLA", pattern: "Bullish Breakout" },
      ],
      footer: { left: "Tickers scanned: 500+", right: "Baseline: SMA(5)" },
    },
  },
];

/* ------------------------------------------------------------------ */
/* About                                                              */
/* ------------------------------------------------------------------ */

export const about = {
  heading: {
    lead: "I turn messy data into ",
    emphasis: "decisions",
    tail: " — bridging rigorous economics with modern machine learning.",
  },
  paragraph: {
    lead: "I'm a Data Science & Economics student at Rutgers University, focused on where statistical theory meets production systems. I like problems that need both — a clean causal story ",
    emphasis: "and",
    tail: " a model that ships. Recently I built DraftLab, a live draft-assistant web app, and a market-pattern scanner where every signal has to beat a naive baseline before it counts. I'm currently looking for 2027 internships and select freelance engagements.",
  },
  facts: [
    { label: "Location", value: "New Brunswick, NJ", accent: false },
    { label: "Focus", value: "ML · Econometrics", accent: false },
    { label: "Status", value: "Open to '27", accent: true },
    { label: "Core tools", value: "Python · SQL · Next.js", accent: false },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Skills                                                             */
/* ------------------------------------------------------------------ */

export const skillGroups = [
  { num: "01 / Languages", title: "Languages", items: ["Python", "R", "SQL", "TypeScript", "JavaScript"] },
  {
    num: "02 / ML & Data",
    title: "ML & Data",
    items: ["scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
  },
  {
    num: "03 / Tools & Web",
    title: "Tools & Web",
    items: ["Next.js", "React", "SQLite", "Riot API", "Git"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Contact                                                            */
/* ------------------------------------------------------------------ */

export const contact = {
  headingLines: ["LET'S BUILD", "SOMETHING"] as const,
  channels: [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: profile.links.github.label, href: profile.links.github.href },
    { label: "LinkedIn", value: profile.links.linkedin.label, href: profile.links.linkedin.href },
  ],
} as const;
