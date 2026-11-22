import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { extractComponentProps } from "./lib/extract-props.mjs";

// Bundles src/lib/docs-content.ts and merges TypeScript AST-extracted *Props signatures
// from src/components/ui/*.tsx into src/data/docs-content.json so docs prop tables stay
// synchronized with component source files.
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const need = createRequire(import.meta.url);
const esbuild = need("esbuild");
const checkOnly = process.argv.includes("--check");

const src = path.join(root, "src", "lib", "docs-content.ts");
const out = path.join(root, "src", "data", "docs-content.json");
const wavesOut = path.join(root, "src", "data", "preview-waves.json");
const uiDir = path.join(root, "src", "components", "ui");
const tmp = path.join(os.tmpdir(), `bigbullui-docs-content-${process.pid}.cjs`);

if (!fs.existsSync(src)) {
  console.error("generate-docs-json: src/lib/docs-content.ts is missing");
  process.exit(1);
}

let docsContent;
try {
  esbuild.buildSync({
    entryPoints: [src],
    outfile: tmp,
    bundle: true,
    platform: "node",
    format: "cjs",
    logLevel: "silent",
  });
  docsContent = need(tmp).docsContent;
} finally {
  fs.rmSync(tmp, { force: true });
}

const catalogPath = path.join(root, "src", "data", "catalog.json");
if (!fs.existsSync(catalogPath)) {
  console.error("generate-docs-json: run generate-registry-json.mjs first (catalog.json missing)");
  process.exit(1);
}
const slugs = [...new Set(need(catalogPath).items.map((i) => i.name))];
const slugSet = new Set(slugs);

const unknownUsage = Object.keys(docsContent.usage).filter((k) => !slugSet.has(k));
const unknownProps = Object.keys(docsContent.props).filter((k) => !slugSet.has(k));
if (unknownUsage.length > 0 || unknownProps.length > 0) {
  console.error(
    `generate-docs-json: docs keys without a catalog component — usage: [${unknownUsage.slice(0, 10).join(", ")}] props: [${unknownProps.slice(0, 10).join(", ")}]`
  );
  process.exit(1);
}

const mergedProps = {};
let astExtractedCount = 0;

for (const slug of slugs) {
  const manualList = docsContent.props[slug] ?? [];
  const manualByName = new Map(manualList.map((p) => [p.name, p]));
  const tsxPath = path.join(uiDir, `${slug}.tsx`);
  const ast = extractComponentProps(tsxPath);

  if (!ast || (ast.primaryProps.length === 0 && ast.allPropsByName.size === 0)) {
    if (Object.hasOwn(docsContent.props, slug)) mergedProps[slug] = manualList;
    continue;
  }

  astExtractedCount += 1;
  const nextList = [];
  const seen = new Set();

  for (const prop of ast.primaryProps) {
    if (seen.has(prop.name)) continue;
    seen.add(prop.name);
    const manual = manualByName.get(prop.name);
    const desc =
      prop.description ||
      manual?.description ||
      (prop.defaultValue ? `Default: ${prop.defaultValue}` : "");
    nextList.push({
      name: prop.name,
      type: prop.type,
      description: desc,
    });
  }

  for (const manual of manualList) {
    if (seen.has(manual.name)) continue;
    const secondary = ast.allPropsByName.get(manual.name);
    if (secondary) {
      seen.add(manual.name);
      nextList.push({
        name: manual.name,
        type: secondary.type,
        description: secondary.description || manual.description || "",
      });
    } else if (manual.name === "className" || manual.name === "children") {
      seen.add(manual.name);
      nextList.push(manual);
    }
  }

  if (nextList.length > 0) {
    mergedProps[slug] = nextList;
  } else if (Object.hasOwn(docsContent.props, slug)) {
    mergedProps[slug] = manualList;
  }
}

const nextDocsJson = JSON.stringify({ usage: docsContent.usage, props: mergedProps });

const previewsDir = path.join(root, "src", "components", "site", "previews");
const previewWaves = {};
const previewFiles = fs.readdirSync(previewsDir).filter((f) => f.endsWith(".tsx")).sort();
for (const file of previewFiles) {
  const wave = file.replace(/\.tsx$/, "");
  const content = fs.readFileSync(path.join(previewsDir, file), "utf8");
  const idx = content.lastIndexOf("export const ");
  if (idx < 0) continue;
  const exportBlock = content.slice(idx);
  for (const m of exportBlock.matchAll(/\r?\n  (?:"([a-z0-9][a-z0-9-]*)"|([a-z][a-z0-9-]*))\s*:/g)) {
    const slug = m[1] || m[2];
    if (slug) previewWaves[slug] = wave;
  }
}
const nextWavesJson = JSON.stringify(previewWaves);

if (checkOnly) {
  const diskDocs = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  const diskWaves = fs.existsSync(wavesOut) ? fs.readFileSync(wavesOut, "utf8") : "";
  if (diskDocs !== nextDocsJson || diskWaves !== nextWavesJson) {
    console.error("generate-docs-json --check: STALE src/data/docs-content.json or preview-waves.json — run npm run prebuild");
    process.exit(1);
  }
  console.log(
    `generate-docs-json --check: OK (${Object.keys(docsContent.usage).length} usage + ${Object.keys(mergedProps).length} props, ${astExtractedCount} AST-synced)`
  );
} else {
  fs.writeFileSync(out, nextDocsJson);
  fs.writeFileSync(wavesOut, nextWavesJson);
  console.log(
    `generate-docs-json: ${Object.keys(docsContent.usage).length} usage + ${Object.keys(mergedProps).length} props (${astExtractedCount} AST-synced) + ${Object.keys(previewWaves).length} preview waves`
  );
}
