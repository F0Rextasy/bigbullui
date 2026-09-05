import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Star } from "@/components/ui/star";
import { cn } from "@/components/ui/lib/utils";
import { DocsSearch } from "@/components/site/docs-search";

async function getStars(): Promise<number | null> {
  try {
    const res = await fetch("https://api.github.com/F0Rextasy/bigbullui", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export async function SiteNav() {
  const stars = await getStars();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="bigbullui home">
          <Image src="/logo.svg" alt="bigbullui logo" width={32} height={32} className="size-8" />
          <span className="text-sm font-semibold tracking-tight">bigbullui</span>
        </Link>
        <div className="hidden min-w-0 flex-1 justify-center px-4 md:flex">
          <div className="w-full max-w-md">
            <DocsSearch />
          </div>
        </div>
        <nav className="flex shrink-0 items-center gap-4">
          <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </Link>
          <a
            href="https://github.com/F0Rextasy/bigbullui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            title={stars !== null ? `${stars} GitHub stars` : "Star bigbullui on GitHub"}
          >
            <Star size={14} className="text-amber-400" />
            <span className="font-mono text-xs">{stars !== null ? stars : "Star"}</span>
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
