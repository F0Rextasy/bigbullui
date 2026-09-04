"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AutocompleteOption {
  value: string;
  label: string;
  category?: string;
}

export interface AutocompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  options: AutocompleteOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  className?: string;
}

export function Autocomplete({
  options,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "Search seat or section...",
  className,
  ...props
}: AutocompleteProps) {
  const [internalVal, setInternalVal] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : internalVal;

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = React.useMemo(() => {
    if (!currentVal) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(currentVal.toLowerCase()) ||
      o.value.toLowerCase().includes(currentVal.toLowerCase())
    );
  }, [options, currentVal]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: AutocompleteOption) => {
    if (!isControlled) setInternalVal(option.label);
    onValueChange?.(option.value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setIsOpen(true);
      return;
    }

    if (isOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i < filteredOptions.length - 1 ? i + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : filteredOptions.length - 1));
      } else if (e.key === "Enter" && filteredOptions[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredOptions[selectedIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-sm font-mono select-none", className)}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={currentVal}
          onChange={(e) => {
            if (!isControlled) setInternalVal(e.target.value);
            onValueChange?.(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-md border-2 border-foreground bg-card px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-all shadow-xs",
            "focus:border-accent focus:ring-1 focus:ring-accent"
          )}
          {...props}
        />
        {currentVal && (
          <button
            type="button"
            onClick={() => {
              if (!isControlled) setInternalVal("");
              onValueChange?.("");
            }}
            className="absolute right-2.5 text-muted-foreground hover:text-foreground text-xs cursor-pointer font-bold"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border-2 border-foreground bg-card p-1 shadow-xl outline-1 outline-dashed outline-offset-[-4px] animate-[scale-in_0.12s_ease-out_both] text-xs">
          {filteredOptions.map((opt, idx) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt)}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-sm px-2.5 py-1.5 transition-colors",
                idx === selectedIndex
                  ? "bg-accent font-bold text-accent-foreground"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <span>{opt.label}</span>
              {opt.category && (
                <span className="text-[10px] opacity-70 uppercase tracking-wider">
                  [{opt.category}]
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
