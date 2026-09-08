import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const setsDir = path.join(rootDir, "packages/icons/src");

function parseEntries(source) {
  const entries = [];
  const re = /["']?([a-z0-9-]+)["']?\s*:/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    let i = re.lastIndex;
    while (i < source.length && /\s/.test(source[i])) i++;
    if (source[i] !== "(" && source[i] !== "<" && !/[A-Za-z]/.test(source[i])) continue;
    let depth = 0;
    let inStr = null;
    let start = i;
    for (; i < source.length; i++) {
      const ch = source[i];
      if (inStr) {
        if (ch === inStr && source[i - 1] !== "\\") inStr = null;
        continue;
      }
      if (ch === '"' || ch === "'") inStr = ch;
      else if (ch === "(" || ch === "<") depth++;
      else if (ch === ")" || ch === ">") {
        depth--;
        if (depth === 0) {
          let j = i + 1;
          while (j < source.length && /\s/.test(source[j])) j++;
          if (source[j] === "," || source[j] === "}") {
            entries.push({ name: m[1], value: source.slice(start, i + 1).trim() });
            re.lastIndex = source[j] === "," ? j + 1 : j;
          }
          break;
        }
      }
    }
  }
  return entries;
}

const all = [];
for (const file of ["set-core.tsx", "set-a.tsx", "set-b.tsx", "set-c.tsx", "set-d.tsx", "set-e.tsx"]) {
  const src = fs.readFileSync(path.join(setsDir, file), "utf8");
  all.push(...parseEntries(src));
}
const seen = new Set();
const dupes = all.filter((e) => (seen.has(e.name) ? true : (seen.add(e.name), false))).map((e) => e.name);
if (dupes.length > 0) {
  console.error("sync-icons: duplicate names " + JSON.stringify(dupes));
  process.exit(1);
}
console.log(`sync-icons: ${all.length} icons parsed`);

const typeUnion = all.map((e) => `  | "${e.name}"`).join("\n");
const paths = all.map((e) => `  ${JSON.stringify(e.name)}: ${e.value},`).join("\n");

const out = `"use client";

import * as React from "react";

export type NavIconName =
${typeUnion};

const PATHS: Record<NavIconName, React.ReactNode> = {
${paths}
};

export const NAV_ICON_NAMES: NavIconName[] = [
${all.map((e) => `  "${e.name}",`).join("\n")}
];

const NAV_ANIMATION_CSS = \`@keyframes navDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } } @keyframes navPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.75; } } @keyframes navSpin { to { transform: rotate(360deg); } } @media (prefers-reduced-motion: no-preference) { .nav-draw { stroke-dasharray: 1; animation: navDraw 0.55s ease-out backwards; } .nav-pulse { transform-origin: center; transform-box: fill-box; animation: navPulse 1.6s ease-in-out infinite; } .nav-spin { transform-origin: center; transform-box: fill-box; animation: navSpin 1.4s linear infinite; } }\`;

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

export function NavIcon({ name, size = 15, animated = true, animation = "draw", ...props }: NavIconProps) {
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
      <g pathLength={1} className={cls}>
        {PATHS[name]}
      </g>
    </svg>
  );
}
`;
fs.writeFileSync(path.join(rootDir, "src/components/site/nav-icons.tsx"), out);
console.log("sync-icons: nav-icons.tsx regenerated");
