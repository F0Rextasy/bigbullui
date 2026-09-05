"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both";
  scrollbarVisibility?: "always" | "hover" | "auto";
  fadeShadows?: boolean;
  notched?: boolean;
  showProgress?: boolean;
  viewportRef?: (node: HTMLDivElement | null) => void;
  viewportClassName?: string;
  className?: string;
  children: React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function ScrollArea({
  orientation = "vertical",
  scrollbarVisibility = "hover",
  fadeShadows = true,
  notched = true,
  showProgress = false,
  viewportRef,
  viewportClassName,
  className,
  children,
  onScroll,
  ...props
}: ScrollAreaProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const innerViewportRef = React.useRef<HTMLDivElement | null>(null);
  const verticalTrackRef = React.useRef<HTMLDivElement>(null);
  const horizontalTrackRef = React.useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = React.useRef<number | null>(null);

  // Scroll and dimension metrics
  const [scrollTop, setScrollTop] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [scrollHeight, setScrollHeight] = React.useState(0);
  const [scrollWidth, setScrollWidth] = React.useState(0);
  const [clientHeight, setClientHeight] = React.useState(0);
  const [clientWidth, setClientWidth] = React.useState(0);

  // State flags
  const [isHovered, setIsHovered] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [isDraggingV, setIsDraggingV] = React.useState(false);
  const [isDraggingH, setIsDraggingH] = React.useState(false);

  // Update element dimensions
  const updateMetrics = React.useCallback(() => {
    const el = innerViewportRef.current;
    if (!el) return;
    setScrollTop(el.scrollTop);
    setScrollLeft(el.scrollLeft);
    setScrollHeight(el.scrollHeight);
    setScrollWidth(el.scrollWidth);
    setClientHeight(el.clientHeight);
    setClientWidth(el.clientWidth);
  }, []);

  const setCombinedViewportRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerViewportRef.current = node;
      viewportRef?.(node);
      if (node) {
        updateMetrics();
      }
    },
    [viewportRef, updateMetrics]
  );

  React.useEffect(() => {
    const el = innerViewportRef.current;
    if (!el) return;

    updateMetrics();

    const observer = new ResizeObserver(() => {
      updateMetrics();
    });

    observer.observe(el);
    if (el.firstElementChild) {
      observer.observe(el.firstElementChild);
    }

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateMetrics]);

  // Viewport scroll handler
  const handleViewportScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollTop(target.scrollTop);
    setScrollLeft(target.scrollLeft);
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 900);

    onScroll?.(e);
  };

  // Scrollability flags
  const canScrollV = scrollHeight > clientHeight && clientHeight > 0;
  const canScrollH = scrollWidth > clientWidth && clientWidth > 0;
  const isVertical = orientation === "vertical" || orientation === "both";
  const isHorizontal = orientation === "horizontal" || orientation === "both";

  const showVBar =
    isVertical &&
    canScrollV &&
    (scrollbarVisibility === "always" ||
      (scrollbarVisibility === "hover" && (isHovered || isScrolling || isDraggingV)) ||
      scrollbarVisibility === "auto");

  const showHBar =
    isHorizontal &&
    canScrollH &&
    (scrollbarVisibility === "always" ||
      (scrollbarVisibility === "hover" && (isHovered || isScrolling || isDraggingH)) ||
      scrollbarVisibility === "auto");

  // Vertical scroll calculations
  const trackPaddingV = 16;
  const trackHeightV = Math.max(0, clientHeight - trackPaddingV * 2);
  const thumbHeightV =
    canScrollV && trackHeightV > 0
      ? Math.max(28, Math.min(trackHeightV, (clientHeight / scrollHeight) * trackHeightV))
      : 0;
  const maxScrollTop = Math.max(1, scrollHeight - clientHeight);
  const thumbTopV =
    trackHeightV > thumbHeightV
      ? (scrollTop / maxScrollTop) * (trackHeightV - thumbHeightV)
      : 0;

  // Horizontal scroll calculations
  const trackPaddingH = 16;
  const trackWidthH = Math.max(0, clientWidth - trackPaddingH * 2);
  const thumbWidthH =
    canScrollH && trackWidthH > 0
      ? Math.max(28, Math.min(trackWidthH, (clientWidth / scrollWidth) * trackWidthH))
      : 0;
  const maxScrollLeft = Math.max(1, scrollWidth - clientWidth);
  const thumbLeftH =
    trackWidthH > thumbWidthH
      ? (scrollLeft / maxScrollLeft) * (trackWidthH - thumbWidthH)
      : 0;

  // Progress percentage
  const progressPercentV = maxScrollTop > 0 ? Math.round((scrollTop / maxScrollTop) * 100) : 0;

  // Dragging vertical thumb
  const handleVerticalThumbDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const viewport = innerViewportRef.current;
    if (!viewport || !canScrollV || trackHeightV <= thumbHeightV) return;

    setIsDraggingV(true);
    const startY = e.clientY;
    const startScrollTop = viewport.scrollTop;
    const scrollRatio = maxScrollTop / (trackHeightV - thumbHeightV);

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      const deltaPx = moveEvent.clientY - startY;
      viewport.scrollTop = startScrollTop + deltaPx * scrollRatio;
    };

    const onPointerUp = () => {
      setIsDraggingV(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.style.removeProperty("user-select");
      document.body.style.removeProperty("cursor");
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  // Click on vertical track to jump
  const handleVerticalTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const viewport = innerViewportRef.current;
    const track = verticalTrackRef.current;
    if (!viewport || !track || !canScrollV || trackHeightV <= thumbHeightV) return;

    const rect = track.getBoundingClientRect();
    const clickY = e.clientY - rect.top - trackPaddingV;
    const targetRatio = Math.max(0, Math.min(1, clickY / trackHeightV));
    viewport.scrollTo({
      top: targetRatio * maxScrollTop,
      behavior: "smooth",
    });
  };

  // Dragging horizontal thumb
  const handleHorizontalThumbDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const viewport = innerViewportRef.current;
    if (!viewport || !canScrollH || trackWidthH <= thumbWidthH) return;

    setIsDraggingH(true);
    const startX = e.clientX;
    const startScrollLeft = viewport.scrollLeft;
    const scrollRatio = maxScrollLeft / (trackWidthH - thumbWidthH);

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      const deltaPx = moveEvent.clientX - startX;
      viewport.scrollLeft = startScrollLeft + deltaPx * scrollRatio;
    };

    const onPointerUp = () => {
      setIsDraggingH(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.style.removeProperty("user-select");
      document.body.style.removeProperty("cursor");
    };

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  // Click on horizontal track to jump
  const handleHorizontalTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const viewport = innerViewportRef.current;
    const track = horizontalTrackRef.current;
    if (!viewport || !track || !canScrollH || trackWidthH <= thumbWidthH) return;

    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left - trackPaddingH;
    const targetRatio = Math.max(0, Math.min(1, clickX / trackWidthH));
    viewport.scrollTo({
      left: targetRatio * maxScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg border-2 border-foreground bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {/* Outer Ticket Cutout Notches */}
      {notched && (
        <>
          <div
            aria-hidden="true"
            className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background z-30 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background z-30 pointer-events-none"
          />
        </>
      )}

      {/* Top Perforated Fade Indicator */}
      {fadeShadows && isVertical && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-20 transition-opacity duration-200",
            canScrollV && scrollTop > 4 ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex h-6 w-full items-center justify-between border-b-2 border-dashed border-border/80 bg-gradient-to-b from-card via-card/90 to-transparent px-3">
            <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground/90">
              <span className="inline-block text-[8px] animate-bounce">▲</span>
              <span>MORE ABOVE</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
              TICKET // VIEWPORT
            </span>
          </div>
        </div>
      )}

      {/* Scrollable Viewport */}
      <div
        ref={setCombinedViewportRef}
        role="region"
        tabIndex={0}
        aria-label="Scrollable region"
        onScroll={handleViewportScroll}
        className={cn(
          "h-full w-full overflow-auto outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          viewportClassName
        )}
      >
        {children}
      </div>

      {/* Bottom Perforated Fade Indicator */}
      {fadeShadows && isVertical && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-20 transition-opacity duration-200",
            canScrollV && scrollTop < maxScrollTop - 4 ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex h-6 w-full items-center justify-between border-t-2 border-dashed border-border/80 bg-gradient-to-t from-card via-card/90 to-transparent px-3">
            <span className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground/90">
              <span className="inline-block text-[8px] animate-bounce">▼</span>
              <span>SCROLL FOR MORE</span>
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent">
              {progressPercentV}%
            </span>
          </div>
        </div>
      )}

      {/* Left Perforated Fade (Horizontal) */}
      {fadeShadows && isHorizontal && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-20 transition-opacity duration-200",
            canScrollH && scrollLeft > 4 ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="h-full w-6 border-r-2 border-dashed border-border/80 bg-gradient-to-r from-card to-transparent" />
        </div>
      )}

      {/* Right Perforated Fade (Horizontal) */}
      {fadeShadows && isHorizontal && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-20 transition-opacity duration-200",
            canScrollH && scrollLeft < maxScrollLeft - 4 ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="h-full w-6 border-l-2 border-dashed border-border/80 bg-gradient-to-l from-card to-transparent" />
        </div>
      )}

      {/* Customized Dashed Vertical Scrollbar Track */}
      {isVertical && (
        <div
          ref={verticalTrackRef}
          aria-hidden="true"
          onClick={handleVerticalTrackClick}
          className={cn(
            "absolute right-1.5 top-0 bottom-0 w-3.5 z-20 flex flex-col items-center justify-center select-none transition-opacity duration-200",
            showVBar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="relative h-full w-full py-4 flex items-center justify-center">
            {/* Dashed Perforated Track Line */}
            <div className="absolute inset-y-4 w-2 rounded-xs border border-dashed border-border bg-secondary/40 transition-colors hover:border-foreground/40" />

            {/* Top Track Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 size-2.5 rounded-full border border-foreground bg-background z-10" />

            {/* Bottom Track Notch */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 size-2.5 rounded-full border border-foreground bg-background z-10" />

            {/* Draggable Ticket Carriage Thumb */}
            <div
              onPointerDown={handleVerticalThumbDown}
              style={{
                top: `${trackPaddingV + thumbTopV}px`,
                height: `${thumbHeightV}px`,
              }}
              className={cn(
                "absolute left-0.5 right-0.5 rounded-xs border-2 border-foreground bg-accent text-accent-foreground shadow-xs cursor-grab active:cursor-grabbing",
                "hover:scale-105 active:scale-95 transition-transform flex items-center justify-center",
                isDraggingV && "scale-105 bg-accent brightness-110"
              )}
            >
              {/* Perforated Grip Dots */}
              <div className="flex flex-col gap-0.5 items-center pointer-events-none">
                <span className="size-1 rounded-full bg-accent-foreground/80" />
                <span className="size-1 rounded-full bg-accent-foreground/80" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customized Dashed Horizontal Scrollbar Track */}
      {isHorizontal && (
        <div
          ref={horizontalTrackRef}
          aria-hidden="true"
          onClick={handleHorizontalTrackClick}
          className={cn(
            "absolute bottom-1.5 left-0 right-0 h-3.5 z-20 flex items-center justify-center select-none transition-opacity duration-200",
            showHBar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="relative h-full w-full px-4 flex items-center justify-center">
            {/* Dashed Perforated Track Line */}
            <div className="absolute inset-x-4 h-2 rounded-xs border border-dashed border-border bg-secondary/40 transition-colors hover:border-foreground/40" />

            {/* Left Track Notch */}
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 size-2.5 rounded-full border border-foreground bg-background z-10" />

            {/* Right Track Notch */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 size-2.5 rounded-full border border-foreground bg-background z-10" />

            {/* Draggable Ticket Carriage Thumb */}
            <div
              onPointerDown={handleHorizontalThumbDown}
              style={{
                left: `${trackPaddingH + thumbLeftH}px`,
                width: `${thumbWidthH}px`,
              }}
              className={cn(
                "absolute top-0.5 bottom-0.5 rounded-xs border-2 border-foreground bg-accent text-accent-foreground shadow-xs cursor-grab active:cursor-grabbing",
                "hover:scale-105 active:scale-95 transition-transform flex items-center justify-center",
                isDraggingH && "scale-105 bg-accent brightness-110"
              )}
            >
              {/* Perforated Grip Dots */}
              <div className="flex flex-row gap-0.5 items-center pointer-events-none">
                <span className="size-1 rounded-full bg-accent-foreground/80" />
                <span className="size-1 rounded-full bg-accent-foreground/80" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional Progress Readout */}
      {showProgress && (
        <div className="absolute bottom-2 left-2 z-20 rounded-xs border border-dashed border-border bg-card/90 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground shadow-xs pointer-events-none">
          STUB: {progressPercentV}%
        </div>
      )}
    </div>
  );
}

export function ScrollBar({
  orientation = "vertical",
  className,
  ...props
}: ScrollBarProps) {
  return (
    <div
      aria-hidden="true"
      data-orientation={orientation}
      className={cn(
        "flex select-none touch-none transition-colors",
        orientation === "vertical"
          ? "h-full w-3.5 border-l border-dashed border-border p-[1px]"
          : "h-3.5 border-t border-dashed border-border p-[1px]",
        className
      )}
      {...props}
    />
  );
}
