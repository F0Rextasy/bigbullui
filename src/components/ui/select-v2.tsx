"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SelectV2Group {
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

export interface SelectV2Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  groups: SelectV2Group[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function SelectV2({
  groups,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "Select...",
  label,
  className,
  ...props
}: SelectV2Props) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);

  const pick = (v: string) => {
    setInner(v);
    onValueChange?.(v);
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const selected = groups.flatMap((g) => g.options).find((o) => o.value === value);

  return (
    <div ref={boxRef} className={cn("relative w-full", className)} {...props}>
      {label ? (
        <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full cursor-pointer items-center justify-between rounded-md border border-border bg-card px-3 py-2 font-mono text-sm transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className={cn("truncate", !selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        <span aria-hidden className="ms-2 text-xs text-muted-foreground">▾</span>
      </button>
      {open ? (
        <div role="listbox" className="absolute inset-x-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-md border border-border bg-card p-1 shadow-lg">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="sticky top-0 bg-card px-3 pb-1 pt-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {g.label}
              </div>
              {g.options.map((o) => (
                <div
                  key={o.value}
                  role="option"
                  aria-selected={o.value === value}
                  aria-disabled={o.disabled}
                  onClick={() => {
                    if (!o.disabled) pick(o.value);
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && !o.disabled) {
                      e.preventDefault();
                      pick(o.value);
                    }
                  }}
                  tabIndex={o.disabled ? -1 : 0}
                  className={cn(
                    "rounded px-3 py-2 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    o.disabled
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer hover:bg-secondary",
                    o.value === value && "bg-accent font-bold text-accent-foreground",
                  )}
                >
                  {o.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
