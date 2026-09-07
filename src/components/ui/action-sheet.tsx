"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ActionSheetOption {
  id: string;
  label: string;
  danger?: boolean;
}

export interface ActionSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options?: ActionSheetOption[];
  title?: string;
  onSelect?: (id: string) => void;
}

const FALLBACK: ActionSheetOption[] = [
  { id: "print", label: "Print stub" },
  { id: "transfer", label: "Transfer seat" },
  { id: "void", label: "Void order", danger: true },
];

/** Action sheet list with danger stamp option. */
export function ActionSheet({ options = FALLBACK, title = "Stub actions", onSelect, className, ...props }: ActionSheetProps) {
  const [picked, setPicked] = React.useState<string | null>(null);
  return (
    <div className={cn("w-full overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-md", className)} {...props}>
      <p className="border-b border-dashed border-border px-4 py-2 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
      <ul>
        {options.map((o) => (
          <li key={o.id} className="border-b border-dashed border-border last:border-0">
            <button
              type="button"
              onClick={() => { setPicked(o.id); onSelect?.(o.id); }}
              className={cn(
                "w-full px-4 py-2.5 font-mono text-sm font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                o.danger ? "text-destructive hover:bg-destructive/10" : picked === o.id ? "bg-accent/15 text-accent" : "text-foreground hover:bg-secondary"
              )}
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
