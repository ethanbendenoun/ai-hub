import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Terminal,
  MessageSquare,
  Search,
  Monitor,
  Cpu,
  DollarSign,
  Star,
  CheckCircle2,
  Lightbulb,
  Target,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { getGuideBySlug, getAllGuides } from "@/lib/guides";

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal size={32} />,
  MessageSquare: <MessageSquare size={32} />,
  Search: <Search size={32} />,
  Monitor: <Monitor size={32} />,
  Cpu: <Cpu size={32} />,
  DollarSign: <DollarSign size={32} />,
};

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const diffLabel =
    guide.difficulty === "debutant"
      ? "Debutant"
      : guide.difficulty === "intermediaire"
      ? "Intermediaire"
      : "Avance";
  const diffVariant =
    guide.difficulty === "debutant"
      ? "success"
      : guide.difficulty === "intermediaire"
      ? "warning"
      : ("impact" as const);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Back link */}
      <Link
        href="/decouverte"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
      >
        <ArrowLeft size={14} />
        Retour aux guides
      </Link>

      {/* Header */}
      <div className="mb-8 rounded-xl border border-card-border bg-card p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            {iconMap[guide.icon] || <Star size={32} />}
          </div>
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold sm:text-3xl">
                {guide.title}
              </h1>
              <Badge variant={diffVariant} size="md">
                {diffLabel}
              </Badge>
            </div>
            <p className="mb-1 text-sm font-medium text-accent">
              {guide.category}
            </p>
            <p className="text-muted">{guide.description}</p>
          </div>
        </div>
      </div>

      {/* Two columns: Strengths + Use Cases */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-card-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-accent">
            <CheckCircle2 size={18} />
            <h2 className="font-bold">Points forts</h2>
          </div>
          <ul className="space-y-2">
            {guide.strengths.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-card-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-accent">
            <Target size={18} />
            <h2 className="font-bold">Cas d&apos;usage</h2>
          </div>
          <ul className="space-y-2">
            {guide.useCases.map((u, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div className="mb-8 rounded-xl border border-accent/20 bg-accent/5 p-5">
        <div className="mb-3 flex items-center gap-2 text-accent">
          <Lightbulb size={18} />
          <h2 className="font-bold">Astuces pro</h2>
        </div>
        <ul className="space-y-2">
          {guide.tips.map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 font-bold text-accent">{i + 1}.</span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted prose-p:leading-relaxed prose-strong:text-foreground prose-code:rounded prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card prose-pre:border prose-pre:border-card-border prose-li:text-muted prose-table:text-sm prose-th:text-left prose-th:font-semibold prose-td:py-2">
        {/* Render content as HTML-like sections from markdown-style text */}
        {guide.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) {
            return (
              <h2 key={i} className="text-xl font-bold mt-8 mb-4 text-foreground">
                {line.replace("## ", "")}
              </h2>
            );
          }
          if (line.startsWith("### ")) {
            return (
              <h3 key={i} className="text-lg font-bold mt-6 mb-3 text-foreground">
                {line.replace("### ", "")}
              </h3>
            );
          }
          if (line.startsWith("```")) {
            return null; // Skip code fences for now
          }
          if (line.startsWith("- **")) {
            const match = line.match(/^- \*\*(.+?)\*\*\s*:?\s*(.*)$/);
            if (match) {
              return (
                <div key={i} className="flex items-start gap-2 my-1 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span>
                    <strong className="text-foreground">{match[1]}</strong>
                    {match[2] && ` : ${match[2]}`}
                  </span>
                </div>
              );
            }
          }
          if (line.startsWith("- ")) {
            return (
              <div key={i} className="flex items-start gap-2 my-1 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted" />
                <span>{line.replace("- ", "")}</span>
              </div>
            );
          }
          if (line.startsWith("1. ") || line.match(/^\d+\. /)) {
            const num = line.match(/^(\d+)\. (.+)/);
            if (num) {
              return (
                <div key={i} className="flex items-start gap-2 my-1 text-sm">
                  <span className="font-bold text-accent">{num[1]}.</span>
                  <span className="text-muted">{num[2]}</span>
                </div>
              );
            }
          }
          if (line.startsWith("|")) {
            // Simple table row rendering
            const cells = line.split("|").filter(Boolean).map((c) => c.trim());
            if (cells.every((c) => c.match(/^-+$/))) return null; // Skip separator
            return (
              <div key={i} className="grid grid-cols-4 gap-2 text-xs border-b border-card-border py-1.5">
                {cells.map((cell, j) => (
                  <span key={j} className={j === 0 ? "font-medium" : "text-muted"}>
                    {cell}
                  </span>
                ))}
              </div>
            );
          }
          if (line.trim() === "") return <div key={i} className="h-2" />;
          // Regular paragraph
          return (
            <p key={i} className="my-2 text-sm leading-relaxed text-muted">
              {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={j} className="text-foreground">
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  );
                }
                // Handle inline code
                return part.split(/(`[^`]+`)/g).map((subpart, k) => {
                  if (subpart.startsWith("`") && subpart.endsWith("`")) {
                    return (
                      <code
                        key={k}
                        className="rounded bg-card border border-card-border px-1.5 py-0.5 text-xs text-accent"
                      >
                        {subpart.replace(/`/g, "")}
                      </code>
                    );
                  }
                  return subpart;
                });
              })}
            </p>
          );
        })}
      </article>

      {/* Updated date */}
      <div className="mt-8 border-t border-card-border pt-4 text-xs text-muted">
        Derniere mise a jour : {guide.lastUpdated}
      </div>
    </div>
  );
}
