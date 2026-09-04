"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScrollTopProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  threshold?: number;
  label?: string;
  className?: string;
}

export function ScrollTop({
  threshold = 200,
  label = "TOP",
  className,
  ...props
}: ScrollTopProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const checkScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex items-center gap-1.5 rounded-lg border-2 border-foreground bg-card px-3 py-2 font-mono text-xs font-bold text-foreground shadow-lg transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 animate-[scale-in_0.15s_ease-out_both] cursor-pointer outline-1 outline-dashed outline-offset-[-4px]",
        className
      )}
      {...props}
    >
      <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 animate-bounce">
        ▲
      </span>
      <span className="text-[10px] tracking-widest">{label}</span>
    </button>
  );
}
