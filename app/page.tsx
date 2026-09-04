import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { CodeCopy } from "@/components/site/code-copy";
import { Playground } from "@/components/site/playground";
import { components } from "@/lib/registry-site";
import { cn } from "@/components/ui/lib/utils";

const categories = [
  {
    name: "Form",
    blurb: "Inputs, toggles and controls that stamp well.",
    items: ["button", "input", "textarea", "checkbox", "switch", "radio-group", "slider"],
  },
  {
    name: "Display",
    blurb: "Surfaces, statuses and faces.",
    items: ["card", "badge", "avatar", "progress"],
  },
  {
    name: "Feedback",
    blurb: "Notices, hints and interruptions.",
    items: ["alert", "tooltip", "dialog"],
  },
  {
    name: "Navigation",
    blurb: "Ways to move between views.",
    items: ["tabs", "accordion"],
  },
];

const steps = [
  {
    n: "01",
    title: "Install",
    text: "One package, zero dependencies.",
    code: "npm install bigbullui",
  },
  {
    n: "02",
    title: "Add tokens",
    text: "A single CSS import themes everything.",
    code: '@import "bigbullui/css";',
  },
  {
    n: "03",
    title: "Use",
    text: "Import any component and ship.",
    code: 'import { Button } from "bigbullui";',
  },
];

const swatches = [
  { label: "Ink", className: "bg-primary" },
  { label: "Cream", className: "bg-background" },
  { label: "Stamp", className: "bg-accent" },
  { label: "Sand", className: "bg-secondary" },
  { label: "Paper", className: "bg-card" },
  { label: "Tan", className: "bg-border" },
];

function CodeBox({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-lg bg-[#08080c]">
      <div className="flex items-center justify-end px-3 pt-3">
        <CodeCopy code={code} />
      </div>
      <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function titleOf(name: string): string {
  return components.find((component) => component.name === name)?.title ?? name;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-24 text-center">
        <Badge variant="accent" className="mx-auto animate-[fade-in-up_0.5s_ease-out_both]">
          MIT · Zero dependencies
        </Badge>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-6xl md:text-7xl">
          Ticket-stub components for React apps.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          {components.length} animated, accessible pieces with zero dependencies. Install the
          package or copy the source — own the code either way.
        </p>
        <div className="mx-auto mt-10 max-w-xl text-left">
          <CodeBox code="npm install bigbullui" />
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/docs"
              className="inline-flex h-10 cursor-pointer items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-all duration-150 hover:scale-[1.02] active:scale-[0.97]"
            >
              Browse components
            </Link>
            <Link
              href="/docs/installation"
              className={cn(
                "inline-flex h-10 cursor-pointer items-center rounded-md border border-border bg-transparent px-5 text-sm font-medium transition-colors hover:bg-secondary"
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
          Real components, running now. Flip the switch, drag the slider, change the tab.
        </p>
        <div className="mt-10">
          <Playground />
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* Catalog by category */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl font-semibold tracking-[-0.03em]">Every piece, one ticket.</h2>
        <p className="mt-3 text-muted-foreground">
          {components.length} pieces across form, display, feedback and navigation.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.name} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-sm font-bold uppercase tracking-[0.15em]">{category.name}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {category.items.length} pieces
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{category.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((name) => (
                  <Link
                    key={name}
                    href={`/docs/${name}`}
                    className="rounded-sm border border-border px-2.5 py-1 text-xs transition-colors hover:border-foreground hover:bg-secondary"
                  >
                    {titleOf(name)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl font-semibold tracking-[-0.03em]">Three steps. Own your UI.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-6">
              <span className="font-mono text-sm text-accent-strong">{step.n}</span>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.text}</p>
              <CodeBox code={step.code} />
            </div>
          ))}
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* Tokens strip */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.03em]">One palette, two stubs.</h2>
            <p className="mt-3 text-muted-foreground">
              Cream by day, night stub after dark. Override the tokens, retheme everything.
            </p>
          </div>
          <Link href="/docs/tokens" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            All tokens →
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {swatches.map((swatch) => (
            <div key={swatch.label} className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2">
              <span aria-hidden className={cn("size-6 rounded-sm border border-foreground/20", swatch.className)} />
              <span className="font-mono text-xs text-muted-foreground">{swatch.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <span className="font-semibold text-foreground">bigbullui</span>
          <span>© 2026 bigbullui · MIT licensed · Copy the code, own it.</span>
        </div>
      </footer>
    </div>
  );
}
