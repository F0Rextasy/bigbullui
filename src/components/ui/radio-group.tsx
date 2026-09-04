"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name: string;
  className?: string;
  children: React.ReactNode;
};

export function RadioGroup({ value, defaultValue, onValueChange, name, className, children }: RadioGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value ?? internal;

  return (
    <div role="radiogroup" className={cn("flex flex-col gap-2.5", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ checked?: boolean; onSelect?: () => void; name?: string }>, {
              checked: (child.props as { value?: string }).value === current,
              name,
              onSelect: () => {
                const next = (child.props as { value?: string }).value ?? "";
                if (value === undefined) setInternal(next);
                onValueChange?.(next);
              },
            })
          : child
      )}
    </div>
  );
}

export type RadioItemProps = {
  value: string;
  checked?: boolean;
  onSelect?: () => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function RadioItem({ value, checked, onSelect, name, disabled, className, children }: RadioItemProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 text-sm",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "inline-flex size-5 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
          checked ? "border-solid border-foreground bg-transparent" : "border-dashed border-foreground/60 bg-transparent"
        )}
      >
        {checked && <span className="size-2.5 rounded-[2px] bg-accent-strong" />}
      </span>
      <span>{children}</span>
    </label>
  );
}
