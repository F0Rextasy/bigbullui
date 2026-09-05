"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spotlight radius (px) */
  radius?: number;
}

/** Radial spotlight focus card tracking cursor position. */
export function SpotlightCard({ radius = 220, className, children, ...props }: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: -999, y: -999 });
  const [hover, setHover] = React.useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-6",
        "transition-colors duration-300 hover:border-foreground/40 motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <style>{`
        @keyframes spotlightCardIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {/* Cursor spotlight beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none"
        style={{
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, var(--accent) 0%, transparent 70%)`,
          opacity: hover ? 0.1 : 0,
        }}
      />
      <div className="relative animate-[spotlightCardIn_0.35s_ease-out_both] motion-reduce:animate-none">
        {children}
      </div>
    </div>
  );
}
