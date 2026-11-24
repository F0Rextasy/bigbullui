"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { inertProp } from "./lib/react-compat";

type AccordionContextValue = { openIds: string[]; toggle: (id: string) => void };
const AccordionCtx = React.createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  contentId: string;
  triggerId: string;
}
const AccordionItemCtx = React.createContext<AccordionItemContextValue | null>(null);

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple";
  collapsible?: boolean;
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
  collapsible = true,
  value: controlledValue,
  defaultValue,
  onValueChange,
  onKeyDown,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internal, setInternal] = React.useState<string[]>(() =>
    normalizeAccordionValue(defaultValue)
  );
  const isControlled = controlledValue !== undefined;
  const openIds = React.useMemo(
    () => (isControlled ? normalizeAccordionValue(controlledValue) : internal),
    [isControlled, controlledValue, internal]
  );

  const onValueChangeRef = React.useRef(onValueChange);
  React.useEffect(() => {
    onValueChangeRef.current = onValueChange;
  });

  const toggle = React.useCallback(
    (id: string) => {
      let next: string[];
      if (type === "multiple") {
        next = openIds.includes(id) ? openIds.filter((x) => x !== id) : [...openIds, id];
      } else if (openIds.includes(id)) {
        next = collapsible ? [] : openIds;
      } else {
        next = [id];
      }
      if (!isControlled) setInternal(next);
      onValueChangeRef.current?.(type === "multiple" ? next : (next[0] ?? ""));
    },
    [type, collapsible, openIds, isControlled]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (
      e.key !== "ArrowDown" &&
      e.key !== "ArrowUp" &&
      e.key !== "Home" &&
      e.key !== "End"
    ) {
      return;
    }
    const target = e.target as HTMLElement | null;
    if (!target || !target.matches("[data-accordion-trigger]")) return;
    const triggers = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]:not(:disabled)")
    );
    if (triggers.length === 0) return;
    const curr = triggers.indexOf(target as HTMLButtonElement);
    if (curr < 0) return;
    e.preventDefault();
    let nextIdx = curr;
    if (e.key === "ArrowDown") nextIdx = (curr + 1) % triggers.length;
    else if (e.key === "ArrowUp") nextIdx = (curr - 1 + triggers.length) % triggers.length;
    else if (e.key === "Home") nextIdx = 0;
    else nextIdx = triggers.length - 1;
    triggers[nextIdx]?.focus();
  };

  const ctxValue = React.useMemo(() => ({ openIds, toggle }), [openIds, toggle]);

  return (
    <AccordionCtx.Provider value={ctxValue}>
      <div className={cn("w-full", className)} onKeyDown={handleKeyDown} {...props}>
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
  const itemCtx = React.useMemo(
    () => ({ value, isOpen, contentId, triggerId }),
    [value, isOpen, contentId, triggerId]
  );

  return (
    <AccordionItemCtx.Provider value={itemCtx}>
      <div
        className={cn("border-b border-dashed border-border", className)}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </AccordionItemCtx.Provider>
  );
}

type AccordionHeadingTag = "h2" | "h3" | "h4" | "h5" | "h6";

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value?: string;
  isOpen?: boolean;
  contentId?: string;
  triggerId?: string;
  as?: AccordionHeadingTag;
  /** Dual-mode: false renders instantly with no motion. Default true. */
  animated?: boolean;
};

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger(
    {
      value,
      isOpen,
      contentId,
      triggerId,
      as: Heading = "h3",
      id,
      animated = true,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) {
    const ctx = React.useContext(AccordionCtx);
    const itemCtx = React.useContext(AccordionItemCtx);

    const resolvedValue = value ?? itemCtx?.value ?? "";
    const resolvedOpen =
      isOpen ?? (resolvedValue ? ctx?.openIds.includes(resolvedValue) : undefined) ?? itemCtx?.isOpen ?? false;
    const resolvedContentId = contentId ?? itemCtx?.contentId;
    const resolvedTriggerId = id ?? triggerId ?? itemCtx?.triggerId;

    return (
      <Heading className="flex">
        <button
          ref={ref}
          id={resolvedTriggerId}
          type="button"
          data-accordion-trigger=""
          aria-expanded={resolvedOpen}
          aria-controls={resolvedContentId}
          onClick={(event) => {
            if (resolvedValue) ctx?.toggle(resolvedValue);
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
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn(
              "shrink-0 text-muted-foreground",
              animated ? "transition-transform duration-200 motion-reduce:transition-none" : "transition-none",
              resolvedOpen && "rotate-45"
            )}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </Heading>
    );
  }
);
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
  value,
  isOpen,
  contentId,
  triggerId,
  animated = true,
  className,
  children,
  ...props
}: AccordionContentProps) {
  const ctx = React.useContext(AccordionCtx);
  const itemCtx = React.useContext(AccordionItemCtx);

  const resolvedValue = value ?? itemCtx?.value ?? "";
  const resolvedOpen =
    isOpen ?? (resolvedValue ? ctx?.openIds.includes(resolvedValue) : undefined) ?? itemCtx?.isOpen ?? false;
  const resolvedContentId = contentId ?? itemCtx?.contentId;
  const resolvedTriggerId = triggerId ?? itemCtx?.triggerId;

  return (
    <div
      id={resolvedContentId}
      role="region"
      aria-labelledby={resolvedTriggerId}
      aria-hidden={!resolvedOpen || undefined}
      {...inertProp(!resolvedOpen)}
      className={cn(
        "grid ease-out",
        animated ? "transition-[grid-template-rows] duration-200 motion-reduce:transition-none" : "transition-none",
        resolvedOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn("pb-4 pt-0 text-sm text-muted-foreground", className)}>{children}</div>
      </div>
    </div>
  );
}
