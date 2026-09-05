"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  onLayout?: (sizes: number[]) => void;
  notched?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  onCollapse?: () => void;
  onExpand?: () => void;
  className?: string;
  children?: React.ReactNode;
  /** Internal index assigned by ResizablePanelGroup */
  _index?: number;
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean;
  withCollapseButton?: boolean;
  collapseDirection?: "before" | "after";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  /** Internal index assigned by ResizablePanelGroup */
  _index?: number;
}

interface PanelConfig {
  id: string;
  defaultSize: number;
  minSize: number;
  maxSize: number;
  collapsible: boolean;
  collapsedSize: number;
  onCollapse?: () => void;
  onExpand?: () => void;
}

interface ResizableContextValue {
  direction: "horizontal" | "vertical";
  sizes: number[];
  isDragging: boolean;
  activeHandle: number | null;
  handlePointerDown: (handleIndex: number, e: React.PointerEvent<HTMLDivElement>) => void;
  toggleCollapse: (panelIndex: number) => void;
  stepResize: (handleIndex: number, deltaPercent: number) => void;
  collapsedPanels: Record<number, boolean>;
  notched: boolean;
}

const ResizableContext = React.createContext<ResizableContextValue | null>(null);

function useResizableContext(): ResizableContextValue {
  const ctx = React.useContext(ResizableContext);
  if (!ctx) {
    throw new Error("Resizable subcomponents must be used within a ResizablePanelGroup");
  }
  return ctx;
}

function isPanelElement(child: React.ReactNode): child is React.ReactElement<ResizablePanelProps> {
  if (!React.isValidElement(child)) return false;
  if (child.type === ResizablePanel) return true;
  const childType = child.type as { displayName?: string; name?: string };
  return childType?.displayName === "ResizablePanel" || childType?.name === "ResizablePanel";
}

function isHandleElement(child: React.ReactNode): child is React.ReactElement<ResizableHandleProps> {
  if (!React.isValidElement(child)) return false;
  if (child.type === ResizableHandle) return true;
  const childType = child.type as { displayName?: string; name?: string };
  return childType?.displayName === "ResizableHandle" || childType?.name === "ResizableHandle";
}

