"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SplitViewProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
  defaultSplit?: number;
}

/** Split view with draggable divider and keyboard-adjustable ratio. */
export function SplitView({ left, right, defaultSplit = 50, className, ...props }: SplitViewProps) {
  const [split, setSplit] = React.useState(defaultSplit);
  const ref = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const move = React.useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(80, Math.max(20, Math.round(pct))));
  }, []);

  React.useEffect(() => {
    const up = () => {
      dragging.current = false;
    };
    const mm = (e: MouseEvent) => {
      if (dragging.current) move(e.clientX);
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("mousemove", mm);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mousemove", mm);
    };
  }, [move]);

  return (
    <div ref={ref} className={cn("flex w-full max-w-2xl overflow-hidden rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <div style={{ width: `${split}%` }} className="min-w-0 p-4 text-sm">
        {left ?? <p className="font-mono text-xs text-muted-foreground">Left pane</p>}
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={split}
        aria-valuemin={20}
        aria-valuemax={80}
        tabIndex={0}
        onMouseDown={() => {
          dragging.current = true;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSplit((s) => Math.max(20, s - 5));
          if (e.key === "ArrowRight") setSplit((s) => Math.min(80, s + 5));
        }}
        className="w-2 cursor-col-resize border-x-2 border-dashed border-border bg-secondary transition-colors hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        aria-label="Resize panes"
      />
      <div className="min-w-0 flex-1 p-4 text-sm">
        {right ?? <p className="font-mono text-xs text-muted-foreground">Right pane</p>}
      </div>
    </div>
  );
}
