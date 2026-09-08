"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ExportMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  onExport?: (format: string) => void;
}

/** Export menu stub: dashed dropdown of file formats. */
export function ExportMenu({ onExport, className, ...props }: ExportMenuProps) {
  const [open, setOpen] = React.useState(false);
  const formats = ["CSV", "PDF", "JSON", "Print"];
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Export ▾
      </button>
      {open && (
        <div role="menu" className="absolute right-0 z-10 mt-1 w-36 rounded-md border border-border bg-card p-1 shadow-md outline-1 outline-dashed outline-offset-[-4px] outline-border/60">
          {formats.map((f) => (
            <button
              key={f}
              type="button"
              role="menuitem"
              onClick={() => { onExport?.(f); setOpen(false); }}
              className="w-full rounded px-2 py-1.5 text-start font-mono text-[11px] uppercase text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
