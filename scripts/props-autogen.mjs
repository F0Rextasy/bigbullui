import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Props autogen: appends missing `"slug": [...]` entries to wave-props3.ts
// by parsing exported *Props interfaces (types + JSDoc) from ui sources.
// Never rewrites hand-written entries; reports what it added.
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const uiDir = path.join(rootDir, "src", "components", "ui");
const propsPath = path.join(rootDir, "app", "docs", "[slug]", "wave-props3.ts");

function parseProps(source) {
  const out = [];
  // match: optional JSDoc + field, inside the FIRST exported *Props interface/type
  const iface = source.match(/export\s+(?:interface|type)\s+\w*Props\w*\s*(?:extends[^{]+)?\{([\s\S]*?)\n\};?/);
  if (!iface) return out;
  const body = iface[1];
  const fieldRe = /(?:\/\*\*([\s\S]*?)\*\/\s*)?([A-Za-z0-9_?"']+)\s*(\?)?:\s*([^;\n]+);?/g;
  let m;
  while ((m = fieldRe.exec(body)) !== null) {
    const rawName = m[2].replace(/["']/g, "");
    if (rawName === "__esModule") continue;
    const desc = (m[1] || "").split("\n").map((l) => l.replace(/^\s*\*\s?/, "").trim()).filter(Boolean).join(" ");
    out.push({ name: rawName + (m[3] ? "?" : ""), type: m[4].trim(), description: desc });
    if (out.length >= 40) break;
  }
  return out;
}

const current = fs.readFileSync(propsPath, "utf8");
const missing = [];
for (const f of fs.readdirSync(uiDir).filter((x) => x.endsWith(".tsx")).sort()) {
  const slug = f.replace(/\.tsx$/, "");
  if (current.includes(`"${slug}": [`)) continue;
  const fields = parseProps(fs.readFileSync(path.join(uiDir, f), "utf8"));
  if (fields.length > 0) missing.push({ slug, fields });
}

if (missing.length === 0) {
  console.log("props-autogen: wave-props3.ts already complete.");
} else {
  const block = missing
    .map(
      ({ slug, fields }) =>
        `  "${slug}": [\n${fields.map((p) => `    { name: ${JSON.stringify(p.name)}, type: ${JSON.stringify(p.type)}, description: ${JSON.stringify(p.description)} },`).join("\n")}\n  ],`
    )
    .join("\n");
  const next = current.replace(/\n\};\s*$/, `\n${block}\n};\n`);
  if (next === current) {
    console.error("props-autogen: could not locate closing of wavePropsDocs3.");
    process.exit(1);
  }
  fs.writeFileSync(propsPath, next);
  console.log(`props-autogen: added ${missing.length} slugs: ${missing.map((m) => m.slug).join(", ")}`);
}
