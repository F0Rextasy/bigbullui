import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = fs.readFileSync(path.join(rootDir, "src/lib/registry-site.ts"), "utf8");
const names = [...registry.matchAll(/name:\s*["']([a-z0-9][a-z0-9-]*)["']/g)].map((m) => m[1]);

const docsFiles = [
  "app/docs/[slug]/page.tsx",
  "app/docs/[slug]/wave-props3.ts",
].map((f) => {
  const p = path.join(rootDir, f);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
});

let missing = 0;
for (const slug of names) {
  const documented = docsFiles.some((content) => content.includes(`"${slug}": [`));
  if (!documented) {
    missing += 1;
    console.log(`WARN props-coverage: no props docs for "${slug}"`);
  }
}
const documented = names.length - missing;
console.log(`props-coverage: ${documented}/${names.length} components documented.`);

const floorPath = path.join(rootDir, "scripts/props-floor.json");
if (!fs.existsSync(floorPath)) {
  fs.writeFileSync(floorPath, JSON.stringify({ documented, total: names.length }, null, 2) + "\n");
  console.log("props-coverage: floor file created, re-run to enforce.");
  process.exit(0);
}
const floor = JSON.parse(fs.readFileSync(floorPath, "utf8"));
const floorRatio = floor.documented / Math.max(1, floor.total);
const nowRatio = documented / Math.max(1, names.length);
if (nowRatio + 1e-9 < floorRatio) {
  console.error(
    `props-coverage: FAIL ratio dropped ${(floorRatio * 100).toFixed(2)}% -> ${(nowRatio * 100).toFixed(2)}%. ` +
    `New components must ship usage + props docs, or raise the floor deliberately.`
  );
  process.exit(1);
}
console.log(
  `props-coverage: floor OK (${(nowRatio * 100).toFixed(2)}% >= ${(floorRatio * 100).toFixed(2)}%).`
);
