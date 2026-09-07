"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface IcicleNode {
  label: string;
  value: number;
  children?: IcicleNode[];
}

export interface IcicleChartProps extends React.HTMLAttributes<HTMLDivElement> {
  root: IcicleNode;
  height?: number;
}

interface Bar {
  label: string;
  value: number;
  depth: number;
  x: number;
  width: number;
}

const DEPTH_TONES = ["text-accent", "text-foreground", "text-muted-foreground"];

export function IcicleChart({ root, height = 260, className, ...props }: IcicleChartProps) {
  const bars: Bar[] = React.useMemo(() => {
    const out: Bar[] = [];
    const walk = (node: IcicleNode, depth: number, x: number, width: number) => {
      out.push({ label: node.label, value: node.value, depth, x, width });
      const kids = node.children ?? [];
      const total = kids.reduce((a, k) => a + Math.max(k.value, 0), 0) || 1;
      let offset = x;
      for (const kid of kids) {
        const w = (Math.max(kid.value, 0) / total) * width;
        walk(kid, depth + 1, offset, w);
        offset += w;
      }
    };
    walk(root, 0, 0, 100);
    return out;
  }, [root]);

  const maxDepth = Math.max(...bars.map((b) => b.depth), 0);
  const rowH = 88 / (maxDepth + 1);

  return (
    <div className={cn("w-full", className)} style={{ height: `${height}px` }} {...props}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Icicle chart rooted at ${root.label}`}>
        {bars.map((b, i) => (
          <g key={`${b.label}-${i}`} className={DEPTH_TONES[b.depth % DEPTH_TONES.length]}>
            <rect
              x={b.x + 0.5}
              y={4 + b.depth * rowH}
              width={Math.max(b.width - 1, 0.5)}
              height={Math.max(rowH - 3, 2)}
              rx={1.5}
              fill="currentColor"
              opacity={0.3 + (0.5 * (maxDepth - b.depth + 1)) / (maxDepth + 1)}
            >
              <title>{`${b.label}: ${b.value}`}</title>
            </rect>
            {b.width > 12 ? (
              <text x={b.x + b.width / 2} y={4 + b.depth * rowH + rowH / 2 + 1.5} fontSize="4" textAnchor="middle" className="fill-foreground font-mono uppercase">
                {b.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
}
