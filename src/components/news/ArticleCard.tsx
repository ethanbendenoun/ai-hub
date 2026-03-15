import { ExternalLink, Flame, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <div className="editorial-card group flex flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: article.sourceColor }}>{article.sourceIcon}</span>
            <span className="text-sm font-medium">{article.source}</span>
            {article.region === "france" && <span className="text-xs">FR</span>}
          </div>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock size={12} />{timeAgo(article.publishedAt)}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold leading-snug group-hover:text-accent transition-colors">{article.title}</h3>
        <p className="mb-4 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-3">{article.summary}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {article.isImpact && <Badge variant="impact"><Flame size={11} />Impact</Badge>}
          {article.categories.slice(0, 2).map((catId) => {
            const cat = CATEGORIES.find((c) => c.id === catId);
            return cat ? <Badge key={catId} variant="accent">{cat.label}</Badge> : null;
          })}
          <div className="ml-auto flex items-center gap-1">
            <LikeButtons url={article.url} categories={article.categories} source={article.source} />
            <ExternalLink size={13} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </a>
  );
}
