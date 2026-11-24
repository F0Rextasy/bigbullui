"use client";

import * as React from "react";

export interface UseControllableStateParams<T> {
  prop?: T;
  defaultProp: T;
  onChange?: (value: T) => void;
}

/** Manages controlled and uncontrolled component state with stable callback identity. */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolled;

  const valueRef = React.useRef(value);
  const onChangeRef = React.useRef(onChange);
  React.useLayoutEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (next) => {
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(valueRef.current) : next;
      if (!isControlled) {
        setUncontrolled(resolved);
      }
      if (!Object.is(resolved, valueRef.current)) {
        onChangeRef.current?.(resolved);
      }
    },
    [isControlled],
  );

  return [value, setValue];
}
