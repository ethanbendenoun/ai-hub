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
  Server,
  Sparkles,
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
  Server: <Server size={24} />,
  Sparkles: <Sparkles size={24} />,
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
      className="card-hover group flex flex-col rounded-xl border border-card-border/50 bg-card/80 backdrop-blur-sm p-6 transition-all"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-neon-cyan/20 text-accent transition-all group-hover:from-accent group-hover:to-neon-cyan group-hover:text-white group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          {iconMap[guide.icon] || <Star size={24} />}
        </div>
        <Badge variant={diff.variant}>{diff.label}</Badge>
      </div>

      {/* Title */}
      <h3 className="mb-1 text-lg font-bold group-hover:text-neon-cyan transition-colors">
        {guide.title}
      </h3>
      <p className="mb-1 font-mono text-xs font-medium text-accent">{guide.category}</p>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {guide.description}
      </p>

      {/* Strengths preview */}
      <div className="mb-4 space-y-1.5">
        {guide.strengths.slice(0, 3).map((s, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-muted">
            <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon-cyan shadow-[0_0_4px_rgba(0,240,255,0.5)]" />
            {s}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1 font-mono text-sm font-medium text-neon-cyan">
        Decouvrir
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
