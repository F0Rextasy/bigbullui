import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Avatar" };

export default function AvatarPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // AVATAR</p>
      <h1 className="text-3xl font-semibold tracking-tight">Avatar</h1>
      <p className="text-sm text-muted-foreground">Kullanici fotografi veya bas harf gosteren yuvarlak rozet icin Avatar kullanin. Kesik cizgili halka ile bilet kimligine uyar.</p>
      <p className="text-sm text-muted-foreground">Fotograf yoksa bas harfler otomatik olarak gosterilir.</p>
      <CodeBox code="npx bigbullui add avatar" />
      <CodeBox code="import { Avatar } from '@/components/ui/avatar'; <Avatar name='Ada Yilmaz' />" />
      <Link href="/docs/avatar" className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="font-mono text-sm font-bold">English docs</span>
        <span className="mt-1 block text-sm text-muted-foreground">Ingilizce belgeyi acin: /docs/avatar.</span>
      </Link>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">TR docs &rarr;</Link>
    </main>
  );
}
