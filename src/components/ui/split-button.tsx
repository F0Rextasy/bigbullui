"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SplitButtonOption {
  id: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
}

export interface SplitButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  label: string;
  options: SplitButtonOption[];
  onPrimaryClick?: () => void;
  onSelectOption?: (option: SplitButtonOption) => void;
  variant?: "default" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export function SplitButton({
  label,
  options,
  onPrimaryClick,
  onSelectOption,
  variant = "default",
  size = "md",
  disabled = false,
  className,
  ...props
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const VARIANT_MAP = {
    default: "bg-foreground text-background border-foreground",
    accent: "bg-accent text-accent-foreground border-foreground",
    outline: "bg-card text-foreground border-foreground",
  };

  const SIZE_MAP = {
    sm: "h-8 text-xs",
    md: "h-10 text-xs",
    lg: "h-12 text-sm",
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex items-center select-none font-mono", className)}
      {...props}
    >
      {/* Primary Action Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={onPrimaryClick}
        className={cn(
          "inline-flex items-center justify-center rounded-l-md border-2 border-r-0 px-4 font-bold uppercase tracking-wider transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40",
          VARIANT_MAP[variant],
          SIZE_MAP[size]
        )}
      >
        {label}
      </button>

      {/* Dropdown Toggle Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center justify-center rounded-r-md border-2 border-l-2 border-l-dashed border-l-current px-2.5 font-bold transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40",
          VARIANT_MAP[variant],
          SIZE_MAP[size]
        )}
      >
        <span className="text-[10px]">▾</span>
      </button>

      {/* Popover Options Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1.5 min-w-44 rounded-md border-2 border-foreground bg-card p-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              disabled={option.disabled}
              onClick={() => {
                onSelectOption?.(option);
                setIsOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-xs font-bold text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-30 text-left"
            >
              <span>{option.label}</span>
              {option.shortcut && (
                <span className="text-[10px] text-muted-foreground font-normal">
                  {option.shortcut}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
