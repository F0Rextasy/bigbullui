"use client";

import * as React from "react";
import { Carousel } from "@/components/ui/carousel";
import { LineChart } from "@/components/ui/line-chart";
import { AreaChart } from "@/components/ui/area-chart";
import { StackedBar } from "@/components/ui/stacked-bar";
import { Gauge } from "@/components/ui/gauge";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { RadarChart } from "@/components/ui/radar-chart";
import { Heatmap } from "@/components/ui/heatmap";
import { CalendarHeatmap } from "@/components/ui/calendar-heatmap";
import { FunnelChart } from "@/components/ui/funnel-chart";
import { ScatterPlot } from "@/components/ui/scatter-plot";
import { WaterfallChart } from "@/components/ui/waterfall-chart";
import { CandlestickChart } from "@/components/ui/candlestick-chart";
import { Leaderboard } from "@/components/ui/leaderboard";
import { Scoreboard } from "@/components/ui/scoreboard";
import { JsonViewer } from "@/components/ui/json-viewer";
import { DiffViewer } from "@/components/ui/diff-viewer";
import { Terminal } from "@/components/ui/terminal";
import { LogViewer } from "@/components/ui/log-viewer";
import { TreemapChart } from "@/components/ui/treemap-chart";

export const wave3Previews: Record<string, React.ComponentType> = {
  "line-chart": function LineChartPreview() {
    return (
      <LineChart
        series={[
          { id: "a", label: "Series A", color: "accent", data: [65, 59, 80, 81, 55, 40] },
          { id: "b", label: "Series B", color: "emerald", data: [28, 48, 40, 19, 86, 27] },
        ]}
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
      />
    );
  },

  "area-chart": function AreaChartPreview() {
    return (
      <AreaChart
        series={[
          { id: "a", label: "Visits", color: "accent", data: [65, 59, 80, 81, 55, 40] },
          { id: "b", label: "Signups", color: "emerald", data: [28, 48, 40, 19, 86, 27] },
        ]}
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
      />
    );
  },

  "stacked-bar": function StackedBarPreview() {
    return (
      <StackedBar
        rows={[
          {
            label: "January",
            segments: [
              { value: 40, color: "accent" },
              { value: 60, color: "emerald" },
            ],
          },
          {
            label: "February",
            segments: [
              { value: 50, color: "accent" },
              { value: 50, color: "emerald" },
            ],
          },
          {
            label: "March",
            segments: [
              { value: 30, color: "accent" },
              { value: 70, color: "emerald" },
            ],
          },
        ]}
      />
    );
  },

  "gauge": function GaugePreview() {
    return (
      <Gauge value={75} min={0} max={100} label="Progress" />
    );
  },

  "progress-circle": function ProgressCirclePreview() {
    return (
      <ProgressCircle value={70} min={0} max={100} label="Completion" />
    );
  },

  "radar-chart": function RadarChartPreview() {
    return (
      <RadarChart
        points={[
          { x: 1, y: 1, label: "Sales" },
          { x: 5, y: 3, label: "Engagement" },
          { x: 3, y: 5, label: "Retention" },
          { x: 1, y: 4, label: "Growth" },
        ]}
      />
    );
  },

  "heatmap": function HeatmapPreview() {
    return (
      <Heatmap
        rows={[
          { label: "Mon", cells: [{ value: 5 }, { value: 3 }, { value: 8 }, { value: 2 }] },
          { label: "Tue", cells: [{ value: 7 }, { value: 2 }, { value: 5 }, { value: 6 }] },
          { label: "Wed", cells: [{ value: 3 }, { value: 9 }, { value: 1 }, { value: 4 }] },
        ]}
        columns={4}
      />
    );
  },

  "calendar-heatmap": function CalendarHeatmapPreview() {
    return (
      <CalendarHeatmap
        data={[
          { date: "2024-01-01", value: 10 },
          { date: "2024-01-02", value: 20 },
          { date: "2024-01-03", value: 15 },
          { date: "2024-01-04", value: 5 },
          { date: "2024-01-05", value: 25 },
          { date: "2024-01-06", value: 18 },
          { date: "2024-01-07", value: 30 },
        ]}
        weeks={4}
      />
    );
  },

  "funnel-chart": function FunnelChartPreview() {
    return (
      <FunnelChart
        stages={[
          { label: "Visitors", value: 1000 },
          { label: "Leads", value: 200, conversion: 20 },
          { label: "Trials", value: 80, conversion: 40 },
          { label: "Customers", value: 30, conversion: 37.5 },
        ]}
      />
    );
  },

  "scatter-plot": function ScatterPlotPreview() {
    return (
      <ScatterPlot
        points={[
          { x: 1, y: 5, label: "Point A" },
          { x: 3, y: 2, label: "Point B" },
          { x: 5, y: 6, label: "Point C" },
          { x: 2, y: 4, label: "Point D" },
          { x: 4, y: 3, label: "Point E" },
        ]}
      />
    );
  },

  "waterfall-chart": function WaterfallChartPreview() {
    return (
      <WaterfallChart
        items={[
          { label: "Q1", value: 100 },
          { label: "Q2", value: 50 },
          { label: "Q3", value: -20 },
          { label: "Q4", value: 30 },
        ]}
      />
    );
  },

  "candlestick-chart": function CandlestickChartPreview() {
    return (
      <CandlestickChart
        points={[
          { open: 100, high: 110, low: 90, close: 105, label: "Day 1" },
          { open: 105, high: 115, low: 95, close: 100, label: "Day 2" },
          { open: 100, high: 120, low: 90, close: 110, label: "Day 3" },
          { open: 110, high: 130, low: 100, close: 120, label: "Day 4" },
        ]}
      />
    );
  },

  "leaderboard": function LeaderboardPreview() {
    return (
      <Leaderboard
        entries={[
          { rank: 1, name: "Alice", score: 1500 },
          { rank: 2, name: "Bob", score: 1350 },
          { rank: 3, name: "Carol", score: 1200 },
          { rank: 4, name: "Dave", score: 1100 },
        ]}
      />
    );
  },

  "scoreboard": function ScoreboardPreview() {
    return (
      <Scoreboard
        teams={[
          { name: "Team A", score: 3, period: "1st Period" },
          { name: "Team B", score: 2, period: "1st Period" },
        ]}
      />
    );
  },

  "json-viewer": function JsonViewerPreview() {
    return (
      <JsonViewer
        value={{
          name: "Demo",
          count: 42,
          active: true,
          items: ["a", "b", "c"],
        }}
      />
    );
  },

  "diff-viewer": function DiffViewerPreview() {
    return (
      <DiffViewer
        before="Line 1\nLine 2\nLine 3\nLine 4\nLine 5"
        after="Line 1\nLine 2 modified\nLine 3 removed\nLine 4 added\nLine 5"
      />
    );
  },

  "terminal": function TerminalPreview() {
    return (
      <Terminal
        lines={[
          { text: "Welcome to bigbullui terminal" },
          { text: "Type commands to interact", tone: "info" },
          { text: "Running system check…", tone: "info" },
          { text: "✓ All systems nominal", tone: "info" },
        ]}
        loop={true}
      />
    );
  },

  "log-viewer": function LogViewerPreview() {
    return (
      <LogViewer
        entries={[
          { time: "10:00", level: "INFO", message: "Application started" },
          { time: "10:01", level: "WARN", message: "Low memory warning" },
          { time: "10:02", level: "ERROR", message: "Database connection failed" },
          { time: "10:03", level: "INFO", message: "Retrying connection" },
        ]}
      />
    );
  },

  "treemap-chart": function TreemapChartPreview() {
    return (
      <TreemapChart
        items={[
          { label: "A", value: 400 },
          { label: "B", value: 300 },
          { label: "C", value: 200 },
          { label: "D", value: 100 },
          { label: "E", value: 50 },
        ]}
      />
    );
  },
};