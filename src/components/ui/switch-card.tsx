"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SwitchCardProps extends React.HTMLAttributes<HTMLLabelElement> {
  title: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

/** Kart görünümünde açma/kapama: başlık + açıklama + switch. */
export function SwitchCard({ title, description, checked, defaultChecked, onCheckedChange, disabled, className, ...props }: SwitchCardProps) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isOn = checked ?? internal;

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-3.5 select-none",
        "transition-all duration-200 motion-reduce:transition-none",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring",
        isOn ? "border-accent/60 bg-accent/5" : "border-border hover:border-foreground/30",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        {description && <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>}
      </span>
      <input type="checkbox" checked={isOn} onChange={(e) => { setInternal(e.target.checked); onCheckedChange?.(e.target.checked); }} className="peer sr-only" disabled={disabled} />
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 motion-reduce:transition-none peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
          isOn ? "border-accent bg-accent" : "border-border bg-secondary"
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            "absolute top-0.5 size-3.5 rounded-full bg-background shadow-xs transition-all duration-200 motion-reduce:transition-none",
            isOn ? "left-[18px]" : "left-0.5"
          )}
        />
      </span>
    </label>
  );
}
