"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ModelOption {
  id: string;
  name: string;
  meta: string;
}

export interface ModelPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  models?: ModelOption[];
  value?: string;
  onChange?: (id: string) => void;
}

/** Compact model selector with popover list and mono meta readout. */
export function ModelPicker({
  models = [
    { id: "stub-1", name: "Stub One", meta: "FAST · 4K" },
    { id: "stub-pro", name: "Stub Pro", meta: "SMART · 32K" },
    { id: "stub-ultra", name: "Stub Ultra", meta: "MAX · 128K" },
  ],
  value,
  onChange,
  className,
  ...props
}: ModelPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [inner, setInner] = React.useState(models[0]?.id ?? "");
  const selected = models.find((m) => m.id === (value ?? inner));
  const pick = (id: string) => {
    setInner(id);
    onChange?.(id);
    setOpen(false);
  };
  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-2 rounded border-2 border-foreground bg-card px-3 py-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="inline-flex size-6 items-center justify-center rounded border border-accent/50 bg-accent/10 font-mono text-[10px] font-bold text-accent" aria-hidden="true">
          AI
        </span>
        <span>
          <span className="block text-xs font-bold text-foreground">{selected?.name ?? "Select model"}</span>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {selected?.meta ?? "—"}
          </span>
        </span>
        <span aria-hidden="true" className={cn("ml-1 font-mono text-xs text-muted-foreground transition-transform motion-reduce:transition-none", open && "rotate-180")}>
          ▾
        </span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Models"
          className="absolute z-20 mt-1.5 w-56 rounded-lg border-2 border-foreground bg-card p-1.5 shadow-lg"
        >
          {models.map((m) => {
            const active = m.id === selected?.id;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => pick(m.id)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded px-2.5 py-2 text-left hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active && "bg-secondary",
                  )}
                >
                  <span className="text-xs font-bold text-foreground">{m.name}</span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">{m.meta}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
