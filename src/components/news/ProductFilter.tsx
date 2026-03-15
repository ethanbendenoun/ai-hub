"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCT_FILTERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
          <Button
            key={filter.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilter(filter.id)}
            className={cn(
              "rounded-full gap-1.5",
              isActive && "shadow-lg shadow-accent/25"
            )}
          >
            {iconMap[filter.icon]}
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
