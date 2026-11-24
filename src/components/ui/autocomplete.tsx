"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { mergeRefs, useIsMounted } from "./lib/react-compat";
import { useFloating } from "./lib/floating";
import { registerEscapeLayer } from "./lib/focus-trap";

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
  onSelectOption?: (option: AutocompleteOption) => void;
  className?: string;
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  function Autocomplete(
    {
      options = [],
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      onSelectOption,
      placeholder = "Search seat or section...",
      disabled,
      className,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    forwardedRef
  ) {
    const [internalVal, setInternalVal] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const rawVal = isControlled ? controlledValue : internalVal;

    const [isOpen, setIsOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const mounted = useIsMounted();
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const listId = React.useId();

    const matchedByValue = React.useMemo(
      () => options.find((o) => o.value === rawVal),
      [options, rawVal]
    );
    const displayVal = !isEditing && matchedByValue ? matchedByValue.label : rawVal;

    const filteredOptions = React.useMemo(() => {
      const q = (isEditing ? rawVal : displayVal).trim().toLowerCase();
      if (!q) return options;
      return options.filter(
        (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
      );
    }, [options, rawVal, displayVal, isEditing]);

    const showDropdown = isOpen && filteredOptions.length > 0 && !disabled;
    const safeIndex = Math.min(selectedIndex, Math.max(0, filteredOptions.length - 1));

    const floating = useFloating({
      open: showDropdown && mounted,
      referenceRef: anchorRef,
      floatingRef: listRef,
      side: "bottom",
      align: "start",
      offset: 4,
      matchWidth: true,
    });

    React.useEffect(() => {
      if (!isOpen) return;
      const handlePointerDown = (e: PointerEvent) => {
        const target = e.target as Node;
        if (
          anchorRef.current?.contains(target) ||
          listRef.current?.contains(target)
        ) {
          return;
        }
        setIsOpen(false);
        setIsEditing(false);
      };
      document.addEventListener("pointerdown", handlePointerDown);
      const unregisterEscape = registerEscapeLayer(() => {
        setIsOpen(false);
        setIsEditing(false);
        inputRef.current?.focus();
      });
      return () => {
        document.removeEventListener("pointerdown", handlePointerDown);
        unregisterEscape();
      };
    }, [isOpen]);

    React.useEffect(() => {
      if (!showDropdown || !listRef.current) return;
      const activeEl = listRef.current.querySelector<HTMLElement>(
        `#${CSS.escape(`${listId}-opt-${safeIndex}`)}`
      );
      activeEl?.scrollIntoView({ block: "nearest" });
    }, [showDropdown, safeIndex, listId]);

    const handleSelect = (option: AutocompleteOption) => {
      if (!isControlled) setInternalVal(option.label);
      onValueChange?.(option.value);
      onSelectOption?.(option);
      setIsOpen(false);
      setIsEditing(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented || disabled) return;

      if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      if (showDropdown) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((i) => (i < filteredOptions.length - 1 ? i + 1 : 0));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((i) => (i > 0 ? i - 1 : filteredOptions.length - 1));
        } else if (e.key === "Home") {
          e.preventDefault();
          setSelectedIndex(0);
        } else if (e.key === "End") {
          e.preventDefault();
          setSelectedIndex(filteredOptions.length - 1);
        } else if (e.key === "Enter" && filteredOptions[safeIndex]) {
          e.preventDefault();
          handleSelect(filteredOptions[safeIndex]);
        } else if (e.key === "Tab") {
          setIsOpen(false);
          setIsEditing(false);
        }
      }
    };

    return (
      <div className={cn("relative w-full font-mono", className)}>
        <div ref={anchorRef} className="relative flex items-center">
          <input
            ref={mergeRefs(forwardedRef, inputRef)}
            type="text"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={showDropdown ? listId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={
              showDropdown && filteredOptions[safeIndex]
                ? `${listId}-opt-${safeIndex}`
                : undefined
            }
            disabled={disabled}
            value={displayVal}
            onChange={(e) => {
              setIsEditing(true);
              if (!isControlled) setInternalVal(e.target.value);
              onValueChange?.(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={(e) => {
              setIsOpen(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              const next = e.relatedTarget as Node | null;
              if (!listRef.current?.contains(next)) {
                setIsEditing(false);
              }
              onBlur?.(e);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            className={cn(
              "w-full rounded-md border-2 border-foreground bg-card px-3 py-2 pe-9 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-colors shadow-xs",
              "focus:border-accent focus:ring-1 focus:ring-accent",
              disabled && "cursor-not-allowed opacity-50"
            )}
            {...props}
          />
          {displayVal && !disabled ? (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                if (!isControlled) setInternalVal("");
                onValueChange?.("");
                inputRef.current?.focus();
              }}
              className="absolute end-1.5 flex size-7 items-center justify-center rounded text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Clear input"
            >
              ✕
            </button>
          ) : null}
        </div>

        {showDropdown && mounted
          ? createPortal(
              <div
                ref={listRef}
                id={listId}
                role="listbox"
                aria-label="Suggestions"
                style={{
                  position: "fixed",
                  top: floating.top,
                  left: floating.left,
                  minWidth: floating.minWidth ?? 220,
                  maxWidth: "calc(100vw - 16px)",
                }}
                className="z-50 max-h-56 overflow-y-auto rounded-lg border-2 border-foreground bg-card p-1 shadow-xl outline-1 outline-dashed outline-offset-[-4px] motion-safe:animate-[scale-in_0.12s_ease-out_both] font-mono text-xs"
              >
                {filteredOptions.map((opt, idx) => (
                  <div
                    key={opt.value}
                    id={`${listId}-opt-${idx}`}
                    role="option"
                    aria-selected={idx === safeIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between rounded-sm px-2.5 py-1.5 transition-colors",
                      idx === safeIndex
                        ? "bg-accent font-bold text-accent-foreground"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    <span>{opt.label}</span>
                    {opt.category ? (
                      <span className="text-[10px] opacity-70 uppercase tracking-wider">
                        [{opt.category}]
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>,
              document.body
            )
          : null}
      </div>
    );
  }
);
Autocomplete.displayName = "Autocomplete";
