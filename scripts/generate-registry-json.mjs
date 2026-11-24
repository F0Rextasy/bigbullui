import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = path.join(rootDir, "src", "components", "ui");
const outDir = path.join(rootDir, "public", "r");
const checkOnly = process.argv.includes("--check");
let staleCount = 0;

function normEol(s) {
  return String(s).replace(/\r\n/g, "\n");
}

function stableJson(str) {
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === "object" && "updated" in obj) {
      delete obj.updated;
    }
    return JSON.stringify(obj);
  } catch {
    return normEol(str);
  }
}

// Write via temp file + rename: parallel readers (npm test, docs build) never
// see a partially written file mid-run. When --check is active, operate strictly read-only.
function writeFileAtomic(filePath, data, { compareJsonIgnoreUpdated = false } = {}) {
  const next = String(data);
  if (checkOnly) {
    const disk = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
    const same =
      disk !== null &&
      (compareJsonIgnoreUpdated ? stableJson(disk) === stableJson(next) : normEol(disk) === normEol(next));
    if (!same) {
      staleCount += 1;
      process.exitCode = 1;
    }
    return;
  }
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  if (existing !== null && (compareJsonIgnoreUpdated ? stableJson(existing) === stableJson(next) : existing === next)) {
    return;
  }
  const tmp = `${filePath}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, next);
  fs.renameSync(tmp, filePath);
}
function writeJsonAtomic(filePath, value, opts = {}) {
  writeFileAtomic(filePath, JSON.stringify(value), opts);
}
const registry = fs.readFileSync(path.join(rootDir, "src/lib/registry-site.ts"), "utf8");

const titles = {};
for (const m of registry.matchAll(/\{\s*name:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)) {
  titles[m[1]] = m[2];
}

const catalogItems = [];
const metas = [];
for (const m of registry.matchAll(/\{\s*name:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)+)",\s*description:\s*"((?:[^"\\]|\\.)*)",\s*category:\s*"([^"]+)"([^}\n]*)\}/g)) {
  const name = m[1];
  const title = m[2].replace(/\\"/g, '"');
  const description = m[3].replace(/\\"/g, '"');
  const category = m[4];
  const tail = m[5] ?? "";
  const isNew = /\bisNew:\s*true\b/.test(tail);
  const statusMatch = tail.match(/\bstatus:\s*"([^"]+)"/);
  const replacedMatch = tail.match(/\breplacedBy:\s*"([^"]+)"/);
  const extra = {
    ...(isNew ? { isNew: true } : {}),
    ...(statusMatch ? { status: statusMatch[1] } : {}),
    ...(replacedMatch ? { replacedBy: replacedMatch[1] } : {}),
  };
  catalogItems.push({ name, title, category, ...extra });
  metas.push({ name, title, description, category, ...extra });
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
  if (!/^set-.*\.tsx$/.test(f)) continue;
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
const directSiblingDeps = {};

for (const slug of slugs) {
  const source = fs.readFileSync(path.join(uiDir, `${slug}.tsx`), "utf8");
  const deps = new Set();
  for (const m of source.matchAll(/from\s+["']\.(?:\/(lib))?\/([a-z0-9-]+)["']/g)) {
    if (!m[1]) deps.add(m[2]);
  }
  if (deps.size > 0) directSiblingDeps[slug] = [...deps].sort();
}

const siblingDeps = {};
for (const slug of slugs) {
  const visited = new Set([slug]);
  const queue = [...(directSiblingDeps[slug] ?? [])];
  const transitive = [];
  while (queue.length > 0) {
    const dep = queue.shift();
    if (visited.has(dep)) continue;
    visited.add(dep);
    if (fs.existsSync(path.join(uiDir, `${dep}.tsx`))) {
      transitive.push(dep);
      for (const nested of directSiblingDeps[dep] ?? []) {
        if (!visited.has(nested)) queue.push(nested);
      }
    }
  }
  if (transitive.length > 0) siblingDeps[slug] = transitive;
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
const toTitle = (slug) => slug.split("-").map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
const libDir = path.join(uiDir, "lib");
const libSlugs = fs
  .readdirSync(libDir)
  .filter((f) => f.endsWith(".ts") && f !== "utils.ts")
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();
let libWritten = 0;
for (const slug of libSlugs) {
  const source = fs.readFileSync(path.join(libDir, `${slug}.ts`), "utf8");
  const item = {
    name: slug,
    title: titles[slug] ?? toTitle(slug),
    type: "registry:lib",
    files: [{ path: `src/components/ui/lib/${slug}.ts`, type: "registry:lib", target: `components/ui/lib/${slug}.ts`, content: source }],
  };
  const libInternalDeps = new Set();
  for (const m of source.matchAll(/from\s+["']\.\/([a-z0-9-]+)["']/g)) {
    libInternalDeps.add(m[1]);
  }
  if (libInternalDeps.size > 0) {
    item.registryDependencies = [...libInternalDeps].sort().map((d) => `https://ui.bigbullapp.com/r/${d}.json`);
  }
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
const blockSlugList = fs.existsSync(blkDir) ? fs.readdirSync(blkDir).filter((f) => f.endsWith(".tsx")).map((f) => f.replace(/\.tsx$/, "")).sort() : [];
const blockSlugsGenPath = path.join(rootDir, "src", "lib", "block-slugs.gen.ts");
const blockSlugsGenContent =
  "// AUTO-GENERATED by scripts/generate-registry-json.mjs — do not edit.\n" +
  "export const BLOCK_SLUGS_GENERATED: string[] = [\n" +
  blockSlugList.map((s) => `  "${s}",`).join("\n") +
  "\n];\n";
