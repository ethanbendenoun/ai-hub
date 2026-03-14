"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Globe, MapPin } from "lucide-react";

const TABS = [
  { id: "internationale", label: "Internationale", icon: <Globe size={14} /> },
  { id: "france", label: "Française", icon: <MapPin size={14} /> },
];

export default function RegionTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("region") || "internationale";

  const handleTab = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("region", id);
    // Reset category when switching region
    params.delete("categorie");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-1 rounded-xl border border-card-border bg-card p-1">
      {TABS.map((tab) => {
        const isActive = current === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
              isActive
                ? "bg-accent text-white shadow-lg shadow-accent/25"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.icon}
            Presse {tab.label}
          </button>
        );
      })}
    </div>
  );
}
