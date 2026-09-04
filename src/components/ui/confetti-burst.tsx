"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ConfettiBurstProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  count?: number;
  className?: string;
}

const TICKET_COLORS = [
  "var(--color-accent, #BC3A28)",
  "var(--color-primary, #17130C)",
  "var(--color-muted-foreground, #6F6350)",
  "#E0573D",
  "#D8C9AC",
];

export function ConfettiBurst({
  active = true,
  count = 24,
  className,
  ...props
}: ConfettiBurstProps) {
  const pieces = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 360;
      const distance = Math.floor(Math.random() * 80) + 40;
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;
      const color = TICKET_COLORS[i % TICKET_COLORS.length];
      const rotation = Math.floor(Math.random() * 360);
      const delay = Math.random() * 0.15;
      const duration = 0.6 + Math.random() * 0.3;

      return { x, y, color, rotation, delay, duration };
    });
  }, [count]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative size-1 select-none", className)}
      {...props}
    >
      {pieces.map((p, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: p.color,
            transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`,
            transition: `all ${p.duration}s cubic-bezier(0.25, 1, 0.5, 1) ${p.delay}s`,
          }}
          className="absolute size-2.5 rounded-[1px] border border-black/10 shadow-xs animate-[fade-in_0.1s_ease-out]"
        />
      ))}
    </div>
  );
}
