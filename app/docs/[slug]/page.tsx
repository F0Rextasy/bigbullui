import Link from "next/link";
import { notFound } from "next/navigation";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { components } from "@/lib/registry-site";
import docsContent from "@/data/docs-content.json";
import sizes from "@/data/sizes.json";
import { Badge } from "@/components/ui/badge";
import { ComponentPreview } from "@/components/site/component-preview";
import { MarkSeen } from "@/components/site/mark-seen";
import { CodeBox } from "@/components/site/code-box";
import { DocsStackBlitzButton } from "@/components/site/docs-stackblitz-button";

const usage = docsContent.usage as Record<string, string>;
const propsDocs = docsContent.props as Record<string, { name: string; type: string; description: string }[]>;
export function generateStaticParams() {
  return components.map((component) => ({ slug: component.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = components.find((component) => component.name === slug);
  return { title: meta ? meta.title : "Component" };
}
export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = components.find((component) => component.name === slug);
  if (!meta) notFound();

  const propsList = propsDocs[meta.name] ?? [];
  const idx = components.findIndex((component) => component.name === slug);
  const prev = idx > 0 ? components[idx - 1] : undefined;
  const next = idx >= 0 && idx < components.length - 1 ? components[idx + 1] : undefined;
  const relatedShelf = (meta.related ?? [])
    .map((name) => components.find((component) => component.name === name))
    .filter((item): item is (typeof components)[number] => Boolean(item));

  const tsxFile = join(process.cwd(), "src/components/ui", `${meta.name}.tsx`);
  const libFile = join(process.cwd(), "src/components/ui/lib", `${meta.name}.ts`);
  const isLib = !existsSync(tsxFile) && existsSync(libFile);
  const sourceFile = isLib ? libFile : tsxFile;
  const sourceLabel = isLib ? `lib/${meta.name}.ts` : `${meta.name}.tsx`;
  const sourceCode = existsSync(sourceFile) ? readFileSync(sourceFile, "utf8") : "";

  const defaultUsage = `import { ${meta.title.replace(/\s+/g, "")} } from "@/components/ui/${meta.name}";\n\n<${meta.title.replace(/\s+/g, "")} />`;
  const usageCode = usage[meta.name] ?? defaultUsage;

  const toc = [
    { id: "preview", label: "Preview" },
    { id: "install", label: "Install" },
    { id: "usage", label: "Usage" },
    ...(sourceCode ? [{ id: "source", label: "Source" }] : []),
    ...(propsList.length > 0 ? [{ id: "props", label: "Props" }] : []),
  ];

  return (
    <div className="flex items-start gap-10">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Docs", item: "https://ui.bigbullapp.com/docs" },
                { "@type": "ListItem", position: 2, name: meta.title, item: `https://ui.bigbullapp.com/docs/${meta.name}` },
              ],
            },
            {
              "@type": "SoftwareSourceCode",
              name: `bigbullui ${meta.title}`,
              description: meta.description,
              codeRepository: "https://github.com/F0Rextasy/bigbullui",
              programmingLanguage: "TypeScript",
              license: "https://opensource.org/licenses/MIT",
            },
          ],
        }).replace(/</g, "\\u003c"),
      }}
    />
    <article className="min-w-0 flex-1 space-y-10">
      <MarkSeen name={meta.name} />
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">Component</Badge>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {meta.category}
          </span>
          <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {(sizes.sizes as Record<string, { kb: number }>)[meta.name] ? `${(sizes.sizes as Record<string, { kb: number }>)[meta.name].kb} KB gzip` : "Zero dependencies"}
          </span>
          <span className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            Zero dependencies
          </span>
        </div>
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{meta.title}</h1>
        <p className="text-muted-foreground">{meta.description}</p>
      </header>

      <section className="space-y-3">
        <h2 id="preview" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Preview</h2>
        <ComponentPreview name={meta.name} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="install" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Installation</h2>
          <Link
            href="/docs/installation"
            className="font-mono text-xs text-accent-strong hover:underline"
          >
            Tokens guide &rarr;
          </Link>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Add to your project via CLI (zero dependencies, code you own):
          </p>
          <CodeBox code={`npx bigbullui add ${meta.name}`} />
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-xs text-muted-foreground">Or install the full npm package:</p>
          <CodeBox code="npm install bigbullui" />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="usage" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Usage</h2>
          <DocsStackBlitzButton name={meta.name} />
        </div>
          <CodeBox code={usageCode} block />
      </section>

      {sourceCode ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="source" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Source code</h2>
            <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
              {sourceLabel}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Zero dependencies (only React + utils). Copy and paste directly into your project:
          </p>
          <CodeBox code={sourceCode} block maxHeight="420px" />
        </section>
      ) : null}

      {propsList.length > 0 ? (
        <section className="space-y-3">
          <h2 id="props" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Props</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Prop</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {propsList.map((prop) => (
                  <tr key={prop.name} className="border-t border-border">
                    <td className="px-4 py-2 font-mono text-xs">{prop.name}</td>
                    <td className="px-4 py-2 font-mono text-xs">{prop.type}</td>
                    <td className="px-4 py-2 text-muted-foreground">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {relatedShelf.length > 0 ? (
        <section className="space-y-3">
          <h2 id="related" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Pairs well with</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedShelf.map((item) => (
              <Link
                key={item.name}
                href={`/docs/${item.name}`}
                className="group rounded-lg border-2 border-dashed border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="font-mono text-sm font-bold uppercase tracking-wider group-hover:text-accent-strong">{item.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <nav aria-label="More components" className="flex items-center justify-between gap-4 border-t border-border pt-6">
        {prev ? (
          <Link href={`/docs/${prev.name}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/docs/${next.name}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
    <aside className="hidden w-48 shrink-0 xl:block">
      <nav aria-label="On this page" className="sticky top-24 space-y-1">
        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
    </div>
  );
}
