"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { mergeRefs } from "./lib/react-compat";

export type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  required?: boolean;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      name,
      value = "on",
      required,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultChecked);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const isOn = checked ?? internal;

    React.useEffect(() => {
      const form = buttonRef.current?.closest("form");
      if (!form) return;
      const handleReset = () => {
        if (checked === undefined) setInternal(defaultChecked);
      };
      form.addEventListener("reset", handleReset);
      return () => form.removeEventListener("reset", handleReset);
    }, [checked, defaultChecked]);

    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (checked === undefined) setInternal(!isOn);
      onCheckedChange?.(!isOn);
      onClick?.(e);
    };

    return (
      <>
        <button
          ref={mergeRefs(ref, buttonRef)}
          type="button"
          role="switch"
          aria-checked={isOn}
          aria-required={required || undefined}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            "inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-sm border-2 px-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            isOn
              ? "border-solid border-foreground bg-primary"
              : "border-dashed border-foreground/60 bg-transparent",
            className
          )}
          {...props}
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-4 rounded-[2px] transition-transform duration-150 motion-reduce:transition-none",
              isOn
                ? "translate-x-5 rtl:-translate-x-5 bg-primary-foreground"
                : "translate-x-0 bg-muted-foreground"
            )}
          />
        </button>
        {name ? (
          <input
            type="checkbox"
            name={name}
            value={value}
            checked={isOn}
            required={required}
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
Switch.displayName = "Switch";

export { Switch };
