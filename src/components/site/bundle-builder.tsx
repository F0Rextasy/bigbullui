"use client";

import * as React from "react";
import { components, categories } from "@/lib/registry-site";
import { NAV_ICON_NAMES } from "@/components/site/icon-data";
import { PRESETS, buildCss } from "@/components/site/theme-studio";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/components/ui/lib/utils";

const STARTER_FORK = "https://stackblitz.com/fork/github/F0Rextasy/bigbullui/tree/main/packages/create-app/template?file=app%2Fpage.tsx&title=bigbullui-starter";

const DEFAULT_COMPONENTS = ["button", "card", "badge", "input", "dialog"];

/** Bundle builder: pick components + icons + theme, get one install command. */
export function BundleBuilder() {
  const [query, setQuery] = React.useState("");
  const [iconQuery, setIconQuery] = React.useState("");
  const [picked, setPicked] = React.useState<string[]>(DEFAULT_COMPONENTS);
  const [icons, setIcons] = React.useState<string[]>(["ticket"]);
  const [presetId, setPresetId] = React.useState(PRESETS[0].id);

  const q = query.trim().toLowerCase();
  const visible = q
    ? components.filter(
        (c) => c.name.includes(q) || c.title.toLowerCase().includes(q)
      )
    : components;

  const iq = iconQuery.trim().toLowerCase();
  const visibleIcons = (iq
    ? NAV_ICON_NAMES.filter((n) => n.includes(iq))
    : (["ticket", "stamp", "star", "cart", "play", "sun"] as string[])
  ).slice(0, 60);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, slug: string) =>
    setter((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const addSlugs = [...picked, ...icons.map((i) => `icon-${i}`)];
  const command =
    addSlugs.length > 0 ? `npx bigbullui add ${addSlugs.join(" ")}` : "npx bigbullui add button";
  const css = buildCss(preset.vars);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            1 · Components ({picked.length} selected)
          </p>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter 659 components..."
            aria-label="Filter components"
            className="w-52 rounded-md border border-dashed border-border bg-transparent px-3 py-1.5 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="mt-3 max-h-72 space-y-4 overflow-y-auto rounded-lg border border-border bg-card p-4">
          {categories.map((cat) => {
            const items = visible.filter((c) => c.category === cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id}>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {cat.name} · {items.length}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {items.slice(0, q ? 40 : 24).map((c) => {
                    const on = picked.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        type="button"
                        aria-pressed={on}
                        title={c.description}
                        onClick={() => toggle(setPicked, c.name)}
                        className={cn(
                          "rounded-sm border px-2 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          on
                            ? "border-accent bg-accent font-bold text-accent-foreground"
                            : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        )}
                      >
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            2 · Icons ({icons.length} selected)
          </p>
          <input
            value={iconQuery}
            onChange={(e) => setIconQuery(e.target.value)}
            placeholder="Search 1023 icons..."
            aria-label="Filter icons"
            className="w-52 rounded-md border border-dashed border-border bg-transparent px-3 py-1.5 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleIcons.map((n) => {
            const on = icons.includes(n);
            return (
              <button
                key={n}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(setIcons, n)}
                className={cn(
                  "rounded-sm border px-2 py-1 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  on
                    ? "border-accent bg-accent font-bold text-accent-foreground"
                    : "border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          3 · Theme
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={presetId === p.id}
              onClick={() => setPresetId(p.id)}
              className={cn(
                "rounded-md border bg-card p-2 text-start transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                presetId === p.id ? "border-accent" : "border-border hover:border-foreground"
              )}
            >
              <span className="flex overflow-hidden rounded-sm border border-border" aria-hidden="true">
                {[p.vars.background, p.vars.foreground, p.vars.accent].map((color) => (
                  <span key={color} className="h-6 flex-1" style={{ backgroundColor: color }} />
                ))}
              </span>
              <span className="mt-1.5 block font-mono text-[11px] font-bold uppercase text-foreground">
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border-2 border-foreground bg-card p-4 outline-1 outline-dashed outline-offset-[-5px] outline-border">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          4 · Install your bundle
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-dashed border-border bg-background p-3">
          <code className="min-w-0 flex-1 break-all font-mono text-xs">{command}</code>
          <CopyButton value={command} />
          <a
            href={STARTER_FORK}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open starter in StackBlitz
          </a>
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          then paste theme tokens
        </p>
        <div className="mt-2 flex items-start gap-2 rounded-md border border-dashed border-border bg-background p-3">
          <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-[11px] leading-5">{css}</pre>
          <CopyButton value={css} />
        </div>
      </section>
    </div>
  );
}
