import Link from "next/link";
import {
  Terminal,
  MessageSquare,
  Search,
  Monitor,
  Cpu,
  DollarSign,
  ArrowRight,
  Star,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Guide } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={24} />,
  MessageSquare: <MessageSquare size={24} />,
  Search: <Search size={24} />,
  Monitor: <Monitor size={24} />,
  Cpu: <Cpu size={24} />,
  DollarSign: <DollarSign size={24} />,
};

const difficultyLabels = {
  debutant: { label: "Debutant", variant: "success" as const },
  intermediaire: { label: "Intermediaire", variant: "warning" as const },
  avance: { label: "Avance", variant: "impact" as const },
};

export default function GuideCard({
  guide,
}: {
  guide: Omit<Guide, "content">;
}) {
  const diff = difficultyLabels[guide.difficulty];

  return (
    <Link
      href={`/decouverte/${guide.slug}`}
      className="card-hover group flex flex-col rounded-xl border border-card-border bg-card p-6 transition-all"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
          {iconMap[guide.icon] || <Star size={24} />}
        </div>
        <Badge variant={diff.variant}>{diff.label}</Badge>
      </div>

      {/* Title */}
      <h3 className="mb-1 text-lg font-bold group-hover:text-accent">
        {guide.title}
      </h3>
      <p className="mb-1 text-xs font-medium text-accent">{guide.category}</p>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {guide.description}
      </p>

      {/* Strengths preview */}
      <div className="mb-4 space-y-1.5">
        {guide.strengths.slice(0, 3).map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-muted">
            <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
            {s}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1 text-sm font-medium text-accent">
        Decouvrir
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
