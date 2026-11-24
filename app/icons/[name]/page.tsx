import { notFound } from "next/navigation";
import { ICON_PATHS, NAV_ICON_CATEGORIES, NAV_ICON_NAMES, type NavIconName } from "@/components/site/icon-data";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { IconDetail } from "@/components/site/icon-detail";
import { serializeIconNode } from "@/lib/serialize-icon";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return NAV_ICON_NAMES.map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return buildMetadata({
    title: `${name} icon`,
    description: `Ticket-stub stroke SVG icon "${name}" from bigbullicons — inspect stroke width, copy inline SVG, or install via CLI.`,
    path: `/icons/${name}`,
  });
}

export default async function IconDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const idx = NAV_ICON_NAMES.indexOf(name as NavIconName);
  if (idx === -1) notFound();
  const iconName = name as NavIconName;
  const prev = NAV_ICON_NAMES[(idx - 1 + NAV_ICON_NAMES.length) % NAV_ICON_NAMES.length];
  const next = NAV_ICON_NAMES[(idx + 1) % NAV_ICON_NAMES.length];
  const nodes = serializeIconNode(ICON_PATHS[iconName]);
  const category = NAV_ICON_CATEGORIES[iconName];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-3xl space-y-6 overflow-x-hidden px-4 py-10 sm:px-6">
        <IconDetail
          name={iconName}
          category={category}
          nodes={nodes}
          prev={prev}
          next={next}
          index={idx}
          total={NAV_ICON_NAMES.length}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
