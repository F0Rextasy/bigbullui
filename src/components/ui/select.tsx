"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { registerEscapeLayer } from "./lib/focus-trap";
import { mergeRefs, useIsMounted } from "./lib/react-compat";
import { useControllableState } from "./lib/use-controllable-state";
import { useFloating } from "./lib/floating";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options?: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options = [],
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    placeholder = "Select an option",
    disabled = false,
    required = false,
    name,
    id,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    animated = true,
  },
  forwardedRef,
) {
  const mounted = useIsMounted();
  const [selectedValue, setSelectedValue] = useControllableState<string>({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [open, setOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const listboxId = React.useId();

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const pos = useFloating({
    open: open && mounted,
    referenceRef: triggerRef,
    floatingRef: listRef,
    side: "bottom",
    align: "start",
    offset: 4,
    matchWidth: true,
  });

  // Sync uncontrolled value on native <form> reset
  React.useEffect(() => {
    const form = triggerRef.current?.form;
    if (!form || controlledValue !== undefined) return;
    const onReset = () => setSelectedValue(defaultValue);
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [controlledValue, defaultValue, setSelectedValue]);

  const handleSelect = React.useCallback(
    (opt: SelectOption) => {
      if (opt.disabled) return;
      setSelectedValue(opt.value);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [setSelectedValue],
  );

  React.useEffect(() => {
    if (!open || !mounted) return;
    function handleClickOutside(e: PointerEvent) {
      const t = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(t) &&
        !listRef.current?.contains(t)
      ) {
        setOpen(false);
      }
    }
    const releaseEscape = registerEscapeLayer(() => {
      setOpen(false);
      triggerRef.current?.focus();
    });
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      releaseEscape();
    };
  }, [open, mounted]);

  const moveHighlight = (dir: 1 | -1) => {
    if (options.length === 0) return;
    setHighlightedIndex((prev) => {
      for (let step = 1; step <= options.length; step++) {
        const idx = (prev + dir * step + options.length * 2) % options.length;
        if (!options[idx]?.disabled) return idx;
      }
      return -1;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        const firstIdx = options.findIndex((o) => !o.disabled);
        setHighlightedIndex(firstIdx);
      } else {
        moveHighlight(1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        let lastIdx = -1;
        for (let i = options.length - 1; i >= 0; i--) {
          if (!options[i]?.disabled) {
            lastIdx = i;
            break;
          }
        }
        setHighlightedIndex(lastIdx);
      } else {
        moveHighlight(-1);
      }
    } else if (e.key === "Home" && open) {
      e.preventDefault();
      setHighlightedIndex(options.findIndex((o) => !o.disabled));
    } else if (e.key === "End" && open) {
      e.preventDefault();
      for (let i = options.length - 1; i >= 0; i--) {
        if (!options[i]?.disabled) {
          setHighlightedIndex(i);
          break;
        }
      }
    } else if (e.key === "Enter" || e.key === " ") {
      if (open && highlightedIndex >= 0 && highlightedIndex < options.length) {
        e.preventDefault();
        const opt = options[highlightedIndex];
        if (opt && !opt.disabled) handleSelect(opt);
      } else if (!open) {
        e.preventDefault();
        setOpen(true);
      }
    } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const ch = e.key.toLowerCase();
      const idx = options.findIndex(
        (o) => !o.disabled && o.label.toLowerCase().startsWith(ch),
      );
      if (idx !== -1) {
        if (open) setHighlightedIndex(idx);
        else handleSelect(options[idx]);
      }
    }
  };

  const activeOptionId =
    open && highlightedIndex >= 0 && options[highlightedIndex]
      ? `${listboxId}-opt-${highlightedIndex}`
      : undefined;

  const listbox =
    open && mounted ? (
      <ul
        ref={listRef}
        id={listboxId}
        role="listbox"
        aria-activedescendant={activeOptionId}
        tabIndex={-1}
        style={{
          position: "fixed",
          top: pos.top,
          left: pos.left,
          minWidth: pos.minWidth,
          visibility: pos.ready ? "visible" : "hidden",
        }}
        className="z-50 max-h-60 overflow-auto overscroll-contain rounded-md border border-border bg-card p-1 shadow-md outline-1 outline-dashed outline-offset-[-4px]"
      >
        {options.map((option, index) => {
          const isSelected = option.value === selectedValue;
          const isHighlighted = index === highlightedIndex;
          return (
            <li
              key={option.value}
              id={`${listboxId}-opt-${index}`}
              role="option"
              aria-selected={isSelected}
              aria-disabled={option.disabled || undefined}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => {
                if (!option.disabled) setHighlightedIndex(index);
              }}
              className={cn(
                "relative flex select-none items-center justify-between rounded-sm px-3 py-2 font-mono text-xs transition-colors",
                option.disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
                isHighlighted && !option.disabled && "bg-secondary text-secondary-foreground",
                isSelected && "bg-accent font-bold text-accent-foreground",
              )}
            >
              <span className="truncate">{option.label}</span>
              {isSelected ? (
                <span className="ms-2 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
                  ✓
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    ) : null;

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full", className)}>
      {name && !disabled ? (
        <input type="hidden" name={name} value={selectedValue} required={required} />
      ) : null}
      <button
        ref={mergeRefs(triggerRef, forwardedRef)}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        data-required={required || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border-2 border-dashed border-border bg-card px-3 py-2 text-start font-mono text-sm transition-colors",
          "focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          disabled && "cursor-not-allowed opacity-50",
          !disabled && "cursor-pointer hover:border-foreground/50",
        )}
      >
        <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={cn(
            "ms-2 size-4 shrink-0",
            animated ? "transition-transform duration-150 motion-reduce:transition-none" : "transition-none",
            open && "rotate-180",
          )}
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

      {listbox ? createPortal(listbox, document.body) : null}
    </div>
  );
});
Select.displayName = "Select";
