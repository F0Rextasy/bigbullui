"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StreamingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  speedMs?: number;
  showCursor?: boolean;
  onDone?: () => void;
}

/** Streams text character by character with a blinking block cursor. */
export function StreamingText({
  text = "",
  speedMs = 24,
  showCursor = true,
  onDone,
  className,
  ...props
}: StreamingTextProps) {
  const [state, setState] = React.useState<{ forText: string; count: number }>({ forText: text, count: 0 });
  const doneRef = React.useRef(false);
  const onDoneRef = React.useRef(onDone);

  React.useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  React.useEffect(() => {
    doneRef.current = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedTimer = window.setTimeout(() => {
        setState({ forText: text, count: text.length });
        if (!doneRef.current) {
          doneRef.current = true;
          onDoneRef.current?.();
        }
      }, 0);
      return () => window.clearTimeout(reducedTimer);
    }
    const id = window.setInterval(() => {
      setState((prev) => {
        const cur = prev.forText === text ? prev.count : 0;
        if (cur >= text.length) {
          window.clearInterval(id);
          if (!doneRef.current) {
            doneRef.current = true;
            onDoneRef.current?.();
          }
          return prev.forText === text ? prev : { forText: text, count: cur };
        }
        return { forText: text, count: cur + 1 };
      });
    }, Math.max(4, speedMs));
    return () => window.clearInterval(id);
  }, [text, speedMs]);

  const count = state.forText === text ? state.count : 0;
  const streaming = count < text.length;
  return (
    <div
      className={cn("w-full rounded-lg border border-dashed border-border bg-card p-3", className)}
      aria-live="polite"
      {...props}
    >
      <p className="text-sm leading-6 text-foreground">
        {text.slice(0, count)}
        {showCursor && (
          <span
            aria-hidden="true"
            className={cn(
              "ms-0.5 inline-block h-4 w-2 translate-y-0.5 bg-accent",
              streaming ? "animate-pulse motion-reduce:animate-none" : "opacity-40",
            )}
          />
        )}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {streaming ? `Streaming ${count}/${text.length}` : "Stream complete"}
      </p>
    </div>
  );
}
