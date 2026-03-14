import { Zap, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-card-border">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10">
              <Zap size={14} className="text-accent" />
            </div>
            <span>AI Hub — <span className="font-medium text-foreground/70">Veille IA personnalisee</span></span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted">
            <span>Built with</span>
            <Heart size={14} className="text-danger" fill="currentColor" />
            <span>&amp; AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
