"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SettingsSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: string;
  onClose?: () => void;
}

/** Settings sheet: bottom drawer frame with close control. */
export function SettingsSheet({ open = true, title = "Settings", onClose, className, children, ...props }: SettingsSheetProps) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title} className={cn("w-full touch-none select-none overflow-hidden rounded-md border-2 border-foreground bg-card shadow-md", className)} style={{ touchAction: "none" }} {...props}>
      <div className="flex min-h-11 items-center justify-between border-b border-dashed border-border px-3 py-2">
        <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground">{title}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close settings"
          className="flex min-h-11 min-w-11 touch-none items-center justify-center rounded-md border border-border font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ touchAction: "none" }}
        >
          ✕
        </button>
      </div>
      <div className="max-h-64 space-y-2 overflow-y-auto p-3">
        {children ?? (
          <>
            <div className="flex min-h-11 items-center justify-between rounded-md border border-dashed border-border px-2.5 font-mono text-xs"><span>Music</span><span className="font-bold text-emerald-700 dark:text-emerald-400">ON</span></div>
            <div className="flex min-h-11 items-center justify-between rounded-md border border-dashed border-border px-2.5 font-mono text-xs"><span>Haptics</span><span className="font-bold text-muted-foreground">OFF</span></div>
            <div className="flex min-h-11 items-center justify-between rounded-md border border-dashed border-border px-2.5 font-mono text-xs"><span>Shadows</span><span className="font-bold text-emerald-700 dark:text-emerald-400">HIGH</span></div>
          </>
        )}
      </div>
    </div>
  );
}
