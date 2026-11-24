"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { mergeRefs } from "./lib/react-compat";

export type CheckboxProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  required?: boolean;
};

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked = false,
      indeterminate = false,
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
    const hiddenInputRef = React.useRef<HTMLInputElement>(null);
    const isOn = checked ?? internal;

    React.useEffect(() => {
      if (hiddenInputRef.current) {
        hiddenInputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);

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
      const next = indeterminate ? true : !isOn;
      if (checked === undefined) setInternal(next);
      onCheckedChange?.(next);
      onClick?.(e);
    };

    const visualActive = indeterminate || isOn;

    return (
      <>
        <button
          ref={mergeRefs(ref, buttonRef)}
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : isOn}
          aria-required={required || undefined}
          disabled={disabled}
          onClick={toggle}
          className={cn(
            "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            visualActive
              ? "border-solid border-foreground bg-primary text-primary-foreground"
              : "border-dashed border-foreground/60 bg-transparent",
            className
          )}
          {...props}
        >
          {indeterminate ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
            </svg>
          ) : isOn ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : null}
        </button>
        {name ? (
          <input
            ref={hiddenInputRef}
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
Checkbox.displayName = "Checkbox";

export { Checkbox };
