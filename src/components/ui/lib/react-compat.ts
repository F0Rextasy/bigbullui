"use client";

import * as React from "react";

const emptySubscribe = () => () => {};

/** SSR-safe mount hook returning false on the server and true on the client. */
export function useIsMounted(): boolean {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

/** Reads a React element's ref across both React 18 (element.ref) and React 19 (props.ref). */
export function getElementRef<T = unknown>(element: React.ReactElement): React.Ref<T> | undefined {
  const propsRef = (element.props as { ref?: React.Ref<T> } | null)?.ref;
  if (propsRef !== undefined) return propsRef;
  const desc = Object.getOwnPropertyDescriptor(element, "ref");
  if (desc && "value" in desc) {
    return desc.value as React.Ref<T> | undefined;
  }
  return undefined;
}

/** Merges multiple React refs (callback or ref objects) into a single ref callback. */
export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined | null>): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(node);
      } else if (typeof ref === "object" && "current" in ref) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

/** Returns a React 18 & 19 compatible inert attribute object without TypeScript casts. */
export function inertProp(active: boolean): Record<string, boolean | string> {
  if (!active) return {};
  const major = Number(React.version.split(".")[0] || 18);
  return major >= 19 ? { inert: true } : { inert: "" };
}
