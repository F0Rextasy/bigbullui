import { CopyButton } from "@/components/ui/copy-button";

export function CodeBox({ code, maxHeight }: { code: string; maxHeight?: string }) {
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
