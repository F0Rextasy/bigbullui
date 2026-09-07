// Props coverage reporter — warns (never fails) for registry components
// missing prop documentation in app/docs/[slug]/page.tsx or wave-props3.ts.
// Usage: node scripts/props-coverage.mjs
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
console.log(`props-coverage: ${names.length - missing}/${names.length} components documented.`);
