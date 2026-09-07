"use client";

import * as React from "react";
import { MetricCard } from "../ui/metric-card";

export function BlockStats() {
  return (
    <div className="w-full space-y-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">TONIGHT // BY THE NUMBERS</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="GROSS REVENUE" value="$48,250" trend={{ value: "+14.8%", direction: "up", label: "VS LAST WEEK" }} periodLabel="ROLLING 7 DAYS" sparklineData={[32, 38, 35, 42, 40, 48, 52, 59]} />
        <MetricCard title="STUBS ADMITTED" value="4,820" trend={{ value: "+8.1%", direction: "up", label: "VS LAST WEEK" }} periodLabel="ROLLING 7 DAYS" sparklineData={[20, 26, 24, 30, 34, 38, 44, 49]} />
        <MetricCard title="REFUND RATE" value="1.8%" trend={{ value: "-0.4%", direction: "down", label: "VS LAST WEEK" }} periodLabel="ROLLING 7 DAYS" sparklineTone="muted" sparklineData={[8, 7, 9, 6, 5, 6, 4, 3]} />
        <MetricCard title="STANDBY QUEUE" value="312" trend={{ value: "+22", direction: "up", label: "SINCE DOORS" }} periodLabel="TONIGHT" sparklineData={[10, 14, 18, 22, 26, 30, 34, 40]} />
      </div>
    </div>
  );
}
