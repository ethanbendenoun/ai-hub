import Link from "next/link";
import { Zap, Newspaper, BookOpen, ArrowRight, Flame, Bot, Sparkles, TrendingUp, Box, Heart, BarChart3, Activity, Globe, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  const chartBars = catStats.map((c) => Math.max(Math.round((c.count / maxCat) * 100), 8));

  // Source stats
  const sourceMap = new Map<string, number>();
  articles.forEach((a) => sourceMap.set(a.source, (sourceMap.get(a.source) || 0) + 1));
  const topSources = [...sourceMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">

      {/* ═══ HEADER: Nixtio style ═══ */}
      <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 glow-ring">
              <Activity size={20} className="text-accent" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tableau de bord <span className="gradient-text">IA</span>
            </h1>
          </div>
          <p className="text-muted-foreground">
            Votre veille IA personnalisee — mis a jour toutes les heures
          </p>
        </div>

        {/* Nixtio top-right pill bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-card border border-card-border px-4 py-2 shadow-sm">
            <span className="pulse-dot h-2 w-2 rounded-full dot-live" />
            <span className="text-sm font-semibold">{articles.length}</span>
            <span className="text-xs text-muted-foreground">articles</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-card border border-card-border px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full dot-warning" />
            <span className="text-sm font-semibold">{impactArticles.length}</span>
            <span className="text-xs text-muted-foreground">impacts</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-card border border-card-border px-4 py-2 shadow-sm">
            <Globe size={12} className="text-accent" />
            <span className="text-sm font-semibold">{intlCount}</span>
            <Separator orientation="vertical" className="h-3" />
            <MapPin size={12} className="text-accent" />
            <span className="text-sm font-semibold">{frenchCount}</span>
          </div>
        </div>
      </div>

      {/* ═══ STATS GRID (Nixtio 4-card layout) ═══ */}
      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Articles card */}
        <div className="nixtio-card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10">
              <Newspaper size={20} className="text-accent" />
            </div>
            <Badge variant="accent">Live</Badge>
          </div>
          <div className="stat-number">{articles.length}</div>
          <p className="mt-2 text-sm text-muted-foreground">Articles agreges</p>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full dot-accent" />
              <span className="text-xs text-muted-foreground">{intlCount} intl</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full dot-live" />
              <span className="text-xs text-muted-foreground">{frenchCount} FR</span>
            </div>
          </div>
        </div>

        {/* Impact card */}
        <div className="nixtio-card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warning/10">
              <Flame size={20} className="text-warning" />
            </div>
            <Badge variant="impact">Hot</Badge>
          </div>
          <div className="stat-number">{impactArticles.length}</div>
          <p className="mt-2 text-sm text-muted-foreground">A fort impact</p>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-card-inner">
            <div className="h-full rounded-full bg-gradient-to-r from-warning to-orange-500 transition-all" style={{ width: `${articles.length > 0 ? Math.max(Math.round((impactArticles.length / articles.length) * 100), 5) : 0}%` }} />
          </div>
        </div>

        {/* Products card */}
        <div className="nixtio-card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10">
              <Box size={20} className="text-blue-500" />
            </div>
            <Badge>Products</Badge>
          </div>
          <div className="stat-number">{productArticles.length}</div>
          <p className="mt-2 text-sm text-muted-foreground">News produits</p>
          <div className="mt-4 flex gap-2">
            {["🟤", "🟢", "🔵", "🟣"].map((e, i) => (
              <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full bg-card-inner text-xs">{e}</span>
            ))}
          </div>
        </div>

        {/* Gradient card (Nixtio +278k style) */}
        <div className="gradient-card rounded-[20px] p-6 flex flex-col justify-between">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <BookOpen size={20} />
            </div>
            <span className="text-xs font-semibold opacity-80">Guides</span>
          </div>
          <div>
            <div className="stat-number">{guides.length}</div>
            <p className="mt-2 text-sm opacity-80">Guides &amp; tutos</p>
          </div>
          <div className="mt-4 flex -space-x-2">
            {["C", "P", "G", "M"].map((l, i) => (
              <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-xs font-bold">{l}</div>
            ))}
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 text-xs font-bold">+{guides.length - 4}</div>
          </div>
        </div>
      </div>

      {/* ═══ CHART + SIDEBAR (Nixtio 2/3 + 1/3 layout) ═══ */}
      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        {/* Chart card (Nixtio style) */}
        <div className="nixtio-card p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} className="text-accent" />
              <h3 className="font-bold">Repartition par categorie</h3>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-card-inner p-1">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-accent/25">Categories</span>
              <span className="rounded-full px-3 py-1 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Sources</span>
            </div>
          </div>

          {/* Bar chart with labels */}
          <div className="flex items-end gap-4 h-36 mb-2">
            {catStats.map((cat, i) => (
              <div key={cat.id} className="flex flex-1 flex-col items-center gap-2 group">
                <span className="text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">{cat.count}</span>
                <div className="w-full bar-purple transition-all group-hover:shadow-lg group-hover:shadow-accent/30" style={{ height: `${chartBars[i]}%` }} />
                <span className="text-[10px] text-muted-foreground text-center leading-tight">{cat.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full dot-accent" />
              <span>Categories detectees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 border-t border-dashed border-warning" />
              <span>Tendance impact</span>
            </div>
          </div>
        </div>

        {/* Right sidebar cards */}
        <div className="flex flex-col gap-5">
          {/* Top sources */}
          <div className="nixtio-card p-5 flex-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">Sources actives</h3>
            <div className="space-y-3">
              {topSources.map(([source, count], i) => (
                <div key={source} className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${i === 0 ? "dot-accent" : i === 1 ? "dot-live" : "dot-warning"}`} />
                  <span className="flex-1 text-sm font-medium truncate">{source}</span>
                  <span className="text-xs font-bold text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Personalization */}
          <div className="nixtio-card p-5" style={{ borderColor: "rgba(139,92,246,0.15)" }}>
            <Heart size={20} className="mb-3 text-accent" />
            <h3 className="mb-1 font-bold">Personnalisez</h3>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              Utilisez 👍 et 👎 sur chaque article pour affiner votre flux.
            </p>
            <div className="flex gap-2">
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">👍 Plus</span>
              <span className="rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger">👎 Moins</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ IMPACT ═══ */}
      {impactArticles.length > 0 && (
        <section className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/10 glow-ring">
                <Flame size={18} className="text-warning" />
              </div>
              <div>
                <h2 className="text-xl font-bold">A ne pas manquer</h2>
                <p className="text-xs text-muted-foreground">Articles a fort impact cette semaine</p>
              </div>
            </div>
            <Link href="/flash" className="flex items-center gap-1.5 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent/30 hover:text-accent transition-all">
              Flash IA <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {impactArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}

      {/* ═══ PRODUCTS ═══ */}
      {productArticles.length > 0 && (
        <section className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 glow-ring">
                <Box size={18} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">News Produits</h2>
                <p className="text-xs text-muted-foreground">Directement des blogs officiels</p>
              </div>
            </div>
            <Link href="/produits" className="flex items-center gap-1.5 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent/30 hover:text-accent transition-all">
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productArticles.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}

      {/* ═══ LATEST ═══ */}
      <section className="mb-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 glow-ring">
              <Sparkles size={18} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Dernieres actualites</h2>
              <p className="text-xs text-muted-foreground">Flux agrege en temps reel</p>
            </div>
          </div>
          <Link href="/presse" className="flex items-center gap-1.5 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent/30 hover:text-accent transition-all">
            Toute la presse <ArrowRight size={14} />
          </Link>
        </div>
        {latestArticles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <CardContent className="p-0">
              <Bot size={40} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg font-semibold">Chargement des flux...</p>
              <p className="mt-2 text-sm text-muted-foreground">Les donnees seront disponibles au prochain refresh.</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* ═══ GUIDES ═══ */}
      <section className="mb-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/10 glow-ring">
              <TrendingUp size={18} className="text-success" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Guides &amp; Outils IA</h2>
              <p className="text-xs text-muted-foreground">Maitrisez les outils qui comptent</p>
            </div>
          </div>
          <Link href="/decouverte" className="flex items-center gap-1.5 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-accent/30 hover:text-accent transition-all">
            Tous les guides <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.slice(0, 6).map((g) => <GuideCard key={g.slug} guide={g} />)}
        </div>
      </section>
    </div>
  );
}
