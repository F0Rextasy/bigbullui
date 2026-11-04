"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
}

export function Combobox({
  options,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Type to search...",
  emptyText = "No stubs match.",
  disabled = false,
  className,
}: ComboboxProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : uncontrolledValue;

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const listId = React.useId();

  const selectedOption = options.find((opt) => opt.value === currentVal);

  const filteredOptions = React.useMemo(() => {
    if (!search) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      setActiveIndex(Math.max(0, filteredOptions.findIndex((o) => o.value === currentVal)));
      setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, filteredOptions, currentVal]);

  const handleSelect = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onValueChange?.(val);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full max-w-xs", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border-2 border-dashed border-border bg-card px-3 py-2 text-start font-mono text-xs transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-foreground",
          disabled && "cursor-not-allowed opacity-50",
          !disabled && "cursor-pointer hover:border-foreground/50"
        )}
      >
        <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={cn("ms-2 size-4 shrink-0 transition-transform duration-150", open && "rotate-180")}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>

      {open ? (
        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-hidden rounded-md border border-border bg-card p-2 shadow-lg outline-1 outline-dashed outline-offset-[-4px]">
          <input
            ref={searchInputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filteredOptions[activeIndex] ? `${listId}-opt-${activeIndex}` : undefined}
            aria-label={searchPlaceholder}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveIndex(0); }}
            onKeyDown={(e) => {
              if (e.key === "Escape") { setOpen(false); setSearch(""); return; }
              if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1)); return; }
              if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); return; }
              if (e.key === "Enter" && filteredOptions[activeIndex]) { e.preventDefault(); handleSelect(filteredOptions[activeIndex].value); }
            }}
            placeholder={searchPlaceholder}
            className="mb-2 w-full rounded-sm border border-dashed border-border bg-secondary/50 px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          />

          <ul id={listId} role="listbox" aria-label={placeholder} className="max-h-44 overflow-y-auto space-y-0.5">
            {filteredOptions.map((opt, idx) => {
              const isSelected = opt.value === currentVal;
              return (
                <li
                  key={opt.value}
                  id={`${listId}-opt-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    "flex cursor-pointer select-none items-center justify-between rounded-sm px-2.5 py-1.5 font-mono text-xs transition-colors",
                    idx === activeIndex
                      ? "bg-accent font-bold text-accent-foreground"
                      : "hover:bg-secondary hover:text-foreground text-foreground"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected ? <span>✓</span> : null}
                </li>
              );
            })}
          </ul>
          {filteredOptions.length === 0 ? (
            <div className="py-2 text-center font-mono text-xs text-muted-foreground">{emptyText}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
