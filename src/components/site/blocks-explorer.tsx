"use client";

import * as React from "react";
import Link from "next/link";
import { CopyBlock } from "@/components/site/copy-block";
import { NavIcon, type NavIconName } from "@/components/site/nav-icons";
import { slugTitle } from "@/lib/site-meta";

export type BlockSection = {
  group: string;
  icon: NavIconName;
  blurb: string;
  /** Block slugs; the gallery links to /blocks/<slug> instead of rendering them. */
  items: string[];
};

function slugify(group: string): string {
  return group.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function BlocksExplorer({ sections }: { sections: BlockSection[] }) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<string | null>(null);
  const q = query.trim().toLowerCase();

  const visible = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((name) => name.includes(q)),
    }))
    .filter((section) => (active === null || section.group === active) && section.items.length > 0);

  const total = visible.reduce((sum, section) => sum + section.items.length, 0);

  return (
    <div className="space-y-16">
      <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3">
          <label className="flex items-center gap-2 rounded-md border border-dashed border-border bg-card px-3 py-2 focus-within:border-foreground/60">
            <span aria-hidden="true" className="font-mono text-xs text-muted-foreground">⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter blocks… (checkout, hero, auth)"
              aria-label="Filter blocks"
              className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {q ? (
              <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                {total} found
              </span>
            ) : null}
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Block groups">
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-pressed={active === null}
              className={
                active === null
                  ? "shrink-0 rounded-md border border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground"
                  : "shrink-0 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
              }
            >
              All
            </button>
            {sections.map((section) => (
              <button
                key={section.group}
                type="button"
                onClick={() => {
                  const targetId = `group-${slugify(section.group)}`;
                  setActive(section.group);
                  requestAnimationFrame(() => {
                    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }}
                aria-pressed={active === section.group}
                className={
                  active === section.group
                    ? "flex shrink-0 items-center gap-1.5 rounded-md border border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground"
                    : "flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
                }
              >
                <NavIcon name={section.icon} size={12} />
                {section.group}
              </button>
            ))}
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border bg-card p-10 text-center">
          <p className="font-mono text-sm font-bold uppercase">No blocks match that filter</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive(null);
            }}
            className="mt-3 rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase text-foreground transition-colors hover:border-foreground"
          >
            Clear filter
          </button>
        </div>
      ) : null}

      {visible.map((section) => (
        <section key={section.group} id={`group-${slugify(section.group)}`} className="scroll-mt-36 space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-dashed border-border pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-md border-2 border-foreground bg-card text-foreground">
                <NavIcon name={section.icon} size={17} />
              </span>
              <div>
                <h2 className="font-mono text-lg font-black uppercase tracking-tight">{section.group}</h2>
                <p className="text-xs text-muted-foreground">{section.blurb}</p>
              </div>
            </div>
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {section.items.length} block{section.items.length === 1 ? "" : "s"}
            </span>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((name) => (
              <li
                key={name}
                className="flex flex-col gap-3 rounded-lg border border-dashed border-border bg-card/40 p-3 transition-colors hover:border-foreground/60"
              >
                <Link
                  href={`/blocks/${name}`}
                  className="flex items-start justify-between gap-2 font-mono text-sm font-bold uppercase tracking-wider text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span>{slugTitle(name)}</span>
                  <span aria-hidden="true" className="text-muted-foreground">↗</span>
                </Link>
                <p className="font-mono text-[11px] text-muted-foreground">{name}</p>
                <CopyBlock name={name} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
