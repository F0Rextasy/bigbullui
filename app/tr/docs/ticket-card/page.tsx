import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Bilet Karti" };

export default function TicketCardPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // TICKET-CARD</p>
      <h1 className="text-3xl font-semibold tracking-tight">Bilet Karti</h1>
      <p className="text-sm text-muted-foreground">Koltuk ve etkinlik bilgisi tasiyan giris bileti yuzeyi icin Bilet Karti kullanin. Yirtmac kenarlari ile gercek bilet hissi verir.</p>
      <p className="text-sm text-muted-foreground">Satis, rezervasyon ve giris ekranlarinda kullanin.</p>
      <CodeBox code="npx bigbullui add ticket-card" />
      <CodeBox code="import { TicketCard } from '@/components/ui/ticket-card'; <TicketCard eventName='Final Maci' date='12 Mayis' />" />
      <Link href="/docs/ticket-card" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/ticket-card.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
