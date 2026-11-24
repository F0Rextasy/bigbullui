"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { mergeRefs, useIsMounted } from "./lib/react-compat";
import { useControllableState } from "./lib/use-controllable-state";
import { useFloating } from "./lib/floating";
import { registerEscapeLayer } from "./lib/focus-trap";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
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
  required?: boolean;
  name?: string;
  id?: string;
  "aria-label"?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
  className?: string;
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(function Combobox(
  {
    options = [],
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    placeholder = "Select an option...",
    searchPlaceholder = "Type to search...",
    emptyText = "No items match.",
    disabled = false,
    required = false,
    name,
    id,
    "aria-label": ariaLabel,
    animated = true,
    className,
  },
  forwardedRef
) {
  const [currentVal, setCurrentVal] = useControllableState<string>({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const mounted = useIsMounted();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const listId = React.useId();

  const selectedOption = options.find((opt) => opt.value === currentVal);

  const filteredOptions = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q)
    );
  }, [options, search]);

  const floating = useFloating({
    open: open && mounted,
    referenceRef: triggerRef,
    floatingRef: popoverRef,
    side: "bottom",
    align: "start",
    offset: 6,
    matchWidth: true,
  });

  const closeMenu = React.useCallback((restoreFocus = false) => {
    setOpen(false);
    setSearch("");
    if (restoreFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const openMenu = React.useCallback(() => {
    if (disabled) return;
    const matchedIdx = options.findIndex((o) => o.value === currentVal && !o.disabled);
    const firstEnabled = options.findIndex((o) => !o.disabled);
    setActiveIndex(matchedIdx >= 0 ? matchedIdx : Math.max(0, firstEnabled));
    setOpen(true);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }, [disabled, options, currentVal]);

  // Reset uncontrolled state on enclosing <form> reset
  React.useEffect(() => {
    const form = triggerRef.current?.closest("form");
    if (!form) return;
    const handleReset = () => {
      if (controlledValue === undefined) {
        setCurrentVal(defaultValue);
      }
      setOpen(false);
      setSearch("");
    };
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [controlledValue, defaultValue, setCurrentVal]);

  // Outside click and escape layer
  React.useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    const unregisterEscape = registerEscapeLayer(() => closeMenu(true));
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      unregisterEscape();
    };
  }, [open, closeMenu]);

  // Keep active option visible when navigating via keyboard
  React.useEffect(() => {
    if (!open || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(
      `#${CSS.escape(`${listId}-opt-${activeIndex}`)}`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, listId]);

  const moveActive = (delta: 1 | -1) => {
    if (filteredOptions.length === 0) return;
    setActiveIndex((prev) => {
      let next = prev;
      for (let step = 0; step < filteredOptions.length; step++) {
        next = (next + delta + filteredOptions.length) % filteredOptions.length;
        if (!filteredOptions[next]?.disabled) return next;
      }
      return prev;
    });
  };

  const handleSelect = (opt: ComboboxOption) => {
    if (opt.disabled) return;
    setCurrentVal(opt.value);
    closeMenu(true);
  };

  const activeOpt = filteredOptions[activeIndex];

  return (
    <div className={cn("relative inline-block w-full", className)}>
      {name ? (
        <input type="hidden" name={name} value={currentVal} required={required} disabled={disabled} />
      ) : null}
      <button
        ref={mergeRefs(forwardedRef, triggerRef)}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        data-required={required || undefined}
        aria-label={ariaLabel}
        onClick={() => (open ? closeMenu(false) : openMenu())}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            e.preventDefault();
            openMenu();
          }
        }}
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
          className={cn(
            "ms-2 size-4 shrink-0 transition-transform duration-150",
            open && "rotate-180"
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

      {open && mounted
        ? createPortal(
            <div
              ref={popoverRef}
              style={{
                position: "fixed",
                top: floating.top,
                left: floating.left,
                minWidth: floating.minWidth ?? 220,
                maxWidth: "calc(100vw - 16px)",
              }}
              className={cn(
                "z-50 max-h-72 overflow-hidden rounded-md border-2 border-foreground bg-card p-2 shadow-lg outline-1 outline-dashed outline-offset-[-4px]",
                animated && "motion-safe:animate-[scale-in_0.14s_ease-out_both]"
              )}
            >
              <input
                ref={searchInputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-autocomplete="list"
                aria-required={required || undefined}
                aria-controls={listId}
                aria-activedescendant={
                  activeOpt && !activeOpt.disabled ? `${listId}-opt-${activeIndex}` : undefined
                }
                aria-label={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearch(val);
                  const q = val.trim().toLowerCase();
                  const nextOpts = q
                    ? options.filter(
                        (opt) =>
                          opt.label.toLowerCase().includes(q) ||
                          opt.value.toLowerCase().includes(q)
                      )
                    : options;
                  const firstValid = nextOpts.findIndex((o) => !o.disabled);
                  setActiveIndex(Math.max(0, firstValid));
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    moveActive(1);
                    return;
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    moveActive(-1);
                    return;
                  }
                  if (e.key === "Home") {
                    e.preventDefault();
                    const first = filteredOptions.findIndex((o) => !o.disabled);
                    if (first >= 0) setActiveIndex(first);
                    return;
                  }
                  if (e.key === "End") {
                    e.preventDefault();
                    for (let i = filteredOptions.length - 1; i >= 0; i--) {
                      if (!filteredOptions[i].disabled) {
                        setActiveIndex(i);
                        break;
                      }
                    }
                    return;
                  }
                  if (e.key === "Enter" && activeOpt && !activeOpt.disabled) {
                    e.preventDefault();
                    handleSelect(activeOpt);
                    return;
                  }
                  if (e.key === "Tab") {
                    closeMenu(false);
                  }
                }}
                placeholder={searchPlaceholder}
                className="mb-2 w-full rounded-sm border border-dashed border-border bg-secondary/50 px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
              />

              <ul
                ref={listRef}
                id={listId}
                role="listbox"
                aria-label={ariaLabel ?? placeholder}
                className="max-h-48 overflow-y-auto space-y-0.5"
              >
                {filteredOptions.map((opt, idx) => {
                  const isSelected = opt.value === currentVal;
                  return (
                    <li
                      key={opt.value}
                      id={`${listId}-opt-${idx}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled || undefined}
                      onClick={() => handleSelect(opt)}
                      onMouseEnter={() => {
                        if (!opt.disabled) setActiveIndex(idx);
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-sm px-2.5 py-1.5 font-mono text-xs transition-colors",
                        opt.disabled
                          ? "cursor-not-allowed opacity-45 text-muted-foreground"
                          : "cursor-pointer",
                        idx === activeIndex && !opt.disabled
                          ? "bg-accent font-bold text-accent-foreground"
                          : !opt.disabled && "hover:bg-secondary text-foreground"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected ? <span aria-hidden="true">✓</span> : null}
                    </li>
                  );
                })}
              </ul>
              {filteredOptions.length === 0 ? (
                <div className="py-2 text-center font-mono text-xs text-muted-foreground">
                  {emptyText}
                </div>
              ) : null}
            </div>,
            document.body
          )
        : null}
    </div>
  );
});
Combobox.displayName = "Combobox";
