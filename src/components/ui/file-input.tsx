"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FileInputProps {
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  className?: string;
}

export function FileInput({
  accept,
  multiple = false,
  onFilesChange,
  className,
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArray = Array.from(e.target.files ?? []);
    setSelectedFiles(fileArray);
    onFilesChange?.(fileArray);
  };

  const removeFile = (index: number) => {
    const remaining = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(remaining);
    if (remaining.length === 0 && inputRef.current) {
      inputRef.current.value = "";
    }
    onFilesChange?.(remaining);
  };

  return (
    <div className={cn("relative flex flex-col gap-2", className)}>
      <div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {multiple ? "Choose files" : "Choose file"}
        </button>
      </div>

      {selectedFiles.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-1">
            {selectedFiles.map((file, idx) => (
              <div
                key={`${file.name}-${idx}`}
                className="inline-flex items-center rounded-md border border-border bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-secondary-foreground transition-colors hover:bg-secondary/60"
              >
                <span className="max-w-44 truncate">{file.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => removeFile(idx)}
                  className="ms-1.5 cursor-pointer rounded-xs px-0.5 text-[10px] uppercase tracking-[0.15em] transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
          </p>
        </>
      ) : null}
    </div>
  );
}

FileInput.displayName = "FileInput";
