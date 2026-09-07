import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Sekmeler" };

export default function SekmelerPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // TABS</p>
      <h1 className="text-3xl font-semibold tracking-tight">Sekmeler</h1>
      <p className="text-sm text-muted-foreground">Sekmeler bileseni paneller arasi klavye destekli gecis sunar.</p>
      <p className="text-sm text-muted-foreground">Program, biletler ve mekan bilgisi gibi bolumleri tek alanda toplayin.</p>
      <CodeBox code="npx bigbullui add tabs" />
      <CodeBox block code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";\n\n<Tabs defaultValue="program"><TabsList><TabsTrigger value="program">Program</TabsTrigger></TabsList><TabsContent value="program">Aksam akisi</TabsContent></Tabs>`} />
      <Link href="/docs/tabs" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs &rarr;</span>
        <span className="mt-1 block text-sm text-muted-foreground">Tabs icin Ingilizce belge ve ornekleri acin.</span>
      </Link>
      <Link href="/tr/docs" className="inline-block rounded-sm font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
