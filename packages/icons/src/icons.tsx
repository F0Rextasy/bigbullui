import * as React from "react";
import { SET_CORE_ICONS } from "./set-core";
import { SET_A_ICONS } from "./set-a";
import { SET_B_ICONS } from "./set-b";
import { SET_C_ICONS } from "./set-c";
import { SET_D_ICONS } from "./set-d";
import { SET_E_ICONS } from "./set-e";

export const STAMP_ICONS = /* @__PURE__ */ (() => ({
  ...SET_CORE_ICONS,
  ...SET_A_ICONS,
  ...SET_B_ICONS,
  ...SET_C_ICONS,
  ...SET_D_ICONS,
  ...SET_E_ICONS,
}))();

export type StampIconName = keyof typeof STAMP_ICONS;

export const STAMP_ICON_NAMES = /* @__PURE__ */ (() => Object.keys(STAMP_ICONS) as StampIconName[])();

export type StampAnimation = "draw" | "pulse" | "spin" | "none";

export interface StampIconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "name"> {
  name: StampIconName;
  size?: number;
  animated?: boolean;
  animation?: StampAnimation;
}

const ANIMATION_CSS = `@keyframes stampDraw { to { stroke-dashoffset: 0; } } @keyframes stampPress { 0% { transform: scale(0.92); opacity: 0.4; } 60% { transform: scale(1.04); opacity: 1; } 100% { transform: scale(1); opacity: 1; } } @keyframes stampSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @media (prefers-reduced-motion: no-preference) { .stamp-pulse { transform-origin: center; transform-box: fill-box; animation: stampPress 520ms cubic-bezier(0.16, 1, 0.3, 1) both; } .stamp-spin { transform-origin: center; transform-box: fill-box; animation: stampSpin 620ms cubic-bezier(0.16, 1, 0.3, 1) both; } }`;

const injectedRoots = new WeakSet<Node>();

function useStampStyles(mode: StampAnimation, groupRef: React.RefObject<SVGGElement | null>) {
  React.useEffect(() => {
    if (mode === "none" || typeof document === "undefined") return;
    try {
      const root = groupRef.current?.getRootNode?.() ?? document;
      if (injectedRoots.has(root)) return;
      const container = root instanceof ShadowRoot ? root : document.head;
      if (!container) return;
      const lookup = root instanceof ShadowRoot || root instanceof Document ? root : document;
      if (lookup.getElementById("stamp-icon-animations")) {
        injectedRoots.add(root);
        return;
      }
      const el = document.createElement("style");
      el.id = "stamp-icon-animations";
      el.textContent = ANIMATION_CSS;
      container.appendChild(el);
      injectedRoots.add(root);
    } catch {
      // Ignore synthetic/restricted DOM roots
    }
  }, [mode, groupRef]);
}

export function StampIcon({ name, size = 20, animated = true, animation = "draw", ...props }: StampIconProps) {
  const mode: StampAnimation = animated ? animation : "none";
  const cls = mode === "draw" ? "stamp-draw" : mode === "pulse" ? "stamp-pulse" : mode === "spin" ? "stamp-spin" : undefined;
  const groupRef = React.useRef<SVGGElement>(null);
  useStampStyles(mode, groupRef);

  React.useEffect(() => {
    const group = groupRef.current;
    if (!group || mode !== "draw") return;
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    ) {
      return;
    }
    const children = Array.from(group.children).filter(
      (el): el is SVGGeometryElement => typeof (el as SVGGeometryElement).getTotalLength === "function"
    );
    const applied: SVGGeometryElement[] = [];
    let delay = 0;
    for (const el of children) {
      let length = 0;
      try {
        length = el.getTotalLength();
      } catch {
        continue;
      }
      if (!Number.isFinite(length) || length <= 0) continue;
      const duration = Math.min(1800, Math.max(500, Math.round(length * 14)));
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
      el.style.animation = `stampDraw ${duration}ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms both`;
      applied.push(el);
      delay += duration + 60;
    }
    return () => {
      for (const el of applied) {
        el.style.strokeDasharray = "";
        el.style.strokeDashoffset = "";
        el.style.animation = "";
      }
    };
  }, [mode, name]);

  const isDecorative = props["aria-hidden"] ?? !(props["aria-label"] || props["aria-labelledby"]);
  const iconNode = Object.hasOwn(STAMP_ICONS, name) ? STAMP_ICONS[name] : null;

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
      aria-hidden={isDecorative ? true : undefined}
      {...props}
    >
      <g ref={groupRef} className={cls}>
        {iconNode}
      </g>
    </svg>
  );
}
