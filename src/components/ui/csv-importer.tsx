"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CsvImporterProps extends React.HTMLAttributes<HTMLDivElement> {
  onImport?: (rows: string[][]) => void;
}

/** CSV drop reader with header preview grid. */
export function CsvImporter({ onImport, className, ...props }: CsvImporterProps) {
  const [rows, setRows] = React.useState<string[][]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const parse = (text: string) => {
    try {
      const parsed = text.trim().split(/\r?\n/).map((line) => line.split(",").map((c) => c.trim()));
      if (parsed.length === 0) throw new Error("Empty file");
      setRows(parsed.slice(0, 7));
      setError(null);
      onImport?.(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Parse failed");
    }
  };
  return (
    <div className={cn("w-full rounded-lg border-2 border-dashed border-border bg-card p-4 shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CSV importer</p>
      <label className="mt-2 flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-secondary/30 px-4 py-6 text-center transition-colors hover:border-foreground focus-within:ring-2 focus-within:ring-ring">
        <span className="font-mono text-xs font-bold uppercase text-foreground">Drop guest list CSV here</span>
        <span className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">or click to browse files</span>
        <input type="file" accept=".csv,text/csv" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) void f.text().then(parse); }} />
      </label>
      {error && <p className="mt-2 font-mono text-[11px] uppercase text-destructive" role="alert">{error}</p>}
      {rows.length > 0 && (
        <div className="mt-2 overflow-x-auto rounded-md border border-border">
          <table className="w-full font-mono text-[11px]">
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={cn("border-b border-dashed border-border last:border-0", i === 0 && "bg-secondary font-bold uppercase")}>
                  {r.map((c, j) => <td key={j} className="px-2 py-1 text-foreground">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
