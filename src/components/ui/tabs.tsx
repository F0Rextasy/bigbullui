"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { useDirection, type Direction } from "./lib/direction";
import { inertProp } from "./lib/react-compat";

type TabsContextValue = {
  value: string;
  activeTabStop?: string;
  setValue: (v: string) => void;
  baseId: string;
  animated: boolean;
  orientation: "horizontal" | "vertical";
  activationMode: "automatic" | "manual";
  dir: Direction;
};
const TabsCtx = React.createContext<TabsContextValue | null>(null);

export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
  dir?: Direction;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
};

function collectEnabledTabValues(children: React.ReactNode, acc: string[] = []): string[] {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === TabsTrigger) {
      const p = child.props as { value?: string; disabled?: boolean };
      if (typeof p.value === "string" && !p.disabled) acc.push(p.value);
      return;
    }
    const p = child.props as { children?: React.ReactNode };
    if (p?.children !== undefined) collectEnabledTabValues(p.children, acc);
  });
  return acc;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  activationMode = "automatic",
  dir: dirProp,
  animated = true,
  className,
  children,
  ...props
}: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value ?? internal;
  const baseId = React.useId();
  const dir = useDirection(dirProp);

  const setValue = React.useCallback(
    (next: string) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    },
    [value, onValueChange]
  );

  const activeTabStop = React.useMemo(() => {
    const enabled = collectEnabledTabValues(children);
    if (current && enabled.includes(current)) return current;
    return enabled[0];
  }, [children, current]);

  const ctxValue = React.useMemo(
    () => ({
      value: current,
      activeTabStop,
      setValue,
      baseId,
      animated,
      orientation,
      activationMode,
      dir,
    }),
    [current, activeTabStop, setValue, baseId, animated, orientation, activationMode, dir]
  );

  return (
    <TabsCtx.Provider value={ctxValue}>
      <div
        dir={dirProp}
        data-orientation={orientation}
        className={cn(orientation === "vertical" && "flex gap-4", className)}
        {...props}
      >
        {children}
      </div>
    </TabsCtx.Provider>
  );
}

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function TabsList({ className, onKeyDown, ...props }, ref) {
    const ctx = React.useContext(TabsCtx);
    const orientation = ctx?.orientation ?? "horizontal";
    const isRtl = (ctx?.dir ?? "ltr") === "rtl";

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      const tabs = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]:not(:disabled)")
      );
      if (tabs.length === 0) return;

      const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
      let nextIndex = currentIndex;

      if (orientation === "vertical") {
        if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % tabs.length;
        else if (event.key === "ArrowUp")
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = tabs.length - 1;
        else return;
      } else {
        const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";
        const prevKey = isRtl ? "ArrowRight" : "ArrowLeft";
        if (event.key === nextKey || event.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (event.key === prevKey || event.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = tabs.length - 1;
        } else {
          return;
        }
      }

      event.preventDefault();
      const targetTab = tabs[nextIndex];
      if (!targetTab) return;
      targetTab.focus();
      if (ctx?.activationMode !== "manual") {
        targetTab.click();
      }
    };

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center justify-center gap-1 rounded-md border border-dashed border-foreground/50 bg-transparent p-1 text-muted-foreground",
          orientation === "vertical" ? "flex-col items-stretch h-auto" : "h-10",
          className
        )}
        {...props}
      />
    );
  }
);
TabsList.displayName = "TabsList";

export type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  /** Dual-mode override: false renders instantly with no motion. Defaults to Tabs animated. */
  animated?: boolean;
};

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ value = "", animated: animatedProp, className, onClick, disabled, ...props }, ref) {
    const ctx = React.useContext(TabsCtx);
    const isActive = ctx?.value === value;
    const isTabStop = !disabled && (isActive || ctx?.activeTabStop === value);
    const animated = animatedProp ?? ctx?.animated ?? true;
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        disabled={disabled}
        id={`${ctx?.baseId}-tab-${value}`}
        aria-selected={isActive}
        aria-controls={`${ctx?.baseId}-panel-${value}`}
        tabIndex={isTabStop ? 0 : -1}
        data-state={isActive ? "active" : "inactive"}
        onClick={(event) => {
          ctx?.setValue(value);
          onClick?.(event);
        }}
        className={cn(
          "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-[4px] px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          animated ? "transition-colors motion-reduce:transition-none" : "transition-none",
          isActive && "bg-primary text-primary-foreground shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  forceMount?: boolean;
};

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ value = "", forceMount = false, className, children, ...props }, ref) {
    const ctx = React.useContext(TabsCtx);
    if (!ctx) return null;
    const isActive = ctx.value === value;
    if (!isActive && !forceMount) return null;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${ctx.baseId}-panel-${value}`}
        aria-labelledby={`${ctx.baseId}-tab-${value}`}
        tabIndex={isActive ? 0 : -1}
        hidden={!isActive}
        {...inertProp(!isActive)}
        className={cn(
          "mt-3 rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";
