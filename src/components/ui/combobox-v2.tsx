"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ComboboxV2Option {
  value: string;
  label: string;
}

export interface ComboboxV2Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options?: ComboboxV2Option[];
  loadOptions?: (query: string, page: number) => Promise<{ options: ComboboxV2Option[]; hasMore: boolean }>;
  value?: string;
  defaultValue?: string;
  onSelectionChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  debounceMs?: number;
}

export function ComboboxV2({
  options: staticOptions,
  loadOptions,
  value: controlledValue,
  defaultValue = "",
  onSelectionChange,
  placeholder = "Search...",
  searchable = true,
  debounceMs = 300,
  className,
  ...props
}: ComboboxV2Props) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<ComboboxV2Option[]>(staticOptions ?? []);
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const reqId = React.useRef(0);

  const pick = (v: string) => {
    setInner(v);
    onSelectionChange?.(v);
    setOpen(false);
    setQuery("");
  };

  const fetchPage = React.useCallback(
    async (q: string, p: number, append: boolean) => {
      if (!loadOptions) return;
      const id = ++reqId.current;
      setLoading(true);
      try {
        const res = await loadOptions(q, p);
        if (reqId.current !== id) return;
        setItems((prev) => (append ? [...prev, ...res.options] : res.options));
        setHasMore(res.hasMore);
        setPage(p);
      } finally {
        if (reqId.current === id) setLoading(false);
      }
    },
    [loadOptions],
  );

  React.useEffect(() => {
    if (!loadOptions || !open) return;
    const t = setTimeout(() => void fetchPage(query, 0, false), debounceMs);
    return () => clearTimeout(t);
  }, [query, open, loadOptions, debounceMs, fetchPage]);

  React.useEffect(() => {
    if (!loadOptions || !open || !hasMore || loading) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) void fetchPage(query, page + 1, true);
      },
      { rootMargin: "40px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loadOptions, open, hasMore, loading, page, query, fetchPage]);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const visible = staticOptions
    ? items.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : items;
  const selected = [...(staticOptions ?? []), ...items].find((o) => o.value === value);

  return (
    <div ref={boxRef} className={cn("relative w-full", className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full cursor-pointer items-center justify-between rounded-md border border-border bg-card px-3 py-2 font-mono text-sm transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className={cn("truncate", !selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        <span aria-hidden className="ms-2 text-xs text-muted-foreground">▾</span>
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-border bg-card shadow-lg">
          {searchable ? (
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter..."
              aria-label="Filter options"
              className="w-full border-b border-dashed border-border bg-transparent px-3 py-2 font-mono text-sm focus:outline-none"
            />
          ) : null}
          <div role="listbox" className="max-h-56 overflow-y-auto p-1">
            {visible.map((o) => (
              <div
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                onClick={() => pick(o.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pick(o.value);
                  }
                }}
                tabIndex={0}
                className={cn(
                  "cursor-pointer rounded px-3 py-2 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  o.value === value ? "bg-accent font-bold text-accent-foreground" : "hover:bg-secondary",
                )}
              >
                {o.label}
              </div>
            ))}
            {visible.length === 0 && !loading ? (
              <p className="px-3 py-4 text-center font-mono text-xs text-muted-foreground">No matches</p>
            ) : null}
            <div ref={sentinelRef} aria-hidden className="h-1" />
            {loading ? (
              <p className="px-3 py-2 text-center font-mono text-[11px] uppercase text-muted-foreground">Loading…</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
