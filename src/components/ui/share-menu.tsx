"use client";

import * as React from "react";
import { cn, isSafeUrl } from "./lib/utils";
import { useCopy } from "./lib/hooks";

export interface ShareMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy"> {
  url?: string;
  title?: string;
  label?: string;
  defaultOpen?: boolean;
  onCopy?: (url: string) => void;
  onShare?: (platform: "x" | "facebook" | "linkedin" | "email", url: string) => void;
}

export const ShareMenu = React.forwardRef<HTMLDivElement, ShareMenuProps>(function ShareMenu(
  {
    url,
    title = "Check this out",
    label = "Share",
    defaultOpen = false,
    onCopy,
    onShare,
    className,
    ...props
  },
  ref,
) {
  const [open, setOpen] = React.useState(defaultOpen);
  const { copied, copy } = useCopy();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const menuId = React.useId();

  React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);

  const resolveShareUrl = () => {
    if (url && isSafeUrl(url)) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  };

  React.useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleCopy = () => {
    const targetUrl = resolveShareUrl();
    if (!targetUrl) return;
    copy(targetUrl);
    onCopy?.(targetUrl);
    setOpen(false);
  };

  const handlePlatformShare = (platform: "x" | "facebook" | "linkedin" | "email") => {
    const targetUrl = resolveShareUrl();
    onShare?.(platform, targetUrl);
    if (typeof window !== "undefined" && targetUrl) {
      const encodedUrl = encodeURIComponent(targetUrl);
      const encodedTitle = encodeURIComponent(title);
      const hrefs: Record<typeof platform, string> = {
        x: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      };
      const dest = hrefs[platform];
      if (platform === "email") {
        window.location.href = dest;
      } else {
        window.open(dest, "_blank", "noopener,noreferrer");
      }
    }
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative inline-flex items-center gap-2", className)} {...props}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((prev) => !prev)}
        className="relative inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-2 text-xs font-mono uppercase tracking-wider text-foreground transition-colors duration-150 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>{label}</span>
      </button>

      {copied && (
        <span
          role="status"
          className="rounded-sm bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-accent-strong"
        >
          Copied
        </span>
      )}

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute end-0 top-full z-50 mt-1.5 w-44 origin-top-right rounded-md border border-border bg-card p-1 shadow-md animate-[scale-in_0.15s_ease-out_both] motion-reduce:animate-none"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => handlePlatformShare("x")}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-start font-mono text-xs text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M4 4l16 16M20 4L4 20" />
            </svg>
            <span>Share on X</span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handlePlatformShare("facebook")}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-start font-mono text-xs text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <span>Facebook</span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handlePlatformShare("linkedin")}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-start font-mono text-xs text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="4" />
              <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" />
            </svg>
            <span>LinkedIn</span>
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handlePlatformShare("email")}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-start font-mono text-xs text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
            <span>Email</span>
          </button>
          <div role="separator" className="my-1 border-t border-dashed border-border" />
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2.5 py-1.5 text-start font-mono text-xs font-semibold text-accent-strong transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>Copy link</span>
          </button>
        </div>
      )}
    </div>
  );
});
ShareMenu.displayName = "ShareMenu";
