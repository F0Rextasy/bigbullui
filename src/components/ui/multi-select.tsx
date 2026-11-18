"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type MultiSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type MultiSelectProps = {
  selected?: string[];
  defaultSelected?: string[];
  onSelectionChange?: (selected: string[]) => void;
  options: MultiSelectOption[];
  searchable?: boolean;
  className?: string;
};

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ selected, defaultSelected = [], onSelectionChange, options = [], searchable = false, className }, forwardedRef) => {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [internalValues, setInternalValues] = React.useState<string[]>(() => defaultSelected);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const listId = React.useId();

    const assignRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef]
    );

    const isControlled = selected !== undefined;
    const selectedValues = isControlled ? selected : internalValues;

    const filteredOptions = React.useMemo(
      () =>
        options.filter((opt) =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      [options, searchTerm]
    );

    React.useEffect(() => {
      if (!open) return;
      const handleOutside = (e: MouseEvent) => {
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleOutside);
      return () => document.removeEventListener("mousedown", handleOutside);
    }, [open]);

    const toggleOption = (val: string) => {
      const opt = options.find((o) => o.value === val);
      if (opt?.disabled) return;
      const next = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val];
      if (!isControlled) setInternalValues(next);
      onSelectionChange?.(next);
    };

    const moveFocus = (delta: number) => {
      if (filteredOptions.length === 0) return;
      let nextIdx = activeIndex;
      for (let i = 0; i < filteredOptions.length; i++) {
        nextIdx = (nextIdx + delta + filteredOptions.length) % filteredOptions.length;
        if (!filteredOptions[nextIdx]?.disabled) {
          setActiveIndex(nextIdx);
          return;
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          const firstEnabled = filteredOptions.findIndex((o) => !o.disabled);
          if (firstEnabled >= 0) setActiveIndex(firstEnabled);
        } else {
          moveFocus(1);
        }
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          moveFocus(-1);
        }
        return;
      }
      if (e.key === "Home" && open) {
        e.preventDefault();
        const firstEnabled = filteredOptions.findIndex((o) => !o.disabled);
        if (firstEnabled >= 0) setActiveIndex(firstEnabled);
        return;
      }
      if (e.key === "End" && open) {
        e.preventDefault();
        for (let i = filteredOptions.length - 1; i >= 0; i--) {
          if (!filteredOptions[i]?.disabled) {
            setActiveIndex(i);
            break;
          }
        }
        return;
      }
      if (e.key === "Enter" && open) {
        e.preventDefault();
        const option = filteredOptions[activeIndex];
        if (option && !option.disabled) toggleOption(option.value);
      }
    };

    return (
      <div
        ref={assignRootRef}
        className={cn(
          "relative w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          "motion-reduce:transition-none",
          className
        )}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between">
          <span className="select-none truncate">
            {selectedValues.length > 0
              ? selectedValues.map((v) => options.find((o) => o.value === v)?.label ?? v).join(", ")
              : "Select options"}
          </span>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={cn("rounded-md p-1 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0", "motion-reduce:transition-none")}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
          >
            {selectedValues.length > 0 ? `${selectedValues.length} selected` : "Select"}
          </button>
        </div>

        {open && (
          <div
            id={listId}
            className={cn(
              "absolute inset-x-0 top-full z-50 mt-1 max-h-80 w-full overflow-y-auto rounded-md border border-input bg-card shadow-lg",
              "motion-reduce:animate-none"
            )}
            role="listbox"
            aria-multiselectable="true"
            aria-activedescendant={filteredOptions[activeIndex] ? `${listId}-opt-${activeIndex}` : undefined}
          >
            {searchable && (
              <div className="p-2 border-b border-input bg-muted">
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search..."
                  aria-label="Filter options"
                  onChange={(e) => {
                    setSearchTerm(e.currentTarget.value);
                    setActiveIndex(0);
                  }}
                  className={cn("w-full bg-transparent px-1 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring")}
                />
              </div>
            )}

            {filteredOptions.map((opt, idx) => {
              const isSelected = selectedValues.includes(opt.value);
              const isHighlighted = idx === activeIndex;
              return (
                <div
                  key={opt.value}
                  id={`${listId}-opt-${idx}`}
                  className={cn(
                    "flex select-none items-center justify-between rounded-md px-2 py-1.5",
                    opt.disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer",
                    isHighlighted && !isSelected && "bg-secondary text-secondary-foreground",
                    isSelected && "bg-primary text-primary-foreground",
                    "motion-reduce:transition-none"
                  )}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onMouseEnter={() => !opt.disabled && setActiveIndex(idx)}
                  onClick={() => toggleOption(opt.value)}
                >
                  <span className="me-2">{opt.label}</span>
                  {isSelected ? <span aria-hidden="true">✓</span> : null}
                </div>
              );
            })}

            {filteredOptions.length === 0 && (
              <div className="p-2 text-sm text-muted-foreground">No options match</div>
            )}
          </div>
        )}
      </div>
    );
  }
);
MultiSelect.displayName = "MultiSelect";

export { MultiSelect };

