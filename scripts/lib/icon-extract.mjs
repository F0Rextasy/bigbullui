import fs from "node:fs";
import path from "node:path";

export function toPascal(kebab) {
  return kebab
    .split("-")
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
    .join("");
}

export function toTitle(kebab) {
  return kebab
    .split("-")
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

// Extract `"icon-name": <jsx>` entries from a set-*.tsx source file.
// Values are either single-line (<path ... />) or parenthesised
// fragments ((<> ... </>)). Slicing between consecutive keys avoids
// fragile balanced-JSX parsing.
export function extractIcons(source) {
  const keyRe = /^[ \t]*(?:"([^"]+)"|([A-Za-z][\w-]*))\s*:/gm;
  const keys = [...source.matchAll(keyRe)];
  const entries = [];
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i][1] ?? keys[i][2];
    const valueStart = keys[i].index + keys[i][0].length;
    const valueEnd = i + 1 < keys.length ? keys[i + 1].index : source.lastIndexOf("}");
    let raw = source.slice(valueStart, valueEnd).trim();
    raw = raw.replace(/,\s*$/, "").trim();
    if (raw.startsWith("(") && raw.endsWith(")")) {
      raw = raw.slice(1, -1).trim();
    }
    let inner = raw;
    if (inner.startsWith("<>") && inner.endsWith("</>")) {
      inner = inner.slice(2, -3).trim();
    }
    if (!inner.startsWith("<")) continue;
    entries.push({ name, inner });
  }
  return entries;
}

export function collectAllIcons(iconsDir) {
  const setFiles = fs
    .readdirSync(iconsDir)
    .filter((f) => /^set-.*\.tsx$/.test(f))
    .sort();
  if (setFiles.length === 0) {
    throw new Error(`No set-*.tsx files found in ${iconsDir}`);
  }
  const icons = new Map();
  for (const file of setFiles) {
    const source = fs.readFileSync(path.join(iconsDir, file), "utf8");
    for (const { name, inner } of extractIcons(source)) {
      if (!icons.has(name)) icons.set(name, inner);
    }
  }
  return icons;
}
