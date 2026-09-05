import { CopyButton } from "@/components/ui/copy-button";

/** Plain dark code box with our bordered copy button. No chrome, no badges. */
export function CodeBox({ code, maxHeight }: { code: string; maxHeight?: string }) {
  return (
    <div className="overflow-hidden rounded-lg bg-[#08080c]">
      <div className="flex items-center justify-end px-3 pt-3">
        <CopyButton value={code} />
      </div>
      <pre
        className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]"
        style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
