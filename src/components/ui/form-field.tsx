"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type FormFieldProps = {
  label?: React.ReactNode;
  htmlFor?: string;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const formFieldShake = `
  @keyframes formFieldShake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }
`;

export function FormField({ label, htmlFor, description, error, required = false, className, children }: FormFieldProps) {
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <div className={cn("space-y-2", className)}>
      <style>{formFieldShake}</style>
      {label !== undefined && (
        <label htmlFor={htmlFor} className={cn("block text-sm font-medium text-foreground", "motion-reduce:transition-none")}>
          {label}
          {required && <span className="ml-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">*</span>}
        </label>
      )}

      <div className={cn(
        "rounded-md border border-input bg-background px-3 py-1.5 transition-all duration-300 motion-reduce:transition-none",
        error && "ring-2 ring-ring/20"
      )}>

        {error && (
          <p className="text-sm text-destructive mt-1 animate-[formFieldShake_0.4s_ease-out_both] motion-reduce:animate-none">{error}</p>
        )}

        {children}
        <input
          id={htmlFor}
          type="text"
          className={cn(
            "block w-full rounded-md bg-transparent p-1.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-input disabled:cursor-not-allowed disabled:opacity-50",
            "motion-reduce:transition-none"
          )}
          aria-label={typeof label === "string" ? label : undefined}
        />
      </div>

      {description !== undefined && (
        <p className={cn("text-xs text-muted-foreground", "motion-reduce:transition-none")}>{description}</p>
      )}

    </div>
  );
}

