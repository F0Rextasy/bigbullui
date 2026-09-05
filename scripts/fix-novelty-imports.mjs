import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const toRemove = [
  "arcade-cabinet",
  "betting-slip",
  "bingo-card",
  "carousel-ride",
  "coin-flip",
  "dice",
  "disco-ball",
  "drink-ticket",
  "drive-in-screen",
  "ferris-wheel",
  "lottery-machine",
  "playing-card",
  "pool-table",
  "prize-wheel",
  "raffle-ticket",
  "revolving-door",
  "safe-vault",
  "scratch-off",
  "slot-machine",
  "stage-lights",
  "ticket-booth",
  "vending-machine",
];

// 1. Fix src/index.ts
const indexPath = path.join(rootDir, "src", "index.ts");
const indexLines = fs.readFileSync(indexPath, "utf8").split("\n");
const cleanedIndex = indexLines.filter((l) => !toRemove.some((r) => l.includes(r))).join("\n");
fs.writeFileSync(indexPath, cleanedIndex, "utf8");
console.log("Cleaned src/index.ts completely");

// 2. Fix src/components/site/component-preview.tsx
const cpPath = path.join(rootDir, "src", "components", "site", "component-preview.tsx");
const cpLines = fs.readFileSync(cpPath, "utf8").split("\n");
let cpNew = [];
let skipBlock = false;
for (const line of cpLines) {
  if (toRemove.some((r) => line.includes(`@/components/ui/${r}`))) {
    continue;
  }
  if (toRemove.some((r) => line.includes(`"${r}":`))) {
    skipBlock = true;
    continue;
  }
  if (skipBlock) {
    if (/^\s*\},?/.test(line)) {
      skipBlock = false;
    }
    continue;
  }
  cpNew.push(line);
}
fs.writeFileSync(cpPath, cpNew.join("\n"), "utf8");
console.log("Cleaned src/components/site/component-preview.tsx");

// 3. Fix wave18.tsx and wave19.tsx
for (const w of ["wave18.tsx", "wave19.tsx", "wave9.tsx"]) {
  const p = path.join(rootDir, "src", "components", "site", "previews", w);
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, "utf8").split("\n");
  const filtered = lines.filter((l) => !toRemove.some((r) => l.includes(`@/components/ui/${r}`)));
  fs.writeFileSync(p, filtered.join("\n"), "utf8");
  console.log(`Cleaned imports in ${w}`);
}

console.log("Finished fixing novelty imports!");
