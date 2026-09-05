"use client";

import * as React from "react";
import { BadgeRibbon } from "@/components/ui/badge-ribbon";
import { BulletChart } from "@/components/ui/bullet-chart";
import { Callout } from "@/components/ui/callout";
import { Histogram } from "@/components/ui/histogram";
import { Meter } from "@/components/ui/meter";
import { MilestoneChart } from "@/components/ui/milestone-chart";
import { RadioCards, RadioCard, RadioCardHeader, RadioCardPrice } from "@/components/ui/radio-cards";
import { RouteLoader } from "@/components/ui/route-loader";
import { SplitButton } from "@/components/ui/split-button";
import { StatTile } from "@/components/ui/stat-tile";
import { TrendBadge } from "@/components/ui/trend-badge";

export const wave21Previews: Record<string, React.ComponentType> = {
  "badge-ribbon": function BadgeRibbonPreview() {
    return (
      <div className="flex justify-center p-4">
        <BadgeRibbon title="BOX OFFICE" rank="ADMIT VIP" award="BEST IN SHOW" color="red" />
      </div>
    );
  },

  "bullet-chart": function BulletChartPreview() {
    return (
      <div className="w-full max-w-md p-2">
        <BulletChart label="Ticket Sales Velocity" value={780} target={1000} max={1200} unit=" stubs" />
      </div>
    );
  },

  callout: function CalloutPreview() {
    return (
      <div className="w-full max-w-md p-2">
        <Callout title="ADMISSION NOTICE" variant="info">
          Gate 4 opens at 19:30. Please present your digital stub at the turnstile.
        </Callout>
      </div>
    );
  },

  histogram: function HistogramPreview() {
    return (
      <div className="w-full max-w-md p-2">
        <Histogram
          bins={[
            { id: "1", label: "18:00", count: 45 },
            { id: "2", label: "19:00", count: 120 },
            { id: "3", label: "20:00", count: 85 },
            { id: "4", label: "21:00", count: 30 },
            { id: "5", label: "22:00", count: 65 },
          ]}
        />
      </div>
    );
  },

  meter: function MeterPreview() {
    return (
      <div className="w-full max-w-md p-2">
        <Meter value={68} min={0} max={100} label="TURNSTILE CAPACITY" unit="%" />
      </div>
    );
  },

  "milestone-chart": function MilestoneChartPreview() {
    return (
      <div className="w-full max-w-md p-2">
        <MilestoneChart
          milestones={[
            { id: "1", label: "Doors Open", date: "18:00", reached: true },
            { id: "2", label: "Soundcheck", date: "19:00", reached: true },
            { id: "3", label: "Main Stage", date: "20:30", reached: false },
            { id: "4", label: "Curtain Call", date: "23:00", reached: false },
          ]}
        />
      </div>
    );
  },

  "radio-cards": function RadioCardsPreview() {
    return (
      <div className="w-full max-w-md p-2">
        <RadioCards defaultValue="vip" columns={2}>
          <RadioCard value="standard">
            <RadioCardHeader title="General" />
            <RadioCardPrice price="$45" />
          </RadioCard>
          <RadioCard value="vip">
            <RadioCardHeader title="VIP Pass" />
            <RadioCardPrice price="$120" />
          </RadioCard>
        </RadioCards>
      </div>
    );
  },

  "route-loader": function RouteLoaderPreview() {
    return (
      <div className="relative flex h-16 w-full max-w-sm flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-4">
        <RouteLoader active className="absolute inset-x-0 top-0" />
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Route transition active
        </span>
      </div>
    );
  },

  "split-button": function SplitButtonPreview() {
    return (
      <div className="flex justify-center p-4">
        <SplitButton
          label="Print Stub"
          options={[
            { id: "pdf", label: "Export PDF", shortcut: "⌘P" },
            { id: "wallet", label: "Apple Wallet" },
            { id: "email", label: "Email Pass" },
          ]}
        />
      </div>
    );
  },

  "stat-tile": function StatTilePreview() {
    return (
      <div className="w-full max-w-xs p-2">
        <StatTile
          label="TOTAL ADMITTED"
          value="4,820"
          delta={{ value: "+18%", up: true }}
          spark={[20, 35, 45, 60, 55, 75, 90]}
        />
      </div>
    );
  },

  "trend-badge": function TrendBadgePreview() {
    return (
      <div className="flex justify-center p-4">
        <TrendBadge value="+24.8%" label="TICKET DEMAND" live />
      </div>
    );
  },
};
