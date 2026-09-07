import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Metin Alani" };

export default function TextareaPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // TEXTAREA</p>
      <h1 className="text-3xl font-semibold tracking-tight">Metin Alani</h1>
      <p className="text-sm text-muted-foreground">Cok satirli yazi girisi icin Metin Alani kullanin. Input ile ayni cizgili odaga sahiptir.</p>
      <p className="text-sm text-muted-foreground">Not, aciklama ve mesaj formlarinda tercih edin.</p>
      <CodeBox code="npx bigbullui add textarea" />
      <CodeBox code="import { Textarea } from '@/components/ui/textarea'; <Textarea placeholder='Not yazin' />" />
      <Link href="/docs/textarea" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/textarea.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
