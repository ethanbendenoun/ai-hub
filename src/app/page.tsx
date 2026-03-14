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
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[400px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
            Veille IA en temps reel
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Restez en avance sur{" "}
            <span className="gradient-text">la revolution IA</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Presse, Flash, Produits, Decouverte &mdash; L&apos;essentiel de l&apos;actu IA
            sans surcharge. Likez les articles pour personnaliser votre flux.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/flash"
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              <Zap size={18} />
              Flash IA — L&apos;essentiel
            </Link>
            <Link
              href="/produits"
              className="flex items-center gap-2 rounded-xl border border-card-border bg-card px-6 py-3 font-semibold transition-all hover:border-accent/30 hover:-translate-y-0.5"
            >
              <Box size={18} />
              Produits IA
            </Link>
            <Link
              href="/decouverte"
              className="flex items-center gap-2 rounded-xl border border-card-border bg-card px-6 py-3 font-semibold transition-all hover:border-accent/30 hover:-translate-y-0.5"
            >
              <BookOpen size={18} />
              Guides &amp; Outils
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            icon: <Newspaper size={20} />,
            value: `${articles.length}+`,
            label: "Articles (FR + Intl)",
          },
          {
            icon: <Flame size={20} />,
            value: `${impactArticles.length}`,
            label: "Impacts forts",
          },
          {
            icon: <Box size={20} />,
            value: `${productArticles.length}`,
            label: "News produits",
          },
          {
            icon: <Bot size={20} />,
            value: "24/7",
            label: "Veille auto",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-xl border border-card-border bg-card p-4 text-center"
          >
            <div className="text-accent">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Personalization banner */}
      <section className="mb-16">
        <div className="flex items-start gap-4 rounded-xl border border-accent/20 bg-accent/5 p-6">
          <Heart size={24} className="mt-1 shrink-0 text-accent" />
          <div>
            <h3 className="text-lg font-bold">Personnalisez votre veille</h3>
            <p className="mt-1 text-sm text-muted">
              Utilisez les boutons 👍 et 👎 sur chaque article pour indiquer vos centres d&apos;interet.
              Avec le temps, AI Hub apprendra ce qui vous interesse le plus — agents IA, nouvelles
              releases, outils de productivite, monetisation...
            </p>
          </div>
        </div>
      </section>

      {/* Impact News */}
      {impactArticles.length > 0 && (
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                <Flame size={20} className="text-warning" />
              </div>
              <div>
                <h2 className="text-xl font-bold">A ne pas manquer</h2>
                <p className="text-sm text-muted">Les news a fort impact uniquement</p>
              </div>
            </div>
            <Link
              href="/flash"
              className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              Voir les Flash <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {impactArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Product news preview */}
      {productArticles.length > 0 && (
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                <Box size={20} className="text-purple-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">News Produits IA</h2>
                <p className="text-sm text-muted">Claude, ChatGPT, Gemini, Perplexity, Cursor...</p>
              </div>
            </div>
            <Link
              href="/produits"
              className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
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

      {/* Latest News */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <Sparkles size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Dernieres actualites</h2>
              <p className="text-sm text-muted">Presse internationale + francaise</p>
            </div>
          </div>
          <Link
            href="/presse"
            className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
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
          <div className="rounded-xl border border-card-border bg-card p-8 text-center text-muted">
            <Zap size={32} className="mx-auto mb-3 text-accent" />
            <p>Chargement des actualites en cours...</p>
            <p className="mt-1 text-xs">
              Les flux RSS seront disponibles au prochain refresh.
            </p>
          </div>
        )}
      </section>

      {/* Guides Section */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
              <TrendingUp size={20} className="text-success" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Maitrisez vos outils IA</h2>
              <p className="text-sm text-muted">
                Guides, tutos et comparatifs
              </p>
            </div>
          </div>
          <Link
            href="/decouverte"
            className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
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
