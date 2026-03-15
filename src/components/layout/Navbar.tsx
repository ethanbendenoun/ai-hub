"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Zap, Search } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

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
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-all",
                  isActive ? "bg-accent text-white shadow-lg shadow-accent/25" : "text-muted-foreground hover:text-foreground"
                )}>{link.label}</Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="rounded-xl" title="Rechercher">
            <Search size={16} />
          </Button>

          <ThemeToggle />

          <div className="hidden items-center gap-2 rounded-xl bg-card-inner px-3 py-1.5 md:flex">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-accent text-xs font-bold text-white">U</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">User</span>
          </div>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-xl md:hidden">
                  <Menu size={20} />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Zap size={16} className="text-accent" />
                  AI Hub
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}
                      className={cn(
                        "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"
                      )}>{link.label}</Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
