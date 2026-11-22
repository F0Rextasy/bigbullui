import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const need = createRequire(import.meta.url);

function loadBundle(bundlePath) {
  const localReq = createRequire(bundlePath);
  const req = (id) => (id.startsWith(".") ? localReq(id) : need(id));
  req.resolve = need.resolve;
  const fn = vm.compileFunction(
    fs.readFileSync(bundlePath, "utf8"),
    ["exports", "require", "module", "__filename", "__dirname"],
    { filename: bundlePath },
  );
  const mod = { exports: {} };
  fn(mod.exports, req, mod, bundlePath, path.dirname(bundlePath));
  return mod.exports;
}

export async function runSweep() {
  const esbuild = need("esbuild");
  const React = need("react");
  const { renderToString } = need("react-dom/server");
  const uiDir = path.join(root, "src", "components", "ui");
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-ssr-"));
  const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx"));
  const crashes = {};
  try {
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
        mod = loadBundle(bundle);
      } catch (e) {
        (crashes[slug] ||= []).push("REQUIRE:" + String((e && e.message) || e).slice(0, 100));
        continue;
      }
      for (const [name, exp] of Object.entries(mod)) {
        const isForwardOrMemo =
          typeof exp === "object" &&
          exp !== null &&
          (exp.$$typeof === Symbol.for("react.forward_ref") ||
            exp.$$typeof === Symbol.for("react.memo"));
        if (name === "__esModule" || (typeof exp !== "function" && !isForwardOrMemo) || /^[a-z]/.test(name)) continue;
        try {
          renderToString(React.createElement(exp, {}));
        } catch (e) {
          (crashes[slug] ||= []).push(name + ":" + String((e && e.message) || e).slice(0, 100));
        }
      }
    }
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
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
