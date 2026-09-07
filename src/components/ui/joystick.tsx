"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface JoystickProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onMove"> {
  size?: number;
  onMove?: (x: number, y: number) => void;
  onRelease?: () => void;
}

/** Analog joystick: drag the knob inside a dashed base, reports normalized -1..1 axes. */
export function Joystick({ size = 132, onMove, onRelease, className, ...props }: JoystickProps) {
  const baseRef = React.useRef<HTMLDivElement>(null);
  const [knob, setKnob] = React.useState({ x: 0, y: 0 });
  const [active, setActive] = React.useState(false);
  const radius = size / 2 - 24;

  const update = (clientX: number, clientY: number) => {
    const rect = baseRef.current?.getBoundingClientRect();
    if (!rect) return;
    let dx = clientX - (rect.left + rect.width / 2);
    let dy = clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy) || 1;
    const clamped = Math.min(dist, radius);
    dx = (dx / dist) * clamped;
    dy = (dy / dist) * clamped;
    setKnob({ x: dx, y: dy });
    onMove?.(dx / radius, dy / radius);
  };

  const release = () => {
    setKnob({ x: 0, y: 0 });
    setActive(false);
    onRelease?.();
  };

  return (
    <div
      ref={baseRef}
      role="application"
      aria-label="Analog joystick"
      className={cn("relative touch-none select-none rounded-full border-2 border-dashed border-border bg-card", className)}
      style={{ width: size, height: size, touchAction: "none" }}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setActive(true);
        update(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => active && update(e.clientX, e.clientY)}
      onPointerUp={release}
      onPointerCancel={release}
      {...props}
    >
      <span className="absolute inset-3 rounded-full border border-border/60" aria-hidden="true" />
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 top-1/2 flex size-11 items-center justify-center rounded-full border-2 border-foreground bg-primary text-primary-foreground shadow-md transition-transform duration-75 motion-reduce:transition-none",
          active && "bg-accent text-accent-foreground"
        )}
        style={{ transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }}
      >
        <span className="size-2 rounded-full bg-current opacity-70" />
      </span>
    </div>
  );
}
