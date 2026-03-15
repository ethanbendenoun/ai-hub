export const SITE_NAME = "AI Hub";
export const SITE_DESCRIPTION = "Votre veille IA personnalisee - Presse, Flash, Produits, Decouverte";

// ─── PRESSE INTERNATIONALE ───
export const RSS_FEEDS_INTERNATIONAL = [
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
    url: "https://venturebeat.com/category/ai/feed/",
    source: "VentureBeat",
    icon: "VB",
    color: "#c4151c",
  },
  {
    url: "https://www.wired.com/feed/tag/ai/latest/rss",
    source: "Wired",
    icon: "WR",
    color: "#000000",
  },
  {
    url: "https://www.technologyreview.com/feed/",
    source: "MIT Tech Review",
    icon: "MT",
    color: "#d32f2f",
  },
  {
    url: "https://www.marktechpost.com/feed/",
    source: "MarkTechPost",
    icon: "MP",
    color: "#1565c0",
  },
  {
    url: "https://the-decoder.com/feed/",
    source: "The Decoder",
    icon: "TD",
    color: "#00bcd4",
  },
];

// ─── PRESSE FRANCAISE ───
export const RSS_FEEDS_FRENCH = [
  // Generalistes tech
  {
    url: "https://www.numerama.com/tech/feed/",
    source: "Numerama",
    icon: "NM",
    color: "#1a73e8",
  },
  {
    url: "https://www.frandroid.com/feed",
    source: "Frandroid",
    icon: "FR",
    color: "#ff6600",
  },
  {
    url: "https://www.01net.com/feed/",
    source: "01net",
    icon: "01",
    color: "#e30613",
  },
  {
    url: "https://www.lesnumeriques.com/rss.xml",
    source: "Les Numeriques",
    icon: "LN",
    color: "#0078d4",
  },
  {
    url: "https://www.usine-digitale.fr/rss",
    source: "L'Usine Digitale",
    icon: "UD",
    color: "#003366",
  },
  // Specialisees IA
  {
    url: "https://www.actuia.com/feed/",
    source: "ActuIA",
    icon: "AI",
    color: "#6c5ce7",
  },
  {
    url: "https://www.lebigdata.fr/feed",
    source: "Le Big Data",
    icon: "BD",
    color: "#00b894",
  },
  {
    url: "https://siecledigital.fr/feed/",
    source: "Siecle Digital",
    icon: "SD",
    color: "#2d3436",
  },
  {
    url: "https://www.journaldunet.com/intelligence-artificielle/rss/",
    source: "JDN IA",
    icon: "JN",
    color: "#e65100",
  },
];

// ─── PRODUITS IA (blogs officiels / changelogs) ───
export const RSS_FEEDS_PRODUCTS = [
  {
    url: "https://www.anthropic.com/feed.xml",
    source: "Anthropic",
    icon: "AN",
    color: "#d4a27f",
    product: "Claude",
  },
  {
    url: "https://openai.com/blog/rss.xml",
    source: "OpenAI",
    icon: "OA",
    color: "#10a37f",
    product: "ChatGPT / GPT",
  },
  {
    url: "https://blog.google/technology/ai/rss/",
    source: "Google AI",
    icon: "GA",
    color: "#4285f4",
    product: "Gemini",
  },
  {
    url: "https://huggingface.co/blog/feed.xml",
    source: "Hugging Face",
    icon: "HF",
    color: "#ffbd45",
    product: "Open Source",
  },
  {
    url: "https://www.perplexity.ai/hub/blog/rss.xml",
    source: "Perplexity",
    icon: "PX",
    color: "#20b2aa",
    product: "Perplexity",
  },
  {
    url: "https://cursor.com/blog/rss.xml",
    source: "Cursor",
    icon: "CU",
    color: "#7c3aed",
    product: "Cursor",
  },
  {
    url: "https://www.langchain.com/blog/rss.xml",
    source: "LangChain",
    icon: "LC",
    color: "#1c3c3c",
    product: "LangChain",
  },
  {
    url: "https://mistral.ai/news/rss.xml",
    source: "Mistral AI",
    icon: "MI",
    color: "#ff7000",
    product: "Mistral",
  },
];

