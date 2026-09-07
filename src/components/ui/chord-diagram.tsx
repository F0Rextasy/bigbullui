"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ChordLink {
  from: number;
  to: number;
  value: number;
}

export interface ChordDiagramProps extends React.HTMLAttributes<HTMLDivElement> {
  groups: string[];
  links: ChordLink[];
  size?: number;
}

function polar(cx: number, cy: number, r: number, angle: number): [number, number] {
  const a = ((angle - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

export function ChordDiagram({ groups, links, size = 240, className, ...props }: ChordDiagramProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const n = Math.max(groups.length, 1);
  const cx = 100;
  const cy = 100;
  const R = 78;
  const maxLink = Math.max(...links.map((l) => l.value), 1);

  const arc = (i: number): string => {
    const a0 = (i / n) * 360 + 2;
    const a1 = ((i + 1) / n) * 360 - 2;
    const [x0, y0] = polar(cx, cy, R, a0);
    const [x1, y1] = polar(cx, cy, R, a1);
    return `M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`;
  };

  const ribbon = (a: number, b: number): string => {
    const [x0, y0] = polar(cx, cy, R - 4, a);
    const [x1, y1] = polar(cx, cy, R - 4, b);
    return `M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`;
  };

  return (
    <div className={cn("flex w-full flex-col items-center gap-2", className)} {...props}>
      <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="Chord diagram">
        {links.map((l, i) => {
          const a = ((l.from % n) / n) * 360 + 360 / n / 2;
          const b = ((l.to % n) / n) * 360 + 360 / n / 2;
          const dim = active !== null && active !== l.from && active !== l.to;
          return (
            <path
              key={i}
              d={ribbon(a, b)}
              fill="none"
              stroke="currentColor"
              strokeWidth={Math.max(1.5, (l.value / maxLink) * 10)}
              opacity={dim ? 0.12 : 0.5}
              className="text-accent transition-opacity motion-reduce:transition-none"
            >
              <title>{`${groups[l.from] ?? l.from} → ${groups[l.to] ?? l.to}: ${l.value}`}</title>
            </path>
          );
        })}
        {groups.map((g, i) => {
          const [lx, ly] = polar(cx, cy, R + 10, (i / n) * 360 + 360 / n / 2);
          return (
            <g key={g}>
              <path
                d={arc(i)}
                fill="none"
                stroke="currentColor"
                strokeWidth={7}
                strokeLinecap="round"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer text-foreground transition-opacity motion-reduce:transition-none"
                opacity={active === null || active === i ? 0.9 : 0.35}
              >
                <title>{g}</title>
              </path>
              <text x={lx} y={ly} fontSize="8" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground font-mono uppercase">
                {g}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
