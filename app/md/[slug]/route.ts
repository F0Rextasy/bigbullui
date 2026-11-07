import { notFound } from "next/navigation";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { components } from "@/lib/registry-site";
import docsContent from "@/data/docs-content.json";

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.name }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) notFound();
  const meta = components.find((component) => component.name === slug);
  if (!meta) notFound();
  const tsxFile = join(process.cwd(), "src/components/ui", `${meta.name}.tsx`);
  const libFile = join(process.cwd(), "src/components/ui/lib", `${meta.name}.ts`);
  const isLib = !existsSync(tsxFile) && existsSync(libFile);
  const sourceFile = isLib ? libFile : tsxFile;
  const relPath = isLib ? `src/components/ui/lib/${meta.name}.ts` : `src/components/ui/${meta.name}.tsx`;
  const lang = isLib ? "ts" : "tsx";
  const source = existsSync(sourceFile) ? readFileSync(sourceFile, "utf8") : "";
  const props = (docsContent.props as Record<string, { name: string; type: string; description: string }[]>)[meta.name] ?? [];
  const md = [
    `# ${meta.title} (bigbullui)`,
    ``,
    `${meta.description} Category: ${meta.category}. Zero dependencies (react + cn only).`,
    ``,
    `Docs: https://ui.bigbullapp.com/docs/${meta.name} · Registry: https://ui.bigbullapp.com/r/${meta.name}.json · Install: \`npx bigbullui add ${meta.name}\``,
    ``,
    `## Props`,
    ``,
    ...props.map((p) => `- \`${p.name}\` (${p.type})${p.description ? `: ${p.description}` : ""}`),
    ``,
    `## Source (\`${relPath}\`)`,
    ``,
    `\`\`\`${lang}`,
    source,
    "```",
    ``,
  ].join("\n");
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
