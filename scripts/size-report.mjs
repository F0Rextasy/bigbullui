import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Size report: top growers + totals, written for humans and CI summaries.
// Hard gates live in calc-sizes.mjs (fails the build); this only reports.
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sizes = JSON.parse(fs.readFileSync(path.join(rootDir, "src", "data", "sizes.json"), "utf8")).sizes;

const rows = Object.entries(sizes)
  .map(([name, s]) => ({ name, raw: s.raw / 1024, gzip: s.gzip / 1024 }))
  .sort((a, b) => b.gzip - a.gzip);
const totalRaw = rows.reduce((a, r) => a + r.raw, 0);
const totalGzip = rows.reduce((a, r) => a + r.gzip, 0);

const lines = [
  `size-report: ${rows.length} components, ${totalRaw.toFixed(0)}kb raw / ${totalGzip.toFixed(0)}kb gzip total.`,
  "Heaviest 10 (gzip):",
  ...rows.slice(0, 10).map((r) => `  ${r.name}: ${r.gzip.toFixed(1)}kb gzip (${r.raw.toFixed(1)}kb raw)`),
];
console.log(lines.join("\n"));

const summary = process.env.GITHUB_STEP_SUMMARY;
if (summary) fs.appendFileSync(summary, lines.join("\n") + "\n");
