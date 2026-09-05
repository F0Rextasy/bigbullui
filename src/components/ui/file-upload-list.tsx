"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type FileUploadStatus =
  | "idle"
  | "uploading"
  | "success"
  | "error"
  | "cancelled";

export type FileCategory =
  | "image"
  | "pdf"
  | "code"
  | "audio"
  | "video"
  | "archive"
  | "spreadsheet"
  | "document"
  | "generic";

export interface FileUploadItem {
  /** Unique ID for the queue item */
  id: string;
  /** File display name */
  name: string;
  /** File size in bytes */
  size: number;
  /** Upload progress percentage from 0 to 100 */
  progress?: number;
  /** Current state of the upload */
  status: FileUploadStatus;
  /** MIME type or file extension (e.g. "application/pdf" or "pdf") */
  type?: string;
  /** Optional error message displayed when status is "error" */
  errorMessage?: string;
  /** Underlying File reference if available */
  file?: File;
  /** Transferred bytes count */
  uploadedBytes?: number;
  /** Formatted transfer speed, e.g. "1.2 MB/s" */
  speed?: string;
  /** Formatted time remaining, e.g. "4s remaining" */
  eta?: string;
}

export interface FileUploadListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of upload items */
  files: FileUploadItem[];
  /** Callback when cancel button is clicked on an item */
  onCancel?: (id: string) => void;
  /** Callback when retry button is clicked on an item */
  onRetry?: (id: string) => void;
  /** Callback when remove button is clicked on an item */
  onRemove?: (id: string) => void;
  /** Callback when "Clear Completed" button is clicked */
  onClearCompleted?: () => void;
  /** Callback when "Upload All" is clicked */
  onUploadAll?: () => void;
  /** Callback when "Cancel All" is clicked */
  onCancelAll?: () => void;
  /** Callback when new native files are dropped or selected */
  onFilesAdded?: (files: File[]) => void;
  /** Header title */
  title?: string;
  /** Batch or queue manifest number */
  batchId?: string;
  /** Enable drag-and-drop or file picker add trigger */
  allowAdd?: boolean;
  /** Accepted file formats for input picker */
  accept?: string;
  /** Max files for file picker */
  maxFiles?: number;
  /** Compact density layout */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Format bytes into human-readable B, KB, MB, GB string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes <= 0 || isNaN(bytes)) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  const formatted = value < 10 && i > 0 ? value.toFixed(1) : Math.round(value).toString();
  return `${formatted} ${sizes[i]}`;
}

/**
 * Detect file category from file name extension or MIME type.
 */
export function getFileCategory(name: string, mimeType?: string): FileCategory {
  const ext = (name.split(".").pop() || "").toLowerCase();
  const mime = (mimeType || "").toLowerCase();

  if (
    ["png", "jpg", "jpeg", "webp", "gif", "svg", "bmp", "avif"].includes(ext) ||
    mime.startsWith("image/")
  ) {
    return "image";
  }
  if (ext === "pdf" || mime.includes("pdf")) {
    return "pdf";
  }
  if (
    ["zip", "tar", "gz", "rar", "7z", "bz2"].includes(ext) ||
    mime.includes("zip") ||
    mime.includes("tar") ||
    mime.includes("compressed")
  ) {
    return "archive";
  }
  if (
    [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "html",
      "css",
      "py",
      "rs",
      "go",
      "java",
      "c",
      "cpp",
      "sql",
      "sh",
      "yaml",
      "yml",
    ].includes(ext) ||
    mime.includes("json") ||
    mime.includes("javascript")
  ) {
    return "code";
  }
  if (
    ["mp3", "wav", "flac", "ogg", "m4a", "aac"].includes(ext) ||
    mime.startsWith("audio/")
  ) {
    return "audio";
  }
  if (
    ["mp4", "mov", "webm", "avi", "mkv"].includes(ext) ||
    mime.startsWith("video/")
  ) {
    return "video";
  }
  if (
    ["csv", "xlsx", "xls", "tsv"].includes(ext) ||
    mime.includes("spreadsheet") ||
    mime.includes("excel")
  ) {
    return "spreadsheet";
  }
  if (
    ["doc", "docx", "txt", "md", "rtf"].includes(ext) ||
    mime.includes("text/")
  ) {
    return "document";
  }
  return "generic";
}

