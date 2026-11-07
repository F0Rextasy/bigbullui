import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = path.join(rootDir, "src", "components", "ui");
const outDir = path.join(rootDir, "public", "r");
// Write via temp file + rename: parallel readers (npm test, docs build) never
// see a partially written file mid-run.
function writeJsonAtomic(filePath, value) {
  const tmp = `${filePath}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, JSON.stringify(value));
  fs.renameSync(tmp, filePath);
}
function writeFileAtomic(filePath, data) {
  const tmp = `${filePath}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, data);
  fs.renameSync(tmp, filePath);
}
const registry = fs.readFileSync(path.join(rootDir, "src/lib/registry-site.ts"), "utf8");

const titles = {};
for (const m of registry.matchAll(/\{\s*name:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)) {
  titles[m[1]] = m[2];
}

const catalogItems = [];
for (const m of registry.matchAll(/\{ name: "([^"]+)", title: "([^"]+)", description: "(?:[^"\\]|\\.)*", category: "([^"]+)"(, isNew: true)?/g)) {
  catalogItems.push({ name: m[1], title: m[2], category: m[3], ...(m[4] ? { isNew: true } : {}) });
}
const registryNames = [...registry.matchAll(/\{\s*name:\s*"([^"]+)"/g)].map((m) => m[1]);
const missingCatalog = registryNames.filter((n) => !catalogItems.some((c) => c.name === n));
if (missingCatalog.length > 0) {
  throw new Error(`catalog index missing ${missingCatalog.length} components: ${missingCatalog.slice(0, 10).join(", ")}`);
}
const iconSource = fs.readFileSync(path.join(rootDir, "src/components/site/icon-data.tsx"), "utf8");
const iconBlock = iconSource.match(/export const NAV_ICON_NAMES[^=]*=\s*\[([\s\S]*?)\];/);
const iconCount = iconBlock ? (iconBlock[1].match(/"[a-z0-9-]+"/g) ?? []).length : 0;
const pkgIconDir = path.join(rootDir, "packages", "icons", "src");
const pkgIcons = new Set();
for (const f of fs.readdirSync(pkgIconDir)) {
  if (!f.endsWith(".tsx") || f === "icons.tsx") continue;
  const src = fs.readFileSync(path.join(pkgIconDir, f), "utf8");
  for (const m of src.matchAll(/^\s*(?:"([^"]+)"|([A-Za-z][\w-]*))\s*:/gm)) pkgIcons.add(m[1] ?? m[2]);
}
fs.mkdirSync(path.join(rootDir, "src/data"), { recursive: true });
writeFileAtomic(
  path.join(rootDir, "src/data/catalog.json"),
  JSON.stringify({ total: catalogItems.length, icons: iconCount, packageIcons: pkgIcons.size, items: catalogItems }) + "\n"
);
console.log(`generate-registry-json: catalog index ${catalogItems.length} components, ${iconCount} icons`);

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
  for (const m of source.matchAll(/from\s+["']\.(?:\/(lib))?\/([a-z0-9-]+)["']/g)) {
    if (!m[1]) deps.add(m[2]);
  }
  if (deps.size > 0) siblingDeps[slug] = [...deps].sort();
}

// Shared cn() helper as a registry:lib item so shadcn CLI installs it automatically.
// Target is components/ui/lib/utils.ts so relative "./lib/utils" imports in installed
// ui files resolve next to the component without literal "@ui" directories.
writeFileAtomic(
  path.join(outDir, "utils.json"),
  JSON.stringify({
    name: "utils",
    title: "Utils",
    type: "registry:lib",
    files: [{ path: "src/components/ui/lib/utils.ts", type: "registry:lib", target: "components/ui/lib/utils.ts", content: UTILS_SOURCE }],
  })
);
// Catalog-registered lib helpers (hooks, focus-trap) as registry:lib items so
// public/r/<name>.json exists for shadcn CLI / bigbullui CLI / MCP installs.
const libDir = path.join(uiDir, "lib");
const libSlugs = fs
  .readdirSync(libDir)
  .filter((f) => f.endsWith(".ts") && f !== "utils.ts")
  .map((f) => f.replace(/\.ts$/, ""))
  .filter((s) => catalogItems.some((c) => c.name === s))
  .sort();
let libWritten = 0;
for (const slug of libSlugs) {
  const source = fs.readFileSync(path.join(libDir, `${slug}.ts`), "utf8");
  const item = {
    name: slug,
    title: titles[slug] ?? slug,
    type: "registry:lib",
    files: [{ path: `src/components/ui/lib/${slug}.ts`, type: "registry:lib", target: `components/ui/lib/${slug}.ts`, content: source }],
  };
  writeJsonAtomic(path.join(outDir, `${slug}.json`), item);
  libWritten += 1;
}

let written = 0;
for (const slug of slugs) {
  const source = fs.readFileSync(path.join(uiDir, `${slug}.tsx`), "utf8");
  const item = {
    name: slug,
    title: titles[slug] ?? slug,
    type: "registry:ui",
    files: [
      { path: `src/components/ui/${slug}.tsx`, type: "registry:ui", content: source },
      ...(siblingDeps[slug] ?? []).map((dep) => ({
        path: `src/components/ui/${dep}.tsx`,
        type: "registry:ui",
        content: fs.readFileSync(path.join(uiDir, `${dep}.tsx`), "utf8"),
      })),
    ],
  };
  // Lib helpers (utils/hooks/focus-trap/use-ticket-audio) must ride along via
  // registryDependencies: the shadcn CLI resolves them recursively, and the
  // bigbullui CLI detects "./lib/<slug>" imports on its own.
  const needsSources = [source, ...(siblingDeps[slug] ?? []).map((d) => fs.readFileSync(path.join(uiDir, `${d}.tsx`), "utf8"))];
  const libDeps = new Set();
  for (const needsSrc of needsSources) {
    for (const m of needsSrc.matchAll(/from\s+["']\.\/lib\/([a-z0-9-]+)["']/g)) libDeps.add(m[1]);
  }
  if (libDeps.size > 0) {
    item.registryDependencies = [...libDeps].sort().map((d) => `https://ui.bigbullapp.com/r/${d}.json`);
  }
  writeJsonAtomic(path.join(outDir, `${slug}.json`), item);
  written += 1;
}
console.log(`generate-registry-json: ${written} ui + ${libWritten} lib items in public/r/`);

// Block registry entries (shadcn-compatible): block source + referenced ui sources.
const blkDir = path.join(rootDir, "src", "components", "blocks");
const toTitle = (slug) => slug.split("-").map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
const blockSlugList = fs.existsSync(blkDir) ? fs.readdirSync(blkDir).filter((f) => f.endsWith(".tsx")).map((f) => f.replace(/\.tsx$/, "")).sort() : [];
// Client-safe static list (sites import it; fs is not available there).
writeFileAtomic(
  path.join(rootDir, "src", "lib", "block-slugs.gen.ts"),
  "// AUTO-GENERATED by scripts/generate-registry-json.mjs — do not edit.\n" +
    "export const BLOCK_SLUGS_GENERATED: string[] = [\n" +
    blockSlugList.map((s) => `  "${s}",`).join("\n") +
    "\n];\n"
);
let blockCount = 0;
for (const slug of blockSlugList) {
  // Rewrite ../ui/<x> to ./ui/<x>: shadcn installs the block under components and
  // its ui deps under components/ui, so a sibling "ui/" dir is where "./ui/x" resolves.
  const blockSrc = fs.readFileSync(path.join(blkDir, `${slug}.tsx`), "utf8").replace(/\.\.\/ui\//g, "./ui/");
  const files = [{ path: `src/components/blocks/${slug}.tsx`, type: "registry:block", content: blockSrc }];
  const libFiles = new Set();
  const collectLib = (src) => {
    for (const m of src.matchAll(/from\s+["']\.\/(?:ui\/)?lib\/([a-z0-9-]+)["']/g)) libFiles.add(m[1]);
  };
  collectLib(blockSrc);
  const uiDeps = new Set();
  for (const dep of blockSrc.matchAll(/from\s+["']\.\/ui\/([a-z0-9-]+)["']/g)) uiDeps.add(dep[1]);
  const queue = [...uiDeps];
  while (queue.length > 0) {
    const dep = queue.shift();
    if (files.some((f) => f.path.endsWith(`/${dep}.tsx`))) continue;
    const depPath = path.join(uiDir, `${dep}.tsx`);
    if (!fs.existsSync(depPath)) continue;
    const depSrc = fs.readFileSync(depPath, "utf8");
    files.push({ path: `src/components/ui/${dep}.tsx`, type: "registry:ui", content: depSrc });
    collectLib(depSrc);
    for (const m of depSrc.matchAll(/from\s+["']\.\/([a-z0-9-]+)["']/g)) {
      if (m[1] !== "lib") queue.push(m[1]);
    }
  }
  for (const helper of libFiles) {
    if (files.some((f) => f.path.endsWith(`/lib/${helper}.ts`))) continue;
    const helperPath = path.join(uiDir, "lib", `${helper}.ts`);
    if (!fs.existsSync(helperPath)) continue;
    files.push({ path: `src/components/ui/lib/${helper}.ts`, type: "registry:lib", target: `components/ui/lib/${helper}.ts`, content: fs.readFileSync(helperPath, "utf8") });
  }
  const item = { name: slug, title: toTitle(slug), type: "registry:block", files };
  if (files.some((f) => f.content.includes('"./lib/utils"'))) item.registryDependencies = ["https://ui.bigbullapp.com/r/utils.json"];
  writeJsonAtomic(path.join(outDir, `${slug}.json`), item);
  blockCount += 1;
}
console.log(`generate-registry-json: ${blockCount} blocks in public/r/`);

// Compact indexes for the MCP server and other index consumers.
const metas = [];
for (const m of registry.matchAll(/\{\s*name:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)+)",\s*description:\s*"((?:[^"\\]|\\.)+)",\s*category:\s*"([^"]+)"/g)) {
  metas.push({ name: m[1], title: m[2].replace(/\\"/g, '"'), description: m[3].replace(/\\"/g, '"'), category: m[4] });
}
writeJsonAtomic(path.join(rootDir, "public", "components.json"), { updated: new Date().toISOString().slice(0, 10), count: metas.length, components: metas });
const blockSlugs = blockSlugList;
writeJsonAtomic(path.join(rootDir, "public", "blocks.json"), { updated: new Date().toISOString().slice(0, 10), count: blockSlugs.length, blocks: blockSlugs });
const iconSrc = fs.readFileSync(path.join(rootDir, "src", "components", "site", "icon-data.tsx"), "utf8");
const iconNames = [...iconSrc.matchAll(/^\s*\|\s*"([^"]+)"/gm)].map((m) => m[1]);
writeJsonAtomic(path.join(rootDir, "public", "icons.json"), { updated: new Date().toISOString().slice(0, 10), count: iconNames.length, icons: iconNames });
console.log(`generate-registry-json: indexes components=${metas.length} blocks=${blockSlugs.length} icons=${iconNames.length}`);

const cliPath = path.join(rootDir, "bin", "cli.js");
let cli = fs.readFileSync(cliPath, "utf8");
const allNames = [...slugs, ...libSlugs].sort();
const listLiteral = JSON.stringify(allNames);
const listPattern = /allFiles = \[[^\]]*\];/s;
if (!listPattern.test(cli)) {
  console.error("generate-registry-json: cli.js allFiles pattern not found — offline list NOT synced");
  process.exitCode = 1;
} else if (cli.includes(`allFiles = ${listLiteral};`)) {
  console.log(`generate-registry-json: cli.js offline list already in sync (${allNames.length} slugs)`);
} else if (process.env.BIGBULLUI_NO_CLI_SYNC) {
  console.error(`generate-registry-json: bin/cli.js offline list out of sync (${allNames.length} slugs) — run npm run prebuild (BIGBULLUI_NO_CLI_SYNC is set)`);
  process.exitCode = 1;
} else {
  const next = cli.replace(listPattern, `allFiles = ${listLiteral};`);
  writeFileAtomic(cliPath, next);
  console.log(`generate-registry-json: cli.js offline list synced (${allNames.length} slugs)`);
}
const libLiteral = `const LIB_FILES = ${JSON.stringify(libSlugs)};`;
if (!cli.includes(libLiteral)) {
  console.error(`generate-registry-json: bin/cli.js LIB_FILES out of sync (expected ${JSON.stringify(libSlugs)})`);
  process.exitCode = 1;
}
