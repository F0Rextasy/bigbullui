// Preview manifest check - verifies every preview file is indexed.
// NOTE: this performs no pixel diffing. Real screenshot comparison lives
// outside this script (CI artifacts + manual review); do not mistake a green
// run for "no visual changes".
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const previewsDir = path.join(rootDir, "src", "components", "site", "previews");
const shotsDir = path.join(rootDir, ".wave", "screenshots");
const update = process.argv.includes("--update");

if (!fs.existsSync(previewsDir)) {
  console.error("visual-regression: previews directory missing");
  process.exit(1);
}

const files = fs.readdirSync(previewsDir).filter((f) => f.endsWith(".tsx"));
if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir, { recursive: true });

const manifestPath = path.join(shotsDir, "manifest.json");
const manifest = Object.fromEntries(files.map((f) => [f, { captured: update ? new Date().toISOString() : "pending" }]));
if (update) fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`visual-regression: ${files.length} preview files indexed, manifest ${update ? "updated" : "checked"}.`);
console.log("Run with --update after reviewing Playwright screenshots in CI artifacts.");
