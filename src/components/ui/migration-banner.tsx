"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MigrationBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  /** 0-100 */
  progress: number;
  detail?: string;
}

/** Veri taşıma uyarısı: ilerleme + açılır detay. */
export function MigrationBanner({ title = "Verilerin yeni sisteme taşınıyor", progress, detail, className, ...props }: MigrationBannerProps) {
  const [open, setOpen] = React.useState(false);
  const pct = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className={cn("w-full rounded-lg border border-sky-500/40 bg-sky-500/5", className)} {...props}>
      <style>{`@keyframes migIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center gap-3 px-4 py-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-sky-600 animate-pulse motion-reduce:animate-none" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 3v6h-6" />
        </svg>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{title}</p>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-border/50">
            <div className="h-full rounded-full bg-sky-500 transition-all duration-700 motion-reduce:transition-none" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <span className="shrink-0 font-mono text-[10px] tabular-nums text-sky-600">%{pct}</span>
        {detail && (
          <button
            onClick={() => setOpen((o) => !o)}
            className="shrink-0 rounded-sm p-1 text-muted-foreground transition-transform duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            aria-expanded={open}
            aria-label="Detay"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform duration-200 motion-reduce:transition-none", open && "rotate-180")} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>
        )}
      </div>
      {open && detail && (
        <p className="border-t border-sky-500/20 px-4 py-2 text-xs text-muted-foreground animate-[migIn_0.25s_ease-out_both] motion-reduce:animate-none">{detail}</p>
      )}
    </div>
  );
}
