"use client";

import * as React from "react";
import { cn } from "./lib/utils";

interface ToggleGroupContextValue {
  value?: string;
  onSelect: (val: string) => void;
}

const ToggleGroupCtx = React.createContext<ToggleGroupContextValue | null>(null);

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function ToggleGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  children,
  className,
  "aria-label": ariaLabel = "Toggle group",
  ...props
}: ToggleGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : uncontrolledValue;

  const onSelect = React.useCallback(
    (val: string) => {
      if (!isControlled) {
        setUncontrolledValue(val);
      }
      onValueChange?.(val);
    },
    [isControlled, onValueChange]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=radio]:not(:disabled)")
    );
    if (items.length === 0) return;
    const currentIndex = items.findIndex((item) => item === document.activeElement);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % items.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    items[nextIndex]?.focus();
    items[nextIndex]?.click();
  };

  return (
    <ToggleGroupCtx.Provider value={{ value: currentVal, onSelect }}>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border-2 border-dashed border-border bg-card p-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupCtx.Provider>
  );
}

export interface ToggleItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function ToggleItem({
  value,
  disabled = false,
  children,
  className,
  onClick,
  ...props
}: ToggleItemProps) {
  const ctx = React.useContext(ToggleGroupCtx);
  const isSelected = ctx?.value === value;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={(e) => {
        ctx?.onSelect(value);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-sm px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isSelected
          ? "bg-primary text-primary-foreground shadow-xs"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        disabled && "cursor-not-allowed opacity-50"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
