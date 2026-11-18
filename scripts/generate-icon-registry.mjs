import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectAllIcons, toPascal, toTitle } from "./lib/icon-extract.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const iconsDir = path.join(rootDir, "packages", "icons", "src");
const outDir = path.join(rootDir, "public", "r", "icons");

function buildComponentSource(iconName, innerMarkup) {
  const componentName = `${toPascal(iconName)}Icon`;
  return `import * as React from "react";

export type ${componentName}Props = React.SVGProps<SVGSVGElement> & { size?: number };

export function ${componentName}({ size = 20, ...props }: ${componentName}Props) {
  const isDecorative = props["aria-hidden"] ?? !(props["aria-label"] || props["aria-labelledby"]);
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
      ${innerMarkup}
    </svg>
  );
}
`;
}

const icons = collectAllIcons(iconsDir);
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
