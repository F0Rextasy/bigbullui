"use client";

import * as React from "react";
import { cn } from "./lib/utils";

type AccordionContextValue = { openIds: string[]; toggle: (id: string) => void };
const AccordionCtx = React.createContext<AccordionContextValue | null>(null);

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
};

function normalizeAccordionValue(val?: string | string[]): string[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

export function Accordion({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internal, setInternal] = React.useState<string[]>(() => normalizeAccordionValue(defaultValue));
  const isControlled = controlledValue !== undefined;
  const openIds = React.useMemo(
    () => (isControlled ? normalizeAccordionValue(controlledValue) : internal),
    [isControlled, controlledValue, internal]
  );

  const onValueChangeRef = React.useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const toggle = React.useCallback(
    (id: string) => {
      let next: string[];
      if (type === "multiple") {
        next = openIds.includes(id) ? openIds.filter((x) => x !== id) : [...openIds, id];
      } else {
        next = openIds.includes(id) ? [] : [id];
      }
      if (!isControlled) setInternal(next);
      onValueChangeRef.current?.(type === "multiple" ? next : (next[0] ?? ""));
    },
    [type, openIds, isControlled]
  );

  const ctxValue = React.useMemo(() => ({ openIds, toggle }), [openIds, toggle]);

  return (
    <AccordionCtx.Provider value={ctxValue}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionCtx.Provider>
  );
}

export type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & { value: string };

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const ctx = React.useContext(AccordionCtx);
  const isOpen = ctx?.openIds.includes(value) ?? false;
  const uid = React.useId();
  const contentId = `${uid}-content`;
  const triggerId = `${uid}-trigger`;
  return (
    <div
      className={cn("border-b border-dashed border-border", className)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ value?: string; isOpen?: boolean; contentId?: string; triggerId?: string }>,
              {
                value,
                isOpen,
                contentId,
                triggerId,
              }
            )
          : child
      )}
    </div>
  );
}

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value?: string;
  isOpen?: boolean;
  contentId?: string;
  triggerId?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
};

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(function AccordionTrigger(
  { value, isOpen, contentId, triggerId, id, animated = true, className, children, onClick, ...props },
  ref
) {
  const ctx = React.useContext(AccordionCtx);
  return (
    <h3 className="flex">
      <button
        ref={ref}
        id={id ?? triggerId}
        type="button"
        aria-expanded={isOpen ?? false}
        aria-controls={contentId}
        onClick={(event) => {
          if (value) ctx?.toggle(value);
          onClick?.(event);
        }}
        className={cn(
          "flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-start text-sm font-medium transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs",
          className
        )}
        {...props}
      >
        {children}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
          className={cn("shrink-0 text-muted-foreground", animated ? "transition-transform duration-200 motion-reduce:transition-none" : "transition-none", isOpen && "rotate-45")}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: string;
  isOpen?: boolean;
  contentId?: string;
  triggerId?: string;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
};

export function AccordionContent({
  value: _value,
  isOpen,
  contentId,
  triggerId,
  animated = true,
  className,
  children,
  ...props
}: AccordionContentProps) {
  void _value;
  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen || undefined}
      inert={!isOpen || undefined}
      className={cn(
        "grid ease-out",
        animated ? "transition-[grid-template-rows] duration-200 motion-reduce:transition-none" : "transition-none",
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
