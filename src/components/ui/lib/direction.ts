"use client";

import * as React from "react";

export type TextDirection = "ltr" | "rtl";
export type Direction = TextDirection;

const DirectionContext = React.createContext<TextDirection | undefined>(undefined);

export interface DirectionProviderProps {
  dir: TextDirection;
  children?: React.ReactNode;
}

/** Provides explicit reading direction ("ltr" or "rtl") to descendant Ticket Stub components. */
export function DirectionProvider({ dir, children }: DirectionProviderProps) {
  return React.createElement(DirectionContext.Provider, { value: dir }, children);
}

/** Resolves text direction from explicit prop, DirectionProvider, or document root. */
export function useDirection(explicitDir?: TextDirection): TextDirection {
  const ctxDir = React.useContext(DirectionContext);
  if (explicitDir) return explicitDir;
  if (ctxDir) return ctxDir;
  if (typeof document !== "undefined" && document.documentElement.dir === "rtl") {
    return "rtl";
  }
  return "ltr";
}
