"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type FormFieldProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  label?: React.ReactNode;
  htmlFor?: string;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { label, htmlFor, description, error, required = false, className, children, ...props },
  ref,
) {
  const uid = React.useId();
  const controlId = htmlFor ?? `${uid}-input`;
  const descId = description !== undefined ? `${uid}-desc` : undefined;
  const errorId = error ? `${uid}-err` : undefined;
  const describedBy = [descId, errorId].filter(Boolean).join(" ") || undefined;

  let renderedControl: React.ReactNode = children;
  if (React.isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>;
    const existingDescribedBy =
      typeof childProps["aria-describedby"] === "string" ? childProps["aria-describedby"] : undefined;
    const mergedDescribedBy = [existingDescribedBy, describedBy].filter(Boolean).join(" ") || undefined;
    renderedControl = React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ...(childProps.id === undefined && htmlFor ? { id: controlId } : {}),
      ...(mergedDescribedBy ? { "aria-describedby": mergedDescribedBy } : {}),
      ...(error ? { "aria-invalid": true } : {}),
      className: cn(
        "block w-full rounded-md bg-transparent p-1.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        typeof childProps.className === "string" ? childProps.className : undefined,
      ),
    });
  } else if (children === undefined) {
    renderedControl = (
      <input
        id={controlId}
        type="text"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="block w-full rounded-md bg-transparent p-1.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    );
  }

  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      {label !== undefined && (
        <label htmlFor={controlId} className="block text-sm font-medium text-foreground">
          {label}
          {required && (
            <span aria-hidden="true" className="ms-1 text-[10px] uppercase tracking-[0.15em] text-destructive">
              *
            </span>
          )}
        </label>
      )}

      <div
        className={cn(
          "rounded-md border border-input bg-background px-3 py-1.5 transition-colors duration-200 motion-reduce:transition-none",
          Boolean(error) && "border-destructive ring-2 ring-destructive/20",
        )}
      >
        {renderedControl}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-destructive animate-[formFieldShake_0.4s_ease-out_both] motion-reduce:animate-none"
        >
          {error}
        </p>
      ) : null}

      {description !== undefined && (
        <p id={descId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
});
FormField.displayName = "FormField";
