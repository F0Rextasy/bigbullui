"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SpreadsheetLiteProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  cols?: number;
}

/** Spreadsheet lite: editable mini grid with active cell ring. */
export function SpreadsheetLite({ rows = 4, cols = 4, className, ...props }: SpreadsheetLiteProps) {
  const [cells, setCells] = React.useState<string[][]>(() =>
    Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => (r === 0 ? `Seat ${c + 1}` : "")))
  );
  const [active, setActive] = React.useState<[number, number] | null>(null);
  return (
    <div className={cn("w-full max-w-md overflow-auto rounded-lg border-2 border-foreground bg-card p-2", className)} {...props}>
      <table className="w-full border-collapse">
        <tbody>
          {cells.map((row, r) => (
            <tr key={r}>
              {row.map((val, c) => (
                <td key={c} className="border border-dashed border-border p-0.5">
                  <input
                    value={val}
                    onChange={(e) =>
                      setCells((prev) => prev.map((pr, ri) => (ri === r ? pr.map((pc, ci) => (ci === c ? e.target.value : pc)) : pr)))
                    }
                    onFocus={() => setActive([r, c])}
                    onBlur={() => setActive(null)}
                    aria-label={`Cell row ${r + 1} column ${c + 1}`}
                    className={cn(
                      "w-full rounded-sm bg-transparent px-1.5 py-1 font-mono text-xs focus-visible:outline-none",
                      active?.[0] === r && active?.[1] === c && "bg-accent/10 ring-2 ring-inset ring-ring"
                    )}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
