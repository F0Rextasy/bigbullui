"use client";

import * as React from "react";
import { TableEmptyCol } from "@/components/ui/table-empty-col";
import { CodeTabs } from "@/components/ui/code-tabs";
import { FileTree } from "@/components/ui/file-tree";
import { JsonInspector } from "@/components/ui/json-inspector";
import { ShortcutRecorder } from "@/components/ui/shortcut-recorder";
import { PricingSlider } from "@/components/ui/pricing-slider";
import { VirtualCardFlipper } from "@/components/ui/virtual-card-flipper";
import { SplitBillCalculator } from "@/components/ui/split-bill-calculator";
import { SidebarLayout } from "@/components/ui/sidebar-layout";
import { FeedbackWidget } from "@/components/ui/feedback-widget";

export const wave24Previews: Record<string, React.ComponentType> = {
  "table-empty-col": function TableEmptyColPreview() {
    return (
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <TableEmptyCol colSpan={2} message="No rows" hint="Try clearing filters" />
            </tr>
          </tbody>
        </table>
      </div>
    );
  },

  "code-tabs": function CodeTabsPreview() {
    return (
      <div className="w-full max-w-md">
        <CodeTabs
          tabs={[
            { id: "npm", label: "npm", code: "npm install bigbullui" },
            { id: "pnpm", label: "pnpm", code: "pnpm add bigbullui" },
            { id: "yarn", label: "yarn", code: "yarn add bigbullui" },
          ]}
        />
      </div>
    );
  },

  "file-tree": function FileTreePreview() {
    return (
      <div className="w-full max-w-xs">
        <FileTree
          defaultExpanded={["src"]}
          nodes={[
            {
              id: "src",
              name: "src",
              kind: "folder",
              children: [
                { id: "button", name: "button.tsx", kind: "file" },
                { id: "ui", name: "ui", kind: "folder", children: [{ id: "card", name: "card.tsx", kind: "file" }] },
              ],
            },
            { id: "readme", name: "README.md", kind: "file" },
          ]}
        />
      </div>
    );
  },

  "json-inspector": function JsonInspectorPreview() {
    return (
      <div className="w-full max-w-sm">
        <JsonInspector value={{ stub: "BB-90210", seat: { row: "C", number: 12 }, valid: true }} label="API response" />
      </div>
    );
  },

  "shortcut-recorder": function ShortcutRecorderPreview() {
    return (
      <div className="w-full max-w-xs">
        <ShortcutRecorder defaultValue="Ctrl+K" />
      </div>
    );
  },

  "pricing-slider": function PricingSliderPreview() {
    return (
      <div className="w-full max-w-lg">
        <PricingSlider
          tiers={[
            { name: "Starter", monthly: 9, annual: 7 },
            { name: "Pro", monthly: 29, annual: 23 },
            { name: "Scale", monthly: 99, annual: 79 },
          ]}
        />
      </div>
    );
  },

  "virtual-card-flipper": function VirtualCardFlipperPreview() {
    return <VirtualCardFlipper />;
  },

  "split-bill-calculator": function SplitBillCalculatorPreview() {
    return <SplitBillCalculator defaultTotal={120} />;
  },

  "sidebar-layout": function SidebarLayoutPreview() {
    return (
      <SidebarLayout
        sidebar={
          <div className="space-y-1 rounded-lg border border-border bg-card p-2 font-mono text-xs">
            {["Overview", "Tickets", "Settings"].map((l) => (
              <div key={l} className="rounded px-2 py-1.5 hover:bg-secondary">
                {l}
              </div>
            ))}
          </div>
        }
      >
        <div className="rounded-lg border border-dashed border-border p-6 font-mono text-xs text-muted-foreground">
          Fluid content area — shrinks and grows with the viewport.
        </div>
      </SidebarLayout>
    );
  },

  "feedback-widget": function FeedbackWidgetPreview() {
    return (
      <div className="flex min-h-44 w-full items-center justify-center rounded-lg border border-dashed border-border">
        <span className="font-mono text-xs text-muted-foreground">
          Floating button renders fixed at the viewport corner
        </span>
        <FeedbackWidget />
      </div>
    );
  },
};
