import { Suspense } from "react";
import { Newspaper, Globe, MapPin } from "lucide-react";
import ArticleCard from "@/components/news/ArticleCard";
import CategoryFilter from "@/components/news/CategoryFilter";
import RegionTabs from "@/components/news/RegionTabs";
import { getInternationalArticles, getFrenchArticles } from "@/lib/rss";

export const revalidate = 3600;

export const metadata = {
  title: "Presse IA",
  description: "Toute l'actualite IA en temps reel - Internationale et Francaise",
};

async function ArticleGrid({
  region,
  categorie,
}: {
  region: string;
  categorie?: string;
}) {
  let articles: Awaited<ReturnType<typeof getInternationalArticles>> = [];
  try {
    if (region === "france") {
      articles = await getFrenchArticles(categorie);
    } else {
      articles = await getInternationalArticles(categorie);
    }
  } catch {
    articles = [];
  }

  const isFrench = region === "france";
  const sources = isFrench
    ? "Numerama, Frandroid, 01net, ActuIA, Le Big Data..."
    : "TechCrunch, The Verge, Ars Technica, VentureBeat, Wired...";

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-card-border bg-card p-12 text-center text-muted">
        {isFrench ? (
          <MapPin size={40} className="mx-auto mb-4 text-accent" />
        ) : (
          <Globe size={40} className="mx-auto mb-4 text-accent" />
        )}
        <p className="text-lg font-medium">Aucun article pour le moment</p>
        <p className="mt-2 text-sm">
          Sources surveillees : {sources}
        </p>
        <p className="mt-1 text-xs text-muted/60">
          Les flux RSS seront disponibles au prochain refresh.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-2 text-sm text-muted">
        {isFrench ? <MapPin size={14} /> : <Globe size={14} />}
        <span>{articles.length} articles depuis {sources}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug + article.url} article={article} />
        ))}
      </div>
    </>
  );
}

export default async function PressePage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; categorie?: string }>;
}) {
  const params = await searchParams;
  const region = params?.region || "internationale";
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
          Toutes les actualites IA agregees en temps reel. Basculez entre presse
          internationale et francaise. Mis a jour toutes les heures.
        </p>
      </div>

      {/* Region Tabs */}
      <div className="mb-6">
        <Suspense fallback={null}>
          <RegionTabs />
        </Suspense>
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
        <ArticleGrid region={region} categorie={categorie} />
      </Suspense>
    </div>
  );
}
