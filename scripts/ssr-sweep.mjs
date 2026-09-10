import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, "")));
const need = createRequire(import.meta.url);

export async function runSweep() {
  const esbuild = need("esbuild");
  const React = need("react");
  const { renderToString } = need("react-dom/server");
  const uiDir = path.join(root, "src", "components", "ui");
  const outDir = path.join(root, ".tmp-ssr");
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx"));
  const crashes = {};
  for (const f of files) {
    const slug = f.replace(/\.tsx$/, "");
    const bundle = path.join(outDir, slug + ".cjs");
    try {
      esbuild.buildSync({
        entryPoints: [path.join(uiDir, f)],
        outfile: bundle,
        bundle: true,
        platform: "node",
        format: "cjs",
        external: ["react", "react-dom"],
        jsx: "automatic",
        logLevel: "silent",
      });
    } catch (e) {
      (crashes[slug] ||= []).push("BUNDLE:" + String(e).slice(0, 100));
      continue;
    }
    let mod;
    try {
      mod = need(bundle);
    } catch (e) {
      (crashes[slug] ||= []).push("REQUIRE:" + String((e && e.message) || e).slice(0, 100));
      continue;
    }
    for (const [name, exp] of Object.entries(mod)) {
      if (name === "__esModule" || typeof exp !== "function" || /^[a-z]/.test(name)) continue;
      try {
        renderToString(React.createElement(exp, {}));
      } catch (e) {
        (crashes[slug] ||= []).push(name + ":" + String((e && e.message) || e).slice(0, 100));
      }
    }
  }
  fs.rmSync(outDir, { recursive: true, force: true });
  return { files: files.length, crashes };
}
const baselinePath = path.join(root, "tests", "ssr-baseline.json");
async function main() {
  if (!process.argv.includes("--update")) return;
  const { files, crashes } = await runSweep();
  fs.writeFileSync(baselinePath, JSON.stringify({ files, crashes }, null, 1) + "\n");
  console.log(`ssr-sweep: baseline written (${files} files, ${Object.keys(crashes).length} known-crashing).`);
}
await main();
