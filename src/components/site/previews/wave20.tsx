"use client";

import * as React from "react";
import { EmptyColSpan } from "@/components/ui/empty-col-span";
import { StatsOverview } from "@/components/ui/stats-overview";
import { TextareaAutosize } from "@/components/ui/textarea-autosize";

export const wave20Previews: Record<string, React.ComponentType> = {
  "empty-col-span": function EmptyColSpanPreview() {
    return (
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <EmptyColSpan colSpan={2} message="No rows found" />
            </tr>
          </tbody>
        </table>
      </div>
    );
  },

  "stats-overview": function StatsOverviewPreview() {
    return (
      <div className="w-full max-w-2xl">
        <StatsOverview
          tiles={[
            { label: "Revenue", value: "$48,250", delta: { value: "+12%", up: true } },
            { label: "Admitted", value: "8,492", delta: { value: "+3%", up: true } },
            { label: "Refunds", value: "31", delta: { value: "-1%", up: false } },
            { label: "Capacity", value: "72%" },
          ]}
          tableTitle="Latest orders"
          tableRows={[
            { label: "BB-90210", value: "$90.00" },
            { label: "BB-90211", value: "$45.00" },
          ]}
        />
      </div>
    );
  },

  "textarea-autosize": function TextareaAutosizePreview() {
    return (
      <div className="w-full max-w-sm">
        <TextareaAutosize
          defaultValue="Type more lines and watch the box grow with your words."
          aria-label="Auto-growing notes"
        />
      </div>
    );
  },
};
