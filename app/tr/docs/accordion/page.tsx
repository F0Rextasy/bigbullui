import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Akordeon" };

export default function AccordionPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // ACCORDION</p>
      <h1 className="text-3xl font-semibold tracking-tight">Akordeon</h1>
      <p className="text-sm text-muted-foreground">Uzun icerigi acilir kapanir basliklar altinda toplamak icin Akordeon kullanin. SSS ve ayar gruplari icin idealdir.</p>
      <p className="text-sm text-muted-foreground">Yukseklik gecisi yumusaktir, hareket azaltma tercihine saygi duyar.</p>
      <CodeBox code="npx bigbullui add accordion" />
      <CodeBox code="import { Accordion, AccordionItem } from '@/components/ui/accordion'; <Accordion><AccordionItem value='a' /></Accordion>" />
      <Link href="/docs/accordion" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/accordion.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
