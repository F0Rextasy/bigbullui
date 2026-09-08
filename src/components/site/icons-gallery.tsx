"use client";

import * as React from "react";
import { NAV_ICON_NAMES, NavIcon, type NavIconName } from "@/components/site/nav-icons";
import { CopyButton } from "@/components/ui/copy-button";

type Anim = "draw" | "pulse" | "spin" | "none";

export function IconsGallery() {
  const [big, setBig] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [animation, setAnimation] = React.useState<Anim>("draw");
  const q = query.trim().toLowerCase();
  const names = React.useMemo(
    () => NAV_ICON_NAMES.filter((name) => name.toLowerCase().includes(q)),
    [q]
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {names.length} hand-drawn icons
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
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search 1000+ icons… (ticket, arrow, cloud)"
          aria-label="Search icons"
          className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </label>
      {names.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border bg-card p-10 text-center">
          <p className="font-mono text-sm font-bold uppercase">No icons match that filter</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-3 rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase text-foreground transition-colors hover:border-foreground"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {names.map((name: NavIconName) => (
            <div
              key={name}
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/50"
            >
              <NavIcon name={name} size={big ? 40 : 20} animation={animation} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                {name}
              </span>
              <CopyButton value={`<StampIcon name="${name}" />`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
