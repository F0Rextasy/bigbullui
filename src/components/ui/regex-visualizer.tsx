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
  const { segments, valid } = React.useMemo(() => {
    if (!pattern || pattern.length > 200 || /(\([^)]*[+*][^)]*\))[+*{]/.test(pattern)) {
      return { segments: [{ text: sample, hit: false }], valid: pattern === "" };
    }
    try {
      const re = new RegExp(pattern, "g");
      const bounded = sample.slice(0, 10000);
      const out: { text: string; hit: boolean }[] = [];
      let last = 0;
      let steps = 0;
      for (const m of bounded.matchAll(re)) {
        if (++steps > 500) break;
        const idx = m.index ?? 0;
        if (idx > last) out.push({ text: bounded.slice(last, idx), hit: false });
        if (m[0].length > 0) out.push({ text: m[0], hit: true });
        last = idx + m[0].length;
        if (m[0].length === 0) break;
      }
      if (last < bounded.length) out.push({ text: bounded.slice(last), hit: false });
      return { segments: out, valid: true };
    } catch {
      return { segments: [{ text: sample, hit: false }], valid: false };
    }
  }, [pattern, sample]);

  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Regex visualizer</p>
      <input value={pattern} onChange={(e) => setPattern(e.target.value)} spellCheck={false} aria-label="Regex pattern" className={cn("mt-2 w-full rounded-md border border-dashed bg-secondary/40 p-2 font-mono text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring", valid ? "border-border" : "border-destructive")} />
      <textarea value={sample} onChange={(e) => setSample(e.target.value)} rows={2} aria-label="Sample text" className="mt-2 w-full resize-none rounded-md border border-dashed border-border bg-secondary/40 p-2 font-mono text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      <p className="mt-2 rounded-md border border-border bg-background p-2 font-mono text-xs leading-relaxed text-foreground" aria-live="polite">
        {segments.map((seg, i) =>
          seg.hit ? <mark key={i} className="rounded bg-accent px-0.5 text-accent-foreground">{seg.text}</mark> : <span key={i}>{seg.text}</span>
        )}
      </p>
      {!valid && <p className="mt-1 font-mono text-[11px] uppercase text-destructive">Invalid or unsafe pattern</p>}
    </div>
  );
}
