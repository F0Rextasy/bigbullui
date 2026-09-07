"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ImportRow {
  id: string;
  label: string;
  status: "pending" | "kept" | "dropped";
}

export interface ImportReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  initial?: ImportRow[];
}

/** Import review: approve or drop rows before final import. */
export function ImportReview({
  initial = [
    { id: "i1", label: "VIP list · 40 rows", status: "pending" },
    { id: "i2", label: "Balcony list · 120 rows", status: "pending" },
    { id: "i3", label: "Staff list · 12 rows", status: "pending" },
  ],
  className,
  ...props
}: ImportReviewProps) {
  const [rows, setRows] = React.useState<ImportRow[]>(initial);
  const kept = rows.filter((r) => r.status === "kept").length;
  const set = (id: string, status: ImportRow["status"]) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Review import</p>
        <span className="font-mono text-[11px] tabular-nums text-accent">{kept}/{rows.length} kept</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {rows.map((r) => (
          <li
            key={r.id}
            className={cn(
              "flex items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-xs font-bold",
              r.status === "kept" && "border-accent",
              r.status === "dropped" && "border-dashed border-border opacity-50",
              r.status === "pending" && "border-dashed border-border"
            )}
          >
            <span>{r.label}</span>
            <span className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => set(r.id, "kept")}
                aria-label={`Keep ${r.label}`}
                aria-pressed={r.status === "kept"}
                className="rounded border px-1.5 py-0.5 font-mono text-[10px] transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                ✓
              </button>
              <button
                type="button"
                onClick={() => set(r.id, "dropped")}
                aria-label={`Drop ${r.label}`}
                aria-pressed={r.status === "dropped"}
                className="rounded border px-1.5 py-0.5 font-mono text-[10px] transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                ×
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
