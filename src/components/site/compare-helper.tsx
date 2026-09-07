"use client";

import { CompareTable } from "@/components/ui/compare-table";

export interface CompareHelperProps {
  titleA: string;
  valuesA: string[];
  titleB: string;
  valuesB: string[];
  rows: string[];
  note?: string;
}

/** Comparison helper: side-by-side preset comparison of two components or plans. */
export function CompareHelper({ titleA, valuesA, titleB, valuesB, rows, note }: CompareHelperProps) {
  return (
    <div className="space-y-2">
      <CompareTable
        rows={rows}
        columns={[
          { id: "a", label: titleA, values: valuesA },
          { id: "b", label: titleB, values: valuesB, highlight: true },
        ]}
      />
      {note && <p className="font-mono text-[11px] text-muted-foreground">{note}</p>}
    </div>
  );
}
