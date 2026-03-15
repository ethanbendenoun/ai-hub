import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import GuideCard from "@/components/guides/GuideCard";
import { getAllGuides } from "@/lib/guides";

export const metadata = {
  title: "Decouverte",
  description: "Guides, tutoriels et astuces pour maitriser les outils IA",
};

export default function DecouvertePage() {
  const guides = getAllGuides();

  // Group by category
  const categories = [...new Set(guides.map((g) => g.category))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
            <BookOpen size={20} className="text-success" />
          </div>
          <h1 className="text-3xl font-extrabold">Decouverte</h1>
        </div>
        <p className="text-muted-foreground">
          Apprenez a exploiter le plein potentiel des outils IA. Guides detailles,
          astuces pro, et conseils pour setup vos agents.
        </p>
      </div>

      {/* Quick tips banner */}
      <div className="mb-10 rounded-xl border border-accent/20 bg-accent/5 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={18} className="text-accent" />
          <h2 className="font-bold text-accent">Astuce du jour</h2>
        </div>
        <p className="text-sm leading-relaxed text-foreground/80">
          <strong>Combinez vos outils IA pour un maximum d&apos;efficacite :</strong>{" "}
          Utilisez <strong>Perplexity</strong> pour la recherche, <strong>Claude AI</strong>{" "}
          pour l&apos;analyse et la strategie, et <strong>Claude Code</strong> pour
          l&apos;execution. C&apos;est le trio gagnant pour etre 10x plus productif.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-10 overflow-x-auto rounded-xl border border-card-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-card-border bg-card">
              <th className="px-4 py-3 text-left font-semibold">Outil</th>
              <th className="px-4 py-3 text-left font-semibold">Type</th>
              <th className="px-4 py-3 text-left font-semibold">Force principale</th>
              <th className="px-4 py-3 text-left font-semibold">Niveau</th>
              <th className="px-4 py-3 text-center font-semibold">Guide</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide) => (
              <tr
                key={guide.slug}
                className="border-b border-card-border/50 transition-colors hover:bg-accent/5"
              >
                <td className="px-4 py-3 font-medium">{guide.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{guide.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{guide.strengths[0]}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      guide.difficulty === "debutant"
                        ? "bg-success/10 text-success"
                        : guide.difficulty === "intermediaire"
                        ? "bg-warning/10 text-warning"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {guide.difficulty === "debutant"
                      ? "Debutant"
                      : guide.difficulty === "intermediaire"
                      ? "Intermediaire"
                      : "Avance"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/decouverte/${guide.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                  >
                    Voir <ArrowRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Guides by category */}
      {categories.map((category) => (
        <section key={category} className="mb-10">
          <h2 className="mb-4 text-xl font-bold">{category}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides
              .filter((g) => g.category === category)
              .map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
