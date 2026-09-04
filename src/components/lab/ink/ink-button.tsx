"use client";

import * as React from "react";
import { cn } from "@/components/ui/lib/utils";

type Variant = "default" | "accent";
type Size = "default" | "lg";

export type InkButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  /** Bloom color. Defaults to an accent wash (white on the accent variant). */
  ink?: string;
};

const variants: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground",
  accent: "bg-accent-strong text-primary-foreground",
};

const sizes: Record<Size, string> = {
  default: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

const InkButton = React.forwardRef<HTMLButtonElement, InkButtonProps>(
  ({ className, variant = "default", size = "default", ink, children, onMouseMove, ...props }, ref) => {
    const innerRef = React.useRef<HTMLButtonElement>(null);
    const filterId = `ink-${React.useId().replace(/:/g, "")}`;
    const bloom =
      ink ?? (variant === "accent" ? "rgba(255, 255, 255, 0.45)" : "color-mix(in srgb, var(--color-accent-strong) 50%, transparent)");

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
          "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md font-medium transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        <svg aria-hidden focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" />
          </filter>
        </svg>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
          style={{
            background: `radial-gradient(150px circle at var(--mx, 50%) var(--my, 50%), ${bloom}, transparent 70%)`,
            filter: `url(#${filterId})`,
          }}
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
InkButton.displayName = "InkButton";

export { InkButton };
