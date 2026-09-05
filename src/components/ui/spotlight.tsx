"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type SpotlightProps = {
  targetRef: React.RefObject<HTMLElement | null>;
  padding?: number;
  title?: string;
  description?: string;
};

export function Spotlight({ targetRef, padding = 24, title, description }: SpotlightProps) {
  const [visible, setVisible] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: `${padding}px` },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [targetRef, padding]);

  React.useEffect(() => {
    if (!visible || !overlayRef.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

  if (!visible) return null;

  const targetBox = targetRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };

  const overlayStyle = {
    left: targetBox.left - padding,
    top: targetBox.top - padding,
    width: targetBox.width + padding * 2,
    height: targetBox.height + padding * 2,
  };

  return (
    <div
      className={cn("fixed inset-0 z-50", "motion-reduce:animate-none")}
      style={{ ...overlayStyle }}
    >
      <div
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm",
          "motion-reduce:animate-none",
        )}
      >
        <div
          ref={overlayRef}
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border p-8 bg-card shadow-xl max-w-md w-full",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "motion-reduce:animate-none",
            "motion-reduce:transition-none",
          )}
        >
          {title || description ? (
            <div>
              {title && (
                <h3 className={cn("text-lg font-semibold tracking-tight text-center mb-2", "motion-reduce:animate-none")}>
                  {title}
                </h3>
              )}
              {description && (
                <p className={cn("text-sm text-muted-foreground text-center", "motion-reduce:animate-none")}>
                  {description}
                </p>
              )}
            </div>
          ) : null}

          <style>{`
            @keyframes spotlightPulseRing {
              0% { box-shadow: 0 0 0 0 var(--ring); opacity: 0.6; }
              100% { box-shadow: 0 0 0 12px transparent; opacity: 0; }
            }
          `}</style>

          <div
            className={cn(
              "absolute inset-0 pointer-events-none",
              "motion-reduce:animate-none",
              "animate-[spotlightPulseRing_2s_ease-out_infinite]",
            )}
          >
            <div
              className={cn(
                "absolute inset-0 outline outline-2 outline-dashed outline-offset-2 outline-primary",
                "motion-reduce:animate-none",
              )}
            >
              <div className="absolute inset-0 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}