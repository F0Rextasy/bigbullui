"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StopwatchV2Props extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

function pad(n: number, len = 2): string {
  return String(n).padStart(len, "0");
}

export function StopwatchV2({ label = "CHRONO", className, ...props }: StopwatchV2Props) {
  const [elapsed, setElapsed] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [laps, setLaps] = React.useState<number[]>([]);
  const startRef = React.useRef(0);
  const baseRef = React.useRef(0);

  React.useEffect(() => {
    if (!running) return;
    startRef.current = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      setElapsed(baseRef.current + (t - startRef.current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running ]);

  const toggle = () => {
    if (running) {
      baseRef.current = elapsed;
      setRunning(false);
    } else {
      setRunning(true);
    }
  };

  const reset = () => {
    setRunning(false);
    baseRef.current = 0;
    setElapsed(0);
    setLaps([]);
  };

  const ms = Math.floor(elapsed % 1000);
  const s = Math.floor(elapsed / 1000) % 60;
  const m = Math.floor(elapsed / 60000) % 60;
  const h = Math.floor(elapsed / 3600000);

  return (
    <div className={cn("w-full max-w-xs rounded-lg border-2 border-foreground bg-card p-4 text-center", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-4xl font-bold tabular-nums text-accent" aria-live="polite">
        {h > 0 ? `${pad(h)}:` : ""}
        {pad(m)}:{pad(s)}
        <span className="text-lg">.{pad(Math.floor(ms / 10))}</span>
      </p>
      <div className="mt-3 flex justify-center gap-2">
        <button
          type="button"
          onClick={toggle}
          className="cursor-pointer rounded-md bg-accent px-4 py-1.5 font-mono text-xs font-bold uppercase text-accent-foreground transition-transform hover:scale-105 active:scale-95"
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => setLaps((prev) => [...prev, elapsed])}
          disabled={!running}
          className="cursor-pointer rounded-md border border-border px-4 py-1.5 font-mono text-xs uppercase text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Lap
        </button>
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer rounded-md border border-border px-4 py-1.5 font-mono text-xs uppercase text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset
        </button>
      </div>
      {laps.length > 0 ? (
        <ol className="mt-3 max-h-28 space-y-1 overflow-y-auto border-t border-dashed border-border pt-2 text-start">
          {laps.map((lap, i) => (
            <li key={i} className="flex justify-between font-mono text-[11px] text-muted-foreground">
              <span>LAP {i + 1}</span>
              <span className="tabular-nums">
                {pad(Math.floor(lap / 60000))}:{pad(Math.floor(lap / 1000) % 60)}.{pad(Math.floor((lap % 1000) / 10))}
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
