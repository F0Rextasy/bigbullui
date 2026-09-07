import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Acilir Menu" };

export default function DropdownMenuPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // DROPDOWN-MENU</p>
      <h1 className="text-3xl font-semibold tracking-tight">Acilir Menu</h1>
      <p className="text-sm text-muted-foreground">Butondan acilan aksiyon listesi icin Acilir Menu kullanin. Klavye kisayollari ve ayraclar desteklenir.</p>
      <p className="text-sm text-muted-foreground">Satir islemleri ve hizli aksiyonlar icin tercih edin.</p>
      <CodeBox code="npx bigbullui add dropdown-menu" />
      <CodeBox code="import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu'; <DropdownMenuItem>Duzenle</DropdownMenuItem>" />
      <Link href="/docs/dropdown-menu" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/dropdown-menu.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
