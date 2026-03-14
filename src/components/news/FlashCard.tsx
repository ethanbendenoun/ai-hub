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
  // Cyberpunk color schemes
  const schemes = [
    { border: "border-neon-cyan/30", bg: "from-neon-cyan/5 to-accent/5", glow: "shadow-[0_0_20px_rgba(0,240,255,0.05)]" },
    { border: "border-accent/30", bg: "from-accent/5 to-neon-pink/5", glow: "shadow-[0_0_20px_rgba(167,139,250,0.05)]" },
    { border: "border-neon-pink/30", bg: "from-neon-pink/5 to-accent/5", glow: "shadow-[0_0_20px_rgba(255,0,229,0.05)]" },
    { border: "border-neon-green/30", bg: "from-neon-green/5 to-neon-cyan/5", glow: "shadow-[0_0_20px_rgba(57,255,20,0.05)]" },
    { border: "border-warning/30", bg: "from-warning/5 to-accent/5", glow: "shadow-[0_0_20px_rgba(245,158,11,0.05)]" },
  ];
  const scheme = schemes[index % schemes.length];
  const displaySummary = article.summaryFr || article.summary;

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card-hover group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm ${scheme.border} ${scheme.bg} ${scheme.glow}`}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-accent/10 to-transparent" />

      {/* Flash indicator */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon-cyan/20 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            <Zap size={14} className="text-neon-cyan" />
          </div>
          <span className="font-mono text-xs font-medium text-muted">
            FLASH &bull; {article.source}
          </span>
          {article.region === "france" && <span className="text-xs">🇫🇷</span>}
        </div>
        <span className="font-mono text-xs text-muted">{formatDate(article.publishedAt)}</span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-lg font-bold leading-tight group-hover:text-neon-cyan transition-colors">
        {article.title}
      </h3>

      {/* AI Summary in French */}
      <div className="mb-4 rounded-lg border border-card-border/30 bg-background/50 p-4 backdrop-blur-sm">
        <div className="mb-2 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-neon-cyan">
          <Zap size={12} />
          Resume FR
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">
          {displaySummary}
        </p>
      </div>

      {/* Tags + like */}
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
            <Badge key={catId} variant="cyber">{cat.label}</Badge>
          ) : null;
        })}
        <div className="ml-auto flex items-center gap-1">
          <LikeButtons
            url={article.url}
            categories={article.categories}
            source={article.source}
          />
          <span className="flex items-center gap-1 font-mono text-xs font-medium text-neon-cyan opacity-0 transition-opacity group-hover:opacity-100">
            Lire <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}
