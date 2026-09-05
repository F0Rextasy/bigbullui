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
  value: controlledValue = 0.7,
  defaultValue = 0.7,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: VolumeSliderProps) {
  const [volume, setVolume] = React.useState(() => defaultValue);
  const actualValue = controlledValue !== undefined ? controlledValue : volume;

  const motionReduceClass = "motion-reduce:transition-none";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    onValueChange(val);
  };

  const trackClass = cn(
    "relative bg-background rounded-full h-2 w-full overflow-hidden",
    motionReduceClass
  );

  const fillClass = cn(
    "h-full w-full bg-primary rounded-full transition-all duration-300 ease-out",
    motionReduceClass
  );

  const knobClass = cn(
    "size-3 rounded-full bg-primary shadow-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "motion-reduce:transition-none"
  );

  let knobStyle: React.CSSProperties = {};
  if (orientation === "vertical") {
    knobStyle = { top: `${(1 - actualValue) * 100}%` };
  } else {
    knobStyle = { left: `${actualValue * 100}%` };
  }

  const trackRef = React.useRef<HTMLDivElement>(null);

  const dragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const rect = track.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
      const vol = Math.round(percent * 100) / 100;
      setVolume(vol);
      onValueChange(vol);
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={cn(
        "w-full",
        orientation === "vertical" && "h-32",
        orientation === "horizontal" && "w-48",
        motionReduceClass,
        className
      )}
      {...props}
    >
      <div ref={trackRef} className={trackClass}>
        <div
          className={fillClass}
          style={{ width: `${actualValue * 100}%` }}
        />
        <div
          className={knobClass}
          style={knobStyle}
          onMouseDown={dragStart}
          aria-label="Volume control"
        />
      </div>
    </div>
  );
}