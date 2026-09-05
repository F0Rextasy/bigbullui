"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { categories, type ComponentMeta } from "@/lib/registry-site";

export function DocsExplorer({ components }: { components: ComponentMeta[] }) {
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();

  const matches = (component: ComponentMeta) =>
    q.length === 0 ||
    component.title.toLowerCase().includes(q) ||
    component.description.toLowerCase().includes(q) ||
    component.name.includes(q);

  const total = components.filter(matches).length;

  return (
    <div className="space-y-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
        <div className="w-full">
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search components..."
            aria-label="Search components"
          />
        </div>
        <nav aria-label="Categories" className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {cat.name}
            </a>
          ))}
        </nav>
      </div>

      {q.length > 0 && (
        <p className="font-mono text-xs text-muted-foreground">
          {total} result{total === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
        </p>
      )}

      {categories.map((cat) => {
        const items = components.filter((c) => c.category === cat.id && matches(c));
        if (items.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className="scroll-mt-24 space-y-4">
            <div className="flex items-baseline justify-between border-b-2 border-dashed border-border pb-3">
              <div>
                <h2 className="font-mono text-base font-bold uppercase tracking-[0.15em] text-foreground">
                  {cat.name}
                </h2>
                <p className="text-xs text-muted-foreground">{cat.description}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((component) => (
                <Link
                  key={component.name}
                  href={`/docs/${component.name}`}
                  className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-all duration-150 hover:border-foreground/40 hover:bg-secondary/30"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
                        {component.title}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                        →
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {component.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
