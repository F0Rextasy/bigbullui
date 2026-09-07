"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface JsonFormatterProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

/** JSON pretty printer with error line stamp. */
export function JsonFormatter({ defaultValue = '{"section":"C","row":12,"vip":true}', className, ...props }: JsonFormatterProps) {
  const [raw, setRaw] = React.useState(defaultValue);
  const [error, setError] = React.useState<string | null>(null);
  const format = () => {
    try {
      setRaw(JSON.stringify(JSON.parse(raw), null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">JSON formatter</p>
        <button type="button" onClick={format} className="rounded border border-foreground bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase text-primary-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Format
        </button>
      </div>
      <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={5} spellCheck={false} aria-label="JSON input" className="mt-2 w-full resize-none rounded-md border border-dashed border-border bg-background p-2 font-mono text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      {error ? <p className="mt-2 rounded bg-destructive/10 px-2 py-1 font-mono text-[11px] text-destructive" role="alert">{error}</p> : <p className="mt-2 font-mono text-[11px] uppercase text-accent">Valid stub payload</p>}
    </div>
  );
}
