import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Dependency graph: block slug -> ui slugs it imports. Regenerate on block changes.
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blocksDir = path.join(rootDir, "src", "components", "blocks");

const graph = {};
for (const f of fs.readdirSync(blocksDir).filter((x) => x.endsWith(".tsx")).sort()) {
  const slug = f.replace(/\.tsx$/, "");
  const src = fs.readFileSync(path.join(blocksDir, f), "utf8");
  const deps = [...new Set([...src.matchAll(/from\s+["']\.\.\/ui\/([a-z0-9-]+)["']/g)].map((m) => m[1]))].sort();
  graph[slug] = deps;
}
const out = { updated: new Date().toISOString().slice(0, 10), blocks: graph };
fs.writeFileSync(path.join(rootDir, "src", "data", "dep-graph.json"), JSON.stringify(out, null, 1) + "\n");
console.log(`dep-graph: ${Object.keys(graph).length} blocks mapped.`);
