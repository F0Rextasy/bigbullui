"use client";

import * as React from "react";
import { cn } from "@/components/ui/lib/utils";

export type InkCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Wash color. Defaults to a subtle accent wash. */
  ink?: string;
};

export function InkCard({ className, children, ink, onMouseMove, ...props }: InkCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const filterId = `ink-card-${React.useId().replace(/:/g, "")}`;
  const wash = ink ?? "color-mix(in srgb, var(--color-accent-strong) 26%, transparent)";

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }
    onMouseMove?.(event);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-foreground/20",
        className
      )}
      {...props}
    >
      <svg aria-hidden focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.016" numOctaves="2" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" />
        </filter>
      </svg>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), ${wash}, transparent 70%)`,
          filter: `url(#${filterId})`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
