"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
  required?: boolean;
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, htmlFor, children, required = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          "block cursor-default select-none overflow-hidden rounded-md px-2 py-1 m-1 text-sm font-medium text-muted-foreground",
          required && "after:content-['*'] after:absolute after:right-0 after:text-red-500 after:text-[10px] after:font-medium motion-reduce:animate-none",
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);
Label.displayName = "Label";

export { Label };