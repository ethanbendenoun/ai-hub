import { Zap, ArrowRight, Flame } from "lucide-react";
import Badge from "@/components/ui/Badge";
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
  // Alternate gradient backgrounds for visual variety
  const gradients = [
    "from-indigo-500/10 to-purple-500/10 border-indigo-500/20",
    "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
    "from-orange-500/10 to-amber-500/10 border-orange-500/20",
    "from-pink-500/10 to-rose-500/10 border-pink-500/20",
    "from-cyan-500/10 to-blue-500/10 border-cyan-500/20",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card-hover group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 ${gradient}`}
    >
      {/* Flash indicator */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20">
            <Zap size={14} className="text-accent" />
          </div>
          <span className="text-xs font-medium text-muted">
            FLASH &bull; {article.source}
          </span>
        </div>
        <span className="text-xs text-muted">{formatDate(article.publishedAt)}</span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-lg font-bold leading-tight group-hover:text-accent">
        {article.title}
      </h3>

      {/* AI Summary - key points extracted from the summary */}
      <div className="mb-4 rounded-lg bg-background/50 p-4">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          <Zap size={12} />
          Resume IA
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">
          {article.summary}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        {article.isImpact && (
          <Badge variant="impact">
            <Flame size={12} />
            Fort Impact
          </Badge>
        )}
        {article.categories.slice(0, 2).map((catId) => {
          const cat = CATEGORIES.find((c) => c.id === catId);
          return cat ? (
            <Badge key={catId}>{cat.label}</Badge>
          ) : null;
        })}
        <span className="ml-auto flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
          Lire l&apos;article <ArrowRight size={12} />
        </span>
      </div>
    </a>
  );
}
