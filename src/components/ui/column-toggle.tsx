"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ColumnToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  columns: { id: string; label: string; visible?: boolean }[];
  onToggle?: (id: string, visible: boolean) => void;
}

/** Kolon göster/gizle menüsü — data-grid üstünde kullanılır. */
export function ColumnToggle({ columns, onToggle, className, ...props }: ColumnToggleProps) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(
    () => new Map(columns.map((c) => [c.id, c.visible !== false]))
  );
  React.useEffect(() => {
    setState(new Map(columns.map((c) => [c.id, c.visible !== false])));
  }, [columns]);

  const toggle = (id: string) => {
    const next = new Map(state);
    const val = !(next.get(id) ?? true);
    next.set(id, val);
    setState(next);
    onToggle?.(id, val);
  };

  const visibleCount = [...state.values()].filter(Boolean).length;

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground",
          "transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        )}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M10 4v16" />
        </svg>
        Kolonlar ({visibleCount}/{columns.length})
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} aria-hidden="true" />
          <ul className="absolute right-0 z-40 mt-1 w-48 rounded-md border border-border bg-card p-1 shadow-lg animate-[fade-in-up_0.2s_ease-out_both] motion-reduce:animate-none" role="menu">
            {columns.map((col) => {
              const checked = state.get(col.id) ?? true;
              return (
                <li key={col.id}>
                  <label className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none">
                    <input type="checkbox" checked={checked} onChange={() => toggle(col.id)} className="size-3.5 accent-accent" />
                    {col.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
