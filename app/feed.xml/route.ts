import changelog from "@/data/changelog.json";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const items = changelog.entries
    .map(
      (e) => `    <item>
      <title>${esc(e.version)} ${esc(e.title)}</title>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      <description>${esc(e.changes.join(" "))}</description>
    </item>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>bigbullui changelog</title>
    <link>https://ui.bigbullapp.com/docs</link>
    <description>Release notes for bigbullui ticket stub components.</description>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml" } });
}
