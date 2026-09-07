"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InlineMultiselectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: string[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
}

export function InlineMultiselect({
  options,
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  placeholder = "Add...",
  label,
  className,
  ...props
}: InlineMultiselectProps) {
  const [inner, setInner] = React.useState<string[]>(defaultValue);
  const value = controlledValue ?? inner;
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);

  const commit = (next: string[]) => {
    setInner(next);
    onValueChange?.(next);
  };

  const toggle = (option: string) => {
    commit(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
  };

  const q = query.trim().toLowerCase();
  const matches = options.filter(
    (o) => !value.includes(o) && (q.length === 0 || o.toLowerCase().includes(q)),
  );

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open ]);

  return (
    <div ref={boxRef} className={cn("relative w-full", className)} {...props}>
      {label ? (
        <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div
        onClick={() => setOpen(true)}
        className="flex min-h-10 cursor-text flex-wrap items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5 transition-colors focus-within:border-foreground/60"
      >
        {value.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1 rounded border border-dashed border-foreground/40 bg-secondary px-2 py-0.5 font-mono text-xs"
          >
            {v}
            <button
              type="button"
              aria-label={`Remove ${v}`}
              onClick={(e) => {
                e.stopPropagation();
                commit(value.filter((x) => x !== v));
              }}
              className="cursor-pointer text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && query === "" && value.length > 0) {
              commit(value.slice(0, -1));
            } else if (e.key === "Enter" && matches[0]) {
              e.preventDefault();
              toggle(matches[0]);
              setQuery("");
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder={value.length === 0 ? placeholder : ""}
          aria-label={label ?? "Choose options"}
          className="min-w-24 flex-1 bg-transparent font-mono text-sm focus:outline-none"
        />
      </div>
      {open && matches.length > 0 ? (
        <div role="listbox" className="absolute inset-x-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-md border border-border bg-card p-1 shadow-lg">
          {matches.map((o) => (
            <div
              key={o}
              role="option"
              aria-selected={false}
              onMouseDown={(e) => {
                e.preventDefault();
                toggle(o);
                setQuery("");
              }}
              className="cursor-pointer rounded px-3 py-2 font-mono text-sm transition-colors hover:bg-secondary"
            >
              {o}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
