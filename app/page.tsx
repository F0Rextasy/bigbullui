import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { CodeBox } from "@/components/site/code-box";
import { Playground } from "@/components/site/playground";
import { cn } from "@/components/ui/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-24 text-center">
        <Badge variant="accent" className="mx-auto animate-[fade-in-up_0.5s_ease-out_both]">
          MIT · Open source
        </Badge>
        <h1 className="mx-auto mt-6 max-w-4xl text-6xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-7xl md:text-8xl">
          Open-source React<br className="hidden sm:block" /> components you own.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Animated, accessible pieces. Install the package or copy the source — own the code
          either way.
        </p>
        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center">
          <CodeBox code="npm install bigbullui" />
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/docs"
              className="inline-flex h-12 cursor-pointer items-center rounded-md bg-primary px-7 text-base font-medium text-primary-foreground transition-all duration-150 hover:scale-[1.02] active:scale-[0.97]"
            >
              Browse components
            </Link>
            <Link
              href="/docs/installation"
              className={cn(
                "inline-flex h-12 cursor-pointer items-center rounded-md border border-border bg-transparent px-7 text-base font-medium transition-colors hover:bg-secondary"
              )}
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* Live playground */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl font-semibold tracking-[-0.03em]">Try it live.</h2>
        <p className="mt-3 text-muted-foreground">
          Real components, running now — scroll and touch everything.
        </p>
        <div className="mt-10">
          <Playground />
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
          <div>
            <span className="flex items-center gap-2.5">
              <span aria-hidden className="text-4xl font-bold leading-none">
                <span className="text-foreground">b</span><span className="-ml-[0.22em] text-accent-strong">b</span>
              </span>
              <span className="text-xl font-semibold tracking-tight text-foreground">bigbullui</span>
            </span>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Open-source React components you own. Copy the code, own it.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">© 2026 bigbullui · MIT licensed</p>
          </div>
          <nav aria-label="Components">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Components</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/docs/button" className="text-muted-foreground transition-colors hover:text-foreground">Button</Link></li>
              <li><Link href="/docs/input" className="text-muted-foreground transition-colors hover:text-foreground">Input</Link></li>
              <li><Link href="/docs/card" className="text-muted-foreground transition-colors hover:text-foreground">Card</Link></li>
              <li><Link href="/docs/dialog" className="text-muted-foreground transition-colors hover:text-foreground">Dialog</Link></li>
              <li><Link href="/docs/tabs" className="text-muted-foreground transition-colors hover:text-foreground">Tabs</Link></li>
              <li><Link href="/docs/tooltip" className="text-muted-foreground transition-colors hover:text-foreground">Tooltip</Link></li>
            </ul>
          </nav>
          <nav aria-label="Resources">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Resources</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground">Documentation</Link></li>
              <li><Link href="/docs/installation" className="text-muted-foreground transition-colors hover:text-foreground">Installation</Link></li>
              <li><Link href="/docs/agents" className="text-muted-foreground transition-colors hover:text-foreground">AI Agents</Link></li>
              <li><a href="https://github.com/F0Rextasy/bigbullui" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/bigbullui" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">npm</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
