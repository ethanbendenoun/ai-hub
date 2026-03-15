"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Layers,
  Bot,
  Brain,
  Wrench,
  TrendingUp,
  FlaskConical,
  Github,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={14} />,
  Bot: <Bot size={14} />,
  Brain: <Brain size={14} />,
  Wrench: <Wrench size={14} />,
  TrendingUp: <TrendingUp size={14} />,
  FlaskConical: <FlaskConical size={14} />,
  Github: <Github size={14} />,
};

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("categorie") || "all";

  const handleFilter = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("categorie");
    } else {
      params.set("categorie", id);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = current === cat.id;
        return (
          <Button
            key={cat.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilter(cat.id)}
            className={cn(
              "rounded-full gap-1.5",
              isActive && "shadow-lg shadow-accent/25"
            )}
          >
            {iconMap[cat.icon]}
            {cat.label}
          </Button>
        );
      })}
    </div>
  );
}
