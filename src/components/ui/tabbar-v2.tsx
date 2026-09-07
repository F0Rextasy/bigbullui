"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TabbarV2Item {
  id: string;
  label: string;
  badge?: number;
}

export interface TabbarV2Props extends React.HTMLAttributes<HTMLElement> {
  items?: TabbarV2Item[];
  value?: string;
  onValueChange?: (id: string) => void;
}

const FALLBACK: TabbarV2Item[] = [
  { id: "shows", label: "Shows" },
  { id: "stubs", label: "Stubs", badge: 3 },
  { id: "gates", label: "Gates" },
  { id: "me", label: "Me" },
];

/** Bottom tab bar v2 with sliding ink indicator and badges. */
export function TabbarV2({ items = FALLBACK, value, onValueChange, className, ...props }: TabbarV2Props) {
  const [inner, setInner] = React.useState(items[0]?.id ?? "");
  const active = value ?? inner;
  return (
    <nav aria-label="Primary" className={cn("flex w-full rounded-xl border-2 border-foreground bg-card p-1 shadow-md", className)} {...props}>
      {items.map((item) => {
        const selected = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={selected ? "page" : undefined}
            onClick={() => { setInner(item.id); onValueChange?.(item.id); }}
            className={cn(
              "relative flex-1 rounded-lg px-2 py-2 font-mono text-[11px] font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            {typeof item.badge === "number" && item.badge > 0 && (
              <span className="absolute -top-1 right-1 rounded-full bg-accent px-1.5 font-mono text-[10px] font-bold text-accent-foreground">{item.badge}</span>
            )}
            {selected && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-accent" aria-hidden="true" />}
          </button>
        );
      })}
    </nav>
  );
}
