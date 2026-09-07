import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Veri Tablosu" };

export default function DataTablePage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // DATA-TABLE</p>
      <h1 className="text-3xl font-semibold tracking-tight">Veri Tablosu</h1>
      <p className="text-sm text-muted-foreground">Siralama, arama ve sayfalama destekli operasyon tablosu icin Veri Tablosu kullanin. Satir secimi ile toplu is yapilir.</p>
      <p className="text-sm text-muted-foreground">Rapor ve yonetim panellerinde tercih edin.</p>
      <CodeBox code="npx bigbullui add data-table" />
      <CodeBox code="import { DataTable } from '@/components/ui/data-table'; <DataTable columns={cols} data={rows} />" />
      <Link href="/docs/data-table" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/data-table.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
