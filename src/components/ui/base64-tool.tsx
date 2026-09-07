"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Base64ToolProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

/** Base64 encode and decode panel with copy stamp. */
export function Base64Tool({ defaultValue = "ADMIT ONE ROW C", className, ...props }: Base64ToolProps) {
  const [input, setInput] = React.useState(defaultValue);
  const [mode, setMode] = React.useState<"encode" | "decode">("encode");
  const [copied, setCopied] = React.useState(false);
  const output = React.useMemo(() => {
    try {
      return mode === "encode" ? btoa(input) : atob(input);
    } catch {
      return "Invalid input for selected mode";
    }
  }, [input, mode]);
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Base64 tool</p>
        <div className="flex gap-1">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={cn("rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", mode === m ? "border-foreground bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground")}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={2} className="mt-2 w-full resize-none rounded-md border border-dashed border-border bg-secondary/40 p-2 font-mono text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Base64 input" />
      <pre className="mt-2 max-h-24 overflow-auto rounded-md border border-border bg-background p-2 font-mono text-[11px] text-accent">{output}</pre>
      <button
        type="button"
        onClick={() => { void navigator.clipboard?.writeText(output).catch(() => undefined); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
        className="mt-2 rounded border border-foreground bg-secondary px-3 py-1 font-mono text-[11px] font-bold uppercase text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {copied ? "Copied" : "Copy output"}
      </button>
    </div>
  );
}
