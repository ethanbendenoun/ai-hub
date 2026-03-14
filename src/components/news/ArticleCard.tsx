import { ExternalLink, Flame, Clock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import LikeButtons from "@/components/news/LikeButtons";
import { CATEGORIES } from "@/lib/constants";
import type { Article } from "@/lib/types";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 60) return `${diffMins}min`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}j`;
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group flex flex-col rounded-2xl border border-card-border bg-card p-5 transition-all"
    >
      {/* Source + time */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: article.sourceColor }}
          >
            {article.sourceIcon}
          </span>
          <div>
            <span className="text-xs font-semibold">{article.source}</span>
            {article.region === "france" && <span className="ml-1 text-xs">🇫🇷</span>}
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-foreground/5 px-2 py-0.5 text-xs text-muted">
          <Clock size={10} />
          {timeAgo(article.publishedAt)}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-[15px] font-semibold leading-snug group-hover:text-accent transition-colors">
        {article.title}
      </h3>

      {/* Summary */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
        {article.summary}
      </p>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-1.5">
        {article.isImpact && (
          <Badge variant="impact">
            <Flame size={11} />
            Impact
          </Badge>
        )}
        {article.categories.slice(0, 2).map((catId) => {
          const cat = CATEGORIES.find((c) => c.id === catId);
          return cat ? <Badge key={catId} variant="accent">{cat.label}</Badge> : null;
        })}
        <div className="ml-auto flex items-center gap-1">
          <LikeButtons url={article.url} categories={article.categories} source={article.source} />
          <ExternalLink size={13} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </a>
  );
}
