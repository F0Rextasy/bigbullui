import Link from "next/link";
import { components } from "@/lib/registry-site";

export const metadata = { title: "Components" };

export default function DocsIndex() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-[-0.03em]">Components</h1>
      <p className="mt-2 text-muted-foreground">
        {components.length} animated, accessible components. Copy the code, own it.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <Link
            key={component.name}
            href={`/docs/${component.name}`}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/20"
          >
            <h2 className="font-medium">{component.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{component.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
