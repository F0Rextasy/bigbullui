"use client";

import * as React from "react";

const STORAGE_KEY = "bigbull-theme";
const THEME_EVENT = "bigbull-theme-change";

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(THEME_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(THEME_EVENT, handler);
  };
}

function getThemeSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return (
      document.documentElement.classList.contains("dark") ||
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  } catch {
    return document.documentElement.classList.contains("dark");
  }
}

export function ThemeToggle() {
  const dark = React.useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Ignore storage failures in restricted contexts
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      className="cursor-pointer rounded-md border border-dashed border-border bg-transparent px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {dark ? "Light theme" : "Dark theme"}
    </button>
  );
}
