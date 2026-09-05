"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AvatarUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initials?: string;
  src?: string;
  onChange?: (file: File) => void;
}

/** Circular avatar uploader: hover camera overlay + loading spinner. */
export function AvatarUpload({ initials = "BB", src, onChange, className, ...props }: AvatarUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(src ?? null);
  const [uploading, setUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    onChange?.(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <style>{`@keyframes avSpin { to { transform: rotate(360deg); } }`}</style>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative block size-24 overflow-hidden rounded-full border-2 border-dashed border-border bg-card transition-all duration-200 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        aria-label="Upload avatar"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Avatar" className="size-full object-cover" />
        ) : (
          <span className="flex size-full items-center justify-center font-mono text-xl font-bold text-muted-foreground">{initials}</span>
        )}
        {/* Camera overlay */}
        <span className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
        </span>
        {uploading && (
          <span className="absolute inset-0 flex items-center justify-center bg-background/70">
            <span className="size-6 rounded-full border-2 border-accent border-t-transparent" style={{ animation: "avSpin 0.8s linear infinite" }} aria-label="Loading" />
          </span>
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={handleChange} tabIndex={-1} aria-hidden="true" />
    </div>
  );
}
