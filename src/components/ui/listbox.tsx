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
  ({ items = [], multiple = false, selected, defaultSelected = [], onSelectionChange, className }, forwardedRef) => {
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [internalValue, setInternalValue] = React.useState<string[]>(() =>
      defaultSelected ? (Array.isArray(defaultSelected) ? defaultSelected : [defaultSelected]) : []
    );
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
    const value = React.useMemo(
      () =>
        isControlled
          ? Array.isArray(selected)
            ? selected
            : selected
              ? [selected]
              : []
          : internalValue,
      [isControlled, selected, internalValue]
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

    const toggleOption = (optionValue: string) => {
      const opt = items.find((item) => item.value === optionValue);
      if (opt?.disabled) return;
      let next: string[];
      if (multiple) {
        next = value.includes(optionValue)
          ? value.filter((v) => v !== optionValue)
          : [...value, optionValue];
      } else {
        next = [optionValue];
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (!isControlled) setInternalValue(next);
      onSelectionChange?.(multiple ? next : (next[0] ?? ""));
    };

    const moveFocus = (delta: number) => {
      if (items.length === 0) return;
      let nextIdx = activeIndex;
      for (let i = 0; i < items.length; i++) {
        nextIdx = (nextIdx + delta + items.length) % items.length;
        if (!items[nextIdx]?.disabled) {
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
          const firstEnabled = items.findIndex((o) => !o.disabled);
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
        const firstEnabled = items.findIndex((o) => !o.disabled);
        if (firstEnabled >= 0) setActiveIndex(firstEnabled);
        return;
      }
      if (e.key === "End" && open) {
        e.preventDefault();
        for (let i = items.length - 1; i >= 0; i--) {
          if (!items[i]?.disabled) {
            setActiveIndex(i);
            break;
          }
        }
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        const option = items[activeIndex];
        if (option && !option.disabled) toggleOption(option.value);
      }
    };

    return (
      <div
        ref={assignRootRef}
        className={cn(
          "relative w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          "motion-reduce:transition-none",
          className
        )}
        onKeyDown={handleKeyDown}
      >
        <button
          ref={triggerRef}
          type="button"
          className={cn("flex w-full cursor-pointer items-center justify-between text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs", "motion-reduce:transition-none")}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listId : undefined}
        >
          <span className={cn("truncate", value.length === 0 && "text-muted-foreground")}>
            {value.length > 0 ? value.map((v) => items.find((i) => i.value === v)?.label ?? v).join(", ") : "Select option"}
          </span>
          <span aria-hidden="true" className="ms-2 text-xs text-muted-foreground">▾</span>
        </button>

        {open && (
          <div
            id={listId}
            className={cn(
              "absolute inset-x-0 top-full z-50 mt-1 max-h-80 w-full overflow-y-auto rounded-md border border-input bg-card p-1 shadow-lg",
              "motion-reduce:animate-none"
            )}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            aria-activedescendant={items[activeIndex] ? `${listId}-opt-${activeIndex}` : undefined}
          >
            {items.map((opt, idx) => {
              const isSelected = value.includes(opt.value);
              const isHighlighted = idx === activeIndex;
              return (
                <div
                  key={opt.value}
                  id={`${listId}-opt-${idx}`}
                  className={cn(
                    "flex select-none items-center rounded-md px-2 py-1.5",
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
                  <span className="me-2 inline-flex items-center gap-2">
                    {isSelected ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : null}
                    {opt.label}
                  </span>
                </div>
              );
            })}

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

