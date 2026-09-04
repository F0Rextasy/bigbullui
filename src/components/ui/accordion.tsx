"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type AccordionContextValue = { open: string | null; toggle: (id: string) => void };
const AccordionCtx = React.createContext<AccordionContextValue | null>(null);

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single";
  collapsible?: boolean;
  defaultValue?: string;
};

export function Accordion({ type: _type, collapsible: _collapsible, defaultValue, className, children, ...props }: AccordionProps) {
  const [open, setOpen] = React.useState<string | null>(defaultValue ?? null);
  const toggle = React.useCallback((id: string) => {
    setOpen((current) => (current === id ? null : id));
  }, []);
  return (
    <AccordionCtx.Provider value={{ open, toggle }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionCtx.Provider>
  );
}

export type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & { value: string };

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const ctx = React.useContext(AccordionCtx);
  const isOpen = ctx?.open === value;
  const contentId = React.useId();
  return (
    <div
      className={cn("border-b border-border", className)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ value?: string; isOpen?: boolean; contentId?: string }>, {
              value,
              isOpen,
              contentId,
            })
          : child
      )}
    </div>
  );
}

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value?: string;
  isOpen?: boolean;
  contentId?: string;
};

export function AccordionTrigger({ value, isOpen, contentId, className, children, onClick, ...props }: AccordionTriggerProps) {
  const ctx = React.useContext(AccordionCtx);
  return (
    <h3 className="flex">
      <button
        type="button"
        aria-expanded={isOpen ?? false}
        aria-controls={contentId}
        onClick={(event) => {
          if (value) ctx?.toggle(value);
          onClick?.(event);
        }}
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-colors hover:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
          className={cn("shrink-0 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>
  );
}

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  contentId?: string;
};

export function AccordionContent({ isOpen, contentId, className, children, ...props }: AccordionContentProps) {
  return (
    <div
      id={contentId}
      role="region"
      hidden={!isOpen}
      className={cn(
        "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn("pb-4 pt-0 text-sm text-muted-foreground", className)}>{children}</div>
      </div>
    </div>
  );
}
