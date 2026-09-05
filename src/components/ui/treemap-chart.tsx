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
    if (items.length === 0 || width <= 0 || height <= 0) return;

    if (items.length === 1) {
      rects.push({ x, y, width, height, label: items[0].label });
      return;
    }

    const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
    let offset = 0;

    for (const item of items) {
      const frac = Math.max(item.value, 0) / total;
      if (orientation === "v") {
        const w = width * frac;
        rects.push({ x: x + offset, y, width: w, height, label: item.label });
        offset += w;
      } else {
        const h = height * frac;
        rects.push({ x, y: y + offset, width, height: h, label: item.label });
        offset += h;
      }
    }
  }

  slice(root.children || [root], 0, 0, padWidth, padHeight, "v");
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
    return computeTreemap(root, 200, 200);
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
        viewBox="0 0 200 216"
        style={{ overflow: "visible" }}
      >
        {rects.map((rect, idx) => {
          const value = rect.width * rect.height / 40000; // approximate relative value
          const intensity = Math.min(value / Math.max(...rects.map(r => r.width * r.height / 40000)) || 1, 1);
          const bgOpacity = 0.1 + intensity * 0.8;
          const delay = idx * 20;
          const inset = 2;
          const w = Math.max(rect.width - inset * 2, 0);
          const h = Math.max(rect.height - inset * 2, 0);
          const showLabel = w > 24 && h > 14;

          return (
            <React.Fragment key={idx}>
              <rect
                x={rect.x + inset}
                y={rect.y + inset}
                width={w}
                height={h}
                fill="currentColor"
                opacity={bgOpacity > 0.9 ? 0.9 : bgOpacity}
                className={cn(
                  "motion-reduce:transition-none",
                  `animate-[fade-in-up_0.2s_ease-out_both_${delay}ms]`,
                )}
              />
              {showLabel ? (
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
              ) : null}
            </React.Fragment>
          );
        })}

        {/* Root label */}
        <text
          x="100"
          y="209"
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
