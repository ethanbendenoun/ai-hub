import { Suspense } from "react";
import { Box, Zap, Calendar, ExternalLink } from "lucide-react";
import { getProductArticles } from "@/lib/rss";
import ProductFilter from "@/components/news/ProductFilter";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

export const metadata = {
  title: "Produits IA",
  description: "Les dernieres nouveautes de Claude, ChatGPT, Gemini, Perplexity, Cursor et plus",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getProductEmoji(product?: string): string {
  switch (product) {
    case "Claude": return "🟤";
    case "ChatGPT / GPT": return "🟢";
    case "Gemini": return "🔵";
    case "Perplexity": return "🔷";
    case "Cursor": return "🟣";
    case "Open Source": return "🟡";
    case "LangChain": return "🔗";
    default: return "⚡";
  }
}

async function ProductGrid({ produit }: { produit?: string }) {
  let articles: Awaited<ReturnType<typeof getProductArticles>> = [];
  try {
    articles = await getProductArticles(produit);
  } catch {
    articles = [];
  }

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-card-border bg-card p-12 text-center text-muted">
        <Box size={40} className="mx-auto mb-4 text-accent" />
        <p className="text-lg font-medium">Aucune news produit pour le moment</p>
        <p className="mt-2 text-sm">
          Les blogs officiels d&apos;Anthropic, OpenAI, Google, Perplexity, Cursor et LangChain sont surveilles.
        </p>
      </div>
    );
  }

  // Group articles by product
  const grouped = articles.reduce<Record<string, typeof articles>>((acc, article) => {
    const key = article.product || "Autre";
    if (!acc[key]) acc[key] = [];
    acc[key].push(article);
    return acc;
  }, {});

  // If filtering by product, show as timeline
  if (produit && produit !== "all") {
    return (
      <div className="space-y-4">
        {articles.map((article, i) => (
          <a
            key={article.slug + i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover group flex gap-4 rounded-xl border border-card-border bg-card p-5 transition-all"
          >
            {/* Timeline dot */}
            <div className="flex flex-col items-center pt-1">
              <div className="h-3 w-3 rounded-full bg-accent shadow-lg shadow-accent/30" />
              {i < articles.length - 1 && (
                <div className="mt-1 w-0.5 flex-1 bg-card-border" />
              )}
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{getProductEmoji(article.product)}</span>
                <span
                  className="rounded-md px-2 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: article.sourceColor }}
                >
                  {article.source}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Calendar size={12} />
                  {formatDate(article.publishedAt)}
                </span>
              </div>
              <h3 className="mb-2 text-base font-bold group-hover:text-accent">
                {article.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {article.summaryFr || article.summary}
              </p>
            </div>

            <ExternalLink
              size={16}
              className="mt-1 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        ))}
      </div>
    );
  }

  // Show grouped by product
  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([product, productArticles]) => (
        <div key={product}>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">{getProductEmoji(product)}</span>
            <h2 className="text-xl font-bold">{product}</h2>
            <Badge variant="accent">{productArticles.length} news</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productArticles.slice(0, 6).map((article, i) => (
              <a
                key={article.slug + i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex flex-col rounded-xl border border-card-border bg-card p-5 transition-all"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="rounded-md px-2 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: article.sourceColor }}
                  >
                    {article.source}
                  </span>
                  <span className="text-xs text-muted">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <h3 className="mb-2 text-sm font-semibold leading-snug group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="flex-1 text-xs leading-relaxed text-muted">
                  {article.summaryFr || article.summary}
                </p>
                {article.isImpact && (
                  <div className="mt-3">
                    <Badge variant="impact">
                      <Zap size={10} />
                      Nouveaute majeure
                    </Badge>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<{ produit?: string }>;
}) {
  const params = await searchParams;
  const produit = params?.produit;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
            <Box size={20} className="text-purple-500" />
          </div>
          <h1 className="text-3xl font-extrabold">Produits IA</h1>
        </div>
        <p className="text-muted">
          Les dernieres annonces et mises a jour directement depuis les blogs officiels
          de Claude, ChatGPT, Gemini, Perplexity, Cursor et l&apos;ecosysteme agents.
        </p>
      </div>

      {/* Info cards */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { emoji: "🟤", name: "Claude / Anthropic", desc: "Skills, tokens, Claude Code, MCP" },
          { emoji: "🟢", name: "OpenAI / ChatGPT", desc: "GPT-5, agents, plugins, API" },
          { emoji: "🔵", name: "Gemini / Google", desc: "Modeles, Google AI Studio" },
          { emoji: "🟣", name: "Cursor / Agents", desc: "IDE IA, Devin, CrewAI, LangChain" },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-xl border border-card-border bg-card p-4"
          >
            <span className="text-2xl">{item.emoji}</span>
            <div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Suspense fallback={null}>
          <ProductFilter />
        </Suspense>
      </div>

      {/* Product news */}
      <Suspense
        fallback={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-xl border border-card-border bg-card"
              />
            ))}
          </div>
        }
      >
        <ProductGrid produit={produit} />
      </Suspense>
    </div>
  );
}
