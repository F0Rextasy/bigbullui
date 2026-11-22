"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface EmailInputProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  validate?: boolean;
  className?: string;
}

const SUGGESTION_DOMAINS = [
  { domain: "gmail.com", suggestion: "DID YOU MEAN" },
  { domain: "yahoo.com", suggestion: "DID YOU MEAN" },
  { domain: "outlook.com", suggestion: "DID YOU MEAN" },
];

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export function EmailInput({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  validate = true,
  className,
}: EmailInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [blurredInvalid, setBlurredInvalid] = React.useState(false);
  const [dismissedValue, setDismissedValue] = React.useState<string | null>(null);
  const errorId = React.useId();

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const error = validate && blurredInvalid && !validateEmail(currentValue);

  const matchedDomain = React.useMemo(() => {
    const match = currentValue.match(/@([a-zA-Z0-9.-]+)$/);
    if (!match) return "";
    return SUGGESTION_DOMAINS.find((s) => s.domain === match[1])?.domain ?? "";
  }, [currentValue]);

  const showSuggestion = Boolean(matchedDomain) && dismissedValue !== currentValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    setBlurredInvalid(false);
    setDismissedValue(null);
    onValueChange?.(val);
  };

  const handleBlur = () => {
    if (validate && !validateEmail(currentValue)) {
      setBlurredInvalid(true);
    }
  };

  const classes = cn(
    "relative w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  );

  const errorClasses = "border-destructive ring-1 ring-destructive/50 placeholder:text-destructive";

  return (
    <div className={cn("relative space-y-1.5", className)}>
      <input
        type="email"
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn(classes, error && errorClasses)}
        aria-invalid={error || undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="text-[10px] uppercase tracking-[0.15em] text-destructive">
          Please enter a valid email address
        </p>
      )}
      {showSuggestion && !error && (
        <div
          onMouseLeave={() => setDismissedValue(currentValue)}
          className="absolute right-2 top-full mt-1 rounded-md bg-secondary p-1.5 shadow-xs text-[10px] uppercase tracking-[0.15em] text-secondary-foreground motion-safe:animate-[slide-in_0.2s_ease-out_both] z-20"
        >
          <span className="font-mono me-1">@</span>
          <span className="font-medium">{matchedDomain}</span>
        </div>
      )}
    </div>
  );
}

EmailInput.displayName = "EmailInput";

