"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type FieldErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children?: React.ReactNode;
};

export type FieldGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export type FieldSetProps = React.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend?: React.ReactNode;
  children?: React.ReactNode;
};

export type FieldLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type FieldControlProps = React.HTMLAttributes<HTMLDivElement>;

export type FieldDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children?: React.ReactNode;
};

export type FieldLegendProps = React.HTMLAttributes<HTMLLegendElement> & {
  children?: React.ReactNode;
};

export type FieldProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  fieldClassName?: string;
  label?: React.ReactNode;
  htmlFor?: string;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  children?: React.ReactNode;
};

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ fieldClassName, label, htmlFor, description, error, required = false, children, className, ...props }, ref) => {
    const uid = React.useId();
    const controlId = htmlFor ?? `${uid}-control`;
    const descId = description !== undefined ? `${uid}-desc` : undefined;
    const errorId = error ? `${uid}-err` : undefined;
    const describedBy = [descId, errorId].filter(Boolean).join(" ") || undefined;

    let enhancedChildren = children;
    if (React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;
      const existingDescribedBy =
        typeof childProps["aria-describedby"] === "string" ? childProps["aria-describedby"] : undefined;
      const mergedDescribedBy = [existingDescribedBy, describedBy].filter(Boolean).join(" ") || undefined;
      enhancedChildren = React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        ...(childProps.id === undefined && htmlFor ? { id: controlId } : {}),
        ...(mergedDescribedBy ? { "aria-describedby": mergedDescribedBy } : {}),
        ...(error ? { "aria-invalid": true } : {}),
      });
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      >
        {label !== undefined && (
          <FieldLabel htmlFor={controlId} className="block text-sm font-medium text-foreground">
            {label}
            {required && (
              <span aria-hidden="true" className="ms-1 text-[10px] uppercase tracking-[0.15em] text-destructive">
                *
              </span>
            )}
          </FieldLabel>
        )}

        <div className={cn("rounded-md bg-background p-2.5", fieldClassName)}>
          <FieldControl className="space-y-1.5">
            {enhancedChildren}

            {error ? (
              <FieldError id={errorId} className="text-sm text-destructive">
                {error}
              </FieldError>
            ) : null}
          </FieldControl>
        </div>

        {description !== undefined && (
          <FieldDescription id={descId} className="text-xs text-muted-foreground">
            {description}
          </FieldDescription>
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

export function FieldError({ className, children, role = "alert", ...props }: FieldErrorProps) {
  if (!children) return null;
  return (
    <p role={role} className={cn("text-sm text-destructive", className)} {...props}>
      {children}
    </p>
  );
}

export function FieldGroup({ className, children, ...props }: FieldGroupProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)} {...props}>
      {children}
    </div>
  );
}

export function FieldSet({ legend, className, children, ...props }: FieldSetProps) {
  return (
    <fieldset className={cn("space-y-3 rounded-md border border-input p-3", className)} {...props}>
      {legend !== undefined && (
        <FieldLegend className="px-1 text-sm font-medium text-foreground">
          {legend}
        </FieldLegend>
      )}
      {children}
    </fieldset>
  );
}

export function FieldDescription({ className, children, ...props }: FieldDescriptionProps) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function FieldLegend({ className, children, ...props }: FieldLegendProps) {
  return (
    <legend className={cn("text-sm font-medium text-foreground", className)} {...props}>
      {children}
    </legend>
  );
}

export { Field };
