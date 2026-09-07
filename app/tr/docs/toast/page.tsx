import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Bildirim" };

export default function ToastPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // TOAST</p>
      <h1 className="text-3xl font-semibold tracking-tight">Bildirim</h1>
      <p className="text-sm text-muted-foreground">Kisa sureli bilgi mesajlari icin Bildirim kullanin. Otomatik kapanir ve ust uste dizilir.</p>
      <p className="text-sm text-muted-foreground">Kaydetme onayi ve hata uyarisi gibi anlik geri bildirimler icin idealdir.</p>
      <CodeBox code="npx bigbullui add toast" />
      <CodeBox code="import { useToast } from '@/components/ui/toast'; const { toast } = useToast(); toast({ title: 'Bilet alindi' })" />
      <Link href="/docs/toast" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/toast.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
