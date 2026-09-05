"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CheckboxCardProps extends React.HTMLAttributes<HTMLLabelElement> {
  title: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

/** Card-style checkbox: selectable frame + description + checkmark. */
export function CheckboxCard({ title, description, checked, defaultChecked, onCheckedChange, disabled, className, ...props }: CheckboxCardProps) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isOn = checked ?? internal;

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <label
      role="checkbox"
      aria-checked={isOn}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
      tabIndex={disabled ? undefined : 0}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 select-none",
        "transition-all duration-200 motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isOn ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <style>{`@keyframes ccPop { 0% { transform: scale(0.6); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }`}</style>
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-all duration-150 motion-reduce:transition-none",
          isOn ? "border-accent bg-accent text-accent-foreground animate-[ccPop_0.2s_ease-out] motion-reduce:animate-none" : "border-border bg-background"
        )}
        aria-hidden="true"
      >
        {isOn && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
      </span>
      <span>
        <span className={cn("block text-sm font-medium transition-colors motion-reduce:transition-none", isOn && "text-accent")}>{title}</span>
        {description && <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>}
      </span>
    </label>
  );
}
