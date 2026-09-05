"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type VirtualListProps<T> = {
  items: T[];
  itemHeight: number;
  height: number;
  render: (item: T) => React.ReactNode;
};

export function VirtualList<T>({ items, itemHeight, height, render }: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const visibleStart = Math.max(0, Math.floor(scrollTop / itemHeight) - 1);
  const visibleEnd = Math.min(
    items.length,
    Math.ceil((scrollTop + height) / itemHeight) + 1,
  );

  const style = {
    transform: `translateY(${scrollTop}px)`,
  };

  const spacerHeight = scrollTop + height + itemHeight;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-auto", "motion-reduce:animate-none")}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height }}
    >
      <div
        className={cn(
          "relative",
          "motion-reduce:animate-none",
          "motion-reduce:transition-none",
        )}
        style={{
          height,
          transform: `translateY(${-scrollTop}px)`,
        }}
      >
        {items.slice(visibleStart, visibleEnd).map((item, index) => (
          <div
            key={index}
            className={cn("p-3 bg-card", "motion-reduce:animate-none")}
            style={{ height: itemHeight }}
          >
            {render(item)}
          </div>
        ))}

        <div
          className={cn("p-3 bg-muted", "motion-reduce:animate-none")}
          style={{ height: spacerHeight }}
        >
          &nbsp;
        </div>
      </div>
    </div>
  );
}