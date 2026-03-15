import Link from "next/link";
import { Zap, ArrowRight, Flame, BookOpen, Play, Clock, ExternalLink, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import VideoCard from "@/components/videos/VideoCard";
import { getArticles, getProductArticles } from "@/lib/rss";
import { getAllGuides } from "@/lib/guides";
import { CURATED_VIDEOS, CATEGORIES } from "@/lib/constants";

export const revalidate = 3600;

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffHours / 24);
  if (diffHours < 1) return "A l'instant";
  if (diffHours < 24) return `il y a ${diffHours}h`;
  if (diffDays < 7) return `il y a ${diffDays}j`;
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getArticles>> = [];
  let productArticles: Awaited<ReturnType<typeof getProductArticles>> = [];
  try { articles = await getArticles(); productArticles = await getProductArticles(); } catch { articles = []; productArticles = []; }
  const guides = getAllGuides();
  const impactArticles = articles.filter((a) => a.isImpact).slice(0, 5);
  const latestArticles = articles.slice(0, 8);
  const featured = impactArticles[0] || latestArticles[0];
  const sideArticles = (impactArticles.length > 1 ? impactArticles.slice(1, 4) : latestArticles.slice(1, 4));

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10">

      {/* ═══ MASTHEAD ═══ */}
      <header className="mb-12 text-center">
        <p className="section-label mb-3">Newsletter educative</p>
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
          AI <span className="gradient-text">Hub</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
          L&apos;essentiel de l&apos;IA, commente et synthetise. Maitrisez les modeles, les agents et les outils qui comptent.
        </p>
      </header>

      <div className="section-divider" />

      {/* ═══ A LA UNE — Featured + sidebar ═══ */}
      {featured && (
        <section className="mb-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame size={20} className="text-warning" />
              <h2 className="text-2xl font-bold">A la une</h2>
            </div>
            <Link href="/flash" className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              Tous les flash <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Featured article — large */}
            <a href={featured.url} target="_blank" rel="noopener noreferrer" className="editorial-card lg:col-span-3 group block overflow-hidden">
              {featured.imageUrl && (
                <div className="aspect-[16/9] overflow-hidden rounded-t-2xl bg-card-inner">
                  <img src={featured.imageUrl} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="p-6 lg:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: featured.sourceColor }}>{featured.sourceIcon}</span>
                  <span className="text-sm font-medium">{featured.source}</span>
                  <span className="text-sm text-muted-foreground">· {timeAgo(featured.publishedAt)}</span>
                  {featured.isImpact && <Badge variant="impact"><Flame size={11} />Impact</Badge>}
                </div>
                <h3 className="mb-4 text-2xl font-bold leading-tight group-hover:text-accent transition-colors lg:text-3xl">
                  {featured.title}
                </h3>
                <p className="mb-5 text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {featured.summary}
                </p>
                {featured.summaryFr && (
                  <div className="ai-commentary">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                      <Sparkles size={12} /> Analyse IA
                    </div>
                    <p className="text-[15px] leading-relaxed text-muted-foreground">{featured.summaryFr}</p>
                  </div>
                )}
              </div>
            </a>

            {/* Side articles */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              {sideArticles.map((a) => (
                <a key={a.slug} href={a.url} target="_blank" rel="noopener noreferrer" className="editorial-card group flex flex-col p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: a.sourceColor }}>{a.sourceIcon}</span>
                    <span className="text-sm text-muted-foreground">{a.source}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{timeAgo(a.publishedAt)}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold leading-snug group-hover:text-accent transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-2">{a.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {a.isImpact && <Badge variant="impact"><Flame size={10} />Impact</Badge>}
                    {a.categories.slice(0, 2).map((catId) => {
                      const cat = CATEGORIES.find((c) => c.id === catId);
                      return cat ? <Badge key={catId} variant="accent">{cat.label}</Badge> : null;
                    })}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* ═══ VIDEOS — Canvas podcast section style ═══ */}
      <section className="mb-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Play size={20} className="text-accent" />
            <h2 className="text-2xl font-bold">Videos a voir</h2>
          </div>
          <Link href="/videos" className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
            Toutes les videos <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CURATED_VIDEOS.slice(0, 3).map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ DERNIERES ACTUS — editorial list ═══ */}
      <section className="mb-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-accent" />
            <h2 className="text-2xl font-bold">Fil d&apos;actualites</h2>
          </div>
          <Link href="/presse" className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
            Toute la presse <ArrowRight size={14} />
          </Link>
        </div>

        <div className="space-y-0">
          {latestArticles.slice(0, 6).map((a) => (
            <a key={a.slug} href={a.url} target="_blank" rel="noopener noreferrer" className="flash-item group flex gap-5 items-start">
              <div className="flex-1 min-w-0">
                <div className="mb-1.5 flex items-center gap-2 flex-wrap">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: a.sourceColor }}>{a.sourceIcon}</span>
                  <span className="text-sm font-medium">{a.source}</span>
                  {a.region === "france" && <span className="text-xs">FR</span>}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={11} />{timeAgo(a.publishedAt)}
                  </span>
                  {a.isImpact && <Badge variant="impact"><Flame size={10} />Impact</Badge>}
                </div>
                <h3 className="mb-1.5 text-xl font-bold leading-snug group-hover:text-accent transition-colors">
                  {a.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground line-clamp-2">{a.summary}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {a.categories.slice(0, 3).map((catId) => {
                    const cat = CATEGORIES.find((c) => c.id === catId);
                    return cat ? <Badge key={catId} variant="accent">{cat.label}</Badge> : null;
                  })}
                </div>
              </div>
              <ExternalLink size={16} className="mt-2 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ PRODUITS IA — product news ═══ */}
      {productArticles.length > 0 && (
        <section className="mb-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles size={20} className="text-blue-500" />
              <h2 className="text-2xl font-bold">News Produits</h2>
            </div>
            <Link href="/produits" className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productArticles.slice(0, 3).map((a) => (
              <a key={a.slug} href={a.url} target="_blank" rel="noopener noreferrer" className="editorial-card group p-5 block">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: a.sourceColor }}>{a.sourceIcon}</span>
                  <div>
                    <span className="text-sm font-medium">{a.source}</span>
                    {a.product && <span className="ml-2 text-xs text-muted-foreground">· {a.product}</span>}
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-bold leading-snug group-hover:text-accent transition-colors">{a.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-3">{a.summary}</p>
              </a>
            ))}
          </div>

          <div className="section-divider" />
        </section>
      )}

      {/* ═══ GUIDES — Canvas table of contents style ═══ */}
      <section className="mb-4">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={20} className="text-success" />
            <h2 className="text-2xl font-bold">Guides &amp; Tutoriels</h2>
          </div>
          <Link href="/decouverte" className="flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
            Tous les guides <ArrowRight size={14} />
          </Link>
        </div>

        <div className="editorial-card overflow-hidden">
          {guides.slice(0, 6).map((g, i) => (
            <Link key={g.slug} href={`/decouverte/${g.slug}`} className="group flex items-center gap-5 border-b border-card-border px-6 py-5 last:border-b-0 hover:bg-card-inner transition-colors">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold group-hover:text-accent transition-colors">{g.title}</h3>
                <p className="text-[15px] text-muted-foreground truncate">{g.description}</p>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <Badge variant={g.difficulty === "debutant" ? "success" : g.difficulty === "intermediaire" ? "accent" : "impact"}>
                  {g.difficulty}
                </Badge>
                <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
