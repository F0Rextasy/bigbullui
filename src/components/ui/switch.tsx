"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled, className, ...props }, ref) => {
    const [internal, setInternal] = React.useState(defaultChecked);
    const isOn = checked ?? internal;

    const toggle = () => {
      if (checked === undefined) setInternal(!isOn);
      onCheckedChange?.(!isOn);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-sm border-2 px-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          isOn ? "border-solid border-foreground bg-primary" : "border-dashed border-foreground/60 bg-transparent",
          className
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "size-4 rounded-[2px] transition-transform duration-150 motion-reduce:transition-none",
            isOn ? "translate-x-5 bg-primary-foreground" : "translate-x-0 bg-muted-foreground"
          )}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
