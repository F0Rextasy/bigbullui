"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PauseMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onResume?: () => void;
  onRestart?: () => void;
  onQuit?: () => void;
}

/** Pause menu: overlay panel with resume restart quit. */
export function PauseMenu({ open = true, onResume, onRestart, onQuit, className, ...props }: PauseMenuProps) {
  if (!open) return null;
  const actions = [
    { id: "resume", label: "Resume", fn: onResume, primary: true },
    { id: "restart", label: "Restart", fn: onRestart, primary: false },
    { id: "quit", label: "Quit Match", fn: onQuit, primary: false },
  ];
  return (
    <div role="dialog" aria-modal="true" aria-label="Paused" className={cn("w-full touch-none select-none rounded-md border-2 border-foreground bg-card p-4 text-center shadow-md", className)} style={{ touchAction: "none" }} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Paused</p>
      <p className="mt-1 font-mono text-xl font-black uppercase text-foreground">Take Five</p>
      <div className="mt-3 space-y-2">
        {actions.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={a.fn}
            className={cn(
              "min-h-11 w-full touch-none rounded-md border-2 font-mono text-xs font-black uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              a.primary ? "border-foreground bg-primary text-primary-foreground" : "border-dashed border-border bg-background text-foreground"
            )}
            style={{ touchAction: "none" }}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
