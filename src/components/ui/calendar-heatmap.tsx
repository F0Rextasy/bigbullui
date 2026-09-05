"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CalendarHeatmapEntry {
  date: string; // YYYY-MM-DD
  value: number;
}

export interface CalendarHeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: CalendarHeatmapEntry[];
  weeks?: number;
  height?: number;
}

function getWeekNumber(dateStr: string): number {
  const date = new Date(dateStr);
  const oneJan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date.getTime() - oneJan.getTime()) / 86400000) / 7);
}

function getWeekdayIndex(dateStr: string): number {
  const day = new Date(dateStr).getDay(); // 0=Sunday, 1=Monday, ...
  return day; // We'll shift to start on Monday
}

function getMonth(dateStr: string): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return months[new Date(dateStr).getMonth()];
}

export function CalendarHeatmap({
  data,
  weeks = getWeekNumber(data[data.length - 1].date),
  height = 400,
  className,
  ...props
}: CalendarHeatmapProps) {
  // Determine the date range
  const minDate = data[0]?.date || "2024-01-01";
  const maxDate = data[data.length - 1]?.date || "2024-12-31";

  // Get all unique weeks
  const allWeeks = [...new Set(data.map((d) => getWeekNumber(d.date)))].sort(
    (a, b) => a - b,
  );

  // Build the grid
  const rows = allWeeks.map((week, weekIdx) => {
    const daysInWeek: CalendarHeatmapEntry[] = [];
    for (let i = 0; i < 7; i++) {
      const targetDate = new Date();
      targetDate.setDate(1 + (week - 1) * 7 + i);
      const dateStr = targetDate.toISOString().split("T")[0];
      const entry = data.find((d) => d.date === dateStr);
      if (entry) daysInWeek.push(entry);
    }

    const maxValInWeek = Math.max(
      ...daysInWeek.map((d) => d.value),
      0,
    );
    const cells = daysInWeek.map((entry, cellIdx) => {
      const intensity = Math.min(entry.value / Math.max(maxValInWeek, 1), 1);
      const bgOpacity = 0.05 + intensity * 0.85;
      return {
        value: entry.value,
        intensity,
        bgOpacity,
        label: entry.value.toString(),
      };
    });

    return { week, cells };
  });

  const maxIntensity = Math.max(
    ...rows.flatMap((r) => r.cells.map((c) => c.intensity)),
    0,
  );

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
      style={{ height: `${height}px` }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        {/* Week labels at top */}
        {rows.map((row, rowIdx) => (
          <text
            key={`week-label-${rowIdx}`}
            x={rowIdx * 14 + 14}
            y={15}
            fontSize="10"
            textAnchor="middle"
            className={cn(
              "motion-reduce:transition-none",
              "text-[10px] uppercase text-muted-foreground capitalize",
            )}
          >
            W{row.week}
          </text>
        ))}

        {/* Day cells - column staggered pop-in */}
        {rows.map((row, rowIdx) =>
          row.cells.map((cell, cellIdx) => {
            const intensity = cell.intensity;
            const bgOpacity = cell.bgOpacity;
            const delay = rowIdx * 15 + cellIdx * 5;

            return (
              <React.Fragment key={`${row.week}-${cellIdx}`}>
              <rect
                x={cellIdx * 14 + 2}
                y={rowIdx * 12 + 25}
                width={10}
                height={10}
                fill={cn(
                  "currentColor",
                  `opacity-${Math.round((bgOpacity > 0.9 ? 0.9 : bgOpacity) * 100)}`,
                )}
                className={cn(
                  "motion-reduce:transition-none",
                  `animate-[fade-in-up_0.2s_ease-out_both_${delay}ms]`,
                )}
              />
              <text
                x={cellIdx * 14 + 7}
                y={rowIdx * 12 + 32}
                textAnchor="middle"
                fontSize="10"
                className={cn(
                  "motion-reduce:transition-none",
                  "text-[10px] font-medium select-none",
                  intensity > 0.5 ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {cell.label}
              </text>
              </React.Fragment>
            );
          }),
        )}

        {/* Month labels below */}
        <text
          x={50}
          y={95}
          textAnchor="middle"
          fontSize="10"
          className={cn(
            "motion-reduce:transition-none",
            "text-[10px] uppercase text-muted-foreground",
          )}
        >
          {getMonth(minDate)} - {getMonth(maxDate)}
        </text>
      </svg>
    </div>
  );
}