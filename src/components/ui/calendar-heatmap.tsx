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

function parseUtcYmd(dateStr: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateStr.trim());
  if (m) return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  const parsed = new Date(dateStr);
  return new Date(Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate()));
}

function getWeekNumber(dateStr: string): number {
  const date = parseUtcYmd(dateStr);
  const oneJan = Date.UTC(date.getUTCFullYear(), 0, 1);
  const diffDays = Math.floor((date.getTime() - oneJan) / 86400000);
  return Math.floor(diffDays / 7) + 1;
}

function getMonth(dateStr: string): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return months[parseUtcYmd(dateStr).getUTCMonth()];
}

export function CalendarHeatmap({
  data = [],
  weeks = data.length > 0 ? getWeekNumber(data[data.length - 1].date) : 52,
  height = 400,
  className,
  ...props
}: CalendarHeatmapProps) {
  void weeks;
  // Determine the date range
  const sorted = React.useMemo(
    () => [...data].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)),
    [data],
  );
  const minDate = sorted[0]?.date || "2024-01-01";
  const maxDate = sorted[sorted.length - 1]?.date || "2024-12-31";
  const firstYear = parseUtcYmd(minDate).getUTCFullYear();
  const oneJanMs = Date.UTC(firstYear, 0, 1);
  const byDate = new Map(sorted.map((d) => [d.date, d]));

  const formatYmd = (dt: Date) =>
    `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;

  // Get all unique weeks
  const allWeeks = [...new Set(sorted.map((d) => getWeekNumber(d.date)))].sort(
    (a, b) => a - b,
  );

  const rows = allWeeks.map((week) => {
    const daysInWeek: CalendarHeatmapEntry[] = [];
    for (let i = 0; i < 7; i++) {
      const targetDate = new Date(oneJanMs + ((week - 1) * 7 + i) * 86400000);
      const entry = byDate.get(formatYmd(targetDate));
      if (entry) daysInWeek.push(entry);
    }

    const maxValInWeek = Math.max(
      ...daysInWeek.map((d) => d.value),
      0,
    );
    const cells = daysInWeek.map((entry) => {
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
      {...props}
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
                style={{ animationDelay: `${delay}ms` }}
                className={cn(
                  "motion-reduce:transition-none motion-safe:animate-[fade-in-up_0.2s_ease-out_both] motion-reduce:animate-none!",
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
