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
  ({ selected = [], defaultSelected = [], onSelectionChange, options, searchable = false, className }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedValues, setSelectedValues] = React.useState<string[]>(() => defaultSelected);

    // Initialize from controlled prop
    React.useEffect(() => {
      if (selected !== undefined) {
        setSelectedValues(selected);
      }
    }, [selected]);

    const filteredOptions = options.filter(
      (opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleOption = (value: string) => {
      if (selectedValues.includes(value)) {
        setSelectedValues(selectedValues.filter((v) => v !== value));
      } else {
        setSelectedValues([...selectedValues, value]);
      }
      onSelectionChange?.(selectedValues);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        // Next option logic
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        // Prev option logic
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const option = filteredOptions.find((o) => !selectedValues.includes(o.value));
        if (option) toggleOption(option.value);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-input disabled:cursor-not-allowed disabled:opacity-50",
          "motion-reduce:transition-none",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <span className="select-none">Select options</span>
          <button
            onClick={() => setOpen(!open)}
            className={cn("rounded-md p-1 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "motion-reduce:transition-none")}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            {selectedValues.length > 0 ? `${selectedValues.length} selected` : "Select"}
          </button>
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
            {searchable && (
              <div className="p-2 border-b border-input bg-muted">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.currentTarget.value)}
                  className={cn("w-full bg-transparent px-1 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring")}
                />
              </div>
            )}

            {filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={cn(
                  "flex items-center rounded-md px-2 py-1.5 cursor-pointer select-none",
                  selectedValues.includes(opt.value) && "bg-primary text-primary-foreground",
                  "motion-reduce:transition-none"
                )}
                role="option"
                aria-selected={selectedValues.includes(opt.value)}
                onClick={() => toggleOption(opt.value)}
                onKeyDown={handleKeyDown}
              >
                <span className="mr-2">{opt.label}</span>
              </div>
            ))}

            {!searchable && filteredOptions.length === 0 && (
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

