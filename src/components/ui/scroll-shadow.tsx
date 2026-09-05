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
        const shadowTop = ref.current.querySelector<HTMLElement>("[data-shadow-top]");
        const shadowBottom = ref.current.querySelector<HTMLElement>("[data-shadow-bottom]");

        if (shadowTop) {
          shadowTop.style.opacity = hasScrollTop ? "0" : "1";
        }
        if (shadowBottom) {
          shadowBottom.style.opacity = hasScrollBottom ? "0" : "1";
        }
      }
    };

    element.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-64 overflow-auto",
        "motion-reduce:animate-none",
        className,
      )}
    >
      <div
        className={cn(
          "absolute top-0 left-0 right-1 w-full h-px bg-gradient-to-b from-border/20 via-transparent to-transparent",
          "data-shadow-top",
          "motion-reduce:animate-none",
        )}
      >
        {/* Top shadow */}
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-1 w-full h-px bg-gradient-to-t from-border/20 via-transparent to-transparent",
          "data-shadow-bottom",
          "motion-reduce:animate-none",
        )}
      >
        {/* Bottom shadow */}
      </div>

      <div className="relative p-4 bg-card">{children}</div>
    </div>
  );
}