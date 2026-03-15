import { Play } from "lucide-react";
import VideoCard from "@/components/videos/VideoCard";
import { CURATED_VIDEOS } from "@/lib/constants";

export const metadata = {
  title: "Videos IA — AI Hub",
  description: "Videos educatives pour maitriser les modeles, agents et outils IA",
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Play size={24} className="text-accent" />
          <p className="section-label">Videos</p>
        </div>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Videos a <span className="gradient-text">voir</span>
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Selection de videos educatives pour maitriser l&apos;IA : tutoriels, conferences, analyses.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CURATED_VIDEOS.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
