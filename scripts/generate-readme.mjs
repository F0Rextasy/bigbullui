import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registrySrc = fs.readFileSync(path.join(rootDir, "src/lib/registry-site.ts"), "utf8");

const entries = [...registrySrc.matchAll(
  /\{\s*name:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)+)",\s*description:\s*"((?:[^"\\]|\\.)+)",\s*category:\s*"([^"]+)"[\s\S]*?\}/gs
)].map((m) => ({ name: m[1], title: m[2].replace(/\\"/g, '"'), description: m[3].replace(/\\"/g, '"').replace(/\|/g, "/"), category: m[4] }));

const SECTIONS = [
  { title: "Form", blurb: "inputs, pickers, toggles and controls", categories: ["form", "pickers"] },
  { title: "Display", blurb: "surfaces, badges and data views", categories: ["ticket-stub", "charts", "data", "media", "editors"] },
  { title: "Feedback", blurb: "notices, hints and interruptions", categories: ["feedback"] },
  { title: "Navigation", blurb: "ways to move between views", categories: ["navigation"] },
];

let blocks = "";
for (const section of SECTIONS) {
  const rows = entries.filter((e) => section.categories.includes(e.category));
  if (rows.length === 0) continue;
  blocks += `<details>\n<summary><strong>${section.title}</strong> — ${section.blurb}</summary>\n\n`;
  blocks += `| File | Component | Description |\n|---|---|---|\n`;
  for (const row of rows) {
    blocks += `| [\`${row.name}\`](https://ui.bigbullapp.com/docs/${row.name}) | ${row.title} | ${row.description} |\n`;
  }
  blocks += `</details>\n`;
}

const readmePath = path.join(rootDir, "README.md");
const lines = fs.readFileSync(readmePath, "utf8").split("\n");
const start = lines.findIndex((l) => l.trim() === "<details>");
const endExcl = lines.map((l) => l.trim()).lastIndexOf("</details>") + 1;
if (start === -1 || endExcl === 0) {
  console.error("generate-readme: details block not found");
  process.exit(1);
}
const count = entries.length;
const head = lines.slice(0, start).join("\n")
  .replace(/\d+ tactile/, `${count} tactile`)
  .replace(/\*\*\d+ Crafted Components\*\*/, `**${count} Crafted Components**`);
const out = head + "\n" + blocks + lines.slice(endExcl).join("\n");
fs.writeFileSync(readmePath, out);
console.log(`generate-readme: ${count} components across ${SECTIONS.length} sections`);
