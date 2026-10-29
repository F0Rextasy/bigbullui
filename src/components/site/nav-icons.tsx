"use client";
// Site-chrome icon palette (Ticket Stub): single-file ownership.
// Spec; 24x24 viewBox, fill none, stroke currentColor, strokeWidth 1.8,
// round caps + joins, default sizes 12 (inline) / 15 (nav) / 17 (feature).
// Per-glyph strokeWidth inside ICON_PATHS is optical correction, not drift.
// Brand glyphs (Star, logo) and functional marks (chevrons, hamburger)
// keep their own files. Footer stays icon-free by design.

import * as React from "react";
import { ICON_PATHS, type NavIconName } from "./icon-data";

export type { NavIconName };
export { NAV_ICON_NAMES, NAV_ICON_CATEGORIES, NAV_CATEGORIES } from "./icon-data";

const NAV_ANIMATION_CSS = `@keyframes navDraw { from { stroke-dashoffset: 240; } to { stroke-dashoffset: 0; } } @keyframes navPress { 0% { transform: scale(0.92); opacity: 0.4; } 60% { transform: scale(1.04); opacity: 1; } 100% { transform: scale(1); opacity: 1; } } @keyframes navSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @media (prefers-reduced-motion: no-preference) { .nav-draw > * { stroke-dasharray: 240; animation: navDraw 640ms cubic-bezier(0.65, 0, 0.35, 1) both; } .nav-draw > *:nth-child(2) { animation-delay: 130ms; } .nav-draw > *:nth-child(3) { animation-delay: 260ms; } .nav-draw > *:nth-child(4) { animation-delay: 390ms; } .nav-draw > *:nth-child(5) { animation-delay: 520ms; } .nav-draw > *:nth-child(6) { animation-delay: 650ms; } .nav-pulse { transform-origin: center; transform-box: fill-box; animation: navPress 520ms cubic-bezier(0.16, 1, 0.3, 1) both; } .nav-spin { transform-origin: center; transform-box: fill-box; animation: navSpin 620ms cubic-bezier(0.16, 1, 0.3, 1) both; } }`;

let navStylesInjected = false;

function useNavStyles(mode: string) {
  React.useEffect(() => {
    if (mode === "none" || navStylesInjected) return;
    if (typeof document === "undefined") return;
    if (document.getElementById("nav-icon-animations")) {
      navStylesInjected = true;
      return;
    }
    const el = document.createElement("style");
    el.id = "nav-icon-animations";
    el.textContent = NAV_ANIMATION_CSS;
    document.head.appendChild(el);
    navStylesInjected = true;
  }, [mode]);
}

export interface NavIconProps extends React.SVGAttributes<SVGSVGElement> {
  name: NavIconName;
  size?: number;
  animated?: boolean;
  animation?: "draw" | "pulse" | "spin" | "none";
}

export function NavIcon({ name, size = 15, animated = false, animation = "draw", ...props }: NavIconProps) {
  const mode = animated ? animation : "none";
  const cls = mode === "draw" ? "nav-draw" : mode === "pulse" ? "nav-pulse" : mode === "spin" ? "nav-spin" : undefined;
  useNavStyles(mode);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <g className={cls}>
        {ICON_PATHS[name]}
      </g>
    </svg>
  );
}
