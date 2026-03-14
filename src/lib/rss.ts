import Parser from "rss-parser";
import {
  RSS_FEEDS,
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
  // Try common RSS image fields
  const enclosure = item.enclosure as { url?: string; type?: string } | undefined;
  if (enclosure?.url && enclosure?.type?.startsWith("image")) {
    return enclosure.url;
  }

  const mediaContent = item["media:content"] as { $?: { url?: string } } | undefined;
  if (mediaContent?.$?.url) {
    return mediaContent.$.url;
  }

  // Try to extract first image from content
  const content = (item["content:encoded"] || item.content || "") as string;
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) {
    return imgMatch[1];
  }

  return undefined;
}

export async function fetchAllFeeds(): Promise<Article[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
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
          } satisfies Article;
        });
      } catch (error) {
        console.warn(`[RSS] Failed to fetch ${feed.source}: ${error}`);
        return [];
      }
    })
  );

  const allArticles = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );

  // Deduplicate by URL
  const seen = new Set<string>();
  const unique = allArticles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });

  // Sort by date descending
  unique.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return unique;
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
  // For flash: only return impactful or recent top articles
  return articles.filter((a) => a.isImpact).slice(0, 20);
}