export function FileUploadList({
  files = [],
  onCancel,
  onRetry,
  onRemove,
  onClearCompleted,
  onUploadAll,
  onCancelAll,
  onFilesAdded,
  title = "DISPATCH UPLOAD QUEUE",
  batchId = "BATCH #UP-402",
  allowAdd = true,
  accept,
  maxFiles = 10,
  compact = false,
  className,
  ...props
}: FileUploadListProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Compute aggregate statistics
  const totalCount = files.length;
  const completedCount = files.filter((f) => f.status === "success").length;
  const uploadingCount = files.filter((f) => f.status === "uploading").length;
  const errorCount = files.filter((f) => f.status === "error").length;
  const idleCount = files.filter((f) => f.status === "idle").length;

  const totalBytes = files.reduce((acc, f) => acc + (f.size || 0), 0);
  const uploadedBytes = files.reduce((acc, f) => {
    if (f.status === "success") return acc + f.size;
    if (f.uploadedBytes !== undefined) return acc + f.uploadedBytes;
    if (f.progress !== undefined) return acc + Math.round((f.size * f.progress) / 100);
    return acc;
  }, 0);

  const overallPercent =
    totalBytes > 0
      ? Math.min(100, Math.round((uploadedBytes / totalBytes) * 100))
      : 0;

  const handleNativeFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const incoming = Array.from(fileList).slice(0, maxFiles);
    onFilesAdded?.(incoming);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (allowAdd && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleNativeFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        if (!allowAdd) return;
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-sm select-none transition-colors",
        isDragOver && "border-accent bg-accent/5 ring-2 ring-accent/20",
        className
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        onChange={(e) => handleNativeFiles(e.target.files)}
        className="hidden"
        tabIndex={-1}
      />

      {/* =========================================================================
          HEADER: Overall Queue Manifest & Aggregate Progress
         ========================================================================= */}
      <div className="p-4 sm:p-5 bg-card border-b-2 border-foreground">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-accent">
                {batchId}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground uppercase">
                · {title}
              </span>
            </div>

            <div className="mt-1 flex flex-wrap items-baseline gap-2 sm:gap-3">
              <h3 className="font-mono text-base sm:text-lg font-extrabold uppercase tracking-tight text-foreground">
                {completedCount} OF {totalCount} COMPLETED
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                ({formatFileSize(uploadedBytes)} / {formatFileSize(totalBytes)} · {overallPercent}%)
              </span>
            </div>
          </div>

          {/* Status Pills & Controls */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {uploadingCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-xs border border-dashed border-accent bg-accent/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-accent animate-pulse">
                <span className="size-1.5 rounded-full bg-accent" />
                {uploadingCount} UPLOADING
              </span>
            )}

            {errorCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-xs border border-destructive bg-destructive/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-destructive">
                <span>⚠</span> {errorCount} FAILED
              </span>
            )}

            {allowAdd && (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-xs border border-dashed border-foreground/60 bg-secondary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground hover:border-solid hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer transition-all active:scale-95"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>ADD FILES</span>
              </button>
            )}
          </div>
        </div>

        {/* Aggregate Progress Bar */}
        <div className="mt-3.5 space-y-1.5">
          <div className="relative h-2.5 w-full rounded-xs border border-dashed border-border bg-secondary/70 overflow-hidden">
            <div
              className={cn(
                "h-full bg-accent transition-all duration-300 ease-out",
                uploadingCount > 0 && "bg-[repeating-linear-gradient(45deg,_var(--color-accent),_var(--color-accent)_8px,_var(--color-accent-strong)_8px,_var(--color-accent-strong)_16px)]"
              )}
              style={{ width: `${overallPercent}%` }}
              role="progressbar"
              aria-valuenow={overallPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            <span>
              {uploadingCount > 0
                ? "DISPATCH IN PROGRESS..."
                : completedCount === totalCount && totalCount > 0
                ? "ALL TRANSFERS VALIDATED"
                : "READY TO DISPATCH"}
            </span>

            <div className="flex items-center gap-3">
              {(idleCount > 0 || errorCount > 0) && onUploadAll && (
                <button
                  type="button"
                  onClick={onUploadAll}
                  className="font-bold text-accent hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  UPLOAD ALL ({idleCount + errorCount})
                </button>
              )}
              {uploadingCount > 0 && onCancelAll && (
                <button
                  type="button"
                  onClick={onCancelAll}
                  className="font-bold hover:text-destructive cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  CANCEL ALL
                </button>
              )}
              {completedCount > 0 && onClearCompleted && (
                <button
                  type="button"
                  onClick={onClearCompleted}
                  className="hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  CLEAR COMPLETED ({completedCount})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Perforation Notch Divider */}
      <div className="relative flex items-center justify-between" aria-hidden="true">
        <div className="size-4 rounded-full bg-background border-2 border-foreground -ml-2 shrink-0" />
        <div className="h-0 w-full border-t-2 border-dashed border-border" />
        <div className="size-4 rounded-full bg-background border-2 border-foreground -mr-2 shrink-0" />
      </div>

      {/* =========================================================================
          FILE LIST QUEUE ITEMS
         ========================================================================= */}
      {files.length === 0 ? (
        <div
          onClick={() => allowAdd && inputRef.current?.click()}
          className={cn(
            "p-8 sm:p-12 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors",
            allowAdd && "hover:bg-secondary/30"
          )}
        >
          <div className="size-10 rounded-md border-2 border-dashed border-border bg-secondary flex items-center justify-center text-muted-foreground">
            <svg
              width="20"
              height="20"
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
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
            QUEUE IS EMPTY · NO FILES STAGED
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            {allowAdd
              ? "Drag and drop files here or click to browse"
              : "No items scheduled for upload"}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-dashed divide-border overflow-y-auto max-h-[480px]">
          {files.map((file, index) => {
            const category = getFileCategory(file.name, file.type);
            const progressVal = Math.min(100, Math.max(0, file.progress ?? (file.status === "success" ? 100 : 0)));

            return (
              <div
                key={file.id || `file-${index}`}
                className={cn(
                  "p-3.5 sm:p-4 bg-card hover:bg-secondary/30 transition-colors flex flex-col gap-2.5",
                  compact && "p-2.5 sm:p-3"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Category Icon Badge + Details */}
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <FileTypeBadge category={category} ext={file.name.split(".").pop()} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-xs sm:text-sm font-bold text-foreground truncate block"
                          title={file.name}
                        >
                          {file.name}
                        </span>

                        {/* Stamped Badge when complete */}
                        {file.status === "success" && (
                          <span className="shrink-0 -rotate-3 rounded-xs border border-primary bg-primary/10 px-1.5 py-0.2 font-mono text-[9px] font-black uppercase tracking-wider text-primary">
                            UPLOADED ✓
                          </span>
                        )}
                      </div>

                      {/* File Size & Transfer Stats */}
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 font-mono text-[10px] sm:text-[11px] text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>

                        {file.status === "uploading" && (
                          <>
                            <span>·</span>
                            <span className="text-accent font-semibold">{progressVal}%</span>
                            {file.speed && <span>· {file.speed}</span>}
                            {file.eta && <span className="hidden sm:inline">· {file.eta}</span>}
                          </>
                        )}

                        {file.status === "error" && (
                          <>
                            <span>·</span>
                            <span className="text-destructive font-bold">
                              {file.errorMessage || "Transfer failed"}
                            </span>
                          </>
                        )}

                        {file.status === "cancelled" && (
                          <>
                            <span>·</span>
                            <span className="line-through opacity-70">CANCELLED</span>
                          </>
                        )}

                        {file.status === "idle" && (
                          <>
                            <span>·</span>
                            <span className="opacity-75">QUEUED</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Tactile Action Buttons (Cancel / Retry / Remove) */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Retry Button */}
                    {(file.status === "error" || file.status === "cancelled") && onRetry && (
                      <button
                        type="button"
                        onClick={() => onRetry(file.id)}
                        className="size-7 rounded-xs border border-dashed border-foreground/50 bg-secondary flex items-center justify-center text-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer transition-transform active:scale-95"
                        title={`Retry ${file.name}`}
                        aria-label={`Retry ${file.name}`}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />
                        </svg>
                      </button>
                    )}

                    {/* Cancel Button */}
                    {(file.status === "uploading" || file.status === "idle") && onCancel && (
                      <button
                        type="button"
                        onClick={() => onCancel(file.id)}
                        className="size-7 rounded-xs border border-dashed border-border bg-card flex items-center justify-center text-muted-foreground hover:border-destructive hover:text-destructive hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer transition-transform active:scale-95"
                        title={`Cancel ${file.name}`}
                        aria-label={`Cancel ${file.name}`}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    )}

                    {/* Remove Button */}
                    {onRemove && (
                      <button
                        type="button"
                        onClick={() => onRemove(file.id)}
                        className="size-7 rounded-xs border border-transparent hover:border-dashed hover:border-border hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer transition-transform active:scale-95"
                        title={`Remove ${file.name}`}
                        aria-label={`Remove ${file.name}`}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Individual File Progress Percentage Bar */}
                <div className="w-full">
                  <div className="relative h-1.5 w-full rounded-xs border border-dashed border-border/80 bg-secondary/50 overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-200 ease-out",
                        file.status === "uploading" && "bg-accent",
                        file.status === "success" && "bg-foreground",
                        file.status === "error" && "bg-destructive",
                        file.status === "cancelled" && "bg-muted-foreground/40",
                        file.status === "idle" && "bg-transparent"
                      )}
                      style={{ width: `${progressVal}%` }}
                      role="progressbar"
                      aria-valuenow={progressVal}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Ticket Stub Serial */}
      <div className="p-2.5 sm:p-3 bg-secondary/40 border-t border-dashed border-border flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
        <span>SECURITY VERIFIED ENCRYPTION</span>
        <span>BIGBULL PROTOCOL // READY</span>
      </div>
    </div>
  );
}

/**
 * Visual badge indicating file format in Ticket Stub theme.
 */
function FileTypeBadge({
  category,
  ext = "FILE",
}: {
  category: FileCategory;
  ext?: string;
}) {
  const label = (ext || "FILE").toUpperCase().slice(0, 4);

  const getIcon = () => {
    switch (category) {
      case "image":
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        );
      case "pdf":
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="13" y2="17" />
          </svg>
        );
      case "code":
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case "archive":
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="21 8 21 21 3 21 3 8" />
            <rect width="22" height="5" x="1" y="3" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
        );
      case "audio":
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        );
      case "video":
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m9 8 7 4-7 4V8z" />
          </svg>
        );
      case "spreadsheet":
      case "document":
      default:
        return (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center size-9 sm:size-10 rounded-md border border-dashed border-foreground/40 bg-secondary/80 text-foreground shrink-0 select-none">
      {getIcon()}
      <span className="font-mono text-[7px] sm:text-[8px] font-black uppercase tracking-wider mt-0.5 leading-none">
        {label}
      </span>
    </div>
  );
}
