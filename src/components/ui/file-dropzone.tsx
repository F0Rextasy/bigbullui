"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FileDropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesDrop?: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  className?: string;
}

export function FileDropzone({
  onFilesDrop,
  accept,
  maxFiles = 5,
  className,
  ...props
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [files, setFiles] = React.useState<{ name: string; size: string }[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList).slice(0, maxFiles);
    const newItems = incoming.map((f) => ({ name: f.name, size: formatSize(f.size) }));
    setFiles((prev) => [...prev, ...newItems]);
    onFilesDrop?.(incoming);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("w-full space-y-3", className)} {...props}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors select-none",
          isDragOver
            ? "border-accent bg-accent/10"
            : "border-border bg-card hover:border-foreground/50 hover:bg-secondary/40"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex size-10 items-center justify-center rounded-md border border-dashed border-border bg-secondary text-foreground mb-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          UPLOAD TICKET STUB / ATTACHMENT
        </span>
        <span className="mt-1 font-mono text-[11px] text-muted-foreground">
          Drag files here or click to browse
        </span>
      </div>

      {files.length > 0 ? (
        <div className="space-y-1.5">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 font-mono text-xs shadow-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-accent font-bold">★</span>
                <span className="truncate text-foreground font-medium">{file.name}</span>
                <span className="text-[10px] text-muted-foreground">({file.size})</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(idx);
                }}
                className="text-muted-foreground hover:text-destructive cursor-pointer font-bold ml-2"
                aria-label={`Remove ${file.name}`}
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
