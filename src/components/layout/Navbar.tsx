"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap, Search } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-white">
            <Zap size={16} />
          </div>
          <span className="text-lg font-bold">AI <span className="gradient-text">Hub</span></span>
        </Link>

        <div className="hidden items-center gap-1 rounded-2xl bg-card-inner p-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  isActive ? "bg-accent text-white shadow-lg shadow-accent/25" : "text-muted hover:text-foreground"
                }`}>{link.label}</Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-card-border text-muted hover:text-foreground">
            <Search size={16} />
          </button>
          <ThemeToggle />
          <div className="hidden items-center gap-2 rounded-xl bg-card-inner px-3 py-1.5 md:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">U</div>
            <span className="text-sm font-medium">User</span>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl p-2 text-muted md:hidden">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-card-border px-4 pb-4 md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium ${isActive ? "bg-accent/10 text-accent" : "text-muted"}`}>{link.label}</Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
