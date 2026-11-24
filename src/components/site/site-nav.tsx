import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Star } from "@/components/ui/star";
import { cn } from "@/components/ui/lib/utils";
import { components } from "@/lib/registry-site";
import { DocsSearch } from "@/components/site/docs-search";
import { MobileNav } from "@/components/site/mobile-nav";

export function SiteNav() {
  const total = components.length;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex h-11 shrink-0 items-center gap-2 md:h-auto" aria-label="bigbullui home">
          <Image src="/logo.svg" alt="bigbullui logo" width={32} height={32} className="size-8" />
          <span className="text-sm font-semibold tracking-tight">bigbullui</span>
        </Link>
        <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex">
          <div className="w-full max-w-md">
            <DocsSearch />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden shrink-0 items-center gap-4 md:flex">
          <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link href="/blocks" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Blocks
          </Link>
          <Link href="/icons" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Icons
          </Link>
          <Link href="/showcase" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Showcase
          </Link>
          <a
            href="https://github.com/F0Rextasy/bigbullui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-foreground/60 px-2 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            title="Star bigbullui on GitHub"
          >
            <Star size={14} className="text-accent-strong" />
            <span className="font-mono text-xs">GitHub</span>
          </a>
          <a
            href="https://kreosus.com/f0rextasy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Support on Kreosus"
            className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span className="font-mono text-xs">Support</span>
          </a>
          <ThemeToggle />
          <Link
            href="/docs/installation"
            className={cn(
              "inline-flex h-8 cursor-pointer items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-[transform,opacity] duration-150 hover:scale-[1.02] active:scale-[0.97]"
            )}
          >
            Install
          </Link>
        </nav>

        {/* Mobile Navigation Controls */}
        <MobileNav stars={null} total={total} />
      </div>
    </header>
  );
}
