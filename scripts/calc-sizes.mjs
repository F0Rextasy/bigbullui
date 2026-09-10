import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const DIR = join(process.cwd(), "src", "components", "ui");
const WARN_KB = 12;
const HARD_FILE_KB = 30;
const HARD_TOTAL_KB = 2400;

const files = readdirSync(DIR).filter((f) => f.endsWith(".tsx"));
const sizes = {};
let over = 0;
for (const f of files) {
  const raw = statSync(join(DIR, f)).size;
  const kb = raw / 1024;
  const { readFileSync } = await import("node:fs");
  const gz = gzipSync(readFileSync(join(DIR, f))).length;
  sizes[f.replace(/\.tsx$/, "")] = { raw, gzip: gz, kb: Number((gz / 1024).toFixed(2)) };
  if (kb > WARN_KB) {
    over += 1;
    console.log(`OVER  ${f} ${kb.toFixed(1)}kb`);
  }
}
const totalKb = Object.values(sizes).reduce((a, s) => a + s.raw, 0) / 1024;
const violators = Object.entries(sizes).filter(([, s]) => s.raw / 1024 > HARD_FILE_KB);
writeFileSync(join(process.cwd(), "src", "data", "sizes.json"), JSON.stringify({ updated: new Date().toISOString().slice(0, 10), sizes }, null, 2));
console.log(`${files.length} ui files scanned, ${over} over ${WARN_KB}kb budget, total ${totalKb.toFixed(0)}kb raw.`);
if (violators.length > 0) {
  console.error(`SIZE GATE: files over ${HARD_FILE_KB}kb raw: ${violators.map(([n, s]) => `${n} ${(s.raw / 1024).toFixed(1)}kb`).join(", ")}`);
  process.exit(1);
}
if (totalKb > HARD_TOTAL_KB) {
  console.error(`SIZE GATE: total ${totalKb.toFixed(0)}kb raw exceeds ${HARD_TOTAL_KB}kb budget.`);
  process.exit(1);
}
