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
  text,
  speedMs = 24,
  showCursor = true,
  onDone,
  className,
  ...props
}: StreamingTextProps) {
  const [count, setCount] = React.useState(0);
  const doneRef = React.useRef(false);
  React.useEffect(() => {
    doneRef.current = false;
    setCount(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      onDone?.();
      doneRef.current = true;
      return;
    }
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          if (!doneRef.current) {
            doneRef.current = true;
            onDone?.();
          }
          return c;
        }
        return c + 1;
      });
    }, Math.max(4, speedMs));
    return () => window.clearInterval(id);
  }, [text, speedMs, onDone]);
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
