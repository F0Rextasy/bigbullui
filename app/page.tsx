import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { CodeBlock } from "@/components/ui/code-block";
import { Playground } from "@/components/site/playground";
import { cn } from "@/components/ui/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-24 text-center">
        <Badge variant="accent" className="mx-auto animate-[fade-in-up_0.5s_ease-out_both]">
          MIT · Zero dependencies
        </Badge>
        <h1 className="mx-auto mt-6 max-w-4xl text-6xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-7xl md:text-8xl">
          Beautiful React<br className="hidden sm:block" /> components with zero dependencies.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Animated, accessible pieces. Install the package or copy the source — own the code
          either way.
        </p>
        <div className="mx-auto mt-10 max-w-xl text-left">
          <CodeBlock code="npm install bigbullui" variant="terminal" showLineNumbers={false} allowToggleLineNumbers={false} allowToggleWordWrap={false} showNotches={false} />
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
              Installation
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <span className="flex items-center gap-2.5">
            <span aria-hidden className="text-4xl font-bold leading-none">
              <span className="text-foreground">b</span><span className="-ml-[0.22em] text-accent-strong">b</span>
            </span>
            <span className="text-xl font-semibold tracking-tight text-foreground">bigbullui</span>
          </span>
          <span>© 2026 bigbullui · MIT licensed · Copy the code, own it.</span>
        </div>
      </footer>
    </div>
  );
}
