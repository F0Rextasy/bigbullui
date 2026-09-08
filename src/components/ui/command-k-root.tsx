"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CommandKRootItem {
  id: string;
  label: string;
  hint?: string;
}

export interface CommandKRootProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: CommandKRootItem[];
}

/** Command-K root: trigger button opening a filterable command list. */
export function CommandKRoot({
  items = [
    { id: "c1", label: "Print ticket stub", hint: "P" },
    { id: "c2", label: "Open seat map", hint: "M" },
    { id: "c3", label: "Toggle night stub", hint: "T" },
  ],
  className,
  ...props
}: CommandKRootProps) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  return (
    <div className={cn("w-full max-w-sm", className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-md border-2 border-dashed border-border bg-card px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        <span>Search commands...</span>
        <span className="flex gap-0.5">
          <kbd className="rounded border-b-2 border-border bg-secondary px-1.5 py-0.5 text-[10px] font-bold">Ctrl</kbd>
          <kbd className="rounded border-b-2 border-border bg-secondary px-1.5 py-0.5 text-[10px] font-bold">K</kbd>
        </span>
      </button>
      {open && (
        <div className="mt-2 overflow-hidden rounded-lg border-2 border-foreground bg-card shadow-md" role="dialog" aria-label="Commands">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command..."
            aria-label="Filter commands"
            className="w-full border-b-2 border-dashed border-border bg-transparent px-3 py-2 font-mono text-xs focus-visible:outline-none"
          />
          <ul className="max-h-44 overflow-auto p-1.5">
            {filtered.length === 0 && <li className="px-2.5 py-2 font-mono text-xs text-muted-foreground">No matches.</li>}
            {filtered.map((i) => (
              <li key={i.id}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-between rounded px-2.5 py-2 text-start text-xs font-bold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  {i.label}
                  {i.hint && <kbd className="rounded border border-border px-1 font-mono text-[10px] text-muted-foreground">{i.hint}</kbd>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
