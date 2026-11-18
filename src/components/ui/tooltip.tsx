"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { registerEscapeLayer } from "./lib/focus-trap";

export type TooltipProps = React.HTMLAttributes<HTMLSpanElement> & {
  content: React.ReactNode;
  side?: "top" | "bottom";
  delayMs?: number;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
};

export function Tooltip({ content, side = "top", delayMs = 300, animated = true, className, children, ...props }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const [coords, setCoords] = React.useState<{ top: number; left: number } | null>(null);
  const showTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerWrapRef = React.useRef<HTMLSpanElement>(null);
  const descriptionId = React.useId();

  const clearTimers = React.useCallback(() => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  React.useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const show = () => {
    clearTimers();
    showTimer.current = setTimeout(() => setVisible(true), delayMs);
  };
  const hideSoon = () => {
    clearTimers();
    hideTimer.current = setTimeout(() => setVisible(false), 80);
  };
  const hideNow = React.useCallback(() => {
    clearTimers();
    setVisible(false);
  }, [clearTimers]);

  React.useEffect(() => {
    if (!visible) {
      setCoords(null);
      return;
    }
    const updatePosition = () => {
      const rect = triggerWrapRef.current?.getBoundingClientRect();
      if (!rect || (rect.width === 0 && rect.height === 0)) {
        setCoords(null);
        return;
      }
      setCoords({
        top: side === "top" ? rect.top - 6 : rect.bottom + 6,
        left: rect.left + rect.width / 2,
      });
    };
    updatePosition();
    const releaseEscape = registerEscapeLayer(hideNow);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      releaseEscape();
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [visible, side, hideNow]);

  const childNode = React.isValidElement<{ "aria-describedby"?: string }>(children)
    ? React.cloneElement(children, {
        "aria-describedby": visible
          ? [children.props["aria-describedby"], descriptionId].filter(Boolean).join(" ")
          : children.props["aria-describedby"],
      })
    : <span aria-describedby={visible ? descriptionId : undefined}>{children}</span>;

  const bubble = visible ? (
    <span
      role="tooltip"
      id={descriptionId}
      onMouseEnter={clearTimers}
      onMouseLeave={hideSoon}
      style={
        coords
          ? {
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: side === "top" ? "translate(-50%, -100%)" : "translateX(-50%)",
            }
          : undefined
      }
      className={cn(
        "z-50 w-max max-w-64 rounded-md border border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-foreground shadow-md",
        !coords && "absolute left-1/2 -translate-x-1/2",
        !coords && (side === "top" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"),
        animated && "animate-[scale-in_0.15s_ease-out_both] motion-reduce:animate-none!"
      )}
    >
      {content}
    </span>
  ) : null;

  return (
    <span
      ref={triggerWrapRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onFocus={show}
      onBlur={hideNow}
      {...props}
    >
      {childNode}
      {bubble && coords && typeof document !== "undefined" ? createPortal(bubble, document.body) : bubble}
    </span>
  );
}
