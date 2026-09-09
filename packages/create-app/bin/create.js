#!/usr/bin/env node
/* Zero-dependency scaffolder: copies template/, names it, optionally installs. */

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name === "_gitignore" ? ".gitignore" : entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function main() {
  const args = process.argv.slice(2).filter((a) => a !== "--no-install");
  const noInstall = process.argv.includes("--no-install");
  const name = args[0];
  if (!name || name.startsWith("-")) {
    console.error("Usage: npx create-bigbull-app <project-name> [--no-install]");
    process.exit(1);
  }
  const dest = path.resolve(process.cwd(), name);
  if (fs.existsSync(dest)) {
    console.error(`Error: directory "${name}" already exists.`);
    process.exit(1);
  }
  copyDir(path.join(__dirname, "..", "template"), dest);

  const pkgPath = path.join(dest, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = name;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  console.log(`\n  Created ${name} with bigbullui + Tailwind CSS v4.\n`);
  if (!noInstall) {
    console.log("  Installing dependencies...\n");
    const r = spawnSync("npm", ["install", "--no-audit", "--no-fund"], { cwd: dest, stdio: "inherit", shell: true });
    if (r.status !== 0) {
      console.error("\n  Install failed — run `npm install` inside the project manually.");
      process.exit(r.status || 1);
    }
  }
  console.log(`\n  Next steps:\n    cd ${name}\n    npm run dev\n`);
}

main();
