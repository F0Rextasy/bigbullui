"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  onSearch?: (val: string) => void;
  shortcut?: string;
  className?: string;
}

export function SearchBar({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onSearch,
  shortcut = "⌘K",
  placeholder = "Search stubs, events...",
  className,
  ...props
}: SearchBarProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : uncontrolledValue;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    if (!isControlled) {
      setUncontrolledValue(nextVal);
    }
    onValueChange?.(nextVal);
  };

  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledValue("");
    }
    onValueChange?.("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(currentVal);
    } else if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-10 w-full max-w-sm items-center rounded-md border-2 border-dashed border-border bg-card px-3 transition-colors",
        "focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring",
        className
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-muted-foreground mr-2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        value={currentVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
        {...props}
      />

      {currentVal ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="ml-2 cursor-pointer font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      ) : shortcut ? (
        <kbd className="ml-2 hidden sm:inline-flex items-center rounded-sm border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground select-none">
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}
