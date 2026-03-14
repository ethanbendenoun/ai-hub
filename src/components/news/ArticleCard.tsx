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

  if (diffMins < 60) return `il y a ${diffMins}min`;
  if (diffHours < 24) return `il y a ${diffHours}h`;
  if (diffDays < 7) return `il y a ${diffDays}j`;
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group flex flex-col rounded-xl border border-card-border bg-card p-5 transition-all"
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
            style={{ backgroundColor: article.sourceColor }}
          >
            {article.sourceIcon}
          </span>
          <span className="text-xs font-medium text-muted">
            {article.source}
          </span>
          {article.region === "france" && (
            <span className="text-xs">🇫🇷</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Clock size={12} />
          {timeAgo(article.publishedAt)}
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold leading-snug group-hover:text-accent">
        {article.title}
      </h3>

      {/* Summary */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {article.summary}
      </p>

      {/* Footer */}
      <div className="flex flex-wrap items-center gap-2">
        {article.isImpact && (
          <Badge variant="impact">
            <Flame size={12} />
            Impact
          </Badge>
        )}
        {article.categories.slice(0, 2).map((catId) => {
          const cat = CATEGORIES.find((c) => c.id === catId);
          return cat ? (
            <Badge key={catId} variant="accent">
              {cat.label}
            </Badge>
          ) : null;
        })}

        {/* Like buttons + external link */}
        <div className="ml-auto flex items-center gap-1">
          <LikeButtons
            url={article.url}
            categories={article.categories}
            source={article.source}
          />
          <ExternalLink
            size={14}
            className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
      </div>
    </a>
  );
}
