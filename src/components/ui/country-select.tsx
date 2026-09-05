"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "US", name: "ABD", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Almanya", flag: "🇩🇪" },
  { code: "FR", name: "Fransa", flag: "🇫🇷" },
  { code: "JP", name: "Japonya", flag: "🇯🇵" },
  { code: "BR", name: "Brezilya", flag: "🇧🇷" },
  { code: "IN", name: "Hindistan", flag: "🇮🇳" },
];

export interface CountrySelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (code: string) => void;
}

/** Country selector dropdown with national flag icons. */
export function CountrySelect({ value, defaultValue, onValueChange, className, ...props }: CountrySelectProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "TR");
  const [open, setOpen] = React.useState(false);
  const active = COUNTRIES.find((c) => c.code === (value ?? internal)) ?? COUNTRIES[0];

  return (
    <div className={cn("relative", className)} {...props}>
      <style>{`@keyframes csIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          "flex w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm",
          "transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-foreground/40"
        )}
      >
        <span className="text-base" aria-hidden="true">{active.flag}</span>
        <span className="flex-1 text-left">{active.name}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{active.code}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} aria-hidden="true" />
          <ul role="listbox" className="absolute z-30 mt-1 max-h-52 w-full overflow-y-auto rounded-md border border-border bg-card p-1 shadow-lg animate-[csIn_0.2s_ease-out_both] motion-reduce:animate-none">
            {COUNTRIES.map((c) => (
              <li key={c.code}>
                <button
                  role="option"
                  aria-selected={c.code === active.code}
                  onClick={() => { setInternal(c.code); onValueChange?.(c.code); setOpen(false); }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    c.code === active.code ? "bg-accent/10 text-accent" : "hover:bg-secondary"
                  )}
                >
                  <span aria-hidden="true">{c.flag}</span>
                  <span className="flex-1 text-left">{c.name}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{c.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
