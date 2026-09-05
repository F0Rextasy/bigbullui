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
  const sorted = React.useMemo(
    () => [...data].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)),
    [data],
  );
  const minDate = sorted[0]?.date || "2024-01-01";
  const maxDate = sorted[sorted.length - 1]?.date || "2024-12-31";
  const firstYear = new Date(minDate).getFullYear();
  const oneJan = new Date(firstYear, 0, 1);
  const byDate = new Map(sorted.map((d) => [d.date, d]));

  const formatYmd = (dt: Date) =>
    `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;

  // Get all unique weeks
  const allWeeks = [...new Set(sorted.map((d) => getWeekNumber(d.date)))].sort(
    (a, b) => a - b,
  );

  const rows = allWeeks.map((week) => {
    const daysInWeek: CalendarHeatmapEntry[] = [];
    for (let i = 0; i < 7; i++) {
      const targetDate = new Date(oneJan);
      targetDate.setDate(targetDate.getDate() + (week - 1) * 7 + i);
      const entry = byDate.get(formatYmd(targetDate));
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

  const CELL = 14;
  const GAP = 4;
  const STEP = CELL + GAP;
  const LABEL_W = 34;
  const PAD = 6;
  const gridW = LABEL_W + 7 * STEP + PAD;
  const gridH = rows.length * STEP + 28 + PAD;

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
      style={{ height: `${height}px` }}
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${gridW} ${gridH}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {rows.map((row, rowIdx) => (
          <text
            key={`week-label-${rowIdx}`}
            x={PAD}
            y={PAD + rowIdx * STEP + 11}
            fontSize="9"
            className={cn(
              "motion-reduce:transition-none",
              "fill-muted-foreground font-mono uppercase",
            )}
          >
            W{row.week}
          </text>
        ))}

        {rows.map((row, rowIdx) =>
          row.cells.map((cell, cellIdx) => {
            const intensity = cell.intensity;
            const bgOpacity = cell.bgOpacity;
            const delay = rowIdx * 15 + cellIdx * 5;

            return (
              <rect
                key={`${row.week}-${cellIdx}`}
                x={PAD + LABEL_W + cellIdx * STEP}
                y={PAD + rowIdx * STEP}
                width={CELL}
                height={CELL}
                rx={3}
                fill="currentColor"
                fillOpacity={bgOpacity > 0.9 ? 0.9 : bgOpacity}
                className={cn(
                  "motion-reduce:transition-none",
                  `animate-[fade-in-up_0.2s_ease-out_both_${delay}ms]`,
                )}
              >
                <title>{cell.label}</title>
              </rect>
            );
          }),
        )}

        <text
          x={gridW / 2}
          y={gridH - 4}
          textAnchor="middle"
          fontSize="9"
          className={cn(
            "motion-reduce:transition-none",
            "fill-muted-foreground font-mono uppercase",
          )}
        >
          {getMonth(minDate)} - {getMonth(maxDate)}
        </text>
      </svg>
    </div>
  );
}