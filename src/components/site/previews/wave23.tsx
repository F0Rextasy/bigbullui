"use client";

import * as React from "react";
import { BoxPlot } from "@/components/ui/box-plot";
import { ViolinChart } from "@/components/ui/violin-chart";
import { SparkBars } from "@/components/ui/spark-bars";
import { SparkLineGroup } from "@/components/ui/spark-line-group";
import { DonutMulti } from "@/components/ui/donut-multi";
import { PieInteractive } from "@/components/ui/pie-interactive";
import { ChordDiagram } from "@/components/ui/chord-diagram";
import { IcicleChart } from "@/components/ui/icicle-chart";
import { StreamGraph } from "@/components/ui/stream-graph";
import { HorizonChart } from "@/components/ui/horizon-chart";
import { DensityPlot } from "@/components/ui/density-plot";
import { QqPlot } from "@/components/ui/qq-plot";
import { ControlChart } from "@/components/ui/control-chart";
import { MatrixChart } from "@/components/ui/matrix-chart";
import { OrgTreeV2 } from "@/components/ui/org-tree-v2";

export const wave23Previews: Record<string, React.ComponentType> = {
  "box-plot": function BoxPlotPreview() {
    return (
      <div className="w-full max-w-md">
        <BoxPlot
          items={[
            { label: "A", min: 5, q1: 12, median: 18, q3: 24, max: 32 },
            { label: "B", min: 8, q1: 15, median: 22, q3: 28, max: 36 },
            { label: "C", min: 3, q1: 9, median: 14, q3: 20, max: 27 },
          ]}
        />
      </div>
    );
  },

  "violin-chart": function ViolinChartPreview() {
    return (
      <div className="w-full max-w-md">
        <ViolinChart
          labels={["A", "B", "C"]}
          data={[
            [12, 14, 15, 16, 18, 20, 22],
            [8, 10, 11, 13, 15, 17],
            [20, 22, 24, 25, 27, 29],
          ]}
        />
      </div>
    );
  },

  "spark-bars": function SparkBarsPreview() {
    return (
      <div className="flex flex-col items-center gap-2">
        <SparkBars data={[4, 9, 6, 14, 8, 18, 11]} width={180} height={48} />
        <span className="font-mono text-[11px] text-muted-foreground">Weekly admissions</span>
      </div>
    );
  },

  "spark-line-group": function SparkLineGroupPreview() {
    return (
      <SparkLineGroup
        items={[
          { label: "Revenue", value: "$48K", data: [10, 22, 18, 30, 26, 40] },
          { label: "Users", value: "8.4K", data: [5, 9, 7, 12, 11, 15] },
          { label: "Churn", value: "1.2%", data: [3, 2, 4, 2, 1, 2] },
        ]}
      />
    );
  },

  "donut-multi": function DonutMultiPreview() {
    return (
      <div className="w-full max-w-xs">
        <DonutMulti
          label="Q3"
          rings={[
            { label: "VIP", value: 72 },
            { label: "General", value: 48 },
            { label: "Standby", value: 30 },
          ]}
        />
      </div>
    );
  },

  "pie-interactive": function PieInteractivePreview() {
    return (
      <div className="w-full max-w-xs">
        <PieInteractive
          slices={[
            { label: "VIP", value: 40 },
            { label: "General", value: 85 },
            { label: "Standby", value: 25 },
          ]}
        />
      </div>
    );
  },

  "chord-diagram": function ChordDiagramPreview() {
    return (
      <div className="w-full max-w-xs">
        <ChordDiagram
          groups={["Web", "Mobile", "Box Office"]}
          links={[
            { from: 0, to: 1, value: 60 },
            { from: 1, to: 2, value: 35 },
            { from: 0, to: 2, value: 80 },
          ]}
        />
      </div>
    );
  },

  "icicle-chart": function IcicleChartPreview() {
    return (
      <div className="w-full max-w-lg">
        <IcicleChart
          root={{
            label: "Sales",
            value: 100,
            children: [
              { label: "Online", value: 60, children: [{ label: "Web", value: 40 }, { label: "App", value: 20 }] },
              { label: "Gate", value: 40 },
            ],
          }}
        />
      </div>
    );
  },

  "stream-graph": function StreamGraphPreview() {
    return (
      <div className="w-full max-w-lg">
        <StreamGraph
          layers={[
            { label: "Web", data: [10, 20, 18, 30, 26] },
            { label: "Mobile", data: [6, 12, 22, 16, 24] },
            { label: "Gate", data: [4, 6, 8, 10, 8] },
          ]}
        />
      </div>
    );
  },

  "horizon-chart": function HorizonChartPreview() {
    return (
      <div className="w-full max-w-md">
        <HorizonChart data={[4, 9, 6, 14, 8, 18, 11, 15, 9, 13, 17, 12]} />
      </div>
    );
  },

  "density-plot": function DensityPlotPreview() {
    return (
      <div className="w-full max-w-md">
        <DensityPlot values={[12, 14, 15, 15, 16, 18, 20, 21, 22, 24]} label="Wait minutes" />
      </div>
    );
  },

  "qq-plot": function QqPlotPreview() {
    return (
      <div className="w-full max-w-sm">
        <QqPlot sampleA={[10, 20, 30, 40, 50]} sampleB={[12, 19, 31, 38, 52]} labelA="Gate A" labelB="Gate B" />
      </div>
    );
  },

  "control-chart": function ControlChartPreview() {
    return (
      <div className="w-full max-w-md">
        <ControlChart data={[10, 12, 11, 13, 25, 12, 11, 10, 12]} label="Scans per minute" />
      </div>
    );
  },

  "matrix-chart": function MatrixChartPreview() {
    return (
      <div className="w-full max-w-md">
        <MatrixChart rows={["VIP", "General"]} columns={["Fri", "Sat", "Sun"]} values={[[40, 65, 50], [20, 45, 70]]} />
      </div>
    );
  },

  "org-tree-v2": function OrgTreeV2Preview() {
    return (
      <OrgTreeV2
        root={[
          {
            id: "ceo",
            label: "Ada Bull",
            role: "CEO",
            children: [
              { id: "cto", label: "Grace H.", role: "CTO", children: [{ id: "dev", label: "Linus T.", role: "Dev" }] },
              { id: "cfo", label: "John N.", role: "CFO" },
            ],
          },
        ]}
      />
    );
  },
};
