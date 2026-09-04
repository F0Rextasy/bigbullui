"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StickyBarProps extends React.HTMLAttributes<HTMLDivElement> {
  itemCount?: number;
  total?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function StickyBar({
  itemCount = 2,
  total = "$90.00",
  actionText = "ADMIT NOW",
  onAction,
  className,
  ...props
}: StickyBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t-2 border-dashed border-foreground bg-card/95 backdrop-blur-xs p-3 font-mono shadow-2xl select-none",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-sm border border-foreground bg-secondary text-xs font-bold text-foreground">
            {itemCount}
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {itemCount} STUBS SELECTED
            </span>
            <div className="text-sm font-bold text-foreground">{total}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onAction}
          className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-foreground bg-accent px-5 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          <span>{actionText}</span>
          <span className="font-bold">→</span>
        </button>
      </div>
    </div>
  );
}
