import { Zap, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer>
      <Separator />
      <div className="mx-auto max-w-[1400px] px-6 py-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap size={14} className="text-accent" />
            <span>AI Hub — Veille IA</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart size={12} className="text-danger" fill="currentColor" />
            <span>&amp; AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
