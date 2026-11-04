import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Bundles src/lib/docs-content.ts (hand-authored usage/props docs) into
// src/data/docs-content.json, which the docs pages import at build time.
// Fails loudly when a key no longer matches a catalog component slug.
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const need = createRequire(import.meta.url);
const esbuild = need("esbuild");

const src = path.join(root, "src", "lib", "docs-content.ts");
const out = path.join(root, "src", "data", "docs-content.json");
const tmp = path.join(root, ".tmp-docs-content.cjs");

if (!fs.existsSync(src)) {
  console.error("generate-docs-json: src/lib/docs-content.ts is missing");
  process.exit(1);
}

esbuild.buildSync({
  entryPoints: [src],
  outfile: tmp,
  bundle: true,
  platform: "node",
  format: "cjs",
  logLevel: "silent",
});

// eslint-disable-next-line @typescript-eslint/no-require-imports -- generated CJS probe
const { docsContent } = need(tmp);
fs.rmSync(tmp, { force: true });

const catalogPath = path.join(root, "src", "data", "catalog.json");
if (!fs.existsSync(catalogPath)) {
  console.error("generate-docs-json: run generate-registry-json.mjs first (catalog.json missing)");
  process.exit(1);
}
const slugs = new Set(need(catalogPath).items.map((i) => i.name));

const unknownUsage = Object.keys(docsContent.usage).filter((k) => !slugs.has(k));
const unknownProps = Object.keys(docsContent.props).filter((k) => !slugs.has(k));
if (unknownUsage.length > 0 || unknownProps.length > 0) {
  console.error(
    `generate-docs-json: docs keys without a catalog component — usage: [${unknownUsage.slice(0, 10).join(", ")}] props: [${unknownProps.slice(0, 10).join(", ")}]`
  );
  process.exit(1);
}

fs.writeFileSync(out, JSON.stringify(docsContent));
console.log(`generate-docs-json: ${Object.keys(docsContent.usage).length} usage + ${Object.keys(docsContent.props).length} props entries`);
