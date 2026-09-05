"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ConsentCheckboxProps extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  text: string;
  linkLabel?: string;
  linkHref?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
}

/** Consent checkbox: legal agreement link + stamp effect. */
export function ConsentCheckbox({ text, linkLabel = "devam et", linkHref = "#", checked, onCheckedChange, required, className, ...props }: ConsentCheckboxProps) {
  const [internal, setInternal] = React.useState(false);
  const isOn = checked ?? internal;

  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-2.5 select-none",
        "transition-all duration-150 motion-reduce:transition-none focus-within:outline-none focus-within:ring-2 focus-within:ring-ring rounded-sm p-1 -m-1",
        className
      )}
      {...props}
    >
      <style>{`@keyframes consPop { 0% { transform: scale(0.5) rotate(-8deg); } 70% { transform: scale(1.15) rotate(2deg); } 100% { transform: scale(1) rotate(0); } }`}</style>
      <input
        type="checkbox"
        checked={isOn}
        onChange={(e) => { setInternal(e.target.checked); onCheckedChange?.(e.target.checked); }}
        className="peer sr-only"
      />
      <span
        className={cn(
          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border transition-all duration-150 motion-reduce:transition-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
          isOn ? "border-accent bg-accent text-accent-foreground animate-[consPop_0.25s_cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:animate-none" : "border-border bg-background"
        )}
        aria-hidden="true"
      >
        {isOn && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
      </span>
      <span className="text-xs leading-relaxed text-muted-foreground">
        <a href={linkHref} onClick={(e) => e.stopPropagation()} className="text-accent hover:underline">{linkLabel}</a>{" "}
        for {text}
        {required && <span className="ml-1 text-destructive" aria-hidden="true">*</span>}
      </span>
    </label>
  );
}
