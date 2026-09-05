import * as React from "react";
import { cn } from "./lib/utils";

export interface ReceiptPrinterProps {
  lines: string[];
  total?: string;
  autoFeed?: boolean;
  className?: string;
}

export function ReceiptPrinter({ lines, total, autoFeed = true, className }: ReceiptPrinterProps) {
  return (
    <div
      className={cn(
        "relative size-80 overflow-hidden rounded-md border border-border bg-card p-4 motion-reduce:transition-none",
        className
      )}
    >
      <div className="space-y-1.5 max-h-[70%] overflow-y-auto">
        {lines.map((line, i) => (
          <div key={i} className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {line}
          </div>
        ))}
        {total && (
          <div key="total" className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-strong border-t pt-2">
            Total: {total}
          </div>
        )}
      </div>
      {autoFeed && (
        <div className="mt-2 h-2 bg-border/30 rounded w-full animate-[receiptFeed2_0.3s_ease-out_forwards] motion-reduce:animate-none"/>
      )}
      <style>{`
        @keyframes receiptFeed {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}