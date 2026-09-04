"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type TooltipProps = React.HTMLAttributes<HTMLSpanElement> & {
  content: React.ReactNode;
  side?: "top" | "bottom";
  delayMs?: number;
};

export function Tooltip({ content, side = "top", delayMs = 300, className, children, ...props }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const descriptionId = React.useId();

  React.useEffect(() => {
    setMounted(true);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const show = () => {
    timer.current = setTimeout(() => setVisible(true), delayMs);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  };

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      <span aria-describedby={mounted && visible ? descriptionId : undefined}>{children}</span>
      {visible && (
        <span
          role="tooltip"
          id={descriptionId}
          className={cn(
            "pointer-events-none absolute left-1/2 z-50 w-max max-w-64 -translate-x-1/2 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-[scale-in_0.15s_ease-out_both] motion-reduce:animate-none",
            side === "top" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
