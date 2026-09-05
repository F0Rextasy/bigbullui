"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type FieldErrorProps = {
  className?: string;
};

export type FieldGroupProps = {
  className?: string;
};

export type FieldSetProps = {
  legend?: React.ReactNode;
  className?: string;
};

export type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
};

export type FieldControlProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export type FieldProps = {
  fieldClassName?: string;
  label?: React.ReactNode;
  htmlFor?: string;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ fieldClassName, label, htmlFor, description, error, required = false, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-3",
          className
        )}
      >
        {label !== undefined && (
          <FieldLabel htmlFor={htmlFor} className={cn("block text-sm font-medium text-foreground", "motion-reduce:transition-none")}>
            {label}
            {required && (
              <span className="ml-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                *
              </span>
            )}
          </FieldLabel>
        )}

        <div className={cn("rounded-md bg-background p-2.5", "motion-reduce:transition-none")}>
          <FieldControl className={cn("space-y-1", "motion-reduce:transition-none")}>
            {children}

            {error && (
              <FieldError className={cn("text-sm text-destructive", "motion-reduce:animate-none")} />
            )}
          </FieldControl>
        </div>

        {description !== undefined && (
          <p className={cn("text-xs text-muted-foreground", "motion-reduce:transition-none")}>{description}</p>
        )}
      </div>
    );
  }
);
Field.displayName = "Field";

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return <label className={cn("block text-sm font-medium text-foreground", className)} {...props} />;
}

export function FieldControl({ className, ...props }: FieldControlProps) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

export function FieldError({ className }: FieldErrorProps) {
  return <p className={cn("text-sm text-destructive", className)} />;
}

export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2 motion-reduce:transition-none", className)} {...props} />
  );
}

export function FieldSet({ legend, className, ...props }: FieldSetProps) {
  return (
    <fieldset className={cn("rounded-md p-3 border border-input", className)} {...props}>
      {legend !== undefined && (
        <legend className={cn("text-sm font-medium text-foreground", "motion-reduce:transition-none")}>
          {legend}
        </legend>
      )}
    </fieldset>
  );
}

export function FieldDescription({ className, ...props }: FieldGroupProps) {
  return <p className={cn("text-xs text-muted-foreground", className)} {...props} />;
}

export function FieldLegend({ className, ...props }: FieldSetProps) {
  return <legend className={cn("text-sm font-medium text-foreground", className)} {...props} />;
}

export { Field };
