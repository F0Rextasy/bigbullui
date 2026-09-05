"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface YearPickerProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  from?: number;
  to?: number;
  className?: string;
}

const generateYears = (from: number, to: number): number[] => {
  const years: number[] = [];
  for (let y = from; y <= to; y++) {
    years.push(y);
  }
  return years;
};

export function YearPicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  from,
  to,
  className,
}: YearPickerProps) {
  const minYear = from ?? new Date().getFullYear() - 10;
  const maxYear = to ?? new Date().getFullYear() + 10;
  const years = generateYears(minYear, maxYear);

  const [internalValue, setInternalValue] = React.useState<number | undefined>(
    controlledValue ?? defaultValue
  );
  const isControlled = controlledValue !== undefined;

  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
    }
  }, [isControlled, controlledValue]);

  const pageSize = 12;
  const totalPages = Math.ceil(years.length / pageSize);
  const [currentPage, setCurrentPage] = React.useState(0);

  const pageYears = years.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const prevPage = currentPage > 0 ? currentPage - 1 : 0;
  const nextPage = currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleYearSelect = (year: number) => {
    setInternalValue(year);
    onValueChange?.(year);
  };

  return (
    <div
      className={cn(
        "relative rounded-md border border-border bg-card p-4 font-mono",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(prevPage)}
            className="prev-page hover:text-muted-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6L3 9l6-3 6 6-6 6Z" />
            </svg>
          </button>
          <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground">
            {years[currentPage * pageSize]} - {years[Math.min(currentPage * pageSize + 11, years.length - 1)]}
          </span>
          <span className="mx-2 text-[10px]/7 uppercase tracking-wider">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {maxYear}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(nextPage)}
            className="next-page hover:text-muted-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6v-3L15 9l-6-6 6-6Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {pageYears.map((y) => {
          const isSelected = internalValue === y;
          const handleClick = () => {
            handleYearSelect(y);
          };

          const bgClass = cn(
            "rounded-sm px-2 py-1 cursor-pointer select-none",
            isSelected && "bg-accent text-accent-foreground",
            "hover:bg-accent/20 transition-colors"
          );

          return (
            <div
              key={y}
              onClick={handleClick}
              className={bgClass}
            >
              {y}
            </div>
          );
        })}
      </div>
    </div>
  );
}

YearPicker.displayName = "YearPicker";

