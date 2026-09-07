import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Tablo" };

export default function TabloPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // TABLE</p>
      <h1 className="text-3xl font-semibold tracking-tight">Tablo</h1>
      <p className="text-sm text-muted-foreground">Tablo bileseni kesik satir cizgili ve mono baslikli veri tablosu sunar.</p>
      <p className="text-sm text-muted-foreground">Sira ve koltuk listesi gibi operasyon verileri icin idealdir.</p>
      <CodeBox code="npx bigbullui add table" />
      <CodeBox block code={`import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "@/components/ui/table";\n\n<Table><TableHead><TableRow><TableHeaderCell>Koltuk</TableHeaderCell></TableRow></TableHead><TableBody><TableRow><TableCell>A12</TableCell></TableRow></TableBody></Table>`} />
      <Link href="/docs/table" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs &rarr;</span>
        <span className="mt-1 block text-sm text-muted-foreground">Table icin Ingilizce belge ve ornekleri acin.</span>
      </Link>
      <Link href="/tr/docs" className="inline-block rounded-sm font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
