"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CsvImporterProps extends React.HTMLAttributes<HTMLDivElement> {
  onImport?: (rows: string[][]) => void;
}

function sanitizeCsvCell(cell: string): string {
  const trimmed = cell.trim();
  if (/^[=@\t\r]/.test(trimmed) || (/^[+-]/.test(trimmed) && !/^[+-]?\d+(?:\.\d+)?$/.test(trimmed))) {
    return `'${trimmed}`;
  }
  return trimmed;
}

function parseCsvText(text: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(sanitizeCsvCell(field));
      field = "";
    } else if (ch === "\r" || ch === "\n") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(sanitizeCsvCell(field));
      if (row.some((c) => c !== "")) result.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  row.push(sanitizeCsvCell(field));
  if (row.some((c) => c !== "")) result.push(row);
  return result;
}

/** CSV drop reader with header preview grid. */
export function CsvImporter({ onImport, className, ...props }: CsvImporterProps) {
  const [rows, setRows] = React.useState<string[][]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState(false);

  const parse = (text: string) => {
    try {
      const parsed = parseCsvText(text);
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
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer?.files?.[0];
          if (f) void f.text().then(parse);
        }}
        className={cn(
          "mt-2 flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-6 text-center transition-colors focus-within:ring-2 focus-within:ring-ring",
          dragging ? "border-accent bg-accent/5" : "border-border bg-secondary/30 hover:border-foreground"
        )}
      >
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
