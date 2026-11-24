"use client";

import * as React from "react";

export type FloatingSide = "top" | "bottom" | "left" | "right";
export type FloatingAlign = "start" | "center" | "end";

export interface UseFloatingOptions {
  open: boolean;
  referenceRef: React.RefObject<HTMLElement | null>;
  floatingRef: React.RefObject<HTMLElement | null>;
  side?: FloatingSide;
  align?: FloatingAlign;
  offset?: number;
  padding?: number;
  dir?: "ltr" | "rtl";
  matchWidth?: boolean;
}

export interface FloatingPosition {
  top: number;
  left: number;
  side: FloatingSide;
  minWidth?: number;
  ready: boolean;
}

function resolveDir(el: HTMLElement | null, explicit?: "ltr" | "rtl"): "ltr" | "rtl" {
  if (explicit) return explicit;
  if (el) {
    const closest = el.closest("[dir]") as HTMLElement | null;
    if (closest?.dir === "rtl" || closest?.dir === "ltr") return closest.dir;
  }
  if (typeof document !== "undefined" && document.documentElement.dir === "rtl") {
    return "rtl";
  }
  return "ltr";
}

/** Computes viewport-aware floating coordinates with flip, shift, and RTL alignment. */
export function useFloating({
  open,
  referenceRef,
  floatingRef,
  side = "bottom",
  align = "start",
  offset = 8,
  padding = 8,
  dir,
  matchWidth = false,
}: UseFloatingOptions): FloatingPosition {
  const [pos, setPos] = React.useState<FloatingPosition>({
    top: 0,
    left: 0,
    side,
    ready: false,
  });

  const compute = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const refEl = referenceRef.current;
    const floatEl = floatingRef.current;
    if (!refEl || !floatEl) return;

    const refRect = refEl.getBoundingClientRect();
    const floatRect = floatEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = matchWidth ? Math.max(refRect.width, floatRect.width) : floatRect.width || 200;
    const height = floatRect.height || 120;
    const resolvedDir = resolveDir(refEl, dir);

    let activeSide: FloatingSide = side;

    // Flip along primary axis when overflowing viewport edges.
    if (side === "bottom" && refRect.bottom + offset + height > vh - padding && refRect.top - offset - height >= padding) {
      activeSide = "top";
    } else if (side === "top" && refRect.top - offset - height < padding && refRect.bottom + offset + height <= vh - padding) {
      activeSide = "bottom";
    } else if (side === "right" && refRect.right + offset + width > vw - padding && refRect.left - offset - width >= padding) {
      activeSide = "left";
    } else if (side === "left" && refRect.left - offset - width < padding && refRect.right + offset + width <= vw - padding) {
      activeSide = "right";
    }

    let top = 0;
    let left = 0;

    const effectiveAlign: FloatingAlign =
      resolvedDir === "rtl" && (activeSide === "top" || activeSide === "bottom")
        ? align === "start"
          ? "end"
          : align === "end"
            ? "start"
            : "center"
        : align;

    if (activeSide === "bottom" || activeSide === "top") {
      top = activeSide === "bottom" ? refRect.bottom + offset : refRect.top - height - offset;
      if (effectiveAlign === "start") left = refRect.left;
      else if (effectiveAlign === "end") left = refRect.right - width;
      else left = refRect.left + refRect.width / 2 - width / 2;
    } else {
      left = activeSide === "right" ? refRect.right + offset : refRect.left - width - offset;
      if (align === "start") top = refRect.top;
      else if (align === "end") top = refRect.bottom - height;
      else top = refRect.top + refRect.height / 2 - height / 2;
    }

    // Clamp / shift inside viewport bounds.
    const maxLeft = Math.max(padding, vw - width - padding);
    const maxTop = Math.max(padding, vh - height - padding);
    left = Math.min(Math.max(padding, left), maxLeft);
    top = Math.min(Math.max(padding, top), maxTop);

    setPos({
      top: Math.round(top),
      left: Math.round(left),
      side: activeSide,
      ...(matchWidth ? { minWidth: Math.round(refRect.width) } : {}),
      ready: true,
    });
  }, [referenceRef, floatingRef, side, align, offset, padding, dir, matchWidth]);

  React.useLayoutEffect(() => {
    if (!open) return;
    compute();
    const raf = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame(compute) : null;
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, true);
    return () => {
      if (raf !== null && typeof cancelAnimationFrame !== "undefined") cancelAnimationFrame(raf);
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute, true);
    };
  }, [open, compute]);

  return open ? pos : { ...pos, ready: false };
}
