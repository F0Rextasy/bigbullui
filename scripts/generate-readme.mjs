import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registrySrc = fs.readFileSync(path.join(rootDir, "src/lib/registry-site.ts"), "utf8");

const entries = [
  ...registrySrc.matchAll(
    /\{\s*name:\s*"([^"]+)",\s*title:\s*"((?:[^"\\]|\\.)+)",\s*description:\s*"((?:[^"\\]|\\.)+)",\s*category:\s*"([^"]+)"[\s\S]*?\}/gs
  ),
].map((m) => ({
  name: m[1],
  title: m[2].replace(/\\"/g, '"'),
  description: m[3].replace(/\\"/g, '"').replace(/\|/g, "/"),
  category: m[4],
}));

const SECTIONS = [
  { title: "Form & Pickers", blurb: "inputs, pickers, toggles and controls", categories: ["form", "pickers"] },
  { title: "Ticket Stub & Display", blurb: "surfaces, badges, charts and data views", categories: ["ticket-stub", "charts", "data", "media", "editors"] },
  { title: "Feedback", blurb: "notices, alerts and status indicators", categories: ["feedback"] },
  { title: "Navigation", blurb: "command bars, tabs, sidebars and wayfinding", categories: ["navigation"] },
];

let blocks = `<details open>\n<summary><strong>Catalog Summary (${entries.length} Components)</strong> — browse full index at <a href="https://ui.bigbullapp.com/docs">ui.bigbullapp.com/docs</a></summary>\n\n`;
blocks += `| Group | Count | Highlights |\n|---|---:|---|\n`;
for (const section of SECTIONS) {
  const rows = entries.filter((e) => section.categories.includes(e.category));
  if (rows.length === 0) continue;
  const sample = rows
    .slice(0, 6)
    .map((r) => `[\`${r.name}\`](https://ui.bigbullapp.com/docs/${r.name})`)
    .join(", ");
  blocks += `| **${section.title}** — ${section.blurb} | ${rows.length} | ${sample} |\n`;
}
blocks += `\nFull catalog: [Component Docs](https://ui.bigbullapp.com/docs) · [Page Blocks](https://ui.bigbullapp.com/blocks) · [Icons](https://ui.bigbullapp.com/icons) · [llms-full.txt](https://ui.bigbullapp.com/llms-full.txt)\n`;
blocks += `</details>\n`;

const readmePath = path.join(rootDir, "README.md");
const raw = fs.readFileSync(readmePath, "utf8");
const eol = raw.includes("\r\n") ? "\r\n" : "\n";
const normalized = raw.replace(/\r\n/g, "\n");
const lines = normalized.split("\n");
const start = lines.findIndex((l) => l.trim().startsWith("<details"));
const endExcl = lines.map((l) => l.trim()).lastIndexOf("</details>") + 1;
if (start === -1 || endExcl === 0 || endExcl <= start) {
  console.error("generate-readme: <details>...</details> markers not found cleanly in README.md");
  process.exit(1);
}
const count = entries.length;
const head = lines
  .slice(0, start)
  .join("\n")
  .replace(/\d+ tactile/, `${count} tactile`)
  .replace(/\*\*\d+ Crafted Components\*\*/, `**${count} Crafted Components**`);
const out = head + "\n" + blocks + lines.slice(endExcl).join("\n");
if (process.argv.includes("--check")) {
  if (normalized !== out) {
    console.error("generate-readme: README.md is out of date — run node scripts/generate-readme.mjs");
    process.exit(1);
  }
  console.log(`generate-readme: README.md up to date (${count} components across ${SECTIONS.length} sections, ${Buffer.byteLength(out, "utf8")} bytes)`);
} else {
  fs.writeFileSync(readmePath, eol === "\r\n" ? out.replace(/\n/g, "\r\n") : out);
  console.log(`generate-readme: ${count} components summarized (${Buffer.byteLength(out, "utf8")} bytes)`);
}
