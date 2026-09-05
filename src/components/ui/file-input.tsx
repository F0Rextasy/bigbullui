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
  accept = "*",
  multiple = false,
  onFilesChange,
  className,
}: FileInputProps) {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [fileNames, setFileNames] = React.useState<string[]>([]);
  const [selectionCount, setSelectionCount] = React.useState(0);

  const [isControlled, setIsControlled] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    const names = fileArray.map((f) => f.name);
    setFileNames(names);
    setSelectionCount(fileArray.length);
    onFilesChange?.(fileArray);
  };

  const removeFile = (index: number) => {
    const remaining = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(remaining);
    const remainingNames = remaining.map((f) => f.name);
    setFileNames(remainingNames);
    setSelectionCount(remaining.length);
    onFilesChange?.(remaining);
  };

  const triggerClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = multiple;
    input.addEventListener("change", handleChange as unknown as EventListener);
    input.click();
  };

  const classes = cn(
    "rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm transition-colors",
    "ring-2 ring-ring focus-visible:outline-none focus-visible:ring-2",
    className,
  );

  const chipClass = cn(
    "inline-flex items-center rounded-md bg-secondary/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-secondary-foreground mr-1 mb-1",
  );

  return (
    <div className={cn("relative flex flex-col gap-2", className)}>
      <div>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className={classes}
          style={{ display: "none" }}
        />
        <button
          onClick={triggerClick}
          className="flex items-center gap-2 rounded-md border border-transparent bg-secondary px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-secondary-foreground hover:bg-secondary/90 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M10 8a2 2 0 0 0-2 2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h4a2 2 0 0 1 2 2h6a2 2 0 0 1 2 2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2h-6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4z" />
          </svg>
          {multiple ? "Choose files" : "Choose file"}
        </button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {fileNames.map((name, idx) => (
            <div
              key={idx}
              className={cn(
                chipClass,
                "hover:bg-secondary/30 transition-colors"
              )}
            >
              <span>{name}</span>
              <button
                onClick={() => removeFile(idx)}
                className="ml-1 text-[10px] uppercase tracking-[0.15em] hover:text-destructive transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedFiles.length > 0 && (
        <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {selectionCount} file{selectionCount > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

FileInput.displayName = "FileInput";

