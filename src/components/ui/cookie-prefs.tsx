"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CookiePrefsProps extends React.HTMLAttributes<HTMLDivElement> {
  onSave?: (prefs: Record<string, boolean>) => void;
}

const COOKIES = [
  { id: "needed", label: "Strictly needed", locked: true },
  { id: "stats", label: "Show statistics", locked: false },
  { id: "promo", label: "Promo offers", locked: false },
];

/** Cookie prefs: granular consent toggles with save confirmation. */
export function CookiePrefs({ onSave, className, ...props }: CookiePrefsProps) {
  const [prefs, setPrefs] = React.useState<Record<string, boolean>>({ needed: true, stats: true, promo: false });
  const [saved, setSaved] = React.useState(false);
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <h3 className="text-sm font-black">Cookie preferences</h3>
      <ul className="mt-2 divide-y divide-dashed divide-border">
        {COOKIES.map((c) => (
          <li key={c.id} className="flex items-center justify-between py-2">
            <span className="text-xs font-bold">
              {c.label}
              {c.locked && <span className="ms-1.5 font-mono text-[10px] uppercase text-muted-foreground">Locked</span>}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={prefs[c.id]}
              aria-label={c.label}
              disabled={c.locked}
              onClick={() => {
                setPrefs((p) => ({ ...p, [c.id]: !p[c.id] }));
                setSaved(false);
              }}
              className={cn(
                "relative h-5 w-9 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                prefs[c.id] ? "border-accent bg-accent" : "border-border bg-secondary",
                c.locked && "opacity-60"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-3.5 rounded-full bg-card shadow transition-all motion-reduce:transition-none",
                  prefs[c.id] ? "left-[18px]" : "left-0.5"
                )}
              />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          onSave?.(prefs);
          setSaved(true);
        }}
        className="mt-3 w-full rounded-md bg-primary py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {saved ? "Saved ✓" : "Save choices"}
      </button>
    </div>
  );
}
