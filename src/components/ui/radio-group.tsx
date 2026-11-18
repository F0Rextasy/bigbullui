"use client";

import * as React from "react";
import { cn } from "./lib/utils";

interface RadioGroupContextValue {
  value: string;
  name: string;
  onSelect: (val: string) => void;
}

const RadioGroupCtx = React.createContext<RadioGroupContextValue | null>(null);

export type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  className?: string;
  children: React.ReactNode;
};

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { value, defaultValue, onValueChange, name, className, children },
  ref
) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const fallbackName = React.useId();
  const current = value ?? internal;
  const onValueChangeRef = React.useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const onSelect = React.useCallback(
    (next: string) => {
      if (value === undefined) setInternal(next);
      onValueChangeRef.current?.(next);
    },
    [value]
  );

  const ctxValue = React.useMemo(
    () => ({ value: current, name: name || fallbackName, onSelect }),
    [current, name, fallbackName, onSelect]
  );

  return (
    <RadioGroupCtx.Provider value={ctxValue}>
      <div ref={ref} role="radiogroup" className={cn("flex flex-col gap-2.5", className)}>
        {children}
      </div>
    </RadioGroupCtx.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

export type RadioItemProps = {
  value: string;
  checked?: boolean;
  onSelect?: () => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(function RadioItem(
  { value, checked: checkedProp, onSelect: onSelectProp, name: nameProp, disabled, className, children },
  ref
) {
  const ctx = React.useContext(RadioGroupCtx);
  const checked = ctx ? ctx.value === value : Boolean(checkedProp);
  const inputName = nameProp ?? ctx?.name;

  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 text-sm",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <input
        ref={ref}
        type="radio"
        name={inputName}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => {
          ctx?.onSelect(value);
          onSelectProp?.();
        }}
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
});
RadioItem.displayName = "RadioItem";
