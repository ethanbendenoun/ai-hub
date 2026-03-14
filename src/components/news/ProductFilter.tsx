"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCT_FILTERS } from "@/lib/constants";
import {
  Layers,
  Bot,
  Brain,
  Sparkles,
  Search,
  Code,
  Github,
  Link,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={14} />,
  Bot: <Bot size={14} />,
  Brain: <Brain size={14} />,
  Sparkles: <Sparkles size={14} />,
  Search: <Search size={14} />,
  Code: <Code size={14} />,
  Github: <Github size={14} />,
  Link: <Link size={14} />,
};

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("produit") || "all";

  const handleFilter = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("produit");
    } else {
      params.set("produit", id);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {PRODUCT_FILTERS.map((filter) => {
        const isActive = current === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => handleFilter(filter.id)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "bg-card border border-card-border text-muted hover:border-accent/30 hover:text-foreground"
            }`}
          >
            {iconMap[filter.icon]}
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
