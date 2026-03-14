import { Suspense } from "react";
import { Zap, TrendingUp, Target, BarChart3, Heart } from "lucide-react";
import FlashCard from "@/components/news/FlashCard";
import { getFlashArticles, getArticles } from "@/lib/rss";
import { CATEGORIES } from "@/lib/constants";

export const revalidate = 3600;

export const metadata = {
  title: "Flash IA",
  description: "Les actualites IA a fort impact, resumees en francais",
};

async function FlashContent() {
  let flashArticles: Awaited<ReturnType<typeof getFlashArticles>> = [];
  let allArticles: Awaited<ReturnType<typeof getArticles>> = [];
  try {
    flashArticles = await getFlashArticles();
    allArticles = await getArticles();
  } catch {
    flashArticles = [];
    allArticles = [];
  }

  const categoryStats = CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
    const count = allArticles.filter((a) =>
      a.categories.includes(cat.id)
    ).length;
    return { ...cat, count };
  }).sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...categoryStats.map((c) => c.count), 1);

  return (
    <>
      {/* Info banner */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
        <Heart size={20} className="mt-0.5 shrink-0 text-accent" />
        <div>
          <p className="text-sm font-semibold">Personnalisez votre flux</p>
          <p className="text-xs text-muted">
            Utilisez les boutons 👍/👎 sur les articles pour indiquer ce qui vous interesse.
            Avec le temps, votre flux deviendra de plus en plus pertinent.
          </p>
        </div>
      </div>

      {/* Stats overview */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-card-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Target size={18} className="text-accent" />
            <span className="text-sm font-semibold">Articles a impact</span>
          </div>
          <div className="text-3xl font-bold">{flashArticles.length}</div>
          <p className="mt-1 text-xs text-muted">
            Sur {allArticles.length} articles total — on garde que l&apos;essentiel
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-success" />
            <span className="text-sm font-semibold">Top categorie</span>
          </div>
          <div className="text-3xl font-bold">
            {categoryStats[0]?.label || "N/A"}
          </div>
          <p className="mt-1 text-xs text-muted">
            {categoryStats[0]?.count || 0} articles
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 size={18} className="text-warning" />
            <span className="text-sm font-semibold">Sources actives</span>
          </div>
          <div className="text-3xl font-bold">
            {new Set(allArticles.map((a) => a.source)).size}
          </div>
          <p className="mt-1 text-xs text-muted">Flux RSS surveilles (FR + International)</p>
        </div>
      </div>

      {/* Category distribution chart */}
      <div className="mb-10 rounded-xl border border-card-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Repartition par categorie
        </h3>
        <div className="space-y-3">
          {categoryStats.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium">{cat.label}</span>
              <div className="flex-1">
                <div className="h-6 overflow-hidden rounded-full bg-background">
                  <div
                    className="flex h-full items-center rounded-full bg-gradient-to-r from-accent to-accent-light px-3 text-xs font-bold text-white transition-all duration-500"
                    style={{
                      width: `${Math.max((cat.count / maxCount) * 100, 8)}%`,
                    }}
                  >
                    {cat.count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flash cards */}
      {flashArticles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {flashArticles.map((article, i) => (
            <FlashCard
              key={article.slug + article.url}
              article={article}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-card-border bg-card p-12 text-center text-muted">
          <Zap size={40} className="mx-auto mb-4 text-warning" />
          <p className="text-lg font-medium">Pas de Flash pour le moment</p>
          <p className="mt-2 text-sm">
            Les articles a fort impact apparaitront ici automatiquement, resumes en francais.
          </p>
        </div>
      )}
    </>
  );
}

export default function FlashPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
            <Zap size={20} className="text-warning" />
          </div>
          <h1 className="text-3xl font-extrabold">Flash IA</h1>
        </div>
        <p className="text-muted">
          Seulement les news a fort impact, resumees en francais. Pas de bruit, que l&apos;essentiel
          pour rester informe sans se surcharger.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-xl border border-card-border bg-card"
              />
            ))}
          </div>
        }
      >
        <FlashContent />
      </Suspense>
    </div>
  );
}
