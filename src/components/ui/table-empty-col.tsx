"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TableEmptyColProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
  message?: string;
  hint?: string;
}

export function TableEmptyCol({ colSpan = 1, message = "No data", hint, className, ...props }: TableEmptyColProps) {
  return (
    <td colSpan={colSpan} className={cn("px-4 py-10 text-center", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span aria-hidden className="flex size-10 items-center justify-center rounded-full border border-dashed border-border">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em]">{message}</span>
        {hint ? (
          <span className="font-mono text-[11px] text-muted-foreground/70">{hint}</span>
        ) : null}
      </div>
    </td>
  );
}
