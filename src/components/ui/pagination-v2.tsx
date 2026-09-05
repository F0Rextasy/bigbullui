"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PaginationV2Props extends React.HTMLAttributes<HTMLElement> {
  totalPages: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** sonsuz kaydırma tetikleyicisi göster */
  infiniteHint?: boolean;
}

/** Hibrit sayfalama: numaralı + sonsuz kaydırma ipucu. */
export function PaginationV2({ totalPages, page, defaultPage = 1, onPageChange, infiniteHint, className, ...props }: PaginationV2Props) {
  const [internal, setInternal] = React.useState(defaultPage);
  const current = page ?? internal;
  const go = (p: number) => {
    const clamped = Math.max(1, Math.min(totalPages, p));
    setInternal(clamped);
    onPageChange?.(clamped);
  };

  const pages = React.useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const set = new Set([1, 2, current - 1, current, current + 1, totalPages - 1, totalPages]);
    const sorted = [...set].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const out: (number | "…")[] = [];
    let prev = 0;
    for (const p of sorted) {
      if (p - prev > 1) out.push("…");
      out.push(p);
      prev = p;
    }
    return out;
  }, [totalPages, current]);

  return (
    <nav className={cn("flex flex-col items-center gap-2", className)} aria-label="Sayfalama" {...props}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            onClick={() => go(current - 1)}
            disabled={current <= 1}
            className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            aria-label="Önceki sayfa"
          >
            ←
          </button>
        </li>
        {pages.map((p, idx) =>
          p === "…" ? (
            <li key={`e-${idx}`} className="px-1 font-mono text-[10px] text-muted-foreground">…</li>
          ) : (
            <li key={p}>
              <button
                onClick={() => go(p)}
                aria-current={p === current ? "page" : undefined}
                className={cn(
                  "size-7 rounded-sm border font-mono text-[11px] tabular-nums transition-all duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  p === current ? "border-accent bg-accent text-accent-foreground animate-[scale-in_0.15s_ease-out] motion-reduce:animate-none" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {p}
              </button>
            </li>
          )
        )}
        <li>
          <button
            onClick={() => go(current + 1)}
            disabled={current >= totalPages}
            className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            aria-label="Sonraki sayfa"
          >
            →
          </button>
        </li>
      </ul>
      {infiniteHint && current < totalPages && (
        <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">aşağı kaydırarak devam et</p>
      )}
    </nav>
  );
}