// All feeds combined for legacy compat
export const RSS_FEEDS = [
  ...RSS_FEEDS_INTERNATIONAL,
  ...RSS_FEEDS_FRENCH,
  ...RSS_FEEDS_PRODUCTS,
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

// ─── PRODUCT FILTERS for the Produits page ───
export const PRODUCT_FILTERS = [
  { id: "all", label: "Tous", icon: "Layers" },
  { id: "Claude", label: "Claude", icon: "Bot" },
  { id: "ChatGPT / GPT", label: "OpenAI / GPT", icon: "Brain" },
  { id: "Gemini", label: "Gemini", icon: "Sparkles" },
  { id: "Perplexity", label: "Perplexity", icon: "Search" },
  { id: "Cursor", label: "Cursor", icon: "Code" },
  { id: "Open Source", label: "Open Source", icon: "Github" },
  { id: "LangChain", label: "LangChain / Agents", icon: "Link" },
  { id: "Mistral", label: "Mistral AI", icon: "Flame" },
] as const;

// Keywords used to auto-categorize articles
export const CATEGORY_KEYWORDS: Record<Exclude<CategoryId, "all">, string[]> = {
  agents: [
    "agent", "agents", "autonomous", "autonome", "claude code", "computer use",
    "copilot", "assistant", "agentic", "mcp", "tool use", "function calling",
    "crew", "autogen", "langchain", "langgraph", "openai agents", "swarm",
    "mac mini", "army", "worker", "automation", "automate", "skill",
    "openclaw", "open claw", "clawcode", "claw code", "devin", "cursor", "codegen",
    "crewai", "autogpt", "auto-gpt",
  ],
  llms: [
    "gpt", "claude", "gemini", "llama", "mistral", "llm", "language model",
    "transformer", "token", "context window", "fine-tune", "fine-tuning",
    "benchmark", "reasoning", "chain of thought", "o1", "o3", "opus", "sonnet", "haiku",
    "gpt-5", "gpt-4", "claude 4", "modele de langage",
  ],
  outils: [
    "tool", "outil", "api", "sdk", "platform", "plateforme", "app",
    "perplexity", "chatgpt", "interface", "plugin", "extension",
    "ide", "editor", "vscode", "integration", "workflow",
  ],
  business: [
    "startup", "funding", "revenue", "profit", "business", "enterprise",
    "valuation", "invest", "market", "monetiz", "saas", "pricing",
    "acquisition", "ipo", "partnership", "deal", "generer", "argent", "money",
    "earning", "income", "revenu",
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

// ─── AI RELEVANCE FILTER ───
// Generalist sources that need AI keyword filtering (pure-player AI sites are trusted)
export const GENERALIST_SOURCES = [
  "Numerama", "Frandroid", "01net", "Les Numeriques", "L'Usine Digitale", "Siecle Digital",
  "TechCrunch", "The Verge", "Ars Technica", "VentureBeat", "Wired",
];

// Keywords that an article must contain (title OR summary) to pass the AI filter
// Short keywords (<=3 chars) are matched with word boundaries to avoid false positives
export const AI_RELEVANCE_KEYWORDS = [
  // Core AI terms (short ones use word-boundary matching)
  "ia", "ai", "intelligence artificielle", "artificial intelligence",
  "machine learning", "deep learning", "apprentissage automatique",
  "apprentissage profond", "reseau de neurones", "neural network",
  "nlp", "computer vision",
  // Models & LLMs
  "llm", "gpt", "chatgpt", "openai", "claude", "anthropic", "gemini", "mistral",
  "llama", "meta ai", "copilot", "perplexity", "deepseek",
  "modele de langage", "language model", "transformer model", "diffusion model",
  "stable diffusion", "midjourney", "dall-e", "sora", "generative ai",
  "image generation", "text generation", "generation de texte",
  // Agents & tools
  "agent ia", "ai agent", "chatbot", "prompt", "fine-tuning", "fine-tune", "rag",
  "retrieval augmented", "vector database", "embedding", "tokeniz",
  "langchain", "hugging face", "huggingface", "cursor ai", "devin",
  // Research
  "arxiv", "benchmark", "rlhf", "alignment", "reasoning", "multimodal",
  "large language", "neural net", "deep neural",
  // Business AI
  "robotique", "robotic", "automation ia", "ai automation",
  "autonome ia", "autonomous ai", "autonomous agent",
  "syntheti", "hallucin", "text-to-", "text to image",
  "artificial general", "agi",
];

// Keywords that flag an article as high-impact
export const IMPACT_KEYWORDS = [
  "launch", "release", "announce", "revolutio", "breakthrough", "record",
  "first", "new model", "major", "game-chang", "disrupt", "billion",
  "acquisition", "partnership", "open source", "free", "available now",
  "agent", "autonomous", "profit", "money", "earning",
  "lancement", "sortie", "annonce", "disponible", "nouveau modele",
];

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/presse", label: "Presse IA" },
  { href: "/flash", label: "Flash IA" },
  { href: "/produits", label: "Produits IA" },
  { href: "/decouverte", label: "Decouverte" },
];
