import Link from "next/link";
import { components } from "@/lib/registry-site";

export function DocSidebar() {
  return (
    <nav className="sticky top-24 space-y-1">
      <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Guides
      </p>
      <Link
        href="/docs/installation"
        className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        Installation
      </Link>
      <Link
        href="/docs/tokens"
        className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        Tokens
      </Link>
      <p className="mb-2 px-2 pt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Components
      </p>
      {components.map((component) => (
        <Link
          key={component.name}
          href={`/docs/${component.name}`}
          className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {component.title}
        </Link>
      ))}
    </nav>
  );
}
