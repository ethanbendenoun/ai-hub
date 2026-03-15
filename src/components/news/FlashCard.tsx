import { Zap, ArrowRight, Flame } from "lucide-react";
import Badge from "@/components/ui/Badge";
import LikeButtons from "@/components/news/LikeButtons";
import { CATEGORIES } from "@/lib/constants";
import type { Article } from "@/lib/types";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function FlashCard({ article, index }: { article: Article; index: number }) {
  const displaySummary = article.summaryFr || article.summary;

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer"
      className="card-hover group flex flex-col rounded-[20px] border border-card-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15">
            <Zap size={15} className="text-accent" />
          </div>
          <span className="text-sm font-semibold">FLASH</span>
          <span className="text-xs text-muted">· {article.source}</span>
          {article.region === "france" && <span className="text-xs">🇫🇷</span>}
        </div>
        <span className="text-xs text-muted">{formatDate(article.publishedAt)}</span>
      </div>
      <h3 className="mb-3 text-lg font-bold leading-tight group-hover:text-accent transition-colors">{article.title}</h3>
      <div className="mb-4 rounded-2xl bg-card-inner p-4">
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          <Zap size={11} />Resume FR
        </div>
        <p className="text-sm leading-relaxed text-muted">{displaySummary}</p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {article.isImpact && <Badge variant="impact"><Flame size={11} />Fort Impact</Badge>}
        {article.categories.slice(0, 2).map((catId) => {
          const cat = CATEGORIES.find((c) => c.id === catId);
          return cat ? <Badge key={catId} variant="accent">{cat.label}</Badge> : null;
        })}
        <div className="ml-auto flex items-center gap-1">
          <LikeButtons url={article.url} categories={article.categories} source={article.source} />
          <span className="flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            Lire <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}
