"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ConfettiBurstProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  count?: number;
  className?: string;
}

const TICKET_COLORS = [
  "var(--color-accent)",
  "var(--color-primary)",
  "var(--color-muted-foreground)",
  "var(--color-accent-strong)",
  "var(--color-border)",
];

export function ConfettiBurst({
  active = true,
  count = 24,
  className,
  ...props
}: ConfettiBurstProps) {
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (!active) return;
    const raf = requestAnimationFrame(() => setExpanded(true));
    return () => {
      cancelAnimationFrame(raf);
      setExpanded(false);
    };
  }, [active]);

  const isExpanded = active && expanded;

  const pieces = React.useMemo(() => {
    const safeCount = Math.max(1, count);
    return Array.from({ length: safeCount }, (_, i) => {
      const angle = (i / safeCount) * 360 + ((i * 19) % 23);
      const distance = 45 + ((i * 29) % 75);
      const x = Math.round(Math.cos((angle * Math.PI) / 180) * distance);
      const y = Math.round(Math.sin((angle * Math.PI) / 180) * distance);
      const color = TICKET_COLORS[i % TICKET_COLORS.length];
      const rotation = (i * 53) % 360;
      const delay = ((i * 17) % 15) / 100;
      const duration = 0.6 + ((i * 13) % 30) / 100;

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
            transform: isExpanded
              ? `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`
              : "translate(0px, 0px) scale(0.4)",
            opacity: isExpanded ? 1 : 0,
            transition: `transform ${p.duration}s cubic-bezier(0.25, 1, 0.5, 1) ${p.delay}s, opacity 0.15s ease-out ${p.delay}s`,
          }}
          className="absolute size-2.5 rounded-[1px] border border-border shadow-xs motion-reduce:transition-none!"
        />
      ))}
    </div>
  );
}
