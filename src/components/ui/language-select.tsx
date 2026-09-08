"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LanguageOption {
  code: string;
  label: string;
  native: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", native: "English" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "fr", label: "French", native: "Français" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "pt", label: "Portuguese", native: "Português" },
];

export interface LanguageSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options?: LanguageOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (code: string) => void;
  label?: string;
}

export function LanguageSelect({
  options = LANGUAGES,
  value: controlledValue,
  defaultValue = "en",
  onValueChange,
  label,
  className,
  ...props
}: LanguageSelectProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef<HTMLDivElement>(null);

  const pick = (code: string) => {
    setInner(code);
    onValueChange?.(code);
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

  const selected = options.find((o) => o.code === value);

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
        <span className="truncate">
          {selected ? `${selected.native} · ${selected.code.toUpperCase()}` : "Select language"}
        </span>
        <span aria-hidden className="ms-2 text-xs text-muted-foreground">▾</span>
      </button>
      {open ? (
        <div role="listbox" className="absolute inset-x-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-md border border-border bg-card p-1 shadow-lg">
          {options.map((o) => (
            <div
              key={o.code}
              role="option"
              aria-selected={o.code === value}
              onClick={() => pick(o.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pick(o.code);
                }
              }}
              tabIndex={0}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded px-3 py-2 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                o.code === value ? "bg-accent font-bold text-accent-foreground" : "hover:bg-secondary",
              )}
            >
              <span>{o.native}</span>
              <span className="text-[10px] uppercase text-muted-foreground">{o.code}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
