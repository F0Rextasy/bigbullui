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
  rowKey?: keyof T | ((row: T, index: number) => string);
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  searchPlaceholder?: string;
  emptyText?: string;
  totalLabel?: string;
  recordsLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}

function compareValues(aVal: unknown, bVal: unknown): number {
  if (aVal === bVal) return 0;
  if (aVal === null || aVal === undefined) return 1;
  if (bVal === null || bVal === undefined) return -1;
  if (typeof aVal === "number" && typeof bVal === "number") {
    return aVal - bVal;
  }
  if (aVal instanceof Date && bVal instanceof Date) {
    return aVal.getTime() - bVal.getTime();
  }
  return String(aVal).localeCompare(String(bVal), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export function DataTable<T extends Record<string, unknown>>({
  data = [],
  columns = [],
  searchKey,
  pageSize = 5,
  rowKey,
  selectable,
  selectedKeys: controlledSelectedKeys,
  onSelectionChange,
  searchPlaceholder = "Filter records...",
  emptyText = "No records found",
  totalLabel = "Total",
  recordsLabel = "records",
  prevLabel = "← Prev",
  nextLabel = "Next →",
  className,
  ...props
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<string[]>([]);
  const selectAllRef = React.useRef<HTMLInputElement>(null);

  const isSelectionControlled = controlledSelectedKeys !== undefined;
  const selectedKeys = isSelectionControlled ? controlledSelectedKeys : internalSelectedKeys;
  const showSelection =
    selectable ?? (onSelectionChange !== undefined || controlledSelectedKeys !== undefined);

  const originalIndexMap = React.useMemo(() => {
    const map = new Map<T, number>();
    data.forEach((item, idx) => map.set(item, idx));
    return map;
  }, [data]);

  const getKey = React.useCallback(
    (row: T, fallbackIdx: number): string => {
      const origIdx = originalIndexMap.get(row) ?? fallbackIdx;
      if (typeof rowKey === "function") return rowKey(row, origIdx);
      if (rowKey !== undefined) return String(row[rowKey]);
      if (row.id !== undefined && row.id !== null) return String(row.id);
      return String(origIdx);
    },
    [originalIndexMap, rowKey]
  );

  const filteredData = React.useMemo(() => {
    if (!search || !searchKey) return data;
    const q = search.toLowerCase();
    return data.filter((item) => String(item[searchKey] ?? "").toLowerCase().includes(q));
  }, [data, search, searchKey]);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const cmp = compareValues(a[sortKey], b[sortKey]);
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [filteredData, sortKey, sortOrder]);

  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(sortedData.length / safePageSize));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = React.useMemo(() => {
    const start = (safePage - 1) * safePageSize;
    return sortedData.slice(start, start + safePageSize);
  }, [sortedData, safePage, safePageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const commitSelection = (next: string[]) => {
    if (!isSelectionControlled) setInternalSelectedKeys(next);
    onSelectionChange?.(next);
  };

  const toggleSelect = (key: string) => {
    commitSelection(
      selectedKeys.includes(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key]
    );
  };

  const pageKeys = paginatedData.map((row, idx) =>
    getKey(row, (safePage - 1) * safePageSize + idx)
  );
  const selectedOnPage = pageKeys.filter((k) => selectedKeys.includes(k)).length;
  const isAllSelected = pageKeys.length > 0 && selectedOnPage === pageKeys.length;
  const isIndeterminate = selectedOnPage > 0 && selectedOnPage < pageKeys.length;

  React.useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const toggleSelectAll = () => {
    if (isAllSelected) {
      commitSelection(selectedKeys.filter((k) => !pageKeys.includes(k)));
    } else {
      commitSelection(Array.from(new Set([...selectedKeys, ...pageKeys])));
    }
  };

  return (
    <div className={cn("w-full space-y-3 font-mono", className)} {...props}>
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
              aria-label="Filter records"
              placeholder={searchPlaceholder}
              className="w-full rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {totalLabel}: {filteredData.length} {recordsLabel}
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-lg border-2 border-foreground bg-card shadow-sm outline-1 outline-dashed outline-offset-[-5px]">
        <table className="w-full border-collapse text-start text-xs">
          <thead>
            <tr className="border-b-2 border-dashed border-border bg-secondary/60">
              {showSelection ? (
                <th className="w-10 p-3 text-center">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={isAllSelected}
                    aria-checked={isIndeterminate ? "mixed" : isAllSelected}
                    onChange={toggleSelectAll}
                    aria-label="Select all rows"
                    className="accent-accent size-3.5 cursor-pointer rounded-xs"
                  />
                </th>
              ) : null}
              {columns.map((col) => {
                const ariaSort = col.sortable
                  ? sortKey === col.key
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                  : undefined;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={ariaSort}
                    className="p-3 font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col.key)}
                        className="flex cursor-pointer items-center gap-1.5 uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
                      >
                        <span>{col.header}</span>
                        <span className="text-[10px] text-accent" aria-hidden="true">
                          {sortKey === col.key ? (sortOrder === "asc" ? "▲" : "▼") : "↕"}
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span>{col.header}</span>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showSelection ? 1 : 0)}
                  className="p-8 text-center text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => {
                const key = pageKeys[idx]!;
                const isSelected = selectedKeys.includes(key);

                return (
                  <tr
                    key={key}
                    className={cn(
                      "border-b border-dashed border-border/80 transition-colors hover:bg-secondary/40",
                      isSelected && "bg-accent/5 font-medium"
                    )}
                  >
                    {showSelection ? (
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(key)}
                          aria-label={`Select row ${idx + 1}`}
                          className="accent-accent size-3.5 cursor-pointer rounded-xs"
                        />
                      </td>
                    ) : null}
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

      <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
        <div className="text-[11px]">
          PAGE {safePage} OF {totalPages}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
            className="cursor-pointer rounded-sm border border-border bg-card px-2.5 py-1 text-[10px] font-bold uppercase hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
          >
            {prevLabel}
          </button>
          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
            className="cursor-pointer rounded-sm border border-border bg-card px-2.5 py-1 text-[10px] font-bold uppercase hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
