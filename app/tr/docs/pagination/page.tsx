import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Sayfalama" };

export default function PaginationPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // PAGINATION</p>
      <h1 className="text-3xl font-semibold tracking-tight">Sayfalama</h1>
      <p className="text-sm text-muted-foreground">Cok sayfali listelerde gezinmek icin Sayfalama kullanin. Numarali butonlar ve uc nokta ile calisir.</p>
      <p className="text-sm text-muted-foreground">Tablo ve arama sonuclarinda sayfa adimlamayi kolaylastirir.</p>
      <CodeBox code="npx bigbullui add pagination" />
      <CodeBox code="import { Pagination } from '@/components/ui/pagination'; <Pagination page={1} totalPages={10} onPageChange={() => {}} />" />
      <Link href="/docs/pagination" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/pagination.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
