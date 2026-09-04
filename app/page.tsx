import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/site/site-nav";
import { GlowDivider } from "@/components/site/glow-divider";
import { components } from "@/lib/registry-site";

const steps = [
  { n: "01", title: "Open", text: "Browse the component you need and see its full source." },
  { n: "02", title: "Copy", text: "One click copies the code — it is yours, no attribution needed." },
  { n: "03", title: "Paste", text: "Drop it into your project. No dependencies beyond React and Tailwind." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-24 text-center">
        <Badge variant="accent" className="mx-auto animate-[fade-in-up_0.5s_ease-out_both]">
          Live · {components.length} components
        </Badge>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-6xl md:text-7xl">
          Animated components you copy, not install.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          bigbullui is a copy-paste library of animated, accessible, fully typed
          React components. No dependencies beyond React, Tailwind, and SVG.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href="/docs"
            className="inline-flex h-10 cursor-pointer items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-all duration-150 hover:scale-[1.02] active:scale-[0.97]"
          >
            Browse components
          </Link>
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* Component grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl font-semibold tracking-[-0.03em]">Every component, zero dependencies.</h2>
        <p className="mt-3 text-muted-foreground">
          Just React, Tailwind, and SVG. Copy the source and own it.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {components.map((component, index) => (
            <Link
              key={component.name}
              href={`/docs/${component.name}`}
              className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/20 animate-[fade-in-up_0.5s_ease-out_both]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <h3 className="font-medium">{component.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{component.description}</p>
              <code className="mt-4 font-mono text-xs text-muted-foreground">
                {"<"}{component.title} {"/>"}
              </code>
            </Link>
          ))}
        </div>
      </section>

      <GlowDivider className="mx-auto max-w-4xl" />

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-4xl font-semibold tracking-[-0.03em]">Three steps. Own your UI.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6">
              <span className="font-mono text-sm text-accent-strong">{step.n}</span>
              <h3 className="font-medium">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.text}</p>
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
