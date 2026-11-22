"use client";

import * as React from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const match = window.matchMedia(query);
      match.addEventListener("change", onStoreChange);
      return () => match.removeEventListener("change", onStoreChange);
    },
    [query],
  );
  const getSnapshot = React.useCallback(
    () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false),
    [query],
  );
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (v: T | ((p: T) => T)) => void] {
  const initialRef = React.useRef(initial);
  React.useEffect(() => {
    initialRef.current = initial;
  });
  const [state, setState] = React.useState<T>(initial);

  React.useEffect(() => {
    const id = setTimeout(() => {
      try {
        const stored = localStorage.getItem(key);
        setState(stored !== null ? (JSON.parse(stored) as T) : initialRef.current);
      } catch {
        setState(initialRef.current);
      }
    }, 0);
    return () => clearTimeout(id);
  }, [key]);

  const setValue = React.useCallback(
    (value: T | ((p: T) => T)) => {
      setState((prev) => {
        const next = typeof value === "function" ? (value as (p: T) => T)(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Ignore errors in SSR / private browsing
        }
        return next;
      });
    },
    [key],
  );

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
  React.useEffect(() => {
    handlerRef.current = handler;
  });

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
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const markCopied = React.useCallback(() => {
    if (!mountedRef.current) return;
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (mountedRef.current) setCopied(false);
    }, timeout);
  }, [timeout]);

  const copy = React.useCallback(
    (text: string) => {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
          void navigator.clipboard.writeText(text).then(markCopied, () => {
            if (mountedRef.current) setCopied(false);
          });
        } else if (typeof document !== "undefined") {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          const ok = document.execCommand("copy");
          document.body.removeChild(textarea);
          if (ok) markCopied();
          else setCopied(false);
        }
      } catch {
        setCopied(false);
      }
    },
    [markCopied],
  );

  return { copied, copy };
}

export function useHotkey(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options?: { meta?: boolean; shift?: boolean; alt?: boolean },
) {
  const handlerRef = React.useRef(handler);
  React.useEffect(() => {
    handlerRef.current = handler;
  });
  const meta = Boolean(options?.meta);
  const shift = options?.shift;
  const alt = Boolean(options?.alt);

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

      if (meta ? !(event.metaKey || event.ctrlKey) : event.metaKey || event.ctrlKey) {
        return;
      }
      if (alt !== event.altKey) {
        return;
      }
      if (shift !== undefined && event.shiftKey !== shift) {
        return;
      }

      if (event.key.toLowerCase() === key.toLowerCase()) {
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
