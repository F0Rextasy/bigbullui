import Link from "next/link";
import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { CodeBox } from "@/components/site/code-box";
import { Playground } from "@/components/site/playground";
import { categories, components } from "@/lib/registry-site";
import { cn } from "@/components/ui/lib/utils";

export default function Home() {
  const totalCount = components.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 text-center">
        <div className="flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-strong">
            ticket-stub &middot; open-source
          </span>
        </div>

        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-7xl">
          Open-source React<br className="hidden sm:block" /> components you own.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Tactile, animated pieces with a warm paper aesthetic. Install the package or copy the
          source &mdash; zero external dependencies, own the code either way.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center">
          <CodeBox code="npm install bigbullui" />
          <div className="mt-5 flex items-center justify-center gap-3 text-sm">
            <Link
              href="/docs"
              className="inline-flex h-11 cursor-pointer items-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            >
              Browse components
            </Link>
            <Link
              href="/docs/installation"
              className={cn(
                "inline-flex h-11 cursor-pointer items-center rounded-md border border-border bg-transparent px-6 font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              )}
            >
              Getting started
            </Link>
          </div>
        </div>

        {/* Quiet Principles Line */}
        <div className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
          <span><strong className="font-semibold text-foreground">{totalCount}+</strong> components</span>
          <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
          <span><strong className="font-semibold text-foreground">0</strong> dependencies</span>
          <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
          <span>React 19 + Tailwind v4</span>
          <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
          <span>MIT licensed</span>
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* Live playground */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-strong">
              Interactive
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Touch everything.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Real scenes running live &mdash; sell a ticket, read the dashboard, scan at the gate.
            </p>
          </div>
          <Link
            href="/docs"
            className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline"
          >
            Browse all &rarr;
          </Link>
        </div>

        <div className="mt-8">
          <Playground />
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* Clean Category Directory */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-strong">
            Directory
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {totalCount} components across 9 categories.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From essential form fields to mechanical departure boards and audio waveforms.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = components.filter((c) => c.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/docs#${cat.id}`}
                className="group flex flex-col justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/40 hover:bg-secondary/40"
              >
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary">
                      {cat.name}
                    </h3>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {count}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <span className="flex items-center gap-2">
              <span aria-hidden className="text-3xl font-bold leading-none">
                <span className="text-foreground">b</span><span className="-ml-[0.22em] text-accent-strong">b</span>
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">bigbullui</span>
            </span>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Open-source React components you own. Copy the code, own it.
            </p>
            <p className="mt-3 text-[11px] text-muted-foreground">&copy; 2026 bigbullui &middot; MIT licensed</p>
          </div>
          <nav aria-label="Documentation">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Documentation</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground">All components</Link></li>
              <li><Link href="/docs/installation" className="text-muted-foreground transition-colors hover:text-foreground">Installation &amp; setup</Link></li>
              <li><Link href="/docs/agents" className="text-muted-foreground transition-colors hover:text-foreground">AI agents (SKILL.md)</Link></li>
              <li><Link href="/docs/design" className="text-muted-foreground transition-colors hover:text-foreground">Design system</Link></li>
            </ul>
          </nav>
          <nav aria-label="Community">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Community</p>
            <ul className="mt-3 space-y-2 text-xs">
              <li><a href="https://github.com/F0Rextasy/bigbullui" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/bigbullui" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">npm package</a></li>
              <li><Link href="/docs/contributing" className="text-muted-foreground transition-colors hover:text-foreground">Contributing</Link></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
