"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface JsonInspectorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: unknown;
  defaultExpanded?: boolean;
  maxDepth?: number;
  label?: string;
}

function renderValue(value: unknown, depth: number, maxDepth: number): React.ReactNode {
  if (value === null) return <span className="text-muted-foreground">null</span>;
  if (value === undefined) return <span className="text-muted-foreground">undefined</span>;
  const t = typeof value;
  if (t === "string") return <span className="text-accent">“{value as string}”</span>;
  if (t === "number" || t === "bigint") return <span className="text-foreground">{String(value)}</span>;
  if (t === "boolean") return <span className="text-accent">{String(value)}</span>;
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-muted-foreground">[]</span>;
    if (depth >= maxDepth) return <span className="text-muted-foreground">Array({value.length}) […]</span>;
    return (
      <span>
        [
        {value.map((v, i) => (
          <span key={i} className="block ps-4">
            {renderValue(v, depth + 1, maxDepth)}
            {i < value.length - 1 ? <span className="text-muted-foreground">,</span> : null}
          </span>
        ))}
        ]
      </span>
    );
  }
  if (t === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span className="text-muted-foreground">{"{}"}</span>;
    if (depth >= maxDepth) return <span className="text-muted-foreground">{"{…}"}</span>;
    return (
      <span>
        {"{"}
        {entries.map(([k, v], i) => (
          <span key={k} className="block ps-4">
            <span className="text-foreground">“{k}”</span>
            <span className="text-muted-foreground">: </span>
            {renderValue(v, depth + 1, maxDepth)}
            {i < entries.length - 1 ? <span className="text-muted-foreground">,</span> : null}
          </span>
        ))}
        {"}"}
      </span>
    );
  }
  return <span className="text-muted-foreground">{String(value)}</span>;
}

function Collapsible({ k, children, startOpen }: { k: string; children: React.ReactNode; startOpen: boolean }) {
  const [open, setOpen] = React.useState(startOpen);
  return (
    <span className="block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cursor-pointer font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        {open ? "▾" : "▸"} {k}
      </button>
      {open ? <span className="block ps-4">{children}</span> : <span className="text-muted-foreground"> …</span>}
    </span>
  );
}

export function JsonInspector({ value, defaultExpanded = true, maxDepth = 4, label, className, ...props }: JsonInspectorProps) {
  const top: [string, unknown][] =
    value !== null && typeof value === "object" && !Array.isArray(value)
      ? Object.entries(value as Record<string, unknown>)
      : [["root", value]];

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-xs leading-relaxed", className)} {...props}>
      {label ? (
        <p className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      ) : null}
      {top.map(([k, v]) =>
        typeof v === "object" && v !== null ? (
          <Collapsible key={k} k={k} startOpen={defaultExpanded}>
            {renderValue(v, 1, maxDepth)}
          </Collapsible>
        ) : (
          <span key={k} className="block">
            <span className="text-foreground">“{k}”</span>
            <span className="text-muted-foreground">: </span>
            {renderValue(v, 1, maxDepth)}
          </span>
        ),
      )}
    </div>
  );
}
