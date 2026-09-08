import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = path.join(rootDir, "src", "components", "ui");
const outDir = path.join(rootDir, "public", "r");
const registry = fs.readFileSync(path.join(rootDir, "src/lib/registry-site.ts"), "utf8");

const titles = {};
for (const m of registry.matchAll(/\{\s*name:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)) {
  titles[m[1]] = m[2];
}

fs.mkdirSync(outDir, { recursive: true });
const slugs = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => f.replace(/\.tsx$/, ""))
  .sort();

let written = 0;
for (const slug of slugs) {
  const source = fs.readFileSync(path.join(uiDir, `${slug}.tsx`), "utf8");
  const item = {
    name: slug,
    title: titles[slug] ?? slug,
    type: "registry:ui",
    files: [{ path: `src/components/ui/${slug}.tsx`, type: "registry:ui", content: source }],
  };
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(item));
  written += 1;
}
console.log(`generate-registry-json: ${written} items in public/r/`);

const cliPath = path.join(rootDir, "bin", "cli.js");
let cli = fs.readFileSync(cliPath, "utf8");
const listLiteral = JSON.stringify(slugs);
const listPattern = /allFiles = \[[^\]]*\];/s;
if (!listPattern.test(cli)) {
  console.log("generate-registry-json: cli.js pattern not found, list NOT synced");
} else if (cli.includes(`allFiles = ${listLiteral};`)) {
  console.log(`generate-registry-json: cli.js offline list already in sync (${slugs.length} slugs)`);
} else {
  const next = cli.replace(listPattern, `allFiles = ${listLiteral};`);
  fs.writeFileSync(cliPath, next);
  console.log(`generate-registry-json: cli.js offline list synced (${slugs.length} slugs)`);
}
