"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ComboButtonsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onProgress"> {
  sequence?: string[];
  timeoutMs?: number;
  onComplete?: () => void;
  onProgress?: (hits: number, total: number) => void;
}

/** Combo buttons: input the shown sequence in order before the timer bar drains. */
export function ComboButtons({
  sequence = ["A", "B", "X"],
  timeoutMs = 4000,
  onComplete,
  onProgress,
  className,
  ...props
}: ComboButtonsProps) {
  const [hits, setHits] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    setHits(0);
    setDone(false);
  }, [cycle, sequence.join(",")]);

  React.useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setCycle((c) => c + 1), timeoutMs);
    return () => clearTimeout(t);
  }, [cycle, timeoutMs, done]);

  const press = (glyph: string) => {
    if (done) return;
    if (glyph === sequence[hits]) {
      const next = hits + 1;
      setHits(next);
      onProgress?.(next, sequence.length);
      if (next >= sequence.length) {
        setDone(true);
        onComplete?.();
      }
    } else {
      setHits(0);
      onProgress?.(0, sequence.length);
    }
  };

  const options = React.useMemo(() => Array.from(new Set(sequence)), [sequence]);

  return (
    <div className={cn("w-full max-w-xs touch-none select-none rounded-lg border-2 border-foreground bg-card p-3", className)} style={{ touchAction: "none" }} {...props}>
      <style>{`@keyframes comboDrain { from { width: 100%; } to { width: 0%; } }`}</style>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Combo input</p>
      <div className="mt-2 flex items-center gap-1.5" role="list" aria-label="Required sequence">
        {sequence.map((g, i) => (
          <span
            key={i}
            role="listitem"
            aria-label={`Step ${i + 1}: ${g}${i < hits ? ", complete" : ""}`}
            className={cn(
              "flex size-11 items-center justify-center rounded-md border-2 border-dashed font-mono text-sm font-black",
              i < hits
                ? "border-accent bg-accent/15 text-accent"
                : "border-border bg-secondary/40 text-muted-foreground"
            )}
          >
            {g}
          </span>
        ))}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
        {!done && (
          <div
            key={cycle}
            className="h-full rounded-full bg-accent animate-[comboDrain_4s_linear_forwards] motion-reduce:animate-none"
            style={{ animationDuration: `${timeoutMs}ms` }}
          />
        )}
        {done && <div className="h-full w-full rounded-full bg-success" />}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((g) => (
          <button
            key={g}
            type="button"
            aria-label={`Press ${g}`}
            style={{ touchAction: "none" }}
            onClick={() => press(g)}
            className="flex min-h-11 min-w-11 touch-none items-center justify-center rounded-md border border-foreground bg-background px-3 font-mono text-sm font-bold transition-colors hover:bg-secondary active:bg-primary active:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            {g}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setCycle((c) => c + 1)}
          className="ms-auto min-h-11 touch-none rounded-md px-3 font-mono text-[11px] uppercase text-muted-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Reset
        </button>
      </div>
      {done && (
        <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-wider text-success">
          Combo complete
        </p>
      )}
    </div>
  );
}
