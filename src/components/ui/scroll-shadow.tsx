"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ScrollShadowProps = {
  className?: string;
  children?: React.ReactNode;
};

export function ScrollShadow({ className, children }: ScrollShadowProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      const hasScrollTop = scrollTop > 0;
      const hasScrollBottom = scrollTop + clientHeight < scrollHeight;

      if (ref.current === element) {
        const shadowTop = element.parentElement?.querySelector<HTMLElement>("[data-shadow-top]");
        const shadowBottom = element.parentElement?.querySelector<HTMLElement>("[data-shadow-bottom]");

        if (shadowTop) {
          shadowTop.style.opacity = hasScrollTop ? "1" : "0";
        }
        if (shadowBottom) {
          shadowBottom.style.opacity = hasScrollBottom ? "1" : "0";
        }
      }
    };

    element.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      
      className={cn(
        "relative h-64 overflow-hidden",
        "motion-reduce:animate-none",
        className,
      )}
    >
      <div ref={ref} className="h-full overflow-auto">
        <div className="relative bg-card p-4">{children}</div>
      </div>
      <div
        className={cn(
          "pointer-events-none absolute top-0 left-0 h-8 w-full bg-gradient-to-b from-border/30 via-transparent to-transparent transition-opacity",
          "motion-reduce:transition-none",
        )}
        data-shadow-top=""
      />

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-8 w-full bg-gradient-to-t from-border/30 via-transparent to-transparent transition-opacity",
          "motion-reduce:transition-none",
        )}
        data-shadow-bottom=""
      />

    </div>
  );
}