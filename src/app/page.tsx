import Link from "next/link";
import { Zap, Newspaper, BookOpen, ArrowRight, Flame, Bot, Sparkles, TrendingUp, Box, Heart, BarChart3 } from "lucide-react";
import ArticleCard from "@/components/news/ArticleCard";
import GuideCard from "@/components/guides/GuideCard";
import { getArticles, getProductArticles } from "@/lib/rss";
import { getAllGuides } from "@/lib/guides";
import { CATEGORIES } from "@/lib/constants";

export const revalidate = 3600;

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getArticles>> = [];
  let productArticles: Awaited<ReturnType<typeof getProductArticles>> = [];
  try { articles = await getArticles(); productArticles = await getProductArticles(); } catch { articles = []; productArticles = []; }
  const guides = getAllGuides();
  const impactArticles = articles.filter((a) => a.isImpact).slice(0, 3);
  const latestArticles = articles.slice(0, 6);
  const frenchCount = articles.filter((a) => a.region === "france").length;
  const intlCount = articles.filter((a) => a.region === "international").length;

  const catStats = CATEGORIES.filter((c) => c.id !== "all")
    .map((cat) => ({ ...cat, count: articles.filter((a) => a.categories.includes(cat.id)).length }))
    .sort((a, b) => b.count - a.count).slice(0, 6);
  const maxCat = Math.max(...catStats.map((c) => c.count), 1);

  // Simulated chart data (bar heights based on category distribution)
  const chartBars = catStats.map((c) => Math.max(Math.round((c.count / maxCat) * 100), 8));

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      {/* ═══ TOP ROW: Title + Stats ═══ */}
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tableau de bord <span className="gradient-text">IA</span>
          </h1>
          <p className="mt-2 text-muted">
            Votre veille IA personnalisee — mis a jour toutes les heures
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-2xl bg-card border border-card-border px-4 py-2">
            <span className="pulse-dot h-2.5 w-2.5 rounded-full dot-live" />
            <span className="text-sm font-medium">{articles.length} articles</span>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-card border border-card-border px-4 py-2">
            <Flame size={14} className="text-warning" />
            <span className="text-sm font-medium">{impactArticles.length} impacts</span>
          </div>
        </div>
      </div>

      {/* ═══ STATS ROW (4 cards Nixtio style) ═══ */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10">
              <Newspaper size={18} className="text-accent" />
            </div>
            <span className="text-xs text-muted">Live</span>
          </div>
          <div className="text-3xl font-extrabold">{articles.length}</div>
          <p className="mt-1 text-sm text-muted">Articles agreges</p>
          <div className="mt-3 flex gap-3 text-xs text-muted">
            <span>🌍 {intlCount}</span><span>🇫🇷 {frenchCount}</span>
          </div>
        </div>

        <div className="rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10">
              <Flame size={18} className="text-warning" />
            </div>
            <span className="text-xs text-warning font-medium">Hot</span>
          </div>
          <div className="text-3xl font-extrabold">{impactArticles.length}</div>
          <p className="mt-1 text-sm text-muted">A fort impact</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-card-inner">
            <div className="h-full rounded-full bg-gradient-to-r from-warning to-orange-500" style={{ width: `${articles.length > 0 ? Math.round((impactArticles.length / articles.length) * 100) : 0}%` }} />
          </div>
        </div>

        <div className="rounded-[20px] border border-card-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10">
              <Box size={18} className="text-blue-500" />
            </div>
            <span className="text-xs text-muted">Products</span>
          </div>
          <div className="text-3xl font-extrabold">{productArticles.length}</div>
          <p className="mt-1 text-sm text-muted">News produits</p>
          <p className="mt-3 text-xs text-muted">Claude, GPT, Gemini...</p>
        </div>

        {/* Gradient card like Nixtio +278k */}
        <div className="gradient-card flex flex-col justify-between rounded-[20px] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
              <BookOpen size={18} />
            </div>
            <span className="text-xs font-medium opacity-80">Guides</span>
          </div>
          <div className="text-4xl font-extrabold">{guides.length}</div>
          <p className="mt-1 text-sm opacity-80">Guides &amp; tutos</p>
        </div>
      </div>

      {/* ═══ CHART + PERSONALIZATION ROW ═══ */}
      <div className="mb-8 grid gap-4 lg:grid-cols-3">
        {/* Chart card (Nixtio style area chart simulation) */}
        <div className="rounded-[20px] border border-card-border bg-card p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-accent" />
              <h3 className="font-bold">Repartition</h3>
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-card-inner p-0.5">
              <span className="rounded-lg bg-accent px-3 py-1 text-xs font-medium text-white">Categories</span>
              <span className="rounded-lg px-3 py-1 text-xs text-muted">Sources</span>
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-3 h-32">
            {catStats.map((cat, i) => (
              <div key={cat.id} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full bar-purple transition-all" style={{ height: `${chartBars[i]}%` }} />
                <span className="text-[10px] text-muted text-center leading-tight">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personalization */}
        <div className="rounded-[20px] border border-accent/15 bg-gradient-to-br from-accent/5 to-accent/[0.02] p-6">
          <Heart size={22} className="mb-4 text-accent" />
          <h3 className="mb-2 text-lg font-bold">Personnalisez</h3>
          <p className="mb-4 text-sm leading-relaxed text-muted">
            Utilisez 👍 et 👎 sur chaque article. Votre flux deviendra de plus en plus pertinent.
          </p>
          <div className="flex gap-2">
            <span className="rounded-xl bg-success/10 px-3 py-1.5 text-xs font-medium text-success">👍 Plus</span>
            <span className="rounded-xl bg-danger/10 px-3 py-1.5 text-xs font-medium text-danger">👎 Moins</span>
          </div>
        </div>
      </div>

      {/* ═══ IMPACT ═══ */}
      {impactArticles.length > 0 && (
        <section className="mb-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10">
                <Flame size={18} className="text-warning" />
              </div>
              <h2 className="text-xl font-bold">A ne pas manquer</h2>
            </div>
            <Link href="/flash" className="flex items-center gap-1 rounded-xl bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors">
              Flash IA <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}

      {/* ═══ PRODUCTS ═══ */}
      {productArticles.length > 0 && (
        <section className="mb-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10">
                <Box size={18} className="text-blue-500" />
              </div>
              <h2 className="text-xl font-bold">News Produits</h2>
            </div>
            <Link href="/produits" className="flex items-center gap-1 rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500 hover:bg-blue-500/20 transition-colors">
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productArticles.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}

      {/* ═══ LATEST ═══ */}
      <section className="mb-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10">
              <Sparkles size={18} className="text-accent" />
            </div>
            <h2 className="text-xl font-bold">Dernieres actualites</h2>
          </div>
          <Link href="/presse" className="flex items-center gap-1 rounded-xl bg-accent/10 px-4 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-colors">
            Toute la presse <ArrowRight size={14} />
          </Link>
        </div>
        {latestArticles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        ) : (
          <div className="rounded-[20px] border border-card-border bg-card p-12 text-center">
            <Bot size={40} className="mx-auto mb-4 text-muted/30" />
            <p className="text-lg font-semibold">Chargement des flux...</p>
            <p className="mt-2 text-sm text-muted">Les donnees seront disponibles au prochain refresh.</p>
          </div>
        )}
      </section>

      {/* ═══ GUIDES ═══ */}
      <section className="mb-8">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/10">
              <TrendingUp size={18} className="text-success" />
            </div>
            <h2 className="text-xl font-bold">Guides &amp; Outils IA</h2>
          </div>
          <Link href="/decouverte" className="flex items-center gap-1 rounded-xl bg-success/10 px-4 py-2 text-sm font-medium text-success hover:bg-success/20 transition-colors">
            Tous les guides <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 6).map((g) => <GuideCard key={g.slug} guide={g} />)}
        </div>
      </section>
    </div>
  );
}
