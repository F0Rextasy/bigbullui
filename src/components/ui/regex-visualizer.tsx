"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RegexVisualizerProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultPattern?: string;
  defaultSample?: string;
}

/** Regex match highlighter with group readout. */
export function RegexVisualizer({ defaultPattern = "ROW [A-Z]", defaultSample = "ROW C SEAT 12, ROW D SEAT 04", className, ...props }: RegexVisualizerProps) {
  const [pattern, setPattern] = React.useState(defaultPattern);
  const [sample, setSample] = React.useState(defaultSample);
  const parts = React.useMemo(() => {
    try {
      const re = new RegExp(`(${pattern})`, "g");
      return sample.split(re);
    } catch {
      return [sample];
    }
  }, [pattern, sample]);
  let valid = true;
  try {
    new RegExp(pattern);
  } catch {
    valid = false;
  }
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Regex visualizer</p>
      <input value={pattern} onChange={(e) => setPattern(e.target.value)} spellCheck={false} aria-label="Regex pattern" className={cn("mt-2 w-full rounded-md border border-dashed bg-secondary/40 p-2 font-mono text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring", valid ? "border-border" : "border-destructive")} />
      <textarea value={sample} onChange={(e) => setSample(e.target.value)} rows={2} aria-label="Sample text" className="mt-2 w-full resize-none rounded-md border border-dashed border-border bg-secondary/40 p-2 font-mono text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      <p className="mt-2 rounded-md border border-border bg-background p-2 font-mono text-xs leading-relaxed text-foreground" aria-live="polite">
        {parts.map((p, i) =>
          i % 2 === 1 ? <mark key={i} className="rounded bg-accent px-0.5 text-accent-foreground">{p}</mark> : <span key={i}>{p}</span>
        )}
      </p>
      {!valid && <p className="mt-1 font-mono text-[11px] uppercase text-destructive">Invalid pattern</p>}
    </div>
  );
}
