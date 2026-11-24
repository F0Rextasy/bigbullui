"use client";

import * as React from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return () => {};
      }
      const match = window.matchMedia(query);
      match.addEventListener("change", onStoreChange);
      return () => match.removeEventListener("change", onStoreChange);
    },
    [query],
  );
  const getSnapshot = React.useCallback(
    () =>
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia(query).matches
        : false,
    [query],
  );
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}

const localStorageListeners = new Map<string, Set<() => void>>();
const localStorageCache = new Map<string, { raw: string | null; parsed: unknown }>();

function emitLocalStorageChange(key: string) {
  const subs = localStorageListeners.get(key);
  if (!subs) return;
  for (const cb of subs) cb();
}

export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (v: T | ((p: T) => T)) => void] {
  const initialSerialized = React.useMemo(() => {
    try {
      return JSON.stringify(initial);
    } catch {
      return "";
    }
  }, [initial]);

  const stableInitial = React.useMemo(() => {
    try {
      return initialSerialized ? (JSON.parse(initialSerialized) as T) : initial;
    } catch {
      return initial;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on serialized value for referential stability
  }, [initialSerialized]);

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      let subs = localStorageListeners.get(key);
      if (!subs) {
        subs = new Set();
        localStorageListeners.set(key, subs);
      }
      subs.add(onStoreChange);

      const onStorage = (e: StorageEvent) => {
        if (e.key === null || e.key === key) {
          localStorageCache.delete(key);
          onStoreChange();
        }
      };
      if (typeof window !== "undefined") {
        window.addEventListener("storage", onStorage);
      }
      return () => {
        subs?.delete(onStoreChange);
        if (subs && subs.size === 0) localStorageListeners.delete(key);
        if (typeof window !== "undefined") {
          window.removeEventListener("storage", onStorage);
        }
      };
    },
    [key],
  );

  const getSnapshot = React.useCallback((): T => {
    if (typeof window === "undefined") return stableInitial;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return stableInitial;
      const cached = localStorageCache.get(key);
      if (cached && cached.raw === raw) return cached.parsed as T;
      const parsed = JSON.parse(raw) as T;
      localStorageCache.set(key, { raw, parsed });
      return parsed;
    } catch {
      return stableInitial;
    }
  }, [key, stableInitial]);

  const state = React.useSyncExternalStore(subscribe, getSnapshot, () => stableInitial);

  const stateRef = React.useRef(state);
  React.useLayoutEffect(() => {
    stateRef.current = state;
  });

  const setValue = React.useCallback(
    (value: T | ((p: T) => T)) => {
      const next = typeof value === "function" ? (value as (p: T) => T)(stateRef.current) : value;
      try {
        const raw = JSON.stringify(next);
        window.localStorage.setItem(key, raw);
        localStorageCache.set(key, { raw, parsed: next });
      } catch {
        // Ignore errors in SSR / private browsing
      }
      emitLocalStorageChange(key);
    },
    [key],
  );

  return [state, setValue];
}

export function useIntersection(
  ref: React.RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const root = options?.root;
  const rootMargin = options?.rootMargin;
  const threshold = options?.threshold;

  React.useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;

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

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) {
  const handlerRef = React.useRef(handler);
  React.useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const listener = (event: PointerEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handlerRef.current();
    };

    document.addEventListener("pointerdown", listener);
    return () => {
      document.removeEventListener("pointerdown", listener);
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
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.top = "0";
          textarea.style.left = "-9999px";
          textarea.style.opacity = "0";
          textarea.style.pointerEvents = "none";
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

export interface UseHotkeyOptions {
  /** Matches Cmd on macOS or Ctrl on Windows/Linux unless `ctrl` is specified separately. */
  meta?: boolean;
  /** Explicitly require Ctrl key (distinguishes Ctrl from Meta when set). */
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  enabled?: boolean;
}

export function useHotkey(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options?: UseHotkeyOptions,
) {
  const handlerRef = React.useRef(handler);
  React.useLayoutEffect(() => {
    handlerRef.current = handler;
  });
  const meta = options?.meta;
  const ctrl = options?.ctrl;
  const shift = options?.shift;
  const alt = Boolean(options?.alt);
  const enabled = options?.enabled ?? true;

  React.useEffect(() => {
    if (!enabled || typeof document === "undefined") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing) return;
      const target = event.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (isEditable && !meta && !ctrl && !alt) {
        return;
      }

      if (ctrl !== undefined) {
        if (event.ctrlKey !== ctrl) return;
        if (Boolean(meta) !== event.metaKey) return;
      } else if (meta) {
        if (!(event.metaKey || event.ctrlKey)) return;
      } else if (event.metaKey || event.ctrlKey) {
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
  }, [key, meta, ctrl, shift, alt, enabled]);
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState<T>(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
