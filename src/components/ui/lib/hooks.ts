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

    match.addListener(listener);
    return () => match.removeListener(listener);
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

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsIntersecting(entries[0].isIntersecting);
      },
      options,
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

export function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export function useCopy(): { copied: boolean; copy: (text: string) => void } {
  const [copied, setCopied] = React.useState(false);

  const copy = (text: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        void navigator.clipboard.writeText(text);
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
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copy };
}

export function useHotkey(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options?: { meta?: boolean; shift?: boolean; alt?: boolean },
) {
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const conditions: boolean[] = [];
      if (options?.meta) conditions.push(event.metaKey);
      if (options?.shift) conditions.push(event.shiftKey);
      if (options?.alt) conditions.push(event.altKey);

      const allMet = conditions.length === 0 || conditions.every((c) => c);
      if (allMet && event.key.toLowerCase() === key.toLowerCase()) {
        handler(event);
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [key, handler, options]);
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState<T>(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}