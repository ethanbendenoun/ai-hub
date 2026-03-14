"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
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
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "bg-card border border-card-border text-muted hover:border-accent/30 hover:text-foreground"
            }`}
          >
            {iconMap[cat.icon]}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
