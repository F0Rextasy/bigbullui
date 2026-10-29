import Link from "next/link";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { GlowDivider } from "@/components/site/glow-divider";
import { CodeBox } from "@/components/site/code-box";
import { HeroShowcase } from "@/components/site/hero-showcase";
import { NavIcon } from "@/components/site/nav-icons";
import { categories, components } from "@/lib/registry-site";
import { cn } from "@/components/ui/lib/utils";
import { SITE_VERSION } from "@/lib/site-meta";

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
    desc: "Built on standard CSS variables with @theme inline. Instant light and dark mode switching with tactile ink and warm paper tones.",
  },
  {
    tag: "04 · ACCESSIBILITY BUILT-IN",
    title: "Keyboard and screen-reader ready",
    desc: "WAI-ARIA roles, roving tabindex, focus rings, and motion-reduce fallbacks across the interactive components.",
  },
];

export default function Home() {
  const totalCount = components.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-16">
        {/* Release / Announcement Pill */}
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs">
          <span className="whitespace-nowrap font-mono text-muted-foreground">CLI v{SITE_VERSION}</span>
          <span className="hidden text-muted-foreground sm:inline">&middot;</span>
          <Link href="/docs/installation" className="inline-flex items-center whitespace-nowrap py-3.5 -my-3.5 font-medium text-accent-strong hover:underline">
            Install guide
          </Link>
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-6xl md:text-7xl">
          Build modern web applications with components you own.
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          An open-source collection of {totalCount}+ accessible, fully customizable React 19 components styled with
          Tailwind CSS 4 tokens. Zero external dependencies. Copy, paste, and ship.
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
            Installation guide
          </Link>
          <div className="w-full sm:w-auto">
            <CodeBox code="npm install bigbullui" />
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-y-2 text-center font-mono text-[13px] text-muted-foreground sm:grid-cols-4 sm:gap-y-0">
          <span className="whitespace-nowrap"><strong className="text-base font-semibold text-foreground">{totalCount}+</strong> Components</span>
          <span className="whitespace-nowrap"><strong className="text-base font-semibold text-foreground">0</strong> Dependencies</span>
          <span className="whitespace-nowrap">React 19 + Tailwind v4</span>
          <span className="whitespace-nowrap">MIT Licensed</span>
        </div>

        {/* Hero Showcase Demo */}
        <div className="mt-10 text-left sm:mt-14">
          <HeroShowcase total={totalCount} />
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" />

      {/* Core Highlights / Why bigbullui */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-sm">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Four rules the library follows.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every component imports React and one small cn helper, so your bundle grows only with what you use.
            </p>
          </div>

          <ol className="divide-y divide-dashed divide-border border-y border-border">
            {features.map((feat, index) => (
              <li key={feat.tag} className="group py-6 transition-colors hover:bg-secondary/30">
                <h3 className={cn("font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-strong", index === 0 ? "text-xl" : "text-base")}>
                  {feat.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{feat.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" />

      {/* Quickstart in 3 Steps */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Three commands to first render.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add components directly into your project via the CLI or copy the source code.
            </p>
          </div>
          <Link
            href="/docs/installation"
            className="inline-flex items-center py-3.5 -my-3.5 font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline"
          >
            Full setup guide
          </Link>
        </div>

        <div className="mt-10 min-w-0 divide-y divide-dashed divide-border overflow-hidden rounded-xl border-2 border-dashed border-border bg-card md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="min-w-0 space-y-3 p-6">
            <span className="font-mono text-xs font-semibold text-accent-strong">STEP 01</span>
            <h3 className="font-semibold text-sm">Initialize utils &amp; tokens</h3>
            <p className="text-xs text-muted-foreground">Generates the cn helper and sets up CSS tokens.</p>
            <CodeBox code="npx bigbullui init" />
          </div>

          <div className="min-w-0 space-y-3 p-6">
            <h3 className="font-semibold text-sm">Add components you need</h3>
            <p className="text-xs text-muted-foreground">Copies zero-dependency source code into your UI folder.</p>
            <CodeBox code="npx bigbullui add button card metric-card" />
          </div>

          <div className="min-w-0 space-y-3 p-6">
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
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Explore {totalCount}+ components across 9 categories.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Form controls, data tables, charts, overlays, and retro widgets.
            </p>
          </div>
          <Link
            href="/docs"
            className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline"
          >
            All components
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const catCount = components.filter((c) => c.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/docs#${cat.id}`}
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
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-5xl" />

      {/* Own icon package */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Tried our icon package yet?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              1,000+ hand-drawn icons in the Ticket Stub language: no Lucide, no
              emoji, no external sets. Browse by category with Draw / Pulse / Spin
              previews, open any icon on its own page, or pull a single icon into
              your project.
            </p>
            <div className="mt-4 space-y-2">
              <CodeBox code="npm install bigbullicons" />
              <CodeBox code="npx bigbullui add icon-ticket" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/icons"
                className="inline-flex h-9 cursor-pointer items-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-all duration-150 hover:scale-[1.02] active:scale-[0.97]"
              >
                Browse the icon set
              </Link>
              <a
                href="https://www.npmjs.com/package/bigbullicons"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 cursor-pointer items-center rounded-md border border-border bg-transparent px-4 text-xs font-medium transition-colors hover:bg-secondary"
              >
                bigbullicons on npm
              </a>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-6" aria-hidden="true">
            {(
              ["ticket", "stub", "stamp", "gate", "blocks", "showcase", "theme", "perforation", "dashboard", "storefront", "service", "auth"] as const
            ).map((name) => (
              <span
                key={name}
                className="flex aspect-square items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:border-foreground/50 hover:text-accent-strong"
              >
                <NavIcon name={name} size={22} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
