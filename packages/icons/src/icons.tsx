import * as React from "react";
import { SET_CORE_ICONS } from "./set-core";
import { SET_A_ICONS } from "./set-a";
import { SET_B_ICONS } from "./set-b";
import { SET_C_ICONS } from "./set-c";
import { SET_D_ICONS } from "./set-d";
import { SET_E_ICONS } from "./set-e";

export const STAMP_ICONS = {
  ...SET_CORE_ICONS,
  ...SET_A_ICONS,
  ...SET_B_ICONS,
  ...SET_C_ICONS,
  ...SET_D_ICONS,
  ...SET_E_ICONS,
};

export type StampIconName = keyof typeof STAMP_ICONS;

export type StampAnimation = "draw" | "pulse" | "spin" | "none";

export interface StampIconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "name"> {
  name: StampIconName;
  size?: number;
  animated?: boolean;
  animation?: StampAnimation;
}

const ANIMATION_CSS = `@keyframes stampDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } } @keyframes stampPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.75; } } @keyframes stampSpin { to { transform: rotate(360deg); } } @media (prefers-reduced-motion: no-preference) { .stamp-draw { stroke-dasharray: 1; animation: stampDraw 0.55s ease-out backwards; } .stamp-pulse { transform-origin: center; transform-box: fill-box; animation: stampPulse 1.6s ease-in-out infinite; } .stamp-spin { transform-origin: center; transform-box: fill-box; animation: stampSpin 1.4s linear infinite; } }`;

let stampStylesInjected = false;

function useStampStyles(mode: StampAnimation) {
  React.useEffect(() => {
    if (mode === "none" || stampStylesInjected) return;
    if (typeof document === "undefined") return;
    if (document.getElementById("stamp-icon-animations")) {
      stampStylesInjected = true;
      return;
    }
    const el = document.createElement("style");
    el.id = "stamp-icon-animations";
    el.textContent = ANIMATION_CSS;
    document.head.appendChild(el);
    stampStylesInjected = true;
  }, [mode]);
}

export function StampIcon({ name, size = 20, animated = true, animation = "draw", ...props }: StampIconProps) {
  const mode: StampAnimation = animated ? animation : "none";
  const cls = mode === "draw" ? "stamp-draw" : mode === "pulse" ? "stamp-pulse" : mode === "spin" ? "stamp-spin" : undefined;
  useStampStyles(mode);
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
      <g pathLength={1} className={cls}>
        {STAMP_ICONS[name]}
      </g>
    </svg>
  );
}
