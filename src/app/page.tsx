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
} from "lucide-react";
import ArticleCard from "@/components/news/ArticleCard";
import GuideCard from "@/components/guides/GuideCard";
import { getArticles } from "@/lib/rss";
import { getAllGuides } from "@/lib/guides";

export const revalidate = 3600;

export default async function HomePage() {
  let articles: Awaited<ReturnType<typeof getArticles>> = [];
  try {
    articles = await getArticles();
  } catch {
    articles = [];
  }
  const guides = getAllGuides();
  const impactArticles = articles.filter((a) => a.isImpact).slice(0, 3);
  const latestArticles = articles.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24">
        {/* Background glow */}
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
            Presse, Flash, Decouverte &mdash; Toute l&apos;actu IA analysee,
            les meilleurs outils decryptes, et des guides pour exploiter les
            agents IA a leur plein potentiel.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/presse"
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              <Newspaper size={18} />
              Explorer la Presse IA
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
            label: "Articles",
          },
          {
            icon: <Flame size={20} />,
            value: `${impactArticles.length}`,
            label: "Impacts forts",
          },
          {
            icon: <BookOpen size={20} />,
            value: `${guides.length}`,
            label: "Guides",
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
                <p className="text-sm text-muted">Les news a fort impact</p>
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

      {/* Latest News */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <Sparkles size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Dernieres actualites</h2>
              <p className="text-sm text-muted">Flux RSS en temps reel</p>
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
