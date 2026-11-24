"use client";

import * as React from "react";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";
import { cn } from "./lib/utils";

export type SpotlightProps = {
  targetRef: React.RefObject<HTMLElement | null>;
  padding?: number;
  title?: string;
  description?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "title">;

export function Spotlight({ targetRef, padding = 24, title, description, ...props }: SpotlightProps) {
  const [visible, setVisible] = React.useState(false);
  const [targetBox, setTargetBox] = React.useState({ left: 0, top: 0, width: 0, height: 0 });
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);

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
    if (!visible) return;
    const measure = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (rect) setTargetBox({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);

    restoreRef.current = document.activeElement as HTMLElement | null;
    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => setVisible(false));
    const handleKeyDown = (event: KeyboardEvent) => {
      if (overlayRef.current) trapFocus(overlayRef.current, event);
    };
    document.addEventListener("keydown", handleKeyDown);
    if (overlayRef.current) {
      const focusables = getFocusable(overlayRef.current);
      (focusables[0] ?? overlayRef.current).focus();
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      document.removeEventListener("keydown", handleKeyDown);
      releaseEscape();
      releaseScroll();
      restoreRef.current?.focus();
    };
  }, [visible, targetRef]);

  if (!visible) return null;

  const overlayStyle = {
    left: targetBox.left - padding,
    top: targetBox.top - padding,
    width: targetBox.width + padding * 2,
    height: targetBox.height + padding * 2,
  };

  return (
    <div
      className={cn("fixed inset-0 z-50", "motion-reduce:animate-none")}
      style={{ ...overlayStyle }} {...props}
    >
      <div
        aria-hidden="true"
        onClick={() => setVisible(false)}
        className={cn(
          "fixed inset-0 bg-black/60",
          "motion-reduce:animate-none",
        )}
      />
      <div
        ref={overlayRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Spotlight"}
        className={cn(
          "fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border p-8 bg-card shadow-xl max-w-md w-full",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "motion-reduce:animate-none",
          "motion-reduce:transition-none",
        )}
      >
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close spotlight"
          className="absolute right-3 top-3 rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
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
  );
}