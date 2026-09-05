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
  const [touched, setTouched] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showSuggestion, setShowSuggestion] = React.useState(false);
  const [suggestionDomain, setSuggestionDomain] = React.useState("");

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
      setError(false);
      setTouched(false);
      setShowSuggestion(false);
    }
  }, [isControlled, controlledValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    setError(false);
    setShowSuggestion(false);
    onValueChange?.(val);
  };

  const handleBlur = () => {
    setTouched(true);
    if (validate && !validateEmail(currentValue)) {
      setError(true);
    }
  };

  const detectDomain = () => {
    const match = currentValue.match(/@([a-zA-Z0-9.-]+)$/);
    if (match) {
      const domain = match[1];
      const suggestion = SUGGESTION_DOMAINS.find((s) => s.domain === domain);
      if (suggestion) {
        setSuggestionDomain(suggestion.domain);
        setShowSuggestion(true);
      } else {
        setShowSuggestion(false);
      }
    } else {
      setShowSuggestion(false);
    }
  };

  React.useEffect(detectDomain, [currentValue]);

  const classes = cn(
    "relative rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm transition-colors",
    "ring-2 ring-ring focus-visible:outline-none focus-visible:ring-2",
    className,
  );

  const errorClasses = cn(
    "ring-1 ring-destructive/50",
    error && "placeholder-red-500",
    !error && "",
  );

  return (
    <div className={cn("space-y-1.5", className)}>
      <input
        type="email"
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classes}
        disabled={validate && error}
        aria-invalid={error || undefined}
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        <p id="email-error" className="text-[10px] uppercase tracking-[0.15em] text-destructive">
          Please enter a valid email address
        </p>
      )}
      {showSuggestion && !error && (
        <div
          onMouseLeave={() => setShowSuggestion(false)}
          className="absolute right-2 top-full mt-1 rounded-md bg-secondary p-1.5 shadow-xs text-[10px] uppercase tracking-[0.15em] text-secondary-foreground animate-[slide-in_0.2s_ease-out_both] z-20"
        >
          <span className="font-mono mr-1">@</span>
          <span className="font-medium">{suggestionDomain}</span>
        </div>
      )}
    </div>
  );
}

EmailInput.displayName = "EmailInput";

