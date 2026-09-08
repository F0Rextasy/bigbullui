import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const iconsDir = path.join(rootDir, "packages", "icons", "src");
const outDir = path.join(rootDir, "public", "r", "icons");

function toPascal(kebab) {
  return kebab
    .split("-")
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
    .join("");
}

function toTitle(kebab) {
  return kebab
    .split("-")
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

function buildComponentSource(iconName, innerMarkup) {
  const componentName = `${toPascal(iconName)}Icon`;
  return `import * as React from "react";

export type ${componentName}Props = React.SVGProps<SVGSVGElement> & { size?: number };

export function ${componentName}({ size = 20, ...props }: ${componentName}Props) {
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
      ${innerMarkup}
    </svg>
  );
}
`;
}

// Extract `"icon-name": <jsx>` entries from a set-*.tsx source file.
// Values are either single-line (<path ... />) or parenthesised
// fragments ((<> ... </>)). Slicing between consecutive keys avoids
// fragile balanced-JSX parsing.
function extractIcons(source) {
  // Keys sit at line starts: bare identifiers in set-core.tsx
  // (home:) and quoted kebab names elsewhere ("arrow-up":).
  const keyRe = /^[ \t]*(?:"([^"]+)"|([A-Za-z][\w-]*))\s*:/gm;
  const keys = [...source.matchAll(keyRe)];
  const entries = [];
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i][1] ?? keys[i][2];
    const valueStart = keys[i].index + keys[i][0].length;
    const valueEnd = i + 1 < keys.length ? keys[i + 1].index : source.lastIndexOf("};");
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

const setFiles = fs
  .readdirSync(iconsDir)
  .filter((f) => /^set-.*\.tsx$/.test(f))
  .sort();

if (setFiles.length === 0) {
  console.error("generate-icon-registry: no packages/icons/src/set-*.tsx files found");
  process.exit(1);
}

const icons = new Map();
for (const file of setFiles) {
  const source = fs.readFileSync(path.join(iconsDir, file), "utf8");
  for (const { name, inner } of extractIcons(source)) {
    if (icons.has(name)) {
      console.warn(`generate-icon-registry: duplicate icon "${name}" in ${file}, keeping first`);
      continue;
    }
    icons.set(name, inner);
  }
}

fs.mkdirSync(outDir, { recursive: true });

let written = 0;
for (const [iconName, inner] of icons) {
  const slug = `icon-${iconName}`;
  const item = {
    name: slug,
    title: toTitle(iconName),
    type: "registry:ui",
    files: [
      {
        path: `src/components/ui/${slug}.tsx`,
        type: "registry:ui",
        content: buildComponentSource(iconName, inner),
      },
    ],
  };
  fs.writeFileSync(path.join(outDir, `${iconName}.json`), JSON.stringify(item));
  written += 1;
}

console.log(`generate-icon-registry: ${written} icons in public/r/icons/`);
