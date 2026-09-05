"use client";

import * as React from "react";

const KEY = "bigbullui-seen";
const EVENT = "bigbullui-seen-changed";

export function getSeen(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed.filter((v): v is string => typeof v === "string")) : new Set();
  } catch {
    return new Set();
  }
}

export function markSeen(name: string) {
  if (typeof window === "undefined") return;
  try {
    const seen = getSeen();
    if (seen.has(name)) return;
    seen.add(name);
    window.localStorage.setItem(KEY, JSON.stringify([...seen]));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    return;
  }
}

export function useSeen(): Set<string> {
  const [seen, setSeen] = React.useState<Set<string>>(new Set());
  React.useEffect(() => {
    setSeen(getSeen());
    const onChange = () => setSeen(getSeen());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  return seen;
}
