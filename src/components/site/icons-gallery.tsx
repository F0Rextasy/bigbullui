"use client";

import * as React from "react";
import Link from "next/link";
import { NAV_ICON_NAMES, NAV_ICON_CATEGORIES, NAV_CATEGORIES, NavIcon, type NavIconName } from "@/components/site/nav-icons";
import { CopyButton } from "@/components/ui/copy-button";

const PAGE_SIZE = 120;

type Anim = "draw" | "pulse" | "spin" | "none";

function IconCard({ name, animation, big }: { name: NavIconName; animation: Anim; big: boolean }) {
  const [replayKey, setReplayKey] = React.useState(0);
  return (
    <div
      className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/50"
      onMouseEnter={() => setReplayKey((k) => k + 1)}
    >
      <Link
        href={`/icons/${name}`}
        className="flex w-full flex-col items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <NavIcon key={`${name}-${replayKey}`} name={name} size={big ? 40 : 20} animated animation={animation} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
          {name}
        </span>
      </Link>
      <CopyButton value={`<StampIcon name="${name}" />`} />
    </div>
  );
}

export function IconsGallery() {
  const [big, setBig] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [animation, setAnimation] = React.useState<Anim>("draw");
  const [category, setCategory] = React.useState<string | null>(null);
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const q = query.trim().toLowerCase();

  const updateQuery = (next: string) => {
    setQuery(next);
    setVisibleCount(PAGE_SIZE);
  };

  const updateCategory = (next: string | null) => {
    setCategory(next);
    setVisibleCount(PAGE_SIZE);
  };

  const names = React.useMemo(
    () =>
      NAV_ICON_NAMES.filter(
        (name) =>
          name.toLowerCase().includes(q) &&
          (category === null || NAV_ICON_CATEGORIES[name] === category)
      ),
    [q, category]
  );

  const visibleNames = React.useMemo(
    () => names.slice(0, visibleCount),
    [names, visibleCount]
  );

  const grouped = React.useMemo(() => {
    const map = new Map<string, NavIconName[]>();
    for (const name of visibleNames) {
      const cat = NAV_ICON_CATEGORIES[name] ?? "Other";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(name);
    }
    return [...map.entries()];
  }, [visibleNames]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {names.length} hand-drawn icons{visibleNames.length < names.length ? ` · showing ${visibleNames.length}` : ""}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1" role="group" aria-label="Icon animation">
            {(["draw", "pulse", "spin", "none"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAnimation(mode)}
                aria-pressed={animation === mode}
                className={
                  animation === mode
                    ? "rounded-md border border-foreground bg-primary px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase text-primary-foreground"
                    : "rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                }
              >
                {mode}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setBig((v) => !v)}
            aria-pressed={big}
            className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {big ? "Size 20" : "Size 40"}
          </button>
        </div>
      </div>
      <label className="flex items-center gap-2 rounded-md border border-dashed border-border bg-card px-3 py-2 focus-within:border-foreground/60">
        <span aria-hidden="true" className="font-mono text-xs text-muted-foreground">⌕</span>
        <input
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Search 1000+ icons… (ticket, arrow, cloud)"
          aria-label="Search icons"
          className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </label>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Icon categories">
        <button
          type="button"
          onClick={() => updateCategory(null)}
          aria-pressed={category === null}
          className={
            category === null
              ? "rounded-full border border-foreground bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase text-primary-foreground"
              : "rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          }
        >
          All
        </button>
        {NAV_CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => updateCategory(category === cat.name ? null : cat.name)}
            aria-pressed={category === cat.name}
            className={
              category === cat.name
                ? "rounded-full border border-foreground bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase text-primary-foreground"
                : "rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            }
          >
            {cat.name} · {cat.count}
          </button>
        ))}
      </div>
      {names.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border bg-card p-10 text-center">
          <p className="font-mono text-sm font-bold uppercase">No icons match that filter</p>
          <button
            type="button"
            onClick={() => {
              updateQuery("");
              updateCategory(null);
            }}
            className="mt-3 rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase text-foreground transition-colors hover:border-foreground"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <>
          {grouped.map(([cat, items]) => (
            <section key={cat} aria-label={`${cat} icons`} className="space-y-3">
              <h2 className="font-mono text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
                {cat} · {items.length}
              </h2>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {items.map((name) => (
                  <IconCard key={name} name={name} animation={animation} big={big} />
                ))}
              </div>
            </section>
          ))}
          {visibleNames.length < names.length ? (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="cursor-pointer rounded-md border border-border bg-card px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Load more ({names.length - visibleNames.length} remaining)
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
