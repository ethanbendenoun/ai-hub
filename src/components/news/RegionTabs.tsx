"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Globe, MapPin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RegionTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("region") || "internationale";

  const handleTab = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("region", value);
    params.delete("categorie");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={current} onValueChange={handleTab}>
      <TabsList className="rounded-xl border border-card-border bg-card p-1">
        <TabsTrigger
          value="internationale"
          className="rounded-lg px-5 py-2.5 text-sm font-semibold data-active:bg-accent data-active:text-white data-active:shadow-lg data-active:shadow-accent/25"
        >
          <Globe size={14} className="mr-1.5" />
          Presse Internationale
        </TabsTrigger>
        <TabsTrigger
          value="france"
          className="rounded-lg px-5 py-2.5 text-sm font-semibold data-active:bg-accent data-active:text-white data-active:shadow-lg data-active:shadow-accent/25"
        >
          <MapPin size={14} className="mr-1.5" />
          Presse Française
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
