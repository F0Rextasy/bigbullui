"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ShortcutRow {
  action: string;
  keys: string[];
}

export interface KeyboardShortcutsProps extends React.HTMLAttributes<HTMLDivElement> {
  shortcuts?: ShortcutRow[];
}

/** Keyboard shortcuts: action rows with keycap chips. */
export function KeyboardShortcuts({
  shortcuts = [
    { action: "Search stubs", keys: ["Ctrl", "K"] },
    { action: "Print pass", keys: ["Ctrl", "P"] },
    { action: "Close panel", keys: ["Esc"] },
  ],
  className,
  ...props
}: KeyboardShortcutsProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Keyboard map</p>
      <ul className="mt-2 space-y-1.5">
        {shortcuts.map((s) => (
          <li key={s.action} className="flex items-center justify-between gap-2 rounded-md border border-dashed border-border px-2.5 py-1.5">
            <span className="text-xs font-bold">{s.action}</span>
            <span className="flex gap-1">
              {s.keys.map((k) => (
                <kbd key={k} className="rounded border-b-2 border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-bold">
                  {k}
                </kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
