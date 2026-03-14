import { Suspense } from "react";
import { Newspaper } from "lucide-react";
import ArticleCard from "@/components/news/ArticleCard";
import CategoryFilter from "@/components/news/CategoryFilter";
import { getArticles } from "@/lib/rss";

export const revalidate = 3600;

export const metadata = {
  title: "Presse IA",
  description: "Toute l'actualite IA en temps reel depuis les meilleures sources",
};

async function ArticleGrid({ categorie }: { categorie?: string }) {
  let articles: Awaited<ReturnType<typeof getArticles>> = [];
  try {
    articles = await getArticles(categorie);
  } catch {
    articles = [];
  }

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-card-border bg-card p-12 text-center text-muted">
        <Newspaper size={40} className="mx-auto mb-4 text-accent" />
        <p className="text-lg font-medium">Aucun article pour le moment</p>
        <p className="mt-2 text-sm">Les flux RSS seront disponibles au prochain refresh.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug + article.url} article={article} />
      ))}
    </div>
  );
}

export default async function PressePage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const params = await searchParams;
  const categorie = params?.categorie;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <Newspaper size={20} className="text-accent" />
          </div>
          <h1 className="text-3xl font-extrabold">Presse IA</h1>
        </div>
        <p className="text-muted">
          Toutes les actualites IA agregees en temps reel depuis TechCrunch, The Verge,
          Anthropic, OpenAI et plus encore. Mis a jour toutes les heures.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>
      </div>

      {/* Articles Grid */}
      <Suspense
        fallback={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-xl border border-card-border bg-card"
              />
            ))}
          </div>
        }
      >
        <ArticleGrid categorie={categorie} />
      </Suspense>
    </div>
  );
}
