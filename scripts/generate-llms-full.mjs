import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const regPath = path.join(rootDir, "src", "lib", "registry-site.ts");
const content = fs.readFileSync(regPath, "utf8");

// Parse categories
const categoryMatches = [
  ...content.matchAll(
    /\{\s*id:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'],\s*description:\s*["']([^"']+)["']\s*\}/g
  ),
];
const categories = categoryMatches.map((m) => ({
  id: m[1],
  name: m[2],
  description: m[3],
}));

// Parse components
const componentMatches = [
  ...content.matchAll(
    /\{\s*name:\s*["']([^"']+)["'],\s*title:\s*["']([^"']+)["'],\s*description:\s*["']([^"']+)["'],\s*category:\s*["']([^"']+)["']/g
  ),
];
const components = componentMatches.map((m) => ({
  name: m[1],
  title: m[2],
  description: m[3],
  category: m[4],
}));

let doc = "# bigbullui — Full Component & Agent Specification\n\n";
doc +=
  "> Complete catalog of 462 zero-dependency React 19 + Tailwind CSS 4 components with Ticket Stub aesthetic.\n\n";
doc += "## Installation & CLI\n";
doc += "```bash\n";
doc += "# Add components via zero-dep CLI:\n";
doc += "npx bigbullui add <component-name>\n";
doc += "# Or install all-in-one package:\n";
doc += "npm install bigbullui\n";
doc += "```\n\n";
doc += "## Tailwind CSS v4 Setup\n";
doc += "```css\n";
doc += '@import "tailwindcss";\n';
doc += '@import "bigbullui/css";\n';
doc += "```\n\n";
doc += "## Core Architecture Rules\n";
doc += "1. Components in `src/components/ui/*` import ONLY `react` and `./lib/utils`.\n";
doc += "2. No third-party packages (no Radix, no Lucide, no Framer Motion).\n";
doc += "3. All styles use semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`, `border-border`).\n";
doc += "4. Keyboard focus rings (`focus-visible:ring-2 ring-ring`) and `motion-reduce` fallbacks are built-in.\n\n";
doc += "## Component Catalog (462 Components)\n\n";

for (const cat of categories) {
  const catComps = components.filter((c) => c.category === cat.id);
  doc += `### ${cat.name} (${catComps.length} components)\n`;
  doc += `${cat.description}\n\n`;
  for (const c of catComps) {
    doc += `- **${c.title}** (\`${c.name}\`): ${c.description} → https://ui.bigbullapp.com/docs/${c.name}\n`;
  }
  doc += "\n";
}

const outputPath = path.join(rootDir, "public", "llms-full.txt");
fs.writeFileSync(outputPath, doc, "utf8");
console.log(
  `Generated public/llms-full.txt with ${components.length} components across ${categories.length} categories.`
);
