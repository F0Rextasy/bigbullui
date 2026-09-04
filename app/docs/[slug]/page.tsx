import Link from "next/link";
import { notFound } from "next/navigation";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { components } from "@/lib/registry-site";
import { ComponentPreview } from "@/components/site/component-preview";
import { CodeCopy } from "@/components/site/code-copy";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = components.find((component) => component.name === slug);
  return { title: meta ? meta.title : "Component" };
}

const usage: Record<string, string> = {
  button: `import { Button } from "@/components/ui/button";\n\n<Button>Click me</Button>\n<Button variant="outline" size="lg">Outline</Button>`,
  input: `import { Input } from "@/components/ui/input";\n\n<Input type="email" placeholder="Email" />`,
  card: `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";\n\n<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n    <CardDescription>Description</CardDescription>\n  </CardHeader>\n  <CardContent>Content</CardContent>\n</Card>`,
  badge: `import { Badge } from "@/components/ui/badge";\n\n<Badge>New</Badge>\n<Badge variant="accent">Accent</Badge>`,
  accordion: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";\n\n<Accordion defaultValue="a">\n  <AccordionItem value="a">\n    <AccordionTrigger>Question?</AccordionTrigger>\n    <AccordionContent>Answer.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
  dialog: `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open</Button>\n<Dialog open={open} onOpenChange={setOpen}>\n  <DialogHeader>\n    <DialogTitle>Title</DialogTitle>\n    <DialogDescription>Description.</DialogDescription>\n  </DialogHeader>\n  <DialogFooter>\n    <Button onClick={() => setOpen(false)}>Got it</Button>\n  </DialogFooter>\n</Dialog>`,
  tabs: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";\n\n<Tabs defaultValue="one">\n  <TabsList>\n    <TabsTrigger value="one">One</TabsTrigger>\n    <TabsTrigger value="two">Two</TabsTrigger>\n  </TabsList>\n  <TabsContent value="one">First.</TabsContent>\n  <TabsContent value="two">Second.</TabsContent>\n</Tabs>`,
  tooltip: `import { Tooltip } from "@/components/ui/tooltip";\n\n<Tooltip content="Helpful text">\n  <Button variant="outline">Hover me</Button>\n</Tooltip>`,
  "comet-button": `import { CometButton } from "@/components/ui/comet-button";\n\n<CometButton>Launch</CometButton>\n<CometButton variant="accent" size="lg">Get started</CometButton>`,
};

const propsDocs: Record<string, { name: string; type: string; description: string }[]> = {
  button: [
    { name: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "link"', description: "Visual style." },
    { name: "size", type: '"default" | "sm" | "lg" | "icon"', description: "Size of the button." },
  ],
  input: [{ name: "type", type: "string", description: "HTML input type." }],
  card: [],
  badge: [{ name: "variant", type: '"default" | "secondary" | "outline" | "accent"', description: "Visual style." }],
  accordion: [
    { name: "defaultValue", type: "string", description: "Initially open item value." },
    { name: "value", type: "string (on AccordionItem)", description: "Unique item identifier." },
  ],
  dialog: [
    { name: "open", type: "boolean", description: "Whether the dialog is open (controlled)." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when open state should change." },
  ],
  tabs: [
    { name: "defaultValue", type: "string", description: "Initially active tab value." },
    { name: "value", type: "string", description: "Controlled active tab value." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called when active tab changes." },
  ],
  tooltip: [
    { name: "content", type: "React.ReactNode", description: "Tooltip text or content." },
    { name: "side", type: '"top" | "bottom"', description: "Placement of the tooltip." },
    { name: "delayMs", type: "number", description: "Delay before showing (default 300)." },
  ],
  "comet-button": [
    { name: "variant", type: '"default" | "accent"', description: "Visual style." },
    { name: "size", type: '"default" | "lg"', description: "Size of the button." },
    { name: "glare", type: "string", description: "Cursor glare color (default soft white glow)." },
  ],
};

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = components.find((component) => component.name === slug);
  if (!meta) notFound();

  const source = readFileSync(join(process.cwd(), "src", "components", "ui", `${meta.name}.tsx`), "utf8");
  const propsList = propsDocs[meta.name] ?? [];

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <Badge variant="accent">Component</Badge>
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">{meta.title}</h1>
        <p className="text-muted-foreground">{meta.description}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Preview</h2>
        <ComponentPreview name={meta.name} />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Usage</h2>
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code={usage[meta.name] ?? ""} />
          </div>
          <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>{usage[meta.name] ?? ""}</code>
          </pre>
        </div>
      </section>

      {propsList.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Props</h2>
          <div className="overflow-hidden rounded-lg border border-border">
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

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Source</h2>
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code={source} />
          </div>
          <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>{source}</code>
          </pre>
        </div>
        <p className="text-xs text-muted-foreground">
          Copy this file into your project. It only imports React and the{" "}
          <code className="font-mono">cn</code> helper from{" "}
          <code className="font-mono">ui/lib/utils</code> — copy that file too if you do not have it.
        </p>
      </section>

      <footer>
        <Link href="/docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← All components
        </Link>
      </footer>
    </article>
  );
}
