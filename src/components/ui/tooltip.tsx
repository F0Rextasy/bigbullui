"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { registerEscapeLayer } from "./lib/focus-trap";
import { useIsMounted } from "./lib/react-compat";
import { useFloating } from "./lib/floating";

export type TooltipProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "content"> & {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayMs?: number;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
};

export function Tooltip({
  content,
  side = "top",
  delayMs = 300,
  animated = true,
  className,
  children,
  ...props
}: TooltipProps) {
  const mounted = useIsMounted();
  const [visible, setVisible] = React.useState(false);
  const showTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerWrapRef = React.useRef<HTMLSpanElement>(null);
  const bubbleRef = React.useRef<HTMLSpanElement>(null);
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

  React.useEffect(() => () => clearTimers(), [clearTimers]);

  const showDelayed = () => {
    clearTimers();
    showTimer.current = setTimeout(() => setVisible(true), delayMs);
  };
  const showImmediate = () => {
    clearTimers();
    setVisible(true);
  };
  const hideSoon = () => {
    clearTimers();
    hideTimer.current = setTimeout(() => setVisible(false), 80);
  };
  const hideNow = React.useCallback(() => {
    clearTimers();
    setVisible(false);
  }, [clearTimers]);

  const pos = useFloating({
    open: visible && mounted,
    referenceRef: triggerWrapRef,
    floatingRef: bubbleRef,
    side,
    align: "center",
    offset: 6,
  });

  React.useEffect(() => {
    if (!visible || !mounted) return;
    return registerEscapeLayer(hideNow);
  }, [visible, mounted, hideNow]);

  const childNode = React.isValidElement<{ "aria-describedby"?: string }>(children)
    ? React.cloneElement(children, {
        "aria-describedby": visible
          ? [children.props["aria-describedby"], descriptionId].filter(Boolean).join(" ")
          : children.props["aria-describedby"],
      })
    : <span aria-describedby={visible ? descriptionId : undefined}>{children}</span>;

  const bubble =
    visible && mounted ? (
      <span
        ref={bubbleRef}
        role="tooltip"
        id={descriptionId}
        onMouseEnter={clearTimers}
        onMouseLeave={hideSoon}
        style={{
          position: "fixed",
          top: pos.top,
          left: pos.left,
          visibility: pos.ready ? "visible" : "hidden",
        }}
        className={cn(
          "pointer-events-auto z-50 w-max max-w-64 rounded-md border border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-primary-foreground shadow-md",
          animated && pos.ready && "animate-[scale-in_0.15s_ease-out_both] motion-reduce:animate-none!",
        )}
      >
        {content}
      </span>
    ) : null;

  return (
    <span
      ref={triggerWrapRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={showDelayed}
      onMouseLeave={hideSoon}
      onFocus={showImmediate}
      onBlur={hideNow}
      {...props}
    >
      {childNode}
      {bubble ? createPortal(bubble, document.body) : null}
    </span>
  );
}
