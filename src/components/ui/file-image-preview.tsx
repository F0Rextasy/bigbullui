"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FileImagePreviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  label?: string;
}

export function FileImagePreview({
  accept = "image/*",
  multiple = true,
  maxFiles = 6,
  onFilesChange,
  label = "Drop images or browse",
  className,
  ...props
}: FileImagePreviewProps) {
  const [items, setItems] = React.useState<{ file: File; url: string }[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const add = (files: FileList | File[]) => {
    const list = [...files].filter((f) => f.type.startsWith("image/")).slice(0, Math.max(maxFiles - items.length, 0));
    if (list.length === 0) return;
    const next = [...items, ...list.map((file) => ({ file, url: URL.createObjectURL(file) }))].slice(0, maxFiles);
    setItems(next);
    onFilesChange?.(next.map((i) => i.file));
  };

  const remove = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    URL.revokeObjectURL(items[index].url);
    setItems(next);
    onFilesChange?.(next.map((i) => i.file));
  };

  React.useEffect(() => {
    return () => items.forEach((i) => URL.revokeObjectURL(i.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          dragging ? "border-accent bg-accent/5" : "border-border hover:border-foreground/40",
        )}
      >
        <p className="font-mono text-sm">{label}</p>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
          {items.length}/{maxFiles} images
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) add(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {items.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {items.map((item, i) => (
            <div key={`${item.file.name}-${i}`} className="group relative overflow-hidden rounded-md border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.file.name} className="h-20 w-full object-cover" />
              <button
                type="button"
                aria-label={`Remove ${item.file.name}`}
                onClick={() => remove(i)}
                className="absolute right-1 top-1 cursor-pointer rounded bg-background/80 px-1.5 py-0.5 font-mono text-[11px] opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
