import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 sm:grid-cols-3">
        <div>
          <span className="flex items-center gap-2">
            <Image src="/logo.svg" alt="bigbullui logo" width={28} height={28} className="size-7" />
            <span className="text-base font-semibold tracking-tight text-foreground">bigbullui</span>
          </span>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Open-source React 19 component library. Pure code, zero dependencies, you own it.
          </p>
          <p className="mt-3 text-[11px] text-muted-foreground">
            &copy; 2026 bigbullui &middot; MIT licensed
          </p>
        </div>

        <nav aria-label="Documentation">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Documentation
          </p>
          <ul className="mt-3 space-y-2 text-xs">
            <li>
              <Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground">
                All components
              </Link>
            </li>
            <li>
              <Link href="/blocks" className="text-muted-foreground transition-colors hover:text-foreground">
                Page blocks
              </Link>
            </li>
            <li>
              <Link href="/docs/installation" className="text-muted-foreground transition-colors hover:text-foreground">
                Installation &amp; CLI
              </Link>
            </li>
              <li>
                <Link href="/docs/design" className="text-muted-foreground transition-colors hover:text-foreground">
                  Design system &amp; Tokens
                </Link>
              </li>
              <li>
                <Link href="/theme" className="text-muted-foreground transition-colors hover:text-foreground">
                  Theme studio
                </Link>
              </li>
              <li>
                <Link href="/icons" className="text-muted-foreground transition-colors hover:text-foreground">
                  Icon set
                </Link>
              </li>
            <li>
              <Link href="/docs/agents" className="text-muted-foreground transition-colors hover:text-foreground">
                AI Agents (SKILL.md)
              </Link>
            </li>
            <li>
              <a href="/llms.txt" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                llms.txt (for AI)
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Community">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Community &amp; Code
          </p>
          <ul className="mt-3 space-y-2 text-xs">
            <li>
              <Link href="/showcase" className="text-muted-foreground transition-colors hover:text-foreground">
                Community showcase
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/F0Rextasy/bigbullui"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/bigbullui"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                npm package
              </a>
            </li>
            <li>
              <Link href="/docs/contributing" className="text-muted-foreground transition-colors hover:text-foreground">
                Contributing guide
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
