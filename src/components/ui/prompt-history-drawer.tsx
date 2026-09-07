"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PromptHistoryItem {
  id: string;
  title: string;
  preview: string;
}

export interface PromptHistoryDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: PromptHistoryItem[];
  triggerLabel?: string;
  onRestore?: (item: PromptHistoryItem) => void;
  onClear?: () => void;
}

/** Slide-over drawer listing saved prompts with restore and clear actions. */
export function PromptHistoryDrawer({
  items = [
    { id: "p1", title: "Festival poster stub", preview: "Design a cream festival stub with red stamp..." },
    { id: "p2", title: "Boarding pass print", preview: "Printable boarding pass, night stub theme..." },
  ],
  triggerLabel = "History",
  onRestore,
  onClear,
  className,
  ...props
}: PromptHistoryDrawerProps) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open ]);
  return (
    <div className={cn("relative", className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="cursor-pointer rounded border-2 border-foreground bg-card px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {triggerLabel} ({items.length})
      </button>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Prompt history">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside className="absolute right-0 top-0 flex h-full w-72 flex-col border-l-2 border-foreground bg-card">
            <div className="flex items-center justify-between border-b border-dashed border-border px-3 py-2">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Prompt history
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close history"
                className="cursor-pointer rounded border border-border px-2 py-0.5 font-mono text-[11px] text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                ESC
              </button>
            </div>
            <ul className="flex-1 space-y-2 overflow-y-auto p-3">
              {items.length === 0 && (
                <li className="rounded border border-dashed border-border p-3 text-center font-mono text-[11px] uppercase text-muted-foreground">
                  No saved prompts
                </li>
              )}
              {items.map((item) => (
                <li key={item.id} className="rounded border border-border bg-background p-2.5">
                  <p className="text-xs font-bold text-foreground">{item.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{item.preview}</p>
                  <button
                    type="button"
                    onClick={() => {
                      onRestore?.(item);
                      setOpen(false);
                    }}
                    className="mt-1.5 cursor-pointer font-mono text-[10px] font-bold uppercase tracking-wider text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Restore
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-dashed border-border p-3">
              <button
                type="button"
                onClick={() => onClear?.()}
                className="w-full cursor-pointer rounded border border-dashed border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Clear history
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
