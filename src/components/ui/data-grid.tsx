"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DataGridColumn<T> {
  key: string;
  header: string;
  /** Custom cell renderer function */
  render?: (row: T) => React.ReactNode;
  /** Enables sorting by this column */
  sortable?: boolean;
}

export interface DataGridProps<T extends Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataGridColumn<T>[];
  rows: T[];
  rowKey?: (row: T) => string;
  pageSize?: number;
  emptyMessage?: string;
}

/** Data grid: sortable columns + pagination + sticky header. */
export function DataGrid<T extends Record<string, unknown>>({ columns, rows, rowKey, pageSize = 8, emptyMessage = "No records found", className, ...props }: DataGridProps<T>) {
  const [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = React.useState(0);

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const slice = sorted.slice(safePage * pageSize, (safePage + 1) * pageSize);

  const toggleSort = (key: string) => {
    setSort((s) => (s?.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border border-border", className)} {...props}>
      <style>{`@keyframes dgIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="max-h-80 overflow-auto">
        <table className="w-full min-w-max text-sm">
          <thead className="sticky top-0 z-10 bg-secondary/95 backdrop-blur-sm">
            <tr className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {columns.map((col) => (
                <th key={col.key} className="border-b border-border px-3 py-2.5 text-left font-medium">
                  {col.sortable ? (
                    <button
                      onClick={() => toggleSort(col.key)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none",
                        sort?.key === col.key && "text-accent"
                      )}
                    >
                      {col.header}
                      <span className="text-[8px]" aria-hidden="true">{sort?.key === col.key ? (sort.dir === "asc" ? "▲" : "▼") : "⇅"}</span>
                    </button>
                  ) : col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((row, idx) => (
              <tr
                key={rowKey ? rowKey(row) : idx}
                className="border-b border-border/40 last:border-0 transition-colors hover:bg-secondary/40 motion-reduce:transition-none animate-[dgIn_0.25s_ease-out_both] motion-reduce:animate-none"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2.5">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {slice.length === 0 && (
              <tr><td colSpan={columns.length} className="px-3 py-8 text-center text-muted-foreground">{emptyMessage}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between border-t border-border px-3 py-2">
          <span className="font-mono text-[10px] tabular-nums text-muted-foreground">Sayfa {safePage + 1}/{pageCount}</span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] uppercase transition-colors hover:border-foreground/40 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={safePage >= pageCount - 1}
              className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] uppercase transition-colors hover:border-foreground/40 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            >
              Sonraki
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
