"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { MetricCard } from "../ui/metric-card";

export interface BlockStatMetric {
  title: string;
  value: string;
  trend: { value: string; direction: "up" | "down"; label: string };
  periodLabel: string;
  sparklineData: number[];
  sparklineTone?: "accent" | "muted";
}

const DEFAULT_METRICS: BlockStatMetric[] = [
  { title: "GROSS REVENUE", value: "$48,250", trend: { value: "+14.8%", direction: "up", label: "VS LAST WEEK" }, periodLabel: "ROLLING 7 DAYS", sparklineData: [32, 38, 35, 42, 40, 48, 52, 59] },
  { title: "STUBS ADMITTED", value: "4,820", trend: { value: "+8.1%", direction: "up", label: "VS LAST WEEK" }, periodLabel: "ROLLING 7 DAYS", sparklineData: [20, 26, 24, 30, 34, 38, 44, 49] },
  { title: "REFUND RATE", value: "1.8%", trend: { value: "-0.4%", direction: "down", label: "VS LAST WEEK" }, periodLabel: "ROLLING 7 DAYS", sparklineTone: "muted", sparklineData: [8, 7, 9, 6, 5, 6, 4, 3] },
  { title: "STANDBY QUEUE", value: "312", trend: { value: "+22", direction: "up", label: "SINCE DOORS" }, periodLabel: "TONIGHT", sparklineData: [10, 14, 18, 22, 26, 30, 34, 40] },
];

export interface BlockStatsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  metrics?: BlockStatMetric[];
  onAction?: (action: string) => void;
}

export function BlockStats({
  eyebrow = "TONIGHT // BY THE NUMBERS",
  metrics = DEFAULT_METRICS,
  className,
  onAction,
  ...props
}: BlockStatsProps) {
  void onAction;
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            periodLabel={metric.periodLabel}
            sparklineTone={metric.sparklineTone}
            sparklineData={metric.sparklineData}
          />
        ))}
      </div>
    </div>
  );
}
