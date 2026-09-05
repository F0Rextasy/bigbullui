"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CheckboxGroupOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type CheckboxGroupProps = {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  options: CheckboxGroupOption[];
  className?: string;
};

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ value = [], defaultValue = [], onValueChange, options, className }, ref) => {
    const [internal, setInternal] = React.useState<string[]>(() => defaultValue);
    const [showAll, setShowAll] = React.useState(false);

    // Sync from controlled prop
    React.useEffect(() => {
      if (value !== undefined) {
        setInternal(value);
      }
    }, [value]);

    const toggledValues = options
      .filter((opt) => !opt.disabled)
      .reduce((acc, opt) => {
        if (internal.includes(opt.value)) {
          acc.push(opt.value);
        }
        return acc;
      }, [] as string[]);

    const handleChange = (value: string) => {
      if (toggledValues.includes(value)) {
        setInternal(toggledValues.filter((v) => v !== value));
      } else {
        setInternal([...toggledValues, value]);
      }
      onValueChange?.(toggledValues);
    };

    const handleSelectAll = () => {
      setShowAll(!showAll);
      const allValues = options.filter((opt) => !opt.disabled).map((opt) => opt.value);
      setInternal(allValues);
      onValueChange?.(allValues);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-2",
          className
        )}
      >
        {/* Select all row */}
        <div className="group flex items-start">
          <input
            type="checkbox"
            checked={showAll}
            onChange={handleSelectAll}
            className={cn(
              "w-4 h-4 rounded border border-input bg-background shrink-0 cursor-pointer flex-shrink-0",
              "motion-reduce:transition-none"
            )}
            aria-label="Select all"
          />
          <span className="ml-2 text-sm flex-1 uppercase tracking-[0.15em] text-muted-foreground">
            {showAll ? "Deselect all" : "Select all"}
          </span>
        </div>

        {/* Options with staggered entrance */}
        {options.map((opt, index) => (
          <div
            key={opt.value}
            className="flex items-start space-x-2"
            style={{
              animation: `stamp-in 0.3s ease-out ${index * 50}ms both`,
            }}
          >
            <input
              type="checkbox"
              checked={internal.includes(opt.value)}
              onChange={() => handleChange(opt.value)}
              disabled={opt.disabled}
              className={cn(
                "w-4 h-4 rounded border border-input bg-background shrink-0 cursor-pointer flex-shrink-0",
                "motion-reduce:transition-none"
              )}
            />
            <span className="ml-2 text-sm flex-1 uppercase tracking-[0.15em]">
              {opt.label}
            </span>
          </div>
        ))}

        {options.length === 0 && (
          <p className="text-sm text-muted-foreground">No options available</p>
        )}
      </div>
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };

