"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PromptHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: { id: string; prompt: string; time: string }[];
  onReuse?: (prompt: string) => void;
}

/** Prompt history stub: past prompt rows with reuse action. */
export function PromptHistory({ items = [{ id: "p1", prompt: "Draft VIP welcome mail", time: "2h" }, { id: "p2", prompt: "Summarize gate scans", time: "5h" }], onReuse, className, ...props }: PromptHistoryProps) {
  const [list, setList] = React.useState(items);
  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card p-3", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Prompt history</span>
      <ul className="mt-2 space-y-1.5">
        {list.map((p) => (
          <li key={p.id} className="flex items-center gap-2 rounded-md border border-dashed border-border bg-background px-2.5 py-1.5">
            <p className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">{p.prompt} <span className="text-muted-foreground">· {p.time}</span></p>
            <button type="button" onClick={() => onReuse?.(p.prompt)} className="shrink-0 rounded border border-accent/50 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Reuse</button>
            <button type="button" aria-label={`Remove ${p.prompt}`} onClick={() => setList((l) => l.filter((x) => x.id !== p.id))} className="rounded px-1 font-mono text-xs text-muted-foreground hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">×</button>
          </li>
        ))}
        {list.length === 0 && <li className="py-2 text-center font-mono text-[11px] text-muted-foreground">History cleared</li>}
      </ul>
    </div>
  );
}
