"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SearchCommandItem {
  id: string;
  label: string;
  hint?: string;
  onSelect?: () => void;
}

export interface SearchCommandProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SearchCommandItem[];
  placeholder?: string;
  maxVisible?: number;
}

export function SearchCommand({
  items,
  placeholder = "Search...",
  maxVisible = 6,
  className,
  ...props
}: SearchCommandProps) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [focused, setFocused] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const matches = q.length === 0
    ? items
    : items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.hint ?? "").toLowerCase().includes(q),
    );
  const visible = matches.slice(0, maxVisible);

  React.useEffect(() => {
    setActive(0);
  }, [query]);

  React.useEffect(() => {
    if (!focused) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [focused ]);

  const run = (item: SearchCommandItem) => {
    item.onSelect?.();
    setQuery("");
    setFocused(false);
  };

  return (
    <div ref={boxRef} className={cn("relative w-full", className)} {...props}>
      <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 transition-colors focus-within:border-foreground/60">
        <span aria-hidden className="text-sm text-muted-foreground">⌕</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % Math.max(visible.length, 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a - 1 + Math.max(visible.length, 1)) % Math.max(visible.length, 1));
            } else if (e.key === "Enter" && visible[active]) {
              e.preventDefault();
              run(visible[active]);
            } else if (e.key === "Escape") {
              setFocused(false);
            }
          }}
          placeholder={placeholder}
          aria-label="Search"
          aria-expanded={focused && visible.length > 0}
          role="combobox"
          className="w-full bg-transparent font-mono text-sm focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="cursor-pointer font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        ) : null}
      </div>
      {focused && visible.length > 0 ? (
        <div role="listbox" className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-border bg-card p-1 shadow-lg">
          {visible.map((item, i) => (
            <div
              key={item.id}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => run(item)}
              className={cn(
                "cursor-pointer rounded px-3 py-2 transition-colors",
                i === active ? "bg-accent" : "hover:bg-secondary",
              )}
            >
              <p className={cn("font-mono text-sm", i === active ? "font-bold text-accent-foreground" : "")}>
                {item.label}
              </p>
              {item.hint ? (
                <p className={cn("truncate font-mono text-[11px]", i === active ? "text-accent-foreground/80" : "text-muted-foreground")}>
                  {item.hint}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
