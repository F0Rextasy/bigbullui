"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type Variant = "default" | "accent";
type Size = "default" | "lg";

export type CometButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Cursor glare color. Defaults to a soft white glow. */
  glare?: string;
};

const variants: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground",
  accent: "bg-accent-strong text-primary-foreground",
};

const sizes: Record<Size, string> = {
  default: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

const CometButton = React.forwardRef<HTMLButtonElement, CometButtonProps>(
  ({ className, variant = "default", size = "default", glare = "rgba(255, 255, 255, 0.35)", children, onMouseMove, ...props }, ref) => {
    const innerRef = React.useRef<HTMLButtonElement>(null);

    const setRef = (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      const el = innerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }
      onMouseMove?.(event);
    };

    return (
      <button
        ref={setRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md font-medium transition-all duration-150 hover:scale-[1.02] hover:-translate-y-px active:translate-y-0 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
          style={{
            background: `radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), ${glare}, transparent 70%)`,
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-full group-hover:opacity-100 motion-reduce:hidden"
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
CometButton.displayName = "CometButton";

export { CometButton };
