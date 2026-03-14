import Link from "next/link";
import {
  Zap, Newspaper, BookOpen, ArrowRight, Flame, Bot,
  Sparkles, TrendingUp, Box, Heart, Activity, BarChart3,
} from "lucide-react";
import ArticleCard from "@/components/news/ArticleCard";
import GuideCard from "@/components/guides/GuideCard";
import { getArticles, getProductArticles } from "@/lib/rss";
import { getAllGuides } from "@/lib/guides";
import { CATEGORIES } from "@/lib/constants";

export const revalidate = 3600;

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getArticles>> = [];
  let productArticles: Awaited<ReturnType<typeof getProductArticles>> = [];
  try {
    articles = await getArticles();
    productArticles = await getProductArticles();
  } catch {
    articles = [];
    productArticles = [];
  }
  const guides = getAllGuides();
  const impactArticles = articles.filter((a) => a.isImpact).slice(0, 3);
  const latestArticles = articles.slice(0, 6);
  const frenchCount = articles.filter((a) => a.region === "france").length;
  const intlCount = articles.filter((a) => a.region === "international").length;

  // Category stats for the mini chart
  const catStats = CATEGORIES.filter((c) => c.id !== "all")
    .map((cat) => ({
      ...cat,
      count: articles.filter((a) => a.categories.includes(cat.id)).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const maxCat = Math.max(...catStats.map((c) => c.count), 1);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* ═══ HERO ═══ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="orb absolute left-[15%] top-[20%] h-[350px] w-[350px] rounded-full bg-accent/8 blur-[120px]" />
          <div className="orb-2 absolute right-[10%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/8 blur-[120px]" />
        </div>

        <div className="relative">
          {/* Status pill */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
              <span className="pulse-dot flex h-2 w-2 rounded-full bg-success" />
              <Activity size={14} />
              Veille active — mis a jour toutes les heures
            </div>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl text-center text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl">
            Votre QG pour{" "}
            <span className="gradient-text">l&apos;intelligence artificielle</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted sm:text-xl">
            Presse internationale &amp; francaise. Flash a fort impact.
            News produits. Guides experts. Le tout personnalisable.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/flash"
              className="group flex items-center gap-2 rounded-2xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-xl shadow-accent/20 transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              <Zap size={17} />
              Flash IA
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/produits"
              className="flex items-center gap-2 rounded-2xl border border-card-border bg-card px-7 py-3.5 text-[15px] font-semibold transition-all hover:border-accent/30 hover:-translate-y-0.5"
            >
              <Box size={17} />
              Produits IA
            </Link>
            <Link
              href="/decouverte"
              className="flex items-center gap-2 rounded-2xl border border-card-border bg-card px-7 py-3.5 text-[15px] font-semibold transition-all hover:border-accent/30 hover:-translate-y-0.5"
            >
              <BookOpen size={17} />
              Guides
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ DASHBOARD STATS ═══ */}
      <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-purple rounded-2xl border border-card-border p-5">
          <div className="mb-3 flex items-center justify-between">
            <Newspaper size={18} className="text-accent" />
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">Live</span>
          </div>
          <div className="text-3xl font-extrabold">{articles.length}</div>
          <p className="mt-0.5 text-sm text-muted">Articles agreges</p>
          <div className="mt-3 flex gap-2 text-xs text-muted">
            <span>🌍 {intlCount} intl</span>
            <span>🇫🇷 {frenchCount} fr</span>
          </div>
        </div>

        <div className="stat-orange rounded-2xl border border-card-border p-5">
          <div className="mb-3 flex items-center justify-between">
            <Flame size={18} className="text-warning" />
            <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">Hot</span>
          </div>
          <div className="text-3xl font-extrabold">{impactArticles.length}</div>
          <p className="mt-0.5 text-sm text-muted">A fort impact</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-foreground/5">
            <div
              className="progress-bar h-full bg-gradient-to-r from-warning to-orange-400"
              style={{ width: `${articles.length > 0 ? (impactArticles.length / articles.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="stat-blue rounded-2xl border border-card-border p-5">
          <div className="mb-3 flex items-center justify-between">
            <Box size={18} className="text-blue-500" />
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-500">Products</span>
          </div>
          <div className="text-3xl font-extrabold">{productArticles.length}</div>
          <p className="mt-0.5 text-sm text-muted">News produits</p>
          <p className="mt-3 text-xs text-muted">Claude, GPT, Gemini, Perplexity...</p>
        </div>

        <div className="stat-green rounded-2xl border border-card-border p-5">
          <div className="mb-3 flex items-center justify-between">
            <BookOpen size={18} className="text-success" />
            <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">Guides</span>
          </div>
          <div className="text-3xl font-extrabold">{guides.length}</div>
          <p className="mt-0.5 text-sm text-muted">Guides &amp; tutos</p>
          <p className="mt-3 text-xs text-muted">Setup agents, skills, profit...</p>
        </div>
      </section>

      {/* ═══ CATEGORY INSIGHTS (mini dashboard) ═══ */}
      <section className="mb-16 grid gap-4 lg:grid-cols-3">
        {/* Categories chart */}
        <div className="rounded-2xl border border-card-border bg-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-accent" />
            <h3 className="font-bold">Repartition par categorie</h3>
          </div>
          <div className="space-y-3">
            {catStats.map((cat) => (
              <div key={cat.id} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium">{cat.label}</span>
                <div className="flex-1">
                  <div className="h-7 overflow-hidden rounded-lg bg-foreground/5">
                    <div
                      className="progress-bar flex h-full items-center px-3 text-xs font-bold text-white"
                      style={{ width: `${Math.max((cat.count / maxCat) * 100, 10)}%` }}
                    >
                      {cat.count}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personalization card */}
        <div className="rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/5 to-blue-500/5 p-6">
          <Heart size={24} className="mb-4 text-accent" />
          <h3 className="mb-2 text-lg font-bold">Personnalisez votre flux</h3>
          <p className="mb-4 text-sm leading-relaxed text-muted">
            Utilisez les boutons 👍 et 👎 sur chaque article pour indiquer vos
            centres d&apos;interet. Votre flux deviendra de plus en plus pertinent.
          </p>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5 rounded-xl bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
              👍 J&apos;aime
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-danger/10 px-3 py-1.5 text-xs font-medium text-danger">
              👎 Moins
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMPACT NEWS ═══ */}
      {impactArticles.length > 0 && (
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10">
                <Flame size={18} className="text-warning" />
              </div>
              <div>
                <h2 className="text-xl font-bold">A ne pas manquer</h2>
                <p className="text-sm text-muted">Articles a fort impact</p>
              </div>
            </div>
            <Link href="/flash" className="flex items-center gap-1 rounded-full bg-accent/8 px-4 py-1.5 text-sm font-medium text-accent hover:bg-accent/15 transition-colors">
              Flash IA <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* ═══ PRODUCT NEWS ═══ */}
      {productArticles.length > 0 && (
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10">
                <Box size={18} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">News Produits</h2>
                <p className="text-sm text-muted">Claude, ChatGPT, Gemini, Perplexity, Cursor</p>
              </div>
            </div>
            <Link href="/produits" className="flex items-center gap-1 rounded-full bg-blue-500/8 px-4 py-1.5 text-sm font-medium text-blue-500 hover:bg-blue-500/15 transition-colors">
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* ═══ LATEST ═══ */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10">
              <Sparkles size={18} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Dernieres actualites</h2>
              <p className="text-sm text-muted">Presse internationale + francaise</p>
            </div>
          </div>
          <Link href="/presse" className="flex items-center gap-1 rounded-full bg-accent/8 px-4 py-1.5 text-sm font-medium text-accent hover:bg-accent/15 transition-colors">
            Toute la presse <ArrowRight size={14} />
          </Link>
        </div>
        {latestArticles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-card-border bg-card p-12 text-center">
            <Bot size={40} className="mx-auto mb-4 text-accent/40" />
            <p className="text-lg font-semibold">Chargement des flux RSS...</p>
            <p className="mt-2 text-sm text-muted">Les donnees seront disponibles au prochain cycle de refresh.</p>
          </div>
        )}
      </section>

      {/* ═══ GUIDES ═══ */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/10">
              <TrendingUp size={18} className="text-success" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Maitrisez vos outils IA</h2>
              <p className="text-sm text-muted">Guides, tutos, comparatifs</p>
            </div>
          </div>
          <Link href="/decouverte" className="flex items-center gap-1 rounded-full bg-success/8 px-4 py-1.5 text-sm font-medium text-success hover:bg-success/15 transition-colors">
            Tous les guides <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 6).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  );
}
