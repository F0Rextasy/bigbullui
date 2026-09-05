"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: Column<T>[];
  searchKey?: string;
  pageSize?: number;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchKey,
  pageSize = 5,
  className,
  ...props
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);

  // Filter
  const filteredData = React.useMemo(() => {
    if (!search || !searchKey) return data;
    return data.filter((item) => {
      const val = item[searchKey];
      return String(val ?? "").toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search, searchKey]);

  // Sort
  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const cmp = aVal < bVal ? -1 : 1;
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const toggleSelect = (globalIdx: number) => {
    setSelectedIndices((prev) =>
      prev.includes(globalIdx)
        ? prev.filter((i) => i !== globalIdx)
        : [...prev, globalIdx]
    );
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, idx) =>
      selectedIndices.includes((currentPage - 1) * pageSize + idx)
    );

  const toggleSelectAll = () => {
    const pageIndices = paginatedData.map((_, idx) => (currentPage - 1) * pageSize + idx);
    if (isAllSelected) {
      setSelectedIndices((prev) => prev.filter((i) => !pageIndices.includes(i)));
    } else {
      setSelectedIndices((prev) => Array.from(new Set([...prev, ...pageIndices])));
    }
  };

  return (
    <div className={cn("w-full space-y-3 font-mono", className)} {...props}>
      {/* Top Controls */}
      {searchKey ? (
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="FILTER TICKETS..."
              className="w-full rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
            TOTAL: {filteredData.length} RECORDS
          </div>
        </div>
      ) : null}

      {/* Ticket Table */}
      <div className="overflow-x-auto rounded-lg border-2 border-foreground bg-card shadow-sm outline-1 outline-dashed outline-offset-[-5px]">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b-2 border-dashed border-border bg-secondary/60">
              <th className="p-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  aria-label="Select all rows"
                  className="accent-accent size-3.5 cursor-pointer rounded-xs"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    "p-3 font-bold uppercase tracking-wider text-muted-foreground select-none",
                    col.sortable && "cursor-pointer hover:text-foreground transition-colors"
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-[10px] text-accent">
                        {sortKey === col.key ? (sortOrder === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="p-8 text-center text-muted-foreground text-xs uppercase tracking-widest"
                >
                  NO TICKET RECORDS FOUND
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => {
                const globalIdx = (currentPage - 1) * pageSize + idx;
                const isSelected = selectedIndices.includes(globalIdx);

                return (
                  <tr
                    key={globalIdx}
                    className={cn(
                      "border-b border-dashed border-border/80 transition-colors hover:bg-secondary/40",
                      isSelected && "bg-accent/5 font-medium"
                    )}
                  >
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(globalIdx)}
                        aria-label={`Select row ${globalIdx + 1}`}
                        className="accent-accent size-3.5 cursor-pointer rounded-xs"
                      />
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className="p-3 text-foreground">
                        {col.render ? col.render(row) : String(row[col.key] ?? "-")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <div className="text-[11px]">
          PAGE {currentPage} OF {totalPages}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="rounded-sm border border-border bg-card px-2.5 py-1 text-[10px] uppercase font-bold hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            ← PREV
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-sm border border-border bg-card px-2.5 py-1 text-[10px] uppercase font-bold hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
