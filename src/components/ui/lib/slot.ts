"use client";

import * as React from "react";
import { cn } from "./utils";
import { getElementRef, mergeRefs } from "./react-compat";

type AnyRecord = Record<string, unknown>;

/** Merges parent and child props, composing event handlers, styles, and Tailwind classes. */
export function mergeProps(slotProps: AnyRecord, childProps: AnyRecord): AnyRecord {
  const merged: AnyRecord = { ...childProps };

  for (const propName of Object.keys(slotProps)) {
    const slotValue = slotProps[propName];
    const childValue = childProps[propName];

    if (propName === "ref") continue;

    if (/^on[A-Z]/.test(propName)) {
      if (typeof slotValue === "function" && typeof childValue === "function") {
        merged[propName] = (...args: unknown[]) => {
          (childValue as (...a: unknown[]) => void)(...args);
          (slotValue as (...a: unknown[]) => void)(...args);
        };
      } else if (typeof slotValue === "function") {
        merged[propName] = slotValue;
      }
    } else if (propName === "style") {
      if (
        slotValue &&
        childValue &&
        typeof slotValue === "object" &&
        typeof childValue === "object"
      ) {
        merged.style = {
          ...(slotValue as React.CSSProperties),
          ...(childValue as React.CSSProperties),
        };
      } else {
        merged.style = childValue ?? slotValue;
      }
    } else if (propName === "className") {
      merged.className = cn(
        typeof slotValue === "string" ? slotValue : undefined,
        typeof childValue === "string" ? childValue : undefined,
      );
    } else if (merged[propName] === undefined) {
      merged[propName] = slotValue;
    }
  }

  return merged;
}

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/** Forwards props, refs, event handlers, and classes onto a single child React element. */
export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, ...slotProps },
  forwardedRef,
) {
  if (!React.isValidElement(children)) {
    return null;
  }

  const child = children as React.ReactElement<AnyRecord>;
  const childProps: AnyRecord = { ...(child.props || {}) };
  const merged = mergeProps(slotProps as AnyRecord, childProps);

  // Avoid leaking non-standard disabled attribute onto anchor tags.
  if (child.type === "a" && "disabled" in merged) {
    if (merged.disabled) {
      merged["aria-disabled"] = true;
    }
    delete merged.disabled;
  }

  const childRef = getElementRef<HTMLElement>(child);
  merged.ref = mergeRefs(forwardedRef, childRef);

  return React.cloneElement(child, merged);
});
