import Link from "next/link";
import {
  Terminal, MessageSquare, Search, Monitor, Cpu, DollarSign,
  ArrowRight, Star, Server, Sparkles,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Guide } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={22} />,
  MessageSquare: <MessageSquare size={22} />,
  Search: <Search size={22} />,
  Monitor: <Monitor size={22} />,
  Cpu: <Cpu size={22} />,
  DollarSign: <DollarSign size={22} />,
  Server: <Server size={22} />,
  Sparkles: <Sparkles size={22} />,
};

const diffLabels = {
  debutant: { label: "Debutant", variant: "success" as const },
  intermediaire: { label: "Intermediaire", variant: "warning" as const },
  avance: { label: "Avance", variant: "impact" as const },
};

export default function GuideCard({ guide }: { guide: Omit<Guide, "content"> }) {
  const diff = diffLabels[guide.difficulty];

  return (
    <Link
      href={`/decouverte/${guide.slug}`}
      className="card-hover group flex flex-col rounded-2xl border border-card-border bg-card p-6 transition-all"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/8 text-accent transition-all group-hover:bg-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/20">
          {iconMap[guide.icon] || <Star size={22} />}
        </div>
        <Badge variant={diff.variant}>{diff.label}</Badge>
      </div>

      {/* Title */}
      <h3 className="mb-1 text-lg font-bold group-hover:text-accent transition-colors">
        {guide.title}
      </h3>
      <p className="mb-3 text-xs font-medium text-accent/70">{guide.category}</p>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{guide.description}</p>

      {/* Strengths */}
      <div className="mb-4 space-y-1.5">
        {guide.strengths.slice(0, 3).map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-muted">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60" />
            {s}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1 text-sm font-semibold text-accent">
        Decouvrir
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
