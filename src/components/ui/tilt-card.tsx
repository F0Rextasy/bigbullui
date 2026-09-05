"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Show glare shine overlay */
  glare?: boolean;
}

/** 3D parallax tilt card tracking cursor with spring reset. */
export function TiltCard({ maxTilt = 10, glare = true, className, children, ...props }: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState("");
  const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * maxTilt * 2;
    const ry = (px - 0.5) * maxTilt * 2;
    setTransform(`perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`);
    setGlarePos({ x: px * 100, y: py * 100, opacity: 1 });
  };

  const handleLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlarePos((p) => ({ ...p, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 shadow-xs will-change-transform",
        "transition-transform duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none",
        className
      )}
      style={{ transform: transform || "perspective(800px)" }}
      {...props}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300 motion-reduce:transition-none"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, var(--accent) 0%, transparent 55%)`,
            opacity: glarePos.opacity * 0.12,
          }}
        />
      )}
    </div>
  );
}
