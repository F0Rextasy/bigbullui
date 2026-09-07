"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SwipeAction {
  id: string;
  label: string;
  tone?: "accent" | "danger";
  onSelect?: (id: string) => void;
}

export interface SwipeActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: SwipeAction[];
  children?: React.ReactNode;
}

const FALLBACK: SwipeAction[] = [
  { id: "pin", label: "Pin" },
  { id: "void", label: "Void", tone: "danger" },
];

/** Swipeable row revealing stub actions. */
export function SwipeActions({ actions = FALLBACK, children, className, ...props }: SwipeActionsProps) {
  const [revealed, setRevealed] = React.useState(false);
  const startX = React.useRef(0);
  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <div className="absolute inset-y-0 right-0 flex" aria-hidden={!revealed}>
        {actions.map((a) => (
          <button
            key={a.id}
            type="button"
            tabIndex={revealed ? 0 : -1}
            onClick={() => { a.onSelect?.(a.id); setRevealed(false); }}
            className={cn("px-4 font-mono text-[11px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", a.tone === "danger" ? "bg-destructive text-white" : "bg-accent text-accent-foreground")}
          >
            {a.label}
          </button>
        ))}
      </div>
      <div
        className={cn("relative bg-card px-4 py-3 font-mono text-xs text-foreground transition-transform motion-reduce:transition-none", revealed && "-translate-x-32")}
        onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - startX.current; if (dx < -40) setRevealed(true); if (dx > 40) setRevealed(false); }}
      >
        <button type="button" onClick={() => setRevealed((r) => !r)} aria-expanded={revealed} className="flex w-full items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span>{children ?? "ORDER BB-90210 - 2 STUBS"}</span>
          <span className="text-muted-foreground" aria-hidden="true">{"<"}</span>
        </button>
      </div>
    </div>
  );
}
