"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type LoadingOverlayProps = {
  active: boolean;
  label?: string;
};

export function LoadingOverlay({ active, label }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300",
        "motion-reduce:animate-none",
        active ? "opacity-100" : "opacity-0",
        "motion-reduce:transition-none",
      )}
    >
      <div
        className={cn(
          "bg-card rounded-md border border-border p-6 shadow-lg transform transition-transform duration-300",
          "motion-reduce:animate-none",
          active ? "scale-100" : "scale-95",
        )}
      >
        <div className="flex items-center justify-center gap-3">
          {label && (
            <span className={cn("text-sm text-muted-foreground", "motion-reduce:animate-none")}>
              {label}
            </span>
          )}
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center animate-spin",
              "motion-reduce:animate-none",
            )}
          >
            <span className={cn("w-2 h-2 bg-current rounded-full", "motion-reduce:animate-none")}> </span>
          </div>
        </div>
      </div>
    </div>
  );
}