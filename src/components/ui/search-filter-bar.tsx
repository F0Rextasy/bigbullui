"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SearchFilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  sorts?: { id: string; label: string }[];
  activeSort?: string;
  onSortChange?: (id: string) => void;
  filters?: { id: string; label: string; active?: boolean }[];
  onFilterToggle?: (id: string) => void;
}

/** Arama + sıralama + filtre birleşik araç çubuğu. */
export function SearchFilterBar({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Ara…",
  sorts = [],
  activeSort,
  onSortChange,
  filters = [],
  onFilterToggle,
  className,
  ...props
}: SearchFilterBarProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const query = value ?? internal;
  const [activeFilters, setActiveFilters] = React.useState<Set<string>>(
    () => new Set(filters.filter((f) => f.active).map((f) => f.id))
  );
  React.useEffect(() => {
    setActiveFilters(new Set(filters.filter((f) => f.active).map((f) => f.id)));
  }, [filters]);

  const setQuery = (v: string) => { setInternal(v); onValueChange?.(v); };
  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    onFilterToggle?.(id);
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} role="search" {...props}>
      <style>{`@keyframes sfbChip { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>
      {/* Arama */}
      <div className="relative min-w-40 flex-1">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full rounded-md border border-input bg-background py-1.5 pl-8 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
        />
      </div>

      {/* Sıralama */}
      {sorts.length > 0 && (
        <div className="flex gap-1 rounded-md border border-border bg-card p-0.5" role="radiogroup" aria-label="Sıralama">
          {sorts.map((s) => (
            <button
              key={s.id}
              role="radio"
              aria-checked={activeSort === s.id}
              onClick={() => onSortChange?.(s.id)}
              className={cn(
                "rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                activeSort === s.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Filtre chip'leri */}
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => toggleFilter(f.id)}
          aria-pressed={activeFilters.has(f.id)}
          className={cn(
            "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "animate-[sfbChip_0.2s_ease-out] motion-reduce:animate-none",
            activeFilters.has(f.id)
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
