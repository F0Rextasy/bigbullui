"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RadioTileProps extends React.HTMLAttributes<HTMLLabelElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  value: string;
  checked?: boolean;
  onCheckedChange?: (value: string) => void;
  name?: string;
}

/** Açıklamalı radyo kutucuğu: ikon + başlık + açıklama + radio nokta. */
export function RadioTile({ title, description, icon, value, checked, onCheckedChange, name = "radio-tile", className, ...props }: RadioTileProps) {
  return (
    <label
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 select-none",
        "transition-all duration-200 motion-reduce:transition-none",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
        checked ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30",
        className
      )}
      {...props}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onCheckedChange?.(value)}
        className="peer sr-only"
      />
      {icon && (
        <span className={cn("shrink-0 transition-colors duration-150 motion-reduce:transition-none", checked ? "text-accent" : "text-muted-foreground")}>
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className={cn("block text-sm font-medium transition-colors motion-reduce:transition-none", checked && "text-accent")}>{title}</span>
        {description && <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>}
      </span>
      <span
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150 motion-reduce:transition-none",
          checked ? "border-accent" : "border-border"
        )}
        aria-hidden="true"
      >
        {checked && <span className="size-2 rounded-full bg-accent" />}
      </span>
    </label>
  );
}
