"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ListboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type ListboxProps = {
  items: ListboxOption[];
  multiple?: boolean;
  selected?: string | string[];
  defaultSelected?: string | string[];
  onSelectionChange?: (selected: string | string[]) => void;
  className?: string;
};

const Listbox = React.forwardRef<HTMLDivElement, ListboxProps>(
  ({ items, multiple = false, selected = [], defaultSelected = [], onSelectionChange, className }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<string[]>(() => {
      if (selected !== undefined && selected !== null) {
        return Array.isArray(selected) ? selected : [selected];
      }
      return defaultSelected ? (Array.isArray(defaultSelected) ? defaultSelected : [defaultSelected]) : [];
    });

    // Sync from controlled prop
    React.useEffect(() => {
      if (selected !== undefined && selected !== null) {
        setValue(Array.isArray(selected) ? selected : [selected]);
      }
    }, [selected]);

    const toggleOption = (optionValue: string) => {
      let next: string[];
      if (multiple) {
        next = value.includes(optionValue)
          ? value.filter((v) => v !== optionValue)
          : [...value, optionValue];
      } else {
        next = [optionValue];
      }
      setValue(next);
      onSelectionChange?.(multiple ? next : (next[0] ?? ""));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        // Next item
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        // Prev item
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const option = items.find((o) => o.value === value[0]);
        if (option) toggleOption(option.value);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-input disabled:cursor-not-allowed disabled:opacity-50",
          "motion-reduce:transition-none",
          className
        )}
      >
        <div
          className={cn("flex items-center justify-between", "motion-reduce:transition-none")}
          onClick={() => setOpen(!open)}
          role="button"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          {value.length > 0 ? value.map((v) => items.find((i) => i.value === v)?.label ?? v).join(", ") : "Select option"}
        </div>

        {open && (
          <div
            className={cn(
              "absolute w-full mt-1 rounded-md bg-card border border-input shadow-lg max-h-80 overflow-y-auto z-10",
              "motion-reduce:animate-none"
            )}
            role="listbox"
            onKeyDown={handleKeyDown}
          >
            {items.map((opt) => (
              <div
                key={opt.value}
                className={cn(
                  "flex items-center rounded-md px-2 py-1.5 cursor-pointer select-none",
                  value.includes(opt.value) && "bg-primary text-primary-foreground",
                  "motion-reduce:transition-none"
                )}
                role="option"
                aria-selected={value.includes(opt.value)}
                onClick={() => toggleOption(opt.value)}
                onKeyDown={handleKeyDown}
              >
                <span className="mr-2 inline-flex items-center gap-2">
                  {value.includes(opt.value) ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : null}
                  {opt.label}
                </span>
              </div>
            ))}

            {items.length === 0 && (
              <div className="p-2 text-sm text-muted-foreground">No options</div>
            )}
          </div>
        )}
      </div>
    );
  }
);
Listbox.displayName = "Listbox";

export { Listbox };

