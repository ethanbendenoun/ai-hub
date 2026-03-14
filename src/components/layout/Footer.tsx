import { Zap, Heart, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-card-border/30">
      {/* Top neon line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-muted">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent/20 to-neon-cyan/20">
              <Zap size={14} className="text-accent" />
            </div>
            <span>
              AI Hub &mdash; <span className="gradient-text-subtle font-medium">Veille IA personnalisee</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-card-border/50 bg-card/50 px-3 py-1 text-xs text-muted">
              <Terminal size={12} className="text-neon-cyan" />
              <span className="font-mono">v2.0</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted">
              <span>Built with</span>
              <Heart size={14} className="text-neon-pink" fill="currentColor" />
              <span>&amp; AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
