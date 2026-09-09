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

// Block registry entries (shadcn-compatible): block source + referenced ui sources.
const blkDir = path.join(rootDir, "src", "components", "blocks");
const toTitle = (slug) => slug.split("-").map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
const blockSlugList = fs.existsSync(blkDir) ? fs.readdirSync(blkDir).filter((f) => f.endsWith(".tsx")).map((f) => f.replace(/\.tsx$/, "")).sort() : [];
let blockCount = 0;
for (const slug of blockSlugList) {
  const blockSrc = fs.readFileSync(path.join(blkDir, `${slug}.tsx`), "utf8");
  const files = [{ path: `src/components/blocks/${slug}.tsx`, type: "registry:block", content: blockSrc }];
  for (const dep of blockSrc.matchAll(/from\s+["']\.\.\/ui\/([a-z0-9-]+)["']/g)) {
    const depPath = path.join(uiDir, `${dep[1]}.tsx`);
    if (fs.existsSync(depPath) && !files.some((f) => f.path.endsWith(`${dep[1]}.tsx`))) {
      files.push({ path: `src/components/ui/${dep[1]}.tsx`, type: "registry:ui", content: fs.readFileSync(depPath, "utf8") });
    }
  }
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify({ name: slug, title: toTitle(slug), type: "registry:block", files }));
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
