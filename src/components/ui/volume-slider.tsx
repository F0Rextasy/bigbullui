"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VolumeSliderProps {
  value?: number;
  defaultValue?: number;
  onValueChange: (value: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function VolumeSlider({
  value: controlledValue,
  defaultValue = 0.7,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: VolumeSliderProps) {
  const motionReduceClass = "motion-reduce:transition-none";
  const [volume, setVolume] = React.useState(() => defaultValue);
  const actualValue = controlledValue ?? volume;

  const commit = (vol: number) => {
    const next = Math.max(0, Math.min(1, Math.round(vol * 100) / 100));
    if (controlledValue === undefined) setVolume(next);
    onValueChange(next);
  };

  const trackClass = cn(
    "relative rounded-full bg-muted touch-none",
    orientation === "vertical" ? "h-full w-2" : "h-2 w-full",
    motionReduceClass
  );

  const fillClass = cn(
    "absolute bottom-0 left-0 rounded-full bg-primary transition-all duration-300 ease-out",
    motionReduceClass
  );

  const knobClass = cn(
    "absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "motion-reduce:transition-none"
  );

  let knobStyle: React.CSSProperties = {};
  if (orientation === "vertical") {
    knobStyle = { left: "50%", top: `${(1 - actualValue) * 100}%` };
  } else {
    knobStyle = { top: "50%", left: `${actualValue * 100}%` };
  }

  const trackRef = React.useRef<HTMLDivElement>(null);

  const updateFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = orientation === "vertical" ? rect.height : rect.width;
    if (size <= 0) return;
    commit(orientation === "vertical"
      ? 1 - (event.clientY - rect.top) / size
      : (event.clientX - rect.left) / size);
  };

  return (
    <div
      className={cn(
        "max-w-full p-2",
        orientation === "vertical" ? "h-32 w-6" : "w-48",
        motionReduceClass,
        className
      )}
      {...props}
    >
      <div
        ref={trackRef}
        className={trackClass}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.querySelector<HTMLElement>('[role="slider"]')?.focus();
          updateFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromPointer(event);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        <div
          className={fillClass}
          style={orientation === "vertical"
            ? { height: `${actualValue * 100}%`, width: "100%" }
            : { width: `${actualValue * 100}%`, height: "100%" }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Volume control"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(actualValue * 100)}
          aria-orientation={orientation}
          className={knobClass}
          style={knobStyle}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              commit(actualValue + 0.05);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              commit(actualValue - 0.05);
            } else if (e.key === "Home") {
              e.preventDefault();
              commit(0);
            } else if (e.key === "End") {
              e.preventDefault();
              commit(1);
            }
          }}
        />
      </div>
    </div>
  );
}