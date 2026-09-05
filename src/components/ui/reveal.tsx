"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type RevealProps = {
  children?: React.ReactNode;
  /** kademeli giriş gecikmesi çarpanı (ms cinsinden index*40) */
  delay?: number;
  /** yalnızca ilk görünümde tetiklensin */
  once?: boolean;
};

export function Reveal({ children, delay = 0, once = true }: RevealProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div ref={containerRef} className="relative">
      <div
        className={cn(
          "animate-[fade-in-up_0.4s_ease-out_both]",
          "motion-reduce:animate-none",
          !visible && "opacity-0",
        )}
        style={{ animationDelay: `${delay * 40}ms` }}
      >
        {children}
      </div>
    </div>
  );
}
