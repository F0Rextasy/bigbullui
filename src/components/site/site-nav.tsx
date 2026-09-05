import Link from "next/link";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/components/ui/lib/utils";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="bigbullui home">
          <span aria-hidden className="text-[22px] font-bold leading-none">
            <span className="text-foreground">b</span><span className="-ml-[0.22em] text-accent-strong">b</span>
          </span>
          <span className="text-sm font-semibold tracking-tight">bigbullui</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Components
          </Link>
          <a
            href="https://github.com/F0Rextasy/bigbullui"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <ThemeToggle />
          <Link
            href="/docs"
            className={cn(
              "inline-flex h-8 cursor-pointer items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-all duration-150 hover:scale-[1.02] active:scale-[0.97]"
            )}
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
