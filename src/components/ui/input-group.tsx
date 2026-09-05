"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type InputGroupProps = {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
};

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ children, className, placeholder }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-1.5 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-input transition-colors",
          "motion-reduce:transition-none",
          className
        )}
      >
        <div className="absolute left-0 inset-y-0 pl-2 flex items-center pointer-events-none">
          {/* Prefix slot */}
        </div>

        <div className="flex-1 flex flex-col">
          {children}

          <input
            type="text"
            placeholder={placeholder}
            className={cn(
              "flex-1 rounded-none bg-transparent outline-none placeholder:text-muted-foreground",
              "motion-reduce:transition-none"
            )}
          />
        </div>

        {/* Suffix slot */}
        <div className="absolute right-0 inset-y-0 pr-2 flex items-center pointer-events-none">
          {/* Action button slot */}
        </div>

        {/* Focus ring underline */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none outline-none",
            "after:content-[''] after:absolute after:-inset-0 after:rounded-md after:bg-ring after:scale-x-0 after:origin-left after:transition-transform duration-200",
            "after:motion-reduce:scale-x-0 after:motion-reduce:transition-none",
            "hover:after:scale-x-100",
            "focus-visible:after:scale-x-100 focus-visible:after:outline-none",
            "motion-reduce:transition-none"
          )}
        />
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";

export { InputGroup };

