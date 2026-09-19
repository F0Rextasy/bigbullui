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

const UTILS_SOURCE = fs.readFileSync(path.join(uiDir, "lib", "utils.ts"), "utf8");
const siblingDeps = {};

for (const slug of slugs) {
  const source = fs.readFileSync(path.join(uiDir, `${slug}.tsx`), "utf8");
  const deps = new Set();
  for (const m of source.matchAll(/from\s+["']\.\/([a-z0-9-]+)["']/g)) {
    if (m[1] !== "lib") deps.add(m[1]);
  }
  if (deps.size > 0) siblingDeps[slug] = [...deps].sort();
}

// Shared cn() helper as a registry:lib item so shadcn CLI installs it automatically.
// Every ui file imports exactly one of: "./lib/utils" (656 files) or nothing (form-validation).
// Target is @ui/lib/utils.ts (NOT @lib): the CLI only rewrites "@/..." imports, so the
// relative "./lib/utils" import in installed files must keep resolving next to the component.
fs.writeFileSync(
  path.join(outDir, "utils.json"),
  JSON.stringify({
    name: "utils",
    title: "Utils",
    type: "registry:lib",
    files: [{ path: "src/components/ui/lib/utils.ts", type: "registry:lib", target: "@ui/lib/utils.ts", content: UTILS_SOURCE }],
  })
);

let written = 0;
for (const slug of slugs) {
  const source = fs.readFileSync(path.join(uiDir, `${slug}.tsx`), "utf8");
  const item = {
    name: slug,
    title: titles[slug] ?? slug,
    type: "registry:ui",
    files: [
      { path: `src/components/ui/${slug}.tsx`, type: "registry:ui", target: `@ui/${slug}.tsx`, content: source },
      ...(siblingDeps[slug] ?? []).map((dep) => ({
        path: `src/components/ui/${dep}.tsx`,
        type: "registry:ui",
        target: `@ui/${dep}.tsx`,
        content: fs.readFileSync(path.join(uiDir, `${dep}.tsx`), "utf8"),
      })),
    ],
  };
  if (source.includes('"./lib/utils"')) item.registryDependencies = ["https://ui.bigbullapp.com/r/utils.json"];
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(item));
  written += 1;
}
console.log(`generate-registry-json: ${written} items in public/r/`);

// Block registry entries (shadcn-compatible): block source + referenced ui sources.
const blkDir = path.join(rootDir, "src", "components", "blocks");
const toTitle = (slug) => slug.split("-").map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
const blockSlugList = fs.existsSync(blkDir) ? fs.readdirSync(blkDir).filter((f) => f.endsWith(".tsx")).map((f) => f.replace(/\.tsx$/, "")).sort() : [];
let blockCount = 0;
for (const slug of blockSlugList) {
  const blockSrc = fs.readFileSync(path.join(blkDir, `${slug}.tsx`), "utf8");
  const files = [{ path: `src/components/blocks/${slug}.tsx`, type: "registry:block", target: `@components/${slug}.tsx`, content: blockSrc }];
  const uiDeps = new Set();
  for (const dep of blockSrc.matchAll(/from\s+["']\.\.\/ui\/([a-z0-9-]+)["']/g)) uiDeps.add(dep[1]);
  const queue = [...uiDeps];
  while (queue.length > 0) {
    const dep = queue.shift();
    if (files.some((f) => f.path.endsWith(`/${dep}.tsx`))) continue;
    const depPath = path.join(uiDir, `${dep}.tsx`);
    if (!fs.existsSync(depPath)) continue;
    const depSrc = fs.readFileSync(depPath, "utf8");
    files.push({ path: `src/components/ui/${dep}.tsx`, type: "registry:ui", target: `@ui/${dep}.tsx`, content: depSrc });
    for (const m of depSrc.matchAll(/from\s+["']\.\/([a-z0-9-]+)["']/g)) {
      if (m[1] !== "lib") queue.push(m[1]);
    }
  }
  const item = { name: slug, title: toTitle(slug), type: "registry:block", files };
  if (files.some((f) => f.content.includes('"./lib/utils"'))) item.registryDependencies = ["https://ui.bigbullapp.com/r/utils.json"];
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(item));
  blockCount += 1;
}
console.log(`generate-registry-json: ${blockCount} blocks in public/r/`);

// Compact indexes for the MCP server and other index consumers.
const metas = [];
for (const m of registry.matchAll(/\{\s*name:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)+)",\s*description:\s*"((?:[^"\\]|\\.)+)",\s*category:\s*"([^"]+)"/g)) {
  metas.push({ name: m[1], title: m[2].replace(/\\"/g, '"'), description: m[3].replace(/\\"/g, '"'), category: m[4] });
}
fs.writeFileSync(path.join(rootDir, "public", "components.json"), JSON.stringify({ updated: new Date().toISOString().slice(0, 10), count: metas.length, components: metas }));
const blockSlugs = blockSlugList;
fs.writeFileSync(path.join(rootDir, "public", "blocks.json"), JSON.stringify({ updated: new Date().toISOString().slice(0, 10), count: blockSlugs.length, blocks: blockSlugs }));
const iconSrc = fs.readFileSync(path.join(rootDir, "src", "components", "site", "icon-data.tsx"), "utf8");
const iconNames = [...iconSrc.matchAll(/^\s*\|\s*"([^"]+)"/gm)].map((m) => m[1]);
fs.writeFileSync(path.join(rootDir, "public", "icons.json"), JSON.stringify({ updated: new Date().toISOString().slice(0, 10), count: iconNames.length, icons: iconNames }));
console.log(`generate-registry-json: indexes components=${metas.length} blocks=${blockSlugs.length} icons=${iconNames.length}`);

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
