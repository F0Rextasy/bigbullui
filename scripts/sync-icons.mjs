import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Derives src/components/site/icon-data.tsx metadata (NavIconName union,
// NAV_ICON_NAMES, NAV_ICON_CATEGORIES, NAV_CATEGORIES) from packages/icons/src/set-*.tsx
// while importing ICON_PATHS directly from packages/icons/src/icons (single source of truth).
// Does NOT touch src/components/site/nav-icons.tsx.
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
    const start = i;
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

const SET_CATEGORIES = {
  "set-core.tsx": "Essentials",
  "set-a.tsx": "Arrows & Direction",
  "set-b.tsx": "Media & Playback",
  "set-c.tsx": "Files & Office",
  "set-d.tsx": "Commerce & Shopping",
  "set-e.tsx": "Weather & Nature",
};

const SYSTEM_SIGNAL_ICONS = new Set([
  "check-mark", "check-circle", "cross-mark", "cross-circle", "info-mark", "info-circle",
  "warning-triangle", "help-mark", "help-circle", "plus-mark", "plus-circle",
  "minus-mark", "minus-circle", "asterisk", "hash-mark", "at-sign", "percent-mark",
  "plug-power", "bulb-glow", "battery-empty", "battery-half", "battery-full",
  "wifi-arcs", "wifi-off", "bluetooth-mark", "airplane-mode", "signal-bars",
  "satellite-dish", "broadcast-tower",
]);

const all = [];
for (const file of ["set-core.tsx", "set-a.tsx", "set-b.tsx", "set-c.tsx", "set-d.tsx", "set-e.tsx"]) {
  const src = fs.readFileSync(path.join(setsDir, file), "utf8");
  for (const e of parseEntries(src)) {
    const category = SYSTEM_SIGNAL_ICONS.has(e.name) ? "System & Signals" : SET_CATEGORIES[file];
    all.push({ ...e, category });
  }
}
const seen = new Set();
const dupes = all.filter((e) => (seen.has(e.name) ? true : (seen.add(e.name), false))).map((e) => e.name);
if (dupes.length > 0) {
  console.error("sync-icons: duplicate names " + JSON.stringify(dupes));
  process.exit(1);
}
console.log(`sync-icons: ${all.length} icons parsed`);

const typeUnion = all.map((e) => `  | "${e.name}"`).join("\n");

const dataOut = `import * as React from "react";
import { STAMP_ICONS } from "../../../packages/icons/src/icons";

export type NavIconName =
${typeUnion};

export const ICON_PATHS: Record<NavIconName, React.ReactNode> = STAMP_ICONS;

export const NAV_ICON_NAMES: NavIconName[] = [
${all.map((e) => `  "${e.name}",`).join("\n")}
];

export const NAV_ICON_CATEGORIES: Record<string, string> = {
${all.map((e) => `  ${JSON.stringify(e.name)}: ${JSON.stringify(e.category)},`).join("\n")}
};

export const NAV_CATEGORIES: { name: string; count: number }[] = [
${Object.entries(all.reduce((acc, e) => { acc[e.category] = (acc[e.category] ?? 0) + 1; return acc; }, {})).map(([name, count]) => `  { name: ${JSON.stringify(name)}, count: ${count} },`).join("\n")}
];
`;
const outPath = path.join(rootDir, "src/components/site/icon-data.tsx");
if (process.argv.includes("--check")) {
  const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8").replace(/\r\n/g, "\n") : "";
  if (existing !== dataOut.replace(/\r\n/g, "\n")) {
    console.error("sync-icons --check: src/components/site/icon-data.tsx is out of date — run node scripts/sync-icons.mjs");
    process.exit(1);
  }
  console.log(`sync-icons --check: OK (${all.length} icons)`);
} else {
  fs.writeFileSync(outPath, dataOut);
  console.log("sync-icons: icon-data.tsx regenerated (referencing STAMP_ICONS)");
}
