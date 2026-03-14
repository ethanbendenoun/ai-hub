import { Zap, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Zap size={16} className="text-accent" />
            <span>
              AI Hub &mdash; Veille IA personnalisee
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted">
            <span>Fait avec</span>
            <Heart size={14} className="text-danger" fill="currentColor" />
            <span>et beaucoup d&apos;IA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
