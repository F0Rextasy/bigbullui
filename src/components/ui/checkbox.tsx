"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type CheckboxProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
};

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled, name, value = "on", onClick, className, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultChecked);
    const isOn = checked ?? internal;

    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (checked === undefined) setInternal(!isOn);
      onCheckedChange?.(!isOn);
      onClick?.(e);
    };

    return (
      <>
        <button
          ref={ref}
          type="button"
          role="checkbox"
          aria-checked={isOn}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            isOn ? "border-solid border-foreground bg-primary text-primary-foreground" : "border-dashed border-foreground/60 bg-transparent",
            className
          )}
          {...props}
        >
          {isOn && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </button>
        {name ? (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={isOn}
            disabled={disabled}
            readOnly
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only pointer-events-none"
          />
        ) : null}
      </>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
