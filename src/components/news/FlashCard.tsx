import { Zap, ArrowRight, Flame, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LikeButtons from "@/components/news/LikeButtons";
import { CATEGORIES } from "@/lib/constants";
import type { Article } from "@/lib/types";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
}

export default function FlashCard({ article, index }: { article: Article; index: number }) {
  const displaySummary = article.summaryFr || article.summary;

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <div className="editorial-card group flex flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
              <Zap size={15} className="text-accent" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">Flash</span>
            <span className="text-sm text-muted-foreground">· {article.source}</span>
            {article.region === "france" && <span className="text-xs">FR</span>}
          </div>
          <span className="text-sm text-muted-foreground">{formatDate(article.publishedAt)}</span>
        </div>
        <h3 className="mb-3 text-2xl font-bold leading-tight group-hover:text-accent transition-colors">{article.title}</h3>
        <div className="ai-commentary mb-4">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            <Sparkles size={12} />Synthese IA
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{displaySummary}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {article.isImpact && <Badge variant="impact"><Flame size={11} />Fort Impact</Badge>}
          {article.categories.slice(0, 2).map((catId) => {
            const cat = CATEGORIES.find((c) => c.id === catId);
            return cat ? <Badge key={catId} variant="accent">{cat.label}</Badge> : null;
          })}
          <div className="ml-auto flex items-center gap-1">
            <LikeButtons url={article.url} categories={article.categories} source={article.source} />
            <span className="flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Lire <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
