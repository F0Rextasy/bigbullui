"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TreemapItem {
  label: string;
  value: number;
  children?: TreemapItem[];
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
}

function computeTreemap(
  root: TreemapItem,
  padX: number,
  padY: number,
  padWidth: number,
  padHeight: number,
): Rect[] {
  const rects: Rect[] = [];

  function slice(
    items: TreemapItem[],
    x: number,
    y: number,
    width: number,
    height: number,
    orientation: "v" | "h",
  ): void {
    if (items.length === 0) return;

    if (items.length === 1) {
      rects.push({ x, y, width, height, label: items[0].label });
      return;
    }

    const total = items.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    const remaining = items.length - 1;
    let used = 0;

    if (orientation === "v") {
      const cellWidth = width / total;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemWidth = cellWidth;
        const itemHeight = (item.value / total) * (height - padY * 2);
        rects.push({ x: x + padX, y: y + padY, width: itemWidth - padX * 2, height: itemHeight - padY * 2, label: item.label });

        if (i < remaining) {
          slice(
            items.slice(i + 1),
            x + cellWidth,
            y,
            width - cellWidth,
            height,
            "v",
          );
        }
        break; // single level, don't recurse further for vertical
      }
    } else {
      const cellHeight = height / total;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemHeight = cellHeight;
        const itemWidth = (item.value / total) * (width - padX * 2);
        rects.push({ x: x + padX, y: y + padY, width: itemWidth - padX * 2, height: itemHeight - padY * 2, label: item.label });

        if (i < remaining) {
          slice(
            items.slice(i + 1),
            x,
            y + cellHeight,
            width,
            height - cellHeight,
            "h",
          );
        }
        break; // single level, don't recurse further for horizontal
      }
    }
  }

  slice(root.children || [root], padX, padY, padWidth - padX * 2, padHeight - padY * 2, "v");
  return rects;
}

export interface TreemapChartProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TreemapItem[];
  className?: string;
}

export function TreemapChart({
  items,
  className,
  ...props
}: TreemapChartProps) {
  const rects = React.useMemo(() => {
    const root: TreemapItem = { label: "root", value: items.reduce((sum, item) => sum + item.value, 0), children: items };
    return computeTreemap(root, 5, 5, 200, 200);
  }, [items]);

  if (rects.length === 0) {
    return (
      <div className={cn("w-full h-64 flex items-center justify-center text-muted-foreground", "motion-reduce:animate-none")}>
        Loading treemap…
      </div>
    );
  }

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 200 200"
        style={{ overflow: "visible" }}
      >
        {rects.map((rect, idx) => {
          const value = rect.width * rect.height / 40000; // approximate relative value
          const intensity = Math.min(value / Math.max(...rects.map(r => r.width * r.height / 40000)) || 1, 1);
          const bgOpacity = 0.1 + intensity * 0.8;
          const delay = idx * 20;

          return (
            <React.Fragment key={idx}>
              <rect
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill="currentColor"
                opacity={bgOpacity > 0.9 ? 0.9 : bgOpacity}
                className={cn(
                  "motion-reduce:transition-none",
                  `animate-[fade-in-up_0.2s_ease-out_both_${delay}ms]`,
                )}
              />
              <text
                x={rect.x + rect.width / 2}
                y={rect.y + rect.height / 2 + 4}
                textAnchor="middle"
                fontSize="9"
                className={cn(
                  "motion-reduce:transition-none",
                  "text-[8px] select-none",
                  intensity > 0.5 ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {rect.label ?? ""}
              </text>
            </React.Fragment>
          );
        })}

        {/* Root label */}
        <text
          x="100"
          y="195"
          textAnchor="middle"
          fontSize="10"
          className={cn(
            "motion-reduce:transition-none",
            "text-[10px] uppercase text-muted-foreground capitalize",
          )}
        >
          Treemap
        </text>
      </svg>
    </div>
  );
}