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
  ({ value, defaultValue = [], onValueChange, options = [], className }, ref) => {
    const [internal, setInternal] = React.useState<string[]>(() => defaultValue);
    const baseId = React.useId();
    const isControlled = value !== undefined;
    const currentValues = isControlled ? value : internal;

    const enabledValues = options.filter((opt) => !opt.disabled).map((opt) => opt.value);
    const allSelected = enabledValues.length > 0 && enabledValues.every((v) => currentValues.includes(v));

    const handleChange = (optValue: string) => {
      const next = currentValues.includes(optValue)
        ? currentValues.filter((v) => v !== optValue)
        : [...currentValues, optValue];
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    const handleSelectAll = () => {
      const next = allSelected
        ? currentValues.filter((v) => !enabledValues.includes(v))
        : Array.from(new Set([...currentValues, ...enabledValues]));
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "space-y-2",
          className
        )}
      >
        {/* Select all row */}
        <label className="group flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAll}
            disabled={enabledValues.length === 0}
            className={cn(
              "h-4 w-4 shrink-0 cursor-pointer rounded border border-input bg-background accent-accent",
              "motion-reduce:transition-none"
            )}
            aria-label="Select all"
          />
          <span className="flex-1 text-sm uppercase tracking-[0.15em] text-muted-foreground">
            {allSelected ? "Deselect all" : "Select all"}
          </span>
        </label>

        {/* Options with staggered entrance */}
        {options.map((opt, index) => {
          const optId = `${baseId}-opt-${index}`;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(
                "flex items-center space-x-2 motion-reduce:animate-none!",
                opt.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              )}
              style={{
                animation: `stampIn 0.3s ease-out ${index * 50}ms both`,
              }}
            >
              <input
                id={optId}
                type="checkbox"
                checked={currentValues.includes(opt.value)}
                onChange={() => handleChange(opt.value)}
                disabled={opt.disabled}
                className={cn(
                  "h-4 w-4 shrink-0 cursor-pointer rounded border border-input bg-background accent-accent disabled:cursor-not-allowed",
                  "motion-reduce:transition-none"
                )}
              />
              <span className="ms-2 flex-1 text-sm uppercase tracking-[0.15em]">
                {opt.label}
              </span>
            </label>
          );
        })}

        {options.length === 0 && (
          <p className="text-sm text-muted-foreground">No options available</p>
        )}
      </div>
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };

