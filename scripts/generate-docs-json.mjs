import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { extractComponentProps } from "./lib/extract-props.mjs";

// Bundles src/lib/docs-content.ts and merges TypeScript AST-extracted *Props signatures
// from src/components/ui/*.tsx into src/data/docs-content.json so docs prop tables stay
// synchronized with component source files.
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const need = createRequire(import.meta.url);
const esbuild = need("esbuild");
const checkOnly = process.argv.includes("--check");

const src = path.join(root, "src", "lib", "docs-content.ts");
const out = path.join(root, "src", "data", "docs-content.json");
const wavesOut = path.join(root, "src", "data", "preview-waves.json");
const uiDir = path.join(root, "src", "components", "ui");
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-docs-"));
const tmp = path.join(tmpDir, "docs-content.cjs");

if (!fs.existsSync(src)) {
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.error("generate-docs-json: src/lib/docs-content.ts is missing");
  process.exit(1);
}

let docsContent;
try {
  esbuild.buildSync({
    entryPoints: [src],
    outfile: tmp,
    bundle: true,
    platform: "node",
    format: "cjs",
    logLevel: "silent",
  });
  docsContent = need(tmp).docsContent;
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

const catalogPath = path.join(root, "src", "data", "catalog.json");
if (!fs.existsSync(catalogPath)) {
  console.error("generate-docs-json: run generate-registry-json.mjs first (catalog.json missing)");
  process.exit(1);
}
const slugs = [...new Set(need(catalogPath).items.map((i) => i.name))];
const slugSet = new Set(slugs);

const unknownUsage = Object.keys(docsContent.usage).filter((k) => !slugSet.has(k));
const unknownProps = Object.keys(docsContent.props).filter((k) => !slugSet.has(k));
if (unknownUsage.length > 0 || unknownProps.length > 0) {
  console.error(
    `generate-docs-json: docs keys without a catalog component — usage: [${unknownUsage.slice(0, 10).join(", ")}] props: [${unknownProps.slice(0, 10).join(", ")}]`
  );
  process.exit(1);
}

const COMMON_PROP_DESC = {
  className: "Optional Tailwind or custom CSS classes merged with component styles.",
  children: "Child elements rendered inside the component.",
  variant: "Visual style variant.",
  size: "Component size preset.",
  disabled: "Disables interaction and applies disabled styling.",
  readOnly: "Makes the control non-editable while remaining focusable.",
  required: "Marks the input as required for native form validation.",
  loading: "Displays a busy loading state and blocks duplicate triggers.",
  open: "Controlled open visibility state.",
  defaultOpen: "Initial open state when uncontrolled.",
  value: "Controlled value.",
  defaultValue: "Initial value when uncontrolled.",
  checked: "Controlled checked state.",
  defaultChecked: "Initial checked state when uncontrolled.",
  pressed: "Controlled pressed toggle state.",
  defaultPressed: "Initial pressed state when uncontrolled.",
  placeholder: "Placeholder text shown when empty.",
  label: "Accessible label text rendered or attached to the control.",
  title: "Primary heading or title text.",
  subtitle: "Supporting secondary heading text.",
  description: "Descriptive helper or subtitle text.",
  error: "Validation error message rendered in an alert region.",
  name: "Form field name submitted during form serialization.",
  id: "DOM element identifier for label association and testing.",
  href: "Destination URL rendered as a link target.",
  items: "Structured list of items rendered by the component.",
  options: "Selectable options list.",
  columns: "Column definitions describing headers, cell keys, and sorting.",
  data: "Dataset array rendered in charts, grids, or tables.",
  min: "Minimum allowed numeric or date bound.",
  max: "Maximum allowed numeric or date bound.",
  step: "Step increment for numeric or range adjustments.",
  dir: "Explicit reading direction override (ltr or rtl).",
  asChild: "Merges props onto the single child element instead of wrapping.",
  orientation: "Layout and keyboard navigation axis.",
  icon: "Custom icon node rendered alongside the label.",
  status: "Semantic status indicator.",
  tone: "Semantic surface or emphasis tone.",
};

function humanizePropName(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .toLowerCase();
}

function describePropFallback(name, type, defaultValue) {
  const base = COMMON_PROP_DESC[name];
  if (base) {
    return defaultValue ? `${base} (Default: ${defaultValue})` : base;
  }
  const suffix = defaultValue ? ` (Default: ${defaultValue})` : "";
  if (name.startsWith("on") && name.length > 2 && /[A-Z]/.test(name[2])) {
    const action = humanizePropName(name.slice(2));
    return `Callback invoked on ${action}.${suffix}`;
  }
  if (type === "boolean") {
    return `Toggles ${humanizePropName(name)}.${suffix}`;
  }
  return `Configures ${humanizePropName(name)}.${suffix}`;
}

const mergedProps = {};
let astExtractedCount = 0;

for (const slug of slugs) {
  const manualList = docsContent.props[slug] ?? [];
  const manualByName = new Map(manualList.map((p) => [p.name, p]));
  const tsxPath = path.join(uiDir, `${slug}.tsx`);
  const ast = extractComponentProps(tsxPath);

  if (!ast || (ast.primaryProps.length === 0 && ast.allPropsByName.size === 0)) {
    if (Object.hasOwn(docsContent.props, slug)) mergedProps[slug] = manualList;
    continue;
  }

  astExtractedCount += 1;
  const nextList = [];
  const seen = new Set();

  for (const prop of ast.primaryProps) {
    if (seen.has(prop.name)) continue;
    seen.add(prop.name);
    const manual = manualByName.get(prop.name);
    const desc =
      prop.description ||
      manual?.description ||
      describePropFallback(prop.name, prop.type, prop.defaultValue);
    nextList.push({
      name: prop.name,
      type: prop.type,
      description: desc,
    });
  }

  for (const manual of manualList) {
    if (seen.has(manual.name)) continue;
    const secondary = ast.allPropsByName.get(manual.name);
    if (secondary) {
      seen.add(manual.name);
      nextList.push({
        name: manual.name,
        type: secondary.type,
        description: secondary.description || manual.description || describePropFallback(manual.name, secondary.type, secondary.defaultValue),
      });
    } else if (manual.name === "className" || manual.name === "children") {
      seen.add(manual.name);
      nextList.push(manual);
    }
  }

  if (nextList.length > 0) {
    mergedProps[slug] = nextList;
  } else if (Object.hasOwn(docsContent.props, slug)) {
    mergedProps[slug] = manualList;
  }
}

const nextDocsJson = JSON.stringify({ usage: docsContent.usage, props: mergedProps });

const previewsDir = path.join(root, "src", "components", "site", "previews");
const previewWaves = {};
const previewFiles = fs.readdirSync(previewsDir).filter((f) => f.endsWith(".tsx")).sort();
for (const file of previewFiles) {
  const wave = file.replace(/\.tsx$/, "");
  const content = fs.readFileSync(path.join(previewsDir, file), "utf8");
  const idx = content.lastIndexOf("export const ");
  if (idx < 0) continue;
  const exportBlock = content.slice(idx);
  for (const m of exportBlock.matchAll(/\r?\n  (?:"([a-z0-9][a-z0-9-]*)"|([a-z][a-z0-9-]*))\s*:/g)) {
    const slug = m[1] || m[2];
    if (slug) previewWaves[slug] = wave;
  }
}
const nextWavesJson = JSON.stringify(previewWaves);

if (checkOnly) {
  const diskDocs = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  const diskWaves = fs.existsSync(wavesOut) ? fs.readFileSync(wavesOut, "utf8") : "";
  if (diskDocs !== nextDocsJson || diskWaves !== nextWavesJson) {
    console.error("generate-docs-json --check: STALE src/data/docs-content.json or preview-waves.json — run npm run prebuild");
    process.exit(1);
  }
  console.log(
    `generate-docs-json --check: OK (${Object.keys(docsContent.usage).length} usage + ${Object.keys(mergedProps).length} props, ${astExtractedCount} AST-synced)`
  );
} else {
  fs.writeFileSync(out, nextDocsJson);
  fs.writeFileSync(wavesOut, nextWavesJson);
  console.log(
    `generate-docs-json: ${Object.keys(docsContent.usage).length} usage + ${Object.keys(mergedProps).length} props (${astExtractedCount} AST-synced) + ${Object.keys(previewWaves).length} preview waves`
  );
}
