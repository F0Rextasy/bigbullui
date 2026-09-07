"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ThemeStampingMachineProps extends React.HTMLAttributes<HTMLDivElement> {
  themes?: { id: string; label: string; swatch: string }[];
  onStamp?: (id: string) => void;
}

const FALLBACK = [
  { id: "paper", label: "Paper stub", swatch: "#F6F0E0" },
  { id: "night", label: "Night stub", swatch: "#16120B" },
  { id: "stamp", label: "Stamp red", swatch: "#BC3A28" },
];

/** Theme stamper pressing a swatch onto a preview card. */
export function ThemeStampingMachine({ themes = FALLBACK, onStamp, className, ...props }: ThemeStampingMachineProps) {
  const [active, setActive] = React.useState(themes[0]?.id ?? "");
  const [presses, setPresses] = React.useState(0);
  const current = themes.find((t) => t.id === active);
  const stamp = (id: string) => { setActive(id); setPresses((p) => p + 1); onStamp?.(id); };
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Theme stamping machine</p>
        <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">{presses} presses</span>
      </div>
      <div key={presses} className="mt-3 rounded-md border-2 border-dashed border-border p-4 text-center motion-safe:animate-[stamp-press_0.3s_ease-out] motion-reduce:animate-none" style={{ backgroundColor: current?.swatch }}>
        <p className="font-mono text-sm font-black uppercase" style={{ color: active === "night" ? "#F3EAD3" : "#17130C" }}>{current?.label} pressed</p>
      </div>
      <div className="mt-3 flex gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => stamp(t.id)}
            aria-pressed={t.id === active}
            className={cn("flex flex-1 items-center gap-2 rounded-md border-2 px-2 py-1.5 font-mono text-[11px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", t.id === active ? "border-solid border-foreground bg-secondary" : "border-dashed border-border text-muted-foreground hover:text-foreground")}
          >
            <span className="size-5 rounded-full border border-foreground" style={{ backgroundColor: t.swatch }} aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
