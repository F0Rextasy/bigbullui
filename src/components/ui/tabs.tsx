"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type TabsContextValue = { value: string; setValue: (v: string) => void; baseId: string };
const TabsCtx = React.createContext<TabsContextValue | null>(null);

export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({ value, defaultValue, onValueChange, className, children, ...props }: TabsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value ?? internal;

  const setValue = React.useCallback(
    (next: string) => {
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    },
    [value, onValueChange]
  );

  return (
    <TabsCtx.Provider value={{ value: current, setValue, baseId: React.useId() }}>
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
      className={cn("inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-secondary p-1 text-muted-foreground", className)}
      {...props}
    />
  );
}

export type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string };

export function TabsTrigger({ value, className, onClick, ...props }: TabsTriggerProps) {
  const ctx = React.useContext(TabsCtx);
  const isActive = ctx?.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx?.baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${ctx?.baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? "active" : "inactive"}
      onClick={(event) => {
        ctx?.setValue(value);
        onClick?.(event);
      }}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        isActive && "bg-card text-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & { value: string };

export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const ctx = React.useContext(TabsCtx);
  if (ctx?.value !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${ctx.baseId}-panel-${value}`}
      aria-labelledby={`${ctx.baseId}-tab-${value}`}
      tabIndex={0}
      className={cn("mt-3 text-sm focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}