if (!checkOnly) {
  writeFileAtomic(blockSlugsGenPath, blockSlugsGenContent);
} else if (!fs.existsSync(blockSlugsGenPath) || fs.readFileSync(blockSlugsGenPath, "utf8").replace(/\r\n/g, "\n") !== blockSlugsGenContent) {
  console.error("generate-registry-json: src/lib/block-slugs.gen.ts out of sync — run node scripts/generate-registry-json.mjs");
  process.exitCode = 1;
}
let blockCount = 0;
for (const slug of blockSlugList) {
  // Keep ../ui/<x> intact: shadcn installs the block at components/blocks/<slug>.tsx
  // and its ui deps at components/ui/<x>.tsx, so ../ui/<x> resolves cleanly.
  const blockSrc = fs.readFileSync(path.join(blkDir, `${slug}.tsx`), "utf8");
  const files = [{ path: `src/components/blocks/${slug}.tsx`, type: "registry:block", target: `components/blocks/${slug}.tsx`, content: blockSrc }];
  const libFiles = new Set();
  const collectLib = (src) => {
    for (const m of src.matchAll(/from\s+["'](?:\.\.\/ui\/|\.\/(?:ui\/)?)lib\/([a-z0-9-]+)["']/g)) libFiles.add(m[1]);
  };
  collectLib(blockSrc);
  const uiDeps = new Set();
  for (const dep of blockSrc.matchAll(/from\s+["']\.\.\/ui\/([a-z0-9-]+)["']/g)) {
    if (dep[1] !== "lib") uiDeps.add(dep[1]);
  }
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
  const libQueue = [...libFiles].filter((h) => h !== "utils");
  while (libQueue.length > 0) {
    const helper = libQueue.shift();
    if (helper === "utils") continue;
    if (files.some((f) => f.path.endsWith(`/lib/${helper}.ts`))) continue;
    const helperPath = path.join(uiDir, "lib", `${helper}.ts`);
    if (!fs.existsSync(helperPath)) continue;
    const helperSrc = fs.readFileSync(helperPath, "utf8");
    files.push({ path: `src/components/ui/lib/${helper}.ts`, type: "registry:lib", target: `components/ui/lib/${helper}.ts`, content: helperSrc });
    for (const m of helperSrc.matchAll(/from\s+["']\.\/([a-z0-9-]+)["']/g)) {
      if (m[1] !== "utils" && !libFiles.has(m[1])) {
        libFiles.add(m[1]);
        libQueue.push(m[1]);
      }
    }
  }
  const item = { name: slug, title: toTitle(slug), type: "registry:block", files };
  if (files.some((f) => f.content.includes('"./lib/utils"') || f.content.includes('"../ui/lib/utils"'))) {
    item.registryDependencies = ["https://ui.bigbullapp.com/r/utils.json"];
  }
  writeJsonAtomic(path.join(outDir, `${slug}.json`), item);
  blockCount += 1;
}
console.log(`generate-registry-json: ${blockCount} blocks in public/r/`);

// Compact indexes for the MCP server and other index consumers.
writeJsonAtomic(path.join(rootDir, "public", "components.json"), { updated: new Date().toISOString().slice(0, 10), count: metas.length, components: metas }, { compareJsonIgnoreUpdated: true });
const blockSlugs = blockSlugList;
writeJsonAtomic(path.join(rootDir, "public", "blocks.json"), { updated: new Date().toISOString().slice(0, 10), count: blockSlugs.length, blocks: blockSlugs }, { compareJsonIgnoreUpdated: true });
const iconSrc = fs.readFileSync(path.join(rootDir, "src", "components", "site", "icon-data.tsx"), "utf8");
const iconNames = [...iconSrc.matchAll(/^\s*\|\s*"([^"]+)"/gm)].map((m) => m[1]);
writeJsonAtomic(path.join(rootDir, "public", "icons.json"), { updated: new Date().toISOString().slice(0, 10), count: iconNames.length, icons: iconNames }, { compareJsonIgnoreUpdated: true });
if (checkOnly && staleCount > 0) {
  console.error(`generate-registry-json --check: ${staleCount} generated file(s) out of date — run node scripts/generate-registry-json.mjs`);
}
console.log(`generate-registry-json: indexes components=${metas.length} blocks=${blockSlugs.length} icons=${iconNames.length}`);

const cliPath = path.join(rootDir, "bin", "cli.js");
let cli = fs.readFileSync(cliPath, "utf8");
const allNames = [...slugs, ...libSlugs].sort();
const listLiteral = JSON.stringify(allNames);
const listPattern = /allFiles = \[[^\]]*\];/s;
const blockLiteral = `const BLOCK_FILES = ${JSON.stringify(blockSlugList)};`;
const blockPattern = /const BLOCK_FILES = \[[^\]]*\];/s;

let cliChanged = false;
if (!listPattern.test(cli)) {
  console.error("generate-registry-json: cli.js allFiles pattern not found — offline list NOT synced");
  process.exitCode = 1;
} else if (!cli.includes(`allFiles = ${listLiteral};`)) {
  if (checkOnly || process.env.BIGBULLUI_NO_CLI_SYNC) {
    console.error(`generate-registry-json: bin/cli.js offline list out of sync (${allNames.length} slugs) — run npm run prebuild`);
    process.exitCode = 1;
  } else {
    cli = cli.replace(listPattern, `allFiles = ${listLiteral};`);
    cliChanged = true;
    console.log(`generate-registry-json: cli.js offline list synced (${allNames.length} slugs)`);
  }
} else {
  console.log(`generate-registry-json: cli.js offline list already in sync (${allNames.length} slugs)`);
}

if (!blockPattern.test(cli)) {
  console.error("generate-registry-json: cli.js BLOCK_FILES pattern not found — block list NOT synced");
  process.exitCode = 1;
} else if (!cli.includes(blockLiteral)) {
  if (checkOnly || process.env.BIGBULLUI_NO_CLI_SYNC) {
    console.error(`generate-registry-json: bin/cli.js BLOCK_FILES out of sync (${blockSlugList.length} blocks) — run npm run prebuild`);
    process.exitCode = 1;
  } else {
    cli = cli.replace(blockPattern, blockLiteral);
    cliChanged = true;
    console.log(`generate-registry-json: cli.js block list synced (${blockSlugList.length} blocks)`);
  }
}

const libLiteral = `const LIB_FILES = ${JSON.stringify(libSlugs)};`;
const libPattern = /const LIB_FILES = \[[^\]]*\];/;
if (!libPattern.test(cli)) {
  console.error("generate-registry-json: bin/cli.js LIB_FILES pattern not found");
  process.exitCode = 1;
} else if (!cli.includes(libLiteral)) {
  if (checkOnly || process.env.BIGBULLUI_NO_CLI_SYNC) {
    console.error(`generate-registry-json: bin/cli.js LIB_FILES out of sync (expected ${JSON.stringify(libSlugs)})`);
    process.exitCode = 1;
  } else {
    cli = cli.replace(libPattern, libLiteral);
    cliChanged = true;
    console.log(`generate-registry-json: cli.js LIB_FILES synced (${libSlugs.length} helpers)`);
  }
}
if (cliChanged) {
  writeFileAtomic(cliPath, cli);
}
