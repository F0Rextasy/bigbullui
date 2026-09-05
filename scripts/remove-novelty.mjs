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

console.log(`Removing ${toRemove.length} novelty components...`);

// 1. Delete .tsx files from src/components/ui/
for (const name of toRemove) {
  const filePath = path.join(rootDir, "src", "components", "ui", `${name}.tsx`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${name}.tsx`);
  }
}

// 2. Clean src/index.ts
const indexPath = path.join(rootDir, "src", "index.ts");
let indexContent = fs.readFileSync(indexPath, "utf8");
for (const name of toRemove) {
  const lineRegex = new RegExp(`export\\s+\\*\\s+from\\s+["']\\./components/ui/${name}["'];?\\r?\\n?`, "g");
  indexContent = indexContent.replace(lineRegex, "");
}
fs.writeFileSync(indexPath, indexContent, "utf8");
console.log("Updated src/index.ts");

// 3. Clean src/lib/registry-site.ts
const regPath = path.join(rootDir, "src", "lib", "registry-site.ts");
let regContent = fs.readFileSync(regPath, "utf8");
for (const name of toRemove) {
  // Regex to remove the component object: { name: "...", ... },
  const entryRegex = new RegExp(`\\s*\\{\\s*name:\\s*["']${name}["'][^}]+\\},?`, "g");
  regContent = regContent.replace(entryRegex, "");
}
fs.writeFileSync(regPath, regContent, "utf8");
console.log("Updated src/lib/registry-site.ts");

// 4. Clean preview files
const previewsDir = path.join(rootDir, "src", "components", "site", "previews");
const previewFiles = fs.readdirSync(previewsDir).filter((f) => f.endsWith(".tsx"));
for (const pFile of previewFiles) {
  const fullP = path.join(previewsDir, pFile);
  let content = fs.readFileSync(fullP, "utf8");
  let changed = false;
  for (const name of toRemove) {
    const pRegex = new RegExp(`\\s*["']${name}["']:\\s*\\(\\)\\s*=>\\s*<[^>]+/>,?`, "g");
    if (pRegex.test(content)) {
      content = content.replace(pRegex, "");
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(fullP, content, "utf8");
    console.log(`Cleaned previews in: ${pFile}`);
  }
}

// 5. Clean app/docs/[slug]/wave-props3.ts
const wp3Path = path.join(rootDir, "app", "docs", "[slug]", "wave-props3.ts");
if (fs.existsSync(wp3Path)) {
  let wp3Content = fs.readFileSync(wp3Path, "utf8");
  for (const name of toRemove) {
    const blockRegex = new RegExp(`\\s*["']${name}["']:\\s*\\[[^\\]]*\\],?`, "g");
    wp3Content = wp3Content.replace(blockRegex, "");
  }
  fs.writeFileSync(wp3Path, wp3Content, "utf8");
  console.log("Cleaned wave-props3.ts");
}

console.log("Novelty components cleanup complete!");
