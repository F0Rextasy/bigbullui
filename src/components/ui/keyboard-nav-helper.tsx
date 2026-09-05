"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface KeyboardShortcut {
  keys: string[];
  label: string;
}

export interface KeyboardNavHelperProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcuts: KeyboardShortcut[];
}

/** Keyboard shortcuts modal overlay triggered by "?" key. */
export function KeyboardNavHelper({ shortcuts, className, ...props }: KeyboardNavHelperProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.key === "?") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4", className)} onClick={() => setOpen(false)} {...props}>
      <style>{`@keyframes khIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-lg border border-border bg-card p-5 shadow-lg animate-[khIn_0.2s_ease-out_both] motion-reduce:animate-none"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Keyboard Shortcuts</h3>
          <button
            onClick={() => setOpen(false)}
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            aria-label="Kapat"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <ul className="mt-3 divide-y divide-border/50">
          {shortcuts.map((s, idx) => (
            <li key={idx} className="flex items-center justify-between py-2 animate-[fade-in-up_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 40}ms` }}>
              <span className="text-sm text-foreground">{s.label}</span>
              <span className="flex gap-1">
                {s.keys.map((k) => (
                  <kbd key={k} className="rounded-sm border border-b-2 border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground">{k}</kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
