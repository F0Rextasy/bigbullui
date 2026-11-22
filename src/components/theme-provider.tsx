"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "bigbullui-theme";
const ThemeCtx = React.createContext<{ theme: Theme; resolved: "light" | "dark"; setTheme: (t: Theme) => void } | null>(null);

function systemDark(): boolean {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

function readStoredTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    // Storage may be blocked in sandboxed iframes or strict privacy modes
  }
  return "system";
}

function writeStoredTheme(next: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore storage write errors so theme toggling keeps working in memory
  }
}

function applyDomTheme(resolved: "light" | "dark"): void {
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }
}

function subscribeTheme(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  let media: MediaQueryList | null = null;
  try {
    media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", onChange);
  } catch {
    media = null;
  }
  window.addEventListener("bigbullui-theme-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    media?.removeEventListener("change", onChange);
    window.removeEventListener("bigbullui-theme-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getResolvedThemeSnapshot(): "light" | "dark" {
  const t = readStoredTheme();
  return t === "system" ? (systemDark() ? "dark" : "light") : t;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useSyncExternalStore(
    subscribeTheme,
    readStoredTheme,
    () => "system" as Theme
  );
  const resolved = React.useSyncExternalStore(
    subscribeTheme,
    getResolvedThemeSnapshot,
    () => "light" as const
  );

  React.useEffect(() => {
    applyDomTheme(resolved);
  }, [resolved]);

  const setTheme = React.useCallback((next: Theme) => {
    writeStoredTheme(next);
    const nextResolved = next === "system" ? (systemDark() ? "dark" : "light") : next;
    applyDomTheme(nextResolved);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("bigbullui-theme-change"));
    }
  }, []);

  return <ThemeCtx.Provider value={{ theme, resolved, setTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
