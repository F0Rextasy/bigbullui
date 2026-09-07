import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Onay Kutusu" };

export default function OnayKutusuPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // CHECKBOX</p>
      <h1 className="text-3xl font-semibold tracking-tight">Onay Kutusu</h1>
      <p className="text-sm text-muted-foreground">Onay kutusu kosul ve tercih secimi icin net isaret durumu sunar.</p>
      <p className="text-sm text-muted-foreground">Katilim kosullari ve bulten onayi gibi alanlarda tek basina kullanin.</p>
      <CodeBox code="npx bigbullui add checkbox" />
      <CodeBox block code={`import { Checkbox } from "@/components/ui/checkbox";\n\n<Checkbox aria-label="Kosullari kabul et" />`} />
      <Link href="/docs/checkbox" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs &rarr;</span>
        <span className="mt-1 block text-sm text-muted-foreground">Checkbox icin Ingilizce belge ve ornekleri acin.</span>
      </Link>
      <Link href="/tr/docs" className="inline-block rounded-sm font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
