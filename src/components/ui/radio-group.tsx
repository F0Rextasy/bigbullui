"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { mergeRefs } from "./lib/react-compat";
import type { Direction } from "./lib/direction";

interface RadioGroupContextValue {
  value: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  onSelect: (val: string) => void;
}

const RadioGroupCtx = React.createContext<RadioGroupContextValue | null>(null);

export type RadioGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
  dir?: Direction;
  className?: string;
  children: React.ReactNode;
};

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    value,
    defaultValue,
    onValueChange,
    name,
    disabled,
    required,
    orientation = "vertical",
    dir,
    className,
    children,
    ...props
  },
  ref
) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const fallbackName = React.useId();
  const groupRef = React.useRef<HTMLDivElement>(null);
  const current = value ?? internal;
  const onValueChangeRef = React.useRef(onValueChange);

  React.useEffect(() => {
    onValueChangeRef.current = onValueChange;
  });

  React.useEffect(() => {
    const form = groupRef.current?.closest("form");
    if (!form) return;
    const handleReset = () => {
      if (value === undefined) setInternal(defaultValue ?? "");
    };
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [value, defaultValue]);

  const onSelect = React.useCallback(
    (next: string) => {
      if (disabled) return;
      if (value === undefined) setInternal(next);
      onValueChangeRef.current?.(next);
    },
    [value, disabled]
  );

  const ctxValue = React.useMemo(
    () => ({
      value: current,
      name: name || fallbackName,
      disabled,
      required,
      onSelect,
    }),
    [current, name, fallbackName, disabled, required, onSelect]
  );

  return (
    <RadioGroupCtx.Provider value={ctxValue}>
      <div
        ref={mergeRefs(ref, groupRef)}
        role="radiogroup"
        dir={dir}
        aria-orientation={orientation}
        aria-disabled={disabled || undefined}
        aria-required={required || undefined}
        className={cn(
          orientation === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-2.5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </RadioGroupCtx.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

export type RadioItemProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSelect"> & {
  value: string;
  checked?: boolean;
  onSelect?: () => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(function RadioItem(
  {
    value,
    checked: checkedProp,
    onSelect: onSelectProp,
    name: nameProp,
    disabled: disabledProp,
    required: requiredProp,
    className,
    children,
    ...props
  },
  ref
) {
  const ctx = React.useContext(RadioGroupCtx);
  const checked = ctx ? ctx.value === value : Boolean(checkedProp);
  const inputName = nameProp ?? ctx?.name;
  const isDisabled = Boolean(ctx?.disabled || disabledProp);
  const isRequired = Boolean(ctx?.required || requiredProp);

  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 text-sm",
        isDisabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <input
        ref={ref}
        type="radio"
        name={inputName}
        value={value}
        checked={checked}
        disabled={isDisabled}
        required={isRequired}
        onChange={() => {
          if (isDisabled) return;
          ctx?.onSelect(value);
          onSelectProp?.();
        }}
        className="peer sr-only"
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-5 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
          checked
            ? "border-solid border-foreground bg-transparent"
            : "border-dashed border-foreground/60 bg-transparent"
        )}
      >
        {checked && <span className="size-2.5 rounded-[2px] bg-accent-strong" />}
      </span>
      <span>{children}</span>
    </label>
  );
});
RadioItem.displayName = "RadioItem";
