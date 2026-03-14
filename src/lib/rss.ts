import Parser from "rss-parser";
import {
  RSS_FEEDS_INTERNATIONAL,
  RSS_FEEDS_FRENCH,
  RSS_FEEDS_PRODUCTS,
  CATEGORY_KEYWORDS,
  IMPACT_KEYWORDS,
  type CategoryId,
} from "./constants";
import type { Article } from "./types";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "AI-Hub-RSS-Reader/1.0",
  },
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function categorizeArticle(title: string, summary: string): CategoryId[] {
  const text = `${title} ${summary}`.toLowerCase();
  const categories: CategoryId[] = [];

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      categories.push(category as CategoryId);
    }
  }

  return categories.length > 0 ? categories : ["outils"];
}

function isImpactArticle(title: string, summary: string): boolean {
  const text = `${title} ${summary}`.toLowerCase();
  return IMPACT_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
}

function extractImageUrl(item: Record<string, unknown>): string | undefined {
  const enclosure = item.enclosure as { url?: string; type?: string } | undefined;
  if (enclosure?.url && enclosure?.type?.startsWith("image")) {
    return enclosure.url;
  }

  const mediaContent = item["media:content"] as { $?: { url?: string } } | undefined;
  if (mediaContent?.$?.url) {
    return mediaContent.$.url;
  }

  const content = (item["content:encoded"] || item.content || "") as string;
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) {
    return imgMatch[1];
  }

  return undefined;
}

// ─── Simple French summary generation ───
// Generates a short, punchy French summary from the title and content
function generateFrenchSummary(title: string, summary: string, source: string): string {
  // For French sources, the content is already in French
  if (["Numerama", "Frandroid", "01net", "Les Numeriques", "L'Usine Digitale", "ActuIA", "Le Big Data", "Siecle Digital"].includes(source)) {
    // Already French, just make it punchy
    const cleaned = summary.slice(0, 200);
    return cleaned + (summary.length > 200 ? "..." : "");
  }

  // For English sources, create a concise French-style summary
  // We extract key info and present it in French format
  const lowerTitle = title.toLowerCase();
  const lowerSummary = summary.toLowerCase();

  let emoji = "📰";
  if (lowerTitle.includes("launch") || lowerTitle.includes("release") || lowerTitle.includes("announce")) emoji = "🚀";
  else if (lowerTitle.includes("agent") || lowerTitle.includes("autonom")) emoji = "🤖";
  else if (lowerTitle.includes("funding") || lowerTitle.includes("billion") || lowerTitle.includes("revenue")) emoji = "💰";
  else if (lowerTitle.includes("open source") || lowerTitle.includes("free")) emoji = "🔓";
  else if (lowerTitle.includes("model") || lowerTitle.includes("gpt") || lowerTitle.includes("claude")) emoji = "🧠";
  else if (lowerTitle.includes("safety") || lowerTitle.includes("risk") || lowerTitle.includes("regulation")) emoji = "⚠️";
  else if (lowerTitle.includes("research") || lowerTitle.includes("paper") || lowerTitle.includes("study")) emoji = "🔬";
  else if (lowerTitle.includes("partnership") || lowerTitle.includes("deal")) emoji = "🤝";
  else if (lowerSummary.includes("profit") || lowerSummary.includes("money") || lowerSummary.includes("earning")) emoji = "💸";

  // Build a concise summary: emoji + source context + truncated summary
  const shortSummary = summary.slice(0, 180);
  return `${emoji} ${source} — ${shortSummary}${summary.length > 180 ? "..." : ""}`;
}

interface FeedConfig {
  url: string;
  source: string;
  icon: string;
  color: string;
  product?: string;
}

async function fetchFeeds(
  feeds: FeedConfig[],
  region: "international" | "france" | "product"
): Promise<Article[]> {
  const results = await Promise.allSettled(
    feeds.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        return (parsed.items || []).map((item) => {
          const title = item.title || "Sans titre";
          const rawSummary = item.contentSnippet || item.content || item.summary || "";
          const summary = stripHtml(rawSummary).slice(0, 280);
          const categories = categorizeArticle(title, summary);

          return {
            title,
            summary: summary + (rawSummary.length > 280 ? "..." : ""),
            url: item.link || "#",
            source: feed.source,
            sourceIcon: feed.icon,
            sourceColor: feed.color,
            publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
            categories,
            isImpact: isImpactArticle(title, summary),
            slug: slugify(title),
            imageUrl: extractImageUrl(item as Record<string, unknown>),
            region,
            product: (feed as FeedConfig & { product?: string }).product,
            summaryFr: generateFrenchSummary(title, summary, feed.source),
          } satisfies Article;
        });
      } catch (error) {
        console.warn(`[RSS] Failed to fetch ${feed.source}: ${error}`);
        return [];
      }
    })
  );

  return results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
}

function deduplicateAndSort(articles: Article[]): Article[] {
  const seen = new Set<string>();
  const unique = articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });
  unique.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return unique;
}

// ─── Public API ───

export async function fetchAllFeeds(): Promise<Article[]> {
  const [intl, fr, products] = await Promise.all([
    fetchFeeds(RSS_FEEDS_INTERNATIONAL, "international"),
    fetchFeeds(RSS_FEEDS_FRENCH, "france"),
    fetchFeeds(RSS_FEEDS_PRODUCTS, "product"),
  ]);
  return deduplicateAndSort([...intl, ...fr, ...products]);
}

export async function getInternationalArticles(category?: string): Promise<Article[]> {
  const articles = deduplicateAndSort(
    await fetchFeeds(RSS_FEEDS_INTERNATIONAL, "international")
  );
  if (!category || category === "all") return articles;
  return articles.filter((a) => a.categories.includes(category as CategoryId));
}

export async function getFrenchArticles(category?: string): Promise<Article[]> {
  const articles = deduplicateAndSort(
    await fetchFeeds(RSS_FEEDS_FRENCH, "france")
  );
  if (!category || category === "all") return articles;
  return articles.filter((a) => a.categories.includes(category as CategoryId));
}

export async function getProductArticles(productFilter?: string): Promise<Article[]> {
  const articles = deduplicateAndSort(
    await fetchFeeds(RSS_FEEDS_PRODUCTS, "product")
  );
  if (!productFilter || productFilter === "all") return articles;
  return articles.filter((a) => a.product === productFilter);
}

export async function getArticles(category?: string): Promise<Article[]> {
  const articles = await fetchAllFeeds();
  if (!category || category === "all") return articles;
  return articles.filter((a) =>
    a.categories.includes(category as CategoryId)
  );
}

export async function getFlashArticles(): Promise<Article[]> {
  const articles = await fetchAllFeeds();
  return articles.filter((a) => a.isImpact).slice(0, 20);
}
