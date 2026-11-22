"use client";

import * as React from "react";

const KEY = "bigbullui-seen";
const EVENT = "bigbullui-seen-changed";

const EMPTY_SEEN = new Set<string>();
let cachedRaw: string | null = null;
let cachedSet: Set<string> = EMPTY_SEEN;

export function getSeen(): Set<string> {
  if (typeof window === "undefined") return EMPTY_SEEN;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      cachedRaw = null;
      cachedSet = EMPTY_SEEN;
      return EMPTY_SEEN;
    }
    if (raw === cachedRaw) return cachedSet;
    const parsed: unknown = JSON.parse(raw);
    const next = Array.isArray(parsed)
      ? new Set(parsed.filter((v): v is string => typeof v === "string"))
      : EMPTY_SEEN;
    cachedRaw = raw;
    cachedSet = next;
    return next;
  } catch {
    return EMPTY_SEEN;
  }
}

export function markSeen(name: string) {
  if (typeof window === "undefined") return;
  try {
    const seen = getSeen();
    if (seen.has(name)) return;
    const next = new Set(seen);
    next.add(name);
    const serialized = JSON.stringify([...next]);
    window.localStorage.setItem(KEY, serialized);
    cachedRaw = serialized;
    cachedSet = next;
    window.dispatchEvent(new Event(EVENT));
  } catch {
    return;
  }
}

function subscribeSeen(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
}

export function useSeen(): Set<string> {
  return React.useSyncExternalStore(subscribeSeen, getSeen, () => EMPTY_SEEN);
}
