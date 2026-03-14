export const SITE_NAME = "AI Hub";
export const SITE_DESCRIPTION = "Votre veille IA personnalisee - Presse, Flash, Decouverte";

export const RSS_FEEDS = [
  {
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    source: "TechCrunch",
    icon: "TC",
    color: "#0a9e01",
  },
  {
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    source: "The Verge",
    icon: "TV",
    color: "#e5127d",
  },
  {
    url: "https://arstechnica.com/ai/feed/",
    source: "Ars Technica",
    icon: "AT",
    color: "#ff4e00",
  },
  {
    url: "https://openai.com/blog/rss.xml",
    source: "OpenAI",
    icon: "OA",
    color: "#10a37f",
  },
  {
    url: "https://www.anthropic.com/feed.xml",
    source: "Anthropic",
    icon: "AN",
    color: "#d4a27f",
  },
  {
    url: "https://blog.google/technology/ai/rss/",
    source: "Google AI",
    icon: "GA",
    color: "#4285f4",
  },
  {
    url: "https://huggingface.co/blog/feed.xml",
    source: "Hugging Face",
    icon: "HF",
    color: "#ffbd45",
  },
];

export const CATEGORIES = [
  { id: "all", label: "Tout", icon: "Layers" },
  { id: "agents", label: "Agents IA", icon: "Bot" },
  { id: "llms", label: "LLMs", icon: "Brain" },
  { id: "outils", label: "Outils", icon: "Wrench" },
  { id: "business", label: "Business", icon: "TrendingUp" },
  { id: "recherche", label: "Recherche", icon: "FlaskConical" },
  { id: "open-source", label: "Open Source", icon: "Github" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

// Keywords used to auto-categorize articles
export const CATEGORY_KEYWORDS: Record<Exclude<CategoryId, "all">, string[]> = {
  agents: [
    "agent", "agents", "autonomous", "autonome", "claude code", "computer use",
    "copilot", "assistant", "agentic", "mcp", "tool use", "function calling",
    "crew", "autogen", "langchain", "langgraph", "openai agents", "swarm",
    "mac mini", "army", "worker", "automation", "automate", "skill",
    "openclaw", "open claw", "devin", "cursor", "codegen",
  ],
  llms: [
    "gpt", "claude", "gemini", "llama", "mistral", "llm", "language model",
    "transformer", "token", "context window", "fine-tune", "fine-tuning",
    "benchmark", "reasoning", "chain of thought", "o1", "o3", "opus", "sonnet", "haiku",
  ],
  outils: [
    "tool", "outil", "api", "sdk", "platform", "plateforme", "app",
    "perplexity", "chatgpt", "interface", "plugin", "extension",
    "ide", "editor", "vscode", "integration", "workflow",
  ],
  business: [
    "startup", "funding", "revenue", "profit", "business", "enterprise",
    "valuation", "invest", "market", "monetiz", "saas", "pricing",
    "acquisition", "ipo", "partnership", "deal",
  ],
  recherche: [
    "research", "paper", "arxiv", "study", "breakthrough", "novel",
    "dataset", "training", "rlhf", "alignment", "safety", "evaluation",
    "multimodal", "vision", "diffusion", "architecture",
  ],
  "open-source": [
    "open source", "open-source", "github", "hugging face", "huggingface",
    "apache", "mit license", "weights", "ollama", "local", "self-host",
    "community", "fork", "repo",
  ],
};

// Keywords that flag an article as high-impact
export const IMPACT_KEYWORDS = [
  "launch", "release", "announce", "revolutio", "breakthrough", "record",
  "first", "new model", "major", "game-chang", "disrupt", "billion",
  "acquisition", "partnership", "open source", "free", "available now",
  "agent", "autonomous", "profit", "money", "earning",
];

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/presse", label: "Presse IA" },
  { href: "/flash", label: "Flash IA" },
  { href: "/decouverte", label: "Decouverte" },
];
