"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LoremTyperProps extends React.HTMLAttributes<HTMLDivElement> {
  paragraphs?: number;
}

const SENTENCES = [
  "The box office opens at dawn with fresh ink and numbered stubs.",
  "Row C fills first while the balcony hums with quiet chatter.",
  "Ushers stamp each pass under warm lobby light.",
  "The curtain rises as the last barcode sings at the gate.",
];

/** Placeholder paragraph generator with copy action. */
export function LoremTyper({ paragraphs = 2, className, ...props }: LoremTyperProps) {
  const [count, setCount] = React.useState(paragraphs);
  const text = React.useMemo(
    () => Array.from({ length: count }, (_, p) => SENTENCES.map((s, i) => (i + p) % 2 === 0 ? s : `${s} Seat ${p * 4 + i + 1}.`).join(" ")).join("\n\n"),
    [count]
  );
  const [copied, setCopied] = React.useState(false);
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lorem typer</p>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <button type="button" onClick={() => setCount((c) => Math.max(1, c - 1))} aria-label="Fewer paragraphs" className="rounded border border-border px-2 py-0.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">-</button>
          <span className="font-bold text-accent">{count}</span>
          <button type="button" onClick={() => setCount((c) => Math.min(6, c + 1))} aria-label="More paragraphs" className="rounded border border-border px-2 py-0.5 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">+</button>
        </div>
      </div>
      <p className="mt-2 max-h-40 overflow-auto rounded-md border border-dashed border-border bg-secondary/40 p-2 text-xs leading-relaxed whitespace-pre-line text-foreground">{text}</p>
      <button type="button" onClick={() => { void navigator.clipboard?.writeText(text).catch(() => undefined); setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="mt-2 rounded border border-foreground bg-secondary px-3 py-1 font-mono text-[11px] font-bold uppercase text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {copied ? "Copied" : "Copy text"}
      </button>
    </div>
  );
}
