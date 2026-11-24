"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  getPageHref?: (page: number) => string;
  siblingCount?: number;
  className?: string;
  "aria-label"?: string;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page = 1,
    totalPages = 1,
    onPageChange,
    getPageHref,
    siblingCount = 1,
    className,
    "aria-label": ariaLabel = "Pagination",
  },
  ref
) {
  if (!Number.isFinite(totalPages) || totalPages < 1) return null;

  const safePage = Math.min(Math.max(1, Number.isFinite(page) ? page : 1), totalPages);

  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(2, safePage - siblingCount);
    const endPage = Math.min(totalPages - 1, safePage + siblingCount);

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

  const renderControl = (
    targetPage: number,
    label: React.ReactNode,
    opts: { disabled?: boolean; isCurrent?: boolean; ariaLabel?: string }
  ) => {
    const commonClass = cn(
      "flex size-9 items-center justify-center rounded-sm border font-mono text-xs transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      opts.disabled
        ? "cursor-not-allowed border-border bg-card opacity-40 pointer-events-none"
        : opts.isCurrent
        ? "border-primary bg-primary font-semibold text-primary-foreground shadow-xs"
        : "cursor-pointer border-border bg-card hover:border-foreground hover:bg-secondary active:scale-95 motion-reduce:active:scale-100"
    );

    if (getPageHref && !opts.disabled) {
      return (
        <a
          href={getPageHref(targetPage)}
          aria-label={opts.ariaLabel}
          aria-current={opts.isCurrent ? "page" : undefined}
          onClick={() => onPageChange?.(targetPage)}
          className={commonClass}
        >
          {label}
        </a>
      );
    }

    return (
      <button
        type="button"
        disabled={opts.disabled}
        aria-label={opts.ariaLabel}
        aria-current={opts.isCurrent ? "page" : undefined}
        onClick={() => onPageChange?.(targetPage)}
        className={commonClass}
      >
        {label}
      </button>
    );
  };

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      {renderControl(safePage - 1, "←", {
        disabled: safePage <= 1,
        ariaLabel: "Previous page",
      })}

      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              aria-hidden="true"
              className="flex size-9 items-center justify-center font-mono text-xs text-muted-foreground"
            >
              ···
            </span>
          );
        }

        const pageNum = p as number;
        return (
          <React.Fragment key={pageNum}>
            {renderControl(pageNum, pageNum, {
              isCurrent: pageNum === safePage,
            })}
          </React.Fragment>
        );
      })}

      {renderControl(safePage + 1, "→", {
        disabled: safePage >= totalPages,
        ariaLabel: "Next page",
      })}
    </nav>
  );
});
Pagination.displayName = "Pagination";
