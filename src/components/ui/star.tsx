import * as React from "react";
import { cn } from "./lib/utils";

export type StarProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export function Star({ size = 16, className, ...props }: StarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d="M10 2l2.9 6.26L19.5 9.3l-4.75 4.87L15.8 21 10 17.77 4.2 21l1.05-6.83L.5 9.3l6.6-1.04L10 2z" />
    </svg>
  );
}
