import { Zap, ArrowRight, Flame } from "lucide-react";
import Badge from "@/components/ui/Badge";
import LikeButtons from "@/components/news/LikeButtons";
import { CATEGORIES } from "@/lib/constants";
import type { Article } from "@/lib/types";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FlashCard({ article, index }: { article: Article; index: number }) {
  const colors = [
    { bg: "from-violet-500/8 to-blue-500/8", border: "border-violet-200 dark:border-violet-500/15" },
    { bg: "from-blue-500/8 to-cyan-500/8", border: "border-blue-200 dark:border-blue-500/15" },
    { bg: "from-emerald-500/8 to-teal-500/8", border: "border-emerald-200 dark:border-emerald-500/15" },
    { bg: "from-orange-500/8 to-amber-500/8", border: "border-orange-200 dark:border-orange-500/15" },
    { bg: "from-pink-500/8 to-rose-500/8", border: "border-pink-200 dark:border-pink-500/15" },
  ];
  const color = colors[index % colors.length];
  const displaySummary = article.summaryFr || article.summary;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card-hover group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 ${color.border} ${color.bg}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/10">
            <Zap size={15} className="text-accent" />
          </div>
          <div>
            <span className="text-xs font-semibold">FLASH</span>
            <span className="text-xs text-muted"> · {article.source}</span>
            {article.region === "france" && <span className="ml-1 text-xs">🇫🇷</span>}
          </div>
        </div>
        <span className="text-xs text-muted">{formatDate(article.publishedAt)}</span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-lg font-bold leading-tight group-hover:text-accent transition-colors">
        {article.title}
      </h3>

      {/* French summary */}
      <div className="mb-4 rounded-xl bg-card/60 backdrop-blur-sm p-4 border border-card-border/50">
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          <Zap size={11} />
          Resume FR
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">
          {displaySummary}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-1.5">
        {article.isImpact && (
          <Badge variant="impact"><Flame size={11} /> Fort Impact</Badge>
        )}
        {article.categories.slice(0, 2).map((catId) => {
          const cat = CATEGORIES.find((c) => c.id === catId);
          return cat ? <Badge key={catId} variant="accent">{cat.label}</Badge> : null;
        })}
        <div className="ml-auto flex items-center gap-1">
          <LikeButtons url={article.url} categories={article.categories} source={article.source} />
          <span className="flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Lire <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}
