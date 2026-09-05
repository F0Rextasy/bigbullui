"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DiffEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  before: string;
  after: string;
  readOnly?: boolean;
  onBeforeChange?: (v: string) => void;
  onAfterChange?: (v: string) => void;
}

/** Side-by-side editable diff comparison editor. */
export function DiffEditor({ before, after, readOnly, onBeforeChange, onAfterChange, className, ...props }: DiffEditorProps) {
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");
  const maxLines = Math.max(beforeLines.length, afterLines.length);
  const beforeSet = new Set(beforeLines);
  const afterSet = new Set(afterLines);

  const rowTone = (idx: number): "same" | "added" | "removed" | "changed" => {
    const b = beforeLines[idx];
    const a = afterLines[idx];
    if (b === a) return "same";
    if (b === undefined) return "added";
    if (a === undefined) return "removed";
    if (!afterSet.has(b) || !beforeSet.has(a)) return "changed";
    return "same";
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes deIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <div className="grid grid-cols-2 divide-x divide-border border-b border-border bg-secondary/60 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="px-3 py-1.5">Original</span>
        <span className="px-3 py-1.5">Sonra</span>
      </div>
      <div className="grid max-h-64 grid-cols-2 divide-x divide-border overflow-auto">
        <textarea
          value={before}
          onChange={(e) => onBeforeChange?.(e.target.value)}
          readOnly={readOnly}
          aria-label="Previous version"
          spellCheck={false}
          className="min-h-40 resize-none bg-transparent p-3 font-mono text-xs leading-5 text-foreground focus-visible:outline-none"
        />
        <textarea
          value={after}
          onChange={(e) => onAfterChange?.(e.target.value)}
          readOnly={readOnly}
          aria-label="Next version"
          spellCheck={false}
          className={cn(
            "min-h-40 resize-none bg-transparent p-3 font-mono text-xs leading-5 text-foreground focus-visible:outline-none animate-[deIn_0.3s_ease-out] motion-reduce:animate-none",
            maxLines > 0 && afterLines.some((l, i) => rowTone(i) !== "same") && "bg-emerald-500/5"
          )}
        />
      </div>
    </div>
  );
}
