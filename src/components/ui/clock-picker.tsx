"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ClockPickerProps {
  value?: string; // "HH:MM"
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  hour12?: boolean;
  className?: string;
}

export function ClockPicker({
  value: controlledValue,
  defaultValue = "09:00",
  onValueChange,
  hour12 = false,
  className,
}: ClockPickerProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const [angle, setAngle] = React.useState(0);
  const [hand, setHand] = React.useState<"hour" | "minute" | null>(null);

  const timeToMinutes = (t: string): number => {
    const [h, m] = t.split(":").map(Number);
    let hour = h;
    if (hour12) {
      hour = hour % 12;
      if (hour === 0) hour = 12;
    }
    return hour * 60 + m;
  };

  const minutesToTime = (totalMin: number): string => {
    const h = Math.floor(totalMin / 60) % 12 || 12;
    const m = totalMin % 60;
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const totalMin = timeToMinutes(currentValue);

  const minuteAngle = React.useMemo(() => (totalMin / 60) * 360, [totalMin]);
  const hourAngle = React.useMemo(() => {
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return (h % 12 + m / 60) / 12 * 360;
  }, [totalMin]);

  React.useEffect(() => {
    if (isControlled) {
      setAngle(0);
      setHand(null);
    }
  }, [isControlled, controlledValue]);

  const dragStart = React.useRef({ x: 0, y: 0, angle: 0 });
  const isDragging = React.useRef(false);

  const handleMouseDown = (e: React.MouseEvent, handType: "hour" | "minute") => {
    e.preventDefault();
    setHand(handType);
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      angle: handType === "minute" ? minuteAngle : hourAngle,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const radius = 80;
    const theta = Math.atan2(-dy, dx);
    let angle = theta * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    const isMinute = hand === "minute";
    let newAngle = angle;

    // Snap to 6-degree increments for minutes, 30-degree for hours
    if (!isMinute) {
      newAngle = Math.round(angle / 30) * 30;
    } else {
      newAngle = Math.round(angle / 6) * 6;
    }

    setAngle(newAngle);

    const progress = newAngle / (isMinute ? 360 : 360);
    const totalMinRef = timeToMinutes(currentValue);
    let newTotalMin: number;

    if (isMinute) {
      newTotalMin = Math.round(progress * 60);
      // Keep hour constant, only change minute
      const h = Math.floor(totalMinRef / 60);
      newTotalMin += h * 60;
    } else {
      const baseHours = Math.floor(totalMinRef / 60);
      const newH = Math.round(progress * 12);
      const newM = 0;
      newTotalMin = newH * 60;
    }

    setInternalValue(minutesToTime(newTotalMin));
    onValueChange?.(minutesToTime(newTotalMin));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setHand(null);
  };

  const svgSize = 180;
  const handLength = 60;
  const center = svgSize / 2;

  const minuteHandStyle = {
    transform: `rotate(${angle}deg)`,
    transformOrigin: `center center`,
  };

  const hourHandStyle = {
    transform: `rotate(${hourAngle}deg)`,
    transformOrigin: `center center`,
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 font-mono",
        className,
      )}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 {svgSize} {svgSize}"
        className="relative"
      >
        {/* Dial circle */}
        <circle
          cx={center}
          cy={center}
          r={55}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          strokeOpacity={0.3}
        />

        {/* Hour markers */}
        {Array.from({ length: 12 }, (_unused, hourIdx) => {
          const hour = hourIdx === 0 ? 12 : hourIdx;
          const rad = (hourIdx * 30 - 90) * (Math.PI / 180);
          const x = center + 45 * Math.cos(rad);
          const y = center + 45 * Math.sin(rad);
          const display = hour;

          return (
            <g key={hour}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth={1}
                strokeOpacity={0.5}
              />
              <text
                x={x}
                y={y + 8}
                className="font-[10px] uppercase tracking-[0.15em] text-muted-foreground dominant-baseline-middle"
              >
                {display}
              </text>
            </g>
          );
        })}

        {/* Minute markers ( finer ) */}
        {Array.from({ length: 60 }, (_, i) => i).map((min) => {
          if (min % 5 === 0) return null; // hour markers already drawn
          const rad = (min * 6 - 90) * (Math.PI / 180);
          const x = center + 55 * Math.cos(rad);
          const y = center + 55 * Math.sin(rad);

          return (
            <line
              key={min}
              x1={x}
              y1={y}
              x2={x}
              y2={y + 8}
              stroke="currentColor"
              strokeWidth={1}
              strokeOpacity={0.2}
            />
          );
        })}

        {/* Minute hand */}
        <line
          x1={center}
          y1={center}
          x2={center + handLength * Math.sin((minuteAngle * Math.PI) / 180)}
          y2={center - handLength * Math.cos((minuteAngle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          className="motion-reduce:transition-none"
          style={minuteHandStyle}
        />

        {/* Hour hand */}
        <line
          x1={center}
          y1={center}
          x2={center + 40 * Math.sin((hourAngle * Math.PI) / 180)}
          y2={center - 40 * Math.cos((hourAngle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          className="motion-reduce:transition-none"
          style={hourHandStyle}
        />

        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r={3}
          fill="currentColor"
        />
      </svg>

      {/* Digital readout below */}
      <div className="mt-3 flex items-center justify-center">
        <span
          className={cn(
            "font-mono uppercase tracking-[0.15em] text-[10px]",
            hour12 ? "text-accent-foreground" : "",
          )}
        >
          {currentValue}{hour12 ? " " : ""}
          {hour12 ? (parseInt(currentValue.split(":")[0]) >= 12 ? "PM" : "AM") : ""}
        </span>
      </div>

      {/* Motion reduce fallback hint */}
      <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground motion-reduce:animate-none">
        Drag the hands to adjust time
      </p>
    </div>
  );
}

ClockPicker.displayName = "ClockPicker";

