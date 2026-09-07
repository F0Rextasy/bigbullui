import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Anahtar" };

export default function AnahtarPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // SWITCH</p>
      <h1 className="text-3xl font-semibold tracking-tight">Anahtar</h1>
      <p className="text-sm text-muted-foreground">Anahtar bileseni acik kapali durum icin kayar baslikli gecis sunar.</p>
      <p className="text-sm text-muted-foreground">Bildirim ve hatirlatma tercihleri gibi ikili ayarlarda kullanin.</p>
      <CodeBox code="npx bigbullui add switch" />
      <CodeBox block code={`import { Switch } from "@/components/ui/switch";\n\n<Switch aria-label="Bildirimler" />`} />
      <Link href="/docs/switch" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs &rarr;</span>
        <span className="mt-1 block text-sm text-muted-foreground">Switch icin Ingilizce belge ve ornekleri acin.</span>
      </Link>
      <Link href="/tr/docs" className="inline-block rounded-sm font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
