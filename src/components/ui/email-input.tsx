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
  const [error, setError] = React.useState(false);
  const [showSuggestion, setShowSuggestion] = React.useState(false);
  const [suggestionDomain, setSuggestionDomain] = React.useState("");
  const errorId = React.useId();

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
      setError(false);
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
    error && "placeholder-destructive",
    !error && "",
  );

  return (
    <div className={cn("relative space-y-1.5", className)}>
      <input
        type="email"
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn(classes, error && "border-destructive ring-destructive/50")}
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
          onMouseLeave={() => setShowSuggestion(false)}
          className="absolute right-2 top-full mt-1 rounded-md bg-secondary p-1.5 shadow-xs text-[10px] uppercase tracking-[0.15em] text-secondary-foreground motion-safe:animate-[slide-in_0.2s_ease-out_both] z-20"
        >
          <span className="font-mono me-1">@</span>
          <span className="font-medium">{suggestionDomain}</span>
        </div>
      )}
    </div>
  );
}

EmailInput.displayName = "EmailInput";

