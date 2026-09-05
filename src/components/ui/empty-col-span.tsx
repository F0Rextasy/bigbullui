"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface EmptyColSpanProps extends React.HTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
  message?: string;
  icon?: React.ReactNode;
}

/** Empty column span table cell placeholder for empty states. */
export function EmptyColSpan({ colSpan = 1, message = "Veri yok", icon, className, ...props }: EmptyColSpanProps) {
  return (
    <td colSpan={colSpan} className={cn("px-4 py-10 text-center", className)} {...props}>
      <style>{`@keyframes ecFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }`}</style>
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        {icon ?? (
          <span className="flex size-10 items-center justify-center rounded-full border border-dashed border-border" style={{ animation: "ecFloat 2.5s ease-in-out infinite" }} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
          </span>
        )}
        <span className="font-mono text-[10px] uppercase tracking-[0.15em]">{message}</span>
      </div>
    </td>
  );
}
