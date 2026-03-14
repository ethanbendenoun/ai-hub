import Link from "next/link";
import {
  Zap,
  Newspaper,
  BookOpen,
  ArrowRight,
  Flame,
  Bot,
  Sparkles,
  TrendingUp,
  Box,
  Heart,
  Terminal,
  Activity,
} from "lucide-react";
import ArticleCard from "@/components/news/ArticleCard";
import GuideCard from "@/components/guides/GuideCard";
import { getArticles, getProductArticles } from "@/lib/rss";
import { getAllGuides } from "@/lib/guides";

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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* ═══ HERO ═══ */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        {/* Orb effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="orb absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[100px]" />
          <div className="orb-delayed absolute right-1/4 bottom-1/4 h-[250px] w-[250px] rounded-full bg-neon-cyan/10 blur-[100px]" />
          <div className="orb absolute right-1/3 top-1/3 h-[200px] w-[200px] rounded-full bg-neon-pink/5 blur-[80px]" />
        </div>

        <div className="relative text-center">
          {/* Status badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-1.5 font-mono text-sm font-medium text-neon-cyan backdrop-blur-sm">
            <span className="pulse-dot h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
            <Activity size={14} />
            SYSTEME ACTIF — VEILLE EN COURS
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl">
            Votre QG pour{" "}
            <span className="gradient-text">la revolution IA</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Presse. Flash. Produits. Decouverte. <br className="hidden sm:block" />
            L&apos;essentiel de l&apos;actu IA, sans bruit. Personnalisez votre flux.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/flash"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-neon-cyan px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all hover:shadow-[0_0_50px_rgba(0,240,255,0.3)] hover:-translate-y-0.5"
            >
              <Zap size={18} />
              Flash IA
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/produits"
              className="flex items-center gap-2 rounded-xl border border-accent/30 bg-card/50 backdrop-blur-sm px-7 py-3.5 font-semibold transition-all hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:-translate-y-0.5"
            >
              <Box size={18} />
              Produits IA
            </Link>
            <Link
              href="/decouverte"
              className="flex items-center gap-2 rounded-xl border border-card-border/50 bg-card/50 backdrop-blur-sm px-7 py-3.5 font-semibold transition-all hover:border-accent/30 hover:-translate-y-0.5"
            >
              <BookOpen size={18} />
              Guides
            </Link>
          </div>

          {/* Terminal preview */}
          <div className="mx-auto mt-16 max-w-xl">
            <div className="code-block overflow-hidden">
              <div className="flex items-center gap-2 border-b border-neon-cyan/10 px-4 py-2">
                <div className="h-3 w-3 rounded-full bg-danger/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
                <span className="ml-2 font-mono text-xs text-muted">ai-hub — terminal</span>
              </div>
              <div className="px-4 py-3 font-mono text-sm">
                <div className="text-neon-cyan">$ ai-hub status</div>
                <div className="mt-1 text-muted">
                  <span className="text-neon-green">✓</span> {articles.length} articles agreges
                </div>
                <div className="text-muted">
                  <span className="text-neon-green">✓</span> {impactArticles.length} articles a fort impact
                </div>
                <div className="text-muted">
                  <span className="text-neon-green">✓</span> {guides.length} guides disponibles
                </div>
                <div className="text-muted">
                  <span className="text-neon-green">✓</span> {productArticles.length} news produits
                </div>
                <div className="mt-1 text-neon-cyan cursor-blink">$ _</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { icon: <Newspaper size={20} />, value: `${articles.length}+`, label: "Articles FR + Intl", color: "text-neon-cyan" },
          { icon: <Flame size={20} />, value: `${impactArticles.length}`, label: "Impacts forts", color: "text-neon-pink" },
          { icon: <Box size={20} />, value: `${productArticles.length}`, label: "News produits", color: "text-accent" },
          { icon: <Bot size={20} />, value: "24/7", label: "Veille auto", color: "text-neon-green" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-xl border border-card-border/50 bg-card/60 backdrop-blur-sm p-5 text-center count-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className={stat.color}>{stat.icon}</div>
            <div className="font-mono text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ═══ PERSONALIZATION ═══ */}
      <section className="mb-16">
        <div className="flex items-start gap-4 rounded-xl border border-neon-cyan/20 bg-gradient-to-r from-neon-cyan/5 to-accent/5 p-6 backdrop-blur-sm">
          <Heart size={24} className="mt-1 shrink-0 text-neon-pink" />
          <div>
            <h3 className="text-lg font-bold">Personnalisez votre veille</h3>
            <p className="mt-1 text-sm text-muted">
              Utilisez les boutons 👍 et 👎 sur chaque article pour indiquer vos centres d&apos;interet.
              Avec le temps, AI Hub apprendra ce qui vous interesse — agents IA, releases, monetisation...
            </p>
          </div>
        </div>
      </section>

      {/* ═══ IMPACT NEWS ═══ */}
      {impactArticles.length > 0 && (
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-pink/10 shadow-[0_0_15px_rgba(255,0,229,0.1)]">
                <Flame size={20} className="text-neon-pink" />
              </div>
              <div>
                <h2 className="text-xl font-bold">A ne pas manquer</h2>
                <p className="font-mono text-xs text-muted">// high-impact only</p>
              </div>
            </div>
            <Link href="/flash" className="flex items-center gap-1 font-mono text-sm font-medium text-neon-cyan hover:underline">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 shadow-[0_0_15px_rgba(167,139,250,0.1)]">
                <Box size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold">News Produits IA</h2>
                <p className="font-mono text-xs text-muted">// claude, gpt, gemini, perplexity, cursor</p>
              </div>
            </div>
            <Link href="/produits" className="flex items-center gap-1 font-mono text-sm font-medium text-neon-cyan hover:underline">
              Tous les produits <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* ═══ LATEST NEWS ═══ */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <Sparkles size={20} className="text-neon-cyan" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Dernieres actualites</h2>
              <p className="font-mono text-xs text-muted">// presse internationale + francaise</p>
            </div>
          </div>
          <Link href="/presse" className="flex items-center gap-1 font-mono text-sm font-medium text-neon-cyan hover:underline">
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
          <div className="rounded-xl border border-card-border/50 bg-card/60 p-8 text-center text-muted backdrop-blur-sm">
            <Terminal size={32} className="mx-auto mb-3 text-neon-cyan" />
            <p className="font-mono text-sm">Initialisation des flux RSS...</p>
            <p className="mt-1 text-xs">Les donnees seront disponibles au prochain cycle.</p>
          </div>
        )}
      </section>

      {/* ═══ GUIDES ═══ */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-green/10 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
              <TrendingUp size={20} className="text-neon-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Maitrisez vos outils IA</h2>
              <p className="font-mono text-xs text-muted">// guides, tutos, comparatifs</p>
            </div>
          </div>
          <Link href="/decouverte" className="flex items-center gap-1 font-mono text-sm font-medium text-neon-cyan hover:underline">
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
