"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StickyFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

/** Yapışkan alt bar: scroll sırasında sabit kalır, içerikli. */
export function StickyFooter({ left, right, className, children, ...props }: StickyFooterProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 z-30 flex items-center justify-between gap-4 border-t-2 border-dashed border-border bg-background/95 px-4 py-3 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <style>{`@keyframes sfUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
      <style>{`@keyframes sfUp2 { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      <div className="animate-[sfUp2_0.3s_ease-out_both] motion-reduce:animate-none">{left ?? children}</div>
      <div className="shrink-0 animate-[sfUp2_0.3s_ease-out_0.1s_both] motion-reduce:animate-none">{right}</div>
    </div>
  );
}
