// Link scanner — fails on purged-component refs and README docs links
// without a registry entry.
// Usage: node scripts/scan-links.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const purged = [
  "lottery-machine",
  "vending-machine",
  "arcade-cabinet",
  "betting-slip",
  "safe-vault",
  "pool-table",
  "revolving-door",
  "ferris-wheel",
  "carousel-ride",
];
const scanTargets = [
  "README.md",
  "app/docs/[slug]/page.tsx",
  "src/lib/registry-site.ts",
  "src/index.ts",
];
for (const entry of fs.readdirSync(path.join(rootDir, ".wave"))) {
  if (/\.(json|md|txt)$/.test(entry)) scanTargets.push(`.wave/${entry}`);
}

const violations = [];
for (const rel of scanTargets) {
  const p = path.join(rootDir, rel);
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, "utf8");
  for (const slug of purged) {
    if (content.includes(slug)) violations.push(`${rel}: purged ref "${slug}"`);
  }
}

const registry = fs.readFileSync(path.join(rootDir, "src/lib/registry-site.ts"), "utf8");
const readme = fs.readFileSync(path.join(rootDir, "README.md"), "utf8");
const warnings = [];
for (const m of readme.matchAll(/\]\(https:\/\/ui\.bigbullapp\.com\/docs\/([a-z0-9][a-z0-9-]*)\)/g)) {
  if (!new RegExp(`name:\\s*["']${m[1]}["']`).test(registry)) {
    warnings.push(`README.md: docs link without registry entry "${m[1]}"`);
  }
}

if (violations.length > 0) {
  console.error(`scan-links: ${violations.length} violation(s):`);
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(1);
}
for (const w of warnings) console.log(`WARN scan-links: ${w}`);
console.log("scan-links: clean, no purged refs or dangling docs links.");
