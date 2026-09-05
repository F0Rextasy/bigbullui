import { CopyButton } from "@/components/ui/copy-button";

export function CodeBox({ code, maxHeight, block }: { code: string; maxHeight?: string; block?: boolean }) {
  if (!block) {
    return (
      <span className="inline-flex max-w-full items-center gap-2 rounded-md border-2 border-dashed border-foreground/30 bg-card px-3 py-2">
        <code className="truncate font-mono text-[13px] text-foreground">{code}</code>
        <CopyButton value={code} />
      </span>
    );
  }
  return (
    <div className="overflow-hidden rounded-md border-2 border-dashed border-foreground/30 bg-card">
      <div className="flex items-center justify-end px-3 pt-3">
        <CopyButton value={code} />
      </div>
      <pre
        className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-foreground"
        style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
