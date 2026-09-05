import fs from "node:fs";

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

const content = fs.readFileSync("app/docs/[slug]/wave-props3.ts", "utf8");
const lines = content.split("\n");

let newLines = [];
let skipping = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const keyMatch = line.match(/^\s*["']([a-z0-9-]+)["']:\s*\[/);
  if (keyMatch) {
    if (toRemove.includes(keyMatch[1])) {
      skipping = true;
      continue;
    }
  }

  if (skipping) {
    if (/^\s*\],?/.test(line)) {
      skipping = false;
    }
    continue;
  }

  newLines.push(line);
}

fs.writeFileSync("app/docs/[slug]/wave-props3.ts", newLines.join("\n"), "utf8");
console.log("Successfully cleaned wave-props3.ts line-by-line!");