export function ResizablePanelGroup({
  direction = "horizontal",
  onLayout,
  notched = true,
  className,
  children,
  style,
  ...props
}: ResizablePanelGroupProps) {
  const groupRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [activeHandle, setActiveHandle] = React.useState<number | null>(null);
  const [collapsedPanels, setCollapsedPanels] = React.useState<Record<number, boolean>>({});
  const savedSizesRef = React.useRef<Record<number, number>>({});

  // Parse panel configurations from children
  const panelConfigs = React.useMemo(() => {
    const configs: PanelConfig[] = [];
    let explicitSum = 0;
    let unspecifiedCount = 0;

    React.Children.forEach(children, (child) => {
      if (isPanelElement(child)) {
        const ds = child.props.defaultSize;
        if (typeof ds === "number") {
          explicitSum += ds;
        } else {
          unspecifiedCount++;
        }
      }
    });

    const remaining = Math.max(0, 100 - explicitSum);
    const fallbackSize = unspecifiedCount > 0 ? remaining / unspecifiedCount : 50;

    let idx = 0;
    React.Children.forEach(children, (child) => {
      if (isPanelElement(child)) {
        const p = child.props;
        configs.push({
          id: p.id ?? `panel-${idx}`,
          defaultSize: typeof p.defaultSize === "number" ? p.defaultSize : fallbackSize,
          minSize: typeof p.minSize === "number" ? p.minSize : 10,
          maxSize: typeof p.maxSize === "number" ? p.maxSize : 90,
          collapsible: Boolean(p.collapsible),
          collapsedSize: typeof p.collapsedSize === "number" ? p.collapsedSize : 0,
          onCollapse: p.onCollapse,
          onExpand: p.onExpand,
        });
        idx++;
      }
    });

    return configs;
  }, [children]);

  // Sizes percentage array
  const [sizes, setSizes] = React.useState<number[]>(() => {
    if (panelConfigs.length === 0) return [50, 50];
    return panelConfigs.map((c) => c.defaultSize);
  });

  // Synchronize sizes if panel count dynamically changes
  const [prevConfigsLength, setPrevConfigsLength] = React.useState(panelConfigs.length);
  if (panelConfigs.length !== prevConfigsLength) {
    setPrevConfigsLength(panelConfigs.length);
    setSizes(panelConfigs.map((c) => c.defaultSize));
  }


  const sizesRef = React.useRef(sizes);
  const panelConfigsRef = React.useRef(panelConfigs);

  React.useEffect(() => {
    sizesRef.current = sizes;
  }, [sizes]);

  React.useEffect(() => {
    panelConfigsRef.current = panelConfigs;
  }, [panelConfigs]);

  // Pointer drag resizing logic
  const handlePointerDown = React.useCallback(
    (handleIndex: number, e: React.PointerEvent<HTMLDivElement>) => {
      if (!groupRef.current) return;
      e.preventDefault();

      const startClientX = e.clientX;
      const startClientY = e.clientY;
      const initialSizes = [...sizesRef.current];
      const rect = groupRef.current.getBoundingClientRect();
      const isHorizontal = direction === "horizontal";
      const totalPixelSize = isHorizontal ? rect.width : rect.height;

      if (totalPixelSize <= 0) return;

      setIsDragging(true);
      setActiveHandle(handleIndex);

      const onPointerMove = (moveEvent: PointerEvent) => {
        moveEvent.preventDefault();
        const currentPos = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
        const startPos = isHorizontal ? startClientX : startClientY;
        const deltaPx = currentPos - startPos;
        const deltaPercent = (deltaPx / totalPixelSize) * 100;

        const currentConfigs = panelConfigsRef.current;
        const p1Config = currentConfigs[handleIndex];
        const p2Config = currentConfigs[handleIndex + 1];
        if (!p1Config || !p2Config) return;

        const pairTotal = initialSizes[handleIndex] + initialSizes[handleIndex + 1];
        let newP1 = initialSizes[handleIndex] + deltaPercent;

        // Min / Max constraints for panel 1
        if (p1Config.collapsible && newP1 < p1Config.minSize / 2) {
          newP1 = p1Config.collapsedSize;
        } else {
          newP1 = Math.max(p1Config.minSize, Math.min(p1Config.maxSize, newP1));
        }

        let newP2 = pairTotal - newP1;

        // Min / Max constraints for panel 2
        if (p2Config.collapsible && newP2 < p2Config.minSize / 2) {
          newP2 = p2Config.collapsedSize;
          newP1 = pairTotal - newP2;
        } else {
          if (newP2 < p2Config.minSize) {
            newP2 = p2Config.minSize;
            newP1 = pairTotal - newP2;
          } else if (newP2 > p2Config.maxSize) {
            newP2 = p2Config.maxSize;
            newP1 = pairTotal - newP2;
          }
        }

        setSizes((prev) => {
          const next = [...prev];
          next[handleIndex] = Math.round(newP1 * 100) / 100;
          next[handleIndex + 1] = Math.round(newP2 * 100) / 100;
          onLayout?.(next);
          return next;
        });
      };

      const onPointerUp = () => {
        setIsDragging(false);
        setActiveHandle(null);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        document.body.style.removeProperty("user-select");
        document.body.style.removeProperty("cursor");
      };

      document.body.style.userSelect = "none";
      document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    },
    [direction, onLayout]
  );

  // Keyboard stepping
  const stepResize = React.useCallback(
    (handleIndex: number, deltaPercent: number) => {
      const currentConfigs = panelConfigsRef.current;
      const p1Config = currentConfigs[handleIndex];
      const p2Config = currentConfigs[handleIndex + 1];
      if (!p1Config || !p2Config) return;

      setSizes((prev) => {
        const next = [...prev];
        const pairTotal = next[handleIndex] + next[handleIndex + 1];
        let newP1 = next[handleIndex] + deltaPercent;

        newP1 = Math.max(p1Config.minSize, Math.min(p1Config.maxSize, newP1));
        let newP2 = pairTotal - newP1;

        if (newP2 < p2Config.minSize) {
          newP2 = p2Config.minSize;
          newP1 = pairTotal - newP2;
        } else if (newP2 > p2Config.maxSize) {
          newP2 = p2Config.maxSize;
          newP1 = pairTotal - newP2;
        }

        next[handleIndex] = Math.round(newP1 * 100) / 100;
        next[handleIndex + 1] = Math.round(newP2 * 100) / 100;
        onLayout?.(next);
        return next;
      });
    },
    [onLayout]
  );

  // Collapse / Expand toggle
  const toggleCollapse = React.useCallback(
    (panelIndex: number) => {
      const currentConfigs = panelConfigsRef.current;
      const config = currentConfigs[panelIndex];
      if (!config || !config.collapsible) return;

      setSizes((prev) => {
        const next = [...prev];
        const isCurrentlyCollapsed = next[panelIndex] <= config.collapsedSize + 1;
        const neighborIndex = panelIndex === 0 ? 1 : panelIndex - 1;
        const pairTotal = next[panelIndex] + next[neighborIndex];

        if (isCurrentlyCollapsed) {
          // Restore
          const saved = savedSizesRef.current[panelIndex];
          const restoreSize = saved || config.defaultSize || 30;
          const minNeighbor = currentConfigs[neighborIndex]?.minSize ?? 10;
          const actualRestore = Math.min(restoreSize, pairTotal - minNeighbor);

          next[panelIndex] = Math.round(actualRestore * 100) / 100;
          next[neighborIndex] = Math.round((pairTotal - actualRestore) * 100) / 100;
          setCollapsedPanels((c) => ({ ...c, [panelIndex]: false }));
          config.onExpand?.();
        } else {
          // Collapse
          savedSizesRef.current[panelIndex] = next[panelIndex];
          const collapsed = config.collapsedSize;
          next[panelIndex] = collapsed;
          next[neighborIndex] = Math.round((pairTotal - collapsed) * 100) / 100;
          setCollapsedPanels((c) => ({ ...c, [panelIndex]: true }));
          config.onCollapse?.();
        }

        onLayout?.(next);
        return next;
      });
    },
    [onLayout]
  );

  // Map over children to inject indices
  let panelIdx = 0;
  let handleIdx = 0;
  const mappedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (isPanelElement(child)) {
      const currentIdx = panelIdx++;
      return React.cloneElement(child, {
        _index: currentIdx,
      });
    }

    if (isHandleElement(child)) {
      const currentIdx = handleIdx++;
      return React.cloneElement(child, {
        _index: currentIdx,
      });
    }

    return child;
  });

  return (
    <ResizableContext.Provider
      value={{
        direction,
        sizes,
        isDragging,
        activeHandle,
        handlePointerDown,
        toggleCollapse,
        stepResize,
        collapsedPanels,
        notched,
      }}
    >
      <div
        ref={groupRef}
        data-direction={direction}
        data-dragging={isDragging}
        style={style}
        className={cn(
          "relative flex h-full w-full overflow-hidden rounded-lg border-2 border-foreground bg-card text-card-foreground shadow-sm select-none",
          direction === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        {mappedChildren}
      </div>
    </ResizableContext.Provider>
  );
}

export function ResizablePanel({
  id,
  defaultSize,
  minSize = 10,
  maxSize = 90,
  collapsible = false,
  collapsedSize = 0,
  className,
  children,
  _index,
  style,
  ...props
}: ResizablePanelProps) {
  const ctx = useResizableContext();
  const index = _index ?? 0;
  const currentSize = ctx.sizes[index] ?? defaultSize ?? 50;
  const isCollapsed = Boolean(ctx.collapsedPanels[index]);
  const isHorizontal = ctx.direction === "horizontal";

  const panelStyle: React.CSSProperties = {
    ...style,
    flexGrow: currentSize,
    flexShrink: 1,
    flexBasis: 0,
    overflow: "hidden",
    ...(isHorizontal
      ? { minWidth: isCollapsed ? 0 : undefined }
      : { minHeight: isCollapsed ? 0 : undefined }),
  };

  return (
    <div
      data-panel-id={id}
      data-panel-index={index}
      data-collapsed={isCollapsed}
      data-min-size={minSize}
      data-max-size={maxSize}
      data-collapsible={collapsible}
      data-collapsed-size={collapsedSize}
      style={panelStyle}
      className={cn(
        "relative flex flex-col min-w-0 min-h-0 bg-card text-card-foreground",
        !ctx.isDragging && "transition-[flex-grow,flex-basis,opacity] duration-200 ease-out",
        isCollapsed && "opacity-0 pointer-events-none select-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
ResizablePanel.displayName = "ResizablePanel";

export function ResizableHandle({
  withHandle = true,
  withCollapseButton = false,
  collapseDirection = "before",
  disabled = false,
  className,
  children,
  _index,
  ...props
}: ResizableHandleProps) {
  const ctx = useResizableContext();
  const handleIndex = _index ?? 0;
  const isHorizontal = ctx.direction === "horizontal";
  const isActive = ctx.activeHandle === handleIndex;

  const collapseIndex = collapseDirection === "before" ? handleIndex : handleIndex + 1;
  const isTargetCollapsed = Boolean(ctx.collapsedPanels[collapseIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    ctx.handlePointerDown(handleIndex, e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = e.shiftKey ? 5 : 2;

    if (isHorizontal) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        ctx.stepResize(handleIndex, -step);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        ctx.stepResize(handleIndex, step);
      }
    } else {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        ctx.stepResize(handleIndex, -step);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        ctx.stepResize(handleIndex, step);
      }
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ctx.toggleCollapse(collapseIndex);
    }
  };

  return (
    <div
      role="separator"
      tabIndex={disabled ? -1 : 0}
      aria-orientation={isHorizontal ? "vertical" : "horizontal"}
      aria-valuenow={Math.round(ctx.sizes[handleIndex] ?? 50)}
      aria-valuemin={0}
      aria-valuemax={100}
      data-handle-index={handleIndex}
      data-active={isActive}
      onPointerDown={handlePointerDown}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex shrink-0 items-center justify-center select-none touch-none",
        disabled ? "pointer-events-none opacity-50" : "cursor-col-resize hover:bg-accent/10",
        isHorizontal
          ? "w-4 cursor-col-resize flex-col justify-center"
          : "h-4 cursor-row-resize flex-row justify-center",
        isActive && "bg-accent/15",
        className
      )}
      {...props}
    >
      {/* Ticket Cutout Notches at Divider Terminal Ends */}
      {ctx.notched && (
        <>
          {isHorizontal ? (
            <>
              <div
                aria-hidden="true"
                className="absolute -top-2 left-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-foreground bg-background z-20 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-foreground bg-background z-20 pointer-events-none"
              />
            </>
          ) : (
            <>
              <div
                aria-hidden="true"
                className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background z-20 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background z-20 pointer-events-none"
              />
            </>
          )}
        </>
      )}

      {/* Perforated Dashed Center Line */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute transition-colors pointer-events-none",
          isHorizontal
            ? "inset-y-0 left-1/2 -translate-x-1/2 w-0 border-r-2 border-dashed border-border group-hover:border-foreground group-data-[active=true]:border-accent"
            : "inset-x-0 top-1/2 -translate-y-1/2 h-0 border-b-2 border-dashed border-border group-hover:border-foreground group-data-[active=true]:border-accent"
        )}
      />

      {/* Tactile Perforated Ticket Grip Pill */}
      {withHandle && (
        <div
          className={cn(
            "z-10 rounded-xs border-2 border-border bg-card shadow-xs transition-all",
            "group-hover:border-foreground group-hover:scale-105",
            isActive && "border-accent bg-accent/20 scale-110",
            isHorizontal ? "px-1 py-1.5" : "px-1.5 py-1"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center gap-0.5",
              isHorizontal ? "flex-col" : "flex-row"
            )}
          >
            <span className="size-1 rounded-full bg-foreground/60 group-hover:bg-foreground" />
            <span className="size-1 rounded-full bg-foreground/60 group-hover:bg-foreground" />
            <span className="size-1 rounded-full bg-foreground/60 group-hover:bg-foreground" />
          </div>
        </div>
      )}

      {/* Quick Collapse / Expand Ticket Button */}
      {withCollapseButton && (
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            ctx.toggleCollapse(collapseIndex);
          }}
          aria-label={isTargetCollapsed ? "Expand panel" : "Collapse panel"}
          className={cn(
            "z-10 flex size-5 cursor-pointer items-center justify-center rounded-xs border-2 border-border bg-card font-mono text-[9px] font-bold text-foreground shadow-xs transition-all",
            "hover:border-foreground hover:bg-accent hover:text-accent-foreground hover:scale-110 active:scale-95",
            isHorizontal ? "mt-2" : "ml-2"
          )}
        >
          {isHorizontal ? (
            collapseDirection === "before" ? (
              isTargetCollapsed ? "›" : "‹"
            ) : (
              isTargetCollapsed ? "‹" : "›"
            )
          ) : (
            collapseDirection === "before" ? (
              isTargetCollapsed ? "▼" : "▲"
            ) : (
              isTargetCollapsed ? "▲" : "▼"
            )
          )}
        </button>
      )}

      {/* Live Percentage Stub Readout Badge while dragging */}
      {isActive && (
        <div
          aria-hidden="true"
          className={cn(
            "absolute z-30 pointer-events-none whitespace-nowrap rounded-xs border-2 border-foreground bg-card px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-foreground shadow-md animate-in fade-in zoom-in-95",
            isHorizontal ? "top-3 left-1/2 -translate-x-1/2" : "left-3 top-1/2 -translate-y-1/2"
          )}
        >
          {Math.round(ctx.sizes[handleIndex] ?? 50)}% | {Math.round(ctx.sizes[handleIndex + 1] ?? 50)}%
        </div>
      )}

      {children}
    </div>
  );
}
ResizableHandle.displayName = "ResizableHandle";
