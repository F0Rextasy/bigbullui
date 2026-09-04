"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  "aria-label"?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  "aria-label": ariaLabel = "Pagination",
}: PaginationProps) {
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(2, page - siblingCount);
    const endPage = Math.min(totalPages - 1, page + siblingCount);

    const pages: (number | string)[] = [1];

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
        className={cn(
          "flex size-9 items-center justify-center rounded-sm border border-border bg-card font-mono text-xs transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          page <= 1
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:border-foreground hover:bg-secondary active:scale-95"
        )}
      >
        ←
      </button>

      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex size-9 items-center justify-center font-mono text-xs text-muted-foreground"
            >
              ···
            </span>
          );
        }

        const isCurrent = p === page;
        return (
          <button
            key={p}
            type="button"
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => onPageChange(p as number)}
            className={cn(
              "flex size-9 items-center justify-center rounded-sm border font-mono text-xs font-semibold transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isCurrent
                ? "border-primary bg-primary text-primary-foreground shadow-xs"
                : "border-border bg-card hover:border-foreground hover:bg-secondary cursor-pointer"
            )}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
        className={cn(
          "flex size-9 items-center justify-center rounded-sm border border-border bg-card font-mono text-xs transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          page >= totalPages
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:border-foreground hover:bg-secondary active:scale-95"
        )}
      >
        →
      </button>
    </nav>
  );
}
