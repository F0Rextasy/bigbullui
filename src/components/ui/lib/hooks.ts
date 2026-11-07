"use client";

import * as React from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const match = window.matchMedia(query);
    setMatches(match.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    match.addEventListener("change", listener);
    return () => match.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (v: T | ((p: T) => T)) => void] {
  const [state, setState] = React.useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  const setValue = (value: T | ((p: T) => T)) => {
    try {
      const next = typeof value === "function" ? (value as (p: T) => T)(state) : value;
      setState(next);
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Ignore errors in SSR / private browsing
    }
  };

  return [state, setValue];
}

export function useIntersection(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit,
): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const root = options?.root;
  const rootMargin = options?.rootMargin;
  const threshold = options?.threshold;

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsIntersecting(entries[0].isIntersecting);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold]);

  return isIntersecting;
}

export function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;

  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handlerRef.current();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}

export function useCopy(timeout = 2000): { copied: boolean; copy: (text: string) => void } {
  const [copied, setCopied] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = React.useCallback(
    (text: string) => {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          void navigator.clipboard.writeText(text).catch(() => {});
        } else if (typeof document !== "undefined") {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        setCopied(true);
      } catch {
        // ignored
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), timeout);
    },
    [timeout],
  );

  return { copied, copy };
}

export function useHotkey(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options?: { meta?: boolean; shift?: boolean; alt?: boolean },
) {
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;
  const meta = options?.meta;
  const shift = options?.shift;
  const alt = options?.alt;

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (isEditable && !meta && !alt) {
        return;
      }

      const conditions: boolean[] = [];
      if (meta) conditions.push(event.metaKey || event.ctrlKey);
      if (shift) conditions.push(event.shiftKey);
      if (alt) conditions.push(event.altKey);

      const allMet = conditions.length === 0 || conditions.every((c) => c);
      if (allMet && event.key.toLowerCase() === key.toLowerCase()) {
        handlerRef.current(event);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [key, meta, shift, alt]);
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState<T>(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
