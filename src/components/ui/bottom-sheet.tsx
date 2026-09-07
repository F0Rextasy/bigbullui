"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children?: React.ReactNode;
}

/** Mobile bottom sheet with pull handle and backdrop. */
export function BottomSheet({ open, onOpenChange, title = "Seat options", children, className, ...props }: BottomSheetProps) {
  const [inner, setInner] = React.useState(false);
  const visible = open ?? inner;
  const set = (v: boolean) => { setInner(v); onOpenChange?.(v); };
  React.useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") set(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);
  return (
    <div className={cn("w-full", className)} {...props}>
      <button type="button" onClick={() => set(true)} className="rounded border border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-primary-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        Open sheet
      </button>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label={title}>
          <button type="button" aria-label="Close sheet" onClick={() => set(false)} className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-md rounded-t-xl border-2 border-b-0 border-foreground bg-card p-4 pb-6 shadow-lg motion-safe:animate-[sheet-up_0.25s_ease-out] motion-reduce:animate-none">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border" aria-hidden="true" />
            <div className="flex items-center justify-between border-b border-dashed border-border pb-2">
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground">{title}</p>
              <button type="button" onClick={() => set(false)} aria-label="Dismiss" className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">X</button>
            </div>
            <div className="mt-3 min-h-24 text-sm text-foreground">{children ?? "Orchestra Row C, two seats held for 10 minutes."}</div>
          </div>
        </div>
      )}
    </div>
  );
}
