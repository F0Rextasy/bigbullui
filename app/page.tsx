import Link from "next/link";
import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { CodeBox } from "@/components/site/code-box";
import { HeroShowcase } from "@/components/site/hero-showcase";
import { categories, components } from "@/lib/registry-site";
import { cn } from "@/components/ui/lib/utils";

const features = [
  {
    tag: "01 · ZERO DEPENDENCIES",
    title: "Pure React 19 + Tailwind v4",
    desc: "Components import ONLY React and a 7-line cn utility. No Radix, Lucide, or Framer Motion bloat slowing down your bundles.",
  },
  {
    tag: "02 · CODE YOU OWN",
    title: "Copy, paste, customize",
    desc: "Not a locked npm package where you wait for PR merges. Run the CLI or copy the raw .tsx files directly into your codebase.",
  },
  {
    tag: "03 · MODERN DESIGN TOKENS",
    title: "Tailwind CSS v4 Native",
    desc: "Built on standard CSS variables with @theme inline. Seamless light and dark mode switching with tactile ink and warm paper tones.",
  },
  {
    tag: "04 · ACCESSIBILITY BUILT-IN",
    title: "Keyboard and screen-reader ready",
    desc: "WAI-ARIA roles, roving tabindex, focus rings, and motion-reduce fallbacks built directly into every interactive component.",
  },
];

export default function Home() {
  const totalCount = components.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-24">
        {/* Release / Announcement Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs transition-colors hover:bg-secondary">
          <span className="flex h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-muted-foreground">bigbullui CLI v0.2 released</span>
          <span className="text-muted-foreground">&middot;</span>
          <Link href="/docs/installation" className="font-medium text-accent-strong hover:underline">
            Get started &rarr;
          </Link>
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-6xl md:text-7xl">
          Build modern web applications with components you own.
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          An open-source collection of {totalCount}+ accessible, fully customizable React 19 components styled with
          Tailwind CSS 4 tokens. Zero external dependencies &mdash; copy, paste, and ship.
        </p>

        {/* CTA Actions */}
        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs"
            className="inline-flex h-11 cursor-pointer items-center rounded-md bg-primary px-6 font-mono text-xs uppercase tracking-wider text-primary-foreground shadow-sm transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
          >
            Browse {totalCount}+ Components
          </Link>
          <Link
            href="/docs/installation"
            className={cn(
              "inline-flex h-11 cursor-pointer items-center rounded-md border border-border bg-card px-6 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
            )}
          >
            Documentation
          </Link>
          <div className="w-full sm:w-auto">
            <CodeBox code="npx bigbullui add button" />
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
          <span><strong className="font-semibold text-foreground">{totalCount}+</strong> Components</span>
          <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
          <span><strong className="font-semibold text-foreground">0</strong> Dependencies</span>
          <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
          <span>React 19 + Tailwind v4</span>
          <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
          <span>MIT Licensed</span>
        </div>

        {/* Hero Showcase Demo */}
        <div className="mt-10 text-left sm:mt-14">
          <HeroShowcase />
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" />

      {/* Core Highlights / Why bigbullui */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-strong">
            Architected For Speed &amp; Ownership
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Built from first principles for developers who want complete control over their UI stack without the dependency bloat.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat) => (
            <div
              key={feat.tag}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-xs transition-colors hover:border-foreground/40"
            >
              <div>
                <span className="font-mono text-[11px] font-semibold text-muted-foreground">{feat.tag}</span>
                <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">{feat.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" />

      {/* Quickstart in 3 Steps */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-strong">
              Instant Setup
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Up and running in 30 seconds.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add components directly into your project via the CLI or copy the source code.
            </p>
          </div>
          <Link
            href="/docs/installation"
            className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline"
          >
            Full setup guide &rarr;
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="space-y-3 rounded-lg border border-border bg-card p-5">
            <span className="font-mono text-xs font-semibold text-accent-strong">STEP 01</span>
            <h3 className="font-semibold text-sm">Initialize utils &amp; tokens</h3>
            <p className="text-xs text-muted-foreground">Generates the cn helper and sets up CSS tokens.</p>
            <CodeBox code="npx bigbullui init" />
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-card p-5">
            <span className="font-mono text-xs font-semibold text-accent-strong">STEP 02</span>
            <h3 className="font-semibold text-sm">Add components you need</h3>
            <p className="text-xs text-muted-foreground">Copies zero-dependency source code into your UI folder.</p>
            <CodeBox code="npx bigbullui add button card metric-card" />
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-card p-5">
            <span className="font-mono text-xs font-semibold text-accent-strong">STEP 03</span>
            <h3 className="font-semibold text-sm">Import and ship</h3>
            <p className="text-xs text-muted-foreground">Use immediately with full TypeScript types and tokens.</p>
            <CodeBox code='import { Button } from "@/components/ui/button";' />
          </div>
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" />

      {/* Component Categories Directory */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-strong">
              Component Catalog
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Explore {totalCount}+ components across 9 categories.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              From foundational form controls and data tables to rich charts and retro interactive widgets.
            </p>
          </div>
          <Link
            href="/docs"
            className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline"
          >
            Explore all components &rarr;
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const catCount = components.filter((c) => c.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href="/docs"
                className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground/50 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-accent-strong">
                      {cat.name}
                    </h3>
                    <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {catCount}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 font-mono text-[11px] text-muted-foreground group-hover:text-foreground">
                  <span>Browse category</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 sm:grid-cols-3">
          <div>
            <span className="flex items-center gap-2">
              <span aria-hidden className="text-2xl font-bold leading-none">
                <span className="text-foreground">b</span>
                <span className="-ml-[0.22em] text-accent-strong">b</span>
              </span>
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
    </div>
  );
}
