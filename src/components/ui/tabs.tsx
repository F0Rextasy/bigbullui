"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type TabsContextValue = {
  value: string;
  activeTabStop?: string;
  setValue: (v: string) => void;
  baseId: string;
  animated: boolean;
};
const TabsCtx = React.createContext<TabsContextValue | null>(null);

export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
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

export function Tabs({ value, defaultValue, onValueChange, animated = true, className, children, ...props }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value ?? internal;
  const baseId = React.useId();

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
    () => ({ value: current, activeTabStop, setValue, baseId, animated }),
    [current, activeTabStop, setValue, baseId, animated]
  );

  return (
    <TabsCtx.Provider value={ctxValue}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsCtx.Provider>
  );
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]:not(:disabled)"));
    if (tabs.length === 0) return;
    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[nextIndex]!.focus();
    tabs[nextIndex]!.click();
  };

  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn("inline-flex h-10 items-center justify-center gap-1 rounded-md border border-dashed border-foreground/50 bg-transparent p-1 text-muted-foreground", className)}
      {...props}
    />
  );
}

export type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  /** Dual-mode override: false renders instantly with no motion. Defaults to Tabs animated. */
  animated?: boolean;
};

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { value = "", animated: animatedProp, className, onClick, disabled, ...props },
  ref
) {
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
});
TabsTrigger.displayName = "TabsTrigger";

export type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & { value: string };

export function TabsContent({ value = "", className, children, ...props }: TabsContentProps) {
  const ctx = React.useContext(TabsCtx);
  if (!ctx || ctx.value !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      tabIndex={0}
      className={cn("mt-3 rounded-sm text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
      {...props}
    >
      {children}
    </div>
  );
}
