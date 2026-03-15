"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  likeArticle,
  dislikeArticle,
  removeReaction,
  getArticleStatus,
} from "@/lib/likes";

interface LikeButtonsProps {
  url: string;
  categories: string[];
  source: string;
}

export default function LikeButtons({ url, categories, source }: LikeButtonsProps) {
  const [status, setStatus] = useState<"liked" | "disliked" | null>(null);

  useEffect(() => {
    setStatus(getArticleStatus(url));
  }, [url]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "liked") {
      removeReaction(url);
      setStatus(null);
    } else {
      likeArticle(url, categories, source);
      setStatus("liked");
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "disliked") {
      removeReaction(url);
      setStatus(null);
    } else {
      dislikeArticle(url, categories, source);
      setStatus("disliked");
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleLike}
        className={cn(
          "rounded-lg",
          status === "liked"
            ? "bg-green-500/20 text-green-500 scale-110"
            : "text-muted-foreground/50 hover:text-green-500 hover:bg-green-500/10"
        )}
        title="J'aime ce type de contenu"
      >
        <ThumbsUp size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={handleDislike}
        className={cn(
          "rounded-lg",
          status === "disliked"
            ? "bg-red-500/20 text-red-500 scale-110"
            : "text-muted-foreground/50 hover:text-red-500 hover:bg-red-500/10"
        )}
        title="Moins de ce contenu"
      >
        <ThumbsDown size={14} />
      </Button>
    </div>
  );
}
