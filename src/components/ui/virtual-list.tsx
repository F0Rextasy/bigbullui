"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type VirtualListProps<T> = {
  items: T[];
  itemHeight?: number;
  height?: number;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
};

export function VirtualList<T>({
  items = [],
  itemHeight = 40,
  height = 320,
  render,
  className,
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const safeItemHeight = Math.max(1, itemHeight || 40);
  const safeHeight = Math.max(safeItemHeight, height || 320);

  const visibleStart = Math.max(0, Math.floor(scrollTop / safeItemHeight) - 1);
  const visibleEnd = Math.min(
    items.length,
    Math.ceil((scrollTop + safeHeight) / safeItemHeight) + 1,
  );
  const totalHeight = items.length * safeItemHeight;
  const offsetY = visibleStart * safeItemHeight;

  return (
    <div
      className={cn("relative overflow-auto rounded-md border border-border bg-card", className)}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height: safeHeight }}
    >
      <div className="relative w-full" style={{ height: totalHeight }}>
        <div
          className="absolute inset-x-0 top-0"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {items.slice(visibleStart, visibleEnd).map((item, idx) => {
            const actualIndex = visibleStart + idx;
            return (
              <div
                key={actualIndex}
                className="flex items-center border-b border-border/40 px-3"
                style={{ height: safeItemHeight }}
              >
                {render ? render(item, actualIndex) : String(item)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}