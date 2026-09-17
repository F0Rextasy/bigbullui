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

  const handRef = React.useRef<"hour" | "minute" | null>(null);

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (totalMin: number): string => {
    const h = ((Math.floor(totalMin / 60) % 24) + 24) % 24;
    const m = ((totalMin % 60) + 60) % 60;
    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const totalMin = timeToMinutes(currentValue);

  const minuteAngle = React.useMemo(() => ((totalMin % 60) / 60) * 360, [totalMin]);
  const hourAngle = React.useMemo(() => {
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return (h % 12 + m / 60) / 12 * 360;
  }, [totalMin]);

  const pointerAngle = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    return (Math.atan2(dy, dx) * 180 / Math.PI + 450) % 360;
  };

  const updateFromPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!handRef.current) return;
    const angle = pointerAngle(event);
    const hours = Math.floor(totalMin / 60);
    const next = handRef.current === "minute"
      ? hours * 60 + Math.round(angle / 6) % 60
      : (Math.floor(hours / 12) * 12 + Math.round(angle / 30) % 12) * 60 + totalMin % 60;
    const time = minutesToTime(next);
    if (!isControlled) setInternalValue(time);
    onValueChange?.(time);
  };

  const svgSize = 180;
  const handLength = 60;
  const center = svgSize / 2;


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
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="relative cursor-pointer touch-none"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.preventDefault();
          const angle = pointerAngle(event);
          const distance = (handAngle: number) => Math.abs((angle - handAngle + 540) % 360 - 180);
          handRef.current = distance(hourAngle) < distance(minuteAngle) ? "hour" : "minute";
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromPointer(event);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
          handRef.current = null;
        }}
        onPointerCancel={() => { handRef.current = null; }}
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
          const r3 = (v: number) => Math.round(v * 100) / 100;
          const x = r3(center + 45 * Math.cos(rad));
          const y = r3(center + 45 * Math.sin(rad));
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
          const r3 = (v: number) => Math.round(v * 100) / 100;
          const x = r3(center + 55 * Math.cos(rad));
          const y = r3(center + 55 * Math.sin(rad));

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
          x2={(center + handLength * Math.sin((minuteAngle * Math.PI) / 180)).toFixed(2)}
          y2={(center - handLength * Math.cos((minuteAngle * Math.PI) / 180)).toFixed(2)}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          className="motion-reduce:transition-none"
        />

        {/* Hour hand */}
        <line
          x1={center}
          y1={center}
          x2={(center + 40 * Math.sin((hourAngle * Math.PI) / 180)).toFixed(2)}
          y2={(center - 40 * Math.cos((hourAngle * Math.PI) / 180)).toFixed(2)}
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          className="motion-reduce:transition-none"
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

