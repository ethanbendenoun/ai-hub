import { Badge } from "@/components/ui/badge";
import type { Video } from "@/lib/types";

export default function VideoCard({ video }: { video: Video }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="video-card group block"
    >
      <div className="video-thumb">
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          loading="lazy"
        />
        <span className="duration-badge">{video.duration}</span>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-xs font-bold text-accent">
            {video.channelIcon}
          </span>
          <span className="text-sm text-muted-foreground">{video.channel}</span>
        </div>
        <h3 className="mb-2 text-lg font-bold leading-snug group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        <p className="mb-3 text-[15px] leading-relaxed text-muted-foreground line-clamp-2">
          {video.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {video.tags.map((tag) => (
            <Badge key={tag} variant="accent">{tag}</Badge>
          ))}
        </div>
      </div>
    </a>
  );
}
